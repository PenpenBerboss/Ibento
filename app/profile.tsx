import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar, Image } from 'react-native';
import SmartImage from '../components/SmartImage';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import UserBadge from '../components/UserBadge';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuthStore } from '@/hooks/useAuthStore';

const COVER_DEFAULT = "https://roppongi.fr/wp-content/uploads/Tokyo-ghoul.jpg";
const AVATAR_DEFAULT = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=240&h=240&fit=crop&crop=face";

export default function ProfileScreen() {
  const { user } = useAuthStore();
  const insets = useSafeAreaInsets();
  const coverHeight = insets.top + 160;

  const fullName = user ? `${user.firstName} ${user.lastName}`.trim() : 'Utilisateur';
  const avatar = user?.avatar || AVATAR_DEFAULT;

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: "#071026" }}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* Cover */}
      <View style={{ height: coverHeight, position: 'relative' }}>
        <Image
          source={{ uri: COVER_DEFAULT }}
          style={{ width: '100%', height: coverHeight, position: 'absolute' }}
          resizeMode="cover"
        />
        <LinearGradient
          colors={["rgba(7,16,38,0.7)", "rgba(0,0,0,0.5)"]}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        />

        {/* Boutons header */}
        <View style={{ paddingTop: insets.top, paddingHorizontal: 16, flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={() => router.push('/')} className="py-2 px-1">
            <Feather name="chevron-left" size={26} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/profile/edit")} className="py-2 px-3 bg-black/20 rounded-full">
            <Text className="text-white font-medium">Éditer</Text>
          </TouchableOpacity>
        </View>

        {/* Avatar */}
        <View style={{ position: 'absolute', bottom: -48, left: 0, right: 0, alignItems: 'center' }}>
          <View style={{ width: 96, height: 96, borderRadius: 48, overflow: 'hidden', borderWidth: 4, borderColor: '#071026' }}>
            <SmartImage source={{ uri: avatar }} style={{ width: 96, height: 96 }} contain={false} />
          </View>
        </View>
      </View>

      <ScrollView className="flex-1 mt-14 px-6">
        {/* Nom */}
        <View className="items-center mb-6">
          <Text className="text-2xl font-bold text-white">{fullName}</Text>
          <Text className="text-sm text-white/60">{user?.email}</Text>
          <View className="mt-3">
            <UserBadge points={514} level={32} />
          </View>
        </View>

        {/* Stats */}
        <View className="flex-row justify-between space-x-3 mb-5">
          {[
            { label: 'Abonnements', value: '73' },
            { label: 'Abonnés', value: '573' },
            { label: 'Avis', value: '127' },
          ].map((stat) => (
            <View key={stat.label} className="flex-1 rounded-2xl p-4" style={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
              <LinearGradient colors={["rgba(30,144,255,0.1)", "rgba(204,0,0,0.05)"]} className="absolute inset-0 rounded-2xl" />
              <Text className="text-xl font-bold text-primary text-center">{stat.value}</Text>
              <Text className="text-xs text-white/40 text-center">{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Infos */}
        <View className="rounded-2xl p-4 mb-5" style={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
          <LinearGradient colors={["rgba(30,144,255,0.1)", "rgba(204,0,0,0.05)"]} className="absolute inset-0 rounded-2xl" />
          {user?.phone ? (
            <View className="flex-row items-center space-x-3 mb-2">
              <Feather name="phone" size={16} color="rgba(255,255,255,0.5)" />
              <Text className="text-sm text-white/70">{user.phone}</Text>
            </View>
          ) : null}
          {user?.address ? (
            <View className="flex-row items-center space-x-3 mb-2">
              <Feather name="map-pin" size={16} color="rgba(255,255,255,0.5)" />
              <Text className="text-sm text-white/70">{user.address}</Text>
            </View>
          ) : null}
          {user?.country ? (
            <View className="flex-row items-center space-x-3">
              <Feather name="globe" size={16} color="rgba(255,255,255,0.5)" />
              <Text className="text-sm text-white/70">{user.country}</Text>
            </View>
          ) : null}
        </View>

        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
}
