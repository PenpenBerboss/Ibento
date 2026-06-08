import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuthStore } from '@/hooks/useAuthStore';

export default function EditProfileScreen() {
  const { user, updateUser } = useAuthStore();
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    firstName: user?.firstName ?? '',
    lastName: user?.lastName ?? '',
    phone: user?.phone ?? '',
    country: user?.country ?? '',
    address: user?.address ?? '',
    avatar: user?.avatar ?? '',
  });

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateUser(form);
      router.back();
    } finally {
      setSaving(false);
    }
  };

  const field = (label: string, key: keyof typeof form, options?: { multiline?: boolean; placeholder?: string }) => (
    <View className="mb-4">
      <Text className="text-white/90 mb-2">{label}</Text>
      <TextInput
        value={form[key]}
        onChangeText={(text) => setForm((p) => ({ ...p, [key]: text }))}
        placeholder={options?.placeholder ?? label}
        placeholderTextColor="rgba(255,255,255,0.4)"
        multiline={options?.multiline}
        numberOfLines={options?.multiline ? 3 : 1}
        textAlignVertical={options?.multiline ? 'top' : 'center'}
        style={{
          backgroundColor: 'rgba(255,255,255,0.05)',
          borderRadius: 12,
          padding: 14,
          color: '#fff',
          minHeight: options?.multiline ? 80 : undefined,
        }}
      />
    </View>
  );

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: '#071026' }}>
      {/* Header */}
      <LinearGradient colors={['#071026', 'transparent']} style={{ paddingHorizontal: 16, paddingTop: 8 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12 }}>
          <TouchableOpacity onPress={() => router.back()} style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.2)' }}>
            <Feather name="x" size={20} color="#fff" />
          </TouchableOpacity>

          <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700' }}>Modifier le profil</Text>

          <TouchableOpacity onPress={handleSave} disabled={saving}>
            <LinearGradient colors={['#1e90ff', '#cc0000']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 }}>
              {saving ? <ActivityIndicator color="#fff" size="small" /> : <Text style={{ color: '#fff', fontWeight: '600' }}>Enregistrer</Text>}
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1, padding: 16 }}>
          {field('Prénom', 'firstName')}
          {field('Nom', 'lastName')}
          {field('Téléphone', 'phone', { placeholder: '+237 6XX XXX XXX' })}
          {field('Pays', 'country', { placeholder: 'Cameroun' })}
          {field('Adresse', 'address', { multiline: true, placeholder: 'Votre adresse' })}
          {field('URL Photo de profil', 'avatar', { placeholder: 'https://...' })}
          <View style={{ height: 80 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
