import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
const colors = {
  background: '#FFFFFF',
  surface: '#F9F9F9',
  primary: '#1e90ff',
  secondary: '#CC0000',
  text: '#000000',
  textSecondary: '#555555',
};

type StatusType = 'watching' | 'completed' | 'on-hold' | 'dropped';

interface StatusBadgeProps {
  status: StatusType;
  size?: 'small' | 'medium' | 'large';
}

export default function StatusBadge({ status, size = 'medium' }: StatusBadgeProps) {
  // Définir les icônes et couleurs pour chaque statut
  const getStatusInfo = () => {
    switch (status) {
      case 'watching':
        return { 
          icon: 'play', 
          color: colors.primary, 
          label: 'En cours' 
        };
      case 'completed':
        return { 
          icon: 'check', 
          color: colors.secondary, 
          label: 'Terminé' 
        };
      case 'on-hold':
        return { 
          icon: 'pause', 
          color: '#555555', 
          label: 'En attente' 
        };
      case 'dropped':
        return { 
          icon: 'x', 
          color: '#777777', 
          label: 'Abandonné' 
        };
      default:
        return { 
          icon: 'circle', 
          color: '#9E9E9E', 
          label: 'Inconnu' 
        };
    }
  };

  const { icon, color, label } = getStatusInfo();
  
  // Définir les dimensions en fonction de la taille
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          container: { height: 24, paddingHorizontal: 8 },
          icon: 12,
          text: { fontSize: 10 }
        };
      case 'large':
        return {
          container: { height: 36, paddingHorizontal: 16 },
          icon: 18,
          text: { fontSize: 14 }
        };
      default:
        return {
          container: { height: 30, paddingHorizontal: 12 },
          icon: 14,
          text: { fontSize: 12 }
        };
    }
  };
  
  const sizeStyles = getSizeStyles();

  return (
    <View 
      style={[
        styles.container, 
        { backgroundColor: color },
        sizeStyles.container
      ]}
    >
      <Feather 
        name={icon as any} 
        size={sizeStyles.icon} 
        color="white" 
        style={styles.icon} 
      />
      <Text style={[styles.label, sizeStyles.text]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    paddingHorizontal: 12,
  },
  icon: {
    marginRight: 4,
  },
  label: {
    color: 'white',
    fontWeight: '600',
  },
});
