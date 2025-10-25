import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
const colors = {
  background: '#FFFFFF',
  surface: '#F9F9F9',
  primary: '#1e90ff',
  secondary: '#CC0000',
  text: '#000000',
  textSecondary: '#555555',
};

export default function HomeScreen() {
  const router = useRouter();

  useEffect(() => {
    // Slight delay to ensure Root Layout and Slot are mounted before navigating
    const t = setTimeout(() => {
      router.replace('/(tabs)' as any);
    }, 50);

    return () => clearTimeout(t);
  }, [router]);
  return (
    <View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:colors.background}}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={{marginTop:12,color:colors.text}}>Chargement...</Text>
  {/* Redirect to tabs once mounted handled in useEffect */}
    </View>
  );
}