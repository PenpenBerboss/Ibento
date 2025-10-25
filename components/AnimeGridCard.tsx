import React, { useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Animated, 
  StyleSheet,
  Dimensions
} from 'react-native';
import SmartImage from './SmartImage';
import { Feather } from '@expo/vector-icons';
import { Anime } from '../data/animeList';
import { LinearGradient } from 'expo-linear-gradient';
const colors = {
  background: '#FFFFFF',
  surface: '#F9F9F9',
  primary: '#1e90ff',
  secondary: '#CC0000',
  text: '#000000',
  textSecondary: '#555555',
};

interface AnimeGridCardProps {
  anime: Anime;
  onPress?: (id: string) => void;
  index: number;
}

const ITEM_WIDTH = (Dimensions.get('window').width - 48) / 2; // 2 columns with padding
const ITEM_HEIGHT = ITEM_WIDTH * 1.5;

export default function AnimeGridCard({ anime, onPress, index }: AnimeGridCardProps) {
  // Animation values
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    // Staggered animation based on index
    const delay = index * 100;
    
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 400,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        delay,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  // Calculate progress percentage
  const progressPercentage = Math.min((anime.watchedEpisodes / anime.episodes) * 100, 100);
  
  // Get the right status icon
  const getStatusIcon = () => {
    switch (anime.status) {
      case 'watching': return 'play';
      case 'completed': return 'check';
      case 'on-hold': return 'pause';
      case 'dropped': return 'x';
      default: return 'circle';
    }
  };
  
  // Get status color
  const getStatusColor = () => {
    switch (anime.status) {
  case 'watching': return colors.primary;
  case 'completed': return colors.secondary;
      case 'on-hold': return '#555555';
      case 'dropped': return '#777777';
      default: return '#9E9E9E';
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim,
        }
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.card}
        onPress={() => onPress?.(anime.id)}
      >
        <SmartImage
          source={anime.image}
          style={styles.image}
          contain={false}
        />
        
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.9)']}
          style={styles.gradient}
        >
          <Text style={styles.title} numberOfLines={2}>
            {anime.title}
          </Text>
          
          <View style={styles.badgeRow}>
            <View style={styles.typeBadge}>
              <Text style={styles.typeBadgeText}>{anime.type}</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
              <Feather name={getStatusIcon()} size={10} color="white" />
            </View>
          </View>
          
          <View style={styles.infoRow}>
            <View style={styles.ratingBadge}>
              <Feather name="star" size={10} color="#FFD700" />
              <Text style={styles.ratingText}>{anime.rating}</Text>
            </View>
            <Text style={styles.episodesText}>
              {anime.watchedEpisodes}/{anime.episodes}
            </Text>
          </View>
          
          {/* Progress bar */}
          <View style={styles.progressBarContainer}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${progressPercentage}%` }
              ]} 
            />
          </View>
        </LinearGradient>

        {/* Interactive elements */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => console.log('Add episode to', anime.id)}
          >
            <Feather name="plus" size={14} color="white" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    margin: 6,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  card: {
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '55%',
    padding: 12,
    justifyContent: 'flex-end',
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 6,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  typeBadge: {
    backgroundColor: 'rgba(204, 0, 0, 0.8)',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  typeBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '500',
  },
  statusBadge: {
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 4,
  },
  ratingText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
    marginLeft: 2,
  },
  episodesText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 10,
  },
  progressBarContainer: {
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 1.5,
    marginTop: 2,
  },
  progressFill: {
    height: '100%',
  backgroundColor: colors.primary,
    borderRadius: 1.5,
  },
  actionButtons: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  actionButton: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
