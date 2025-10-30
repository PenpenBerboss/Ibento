// import React, { useState, useRef, useEffect } from 'react';
// import { View, Text, ScrollView, TextInput, TouchableOpacity, Animated, Dimensions, Platform, Image } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Feather } from '@expo/vector-icons';
// import { MessageCircle } from 'lucide-react-native';
// import { useRouter } from 'expo-router';
// import { BlurView } from 'expo-blur';
// import { LinearGradient } from 'expo-linear-gradient';
// import GroupCard from '../../components/GroupCard';
// import { groups } from '../../data/groups';

// const { width } = Dimensions.get('window');

// // Données de test pour les conversations individuelles
// export const privateChats = [
//   {
//     id: '1',
//     user: {
//       name: 'Bouli',
//       avatar: 'https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?w=48&h=48&fit=crop',
//       online: true
//     },
//     lastMessage: {
//       text: "Bonsoir les gars je suis deja la",
//       time: '15:20',
//       unread: true
//     }
//   },
//   {
//     id: '2',
//     user: {
//       name: 'Seth',
//       avatar: 'https://images.unsplash.com/photo-1597733336794-12d05021d510?w=48&h=48&fit=crop',
//       online: true
//     },
//     lastMessage: {
//       text: "Oui!! je suis deja sortie de la maison",
//       time: '04:30',
//       unread: true
//     }
//   },
//   {
//     id: '3',
//     user: {
//       name: 'Kouam',
//       avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=48&h=48&fit=crop',
//       online: false
//     },
//     lastMessage: {
//       text: "C'est a lui de me dire comment faire",
//       time: '18:15'
//     }
//   }
// ];

// export default function ChatsScreen() {
//   const [activeTab, setActiveTab] = useState('Chats');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isFocused, setIsFocused] = useState(false);
//   const router = useRouter();
  
//   const navigateToChat = (chatId: string) => {
//     router.push(`/chat/${chatId}` as any);
//   };

//   // Animation values
//   const searchWidthAnim = useRef(new Animated.Value(1)).current;
//   const indicatorPosition = useRef(new Animated.Value(0)).current;
  
//   const filteredGroups = groups.filter(group =>
//     group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     (group.nameArabic && group.nameArabic.includes(searchQuery))
//   );

//   // Filter private chats (search-aware)
//   const filteredChats = privateChats.filter(chat =>
//     chat.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     (chat.lastMessage && chat.lastMessage.text && chat.lastMessage.text.toLowerCase().includes(searchQuery.toLowerCase()))
//   );

//   // Animate tab indicator
//   const animateTabIndicator = (index: number) => {
//     Animated.spring(indicatorPosition, {
//       toValue: index === 0 ? 0 : width / 2,
//       friction: 8,
//       tension: 60,
//       useNativeDriver: true,
//     }).start();
//   };

//   // Handle tab change
//   const handleTabChange = (tab: string, index: number) => {
//     setActiveTab(tab);
//     animateTabIndicator(index);
//   };

//   // Animate search bar focus
//   const handleSearchFocus = (focus: boolean) => {
//     setIsFocused(focus);
//     Animated.spring(searchWidthAnim, {
//       toValue: focus ? 1.02 : 1,
//       friction: 8,
//       tension: 80,
//       useNativeDriver: true,
//     }).start();
//   };

//   // Animation pour l'apparition
//   const fadeAnim = useRef(new Animated.Value(0)).current;
  
//   useEffect(() => {
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 500,
//       useNativeDriver: true,
//     }).start();
//   }, []);

//   return (
//     <SafeAreaView className="flex-1 bg-background">
//       <Animated.View style={{ opacity: fadeAnim, flex: 1 }}>
//         {/* Header avec effet glassmorphism */}
//         <View className="px-5 pt-3 pb-2">
//           <View className="flex-row justify-between items-center mb-6">
//             <View className="flex-row items-center">
//               {/* <View className="bg-secondary/15 p-2 rounded-xl mr-3">
//                 <MessageCircle size={22} color="#CC0000" />
//               </View> */}
//               <View>
//                 <Text className="text-text text-2xl font-bold">Messages</Text>
//                 <Text className="text-textSecondary/70 text-xs">Connecté • 3 nouveaux</Text>
//               </View>
//             </View>
//             <View className="flex-row items-center space-x-4">
//               <TouchableOpacity className="relative">
//                 <BlurView intensity={10} className="rounded-full p-2.5 bg-surface overflow-hidden">
//                   <Feather name="bell" size={18} color="#000000" />
//                 </BlurView>
//                 <View className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-secondary rounded-full items-center justify-center border border-white">
//                   <Text className="text-white text-[8px] font-bold">3</Text>
//                 </View>
//               </TouchableOpacity>
//               <TouchableOpacity className="h-10 w-10 bg-primary rounded-full items-center justify-center overflow-hidden shadow-sm">
//                 <LinearGradient
//                   colors={['#1e90ff', '#0066cc']}
//                   style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
//                 />
//                 <Text className="text-white font-bold">PB</Text>
//               </TouchableOpacity>
//             </View>
//           </View>

