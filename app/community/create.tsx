// import React, { useState, useRef, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   TextInput,
//   StyleSheet,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
//   Animated,
//   LayoutAnimation
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useRouter, Stack } from 'expo-router';
// import { useNavigation } from '@react-navigation/native';
// import { ArrowLeft, Camera, Image as ImageIcon, X } from 'lucide-react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { BlurView } from 'expo-blur';
// import { useCommunityStore } from '../../hooks/useCommunityStore';
// import AnimatedContainer from '../../components/AnimatedContainer';
// import Toast from '../../components/Toast';
// import { useToast } from '../../hooks/useToast';
// import SmartImage from '../../components/SmartImage';

// const COVER_IMAGES = [
//   "https://img2.akspic.ru/crops/9/2/1/2/7/172129/172129-anime-drakon_myach_super-goku-zamasu-zhemchug_drakona-3840x2160.jpg",
//   "https://img1.akspic.ru/crops/6/2/1/2/7/172126/172126-anime-yudzi_itadori-ryomen_ego_nogi-dzhiu_dzhitsu_kajsen-multfilm-3840x2160.jpg",
//   "https://img3.akspic.ru/crops/3/8/2/7/7/177283/177283-anime-v_dayz_anime-multik-ryomen_ego_nogi-yudzi_itadori-3840x2160.jpg",
//   "https://img2.akspic.ru/previews/6/4/7/8/7/178746/178746-kiberpank_2077-kiberpank-militeh-art-multfilm-550x310.jpg",
//   "https://img1.akspic.ru/crops/6/4/7/4/7/174746/174746-godzho_satoru-satoru_godzyo-dzhiu_dzhitsu_kajsen-anime-rukav-3840x2160.jpg",
// ];

// const CATEGORIES = [
//   { id: 'manga', label: 'Manga & Anime' },
//   { id: 'cinema', label: 'Cinéma' },
//   { id: 'festival', label: 'Festivals' },
//   { id: 'salon', label: 'Salons' },
//   { id: 'gaming', label: 'Gaming' },
//   { id: 'art', label: 'Art' },
//   { id: 'other', label: 'Autre' }
// ];

// export default function CreateCommunityScreen() {
//   const router = useRouter();
//   const { addCommunity } = useCommunityStore();
//   const navigation = useNavigation();
  
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [coverImage, setCoverImage] = useState(COVER_IMAGES[0]);
//   const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0].id);
  
//   const goBack = () => {
//     try {
//       // @ts-ignore
//       if (navigation?.canGoBack && navigation.canGoBack()) {
//         // @ts-ignore
//         navigation.goBack();
//         return;
//       }
//     } catch (e) {
//       // ignore
//     }

//     router.push('/community');
//   };
  
//   const { showToast, visible, message, type, duration, hideToast } = useToast();
  
//   const handleCreateCommunity = () => {
//     if (!name.trim()) {
//       showToast('Le nom de la communauté est obligatoire.', { type: 'error' });
//       return;
//     }
    
//     const communityId = addCommunity({
//       name,
//       description,
//       cover: coverImage,
//       category: selectedCategory
//     });
    
//     showToast('Communauté créée avec succès !', { type: 'success' });
    
//     // Rediriger après un court délai
//     setTimeout(() => {
//       router.push(`/community/${communityId}` as any);
//     }, 1000);
//   };

//   const formProgress = useRef(new Animated.Value(0)).current;
//   const [imagePickerOpen, setImagePickerOpen] = useState(false);

//   const toggleImagePicker = () => {
//     LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
//     setImagePickerOpen(!imagePickerOpen);
//   };

//   return (
//     <SafeAreaView className="flex-1" style={{ backgroundColor: '#071026' }} edges={['top', 'left', 'right']}>
//       <Stack.Screen
//         options={{
//           headerShown: false,
//         }}
//       />
      
//       {/* Toast notification */}
//       {visible && (
//         <Toast
//           visible={visible}
//           message={message}
//           type={type}
//           duration={duration}
//           onDismiss={hideToast}
//         />
//       )}
      
//       {/* Header moderne avec gradient */}
//       <LinearGradient
//         colors={['#071026', 'transparent']}
//         className="pt-2"
//         style={{ backgroundColor: 'transparent' }}
//       >
//         <View className="flex-row items-center justify-between px-4 py-3">
//           <TouchableOpacity 
//             onPress={() => router.push('/community')}
//             className="w-10 h-10 items-center justify-center rounded-full bg-black/20"
//           >
//             <ArrowLeft size={20} color="#fff" />
//           </TouchableOpacity>
          
