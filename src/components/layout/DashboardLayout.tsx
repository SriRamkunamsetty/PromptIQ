import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { AccessibilityCommandPalette } from './AccessibilityCommandPalette';
import { ErrorBoundary } from '../ErrorBoundary';
import { SettingsService } from '@/lib/settings/service';
import { useAuthStore } from '@/lib/store';
import { useSettingsStore } from '@/lib/settings/store';

export default function DashboardLayout() {
  const { user } = useAuthStore();
  const { settings } = useSettingsStore();
  
  useEffect(() => {
    if (user?.uid) {
      SettingsService.initialize(user.uid);
    }
    return () => {
      SettingsService.teardown();
    };
  }, [user?.uid]);

  useEffect(() => {
    // Apply styling globally
    const root = document.documentElement;
    const { appearance, accessibility } = settings;

    // Theme
    if (appearance.theme === 'dark') {
      root.classList.add('dark');
    } else if (appearance.theme === 'light') {
      root.classList.remove('dark');
    } else {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }

    // High Contrast
    if (accessibility.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Reduced Motion
    if (accessibility.reducedMotion) {
      root.classList.add('reduced-motion');
    } else {
      root.classList.remove('reduced-motion');
    }

    // Colorblind Filters
    root.classList.remove('cb-protanomaly', 'cb-deuteranomaly', 'cb-tritanomaly');
    if (accessibility.colorblindMode !== 'none') {
      root.classList.add(`cb-${accessibility.colorblindMode}`);
    }

    // CSS Custom Properties for Appearance & A11y
    root.style.setProperty('--font-scaling', `${accessibility.fontSizeScaling}%`);
    root.style.setProperty('--neon-glow-opacity', `${appearance.neonGlow / 100}`);
    root.style.setProperty('--glass-blur', `${appearance.blurIntensity}px`);
    root.style.setProperty('--glass-opacity', `${appearance.glossymorphism}`);
  }, [settings]);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar className="w-64 hidden md:flex" />
      <main className="flex-1 overflow-y-auto w-full relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="container mx-auto p-6 md:p-8 relative z-10 h-full max-w-7xl">
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </div>
      </main>
      <AccessibilityCommandPalette />
    </div>
  );
}
