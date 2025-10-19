import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Users, MessageSquare, TrendingUp } from 'lucide-react-native';

export default function CommunityScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 justify-center items-center px-6">
        <View className="bg-surface rounded-2xl p-8 items-center">
          <View className="bg-primary/20 p-4 rounded-full mb-6">
            <Users size={48} color="#1e90ff" />
          </View>
          
          <Text className="text-text text-2xl font-bold mb-4 text-center">
            Community Feed Coming Soon
          </Text>
          
          <Text className="text-textSecondary text-base text-center mb-6 leading-6">
            Connect with fellow anime fans, share reviews, and discover new content through community posts and discussions.
          </Text>
          
          <View className="flex-row space-x-6">
            <View className="items-center">
              <MessageSquare size={24} color="#4ade80" />
              <Text className="text-textSecondary text-xs mt-2">Posts</Text>
            </View>
            <View className="items-center">
              <TrendingUp size={24} color="#fbbf24" />
              <Text className="text-textSecondary text-xs mt-2">Trending</Text>
            </View>
            <View className="items-center">
              <Users size={24} color="#ef4444" />
              <Text className="text-textSecondary text-xs mt-2">Groups</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}