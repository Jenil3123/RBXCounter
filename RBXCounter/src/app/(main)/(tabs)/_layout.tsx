import React from 'react';
import { Tabs } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { ThemedText } from '@/components/themed-text';
import { CustomTabBar } from '@/components/ui/CustomTabBar';

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
      screenListeners={{
        tabPress: () => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        },
      }}
    >
      <Tabs.Screen
        name="games"
        options={{
          title: 'Games',
          tabBarIcon: ({ focused }) => <ThemedText style={{ fontSize: 24, opacity: focused ? 1 : 0.5 }}>🎮</ThemedText>,
        }}
      />
      <Tabs.Screen
        name="rewards"
        options={{
          title: 'Rewards',
          tabBarIcon: ({ focused }) => <ThemedText style={{ fontSize: 24, opacity: focused ? 1 : 0.5 }}>🎁</ThemedText>,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => <ThemedText style={{ fontSize: 24, opacity: focused ? 1 : 0.5 }}>👤</ThemedText>,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ focused }) => <ThemedText style={{ fontSize: 24, opacity: focused ? 1 : 0.5 }}>⚙️</ThemedText>,
        }}
      />
    </Tabs>
  );
}
