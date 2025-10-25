import { useEffect } from 'react';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import '../global.css'
import { useFrameworkReady } from '@/hooks/useFrameworkReady';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <>
      <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
        <Slot />
        <StatusBar style="dark" backgroundColor="#FFFFFF" />
      </View>
    </>
  );
}