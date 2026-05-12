import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { AccessibilityCommandPalette } from './AccessibilityCommandPalette';
import { ErrorBoundary } from '../ErrorBoundary';
import { SettingsService } from '@/lib/settings/service';
import { useAuthStore } from '@/lib/store';
import { useSettingsStore } from '@/lib/settings/store';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, Loader2 } from 'lucide-react';

export default function DashboardLayout() {
  const { user } = useAuthStore();
  const [isInitializing, setIsInitializing] = useState(true);
  const { settings } = useSettingsStore();
  
  useEffect(() => {
    if (user?.uid) {
      SettingsService.initialize(user.uid);
    }
    const timer = setTimeout(() => setIsInitializing(false), 1500);
    return () => {
      SettingsService.teardown();
      clearTimeout(timer);
    };
  }, [user?.uid]);

  useEffect(() => {
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
    
    if (accessibility.highContrast) root.classList.add('high-contrast');
    else root.classList.remove('high-contrast');

    if (accessibility.reducedMotion) root.classList.add('reduced-motion');
    else root.classList.remove('reduced-motion');

    // Colorblind Filters
    root.classList.remove('cb-protanomaly', 'cb-deuteranomaly', 'cb-tritanomaly');
    if (accessibility.colorblindMode !== 'none') {
      root.classList.add(`cb-${accessibility.colorblindMode}`);
    }

    root.style.setProperty('--font-scaling', `${accessibility.fontSizeScaling}%`);
    root.style.setProperty('--neon-glow-opacity', `${appearance.neonGlow / 100}`);
    root.style.setProperty('--glass-blur', `${appearance.blurIntensity}px`);
    root.style.setProperty('--glass-opacity', `${appearance.glossymorphism}`);
  }, [settings]);

  return (
    <div className="flex h-screen overflow-hidden bg-black relative">
      <AnimatePresence>
        {isInitializing && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
          >
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative"
              >
                <BrainCircuit className="w-12 h-12 text-primary" />
                <div className="absolute inset-0 bg-primary/20 blur-xl animate-pulse rounded-full" />
              </motion.div>
              <div className="mt-6 flex items-center gap-3">
                <Loader2 className="w-4 h-4 text-primary animate-spin" />
                <span className="text-[10px] uppercase tracking-superwide text-primary/80 font-bold">Synchronizing Neural Paths</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="infrastructure-overlay" />
      
      <Sidebar className="w-72 hidden md:flex shrink-0" />
      
      <main id="main-content" tabIndex={-1} className="flex-1 overflow-y-auto w-full relative outline-none py-4 pr-4 pl-0">
        <motion.div 
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="h-full w-full glass-panel rounded-colossal border-white/5 relative z-10 overflow-hidden flex flex-col shadow-2xl"
        >
          <div className="scanline-effect opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-indigo-500/5 pointer-events-none" />
          
          <div className="flex-1 overflow-y-auto custom-scrollbar relative z-20">
            <div className="container mx-auto p-8 lg:p-12 max-w-7xl">
              <ErrorBoundary>
                <Outlet />
              </ErrorBoundary>
            </div>
          </div>
        </motion.div>
      </main>
      
      <AccessibilityCommandPalette />
    </div>
  );
}