//           {/* Tabs animés avec style moderne */}
//           <View className="mb-6 relative">
//             <View className="flex-row relative bg-surface/80 rounded-xl p-1">
//               {['Chats', 'My Groups'].map((tab, index) => (
//                 <TouchableOpacity
//                   key={tab}
//                   onPress={() => handleTabChange(tab, index)}
//                   className={`flex-1 py-2.5 rounded-lg ${activeTab === tab ? 'bg-white shadow-sm' : ''}`}
//                   style={{ 
//                     elevation: activeTab === tab ? 1 : 0
//                   }}
//                 >
//                   <Text className={`text-center font-medium ${
//                     activeTab === tab ? 'text-primary' : 'text-secondary/70'
//                   }`}>
//                     {tab}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </View>
//           </View>

//         {/* Animated Search Bar */}
//         <Animated.View 
//           style={{ 
//             transform: [{ scale: searchWidthAnim }],
//           }}
//           className="mb-2"
//         >
//           <View className={`bg-surface rounded-2xl px-4 py-3 flex-row items-center shadow-sm ${isFocused ? 'bg-primary/5 border border-primary/20' : 'border border-transparent'}`}>
//             <Feather name="search" size={18} color={isFocused ? "#1e90ff" : "#555555"} />
//             <TextInput
//               placeholder="Search conversations..."
//               placeholderTextColor={isFocused ? "#1e90ff" : "#555555"}
//               value={searchQuery}
//               onChangeText={setSearchQuery}
//               onFocus={() => handleSearchFocus(true)}
//               onBlur={() => handleSearchFocus(false)}
//               className="flex-1 ml-3 text-text"
//             />
//             {searchQuery !== '' && (
//               <TouchableOpacity onPress={() => setSearchQuery('')}>
//                 <View className="bg-gray-200 rounded-full p-1">
//                   <Feather name="x" size={14} color="#555555" />
//                 </View>
//               </TouchableOpacity>
//             )}
//           </View>
//         </Animated.View>
        
//         {/* Quick filters */}
//         <ScrollView 
//           horizontal 
//           showsHorizontalScrollIndicator={false}
//           className="flex-row pb-4"
//         >
//           <TouchableOpacity className="mr-3 py-1.5 px-3 bg-secondary rounded-full flex-row items-center shadow-sm">
//             <Feather name="users" size={14} color="#FFFFFF" />
//             <Text className="text-white text-xs font-medium ml-1">All</Text>
//           </TouchableOpacity>
//           <TouchableOpacity className="mr-3 py-1.5 px-3 bg-surface rounded-full flex-row items-center border border-gray-100">
//             <Feather name="star" size={14} color="#555555" />
//             <Text className="text-textSecondary text-xs font-medium ml-1">Favorites</Text>
//           </TouchableOpacity>
//           <TouchableOpacity className="mr-3 py-1.5 px-3 bg-surface rounded-full flex-row items-center border border-gray-100">
//             <Feather name="clock" size={14} color="#555555" />
//             <Text className="text-textSecondary text-xs font-medium ml-1">Recent</Text>
//           </TouchableOpacity>
//           <TouchableOpacity className="mr-3 py-1.5 px-3 bg-surface rounded-full flex-row items-center border border-gray-100">
//             <Feather name="video" size={14} color="#555555" />
//             <Text className="text-textSecondary text-xs font-medium ml-1">Video</Text>
//           </TouchableOpacity>
//         </ScrollView>
//       </View>

//       {/* Section Header */}
//       <View className="px-6 flex-row justify-between items-center mb-4">
//         <Text className="font-bold text-base text-text">
//           {activeTab === 'Chats' ? filteredChats.length : filteredGroups.length} {activeTab === 'Chats' ? 'Conversations' : 'Groups'}
//         </Text>
//         <TouchableOpacity className="bg-secondary/10 px-3 py-1 rounded-lg">
//           <Text className="text-secondary text-xs font-medium">See all</Text>
//         </TouchableOpacity>
//       </View>
      