//           <Text className="text-white text-lg font-bold">Nouvelle communauté</Text>
          
//           <TouchableOpacity 
//             onPress={handleCreateCommunity}
//             className={`px-4 py-2 rounded-full ${
//               !name.trim() 
//                 ? 'bg-white/10' 
//                 : 'bg-gradient-to-r from-primary to-secondary'
//             }`}
//             disabled={!name.trim()}
//           >
//             <Text className="text-white font-medium">Créer</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Indicateur de progression visible */}
//         <Animated.View
//           style={{
//             height: 4,
//             borderRadius: 4,
//             backgroundColor: '#1e90ff',
//             width: formProgress.interpolate({
//               inputRange: [0, 4],
//               outputRange: ['0%', '100%']
//             })
//           }}
//         />
//       </LinearGradient>
      
//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         className="flex-1"
//       >
//         <ScrollView className="flex-1 p-4" style={{ backgroundColor: '#071026' }}>
//           {/* Section image de couverture moderne */}
//           <View className="mb-8">
//             <View className="flex-row items-center justify-between mb-4">
//               <Text className="text-white font-bold text-base">Image de couverture</Text>
//               <TouchableOpacity 
//                 onPress={toggleImagePicker}
//                 className="flex-row items-center bg-black/20 px-3 py-1.5 rounded-full"
//               >
//                 <ImageIcon size={16} color="#fff" className="mr-2" />
//                 <Text className="text-white text-sm">Changer</Text>
//               </TouchableOpacity>
//             </View>
            
//             <TouchableOpacity 
//               onPress={toggleImagePicker}
//               className="relative overflow-hidden rounded-2xl"
//               style={{
//                 shadowColor: '#1e90ff',
//                 shadowOffset: { width: 0, height: 4 },
//                 shadowOpacity: 0.1,
//                 shadowRadius: 12,
//                 elevation: 5
//               }}
//             >
//               <LinearGradient
//                 colors={['rgba(30,144,255,0.1)', 'rgba(204,0,0,0.05)']}
//                 className="absolute inset-0 z-10"
//                 style={{ opacity: 0.5 }}
//               />
              
//               <SmartImage
//                 source={coverImage}
//                 style={{ width: '100%', height: 200, borderRadius: 16 }}
//                 contain={false}
//               />
              
//               <BlurView 
//                 intensity={30} 
//                 className="absolute bottom-0 left-0 right-0 p-4 flex-row items-center justify-between"
//               >
//                 <Text className="text-white text-sm opacity-80">
//                   {coverImage.split('/').pop()?.substring(0, 20)}...
//                 </Text>
//                 <View className="flex-row items-center">
//                   <TouchableOpacity className="mr-2 w-8 h-8 items-center justify-center rounded-full bg-black/20">
//                     <Camera size={16} color="#fff" />
//                   </TouchableOpacity>
//                 </View>
//               </BlurView>
//             </TouchableOpacity>
            
//             {imagePickerOpen && (
//               <Animated.View 
//                 className="mt-4"
//                 style={{ opacity: 1 }}
//               >
//                 <ScrollView 
//                   horizontal 
//                   showsHorizontalScrollIndicator={false}
//                   className="pt-2 pb-4 -mx-4 px-4"
//                 >
//                   {COVER_IMAGES.map((image, index) => (
//                     <TouchableOpacity
//                       key={index}
//                       className={`relative mr-3 rounded-xl overflow-hidden ${
//                         coverImage === image 
//                           ? 'border-2 border-primary' 
//                           : 'border-2 border-transparent'
//                       }`}
//                       onPress={() => {
//                         setCoverImage(image);
//                         Animated.spring(formProgress, {
//                           toValue: 1,
//                           useNativeDriver: false
//                         }).start();
//                       }}
//                       style={{
//                         shadowColor: coverImage === image ? '#1e90ff' : '#000',
//                         shadowOffset: { width: 0, height: 2 },
//                         shadowOpacity: coverImage === image ? 0.3 : 0.1,
//                         shadowRadius: 8,
//                         elevation: coverImage === image ? 5 : 2
//                       }}
//                     >
//                       <SmartImage
//                         source={image}
//                         style={{ width: 100, height: 100, borderRadius: 12 }}
//                         contain={false}
//                       />
//                       {coverImage === image && (
//                         <View className="absolute inset-0 bg-primary/20 items-center justify-center">
//                           <View className="w-6 h-6 rounded-full bg-primary items-center justify-center">
//                             <Text className="text-white text-xs">✓</Text>
//                           </View>
//                         </View>
//                       )}
//                     </TouchableOpacity>
//                   ))}
//                 </ScrollView>
//               </Animated.View>
//             )}
//           </View>
          
