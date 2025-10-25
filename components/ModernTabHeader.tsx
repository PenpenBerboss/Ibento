import React, { useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  Animated, 
  Dimensions,
  StyleSheet
} from 'react-native';
import { Feather } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface ModernTabHeaderProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  icons?: { [key: string]: string };
}

export default function ModernTabHeader({ 
  tabs, 
  activeTab, 
  onTabChange,
  icons = {} 
}: ModernTabHeaderProps) {
  const scrollViewRef = useRef<ScrollView>(null);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const tabPositions = useRef<{ [key: string]: number }>({}).current;
  const indicatorWidth = 20; // Width of the active indicator dot
  
  // Store positions of tabs for indicator animation
  const measureTab = (tabName: string, x: number) => {
    tabPositions[tabName] = x;
  };

  // Scroll to active tab
  useEffect(() => {
    const activeIndex = tabs.indexOf(activeTab);
    if (activeIndex !== -1 && scrollViewRef.current) {
      const position = tabPositions[activeTab] || activeIndex * 110;
      scrollViewRef.current.scrollTo({ x: position - 40, animated: true });
      
      // Animate the indicator
      Animated.spring(animatedValue, {
        toValue: position + (110 / 2) - (indicatorWidth / 2), // Center of tab - half of indicator width
        useNativeDriver: true,
        friction: 8,
        tension: 50
      }).start();
    }
  }, [activeTab]);

  return (
    <View className="mb-6">
      <ScrollView 
        ref={scrollViewRef}
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        className="px-6"
      >
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={tab}
            onPress={() => onTabChange(tab)}
            onLayout={({ nativeEvent }) => {
              measureTab(tab, nativeEvent.layout.x);
            }}
            className={`px-6 py-3 mr-2 ${styles.tabItem}`}
            style={{ 
              width: 110,
              opacity: activeTab === tab ? 1 : 0.7
            }}
          >
            <View style={styles.tabContent}>
              {icons[tab] ? (
                <View className={`mb-2 p-2 rounded-full ${activeTab === tab ? 'bg-secondary' : 'bg-white/10'}`}>
                  <Feather
                    name={icons[tab] as any}
                    size={20}
                    color={activeTab === tab ? '#fff' : '#555555'}
                  />
                </View>
              ) : null}
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{ flexShrink: 1 }}
                className={`${activeTab === tab ? 'text-secondary font-semibold' : 'text-textPrimary font-normal'} text-sm`}
              >
                {tab}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      {/* Animated Indicator */}
      <Animated.View 
        style={[
          styles.indicator,
          {
            transform: [{ translateX: animatedValue }],
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingVertical: 10,
  },
  tabItem: {
    borderRadius: 12,
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginBottom: 5,
  },
  tabText: {
    fontSize: 12,
  },
  indicator: {
    position: 'absolute',
    bottom: 2,
    height: 4,
    width: 20,
    borderRadius: 2,
  backgroundColor: '#fff', // Blanc sur fond rouge
    alignSelf: 'center',
  },
});
