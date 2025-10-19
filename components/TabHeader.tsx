import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

interface TabHeaderProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function TabHeader({ tabs, activeTab, onTabChange }: TabHeaderProps) {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      className="mb-6"
    >
      <View className="flex-row px-6">
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => onTabChange(tab)}
            className={`px-4 py-2 rounded-full mr-3 ${
              activeTab === tab ? 'bg-primary' : 'bg-secondary'
            }`}
          >
            <Text 
              className={`font-medium ${
                activeTab === tab ? 'text-white' : 'text-textSecondary'
              }`}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}