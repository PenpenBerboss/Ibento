import React from 'react';
import { View, Text } from 'react-native';
const colors = {
  background: '#FFFFFF',
  surface: '#F9F9F9',
  primary: '#1e90ff',
  secondary: '#CC0000',
  text: '#000000',
  textSecondary: '#555555',
};

interface UserBadgeProps {
  points: number;
  level: number;
  variant?: 'primary' | 'secondary';
}

export default function UserBadge({ points, level, variant = 'primary' }: UserBadgeProps) {
  return (
    <View className="flex-row space-x-2">
      <View className={`px-3 py-1 rounded-full ${
        variant === 'primary' ? 'bg-warning' : 'bg-primary'
      }`}>
        <Text className={`font-bold text-sm ${
          variant === 'primary' ? 'text-black' : 'text-white'
        }`}>
          🏆 {level}
        </Text>
      </View>
      <View className={`px-3 py-1 rounded-full ${
        variant === 'primary' ? 'bg-primary' : 'bg-warning'
      }`}>
        <Text className={`font-bold text-sm ${
          variant === 'primary' ? 'text-white' : 'text-black'
        }`}>
          ⭐ {points}
        </Text>
      </View>
    </View>
  );
}