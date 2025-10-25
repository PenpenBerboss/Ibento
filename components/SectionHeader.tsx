import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface SectionHeaderProps {
  title: string;
  onSeeAll?: () => void;
}

export default function SectionHeader({ title, onSeeAll }: SectionHeaderProps) {
  return (
    <View className="flex-row justify-between items-center">
      <Text className="text-text text-lg font-bold">
        {title}
      </Text>
      
      {onSeeAll && (
        <TouchableOpacity 
          onPress={onSeeAll} 
          className="flex-row items-center"
        >
          <Text className="text-xs mr-1 text-gray-500">
            Voir tout
          </Text>
          <Feather name="chevron-right" size={14} color="#888" />
        </TouchableOpacity>
      )}
    </View>
  );
}
