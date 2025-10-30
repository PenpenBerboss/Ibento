// import React, { useRef, useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform, Image, Animated, Keyboard } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useRouter, useLocalSearchParams } from 'expo-router';
// import { Feather } from '@expo/vector-icons';
// import { BlurView } from 'expo-blur';
// import { LinearGradient } from 'expo-linear-gradient';
// import { privateChats } from '../(tabs)/chats';
// import { ArrowLeft } from 'lucide-react-native';

// interface Message {
//   id: string;
//   text: string;
//   time: string;
//   sender: 'user' | 'other';
// }

// export default function ChatScreen() {
//   const router = useRouter();
//   const { id } = useLocalSearchParams();
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState<Message[]>([]);
//   const scrollViewRef = useRef<ScrollView>(null);
//   const inputRef = useRef<TextInput>(null);
//   const sendButtonScale = useRef(new Animated.Value(1)).current;
  
//   // Trouver la conversation courante
//   const chat = privateChats.find((c: { id: string }) => c.id === id);

//   // Charger les messages initiaux
//   useEffect(() => {
//     if (chat?.lastMessage) {
//       setMessages([{
//         id: '1',
//         text: chat.lastMessage.text,
//         time: chat.lastMessage.time,
//         sender: 'other'
//       }]);
//     }
//   }, [chat]);

//   const sendMessage = () => {
//     if (!message.trim()) return;

//     // Animation du bouton d'envoi
//     Animated.sequence([
//       Animated.timing(sendButtonScale, {
//         toValue: 0.8,
//         duration: 100,
//         useNativeDriver: true,
//       }),
//       Animated.spring(sendButtonScale, {
//         toValue: 1,
//         friction: 3,
//         useNativeDriver: true,
//       })
//     ]).start();

//     // Ajouter le nouveau message
//     const newMessage: Message = {
//       id: Date.now().toString(),
//       text: message.trim(),
//       time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//       sender: 'user'
//     };

//     setMessages(prev => [...prev, newMessage]);
//     setMessage('');

//     // Scroll vers le bas
//     setTimeout(() => {
//       scrollViewRef.current?.scrollToEnd({ animated: true });
//     }, 100);
//   };

//   if (!chat) {
//     return (
//       <View className="flex-1 items-center justify-center">
//         <Text>Chat non trouvé</Text>
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView className="flex-1 bg-background">
//       {/* Header moderne avec effet glassmorphism */}
//       {/* Header épuré */}
//       <View className="px-4 py-3 flex-row items-center justify-between bg-background">
//         <View className="flex-row items-center">
//           <TouchableOpacity onPress={() => router.push('/chats' as any)} className="p-2 mr-2">
//             <ArrowLeft size={20} color="#1e90ff" />
//           </TouchableOpacity>

//           <Image
//             source={{ uri: chat.user.avatar }}
//             className="w-10 h-10 rounded-full"
//           />
//           <View className="ml-3">
//             <Text className="font-semibold text-base text-text">{chat.user.name}</Text>
//             <Text className={`text-xs ${chat.user.online ? 'text-success' : 'text-textSecondary'}`}>
//               {chat.user.online ? 'En ligne' : 'Hors ligne'}
//             </Text>
//           </View>
//         </View>

//         <View className="flex-row items-center space-x-2">
//           <TouchableOpacity className="p-2">
//             <Feather name="phone" size={18} color="#555" />
//           </TouchableOpacity>
//           <TouchableOpacity className="p-2">
//             <Feather name="video" size={18} color="#555" />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Messages avec design moderne */}
//       <ScrollView
//         ref={scrollViewRef}
//         className="flex-1 px-4 pt-4"
//         contentContainerStyle={{ paddingBottom: 20 }}
//         showsVerticalScrollIndicator={false}
//       >
//         {messages.map((msg) => (
//           <Animated.View
//             key={msg.id}
//             className={`mb-4 items-${msg.sender === "user" ? "end" : "start"}`}
//           >
//             <View
//               className={`px-4 py-3 rounded-2xl max-w-[85%] ${
//                 msg.sender === "user"
//                   ? "rounded-tr-none"
//                   : "bg-surface/90 rounded-tl-none backdrop-blur-sm"
//               }`}
//               style={{
//                 backgroundColor: msg.sender === 'user' ? '#CC0000' : undefined,
//                 shadowColor: '#000',
//                 shadowOffset: { width: 0, height: 4 },
//                 shadowOpacity: 0.08,
//                 shadowRadius: 8,
//                 elevation: 3,
//                 borderWidth: msg.sender === 'user' ? 0 : 1,
//                 borderColor: 'rgba(0,0,0,0.05)'
//               }}
//             >
//               <Text
//                 style={{ color: msg.sender === 'user' ? '#FFFFFF' : undefined }}
//                 className={`text-base ${msg.sender === "user" ? "" : "text-text"}`}
//               >
//                 {msg.text}
//               </Text>
//               <View className="flex-row items-center mt-1.5 space-x-1">
//                 <Text
//                   className={`text-xs ${msg.sender === "user" ? "text-white/70" : "text-textSecondary/70"}`}
//                 >
//                   {msg.time}
//                 </Text>
//                 {msg.sender === 'user' && (
//                   <Feather name="check" size={12} color="#FFFFFF" style={{ opacity: 0.85 }} />
//                 )}
//               </View>
//             </View>
//           </Animated.View>
//         ))}
//       </ScrollView>

