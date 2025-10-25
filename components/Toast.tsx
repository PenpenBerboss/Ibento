import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react-native';

const { width } = Dimensions.get('window');

type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  visible: boolean;
  message: string;
  type?: ToastType;
  duration?: number;
  onDismiss: () => void;
}

const Toast: React.FC<ToastProps> = ({ 
  visible, 
  message, 
  type = 'success', 
  duration = 3000, 
  onDismiss 
}) => {
  useEffect(() => {
    if (visible) {
      const hideTimeout = setTimeout(() => {
        onDismiss();
      }, duration);
      
      return () => clearTimeout(hideTimeout);
    }
  }, [visible, duration, onDismiss]);
  
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} color="#fff" />;
      case 'error':
        return <AlertCircle size={20} color="#fff" />;
      case 'info':
        return <Info size={20} color="#fff" />;
    }
  };
  
  const getBgClass = () => {
    switch (type) {
      case 'success':
        return 'bg-success';
      case 'error':
        return 'bg-error';
      case 'info':
        return 'bg-secondary';
    }
  };
  
  if (!visible) return null;
  
  return (
    <View style={styles.container}>
      <View className={`flex-row items-center px-4 py-3 rounded ${getBgClass()} w-full`}>
        {getIcon()}
        <Text className="text-white font-medium ml-2 flex-1">
          {message}
        </Text>
        <TouchableOpacity onPress={onDismiss}>
          <X size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: width * 0.1,
    right: width * 0.1,
    width: width * 0.8,
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
    zIndex: 1000,
  },
});

export default Toast;
