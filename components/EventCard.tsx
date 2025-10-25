import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import SmartImage from './SmartImage';
import { Feather } from '@expo/vector-icons';
import { Event } from '../data/events';
const colors = {
  background: '#FFFFFF',
  surface: '#F9F9F9',
  primary: '#1e90ff',
  secondary: '#CC0000',
  text: '#000000',
  textSecondary: '#555555',
};

interface EventCardProps {
  event: Event;
  onPress?: (id: string) => void;
}

export default function EventCard({ event, onPress }: EventCardProps) {
  // Format date string to a more readable format
  const formatDate = (dateStr: string | undefined) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
  };

  // Fonction pour obtenir la couleur de badge selon la catégorie
  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'manga': return '#6A3DE8';
      case 'cinema': return '#E83D3D';
      case 'festival': return '#3D98E8';
      case 'salon': return '#3DE8A9';
      case 'otaku': return '#E83DCB';
  default: return '#CC0000';
    }
  };

  return (
    <View className="mr-4 w-[160px]">
      <TouchableOpacity 
        onPress={() => onPress?.(event.id)}
        className="overflow-hidden rounded-lg bg-surface shadow-sm"
        style={{
          elevation: 2,
        }}
      >
        <View className="relative">
          <SmartImage
            source={event.imageUrl}
            style={{ width: '100%', height: 160 }}
            contain={false}
          />
          <View className="absolute top-2 left-2 flex-row">
            {event.date && (
              <View className="bg-black/70 rounded-md px-2 py-1 mr-1">
                <Text className="text-white text-xs font-medium">
                  {formatDate(event.date)}
                </Text>
              </View>
            )}
            <View 
              className="rounded-md px-2 py-1" 
              style={{ backgroundColor: getCategoryColor(event.category) }}
            >
              <Text className="text-white text-xs font-medium">
                {event.category}
              </Text>
            </View>
          </View>

          {event.location && (
            <View className="absolute bottom-2 left-2 bg-black/70 rounded-md px-2 py-1">
              <Text className="text-white text-xs">
                <Feather name="map-pin" size={10} color="white" /> {event.location.split(',')[0]}
              </Text>
            </View>
          )}
        </View>

      <View className="p-2 bg-surface">
          <Text className="text-text text-sm font-bold" numberOfLines={1}>
            {event.name}
          </Text>
          <View className="flex-row justify-between items-center mt-1">
            <Text className="text-primary text-xs font-bold">
              {event.price} {event.currency}
            </Text>
            <View 
        className="rounded-full p-1 bg-secondary"
            >
              <Feather name="arrow-right" size={12} color="white" />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
