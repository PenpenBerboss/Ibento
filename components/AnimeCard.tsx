import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import SmartImage from './SmartImage';
import { Feather } from '@expo/vector-icons';
import { Anime } from '../data/animeList';
import ProgressBar from './ProgressBar';
const colors = {
  background: '#FFFFFF',
  surface: '#F9F9F9',
  primary: '#1e90ff',
  secondary: '#CC0000',
  text: '#000000',
  textSecondary: '#555555',
};

interface AnimeCardProps {
  anime: Anime;
  onStatusChange?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function AnimeCard({ anime, onStatusChange, onDelete }: AnimeCardProps) {
  return (
    <View className="bg-background rounded-2xl p-4 mb-4 flex-row shadow-sm border" style={{ borderColor: '#f0f0f0', elevation: 2 }}>
      <SmartImage
        source={anime.image}
        style={{ width: 80, height: 112, borderRadius: 12, marginRight: 16 }}
        contain={false}
      />
      
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8}}>
          <View style={{flex: 1, marginRight: 8}}>
            <Text className="text-secondary font-semibold text-base mb-1" numberOfLines={2}>
              {anime.title}
            </Text>
            <View className="flex-row items-center mb-1">
              <View className="bg-primary px-2 py-1 rounded mr-2">
                <Text className="text-white text-xs font-medium">{anime.type}</Text>
              </View>
              <Text className="text-textSecondary text-xs">{anime.episodes} ep.</Text>
            </View>
            <Text style={{color: '#555555', fontSize: 12, marginBottom: 4}}>genres</Text>
            <Text style={{color: '#777777', fontSize: 11}}>
              📅 {anime.season} {anime.year}
            </Text>
          </View>
          
          <View className="bg-[#FFF3E0] px-2 py-1 rounded flex-row items-center">
            <Feather name="star" size={12} color="#1e90ff" />
            <Text className="text-secondary font-bold text-xs ml-1">{anime.rating}</Text>
          </View>
        </View>
        
        <View style={{marginBottom: 12}}>
          <ProgressBar 
            current={anime.watchedEpisodes} 
            total={anime.episodes}
            color={undefined}
          />
          <Text style={{color: '#555555', fontSize: 11, marginTop: 4}}>
            {anime.watchedEpisodes}/{anime.episodes}
          </Text>
        </View>
        
        <View className="flex-row justify-end space-x-2">
          <TouchableOpacity onPress={() => onStatusChange?.(anime.id)} className="px-3 py-2 rounded-full bg-secondary">
            <Feather name="chevron-right" size={16} color="#ffffff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onDelete?.(anime.id)} className="px-3 py-2 rounded-full bg-primary">
            <Feather name="trash-2" size={16} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}