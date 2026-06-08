import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView, Platform, ActivityIndicator, Image, ScrollView } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/hooks/useAuthStore';

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { login, isLoading } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      setError(null);
      if (!email.trim() || !password) {
        setError('Veuillez remplir tous les champs');
        return;
      }
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        setError('Adresse e-mail invalide');
        return;
      }
      await login(email, password);
      router.replace('/(tabs)' as any);
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF', paddingTop: insets.top }}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }} showsVerticalScrollIndicator={false}>
          <View style={{ width: '100%', maxWidth: 400, paddingHorizontal: 20, alignItems: 'center' }}>
            
            <Image
              source={require('@/assets/IBENTO APPS PNG.png')}
              style={{
                width: 200,
                height: 200,
                marginBottom: 16,
              }}
              resizeMode="contain"
            />

            <View style={{ width: '100%', marginBottom: 24 }}>
              <Text style={{ color: '#071026', fontSize: 28, fontWeight: '700', textAlign: 'center' }}>Connexion</Text>
              <Text style={{ color: '#666', marginTop: 6, textAlign: 'center' }}>Connectez-vous à votre compte Ibento.</Text>
            </View>

            {error ? (
              <View style={{ width: '100%', backgroundColor: 'rgba(255,0,0,0.08)', padding: 12, borderRadius: 10, marginBottom: 16, borderLeftWidth: 4, borderLeftColor: '#ff6666' }}>
                <Text style={{ color: '#ff6666', fontSize: 13 }}>{error}</Text>
              </View>
            ) : null}

            <View style={{ width: '100%', gap: 12 }}>
              <View>
                <Text style={{ color: '#555', fontSize: 12, marginBottom: 6, fontWeight: '600' }}>Adresse e-mail</Text>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="votre@email.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  editable={!isLoading}
                  placeholderTextColor="rgba(0,0,0,0.3)"
                  style={{
                    backgroundColor: 'rgba(0,0,0,0.04)',
                    padding: 14,
                    borderRadius: 12,
                    color: '#071026',
                    borderWidth: 1,
                    borderColor: 'rgba(0,0,0,0.1)',
                  }}
                />
              </View>

              <View>
                <Text style={{ color: '#555', fontSize: 12, marginBottom: 6, fontWeight: '600' }}>Mot de passe</Text>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="••••••••"
                  secureTextEntry
                  editable={!isLoading}
                  placeholderTextColor="rgba(0,0,0,0.3)"
                  style={{
                    backgroundColor: 'rgba(0,0,0,0.04)',
                    padding: 14,
                    borderRadius: 12,
                    color: '#071026',
                    borderWidth: 1,
                    borderColor: 'rgba(0,0,0,0.1)',
                  }}
                />
              </View>
            </View>

            <TouchableOpacity
              onPress={handleLogin}
              disabled={isLoading}
              style={{
                width: '100%',
                marginTop: 24,
                backgroundColor: '#1e90ff',
                padding: 14,
                borderRadius: 12,
                alignItems: 'center',
                opacity: isLoading ? 0.6 : 1,
              }}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={{ color: '#fff', fontWeight: '700', fontSize: 16 }}>Se connecter</Text>
              )}
            </TouchableOpacity>

            <View style={{ marginTop: 18, alignItems: 'center' }}>
              <Text style={{ color: '#666', fontSize: 13 }}>
                Pas de compte ?{' '}
                <Text
                  style={{ color: '#1e90ff', fontWeight: '600' }}
                  onPress={() => !isLoading && router.replace('/register' as any)}
                >
                  S'inscrire
                </Text>
              </Text>
            </View>


          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
