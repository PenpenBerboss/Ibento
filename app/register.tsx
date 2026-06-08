import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView, Platform, ActivityIndicator, ScrollView, Image } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/hooks/useAuthStore';

export default function RegisterScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { register, isLoading } = useAuthStore();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('Cameroun');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);

  const validate = () => {
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !phone.trim() || !address.trim() || !password) {
      setError('Tous les champs sont requis.');
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Adresse e-mail invalide.");
      return false;
    }
    if (!/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im.test(phone.replace(/\s/g, ''))) {
      setError('Numéro de téléphone invalide.');
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

  const handleRegister = async () => {
    if (!validate()) return;
    try {
      await register({
        firstName,
        lastName,
        email,
        password,
        phone,
        country,
        address,
      });
      router.replace('/(tabs)' as any);
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF', paddingTop: insets.top }}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 40 }}>
        <View style={{ width: '100%', maxWidth: 400, paddingHorizontal: 20, alignItems: 'center' }}>
          
          <Image
            source={require('@/assets/IBENTO APPS PNG.png')}
            style={{
              width: 160,
              height: 160,
              marginBottom: 12,
              marginTop: 0,
            }}
            resizeMode="contain"
          />

          <View style={{ width: '100%', marginBottom: 24, alignItems: 'center' }}>
            <Text style={{ color: '#071026', fontSize: 28, fontWeight: '700', textAlign: 'center' }}>Créer un compte</Text>
            <Text style={{ color: '#666', marginTop: 6, textAlign: 'center' }}>Rejoignez Ibento pour créer et participer à des événements.</Text>
          </View>

          {error ? (
            <View style={{ width: '100%', backgroundColor: 'rgba(255,0,0,0.08)', padding: 12, borderRadius: 10, marginBottom: 16, borderLeftWidth: 4, borderLeftColor: '#ff6666' }}>
              <Text style={{ color: '#ff6666', fontSize: 13 }}>{error}</Text>
            </View>
          ) : null}

          <View style={{ width: '100%', gap: 12 }}>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <View style={{ flex: 1 }}>
                <Text style={{ color: '#555', fontSize: 12, marginBottom: 6, fontWeight: '600' }}>Prénom</Text>
                <TextInput
                  value={firstName}
                  onChangeText={setFirstName}
                  placeholder="Jean"
                  editable={!isLoading}
                  placeholderTextColor="rgba(0,0,0,0.3)"
                  style={{
                    backgroundColor: '#F9F9F9',
                    padding: 14,
                    borderRadius: 12,
                    color: '#000',
                    borderWidth: 1,
                    borderColor: '#E0E0E0',
                  }}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: '#555', fontSize: 12, marginBottom: 6, fontWeight: '600' }}>Nom</Text>
                <TextInput
                  value={lastName}
                  onChangeText={setLastName}
                  placeholder="Dupont"
                  editable={!isLoading}
                  placeholderTextColor="rgba(0,0,0,0.3)"
                  style={{
                    backgroundColor: '#F9F9F9',
                    padding: 14,
                    borderRadius: 12,
                    color: '#000',
                    borderWidth: 1,
                    borderColor: '#E0E0E0',
                  }}
                />
              </View>
            </View>

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
                  backgroundColor: '#F9F9F9',
                  padding: 14,
                  borderRadius: 12,
                  color: '#000',
                  borderWidth: 1,
                  borderColor: '#E0E0E0',
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
                  backgroundColor: '#F9F9F9',
                  padding: 14,
                  borderRadius: 12,
                  color: '#000',
                  borderWidth: 1,
                  borderColor: '#E0E0E0',
                }}
              />
            </View>

            <View>
              <Text style={{ color: '#555', fontSize: 12, marginBottom: 6, fontWeight: '600' }}>Confirmer le mot de passe</Text>
              <TextInput
                value={confirm}
                onChangeText={setConfirm}
                placeholder="••••••••"
                secureTextEntry
                editable={!isLoading}
                placeholderTextColor="rgba(0,0,0,0.3)"
                style={{
                  backgroundColor: '#F9F9F9',
                  padding: 14,
                  borderRadius: 12,
                  color: '#000',
                  borderWidth: 1,
                  borderColor: '#E0E0E0',
                }}
              />
            </View>

            <View>
              <Text style={{ color: '#555', fontSize: 12, marginBottom: 6, fontWeight: '600' }}>Numéro de téléphone</Text>
              <TextInput
                value={phone}
                onChangeText={setPhone}
                placeholder="+237 6XX XXX XXX"
                keyboardType="phone-pad"
                editable={!isLoading}
                placeholderTextColor="rgba(0,0,0,0.3)"
                style={{
                  backgroundColor: '#F9F9F9',
                  padding: 14,
                  borderRadius: 12,
                  color: '#000',
                  borderWidth: 1,
                  borderColor: '#E0E0E0',
                }}
              />
            </View>

            <View>
              <Text style={{ color: '#555', fontSize: 12, marginBottom: 6, fontWeight: '600' }}>Pays</Text>
              <TextInput
                value={country}
                onChangeText={setCountry}
                placeholder="Cameroun"
                editable={!isLoading}
                placeholderTextColor="rgba(0,0,0,0.3)"
                style={{
                  backgroundColor: '#F9F9F9',
                  padding: 14,
                  borderRadius: 12,
                  color: '#000',
                  borderWidth: 1,
                  borderColor: '#E0E0E0',
                }}
              />
            </View>

            <View>
              <Text style={{ color: '#555', fontSize: 12, marginBottom: 6, fontWeight: '600' }}>Adresse</Text>
              <TextInput
                value={address}
                onChangeText={setAddress}
                placeholder="123 Rue de la Paix, Yaoundé"
                editable={!isLoading}
                placeholderTextColor="rgba(0,0,0,0.3)"
                multiline
                numberOfLines={2}
                style={{
                  backgroundColor: '#F9F9F9',
                  padding: 14,
                  borderRadius: 12,
                  color: '#000',
                  borderWidth: 1,
                  borderColor: '#E0E0E0',
                  textAlignVertical: 'top',
                }}
              />
            </View>
          </View>

          <TouchableOpacity
            onPress={handleRegister}
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
              <Text style={{ color: '#fff', fontWeight: '700', fontSize: 16 }}>S'inscrire</Text>
            )}
          </TouchableOpacity>

          <View style={{ width: '100%', marginTop: 18, alignItems: 'center' }}>
            <Text style={{ color: '#555', fontSize: 13, textAlign: 'center' }}>
              Déjà un compte ?{' '}
              <Text style={{ color: '#1e90ff', fontWeight: '600' }} onPress={() => !isLoading && router.replace('/login' as any)}>
                Se connecter
              </Text>
            </Text>
          </View>
        </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
