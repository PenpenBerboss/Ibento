import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Plus, Bell } from 'lucide-react-native';
import GroupCard from '../../components/GroupCard';
import { groups } from '../../data/groups';

export default function ChatsScreen() {
  const [activeTab, setActiveTab] = useState('Chats');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (group.nameArabic && group.nameArabic.includes(searchQuery))
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="px-6 pt-4 pb-6">
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-primary text-2xl font-bold italic">
            Animeista
          </Text>
          <View className="flex-row items-center space-x-4">
            <TouchableOpacity className="relative">
              <Bell size={24} color="#ffffff" />
              <View className="absolute -top-1 -right-1 w-3 h-3 bg-error rounded-full">
                <Text className="text-white text-xs text-center leading-3">3</Text>
              </View>
            </TouchableOpacity>
            <Search size={24} color="#ffffff" />
            <View className="w-8 h-8 bg-primary rounded-full" />
          </View>
        </View>

        {/* Tabs */}
        <View className="flex-row mb-6">
          {['Chats', 'My Groups'].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              className={`flex-1 pb-2 ${
                activeTab === tab ? 'border-b-2 border-primary' : ''
              }`}
            >
              <Text className={`text-center font-medium ${
                activeTab === tab ? 'text-primary' : 'text-textSecondary'
              }`}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Search Bar */}
        <View className="bg-surface rounded-2xl px-4 py-3 flex-row items-center">
          <Search size={20} color="#a0a0a0" />
          <TextInput
            placeholder="Search"
            placeholderTextColor="#a0a0a0"
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="flex-1 ml-3 text-text"
          />
        </View>
      </View>

      {/* Groups Grid */}
      <ScrollView className="flex-1 px-6">
        <View className="flex-row flex-wrap justify-between">
          {filteredGroups.map((group, index) => (
            <View key={group.id} className="w-[48%]">
              <GroupCard group={group} />
            </View>
          ))}
        </View>
        <View className="h-20" />
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity className="absolute bottom-24 right-6 w-14 h-14 bg-primary rounded-full items-center justify-center shadow-lg">
        <Plus size={28} color="#ffffff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}