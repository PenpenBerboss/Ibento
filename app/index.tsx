import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, ActivityIndicator, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/hooks/useAuthStore';

export default function SplashScreen() {
  const router = useRouter();
  const { isAuthenticated, isLoading, restoreSession } = useAuthStore();
  
  const logoScale = useRef(new Animated.Value(0.3)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const loadingOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Restaurer la session au démarrage
    restoreSession();
  }, []);

  useEffect(() => {
    // Animation du logo au démarrage
    Animated.sequence([
      // Fade in + Scale du logo
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(logoScale, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      // Pause
      Animated.delay(800),
      // Fade in du texte de chargement
      Animated.timing(loadingOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      // Attendre que l'animation du logo soit complète avant de rediriger
      const t = setTimeout(() => {
        if (isAuthenticated) {
          router.replace('/(tabs)' as any);
        } else {
          router.replace('/login' as any);
        }
      }, 2200); // 600ms (logo scale) + 800ms (pause) + 400ms (loading fade) + 400ms extra

      return () => clearTimeout(t);
    }
  }, [isLoading, isAuthenticated, router]);

  return (
    <View style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FFFFFF',
    }}>
      <Animated.Image
        source={require('@/assets/IBENTO APPS PNG.png')}
        style={{
          opacity: logoOpacity,
          transform: [{ scale: logoScale }],
          width: 200,
          height: 200,
          resizeMode: 'contain',
          marginBottom: 40,
        }}
      />

      <Animated.View
        style={{
          opacity: loadingOpacity,
          alignItems: 'center',
        }}
      >
        <ActivityIndicator size="large" color="#1e90ff" />
        <Text style={{ marginTop: 16, color: '#666', fontSize: 14 }}>
          Chargement...
        </Text>
      </Animated.View>
    </View>
  );
}