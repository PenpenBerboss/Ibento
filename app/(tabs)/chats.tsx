import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { MessageCircle, Search } from 'lucide-react-native';
import { useRouter } from 'expo-router';

// Données simplifiées pour le MVP
export const privateChats = [
  {
    id: '1',
    user: {
      name: 'Bouli',
      avatar: 'https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?w=48&h=48&fit=crop',
      online: true
    },
    lastMessage: {
      text: "Bonsoir les gars je suis deja la",
      time: '15:20',
      unread: true
    }
  },
  {
    id: '2',
    user: {
      name: 'Seth',
      avatar: 'https://images.unsplash.com/photo-1597733336794-12d05021d510?w=48&h=48&fit=crop',
      online: true
    },
    lastMessage: {
      text: "Oui!! je suis deja sortie de la maison",
      time: '04:30',
      unread: true
    }
  },
  {
    id: '3',
    user: {
      name: 'Kouam',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=48&h=48&fit=crop',
      online: false
    },
    lastMessage: {
      text: "C'est a lui de me dire comment faire",
      time: '18:15'
    }
  }
];

export default function ChatsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  
  // Filtrage simple des chats
  const filteredChats = privateChats.filter(chat =>
    chat.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.lastMessage.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header simplifié */}
      <View className="px-5 pt-3 pb-2">
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-text text-2xl font-bold">Messages</Text>
            <Text className="text-textSecondary text-sm">
              {filteredChats.filter(c => c.lastMessage.unread).length} nouveaux messages
            </Text>
          </View>
        </View>

        {/* Barre de recherche simple */}
        <View className="bg-surface rounded-2xl px-4 py-3 flex-row items-center shadow-sm border border-gray-100 mb-4">
          <Search size={18} color="#555555" />
          <TextInput
            placeholder="Rechercher une conversation..."
            placeholderTextColor="#555555"
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="flex-1 ml-3 text-text"
          />
          {searchQuery !== '' && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Feather name="x" size={16} color="#555555" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Liste des conversations */}
      <FlatList
        data={filteredChats}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/chat/${item.id}` as any)}
            className="flex-row items-center bg-surface p-4 rounded-2xl mb-3 border border-gray-100"
          >
            <View className="relative">
              <Image
                source={{ uri: item.user.avatar }}
                className="w-12 h-12 rounded-full"
              />
              {item.user.online && (
                <View className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success rounded-full border-2 border-white" />
              )}
            </View>
            
            <View className="flex-1 ml-3">
              <View className="flex-row items-center justify-between">
                <Text className="text-text font-bold">{item.user.name}</Text>
                <Text className="text-textSecondary text-xs">{item.lastMessage.time}</Text>
              </View>
              <View className="flex-row items-center justify-between mt-1">
                <Text 
                  className={`text-sm ${item.lastMessage.unread ? 'text-text font-medium' : 'text-textSecondary'}`}
                  numberOfLines={1}
                  style={{ maxWidth: '85%' }}
                >
                  {item.lastMessage.text}
                </Text>
                {item.lastMessage.unread && (
                  <View className="bg-secondary rounded-full w-2.5 h-2.5" />
                )}
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={() => (
          <View className="items-center justify-center py-10">
            <MessageCircle size={48} color="#ccc" />
            <Text className="text-textSecondary mt-4 text-center">
              Aucune conversation trouvée
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}