//           {/* Nom avec effet de focus */}
//           <View className="mb-8">
//             <Text className="text-white font-bold text-base mb-2 flex-row items-center">
//               <Text>Nom de la communauté</Text>
//               <Text className="text-secondary ml-1">*</Text>
//             </Text>
//             <View className="relative">
//               <LinearGradient
//                 colors={['rgba(30,144,255,0.1)', 'rgba(204,0,0,0.05)']}
//                 className="absolute inset-0 rounded-2xl"
//                 style={{ opacity: name ? 0.2 : 0 }}
//               />
//               <TextInput
//                 value={name}
//                 onChangeText={(text) => {
//                   setName(text);
//                   if (text) {
//                     Animated.spring(formProgress, {
//                       toValue: 2,
//                       useNativeDriver: false
//                     }).start();
//                   }
//                 }}
//                 placeholder="Ex: Fans de Mangas Cameroun"
//                 placeholderTextColor="rgba(255,255,255,0.4)"
//                 className="bg-surface/60 px-4 py-3.5 rounded-2xl text-white text-base"
//                 style={{ borderWidth: 1, borderColor: name ? '#1e90ff' : 'transparent' }}
//               />
//             </View>
//           </View>
          
//           {/* Description avec compteur de caractères */}
//           <View className="mb-8">
//             <View className="flex-row items-center justify-between mb-2">
//               <Text className="text-white font-bold text-base">Description</Text>
//               <Text className="text-white/40 text-sm">
//                 {description.length}/500
//               </Text>
//             </View>
//             <View className="relative">
//               <LinearGradient
//                 colors={['rgba(30,144,255,0.1)', 'rgba(204,0,0,0.05)']}
//                 className="absolute inset-0 rounded-2xl"
//                 style={{ opacity: description ? 0.2 : 0 }}
//               />
//               <TextInput
//                 value={description}
//                 onChangeText={(text) => {
//                   if (text.length <= 500) {
//                     setDescription(text);
//                     if (text) {
//                       Animated.spring(formProgress, {
//                         toValue: 3,
//                         useNativeDriver: false
//                       }).start();
//                     }
//                   }
//                 }}
//                 placeholder="Décrivez votre communauté..."
//                 placeholderTextColor="rgba(255,255,255,0.4)"
//                 multiline
//                 numberOfLines={5}
//                 className="bg-surface/60 px-4 py-4 rounded-2xl text-white text-base"
//                 textAlignVertical="top"
//                 style={{ 
//                   minHeight: 120,
//                   borderWidth: 1, 
//                   borderColor: description ? '#1e90ff' : 'transparent'
//                 }}
//               />
//             </View>
//           </View>
          
//           {/* Catégories avec effet de sélection */}
//           <View className="mb-8">
//             <Text className="text-white font-bold text-base mb-4">Catégorie</Text>
//             <View className="flex-row flex-wrap -m-1">
//               {CATEGORIES.map((category) => {
//                 const isSelected = selectedCategory === category.id;
//                 return (
//                   <TouchableOpacity
//                     key={category.id}
//                     onPress={() => {
//                       setSelectedCategory(category.id);
//                       Animated.spring(formProgress, {
//                         toValue: 4,
//                         useNativeDriver: false
//                       }).start();
//                     }}
//                     className="m-1"
//                   >
//                     <LinearGradient
//                       colors={
//                         isSelected 
//                           ? ['#1e90ff', '#cc0000'] 
//                           : ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']
//                       }
//                       start={{ x: 0, y: 0 }}
//                       end={{ x: 1, y: 0 }}
//                       className="px-4 py-2.5 rounded-xl"
//                     >
//                       <Text 
//                         className={`${
//                           isSelected ? 'text-white' : 'text-white/60'
//                         } font-medium`}
//                       >
//                         {category.label}
//                       </Text>
//                     </LinearGradient>
//                   </TouchableOpacity>
//                 );
//               })}
//             </View>
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }

import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CreateCommunityScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background items-center justify-center">
      <Text className="text-text text-lg">Créer communauté - En développement</Text>
    </SafeAreaView>
  );
}
