import { Tabs } from 'expo-router';
import { 
  Entypo,
  AntDesign 
} from '@expo/vector-icons';
import { View } from 'react-native';

export default function TabLayout() {
  const { colors, isDark } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          height: 100,
          paddingBottom: 20,
          paddingTop: 20,
          shadowColor: colors.text,
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: isDark ? 0.05 : 0.1,
          shadowRadius: 8,
          elevation: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 2,
          color: colors.textSecondary,
        },
        tabBarIconStyle: {
          marginTop: 0,
        },
      }}
    >
            <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          href: '/',
          tabBarIcon: ({ focused, color }) => (
            <Entypo name="home" size={24} color={focused ? colors.primary : colors.textSecondary} />
          ),
        }}
      />
      <Tabs.Screen
        name="my-wallets"
        options={{
          title: 'Catégories',
          href: '/my-wallets',
          tabBarIcon: ({ focused, size }) => (
            <WalletIcon
              size={24}
              color={focused ? colors.primary : colors.textSecondary}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="new-transaction"
        options={{
          title: '',
          href: '/new-transaction',
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                width: 56,
                height: 56,
                borderRadius: 16,
                backgroundColor: colors.primary,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: -5,
                shadowColor: colors.primary,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 8,
              }}
            >
              <AntDesign name="plus" size={28} color={colors.surface} />
            </View>
          ),
          tabBarLabel: () => null,
        }}
      />
            <Tabs.Screen
        name="analytics"
        options={{
          title: 'Analytics',
          href: '/analytics',
          tabBarIcon: ({ focused, size }) => (
            <StatIcon
              size={24}
              color={focused ? colors.primary : colors.textSecondary}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          href: '/profile',
          tabBarIcon: ({ focused, size }) => (
            <UserLightIcon size={24} color={focused ? colors.primary : colors.textSecondary} />
          ),
        }}
      />
    </Tabs>
  );
}
