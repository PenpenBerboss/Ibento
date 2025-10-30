import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { ArrowLeft } from 'lucide-react-native';
import { privateChats } from '../(tabs)/chats';

interface Message {
  id: string;
  text: string;
  time: string;
  sender: 'user' | 'other';
}

export default function ChatScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);
  
  // Trouver la conversation courante
  const chat = privateChats.find((c: { id: string }) => c.id === id);

  // Charger le message initial
  React.useEffect(() => {
    if (chat?.lastMessage) {
      setMessages([{
        id: '1',
        text: chat.lastMessage.text,
        time: chat.lastMessage.time,
        sender: 'other'
      }]);
    }
  }, [chat]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: message.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: 'user'
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');

    // Scroll vers le bas
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  if (!chat) {
    return (
      <SafeAreaView className="flex-1 bg-background justify-center items-center">
        <Text>Chat non trouvé</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header simple */}
      <View className="px-4 py-3 flex-row items-center justify-between bg-background border-b border-gray-100">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="p-2 mr-2">
            <ArrowLeft size={20} color="#1e90ff" />
          </TouchableOpacity>

          <Image
            source={{ uri: chat.user.avatar }}
            className="w-10 h-10 rounded-full"
          />
          <View className="ml-3">
            <Text className="font-semibold text-base text-text">{chat.user.name}</Text>
            <Text className={`text-xs ${chat.user.online ? 'text-success' : 'text-textSecondary'}`}>
              {chat.user.online ? 'En ligne' : 'Hors ligne'}
            </Text>
          </View>
        </View>
      </View>

      {/* Messages */}
      <ScrollView
        ref={scrollViewRef}
        className="flex-1 px-4 pt-4"
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((msg) => (
          <View
            key={msg.id}
            className={`mb-4 items-${msg.sender === "user" ? "end" : "start"}`}
          >
            <View
              className={`px-4 py-3 rounded-2xl max-w-[85%] ${
                msg.sender === "user"
                  ? "bg-secondary rounded-tr-none"
                  : "bg-surface rounded-tl-none"
              }`}
            >
              <Text className={`text-base ${msg.sender === "user" ? "text-white" : "text-text"}`}>
                {msg.text}
              </Text>
              <Text className={`text-xs mt-1 ${msg.sender === "user" ? "text-white/70" : "text-textSecondary"}`}>
                {msg.time}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Input de message simple */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="border-t border-gray-100 p-4"
      >
        <View className="flex-row items-center space-x-2">
          <View className="flex-1 bg-surface rounded-2xl px-4 border border-gray-100">
            <TextInput
              value={message}
              onChangeText={setMessage}
              placeholder="Écrivez votre message..."
              placeholderTextColor="rgba(0,0,0,0.4)"
              className="py-3"
              multiline
              maxLength={500}
              onSubmitEditing={() => message.trim() && sendMessage()}
            />
          </View>

          <TouchableOpacity
            onPress={sendMessage}
            disabled={!message.trim()}
            className={`w-12 h-12 rounded-full items-center justify-center ${
              message.trim() ? 'bg-secondary' : 'bg-gray-300'
            }`}
          >
            <Feather 
              name="send" 
              size={20} 
              color={message.trim() ? "#FFFFFF" : "#999"} 
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}