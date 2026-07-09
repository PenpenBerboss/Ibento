import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Animated,
  Easing,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Compass,
  Users,
  Calendar,
  ListChecks,
  TrendingUp,
  MessageSquare,
  Star,
  MapPin,
  Clock,
  Menu,
  Search,
  Hop as Home,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from 'expo-blur';
import { VideoView, useVideoPlayer } from 'expo-video';
import { Platform } from 'react-native';
import * as Font from "expo-font";
import SmartImage from "../../components/SmartImage";
// import { privateChats } from './chats';

const VideoAdItem = ({ ad, isActive, isVisible }: { ad: any, isActive: boolean, isVisible: boolean }) => {
  const player = useVideoPlayer(ad.videoUrl, player => {
    player.loop = true;
    // La vidéo active n'est pas en sourdine, les autres le sont.
    player.muted = !isActive;
  });

  useEffect(() => {
    // Met à jour le son et la lecture lorsque la vidéo devient active/inactive
    player.muted = !isActive;
    if (isActive && isVisible) {
      player.play();
    } else {
      player.pause();
    }
  }, [isActive, isVisible, player]);

  return (
    <VideoView
      player={player}
      style={{ width: '100%', height: '100%' }}
      contentFit="cover"
      allowsPictureInPicture
    />
  );
};

