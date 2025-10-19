import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Calendar, MapPin, Link as LinkIcon } from 'lucide-react-native';
import { router } from 'expo-router';
import UserBadge from '../components/UserBadge';

export default function ProfileScreen() {
  const recentActivity = [
    { type: 'completed', title: 'Attack on Titan Final Season', time: '2 hours ago' },
    { type: 'rated', title: 'Jujutsu Kaisen', rating: 9.0, time: '1 day ago' },
    { type: 'added', title: 'Demon Slayer Season 4', time: '3 days ago' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="px-6 pt-4 pb-6">
          <TouchableOpacity onPress={() => router.back()} className="mb-6">
            <ChevronLeft size={24} color="#ffffff" />
          </TouchableOpacity>

          {/* Profile Info */}
          <View className="items-center mb-8">
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face' }}
              className="w-24 h-24 rounded-3xl mb-4"
            />
            <Text className="text-text text-2xl font-bold mb-1">Adam</Text>
            <Text className="text-textSecondary text-lg mb-4">@adam</Text>
            
            <UserBadge points={514} level={32} />
            
            <View className="flex-row justify-center space-x-8 mt-6">
              <View className="items-center">
                <Text className="text-text text-xl font-bold">73</Text>
                <Text className="text-textSecondary text-sm">Following</Text>
              </View>
              <View className="items-center">
                <Text className="text-text text-xl font-bold">573</Text>
                <Text className="text-textSecondary text-sm">Followers</Text>
              </View>
              <View className="items-center">
                <Text className="text-text text-xl font-bold">127</Text>
                <Text className="text-textSecondary text-sm">Reviews</Text>
              </View>
            </View>
          </View>

          {/* Bio */}
          <View className="bg-surface rounded-2xl p-6 mb-6">
            <Text className="text-text text-base leading-6 mb-4">
              Anime enthusiast since 2010. Love shounen, seinen, and psychological thrillers. 
              Currently obsessed with seasonal anime and manga adaptations.
            </Text>
            <View className="space-y-2">
              <View className="flex-row items-center">
                <Calendar size={16} color="#a0a0a0" />
                <Text className="text-textSecondary text-sm ml-2">Joined March 2020</Text>
              </View>
              <View className="flex-row items-center">
                <MapPin size={16} color="#a0a0a0" />
                <Text className="text-textSecondary text-sm ml-2">Tokyo, Japan</Text>
              </View>
              <View className="flex-row items-center">
                <LinkIcon size={16} color="#a0a0a0" />
                <Text className="text-primary text-sm ml-2">myanimelist.net/profile/adam</Text>
              </View>
            </View>
          </View>

          {/* Stats */}
          <View className="bg-surface rounded-2xl p-6 mb-6">
            <Text className="text-text text-lg font-bold mb-4">Statistics</Text>
            <View className="flex-row justify-between">
              <View className="items-center">
                <Text className="text-primary text-2xl font-bold">156</Text>
                <Text className="text-textSecondary text-sm">Completed</Text>
              </View>
              <View className="items-center">
                <Text className="text-warning text-2xl font-bold">23</Text>
                <Text className="text-textSecondary text-sm">Watching</Text>
              </View>
              <View className="items-center">
                <Text className="text-error text-2xl font-bold">8.7</Text>
                <Text className="text-textSecondary text-sm">Avg Score</Text>
              </View>
            </View>
          </View>

          {/* Recent Activity */}
          <View className="bg-surface rounded-2xl p-6">
            <Text className="text-text text-lg font-bold mb-4">Recent Activity</Text>
            <View className="space-y-4">
              {recentActivity.map((activity, index) => (
                <View key={index} className="flex-row items-center justify-between">
                  <View className="flex-1">
                    <Text className="text-text font-medium mb-1">
                      {activity.type === 'completed' && '✅ Completed '}
                      {activity.type === 'rated' && '⭐ Rated '}
                      {activity.type === 'added' && '➕ Added '}
                      {activity.title}
                    </Text>
                    {activity.type === 'rated' && (
                      <Text className="text-warning text-sm">Rating: {activity.rating}/10</Text>
                    )}
                  </View>
                  <Text className="text-textSecondary text-xs">{activity.time}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}