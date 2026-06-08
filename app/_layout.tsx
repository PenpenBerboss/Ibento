import { useEffect } from 'react';
import { Slot, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import '../global.css';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useAuthStore } from '@/hooks/useAuthStore';

// Routes accessibles sans être connecté
const PUBLIC_ROUTES = ['index', 'login', 'register'];

function AuthGuard() {
  const { isAuthenticated, isLoading } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const currentRoute = segments[0] ?? 'index';
    const isPublic = PUBLIC_ROUTES.includes(currentRoute);

    if (isAuthenticated && isPublic) {
      router.replace('/(tabs)' as any);
    } else if (!isAuthenticated && !isPublic) {
      router.replace('/login' as any);
    }
  }, [isAuthenticated, isLoading, segments]);

  return null;
}

export default function RootLayout() {
  useFrameworkReady();

  return (
    <>
      <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
        <AuthGuard />
        <Slot />
        <StatusBar style="dark" backgroundColor="#FFFFFF" />
      </View>
    </>
  );
}