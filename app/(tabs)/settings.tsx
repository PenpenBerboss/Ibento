import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import SmartImage from '../../components/SmartImage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import UserBadge from '../../components/UserBadge';

// Utilisation des couleurs de tailwind.config.js
const colors = {
  background: '#FFFFFF',
  surface: '#F9F9F9',
  primary: '#1e90ff',
  secondary: '#CC0000',
  text: '#000000',
  textSecondary: '#555555',
  accent: '#1e90ff',
  success: '#4ade80',
  warning: '#fbbf24',
  error: '#CC0000',
};

export default function SettingsScreen() {
  type SettingsItem = {
    icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
    label: string;
    onPress: () => void;
    badge?: number;
  };

  type SettingsGroup = {
    title: string;
    items: SettingsItem[];
  };

  const settingsGroups: SettingsGroup[] = [
    {
      title: "Compte",
      items: [
        { icon: 'account-circle-outline', label: 'Profil', onPress: () => {} },
        { icon: 'bell-outline', label: 'Notifications', onPress: () => {}, badge: 3 },
        { icon: 'shield-lock-outline', label: 'Confidentialité', onPress: () => {} },
      ]
    },
        {
          title: "Contenu",
          items: [
            { icon: 'heart-outline', label: 'Favoris', onPress: () => {} },
            { icon: 'format-list-bulleted', label: 'Ma Liste', onPress: () => router.push('/my-list?from=settings') },
            { icon: 'chart-bar', label: 'Statistiques', onPress: () => {} },
            { icon: 'star-outline', label: 'Mes Avis', onPress: () => {} },
          ]
        },
    {
      title: "Paramètres",
      items: [
        { icon: 'theme-light-dark', label: 'Thème', onPress: () => {} },
        { icon: 'translate', label: 'Langue', onPress: () => {} },
        { icon: 'help-circle-outline', label: 'Aide', onPress: () => {} },
        { icon: 'information-outline', label: 'À propos', onPress: () => {} },
      ]
    }
  ];

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1">
        {/* En-tête avec profil */}
        <View className="px-6 pt-4 pb-6">
          <View className="flex-row items-center space-x-4 mb-6">
            <SmartImage
              source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face' }}
              style={{ width: 64, height: 64, borderRadius: 32, borderWidth: 2, borderColor: '#1e90ff' }}
              contain={false}
            />
            <View className="flex-1">
              <Text className="text-text text-xl font-bold">Penpen berboss</Text>
              <Text className="text-textSecondary text-sm">@berboss</Text>
              <View className="mt-2">
                <UserBadge points={514} level={32} />
              </View>
            </View>
            <TouchableOpacity 
              className="p-2 bg-surface rounded-full"
              onPress={() => {}}
            >
              <MaterialCommunityIcons 
                name="pencil-outline" 
                size={24} 
                color={colors.primary} 
              />
            </TouchableOpacity>
          </View>

          {/* Sections de paramètres */}
          {settingsGroups.map((group, groupIndex) => (
            <View key={groupIndex} className="mb-8">
              <Text className="text-primary text-lg font-bold mb-4 border-l-4 border-primary pl-3">
                {group.title}
              </Text>
              <View className="space-y-2">
                {group.items.map((item, itemIndex) => (
                  <TouchableOpacity
                    key={itemIndex}
                    onPress={item.onPress}
                    className="bg-surface rounded-2xl p-4 flex-row items-center justify-between"
                  >
                    <View className="flex-row items-center flex-1">
                      <View className="w-8">
                        <MaterialCommunityIcons 
                          name={item.icon} 
                          size={24} 
                          color={colors.text} 
                        />
                      </View>
                      <Text className="text-text font-medium flex-1 ml-3">
                        {item.label}
                      </Text>
                    </View>
                    <View className="flex-row items-center">
                      {item.badge && (
                        <View className="bg-error rounded-full w-6 h-6 items-center justify-center mr-3">
                          <Text className="text-white text-xs font-bold">
                            {item.badge}
                          </Text>
                        </View>
                      )}
                      <MaterialCommunityIcons 
                        name="chevron-right" 
                        size={20} 
                        color={colors.textSecondary} 
                      />
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </View>
        
        {/* Espace pour la barre de navigation */}
        <View style={{ height: 90 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
