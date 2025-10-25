import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet,
  StatusBar,
  FlatList,
  Animated,
  Dimensions,
  TextInput,
  ScrollView,
  Image,
  ImageBackground
} from 'react-native';
import * as Font from 'expo-font';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Grid, List, Plus, Search, SlidersHorizontal, TrendingUp, Users } from 'lucide-react-native';
import { MangaText } from '../../../components/TextStyle';
import { BlurView } from 'expo-blur';
import SmartImage from '../../../components/SmartImage';
import { LinearGradient } from 'expo-linear-gradient';
import CommunityCard from '../../../components/CommunityCard';
import { useCommunityStore } from '../../../hooks/useCommunityStore';
import AnimatedContainer from '../../../components/AnimatedContainer';

const { width } = Dimensions.get('window');
const CATEGORIES = ['Toutes', 'Manga', 'Festivals', 'Cinéma', 'Événements', 'Culture'];

export default function CommunityScreen() {
  const router = useRouter();
  const { communities } = useCommunityStore();
  const [gridView, setGridView] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Toutes');
  const [showSearch, setShowSearch] = useState(false);
  const [fontLoaded, setFontLoaded] = useState(false);

  // Chargement de la police Manga
 useEffect(() => {
     async function loadFont() {
       await Font.loadAsync({
         'Manga': require('../../../assets/fonts/Manga.ttf'),
       });
       setFontLoaded(true);
     }
     loadFont();
   }, []);
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const searchWidth = useRef(new Animated.Value(0)).current;
  const headerHeight = useRef(new Animated.Value(130)).current;
  
  // Search animation
  const toggleSearch = () => {
    if (showSearch) {
      // Hide search
      Animated.timing(searchWidth, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
      setShowSearch(false);
      setSearchText('');
    } else {
      // Show search
      setShowSearch(true);
      Animated.timing(searchWidth, {
        toValue: width - 80,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };
  
  // Initial animation
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);
  
  const navigateToCreate = () => {
    router.push('/community/create' as any);
  };
  
  // Filter communities based on search and category
  const filteredCommunities = communities.filter(community => {
    const matchesSearch = searchText === '' || 
      community.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = selectedCategory === 'Toutes' || 
      community.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (!fontLoaded) {
    return (
      <SafeAreaView className="flex-1 bg-background items-center justify-center">
        <StatusBar barStyle="dark-content" />
        <Text>Chargement...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar barStyle="dark-content" />

      <Animated.View style={{ opacity: fadeAnim }} className="flex-1">
        {/* Header moderne et épuré */}
        <Animated.View style={{ height: headerHeight }}>
          <View className="px-5 pt-2">
            {/* Titre et boutons de mode d'affichage */}
            <View className="flex-row items-center justify-between mb-4">
              <View>
                <View className="flex-row items-center">
                  {/* <Users size={20} color="#CC0000" style={{ marginRight: 8 }} /> */}
                  <MangaText className="text-text text-2xl font-bold">
                    Communautés
                  </MangaText>
                </View>
              </View>

              <View className="flex-row items-center">
                {/* Bouton de recherche */}
                <TouchableOpacity
                  onPress={toggleSearch}
                  className="p-2.5 rounded-full bg-surface mr-3 shadow-sm"
                >
                  <Search size={18} color={showSearch ? "#1e90ff" : "#555"} />
                </TouchableOpacity>

                {/* Mode d'affichage */}
                <View className="bg-surface rounded-xl p-1 shadow-sm">
                  <View className="flex-row">
                    <TouchableOpacity
                      onPress={() => setGridView(true)}
                      className={`p-2 rounded-lg ${
                        gridView ? "bg-primary" : "bg-transparent"
                      }`}
                      style={{ elevation: gridView ? 1 : 0 }}
                    >
                      <Grid size={18} color={gridView ? "#fff" : "#555"} />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => setGridView(false)}
                      className={`p-2 rounded-lg ${
                        !gridView ? "bg-primary" : "bg-transparent"
                      }`}
                      style={{ elevation: !gridView ? 1 : 0 }}
                    >
                      <List size={18} color={!gridView ? "#fff" : "#555"} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>

            {/* Barre de recherche animée */}
            <View className="flex-row items-center justify-between mb-4">
              {showSearch ? (
                <Animated.View
                  style={{ width: searchWidth }}
                  className="flex-row items-center bg-surface rounded-xl border border-gray-100 shadow-sm overflow-hidden"
                >
                  <TextInput
                    value={searchText}
                    onChangeText={setSearchText}
                    placeholder="Rechercher une communauté..."
                    placeholderTextColor="#777"
                    className="flex-1 px-4 py-2.5"
                    autoFocus
                  />
                  {searchText !== "" && (
                    <TouchableOpacity
                      onPress={() => setSearchText("")}
                      className="px-3"
                    >
                      <View className="bg-gray-100 rounded-full p-1">
                        <Text className="text-xs text-gray-500">×</Text>
                      </View>
                    </TouchableOpacity>
                  )}
                </Animated.View>
              ) : (
                <View className="flex-row items-center">
                  <View className="bg-secondary/10 p-1.5 rounded-lg mr-2">
                    <SlidersHorizontal size={15} color="#CC0000" />
                  </View>
                  <Text className="text-text font-medium">
                    {filteredCommunities.length} communautés
                  </Text>
                </View>
              )}

              {!showSearch && (
                <View className="flex-row items-center">
                  <TrendingUp size={13} color="#1e90ff" />
                  <MangaText className="text-primary text-xs font-medium ml-1">
                    Tendances
                  </MangaText>
                </View>
              )}
            </View>
          </View>
        </Animated.View>

        {/* Barre de catégories fixe */}
        <View className="bg-background px-4 py-2 z-10">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {CATEGORIES.map((category) => (
              <TouchableOpacity
                key={category}
                onPress={() => setSelectedCategory(category)}
                className={`mr-2 px-4 py-2 rounded-xl ${
                  selectedCategory === category
                    ? "bg-secondary shadow-sm"
                    : "bg-surface border border-gray-100"
                }`}
              >
                <MangaText
                  className={`font-medium text-sm ${
                    selectedCategory === category
                      ? "text-white"
                      : "text-textSecondary"
                  }`}
                >
                  {category}
                </MangaText>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View className="h-[1px] bg-gray-100 mt-2" />
        </View>

        {/* Contenu principal avec des cartes modernes */}
        {filteredCommunities.length === 0 ? (
          <View className="flex-1 items-center justify-center px-6">
            <View className="bg-secondary/10 p-4 rounded-full mb-4">
              <Search size={30} color="#CC0000" />
            </View>
            <MangaText className="text-text text-lg font-bold text-center mb-2">
              Aucune communauté trouvée
            </MangaText>
            <MangaText className="text-textSecondary text-center mb-5">
              Essayez avec d'autres termes de recherche ou une catégorie
              différente
            </MangaText>
            <TouchableOpacity
              onPress={() => {
                setSearchText("");
                setSelectedCategory("Toutes");
              }}
              className="bg-primary px-5 py-3 rounded-xl"
            >
              <MangaText className="text-white font-medium">Tout afficher</MangaText>
            </TouchableOpacity>
          </View>
        ) : gridView ? (
          <FlatList
            key={"grid"}
            data={filteredCommunities}
            renderItem={({ item, index }) => (
              <AnimatedContainer
                type="fadeIn"
                delay={index * 100}
                duration={400}
              >
                <TouchableOpacity
                  onPress={() => router.push(`/community/${item.id}` as any)}
                  className="mb-4 mx-2 relative"
                  style={{
                    width: (width - 50) / 2,
                    borderRadius: 16,
                    overflow: "hidden",
                    elevation: 3,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.05,
                    shadowRadius: 3.84,
                  }}
                >
                  <View className="bg-surface border border-gray-100 rounded-2xl overflow-hidden">
                    <View
                      className="h-[140px] w-full overflow-hidden"
                      style={{ backgroundColor: "#f5f5f5" }}
                    >
                      {item.cover ? (
                        <ImageBackground
                          source={{ uri: item.cover }}
                          style={{ width: '100%', height: 140 }}
                          resizeMode="cover"
                        >
                          <BlurView intensity={15} className="absolute inset-0" />
                          <LinearGradient
                            colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.6)"]}
                            className="absolute inset-0"
                          />
                          <View className="absolute inset-0 items-center justify-center">
                            <View className="h-16 w-16 rounded-full bg-white/20 items-center justify-center overflow-hidden">
                              <View className="h-14 w-14 rounded-full overflow-hidden border-2 border-white">
                                <SmartImage
                                  source={item.posts[0]?.authorAvatar || "https://i.pravatar.cc/150"}
                                  style={{ width: '100%', height: '100%' }}
                                  contain={false}
                                />
                              </View>
                            </View>
                          </View>
                        </ImageBackground>
                      ) : null}
                    </View>

                    <View className="p-3">
                      <MangaText
                        className="text-text font-bold text-center"
                        numberOfLines={1}
                      >
                        {item.name}
                      </MangaText>
                      <MangaText
                        className="text-textSecondary text-xs text-center mb-1"
                        numberOfLines={1}
                      >
                        {item.category}
                      </MangaText>

                      <View className="flex-row items-center justify-center mt-2 bg-gray-50 py-1 rounded-full">
                        <Users size={12} color="#555" />
                        <MangaText className="text-textSecondary text-xs ml-1">
                          {item.members} membres
                        </MangaText>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </AnimatedContainer>
            )}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingBottom: 100,
            }}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <FlatList
            key={"list"}
            data={filteredCommunities}
            renderItem={({ item, index }) => (
              <AnimatedContainer
                type="slideLeft"
                delay={index * 100}
                duration={400}
              >
                <TouchableOpacity
                  onPress={() => router.push(`/community/${item.id}` as any)}
                  className="mb-5 mx-0"
                  style={{
                    width: width - 40,
                    borderRadius: 16,
                    overflow: "hidden",
                    elevation: 2,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.05,
                    shadowRadius: 2,
                  }}
                >
                  <View className="bg-surface border border-gray-100 rounded-2xl overflow-hidden">
                    <View className="flex-row">
                      <View
                        className="h-24 w-24 items-center justify-center overflow-hidden"
                        style={{ backgroundColor: "#f5f5f5" }}
                      >
                        {item.cover ? (
                          <>
                            <SmartImage
                              source={item.cover}
                              style={{ width: 96, height: 96 }}
                              contain={false}
                            />
                            <View className="absolute inset-0 items-center justify-center">
                              <View className="h-16 w-16 rounded-full overflow-hidden border-2 border-white bg-white shadow-sm">
                                <SmartImage
                                  source={item.posts[0]?.authorAvatar || "https://i.pravatar.cc/150"}
                                  style={{ width: '100%', height: '100%' }}
                                  contain={false}
                                />
                              </View>
                            </View>
                          </>
                        ) : (
                          <View className="h-16 w-16 rounded-full bg-primary/20 items-center justify-center">
                            <Users size={24} color="#1e90ff" />
                          </View>
                        )}
                      </View>

                      <View className="flex-1 p-3 justify-center">
                        <View className="flex-row items-center justify-between">
                          <View className="flex-1">
                            <Text
                              className="text-text font-bold"
                              numberOfLines={1}
                            >
                              {item.name}
                            </Text>
                            <Text className="text-textSecondary text-xs mb-2">
                              {item.category}
                            </Text>
                          </View>

                          <View className="bg-primary/10 px-2 py-1 rounded-full">
                            <Text className="text-primary text-xs font-medium">
                              {item.members} membres
                            </Text>
                          </View>
                        </View>

                        <Text
                          className="text-textSecondary text-xs"
                          numberOfLines={2}
                        >
                          {item.description ||
                            "Rejoignez cette communauté pour partager votre passion !"}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </AnimatedContainer>
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingBottom: 100,
            }}
            showsVerticalScrollIndicator={false}
          />
        )}

        {/* Bouton flottant d'ajout de communauté */}
        <AnimatedContainer type="bounce" delay={300} duration={500}>
          <TouchableOpacity
            className="absolute bottom-24 right-6 bg-secondary w-14 h-14 rounded-full items-center justify-center shadow-lg"
            style={{
              elevation: 5,
              shadowColor: "#CC0000",
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.3,
              shadowRadius: 5,
            }}
            onPress={navigateToCreate}
          >
            <LinearGradient
              colors={["#CC0000", "#FF4444"]}
              className="absolute inset-0 rounded-full"
            />
            <Plus size={24} color="#fff" />
          </TouchableOpacity>
        </AnimatedContainer>
      </Animated.View>
    </SafeAreaView>
  );
}
