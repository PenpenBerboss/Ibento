import React, { useMemo } from "react";
// import { groups } from '../../data/groups';
// import { privateChats } from './chats';
import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Platform,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const colors = {
  background: '#FFFFFF',
  surface: '#F9F9F9',
  primary: '#1e90ff',      // Couleur principale de Tailwind
  secondary: '#CC0000',    // Couleur secondaire de Tailwind
  text: '#000000',
  textSecondary: '#555555',
  accent: '#1e90ff',       // Couleur d'accent de Tailwind
  success: '#4ade80',      // Couleur success de Tailwind
};

type TabBarIconProps = {
  name: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  color: string;
  focused: boolean;
  badgeCount?: number;
};

const TabBarIcon = ({ name, color, focused, badgeCount }: TabBarIconProps) => {
  return (
    <View style={[styles.iconWrapper]}>
      <View style={[styles.iconContainer, focused && styles.iconFocused]}>
        <MaterialCommunityIcons
          name={name}
          size={26}
          color={color}
          style={styles.icon}
        />
      </View>

      {badgeCount && badgeCount > 0 ? (
        <View style={styles.badge}>
          <Text numberOfLines={1} style={styles.badgeText}>
            {badgeCount > 99 ? "99+" : String(badgeCount)}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  // Calculs dynamiques pour respecter la safe area et garder la tab bar au-dessus de l'indicateur
  const baseHeight = Platform.OS === "ios" ? 60 : 56; // hauteur "pratique" sans inset
  const tabBarHeight = baseHeight + (insets.bottom ?? 0);

  const screenOptions = useMemo(
    () => ({
      headerShown: false,
      tabBarShowLabel: true,
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.textSecondary,
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: "500" as const,
        marginTop: 4,
        paddingBottom: 2,
      },
      tabBarStyle: {
        backgroundColor: colors.background,
        borderTopWidth: 0.2,
        borderTopColor: "#222", // discret en dark mode
        height: tabBarHeight,
        paddingTop: 8,
        // laisser un petit espace entre le label et l'indicateur
        paddingBottom: insets.bottom ? Math.max(insets.bottom - 6, 8) : 12,
        position: "absolute" as const,
        left: 0,
        right: 0,
        bottom: 0,
        elevation: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -1 },
        shadowOpacity: 0.18,
        shadowRadius: 6,
      },
      tabBarItemStyle: {
        alignItems: "center" as const,
        justifyContent: "center" as const,
        paddingVertical: 2,
        paddingHorizontal: 4,
      },
    }),
    [insets.bottom, tabBarHeight]
  );

  // Badge count dynamique basé sur le nombre de conversations non lues dans l'onglet "Chats"
  // const chatsBadgeCount = Array.isArray(privateChats)
  //   ? privateChats.filter((c) => c.lastMessage && c.lastMessage.unread).length
  //   : 0;
  const chatsBadgeCount = 0; // Temporairement désactivé

  // Floating Action Button (FAB) handler
  const onFabPress = (_e: GestureResponderEvent) => {
    // placeholder action — remplacer par navigation ou ouverture modal
    console.log("FAB pressed");
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Tabs screenOptions={screenOptions}>
        <Tabs.Screen
          name="index"
          options={{
            title: "Accueil",
            tabBarLabel: "Accueil",
            tabBarIcon: ({ color, focused }) => (
              // icône moderne type WhatsApp
              <TabBarIcon name="home-variant" color={color} focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="chats"
          // options={{
          //   title: "Chats",
          //   tabBarLabel: "Chats",
          //   tabBarIcon: ({ color, focused }) => (
          //     // icône plus moderne et lisible
          //     <TabBarIcon
          //       name="message-text"
          //       color={color}
          //       focused={focused}
          //       badgeCount={chatsBadgeCount}
          //     />
          //   ),
          // }}
          options={{
            href: null, // Masque l'onglet
          }}
        />
        <Tabs.Screen
          name="community/index"
          // options={{
          //   title: "Communauté",
          //   tabBarLabel: "Communauté",
          //   tabBarIcon: ({ color, focused }) => (
          //     <TabBarIcon
          //       name="account-group-outline"
          //       color={color}
          //       focused={focused}
          //     />
          //   ),
          // }}
          options={{
            href: null, // Masque l'onglet
          }}
        />
        <Tabs.Screen
          name="events"
          options={{
            title: "Événements",
            tabBarLabel: "Événements",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name="calendar-outline"
                color={color}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Paramètres",
            tabBarLabel: "Paramètres",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name="cog-outline" color={color} focused={focused} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  iconWrapper: {
    width: 48,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 28,
    minHeight: 28,
  },
  icon: {
    textAlign: "center",
    transform: [{ translateY: -2 }], // léger remontée
  },
  iconFocused: {
    transform: [{ scale: 1.08 }],
  },
  badge: {
    position: "absolute",
    right: -6,
    top: 2,
    backgroundColor: colors.secondary,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 4,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    elevation: 10,
  },
  badgeText: {
    color: colors.background,
    fontSize: 11,
    fontWeight: "700",
  },
});
