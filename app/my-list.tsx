import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  Animated, 
  Dimensions,
  FlatList
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
// Les couleurs sont définies dans tailwind.config.js
import AnimeCard from '../components/AnimeCard';
import AnimeGridCard from '../components/AnimeGridCard';
import ModernTabHeader from '../components/ModernTabHeader';
import EmptyState from '../components/EmptyState';
import StatusBadge from '../components/StatusBadge';
import { animeList } from '../data/animeList';
import { fadeIn, staggeredFadeIn } from '../utils/animations';
import { ChevronLeft } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

export default function MyListScreen() {
  const navigation = useNavigation();
  const params = useLocalSearchParams();
  const goBack = () => {
    // If we were opened from settings, go back to settings explicitly
    try {
      // params can be any, ensure it's an object with 'from'
      // @ts-ignore
      if (params && params.from === 'settings') {
        router.push('/settings');
        return;
      }
    } catch (e) {
      // ignore
    }

    try {
      // 1) try regular goBack
      // @ts-ignore
      if (navigation?.canGoBack && navigation.canGoBack()) {
        // @ts-ignore
        navigation.goBack();
        return;
      }

      // 2) try parent navigator
      // @ts-ignore
      const parent = navigation?.getParent && navigation.getParent();
      if (parent && parent.canGoBack && parent.canGoBack()) {
        try {
          // @ts-ignore
          parent.goBack();
          return;
        } catch (e) {
          // ignore
        }
      }

      // 3) try router.back()
      try {
        router.back();
        return;
      } catch (e) {
        // ignore
      }
    } catch (e) {
      // ignore
    }

    // final fallback
    router.push('/');
  };
  const [activeTab, setActiveTab] = useState('Watching');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const tabs = ['Watching', 'Completed', 'On-hold', 'Dropped'];
  
  // Animations
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;
  const tabBarTranslateY = useRef(new Animated.Value(50)).current;

  // Icônes pour les onglets
  const tabIcons = {
    'Watching': 'play',
    'Completed': 'check-circle',
    'On-hold': 'pause-circle',
    'Dropped': 'x-circle'
  };
  
  // Filtrer les animes selon l'onglet actif
  const filteredAnime = animeList.filter(anime => {
    switch (activeTab) {
      case 'Watching': return anime.status === 'watching';
      case 'Completed': return anime.status === 'completed';
      case 'On-hold': return anime.status === 'on-hold';
      case 'Dropped': return anime.status === 'dropped';
      default: return true;
    }
  });

  // Gérer les animations au montage du composant
  useEffect(() => {
    Animated.parallel([
      Animated.timing(headerOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(tabBarTranslateY, {
        toValue: 0,
        tension: 40,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.timing(contentOpacity, {
        toValue: 1,
        duration: 600,
        delay: 300,
        useNativeDriver: true,
      })
    ]).start();
  }, []);
  
  // Gérer le changement d'onglet avec animations
  const handleTabChange = (tab: string) => {
    Animated.timing(contentOpacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setActiveTab(tab);
      Animated.timing(contentOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();
    });
  };

  const renderEmptyState = () => (
    <EmptyState 
      title={`Pas d'anime dans la liste ${activeTab.toLowerCase()}`}
      message="Ajoutez des animes à votre liste pour les voir apparaître ici."
      icon={tabIcons[activeTab as keyof typeof tabIcons]}
      buttonText="Parcourir les animes"
      onButtonPress={() => console.log('Browse animes')}
    />
  );

  // Rendu des éléments en mode grille
  const renderGridItem = ({ item, index }: { item: any, index: number }) => (
    <AnimeGridCard 
      anime={item} 
      onPress={(id) => console.log('Selected anime:', id)}
      index={index}
    />
  );

  // Rendu des éléments en mode liste
  const renderListItem = ({ item }: { item: any }) => (
    <AnimeCard 
      anime={item}
      onStatusChange={(id) => console.log('Change status for:', id)}
      onDelete={(id) => console.log('Delete:', id)}
    />
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header Animé avec Gradient */}
      <Animated.View className="z-10" style={{ opacity: headerOpacity }}>
        <LinearGradient
          colors={["#1e90ff", "rgba(204,0,0,0.9)"]}
          className="pt-2.5 px-4 pb-4"
        >
          <View className="flex-row items-center justify-between mb-4">
            <TouchableOpacity
              className="w-10 h-10 items-center justify-center rounded-full bg-white/10"
              onPress={goBack}
            >
              <ChevronLeft size={24} color="#ffffff" />
            </TouchableOpacity>

            <Text className="text-white text-xl font-bold">Ma Liste</Text>

            <View className="flex-row items-center bg-black/20 rounded-lg p-0.5">
              <TouchableOpacity
                onPress={() => setViewMode("list")}
                className={`w-8 h-8 rounded-md items-center justify-center ${
                  viewMode === "list" ? "bg-secondary" : "bg-black/20"
                }`}
              >
                <Feather name="list" size={16} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setViewMode("grid")}
                className={`w-8 h-8 rounded-md items-center justify-center ${
                  viewMode === "grid" ? "bg-secondary" : "bg-black/20"
                }`}
              >
                <Feather name="grid" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>

          <View className="flex-row bg-[rgba(40,40,50,0.8)] rounded-xl p-0.5 self-center">
            <TouchableOpacity className="px-5 py-1.5 rounded-lg bg-primary">
              <Text className="text-white font-semibold text-sm">Anime</Text>
            </TouchableOpacity>
            <TouchableOpacity className="px-5 py-1.5 rounded-lg">
              <Text className="text-white font-semibold text-sm">Manga</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </Animated.View>

      {/* Tabs avec animation */}
      <Animated.View
        className="z-5"
        style={{ transform: [{ translateY: tabBarTranslateY }] }}
      >
        <ModernTabHeader
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          icons={tabIcons}
        />

        <View className="flex-row items-center justify-between px-4 py-2 bg-black/5 border-b border-black/10">
          <StatusBadge status={activeTab.toLowerCase() as any} size="small" />
          <Text className="text-secondary text-sm font-medium">
            {filteredAnime.length}{" "}
            {filteredAnime.length === 1 ? "anime" : "animes"}
          </Text>
        </View>
      </Animated.View>

      {/* Contenu avec animation */}
      <Animated.View className="flex-1 z-1" style={{ opacity: contentOpacity }}>
        {filteredAnime.length === 0 ? (
          renderEmptyState()
        ) : viewMode === "grid" ? (
          <FlatList
            key="grid"
            data={filteredAnime}
            renderItem={renderGridItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ padding: 8, paddingBottom: 20 }}
          />
        ) : (
          <FlatList
            key="list"
            data={filteredAnime}
            renderItem={renderListItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ padding: 16, paddingBottom: 20 }}
          />
        )}
      </Animated.View>

      {/* Bouton flottant pour ajouter */}
      <TouchableOpacity
        className="absolute bottom-6 right-6 w-14 h-14 rounded-full bg-primary items-center justify-center"
        style={{
          elevation: 5,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 3,
        }}
      >
        <Feather name="plus" size={24} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// Tous les styles sont maintenant gérés via les classes Tailwind