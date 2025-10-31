import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import SmartImage from '../components/SmartImage';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import UserBadge from '../components/UserBadge';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'react-native';

interface ProfileScreenProps {
  coverImage?: string;
  profileImage?: string;
}

export default function ProfileScreen({
  coverImage = "https://roppongi.fr/wp-content/uploads/Tokyo-ghoul.jpg",
  profileImage = "data:image/jpeg;base64,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",
}: ProfileScreenProps) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  // Header baseline height excluding the status bar
  const HEADER_HEIGHT = 160; // original h-64 ~ 256 but we want a reasonable header; adjust if needed
  const coverHeight = insets.top + HEADER_HEIGHT;

  const recentActivity = [
    {
      type: "completed",
      title: "Termin E9 : L'Attaque des Titans - Saison finale",
      time: "Il y a 2 heures",
    },
    {
      type: "rated",
      title: "Not E9 : Jujutsu Kaisen",
      rating: 9.0,
      time: "Il y a 1 jour",
    },
    {
      type: "added",
      title: "Ajout E9 : Demon Slayer Saison 4",
      time: "Il y a 3 jours",
    },
  ];

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: "#071026" }}>
  {/* Make the cover area account for the status bar height */}
  <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
  <View className="relative" style={{ height: coverHeight }}>
        <LinearGradient
          colors={["rgba(7,16,38,0.7)", "rgba(0,0,0,0.5)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          className="absolute inset-0 z-10"
        />
        {/* Cover image */}
        <Image
          source={{ uri: coverImage }}
          className="absolute left-0 top-0 w-full h-full"
          style={{ width: '100%', height: coverHeight }}
          resizeMode="cover"
        />
        <View className="px-6 pt-4 flex-row items-start justify-between">
          <TouchableOpacity
            onPress={() => {
              try {
                // @ts-ignore
                if (navigation?.canGoBack && navigation.canGoBack()) {
                  // @ts-ignore
                  navigation.goBack();
                  return;
                }
              } catch (e) {}
              router.push("/");
            }}
            className="py-2 px-1"
          >
            <Feather name="chevron-left" size={26} color="#FFFFFF" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/profile/edit")}
            className="py-2 px-3 bg-background/20 rounded-full"
          >
            <Text className="text-background font-medium">Éditer</Text>
          </TouchableOpacity>
        </View>

        <View
          className="absolute left-1/2 top-1/2 items-center z-20"
          style={{
            transform: [{ translateX: -72 }],
          }}
        >
          <View
            className="w-36 h-36 rounded-full overflow-hidden"
            style={{
              borderWidth: 4,
              borderColor: "#071026",
              shadowColor: "#1e90ff",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 12,
              elevation: 8,
              backgroundColor: "#071026",
            }}
          >
            <SmartImage
              source={{ uri: profileImage }}
              style={{ width: 144, height: 144 }}
              contain={false}
            />
            <LinearGradient
              colors={["transparent", "rgba(7,16,38,0.2)"]}
              className="absolute inset-0"
            />
          </View>
        </View>
      </View>

      <ScrollView className="flex-1 mt-10 px-6">
        <View className="items-center mb-6">
          <Text className="text-2xl font-bold text-white">Adam</Text>
          <Text className="text-sm text-white/60">@adam</Text>
          <View className="mt-3">
            <UserBadge points={514} level={32} />
          </View>
        </View>

        {/* Stats cards */}
        <View className="flex-row justify-between space-x-3 mb-5">
          <View
            className="flex-1 rounded-2xl p-4"
            style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
          >
            <LinearGradient
              colors={["rgba(30,144,255,0.1)", "rgba(204,0,0,0.05)"]}
              className="absolute inset-0 rounded-2xl"
            />
            <Text className="text-xl font-bold text-primary text-center">
              73
            </Text>
            <Text className="text-xs text-white/40 text-center">
              Abonnements
            </Text>
          </View>
          <View
            className="flex-1 rounded-2xl p-4"
            style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
          >
            <LinearGradient
              colors={["rgba(30,144,255,0.1)", "rgba(204,0,0,0.05)"]}
              className="absolute inset-0 rounded-2xl"
            />
            <Text className="text-xl font-bold text-primary text-center">
              573
            </Text>
            <Text className="text-xs text-white/40 text-center">Abonnés</Text>
          </View>
          <View
            className="flex-1 rounded-2xl p-4"
            style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
          >
            <LinearGradient
              colors={["rgba(30,144,255,0.1)", "rgba(204,0,0,0.05)"]}
              className="absolute inset-0 rounded-2xl"
            />
            <Text className="text-xl font-bold text-primary text-center">
              127
            </Text>
            <Text className="text-xs text-white/40 text-center">Avis</Text>
          </View>
        </View>

        {/* Bio */}
        <View
          className="rounded-2xl p-4 mb-5 relative"
          style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
        >
          <LinearGradient
            colors={["rgba(30,144,255,0.1)", "rgba(204,0,0,0.05)"]}
            className="absolute inset-0 rounded-2xl"
          />
          <Text className="text-base text-white/90 leading-6 mb-3">
            Passionné d'anime depuis 2010. J'adore le shounen, le seinen et les
            thrillers psychologiques. Actuellement accro aux sorties
            saisonnières et aux adaptations manga.
          </Text>
          <View className="flex-row items-center space-x-3">
            <Feather name="calendar" size={16} color="rgba(255,255,255,0.5)" />
            <Text className="text-sm text-white/50">Inscrit en mars 2020</Text>
          </View>
          <View className="flex-row items-center space-x-3 mt-2">
            <Feather name="map-pin" size={16} color="rgba(255,255,255,0.5)" />
            <Text className="text-sm text-white/50">Tokyo, Japon</Text>
          </View>
          <View className="flex-row items-center space-x-3 mt-2">
            <Feather name="link" size={16} color="#1e90ff" />
            <Text className="text-sm text-primary">
              myanimelist.net/profile/adam
            </Text>
          </View>
        </View>

        {/* Statistiques détaillées */}
        <View
          className="rounded-2xl p-4 mb-5 relative"
          style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
        >
          <LinearGradient
            colors={["rgba(30,144,255,0.1)", "rgba(204,0,0,0.05)"]}
            className="absolute inset-0 rounded-2xl"
          />
          <Text className="text-lg font-bold text-white mb-3">
            Statistiques
          </Text>
          <View className="flex-row justify-between">
            <View className="items-center">
              <Text className="text-primary text-2xl font-bold">156</Text>
              <Text className="text-xs text-white/40">Terminés</Text>
            </View>
            <View className="items-center">
              <Text className="text-warning text-2xl font-bold">23</Text>
              <Text className="text-xs text-white/40">En cours</Text>
            </View>
            <View className="items-center">
              <Text className="text-secondary text-2xl font-bold">8.7</Text>
              <Text className="text-xs text-white/40">Note moyenne</Text>
            </View>
          </View>
        </View>

        {/* Activité récente */}
        <View className="mb-12">
          <Text className="text-lg font-bold text-white mb-4">
            Activité récente
          </Text>
          <View className="space-y-3">
            {recentActivity.map((a, i) => (
              <View
                key={i}
                className="rounded-2xl p-3 flex-row items-center justify-between relative"
                style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
              >
                <LinearGradient
                  colors={["rgba(30,144,255,0.1)", "rgba(204,0,0,0.05)"]}
                  className="absolute inset-0 rounded-2xl"
                />
                <View className="flex-row items-center space-x-3 flex-1">
                  <View className="w-10 h-10 rounded-lg items-center justify-center bg-primary/10">
                    {a.type === "completed" && (
                      <Text className="text-xl">✅</Text>
                    )}
                    {a.type === "rated" && <Text className="text-xl">⭐</Text>}
                    {a.type === "added" && <Text className="text-xl">➕</Text>}
                  </View>
                  <View className="flex-1">
                    <Text className="text-sm font-medium text-white/90">
                      {a.title}
                    </Text>
                    {a.type === "rated" && (
                      <Text className="text-xs text-white/50">
                        Note : {a.rating}/10
                      </Text>
                    )}
                  </View>
                </View>

                <Text className="text-xs text-white/40">{a.time}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
