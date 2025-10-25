import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, Users, Share2, Bell, Image as ImageIcon, Link } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useCommunityStore } from '../../hooks/useCommunityStore';
import PostCard from '../../components/PostCard';
import AnimatedContainer from '../../components/AnimatedContainer';
import Toast from '../../components/Toast';
import { useToast } from '../../hooks/useToast';
import SmartImage from '../../components/SmartImage';

export default function CommunityDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { communities, setCurrentCommunity, currentCommunity, joinCommunity, leaveCommunity, addPost } = useCommunityStore();
  const { showToast, visible, message, type, duration, hideToast } = useToast();
  
  const [newPostContent, setNewPostContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (id) {
      setCurrentCommunity(id as string);
      setIsLoading(false);
    }
    
    return () => {
      setCurrentCommunity(null);
    };
  }, [id, setCurrentCommunity]);
  
  const navigation = useNavigation();
  
  const goBack = () => {
    try {
      // 1) Inspecter l'état de navigation et prioriser une navigation explicite
      // vers la liste des communautés si une route correspondante existe.
      // @ts-ignore
      const state = navigation?.getState && navigation.getState();
      if (state && state.routes && Array.isArray(state.routes)) {
        for (let i = state.routes.length - 1; i >= 0; i--) {
          const r = state.routes[i];
          const name = (r && r.name) ? String(r.name) : '';
          if (name.toLowerCase().includes('community')) {
            // Found a previous community-related route — go explicitly to community list
            try {
              router.push('/community');
              return;
            } catch (e) {
              // ignore and continue
            }
          }
        }
      }

      // 2) Si aucune route 'community' trouvée, utiliser goBack() si possible
      // @ts-ignore
      if (navigation?.canGoBack && navigation.canGoBack()) {
        // @ts-ignore
        navigation.goBack();
        return;
      }
    } catch (e) {
      // ignore
    }

    // fallback final : renvoyer explicitement à la liste des communautés
    router.push('/community');
  };
  
  const handleJoinPress = () => {
    if (!currentCommunity) return;
    
    if (currentCommunity.joined) {
      leaveCommunity(currentCommunity.id);
      showToast('Vous avez quitté la communauté', { type: 'info' });
    } else {
      joinCommunity(currentCommunity.id);
      showToast('Vous avez rejoint la communauté !', { type: 'success' });
    }
  };
  
  const handleAddPost = () => {
    if (!currentCommunity || !newPostContent.trim()) return;
    
    addPost(currentCommunity.id, newPostContent);
    setNewPostContent('');
    showToast('Publication ajoutée avec succès !', { type: 'success' });
  };
  
  if (isLoading || !currentCommunity) {
    return (
      <SafeAreaView className="flex-1 bg-background justify-center items-center">
        <ActivityIndicator size="large" color="#CC0000" />
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top', 'left', 'right']}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      
      {/* Toast notification */}
      {visible && (
        <Toast
          visible={visible}
          message={message}
          type={type}
          duration={duration}
          onDismiss={hideToast}
        />
      )}
      
      {/* Header avec image de couverture */}
      <View className="relative h-72">
        <SmartImage
          source={currentCommunity.cover}
          style={{ position: 'absolute', width: '100%', height: '100%' }}
          contain={false}
        />
        <LinearGradient
          colors={['rgba(0,0,0,0.7)', 'transparent', 'rgba(0,0,0,0.9)']}
          className="absolute w-full h-full"
        />
        
        {/* Barre de navigation */}
        <View className="flex-row items-center justify-between p-4">
          <TouchableOpacity 
            onPress={goBack}
            className="bg-black/30 p-2 rounded-xl backdrop-blur-md"
          >
            <ArrowLeft size={24} color="#fff" />
          </TouchableOpacity>
          
          <View className="flex-row space-x-4">
            <TouchableOpacity className="bg-black/30 p-2 rounded-xl backdrop-blur-md">
              <Share2 size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity className="bg-black/30 p-2 rounded-xl backdrop-blur-md">
              <Bell size={24} color={currentCommunity.joined ? '#CC0000' : '#fff'} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Informations de la communauté */}
        <View className="absolute bottom-0 w-full p-6">
          <Text className="text-white text-3xl font-bold mb-3">
            {currentCommunity.name}
          </Text>
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center space-x-3">
              <View className="bg-white/20 px-3 py-1.5 rounded-xl flex-row items-center backdrop-blur-md">
                <Users size={16} color="#fff" />
                <Text className="text-white text-sm ml-2">
                  {currentCommunity.members} membres
                </Text>
              </View>
              {currentCommunity.category && (
                <View className="bg-primary/20 px-3 py-1.5 rounded-xl backdrop-blur-md">
                  <Text className="text-primary text-sm font-medium">
                    {currentCommunity.category}
                  </Text>
                </View>
              )}
            </View>
            <TouchableOpacity
              onPress={handleJoinPress}
              className={`px-5 py-2 rounded-xl ${
                currentCommunity.joined 
                  ? 'bg-white/20 backdrop-blur-md' 
                  : 'bg-primary'
              }`}
            >
              <Text className="text-white font-medium">
                {currentCommunity.joined ? 'Membre' : 'Rejoindre'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Description */}
      <View className="px-6 py-4">
        <View className="bg-surface rounded-2xl p-4">
          <Text className="text-text text-base leading-6">
            {currentCommunity.description}
          </Text>
        </View>
      </View>
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
        keyboardVerticalOffset={100}
      >
        <ScrollView 
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {/* Zone de publication */}
          <View className="px-6 mb-6">
            <View className="bg-surface rounded-2xl overflow-hidden">
              <View className="p-4 border-b border-gray-800">
                <Text className="text-text font-semibold mb-4">
                  Publier dans la communauté
                </Text>
                <TextInput
                  value={newPostContent}
                  onChangeText={setNewPostContent}
                  placeholder="Partagez quelque chose avec la communauté..."
                  placeholderTextColor="#777"
                  multiline
                  numberOfLines={3}
                  className="bg-[#1a1a1a] p-4 rounded-xl text-text"
                  textAlignVertical="top"
                  style={{ minHeight: 100 }}
                />
              </View>
              <View className="flex-row items-center justify-between px-4 py-3 bg-[#1a1a1a]">
                <View className="flex-row space-x-4">
                  <TouchableOpacity className="p-2 rounded-lg bg-surface">
                    <ImageIcon size={20} color="#777" />
                  </TouchableOpacity>
                  <TouchableOpacity className="p-2 rounded-lg bg-surface">
                    <Link size={20} color="#777" />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={handleAddPost}
                  className={`px-6 py-2 rounded-xl ${
                    !newPostContent.trim() 
                      ? 'bg-gray-800' 
                      : 'bg-primary'
                  }`}
                  disabled={!newPostContent.trim()}
                >
                  <Text className={`font-medium ${
                    !newPostContent.trim() 
                      ? 'text-gray-400' 
                      : 'text-white'
                  }`}>
                    Publier
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          
          {/* Liste des posts */}
          {currentCommunity.posts.length > 0 ? (
            <View className="px-6 space-y-4">
              {currentCommunity.posts.map((post, index) => (
                <AnimatedContainer 
                  key={post.id}
                  type="fadeIn"
                  delay={index * 100}
                  duration={400}
                >
                  <PostCard
                    communityId={currentCommunity.id}
                    post={post}
                  />
                </AnimatedContainer>
              ))}
            </View>
          ) : (
            <View className="mx-6">
              <View className="bg-surface rounded-2xl p-8 items-center">
                <View className="bg-primary/10 p-4 rounded-full mb-4">
                  <Users size={32} color="#CC0000" />
                </View>
                <Text className="text-text text-lg font-bold text-center mb-2">
                  Aucune publication
                </Text>
                <Text className="text-textSecondary text-center">
                  Soyez le premier à publier dans cette communauté !
                </Text>
              </View>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
