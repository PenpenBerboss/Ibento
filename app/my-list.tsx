import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import { router } from 'expo-router';
import TabHeader from '../components/TabHeader';
import AnimeCard from '../components/AnimeCard';
import { animeList } from '../data/animeList';

export default function MyListScreen() {
  const [activeTab, setActiveTab] = useState('Watching');
  const tabs = ['Watching', 'Completed', 'On-hold', 'Dropped'];

  const filteredAnime = animeList.filter(anime => {
    switch (activeTab) {
      case 'Watching': return anime.status === 'watching';
      case 'Completed': return anime.status === 'completed';
      case 'On-hold': return anime.status === 'on-hold';
      case 'Dropped': return anime.status === 'dropped';
      default: return true;
    }
  });

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="px-6 pt-4 pb-2">
        <View className="flex-row items-center justify-between mb-6">
          <TouchableOpacity onPress={() => router.back()}>
            <ChevronLeft size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text className="text-text text-xl font-bold">My List</Text>
          <View className="flex-row space-x-2">
            <View className="bg-secondary px-3 py-1 rounded-lg">
              <Text className="text-text text-sm">Anime</Text>
            </View>
            <View className="bg-secondary px-3 py-1 rounded-lg">
              <Text className="text-textSecondary text-sm">Manga</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Tabs */}
      <TabHeader 
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Content */}
      <ScrollView className="flex-1 px-6">
        {filteredAnime.length === 0 ? (
          <View className="flex-1 justify-center items-center py-20">
            <Text className="text-textSecondary text-lg text-center">
              No anime in {activeTab.toLowerCase()} list
            </Text>
          </View>
        ) : (
          <View className="pb-6">
            {filteredAnime.map((anime) => (
              <AnimeCard 
                key={anime.id} 
                anime={anime}
                onStatusChange={(id) => console.log('Change status for:', id)}
                onDelete={(id) => console.log('Delete:', id)}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}