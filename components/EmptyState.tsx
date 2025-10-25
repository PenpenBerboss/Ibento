import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Animated, 
  Easing,
  useWindowDimensions
} from 'react-native';
import { Feather } from '@expo/vector-icons';
const colors = {
  background: '#FFFFFF',
  surface: '#F9F9F9',
  primary: '#1e90ff',
  secondary: '#CC0000',
  text: '#000000',
  textSecondary: '#555555',
};

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: string;
  buttonText?: string;
  onButtonPress?: () => void;
}

export default function EmptyState({ 
  title = "Aucun élément", 
  message = "Rien à afficher pour le moment", 
  icon = "inbox", 
  buttonText,
  onButtonPress
}: EmptyStateProps) {
  const { height } = useWindowDimensions();
  
  // Animation de l'icône
  const iconAnimation = React.useRef(new Animated.Value(0)).current;
  
  React.useEffect(() => {
    // Animation de rebond pour l'icône
    Animated.loop(
      Animated.sequence([
        Animated.timing(iconAnimation, {
          toValue: 1,
          duration: 1200,
          easing: Easing.elastic(1),
          useNativeDriver: true,
        }),
        Animated.timing(iconAnimation, {
          toValue: 0,
          duration: 1200,
          easing: Easing.elastic(1),
          useNativeDriver: true,
        })
      ])
    ).start();
  }, []);
  
  const iconTransform = {
    transform: [
      {
        translateY: iconAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -10],
        }),
      },
    ],
  };

  return (
    <View style={[styles.container, { minHeight: height * 0.4 }]}>
      <Animated.View style={[styles.iconContainer, iconTransform]}>
        <Feather name={icon as any} size={50} color="#1e90ff" />
      </Animated.View>
      
      <Text style={[styles.title, { color: '#CC0000' }]}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      
      {buttonText && onButtonPress && (
        <TouchableOpacity 
          style={[styles.button]}
          onPress={onButtonPress}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(204, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  color: colors.secondary,
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  button: {
  backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    elevation: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  }
});
