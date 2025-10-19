import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Sparkles, Heart, Users, TrendingUp } from 'lucide-react-native';

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 px-6">
        <View className="pt-8 pb-6">
          <Text className="text-text text-3xl font-bold mb-2">
            Welcome to Animeista
          </Text>
          <Text className="text-textSecondary text-lg">
            Your ultimate anime & manga community
          </Text>
        </View>

        <View className="space-y-6">
          <View className="bg-surface rounded-2xl p-6">
            <View className="flex-row items-center mb-4">
              <Sparkles size={24} color="#1e90ff" />
              <Text className="text-text text-xl font-semibold ml-3">
                Discover
              </Text>
            </View>
            <Text className="text-textSecondary text-base leading-6">
              Explore thousands of anime and manga titles, create your personal lists, and connect with fellow otaku.
            </Text>
          </View>

          <View className="bg-surface rounded-2xl p-6">
            <View className="flex-row items-center mb-4">
              <Users size={24} color="#4ade80" />
              <Text className="text-text text-xl font-semibold ml-3">
                Community
              </Text>
            </View>
            <Text className="text-textSecondary text-base leading-6">
              Join groups, participate in discussions, and share your thoughts about your favorite series.
            </Text>
          </View>

          <View className="bg-surface rounded-2xl p-6">
            <View className="flex-row items-center mb-4">
              <Heart size={24} color="#ef4444" />
              <Text className="text-text text-xl font-semibold ml-3">
                Track & Rate
              </Text>
            </View>
            <Text className="text-textSecondary text-base leading-6">
              Keep track of what you're watching, rate your favorites, and get personalized recommendations.
            </Text>
          </View>

          <View className="bg-surface rounded-2xl p-6">
            <View className="flex-row items-center mb-4">
              <TrendingUp size={24} color="#fbbf24" />
              <Text className="text-text text-xl font-semibold ml-3">
                Trending
              </Text>
            </View>
            <Text className="text-textSecondary text-base leading-6">
              Stay up to date with the latest releases, seasonal anime, and trending discussions.
            </Text>
          </View>
        </View>

        <View className="py-8">
          <Text className="text-textSecondary text-center text-sm">
            Start your anime journey today! 🚀
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}