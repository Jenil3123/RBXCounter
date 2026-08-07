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

  // Rewards State
  balance: number;
  currentStreak: number;
  lastClaimedDate: string | null;

  setHasSeenSplash: (value: boolean) => void;
  setLanguageSelected: (value: boolean) => void;
  setOnboardingCompleted: (value: boolean) => void;
  setCharacterSelected: (value: boolean) => void;
  setCustomizationCompleted: (value: boolean) => void;
  completeSetup: () => void;
  resetSetup: () => void;

  addBalance: (amount: number) => void;
  claimDailyReward: (amount: number) => void;
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
      
      balance: 0,
      currentStreak: 0,
      lastClaimedDate: null,

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
          // We intentionally don't reset balance/streak on setup reset, unless wanted.
        }),
        
      addBalance: (amount) => set((state) => ({ balance: state.balance + amount })),
      
      claimDailyReward: (amount) => set((state) => {
        const today = new Date().toISOString().split('T')[0];
        const nextStreak = state.currentStreak >= 7 ? 1 : state.currentStreak + 1; // loop or cap at 7, let's reset to 1 after day 7
        return {
          balance: state.balance + amount,
          currentStreak: nextStreak,
          lastClaimedDate: today,
        };
      }),
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
