// eslint-disable-next-line import/no-duplicates
import 'react-native-gesture-handler';
// eslint-disable-next-line import/no-duplicates
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Slot, useRouter, useSegments, useRootNavigationState } from 'expo-router';
import * as NativeSplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

import { useAppStore } from '@/store/useAppStore';
import { SplashScreen as AnimatedSplash } from '@/features/splash/screens/SplashScreen';

// Keep the native splash screen visible until our custom splash screen takes over
NativeSplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const [isAppReady, setIsAppReady] = useState(false);
  const router = useRouter();
  const segments = useSegments();
  const rootNavigationState = useRootNavigationState();
  
  const isFirstLaunchFinished = useAppStore((state) => state.isFirstLaunchFinished);
  const resetSetup = useAppStore((state) => state.resetSetup);

  useEffect(() => {
    // FORCE RESET FOR DEVELOPMENT SO USER CAN SEE THE FLOW
    if (__DEV__) {
      resetSetup();
    }
  }, []);

  useEffect(() => {
    // Only route if the app is completely ready (animated splash has finished)
    if (!rootNavigationState?.key || !isAppReady) return;

    const inSetupGroup = segments[0] === '(setup)';
    
    if (!isFirstLaunchFinished) {
      if (!inSetupGroup) {
        // Redirect to the first setup screen
        router.replace('/(setup)/language' as any);
      }
    } else {
      if (inSetupGroup) {
        router.replace('/(main)' as any);
      }
    }
  }, [isFirstLaunchFinished, segments, rootNavigationState?.key, router, isAppReady]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {!isAppReady ? (
        <AnimatedSplash onFinish={() => setIsAppReady(true)} />
      ) : (
        <Slot />
      )}
    </GestureHandlerRootView>
  );
}
