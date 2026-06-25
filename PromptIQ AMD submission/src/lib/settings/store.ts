import { create } from 'zustand';
import { UserSettings, defaultSettings } from './types';

interface SettingsState {
  settings: UserSettings;
  isLoading: boolean;
  error: string | null;
  syncStatus: 'synced' | 'syncing' | 'error' | 'offline';
  updateSettings: (category: keyof UserSettings, newSettings: Partial<UserSettings[keyof UserSettings]>) => void;
  setSettings: (settings: UserSettings) => void;
  setSyncStatus: (status: 'synced' | 'syncing' | 'error' | 'offline') => void;
  setError: (error: string | null) => void;
  setIsLoading: (isLoading: boolean) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  settings: defaultSettings,
  isLoading: true,
  error: null,
  syncStatus: 'offline',
  
  updateSettings: (category, newSettings) => 
    set((state) => ({
      settings: {
        ...state.settings,
        [category]: {
          ...state.settings[category],
          ...newSettings
        }
      }
    })),
    
  setSettings: (settings) => set({ settings }),
  setSyncStatus: (status) => set({ syncStatus: status }),
  setError: (error) => set({ error }),
  setIsLoading: (isLoading) => set({ isLoading }),
}));
