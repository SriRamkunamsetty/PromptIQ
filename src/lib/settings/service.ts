import { UseBoundStore, StoreApi } from 'zustand';
import { doc, onSnapshot, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, handleFirestoreError, OperationType } from '@/lib/firebase';
import { useSettingsStore } from './store';
import { defaultSettings, UserSettings } from './types';
import { toast } from 'sonner';

// Keep track of unsusbcribe functions
const unsubscribes: Record<string, () => void> = {};
let isInitialized = false;

// We debounce writes to avoid spamming Firestore
let writeTimeout: ReturnType<typeof setTimeout> | null = null;
const DEBOUNCE_MS = 1000;

export const SettingsService = {
  initialize: (userId: string) => {
    if (isInitialized) return;
    isInitialized = true;
    
    useSettingsStore.getState().setIsLoading(true);

    const categories = ['appearance', 'accessibility', 'ai', 'notifications', 'security'] as const;
    let loadedCategories = 0;

    categories.forEach(category => {
      const docRef = doc(db, 'users', userId, 'settings', category);
      
      unsubscribes[category] = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data() as any;
          useSettingsStore.getState().setSettings({
            ...useSettingsStore.getState().settings,
            [category]: { ...defaultSettings[category], ...data }
          });
        }
        
        loadedCategories++;
        if (loadedCategories >= categories.length) {
          useSettingsStore.getState().setIsLoading(false);
          useSettingsStore.getState().setSyncStatus('synced');
        }
      }, (error) => {
        console.error(`Error listening to settings category ${category}:`, error);
        useSettingsStore.getState().setSyncStatus('error');
        handleFirestoreError(error, OperationType.GET, `users/{userId}/settings/${category}`);
      });
    });
  },

  teardown: () => {
    Object.values(unsubscribes).forEach(unsub => unsub());
    isInitialized = false;
  },

  updateCategory: async <K extends keyof UserSettings>(
    category: K, 
    changes: Partial<UserSettings[K]>
  ) => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;

    // Optimistic update
    useSettingsStore.getState().updateSettings(category, changes);
    useSettingsStore.getState().setSyncStatus('syncing');

    if (writeTimeout) clearTimeout(writeTimeout);

    writeTimeout = setTimeout(async () => {
      try {
        const docRef = doc(db, 'users', userId, 'settings', category as string);
        const currentCategoryState = useSettingsStore.getState().settings[category];
        
        const payload = Object.fromEntries(
          Object.entries(currentCategoryState).filter(([_, v]) => v !== undefined)
        );

        await setDoc(docRef, {
          ...payload,
          updatedAt: serverTimestamp()
        }, { merge: true });
        
        useSettingsStore.getState().setSyncStatus('synced');
      } catch (error) {
        console.error('Failed to sync settings:', error);
        useSettingsStore.getState().setSyncStatus('error');
        toast.error('Failed to save settings. Reverting changes...');
        // Let the realtime listener fix the state globally
      }
    }, DEBOUNCE_MS);
  }
};
