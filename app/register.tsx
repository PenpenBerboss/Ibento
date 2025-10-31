import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function RegisterScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validate = () => {
    if (!name.trim() || !email.trim() || !password) {
      setError('Tous les champs sont requis.');
      return false;
    }
    // simple email regex
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Adresse e-mail invalide.");
      return false;
    }
    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères.');
      return false;
    }
    if (password !== confirm) {
      setError('Les mots de passe ne correspondent pas.');
      return false;
    }
    setError(null);
    return true;
  };

  const handleRegister = () => {
    if (!validate()) return;
    setLoading(true);
    // simulation d'appel API
    setTimeout(() => {
      setLoading(false);
      // rediriger vers la page d'accueil ou profil
      router.replace('/');
    }, 900);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#071026', paddingTop: insets.top }}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <View style={{ padding: 20, flex: 1, justifyContent: 'center' }}>
          <View style={{ marginBottom: 24 }}>
            <Text style={{ color: '#fff', fontSize: 28, fontWeight: '700' }}>Créer un compte</Text>
            <Text style={{ color: '#9fb0c8', marginTop: 6 }}>Rejoignez Ibento pour créer et participer à des événements.</Text>
          </View>

          {error ? (
            <View style={{ backgroundColor: 'rgba(255,0,0,0.08)', padding: 10, borderRadius: 10, marginBottom: 12 }}>
              <Text style={{ color: '#ff6666' }}>{error}</Text>
            </View>
          ) : null}

          <View style={{ gap: 12 }}>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Nom complet"
              placeholderTextColor="rgba(255,255,255,0.4)"
              style={{ backgroundColor: 'rgba(255,255,255,0.04)', padding: 14, borderRadius: 12, color: '#fff' }}
            />

            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Adresse e-mail"
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="rgba(255,255,255,0.4)"
              style={{ backgroundColor: 'rgba(255,255,255,0.04)', padding: 14, borderRadius: 12, color: '#fff' }}
            />

            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Mot de passe"
              secureTextEntry
              placeholderTextColor="rgba(255,255,255,0.4)"
              style={{ backgroundColor: 'rgba(255,255,255,0.04)', padding: 14, borderRadius: 12, color: '#fff' }}
            />

            <TextInput
              value={confirm}
              onChangeText={setConfirm}
              placeholder="Confirmer le mot de passe"
              secureTextEntry
              placeholderTextColor="rgba(255,255,255,0.4)"
              style={{ backgroundColor: 'rgba(255,255,255,0.04)', padding: 14, borderRadius: 12, color: '#fff' }}
            />
          </View>

          <TouchableOpacity
            onPress={handleRegister}
            disabled={loading}
            style={{ marginTop: 20, backgroundColor: '#1e90ff', padding: 14, borderRadius: 12, alignItems: 'center' }}
          >
            <Text style={{ color: '#fff', fontWeight: '700' }}>{loading ? 'Création en cours...' : "S'inscrire"}</Text>
          </TouchableOpacity>

          <View style={{ marginTop: 18, alignItems: 'center' }}>
            <Text style={{ color: '#9fb0c8' }}>Déjà un compte ? <Text style={{ color: '#fff' }} onPress={() => router.replace('/login' as any)}>Se connecter</Text></Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