//       {/* Input de message avec design moderne et glassmorphism */}
//       <KeyboardAvoidingView
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//         className="border-t border-gray-100/50"
//       >
//         <BlurView intensity={80} tint="light" className="p-4">
//           <View className="flex-row items-end space-x-2">
//             <View className="flex-row space-x-2">
//               <TouchableOpacity
//                 className="p-2.5 bg-surface/80 rounded-full"
//                 style={{
//                   shadowColor: '#1e90ff',
//                   shadowOffset: { width: 0, height: 2 },
//                   shadowOpacity: 0.1,
//                   shadowRadius: 4,
//                   elevation: 2
//                 }}
//               >
//                 <Feather name="image" size={22} color="#1e90ff" />
//               </TouchableOpacity>
//               <TouchableOpacity
//                 className="p-2.5 bg-surface/80 rounded-full"
//                 style={{
//                   shadowColor: '#1e90ff',
//                   shadowOffset: { width: 0, height: 2 },
//                   shadowOpacity: 0.1,
//                   shadowRadius: 4,
//                   elevation: 2
//                 }}
//               >
//                 <Feather name="mic" size={22} color="#1e90ff" />
//               </TouchableOpacity>
//             </View>

//             <View 
//               className="flex-1 bg-surface/90 rounded-2xl px-4 mx-1"
//               style={{
//                 shadowColor: '#000',
//                 shadowOffset: { width: 0, height: 2 },
//                 shadowOpacity: 0.05,
//                 shadowRadius: 4,
//                 elevation: 2,
//                 borderWidth: 1,
//                 borderColor: 'rgba(0,0,0,0.05)'
//               }}
//             >
//               <TextInput
//                 ref={inputRef}
//                 value={message}
//                 onChangeText={setMessage}
//                 placeholder="Écrivez votre message..."
//                 placeholderTextColor="rgba(0,0,0,0.4)"
//                 className="py-2.5"
//                 multiline
//                 maxLength={500}
//                 style={{
//                   maxHeight: 100,
//                   minHeight: 42,
//                 }}
//                 onSubmitEditing={() => message.trim() && sendMessage()}
//               />
//             </View>

//             <Animated.View
//               style={{
//                 transform: [{ scale: sendButtonScale }],
//               }}
//             >
//               <TouchableOpacity
//                 onPress={sendMessage}
//                 disabled={!message.trim()}
//                 style={{
//                   shadowColor: message.trim() ? '#1e90ff' : '#000',
//                   shadowOffset: { width: 0, height: 4 },
//                   shadowOpacity: message.trim() ? 0.3 : 0.1,
//                   shadowRadius: 8,
//                   elevation: 4
//                 }}
//               >
//                 <LinearGradient
//                   colors={
//                     message.trim() 
//                       ? ["#1e90ff", "#0066cc"]
//                       : ["rgba(0,0,0,0.1)", "rgba(0,0,0,0.2)"]
//                   }
//                   start={{ x: 0, y: 0 }}
//                   end={{ x: 1, y: 1 }}
//                   className="w-12 h-12 rounded-full items-center justify-center"
//                 >
//                   <Feather 
//                     name="send" 
//                     size={20} 
//                     color={message.trim() ? "#FFFFFF" : "rgba(0,0,0,0.3)"} 
//                   />
//                 </LinearGradient>
//               </TouchableOpacity>
//             </Animated.View>
//           </View>
//         </BlurView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }

import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ChatScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background items-center justify-center">
      <Text className="text-text text-lg">Chat individuel - En développement</Text>
    </SafeAreaView>
  );
}
