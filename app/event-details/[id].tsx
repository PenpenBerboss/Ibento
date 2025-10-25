import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar, Dimensions, Platform } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Share2, Calendar, Clock, MapPin, Users, ChevronLeft } from 'lucide-react-native';
import SmartImage from '../../components/SmartImage';
import { Event, upcomingEvents } from '../../data/events';

const { width, height: screenHeight } = Dimensions.get('window');

// Simulation d'un appel API pour obtenir les détails de l'événement
const getEventDetails = (id: string): Event | undefined => {
  return upcomingEvents.find(event => event.id === id);
};

export default function EventDetailsScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const { id, from } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const HEADER_HEIGHT = Math.round(screenHeight * 0.45);
  const bannerHeight = insets.top + HEADER_HEIGHT;
  
  const event = getEventDetails(id as string);
  const [isRegistering, setIsRegistering] = useState(false);

  if (!event) {
    return (
      <SafeAreaView className="flex-1 bg-background justify-center items-center">
        <Text className="text-lg">Événement non trouvé</Text>
      </SafeAreaView>
    );
  }

  const handleRegistration = () => {
    setIsRegistering(true);
    // TODO: Implémenter la logique d'inscription
    setTimeout(() => {
      router.push('/register' as any);
      setIsRegistering(false);
    }, 500);
  };

  const goBack = () => {
    try {
      // 1) Inspect navigation state for a previous 'events' route
      // @ts-ignore
      const state = navigation?.getState && navigation.getState();
      if (state && state.routes && Array.isArray(state.routes)) {
        for (let i = state.routes.length - 1; i >= 0; i--) {
          const r = state.routes[i];
          const name = (r && r.name) ? String(r.name) : '';
          if (name.toLowerCase().includes('event')) {
            try {
              router.push('/events');
              return;
            } catch (e) {
              // ignore
            }
          }
        }
      }

      // 2) fallback to goBack if available
      // @ts-ignore
      if (navigation?.canGoBack && navigation.canGoBack()) {
        // @ts-ignore
        navigation.goBack();
        return;
      }
    } catch (e) {
      // ignore
    }

      // final fallback
    // if we know we came from events, prefer returning there
    if ((from as string) === 'events') {
      router.push('/events');
      return;
    }

    router.push('/events');
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['left', 'right', 'bottom']}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      
      {/* Header avec image */}
      <View style={{ height: bannerHeight }} className="relative items-center justify-center overflow-hidden">
        <SmartImage
          source={event.imageUrl}
          style={{
            width: '100%',
            height: bannerHeight,
            position: 'absolute',
            top: 0,
            left: 0
          }}
          resizeMode="cover"
          contain={false}
        />
        <LinearGradient
          colors={['rgba(0,0,0,0.5)', 'transparent', 'rgba(0,0,0,0.7)']}
          locations={[0, 0.5, 1]}
          style={{ 
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: bannerHeight,
            paddingTop: insets.top
          }}
        />
        
        {/* Bouton retour */}
        <TouchableOpacity
          className="absolute left-4 z-10 bg-black/20 rounded-full p-2"
          onPress={() => router.push('/events')}
          style={{ top: insets.top + 12 }}
        >
          <ChevronLeft size={24} color="#fff" />
        </TouchableOpacity>
        
        {/* Bouton partage */}
        <TouchableOpacity
          className="absolute right-4 z-10 bg-black/20 rounded-full p-2"
          style={{ top: insets.top + 12 }}
          onPress={() => {/* TODO: Implémenter le partage */}}
        >
          <Share2 size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 bg-background -mt-6 rounded-t-3xl">
        <View className="p-6">
          {/* En-tête avec titre et prix */}
          <View className="flex-row justify-between items-start mb-4">
            <View className="flex-1">
              <Text className="text-3xl font-bold text-text mb-2">
                {event.name}
              </Text>
              <Text className="text-secondary text-lg font-bold">
                {event.price} {event.currency}
              </Text>
            </View>
          </View>

          {/* Infos importantes */}
          <View className="bg-surface p-4 rounded-2xl mb-6">
            <View className="flex-row items-center mb-3">
              <Calendar size={20} color="#1e90ff" />
              <Text className="ml-3 text-text">{event.date}</Text>
            </View>
            <View className="flex-row items-center mb-3">
              <Clock size={20} color="#1e90ff" />
              <Text className="ml-3 text-text">{new Date(event.date || '').toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</Text>
            </View>
            <View className="flex-row items-center mb-3">
              <MapPin size={20} color="#CC0000" />
              <Text className="ml-3 text-text">{event.location}</Text>
            </View>
            <View className="flex-row items-center">
              <Users size={20} color="#4ade80" />
              <Text className="ml-3 text-text">
                Places disponibles
              </Text>
            </View>
          </View>

          {/* Description */}
          <View className="mb-6">
            <Text className="text-lg font-bold text-text mb-2">
              À propos de l'événement
            </Text>
            <Text className="text-textSecondary leading-6">
              {event.description}
            </Text>
          </View>

          {/* Type d'événement */}
          <View className="mb-20">
            <Text className="text-lg font-bold text-text mb-4">
              Type d'événement
            </Text>
            <View className="bg-surface rounded-full px-4 py-2 mr-2 mb-2 inline-block">
              <Text className="text-text">{event.type}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bouton Inscription fixed en bas */}
      <BlurView
        intensity={80}
        className="absolute bottom-0 left-0 right-0 p-4 border-t border-background"
      >
        <TouchableOpacity
          className="bg-secondary py-4 rounded-xl flex-row justify-center items-center"
          onPress={handleRegistration}
          disabled={isRegistering}
        >
          <Text className="text-white font-bold text-lg">
            {isRegistering ? "Inscription en cours..." : "S'inscrire maintenant"}
          </Text>
        </TouchableOpacity>
      </BlurView>
    </SafeAreaView>
  );
}
