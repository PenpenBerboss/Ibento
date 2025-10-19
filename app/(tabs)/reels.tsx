import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Video, Play, Heart } from 'lucide-react-native';

export default function ReelsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 justify-center items-center px-6">
        <View className="bg-surface rounded-2xl p-8 items-center">
          <View className="bg-primary/20 p-4 rounded-full mb-6">
            <Video size={48} color="#1e90ff" />
          </View>
          
          <Text className="text-text text-2xl font-bold mb-4 text-center">
            Reels Section Coming Soon
          </Text>
          
          <Text className="text-textSecondary text-base text-center mb-6 leading-6">
            Watch and share short anime clips, AMVs, and community-created content in a TikTok-style format.
          </Text>
          
          <View className="flex-row space-x-6">
            <View className="items-center">
              <Play size={24} color="#4ade80" />
              <Text className="text-textSecondary text-xs mt-2">Watch</Text>
            </View>
            <View className="items-center">
              <Heart size={24} color="#ef4444" />
              <Text className="text-textSecondary text-xs mt-2">Like</Text>
            </View>
            <View className="items-center">
              <Video size={24} color="#fbbf24" />
              <Text className="text-textSecondary text-xs mt-2">Create</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}