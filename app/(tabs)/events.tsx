import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StatusBar, Dimensions } from 'react-native';
import * as Font from 'expo-font';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { upcomingEvents, featuredItems, categories } from '../../data/events';
import EventCard from '../../components/EventCard';
import FeaturedItemCard from '../../components/FeaturedItemCard';
import SectionHeader from '../../components/SectionHeader';
import CategoryFilter from '../../components/CategoryFilter';
import { LinearGradient } from 'expo-linear-gradient';
import SmartImage from '../../components/SmartImage';
// ...existing code...

export default function EventsScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredEvents, setFilteredEvents] = useState(upcomingEvents);
  const [filteredFeaturedItems, setFilteredFeaturedItems] = useState(featuredItems);
  const [fontLoaded, setFontLoaded] = useState(false);

  // Charger la police Manga
  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        'Manga': require('../../assets/fonts/Manga.ttf'),
      });
      setFontLoaded(true);
    }
    loadFont();
  }, []);

  // Calculer hauteur dynamique pour la bannière : insets.top + HEADER_HEIGHT
  const { height: screenHeight } = Dimensions.get('window');
  const insets = useSafeAreaInsets();
  const HEADER_HEIGHT = Math.round(screenHeight * 0.45);
  const bannerHeight = insets.top + HEADER_HEIGHT;

  // Filtrer les événements et les articles en vedette en fonction de la catégorie sélectionnée
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredEvents(upcomingEvents);
      setFilteredFeaturedItems(featuredItems);
    } else {
      setFilteredEvents(upcomingEvents.filter(event => event.category === selectedCategory));
      setFilteredFeaturedItems(featuredItems.filter(item => item.category === selectedCategory));
    }
  }, [selectedCategory]);

  // --- Nouveau: grouper les événements à venir par mois pour la section "À ne pas manquer"
  const groupEventsByMonth = (eventsList: typeof upcomingEvents, monthsAhead = 3) => {
    const groups: { title: string; events: typeof upcomingEvents }[] = [];
    const now = new Date();

    for (let m = 0; m < monthsAhead; m++) {
      const dt = new Date(now.getFullYear(), now.getMonth() + m, 1);
      const month = dt.getMonth();
      const year = dt.getFullYear();
      const title = dt.toLocaleString('fr-FR', { month: 'long', year: 'numeric' });

      const eventsInMonth = eventsList.filter(ev => {
        if (!ev.date) return false;
        const evDate = new Date(ev.date);
        return evDate.getMonth() === month && evDate.getFullYear() === year;
      });

      groups.push({ title, events: eventsInMonth as typeof upcomingEvents });
    }

    return groups;
  };

  // build month options for a selector (next N months)
  const buildMonthOptions = (monthsAhead = 6) => {
    const now = new Date();
    const opts: { key: string; label: string; date: Date }[] = [{ key: 'all', label: 'Tous', date: now }];
    for (let i = 0; i < monthsAhead; i++) {
      const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
      opts.push({ key: `${d.getFullYear()}-${d.getMonth() + 1}`, label: d.toLocaleString('fr-FR', { month: 'short', year: 'numeric' }), date: d });
    }
    return opts;
  };

  const monthOptions = buildMonthOptions(6);
  const [selectedMonth, setSelectedMonth] = useState<string>('all');

  // Fonction pour obtenir l'image de bannière selon la catégorie
  const getBannerImage = () => {
    switch (selectedCategory) {
      case "otaku":
        return "https://www.pixground.com/wp-content/uploads/2023/05/Yoriichi-Tsugikuni-Demon-Slayer-4K-Anime-Wallpaper-1081x608.jpg";
      case "cinema":
        return "https://controlpanel.people237.com/wp-content/uploads/2024/12/emy-dany-bassong-film-rdc-people237.jpg";
      case "festival":
        return "https://showbook.africa/storage/676/20240911_175900-(3).jpg";
      case "salon":
        return "https://i0.wp.com/lyon.citycrunch.fr/wp-content/uploads/sites/3/2025/09/499141996_10160522872361213_1073844037725864236_n.jpg?fit=2048%2C1365&ssl=1";
      case "divertement":
        return "https://www.pixground.com/wp-content/uploads/2023/05/Yoriichi-Tsugikuni-Demon-Slayer-4K-Anime-Wallpaper-1081x608.jpg";
      default:
        return "https://img.20mn.fr/6cHVD9cKQfus1TNgY_8teQ/1444x920_illustration-participants-japan-expo-2017-villepinte.jpg";
    }
  };

  // Fonction pour obtenir le titre de la bannière selon la catégorie
  const getBannerTitle = () => {
    switch(selectedCategory) {
      case 'manga': return 'Manga 2025';
      case 'cinema': return 'Annonce Cinéma 2025';
      case 'festival': return 'Festivités NGONDO 2025';
      case 'salon': return 'Salon International 2025';
      case 'otaku': return 'OTAKU 237 Convention';
      default: return 'Découvrez des événements';
    }
  };

  return (
    // allow the header image to extend under the status bar by excluding the top edge
    <SafeAreaView className="flex-1 bg-background" edges={['left','right','bottom']}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Hero Banner */}
        <View style={{ height: bannerHeight, justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }} className="relative mb-4">
          <SmartImage
            source={getBannerImage()}
            style={{ width: '100%', height: bannerHeight, position: 'absolute', top: 0, left: 0 }}
            contain={false}
          />

          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.35)', 'rgba(0,0,0,0.85)']}
            locations={[0, 0.4, 1]}
            style={{ 
              position: 'absolute', 
              left: 0, 
              right: 0, 
              top: 0, 
              height: bannerHeight,
              paddingTop: insets.top,
              padding: 20, 
              justifyContent: 'flex-end',
            }}
          >
            <View className="absolute top-12 bottom-1 left-4">
              {fontLoaded && (
                <Text style={{ 
                  color: 'white',
                  fontSize: 35,
                  fontFamily: 'Manga'
                }}>
                  IBENTO
                </Text>
              )}
            </View>
            
            <View>
              <Text className="text-white text-2xl font-bold mb-1">
                {getBannerTitle()}
              </Text>
              
                <TouchableOpacity 
                className="py-2 rounded-lg mt-3 w-[140px] bg-secondary"
                onPress={() => router.push(`/event-details/${selectedCategory}?from=events` as any)}
              >
                <Text className="text-white text-center font-bold text-base">
                  Participer
                </Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
        
        {/* Filtres de catégories */}
        <View className="px-4 mb-4">
          <CategoryFilter 
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </View>
        
        {/* Upcoming Events Section */}
        <View className="px-4 mb-6">
          <SectionHeader 
            title="Prochains événements" 
            onSeeAll={() => console.log("Voir tous les événements")} 
          />
          
          {filteredEvents.length > 0 ? (
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingRight: 16, paddingLeft: 4 }}
              className="mt-2"
            >
              {filteredEvents.map((event) => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  onPress={(id) => router.push(`/event-details/${id}?from=events` as any)} 
                />
              ))}
            </ScrollView>
          ) : (
            <View className="p-4 justify-center items-center">
              <Feather name="calendar" size={40} color="#ccc" />
              <Text className="text-textSecondary mt-2 text-center">
                Aucun événement trouvé dans cette catégorie
              </Text>
            </View>
          )}
        </View>
        
        {/* Featured / À ne pas manquer Section (grouped by month) */}
        <View className="px-4 mb-6">
          <SectionHeader 
            title="À ne pas manquer" 
            onSeeAll={() => console.log("Voir tous les articles")} 
          />

          {/* Month selector (Tous + next months) - clean, pill buttons */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-3" contentContainerStyle={{ paddingLeft: 4, paddingRight: 8 }}>
            {monthOptions.map(opt => {
              const active = selectedMonth === opt.key;
              return (
                <TouchableOpacity
                  key={opt.key}
                  onPress={() => setSelectedMonth(opt.key)}
                  style={{
                    paddingVertical: 8,
                    paddingHorizontal: 14,
                    marginRight: 8,
                    borderRadius: 20,
                    backgroundColor: active ? '#2b2b2b' : 'transparent',
                    borderWidth: active ? 0 : 1,
                    borderColor: 'rgba(255,255,255,0.08)'
                  }}
                >
                  <Text style={{ color: active ? 'white' : '#cfcfcf', fontWeight: active ? '700' : '500' }}>{opt.label}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <View className="mt-3">
            {selectedCategory === 'all' ? (
              // When viewing all categories, show upcoming events grouped by month for the next 3 months
              groupEventsByMonth(upcomingEvents, 3)
                .map((group) => ({ ...group, key: group.title }))
                .filter(group => {
                  if (selectedMonth === 'all') return true;
                  // compare group title month/year with selectedMonth key
                  const [y, m] = selectedMonth.split('-');
                  if (!y || !m) return true;
                  const groupDate = new Date(group.events[0]?.date || `${y}-${m}-01`);
                  return `${groupDate.getFullYear()}-${groupDate.getMonth() + 1}` === selectedMonth;
                })
                .map((group) => (
                  <View key={group.key} className="mb-4">
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <Text style={{ fontSize: 16, fontWeight: '700' }}>{group.title}</Text>
                      <View style={{ backgroundColor: '#ff6b6b', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 12 }}>
                        <Text style={{ color: 'white', fontWeight: '700' }}>{group.events.length} évts</Text>
                      </View>
                    </View>

                    {group.events.length > 0 ? (
                      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 16 }}>
                        {group.events.map(ev => (
                          <View key={ev.id} style={{ width: 260, marginRight: 12, borderRadius: 12, overflow: 'hidden', backgroundColor: '#fff', elevation: 2 }}>
                            <SmartImage source={ev.imageUrl} style={{ width: '100%', height: 140 }} contain={false} />
                            <View style={{ padding: 10 }}>
                              <Text style={{ fontSize: 15, fontWeight: '700', marginBottom: 4 }}>{ev.name}</Text>
                              <Text style={{ color: '#6b6b6b', marginBottom: 6 }}>{ev.location}</Text>
                              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ fontWeight: '700' }}>{ev.price ? `${ev.price} ${ev.currency}` : 'Gratuit'}</Text>
                                <TouchableOpacity onPress={() => router.push(`/event-details/${ev.id}?from=events` as any)} style={{ backgroundColor: '#111827', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 10 }}>
                                  <Text style={{ color: 'white', fontWeight: '700' }}>Voir</Text>
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                        ))}
                      </ScrollView>
                    ) : (
                      <View className="p-3 rounded-lg bg-surface">
                        <Text className="text-textSecondary">Aucun événement prévu pour cette période</Text>
                      </View>
                    )}
                  </View>
                ))
            ) : (
              // For a selected category, fallback to featured items as before
              filteredFeaturedItems.length > 0 ? (
                filteredFeaturedItems.map((item) => (
                  <FeaturedItemCard
                    key={item.id}
                    item={item}
                    onPress={(id) => console.log('Selected item:', id)}
                  />
                ))
              ) : (
                <View className="p-4 justify-center items-center">
                  <Feather name="star" size={40} color="#ccc" />
                  <Text className="text-textSecondary mt-2 text-center">
                    Aucun contenu en vedette dans cette catégorie
                  </Text>
                </View>
              )
            )}
          </View>
        </View>
        
        {/* Section découverte */}
        {selectedCategory === 'all' && (
          <View className="px-4 mb-6">
            <SectionHeader 
              title="Découvrir par catégorie" 
              onSeeAll={() => console.log("Voir toutes les catégories")} 
            />
            
            <View className="mt-2 flex-row flex-wrap justify-between">
              {categories.filter(cat => cat.id !== 'all').map((category) => (
                <TouchableOpacity 
                  key={category.id}
                  style={{ 
                    width: '48%', 
                    height: 100, 
                    marginBottom: 10,
                    borderRadius: 8,
                    overflow: 'hidden'
                  }}
                  onPress={() => setSelectedCategory(category.id)}
                >
                  <View className="relative w-full h-full">
                    <SmartImage
                      source={getBannerImage()}
                      style={{ width: '100%', height: '100%', opacity: 0.7 }}
                      contain={false}
                    />
                    <LinearGradient
                      colors={['rgba(0,0,0,0.35)', 'rgba(0,0,0,0.75)']}
                      style={{ 
                        position: 'absolute', 
                        left: 0, 
                        right: 0, 
                        top: 0, 
                        bottom: 0, 
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Text className="text-white font-bold text-base">{category.name}</Text>
                    </LinearGradient>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
        
        {/* Espace en bas pour éviter que le contenu soit caché par la barre de navigation */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
