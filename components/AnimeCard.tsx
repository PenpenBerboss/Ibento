import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Star, ChevronRight, Trash2 } from 'lucide-react-native';
import { Anime } from '../data/animeList';
import ProgressBar from './ProgressBar';

interface AnimeCardProps {
  anime: Anime;
  onStatusChange?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function AnimeCard({ anime, onStatusChange, onDelete }: AnimeCardProps) {
  return (
    <View className="bg-surface rounded-2xl p-4 mb-4 flex-row">
      <Image 
        source={{ uri: anime.image }} 
        className="w-20 h-28 rounded-xl mr-4"
        resizeMode="cover"
      />
      
      <View className="flex-1">
        <View className="flex-row justify-between items-start mb-2">
          <View className="flex-1 mr-2">
            <Text className="text-text font-semibold text-lg mb-1" numberOfLines={2}>
              {anime.title}
            </Text>
            <View className="flex-row items-center mb-1">
              <View className="bg-primary px-2 py-1 rounded-md mr-2">
                <Text className="text-white text-xs font-medium">{anime.type}</Text>
              </View>
              <Text className="text-textSecondary text-sm">
                {anime.episodes} ep.
              </Text>
            </View>
            <Text className="text-textSecondary text-sm mb-1">genres</Text>
            <Text className="text-textSecondary text-xs">
              📅 {anime.season} {anime.year}
            </Text>
          </View>
          
          <View className="bg-warning px-2 py-1 rounded-lg flex-row items-center">
            <Star size={12} color="#000" fill="#000" />
            <Text className="text-black font-bold text-sm ml-1">{anime.rating}</Text>
          </View>
        </View>
        
        <View className="mb-3">
          <ProgressBar 
            current={anime.watchedEpisodes} 
            total={anime.episodes}
            color="#1e90ff"
          />
          <Text className="text-textSecondary text-xs mt-1">
            {anime.watchedEpisodes}/{anime.episodes}
          </Text>
        </View>
        
        <View className="flex-row justify-end space-x-2">
          <TouchableOpacity 
            onPress={() => onStatusChange?.(anime.id)}
            className="bg-secondary p-2 rounded-full"
          >
            <ChevronRight size={16} color="#ffffff" />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => onDelete?.(anime.id)}
            className="bg-error p-2 rounded-full"
          >
            <Trash2 size={16} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}