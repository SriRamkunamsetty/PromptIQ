import { vi, describe, it, expect, beforeEach } from 'vitest';
import { useSettingsStore } from './store';
import { defaultSettings } from './types';

describe('Settings State Layer', () => {
  beforeEach(() => {
    useSettingsStore.setState({
      settings: defaultSettings,
      syncStatus: 'offline',
      isLoading: true,
      error: null
    });
  });

  it('initializes with default config', () => {
    const { settings, isLoading, syncStatus } = useSettingsStore.getState();
    expect(settings).toEqual(defaultSettings);
    expect(isLoading).toBe(true);
    expect(syncStatus).toBe('offline');
  });

  it('updates category optimistically', () => {
    useSettingsStore.getState().updateSettings('appearance', { theme: 'light' });
    
    const state = useSettingsStore.getState();
    expect(state.settings.appearance.theme).toBe('light');
    // Ensure rest of appearance is untouched
    expect(state.settings.appearance.compactMode).toBe(defaultSettings.appearance.compactMode);
  });

  it('status changes sequentially', () => {
    const store = useSettingsStore.getState();
    store.setSyncStatus('syncing');
    expect(useSettingsStore.getState().syncStatus).toBe('syncing');
    
    store.setSyncStatus('synced');
    expect(useSettingsStore.getState().syncStatus).toBe('synced');
  });
});
