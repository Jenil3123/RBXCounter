import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AppState {
  hasSeenSplash: boolean;
  isLanguageSelected: boolean;
  isOnboardingCompleted: boolean;
  isCharacterSelected: boolean;
  isCustomizationCompleted: boolean;
  isFirstLaunchFinished: boolean;

  setHasSeenSplash: (value: boolean) => void;
  setLanguageSelected: (value: boolean) => void;
  setOnboardingCompleted: (value: boolean) => void;
  setCharacterSelected: (value: boolean) => void;
  setCustomizationCompleted: (value: boolean) => void;
  completeSetup: () => void;
  resetSetup: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      hasSeenSplash: false,
      isLanguageSelected: false,
      isOnboardingCompleted: false,
      isCharacterSelected: false,
      isCustomizationCompleted: false,
      isFirstLaunchFinished: false,

      setHasSeenSplash: (value) => set({ hasSeenSplash: value }),
      setLanguageSelected: (value) => set({ isLanguageSelected: value }),
      setOnboardingCompleted: (value) => set({ isOnboardingCompleted: value }),
      setCharacterSelected: (value) => set({ isCharacterSelected: value }),
      setCustomizationCompleted: (value) => set({ isCustomizationCompleted: value }),
      completeSetup: () => set({ isFirstLaunchFinished: true }),
      resetSetup: () =>
        set({
          hasSeenSplash: false,
          isLanguageSelected: false,
          isOnboardingCompleted: false,
          isCharacterSelected: false,
          isCustomizationCompleted: false,
          isFirstLaunchFinished: false,
        }),
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
