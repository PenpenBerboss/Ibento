import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import SmartImage from './SmartImage';
import { Users } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { Community } from '../data/communities';
import { useCommunityStore } from '../hooks/useCommunityStore';

interface CommunityCardProps {
  community: Community;
  gridView?: boolean;
}

const CommunityCard: React.FC<CommunityCardProps> = ({ community, gridView = true }) => {
  const router = useRouter();
  const { joinCommunity, leaveCommunity } = useCommunityStore();
  
  const handlePress = () => {
    router.push(`/community/${community.id}` as any);
  };

  const handleJoinPress = (e: any) => {
    e.stopPropagation();
    if (community.joined) {
      leaveCommunity(community.id);
    } else {
      joinCommunity(community.id);
    }
  };

  if (gridView) {
    return (
      <TouchableOpacity 
        onPress={handlePress}
        className="rounded-2xl bg-surface overflow-hidden shadow-md"
        style={styles.gridCard}
      >
        <SmartImage
          source={community.cover}
          style={{ width: '100%', height: 112, borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
          contain={false}
        />
        
        <View className="p-3">
          <Text className="text-text font-bold text-base" numberOfLines={1}>
            {community.name}
          </Text>
          
          <Text className="text-textSecondary text-xs mt-1" numberOfLines={2}>
            {community.description}
          </Text>
          
          <View className="flex-row items-center justify-between mt-3">
            <View className="flex-row items-center">
              <Users size={14} color="#CC0000" />
              <Text className="text-textSecondary text-xs ml-1">
                {community.members}
              </Text>
            </View>
            
            <TouchableOpacity 
              onPress={handleJoinPress}
              className={`px-3 py-1 rounded-lg ${community.joined ? 'bg-red-500' : 'bg-secondary'}`}
            >
              <Text className="text-white text-xs font-medium">
                {community.joined ? 'Quitter' : 'Rejoindre'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  
  // Version liste
  return (
    <TouchableOpacity 
      onPress={handlePress}
      className="flex-row rounded-2xl bg-[#1a1a1a] overflow-hidden shadow-md mb-3"
      style={styles.listCard}
    >
      <SmartImage
        source={community.cover}
        style={{ width: 80, height: '100%' }}
        contain={false}
      />
      
      <View className="flex-1 p-3">
        <Text className="text-white font-bold text-base" numberOfLines={1}>
          {community.name}
        </Text>
        
        <Text className="text-gray-300 text-xs mt-1" numberOfLines={2}>
          {community.description}
        </Text>
        
        <View className="flex-row items-center justify-between mt-2">
          <View className="flex-row items-center">
              <Users size={14} color="#CC0000" />
            <Text className="text-gray-400 text-xs ml-1">
              {community.members}
            </Text>
          </View>
          
          <TouchableOpacity 
            onPress={handleJoinPress}
            className={`px-3 py-1 rounded-lg ${community.joined ? 'bg-red-500' : 'bg-secondary'}`}
          >
            <Text className="text-white text-xs font-medium">
              {community.joined ? 'Quitter' : 'Rejoindre'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const windowWidth = Dimensions.get('window').width;
const cardWidth = (windowWidth - 48) / 2; // 2 cartes par ligne avec 16px de marge entre elles et sur les côtés

const styles = StyleSheet.create({
  gridCard: {
    width: cardWidth,
    marginBottom: 16,
  },
  listCard: {
    width: '100%',
    height: 100,
  }
});

export default CommunityCard;
