import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import SmartImage from '../../components/SmartImage';
import { LinearGradient } from 'expo-linear-gradient';

const COVER_OPTIONS = [
  "https://roppongi.fr/wp-content/uploads/Tokyo-ghoul.jpg",
  "https://roppongi.fr/wp-content/uploads/Tokyo-ghoul.jpg",
  "https://roppongi.fr/wp-content/uploads/Tokyo-ghoul.jpg",
];

export default function EditProfileScreen() {
  const navigation = useNavigation();
  const [profile, setProfile] = useState({
    name: 'Adam',
    username: 'adam',
    bio:
      "Passionné d'anime depuis 2010. J'adore le shounen, le seinen et les thrillers psychologiques.",
    location: 'Tokyo, Japon',
    profileImage:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=240&h=240&fit=crop&crop=face',
  coverImage: COVER_OPTIONS[0],
  });

  const [coverPickerOpen, setCoverPickerOpen] = useState(false);
  const [avatarPickerOpen, setAvatarPickerOpen] = useState(false);
  const formProgress = useRef(new Animated.Value(0)).current;

  const handleSave = () => {
    // TODO: persist via store / API
    router.back();
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: '#071026' }}>
      <LinearGradient
        colors={['#071026', 'transparent']}
        className="pt-2"
        style={{ paddingHorizontal: 16 }}
      >
        <View className="flex-row items-center justify-between py-3">
          <TouchableOpacity
            onPress={() => {
              try {
                // @ts-ignore
                if (navigation?.canGoBack && navigation.canGoBack()) {
                  // @ts-ignore
                  navigation.goBack();
                  return;
                }
              } catch (e) {}
              router.back();
            }}
            className="w-10 h-10 items-center justify-center rounded-full bg-black/20"
          >
            <Feather name="x" size={20} color="#fff" />
          </TouchableOpacity>

          <Text className="text-white text-lg font-bold">Modifier le profil</Text>

          <TouchableOpacity
            onPress={handleSave}
            className="px-4 py-2 rounded-full"
            style={{ backgroundColor: 'linear-gradient(90deg, #1e90ff, #cc0000)' } as any}
          >
            <LinearGradient
              colors={['#1e90ff', '#cc0000']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              className="px-4 py-2 rounded-full"
            >
              <Text className="text-white font-medium">Enregistrer</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
        <ScrollView className="flex-1 p-4">
          {/* Cover preview */}
          <View className="mb-4">
            <View className="relative rounded-2xl overflow-hidden" style={{ height: 160 }}>
              <SmartImage source={{ uri: profile.coverImage }} style={{ width: '100%', height: '100%' }} contain={false} />
              <LinearGradient
                colors={['transparent', 'rgba(7,16,38,0.6)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                className="absolute inset-0"
              />

              {/* Avatar centered on cover */}
              <View className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 items-center z-20" style={{ transform: [{ translateX: -48 }, { translateY: 48 }] }}>
                <View className="relative">
                  <View style={{ width: 96, height: 96, borderRadius: 48, overflow: 'hidden', borderWidth: 3, borderColor: '#071026' }}>
                    <SmartImage source={{ uri: profile.profileImage }} style={{ width: 96, height: 96 }} contain={false} />
                  </View>
                  <TouchableOpacity 
                    onPress={() => setAvatarPickerOpen(!avatarPickerOpen)}
                    className="absolute right-0 bottom-0 w-9 h-9 items-center justify-center rounded-full bg-black/30"
                  >
                    <Feather name="camera" size={16} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>

              <View className="absolute right-3 top-3">
                <TouchableOpacity 
                  onPress={() => setCoverPickerOpen(!coverPickerOpen)}
                  className="w-10 h-10 items-center justify-center rounded-full bg-black/30"
                >
                  <Feather name="camera" size={18} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Profile Image Picker */}
            <View className="flex-row items-center justify-between mt-3">
              <Text className="text-white font-medium">Photo de profil</Text>
              <TouchableOpacity onPress={() => setAvatarPickerOpen(!avatarPickerOpen)} className="px-3 py-1 rounded-full bg-black/20">
                <Text className="text-white text-sm">Changer</Text>
              </TouchableOpacity>
            </View>

            {avatarPickerOpen && (
              <View className="mt-3">
                <View className="flex-row items-center justify-between mb-2">
                  <Text className="text-white/70 text-sm">Sélectionnez une image</Text>
                  <TouchableOpacity onPress={() => setAvatarPickerOpen(false)} className="px-3 py-1 rounded-full bg-black/20">
                    <Text className="text-white text-sm">Fermer</Text>
                  </TouchableOpacity>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-2 px-2">
                  {[
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=240&h=240&fit=crop&crop=face',
                    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=240&h=240&fit=crop&crop=face',
                    'https://images.unsplash.com/photo-1545996124-1f8a68d34c80?w=240&h=240&fit=crop&crop=face',
                  ].map((avatar, idx) => (
                    <TouchableOpacity
                      key={idx}
                      onPress={() => {
                        setProfile(p => ({ ...p, profileImage: avatar }));
                        setAvatarPickerOpen(false);
                      }}
                      className="mr-3 rounded-full overflow-hidden"
                      style={{ width: 64, height: 64 }}
                    >
                      <SmartImage source={{ uri: avatar }} style={{ width: 64, height: 64 }} contain={false} />
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}

            {/* Cover Image Picker */}
            <View className="flex-row items-center justify-between mt-3">
              <Text className="text-white font-medium">Image de couverture</Text>
              <TouchableOpacity onPress={() => setCoverPickerOpen(!coverPickerOpen)} className="px-3 py-1 rounded-full bg-black/20">
                <Text className="text-white text-sm">Changer</Text>
              </TouchableOpacity>
            </View>

            {coverPickerOpen && (
              <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-3 -mx-2 px-2">
                {COVER_OPTIONS.map((c, idx) => (
                  <TouchableOpacity
                    key={idx}
                    onPress={() => setProfile(p => ({ ...p, coverImage: c }))}
                    className="mr-3 rounded-lg overflow-hidden"
                    style={{ width: 120, height: 70 }}
                  >
                    <SmartImage source={{ uri: c }} style={{ width: 120, height: 70 }} contain={false} />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </View>

          {/* Inputs */}
          <View className="space-y-4">
            <View>
              <Text className="text-white/90 mb-2">Nom</Text>
              <TextInput
                value={profile.name}
                onChangeText={(text) => setProfile(p => ({ ...p, name: text }))}
                className="px-4 py-3 rounded-2xl text-white bg-white/5"
                placeholder="Votre nom"
                placeholderTextColor="rgba(255,255,255,0.4)"
              />
            </View>

            <View>
              <Text className="text-white/90 mb-2">Nom d'utilisateur</Text>
              <TextInput
                value={profile.username}
                onChangeText={(text) => setProfile(p => ({ ...p, username: text }))}
                className="px-4 py-3 rounded-2xl text-white bg-white/5"
                placeholder="@pseudo"
                placeholderTextColor="rgba(255,255,255,0.4)"
              />
            </View>

            <View>
              <Text className="text-white/90 mb-2">Bio</Text>
              <TextInput
                value={profile.bio}
                onChangeText={(text) => setProfile(p => ({ ...p, bio: text }))}
                className="px-4 py-3 rounded-2xl text-white bg-white/5"
                placeholder="Parlez de vous"
                placeholderTextColor="rgba(255,255,255,0.4)"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            <View>
              <Text className="text-white/90 mb-2">Localisation</Text>
              <TextInput
                value={profile.location}
                onChangeText={(text) => setProfile(p => ({ ...p, location: text }))}
                className="px-4 py-3 rounded-2xl text-white bg-white/5"
                placeholder="Ville, Pays"
                placeholderTextColor="rgba(255,255,255,0.4)"
              />
            </View>
          </View>

          <View className="h-20" />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