//       {/* Liste des conversations ou groupes */}
//       <ScrollView 
//         className="flex-1 px-6"
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingBottom: 120 }}
//       >
//         {activeTab === 'Chats' ? (
//           // Conversations individuelles
//           <View className="pt-2">
//             {privateChats.map((chat) => (
//               <TouchableOpacity
//                 key={chat.id}
//                 onPress={() => router.push(`/chat/${chat.id}` as any)}
//                 className="flex-row items-center bg-surface p-4 rounded-2xl mb-3 border border-gray-100"
//               >
//                 <View className="relative">
//                   <Image
//                     source={{ uri: chat.user.avatar }}
//                     className="w-12 h-12 rounded-full"
//                   />
//                   {chat.user.online && (
//                     <View className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success rounded-full border-2 border-white" />
//                   )}
//                 </View>
                
//                 <View className="flex-1 ml-3">
//                   <View className="flex-row items-center justify-between">
//                     <Text className="text-text font-bold">{chat.user.name}</Text>
//                     <Text className="text-textSecondary text-xs">{chat.lastMessage.time}</Text>
//                   </View>
//                   <View className="flex-row items-center justify-between mt-1">
//                     <Text 
//                       className={`text-sm ${chat.lastMessage.unread ? 'text-text font-medium' : 'text-textSecondary'}`}
//                       numberOfLines={1}
//                       style={{ maxWidth: '85%' }}
//                     >
//                       {chat.lastMessage.text}
//                     </Text>
//                     {chat.lastMessage.unread && (
//                       <View className="bg-secondary rounded-full w-2.5 h-2.5" />
//                     )}
//                   </View>
//                 </View>
//               </TouchableOpacity>
//             ))}
//           </View>
//         ) : filteredGroups.length > 0 ? (
//           // Vue des groupes
//           <View className="flex-row flex-wrap justify-between">
//             {filteredGroups.map((group, index) => (
//               <Animated.View 
//                 key={group.id.toString()} 
//                 className="w-[48%] mb-6"
//                 style={{
//                   opacity: fadeAnim.interpolate({
//                     inputRange: [0, 1],
//                     outputRange: [0, 1]
//                   }),
//                   transform: [{ 
//                     translateY: fadeAnim.interpolate({
//                       inputRange: [0, 1],
//                       outputRange: [50, 0]
//                     }) 
//                   }]
//                 }}
//               >
//                 <TouchableOpacity 
//                   activeOpacity={0.8}
//                   className="shadow-sm bg-white rounded-2xl overflow-hidden border border-gray-50"
//                 >
//                   <GroupCard group={group} />
//                 </TouchableOpacity>
//               </Animated.View>
//             ))}
//           </View>
//         ) : (
//           <View className="items-center justify-center py-10">
//             <View className="bg-secondary/15 p-5 rounded-full mb-4">
//               <Feather name="search" size={24} color="#CC0000" />
//             </View>
//             <Text className="text-base font-medium text-text">No conversations found</Text>
//             <Text className="text-sm text-textSecondary text-center mt-1 px-10">
//               Try different keywords or start a new conversation
//             </Text>
//             <TouchableOpacity className="mt-6 bg-secondary px-4 py-2 rounded-lg">
//               <Text className="text-white font-medium">Create New Chat</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       </ScrollView>

//       {/* Modern Floating Action Button with shadow and gradient effect */}
//       <View className="absolute bottom-8 right-0 left-0 items-center">
//         <TouchableOpacity 
//           className="w-14 h-14 rounded-full items-center justify-center"
//           style={{
//             shadowColor: '#1e90ff',
//             shadowOffset: { width: 0, height: 4 },
//             shadowOpacity: 0.3,
//             shadowRadius: 8,
//             elevation: 10
//           }}
//         >
//           <LinearGradient
//             colors={['#1e90ff', '#0066cc']}
//             className="absolute inset-0 rounded-full"
//           />
//           <Feather name="plus" size={26} color="#FFFFFF" />
//         </TouchableOpacity>
//       </View>
//       </Animated.View>
//     </SafeAreaView>
//   );
// }

import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ChatsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background items-center justify-center">
      <Text className="text-text text-lg">Chats - En développement</Text>
    </SafeAreaView>
  );
}