const { width, height: screenHeight } = Dimensions.get("window");

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const adsRef = useRef<any>(null);
  const [activeAd, setActiveAd] = useState(0);
  // Les annonces utilisent maintenant des vidéos distantes jouées localement via WebView (HTML5 video)
  // Toutes les annonces utilisent maintenant des vidéos mp4 directes pour autoplay
  const ads = [
    {
      id: "ad1",
      title: "Discover the latest figures",
      subtitle: "Exclusive discounts this week",
      videoUrl:
        "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    },
    {
      id: "ad2",
      title: "Time Lapse of Times Square",
      subtitle: "Manhattan at rush hour",
      videoUrl:
        "https://media.istockphoto.com/id/866406672/video/time-lapse-of-times-square-new-york.mp4?s=mp4-640x640-is&k=20&c=ZDnqcSOO3-PyY3jihW-4TgesOd3CN7Qg9q2gSD_OJKA=",
    },
    {
      id: "ad3",
      title: "Social Network Concept",
      subtitle:
        "Social Network Concept with Blockchain Architecture Visualization",
      videoUrl:
        "https://media.istockphoto.com/id/1673647159/video/social-network-concept-with-blockchain-architecture-visualization-of-a-metaverse-big-data.mp4?s=mp4-640x640-is&k=20&c=uNLlw3GLRbpZKj2ZjZuEEoX_-ALGVlUlHH2pc6xQOJM=",
    },
    {
      id: "ad4",
      title: "Flux de médias sociaux",
      subtitle: "Marketing en ligne et travail indépendant",
      videoUrl:
        "https://media.istockphoto.com/id/1495100481/fr/vid%C3%A9o/flux-de-m%C3%A9dias-sociaux-%C3%A0-d%C3%A9filement-de-la-main-f%C3%A9minine-sur-les-plateformes-m%C3%A9diatiques.mp4?s=mp4-640x640-is&k=20&c=jy_P3U91yNWVsTGloqqsFMKiLpYfVzupFQ7w0KZ6MZo=",
    },
    {
      id: "ad5",
      title: "technologieIntelligence artificielle",
      subtitle: "Publicité, Moteur de recherche, publicité DigitalDisplay",
      videoUrl:
        "https://media.istockphoto.com/id/1945077529/fr/vid%C3%A9o/publicit%C3%A9-moteur-de-recherche-publicit%C3%A9-digitaldisplay-entreprise-technologieintelligence.mp4?s=mp4-640x640-is&k=20&c=JkxZ3oU2spelNMRUtsU-pExR2TjuRGKIZzYH_C7nKP4=",
    },
  ];
  const autoScroll = useRef<any>(null);
  const isDragging = useRef(false);
  // number of neighbor slides to pre-render (0 = only active)
  const PRELOAD_NEIGHBORS = 1;

  const isYouTube = (url?: string) => {
    if (!url) return false;
    return /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)/.test(url);
  };

  const getYouTubeEmbedUrl = (url: string) => {
    // normalize to embed URL
    let idMatch = url.match(/(?:v=|youtu\.be\/)([A-Za-z0-9_-]{6,})/);
    const id = idMatch ? idMatch[1] : url;
    // Les navigateurs bloquent l'autoplay si mute=0. On force mute=1.
    return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=0&playsinline=1&loop=1&playlist=${id}`;
  };

  // Fonction pour contrôler l'audio des vidéos
  const controlVideoAudio = (activeIndex: number) => {
    // Cette fonction sera appelée quand l'utilisateur change de vidéo
    // pour s'assurer que seule la vidéo active joue avec le son
    ads.forEach((_, index) => {
      const shouldPlay = index === activeIndex;
      // Le contrôle du son se fait via les paramètres HTML des vidéos
      // qui sont recréées à chaque changement d'index actif
    });
  };

  // Appeler la fonction de contrôle audio quand activeAd change
  useEffect(() => {
    controlVideoAudio(activeAd);
  }, [activeAd]);

  useEffect(() => {
    autoScroll.current = setInterval(() => {
      if (isDragging.current) return;
      const next = (activeAd + 1) % ads.length;
      const x = (width - 48) * next;
      if (adsRef.current && adsRef.current.scrollTo) {
        adsRef.current.scrollTo({ x, animated: true });
      }
      setActiveAd(next);
    }, 7000); // 7s interval

    return () => {
      if (autoScroll.current) clearInterval(autoScroll.current);
    };
  }, [activeAd]);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current; // 0 closed, 1 open
  const HEADER_HEIGHT = Math.round(screenHeight * 0.45);
  const bannerHeight = insets.top + HEADER_HEIGHT;

  const featuredAnime = {
    title: "Demon Slayer: Kimetsu no Yaiba",
    image:
      "https://media.gqmagazine.fr/photos/66a8c32ae836529d99eb2c28/16:9/w_1920,c_limit/Demon%20Slayer.jpg",
    rating: 9.4,
    members: "2.1M",
    description:
      "Le meilleur anime de la saison avec des combats épiques et une animation exceptionnelle.",
  };

  const upcomingEvents = [
    {
      id: "1",
      title: "OTAKU 237 Convention",
      image: "https://lebaneseotaku.com/assets/img/image-1.jpg",
      date: "25 Nov 2025",
      time: "10:00",
      location: "Palais des Sports, Yaoundé",
      description:
        "Le plus grand rassemblement otaku du Cameroun avec cosplay, gaming, et invités spéciaux.",
      price: "5000 FCFA",
    },
    {
      id: "2",
      title: "Festival NGONDO 2025",
      image: "https://showbook.africa/storage/676/20240911_175900-(3).jpg",
      date: "15 Dec 2025",
      time: "09:00",
      location: "Bord du Wouri, Douala",
      description:
        "Une célébration unique de la culture avec une exposition manga et anime spéciale.",
      price: "Gratuit",
    },
    {
      id: "3",
      title: "Cinéma Anime Night",
      image:
        "https://controlpanel.people237.com/wp-content/uploads/2024/12/emy-dany-bassong-film-rdc-people237.jpg",
      date: "30 Oct 2025",
      time: "19:00",
      location: "Canal Olympia, Douala",
      description:
        "Projection exclusive des derniers films d'animation japonais en avant-première.",
      price: "3000 FCFA",
    },
  ];

  const quickActions = [
    // {
    //   icon: ListChecks,
    //   label: "Ma Liste",
    //   color: "#1e90ff",
    //   route: "/my-list",
    // },
    // {
    //   icon: Users,
    //   label: "Communautés",
    //   color: "#CC0000",
    //   route: "/community"
    // },
    {
      icon: Compass, // Using Compass as Video is no longer imported from lucide
      label: "Reels",
      color: "#4ade80",
      route: "/reels",
    },
    {
      icon: Calendar,
      label: "Événements",
      color: "#fbbf24",
      route: "/events",
    },
  ];

  // Sample avatars for the 'Your Level' section
  const communityAvatars = [
    "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=80&h=80&fit=crop",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop",
    "https://images.unsplash.com/photo-1545996124-1b7a27b0a6f4?w=80&h=80&fit=crop",
    "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=80&h=80&fit=crop",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=80&h=80&fit=crop",
    "https://images.unsplash.com/photo-1531123414780-fc3cf2e7b0a6?w=80&h=80&fit=crop",
  ];

  // Charger la police "Manga" depuis assets/fonts/Manga.ttf
  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        await Font.loadAsync({
          Manga: require("../../assets/fonts/Manga.ttf"),
        });
        if (mounted) setFontsLoaded(true);
      } catch (e) {
        // Si la police n'est pas présente, on reste sur la police système
        console.warn(
          "Police Manga non trouvée. Placez le fichier Manga.ttf dans assets/fonts/"
        );
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const toggleDrawer = useCallback(
    (open?: boolean) => {
      const toValue =
        typeof open === "boolean" ? (open ? 1 : 0) : drawerOpen ? 0 : 1;
      setDrawerOpen((prev) => (typeof open === "boolean" ? open : !prev));
      Animated.timing(slideAnim, {
        toValue,
        duration: 300,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    },
    [drawerOpen, slideAnim]
  );

  return (
    <SafeAreaView
      className="flex-1 bg-background"
      edges={["left", "right", "bottom"]}
    >
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      {/* Header fixe */}
      <BlurView
        intensity={80}
        className="absolute top-0 left-0 right-0 z-10"
        style={{ paddingTop: insets.top }}
      >
        <View className="h-14 flex-row items-center px-4">
          <TouchableOpacity
            className="w-10 h-10 items-center justify-center"
            onPress={() => toggleDrawer(true)}
          >
            <Menu size={24} color="#fff" />
          </TouchableOpacity>

          <View className="flex-1 items-center">
            <Text
              className={`text-white text-3xl font-bold`}
              style={fontsLoaded ? { fontFamily: "Manga" } : {}}
            >
              IBENTO
            </Text>
          </View>

          <TouchableOpacity
            className="w-10 h-10 items-center justify-center"
            onPress={() => {
              /* TODO: Ouvrir la recherche */
            }}
          ></TouchableOpacity>
        </View>
      </BlurView>

      {/* Drawer moderne et épuré */}
      <Animated.View
        pointerEvents={drawerOpen ? "auto" : "none"}
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          width: Math.min(320, width * 0.85),
          transform: [
            {
              translateX: slideAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [Math.min(320, width * 0.85), 0],
              }),
            },
          ],
          opacity: slideAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
          }),
          zIndex: 20,
        }}
      >
        <BlurView intensity={20} className="flex-1">
          <LinearGradient
            colors={["rgba(30,144,255,0.1)", "rgba(204,0,0,0.05)"]}
            className="flex-1 px-6 pt-4 pb-8"
            style={{ paddingTop: insets.top }}
          >
            <View className="flex-row items-center justify-between mb-8">
              <Text
                className={`text-white text-2xl font-bold`}
                style={fontsLoaded ? { fontFamily: "Manga" } : {}}
              >
                IBENTO
              </Text>
              <TouchableOpacity
                onPress={() => toggleDrawer(false)}
                className="w-8 h-8 items-center justify-center rounded-full bg-white/10"
              >
                <Text className="text-white text-lg">×</Text>
              </TouchableOpacity>
            </View>

            {/* Profile preview */}
            <TouchableOpacity
              className="flex-row items-center mb-8 p-3 rounded-2xl bg-black/20"
              onPress={() => {
                toggleDrawer(false);
                router.push("/profile" as any);
              }}
            >
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
                }}
                className="w-12 h-12 rounded-full"
              />
              <View className="ml-3 flex-1">
                <Text className="text-white font-semibold">Penpen berboss</Text>
                <Text className="text-white/60 text-sm">Voir le profil</Text>
              </View>
            </TouchableOpacity>

            {/* Items du menu avec icônes et effets */}
            <View className="space-y-2">
              {[
                { icon: Home, label: "Accueil", route: "/" },
                // { icon: ListChecks, label: "Ma Liste", route: "/my-list" },
                { icon: Users, label: "Communautés", route: "/community" },
                { icon: Compass, label: "Reels", route: "/reels" },
                { icon: Calendar, label: "Événements", route: "/events" },
              ].map((item, index) => (
                <TouchableOpacity
                  key={index}
                  className="flex-row items-center p-3 rounded-2xl bg-black/10 active:bg-black/20"
                  style={{ transform: [{ scale: 1 }] }}
                  onPress={() => {
                    toggleDrawer(false);
                    router.push(item.route as any);
                  }}
                >
                  <View className="w-8 h-8 items-center justify-center rounded-full bg-black/20">
                    <item.icon size={18} color="#fff" />
                  </View>
                  <Text className="text-white ml-3 font-medium">
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Footer avec version */}
            <View className="mt-auto pt-8">
              <Text className="text-white/40 text-sm text-center">
                Version 1.0.0
              </Text>
            </View>
          </LinearGradient>
        </BlurView>
      </Animated.View>

      <ScrollView className="flex-1">
        {/* Hero Section avec Featured Anime */}
        <View
          style={{ height: bannerHeight, backgroundColor: "#000" }}
          className="relative items-center justify-center"
        >
          <SmartImage
            source={featuredAnime.image}
            style={{
              width: "100%",
              height: bannerHeight,
              position: "absolute",
              top: 0,
              left: 0,
            }}
            contain={false}
          />
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.35)", "rgba(0,0,0,0.85)"]}
            locations={[0, 0.4, 1]}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              height: bannerHeight,
              paddingTop: insets.top,
            }}
          />
          <View className="absolute bottom-0 w-full p-6">
            <Text className="text-white text-3xl font-bold mb-2">
              {featuredAnime.title}
            </Text>
            <Text className="text-white opacity-80 mb-4" numberOfLines={2}>
              {featuredAnime.description}
            </Text>
            <View className="flex-row items-center space-x-4">
              <View className="flex-row items-center">
                <Star size={16} color="#fbbf24" />
                <Text className="text-white ml-1">{featuredAnime.rating}</Text>
              </View>
              <View className="flex-row items-center">
                <Users size={16} color="#fff" />
                <Text className="text-white ml-1">{featuredAnime.members}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Create post + Your Level (modernized) */}
        <View className="px-6 py-6 space-y-4">
          {/* Create community post — dark, rounded */}
          <View
            className="rounded-2xl overflow-hidden"
            style={{ elevation: 6 }}
          >
            {/* <View
              style={{ backgroundColor: "#0f1724" }}
              className="p-3 flex-row items-center justify-between"
            >
              <View className="flex-row items-center space-x-3">
                <TouchableOpacity
                  onPress={() => router.push("/community/create" as any)}
                  className="w-10 h-10 rounded-lg items-center justify-center"
                  style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
                >
                  <MessageSquare size={18} color="#f8fafc" />
                </TouchableOpacity>
                <Text className="text-white/70">Create community post...</Text>
              </View>

              <View className="flex-row items-center space-x-2">
                <TouchableOpacity className="p-2 bg-white/6 rounded-md">
                  <Feather name="image" size={18} color="#f8fafc" />
                </TouchableOpacity>
                <TouchableOpacity className="p-2 bg-white/6 rounded-md">
                  <Feather name="smile" size={18} color="#f8fafc" />
                </TouchableOpacity>
              </View>
            </View> */}
          </View>

          {/*
            Your Level card — colorful and compact
            (commented out per request)

          <View style={{ borderRadius: 16, overflow: "hidden", elevation: 6 }}>
            <LinearGradient colors={["#061225", "#0b1522"]} className="p-4">
              <View className="flex-row items-center justify-between mb-3">
                <View className="flex-row items-center">
                  <Image
                    source={require("../../assets/16.png")}
                    style={{ width: 35, height: 35 }}
                  />
                  <Text className="text-white font-semibold ml-2">
                    Your Level
                  </Text>
                </View>

                <View className="flex-row items-center">
                  <Text className="text-white font-bold text-lg mr-2">32</Text>
                  <Image
                    source={require("../../assets/15.png")}
                    style={{ width: 27, height: 27 }}
                  />
                </View>
              </View>

              <View className="mb-2">
                <View className="w-full h-2 bg-white/6 rounded-full overflow-hidden">
                  <View
                    style={{
                      width: "78%",
                      height: "100%",
                      backgroundColor: "#fbbf24",
                    }}
                  />
                </View>
              </View>

              <View className="flex-row justify-between items-center">
                <Text className="text-white/60 text-sm">Exp</Text>
                <Text className="text-white/60 text-sm">64,376/63,000</Text>
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="pt-3"
              >
                Avatars temporarily commented out
              </ScrollView>
            </LinearGradient>
          </View>

          */}

          {/* Modern Create Event card */}
          <TouchableOpacity
            onPress={() => router.push("/events/create" as any)}
            activeOpacity={0.9}
            style={{
              borderRadius: 14,
              overflow: "hidden",
              backgroundColor: "#071224",
              padding: 12,
              elevation: 6,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ width: 44, height: 44, borderRadius: 10, backgroundColor: '#0b1220', alignItems: 'center', justifyContent: 'center' }}>
                <Calendar size={20} color="#fff" />
              </View>

              <View style={{ marginLeft: 12 }}>
                <Text style={{ color: "#fff", fontSize: 15, fontWeight: "700" }}>Create an event</Text>
                <Text style={{ color: "#9ca3af", fontSize: 12, marginTop: 2 }}>Share location, date and details</Text>
              </View>
            </View>

            {/* right side intentionally removed for a cleaner look */}
          </TouchableOpacity>
          {/* Sponsored Ads carousel */}
          <View className="mt-4">
            <Text className="text-textSecondary mb-3">Sponsored</Text>
            <View style={{ height: 230 }}>
              <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                ref={(r) => { adsRef.current = r as any; }}
                onMomentumScrollEnd={(e) => {
                  const idx = Math.round(e.nativeEvent.contentOffset.x / (width - 48));
                  setActiveAd(idx);
                }}
                onScrollBeginDrag={() => { isDragging.current = true; if (autoScroll.current) clearInterval(autoScroll.current); }}
                onScrollEndDrag={() => { isDragging.current = false; autoScroll.current = setInterval(() => {
                  const next = (activeAd + 1) % ads.length;
                  const x = (width - 48) * next;
                  if (adsRef.current && adsRef.current.scrollTo) {
                    adsRef.current.scrollTo({ x, animated: true });
                  }
                  setActiveAd(next);
                }, 3000); }}
              >
                {ads.map((ad, i) => (
                  <View
                    key={ad.id}
                    style={{
                      width: width - 48,
                      marginRight: 12,
                      borderRadius: 12,
                      overflow: 'hidden',
                      backgroundColor: '#071025',
                      elevation: 6,
                    }}
                  >
                    <View style={{ width: '100%', height: 210, position: 'relative' }}>
                      { (i === activeAd || Math.abs(i - activeAd) <= PRELOAD_NEIGHBORS) && ad.videoUrl ? (
                        // Utiliser des éléments HTML natifs pour le web
                        Platform.OS === 'web' ? (
                          isYouTube(ad.videoUrl) ? (
                            <iframe
                              src={getYouTubeEmbedUrl(ad.videoUrl)}
                              style={{ 
                                width: '100%', 
                                height: '100%', 
                                border: 0,
                                backgroundColor: 'transparent'
                              }}
                              allow="autoplay; encrypted-media"
                              allowFullScreen
                            />
                          ) : (
                            <video
                              src={ad.videoUrl}
                              autoPlay
                              loop
                              playsInline
                              // Obligatoire pour l'autoplay sur la plupart des navigateurs
                              muted
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                backgroundColor: 'transparent'
                              }}
                            />
                          )
                        ) : (
                          <VideoAdItem
                            ad={ad}
                            isActive={i === activeAd}
                            isVisible={Math.abs(i - activeAd) <= PRELOAD_NEIGHBORS}
                          />
                        )
                      ) : (
                        // Empty placeholder to reserve layout and reduce memory
                        <View style={{ width: '100%', height: '100%', backgroundColor: '#000' }} />
                      )}

                      {/* Gradient overlay for better text readability */}
                      <LinearGradient
                        colors={["transparent", "rgba(0,0,0,0.25)", "rgba(0,0,0,0.7)"]}
                        locations={[0, 0.5, 1]}
                        style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                      />

                      {/* Sponsored badge */}
                      <View style={{ position: 'absolute', left: 12, top: 12, backgroundColor: '#ffffff22', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 }}>
                        <Text className="text-white text-xs font-semibold">Sponsored</Text>
                      </View>

                      {/* Title block */}
                      <View style={{ position: 'absolute', left: 12, right: 12, bottom: 12 }}>
                        <Text style={{ color: '#fff', fontSize: 16, fontWeight: '700', textShadowColor: 'rgba(0,0,0,0.6)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 2 }}>{ad.title}</Text>
                        <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, marginTop: 4 }}>{ad.subtitle}</Text>
                      </View>
                    </View>
                  </View>
                ))}
              </ScrollView>

              {/* Pagination dots */}
              <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8 }}>
                {ads.map((_, i) => (
                  <View key={i} style={{ width: i === activeAd ? 10 : 8, height: i === activeAd ? 10 : 8, borderRadius: 6, marginHorizontal: 5, backgroundColor: i === activeAd ? '#f59e0b' : '#ffffff2a', transform: [{ scale: i === activeAd ? 1.05 : 1 }] }} />
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* Événements à venir */}
        <View className="px-6 pb-8">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-text text-lg font-bold">
              Événements
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/events")}
              className="flex-row items-center"
            >
              <Text className="text-primary mr-2">Voir tout</Text>
              <TrendingUp size={16} color="#1e90ff" />
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 20 }}
          >
            {upcomingEvents.map((event, index) => (
              <TouchableOpacity
                key={event.id}
                onPress={() => router.push(`/events/${event.id}` as any)}
                className="mr-4 bg-surface rounded-2xl overflow-hidden"
                style={{
                  width: width * 0.75,
                  elevation: 2,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.08,
                  shadowRadius: 4,
                }}
              >
                <View className="relative">
                  <SmartImage
                    source={event.image}
                    style={{ width: "100%", height: 140 }}
                    contain={false}
                  />
                  <View className="absolute top-3 right-3">
                    <BlurView
                      intensity={80}
                      className="rounded-full overflow-hidden"
                    >
                      <Text className="text-white text-xs px-3 py-1 font-medium">
                        {event.price}
                      </Text>
                    </BlurView>
                  </View>
                </View>

                <View className="p-4">
                  <Text
                    className="text-text text-lg font-bold mb-2"
                    numberOfLines={1}
                  >
                    {event.title}
                  </Text>

                  <View className="flex-row items-center mb-3">
                    <View className="flex-row items-center bg-primary/10 rounded-full px-2 py-1">
                      <Clock size={14} color="#1e90ff" />
                      <Text className="text-primary text-xs ml-1 font-medium">
                        {event.date}
                      </Text>
                    </View>
                    <Text className="text-textSecondary text-xs mx-2">•</Text>
                    <Text className="text-textSecondary text-xs">
                      {event.time}
                    </Text>
                  </View>

                  <View className="flex-row items-center">
                    <MapPin size={14} color="#64748b" />
                    <Text
                      className="text-textSecondary text-xs ml-1 flex-1"
                      numberOfLines={1}
                    >
                      {event.location}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Espacement pour la barre de navigation */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
