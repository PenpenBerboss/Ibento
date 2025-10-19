import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Users } from 'lucide-react-native';
import { Group } from '../data/groups';

interface GroupCardProps {
  group: Group;
  onPress?: (id: string) => void;
}

export default function GroupCard({ group, onPress }: GroupCardProps) {
  return (
    <TouchableOpacity 
      onPress={() => onPress?.(group.id)}
      className="bg-surface rounded-2xl overflow-hidden mb-4"
    >
      <Image 
        source={{ uri: group.image }} 
        className="w-full h-32"
        resizeMode="cover"
      />
      
      <View className="absolute top-2 left-2 bg-black/50 px-2 py-1 rounded-lg flex-row items-center">
        <Users size={12} color="#ffffff" />
        <Text className="text-white text-xs ml-1">{group.members}</Text>
      </View>
      
      <View className="p-3">
        <Text className="text-text font-semibold text-sm mb-1" numberOfLines={1}>
          {group.name}
        </Text>
        {group.nameArabic && (
          <Text className="text-textSecondary text-xs mb-1" numberOfLines={1}>
            {group.nameArabic}
          </Text>
        )}
        <Text className="text-textSecondary text-xs">
          {group.lastMessage}
        </Text>
      </View>
      
      {group.isOnline && (
        <View className="absolute top-2 right-2 w-3 h-3 bg-success rounded-full" />
      )}
    </TouchableOpacity>
  );
}