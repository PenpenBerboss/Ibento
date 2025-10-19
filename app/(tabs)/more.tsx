import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Search, 
  Bell, 
  Grid3X3, 
  BookOpen, 
  FileText, 
  Users, 
  Building, 
  User, 
  Quote, 
  Video,
  Star,
  List,
  BarChart3,
  MessageSquare,
  ChevronRight
} from 'lucide-react-native';
import { router } from 'expo-router';
import UserBadge from '../../components/UserBadge';

export default function MoreScreen() {
  const gridItems = [
    { icon: Grid3X3, label: 'Anime', color: '#1e90ff' },
    { icon: BookOpen, label: 'Manga', color: '#1e90ff' },
    { icon: FileText, label: 'Articles', color: '#ef4444' },
    { icon: Users, label: 'Characters', color: '#8b5cf6' },
    { icon: Building, label: 'Companies', color: '#06b6d4' },
    { icon: User, label: 'People', color: '#ef4444' },
    { icon: Quote, label: 'Quotes', color: '#6b7280' },
    { icon: Video, label: 'Videos', color: '#06b6d4' },
  ];

  const libraryItems = [
    { icon: Star, label: 'Favorites', onPress: () => {} },
    { icon: List, label: 'Anime & Manga List', onPress: () => router.push('/my-list') },
    { icon: BarChart3, label: 'My Statistics', onPress: () => {} },
    { icon: MessageSquare, label: 'My Reviews', onPress: () => {} },
  ];

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="px-6 pt-4 pb-6">
          <View className="flex-row justify-between items-center mb-6">
            <View className="flex-row items-center space-x-4">
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face' }}
                className="w-16 h-16 rounded-2xl"
              />
              <View>
                <Text className="text-text text-xl font-bold">Adam</Text>
                <Text className="text-textSecondary text-sm">@adam</Text>
                <View className="mt-2">
                  <UserBadge points={514} level={32} />
                </View>
              </View>
            </View>
            <View className="flex-row items-center space-x-4">
              <TouchableOpacity className="relative">
                <Bell size={24} color="#ffffff" />
                <View className="absolute -top-1 -right-1 w-5 h-5 bg-error rounded-full items-center justify-center">
                  <Text className="text-white text-xs font-bold">3</Text>
                </View>
              </TouchableOpacity>
              <Search size={24} color="#ffffff" />
            </View>
          </View>

          {/* Stats */}
          <View className="flex-row justify-center space-x-8 mb-8">
            <View className="items-center">
              <Text className="text-text text-xl font-bold">73</Text>
              <Text className="text-textSecondary text-sm">Following</Text>
            </View>
            <View className="items-center">
              <Text className="text-text text-xl font-bold">573</Text>
              <Text className="text-textSecondary text-sm">Followers</Text>
            </View>
          </View>

          {/* Grid */}
          <View className="flex-row flex-wrap justify-between mb-8">
            {gridItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                className="w-[48%] bg-surface rounded-2xl p-4 mb-4 items-center"
              >
                <View className="mb-3">
                  <item.icon size={32} color={item.color} />
                </View>
                <Text className="text-text font-medium">{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* My Library Section */}
          <View>
            <Text className="text-primary text-lg font-bold mb-4 border-l-4 border-primary pl-3">
              My Library
            </Text>
            <View className="space-y-2">
              {libraryItems.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={item.onPress}
                  className="bg-surface rounded-2xl p-4 flex-row items-center justify-between"
                >
                  <View className="flex-row items-center">
                    <item.icon size={24} color="#ffffff" />
                    <Text className="text-text font-medium ml-4">{item.label}</Text>
                  </View>
                  <ChevronRight size={20} color="#a0a0a0" />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}