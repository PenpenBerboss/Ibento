import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import SmartImage from './SmartImage';
import { Feather } from '@expo/vector-icons';
import { FeaturedItem } from '../data/events';
const colors = {
  background: '#FFFFFF',
  surface: '#F9F9F9',
  primary: '#1e90ff',
  secondary: '#CC0000',
  text: '#000000',
  textSecondary: '#555555',
};

interface FeaturedItemCardProps {
  item: FeaturedItem;
  onPress?: (id: string) => void;
}

export default function FeaturedItemCard({ item, onPress }: FeaturedItemCardProps) {
  return (
    <TouchableOpacity 
      onPress={() => onPress?.(item.id)}
      className="flex-row items-center bg-surface rounded-lg p-3 mb-3"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 2,
        elevation: 1,
      }}
    >
      <SmartImage
        source={item.imageUrl}
        style={{ width: 64, height: 64, borderRadius: 8 }}
        contain={false}
      />
      
      <View className="ml-3 flex-1 justify-center">
        <Text className="text-text font-bold">{item.name}</Text>
        <View className="flex-row items-center mt-1">
          <Text className="text-primary font-bold text-sm">{item.price}</Text>
          {item.currency && <Text className="text-textSecondary ml-1 text-xs">{item.currency}</Text>}
        </View>
        {item.description && (
          <Text className="text-textSecondary text-xs mt-1" numberOfLines={1}>
            {item.description}
          </Text>
        )}
        <View className="flex-row items-center mt-1">
          <View className="bg-gray-200 rounded-full px-2 py-0.5">
            <Text className="text-[10px] text-gray-600">{item.category}</Text>
          </View>
        </View>
      </View>
      
      <TouchableOpacity 
        className="items-center justify-center rounded-full bg-black/5 p-2"
        style={{ width: 36, height: 36 }}
      >
  <Feather name="arrow-right" size={16} color="#CC0000" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
