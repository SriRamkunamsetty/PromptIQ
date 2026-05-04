import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSettingsStore } from '@/lib/settings/store';
import { SettingsService } from '@/lib/settings/service';
import { cn } from '@/lib/utils';
import { 
  Palette, 
  Accessibility, 
  Brain, 
  Bell, 
  ShieldCheck, 
  ActivitySquare,
  CheckCircle2,
  RefreshCcw,
  AlertCircle
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import AppearanceSettings from './tabs/AppearanceSettings';
import AccessibilitySettingsPanel from './tabs/AccessibilitySettings';
import AISettingsPanel from './tabs/AISettings';
import NotificationSettingsPanel from './tabs/NotificationSettings';
import SecuritySettingsPanel from './tabs/SecuritySettings';

const tabs = [
  { id: 'appearance', label: 'Appearance', icon: Palette, component: AppearanceSettings },
  { id: 'accessibility', label: 'Accessibility', icon: Accessibility, component: AccessibilitySettingsPanel },
  { id: 'ai', label: 'AI & Operations', icon: Brain, component: AISettingsPanel },
  { id: 'notifications', label: 'Notifications', icon: Bell, component: NotificationSettingsPanel },
  { id: 'security', label: 'Security', icon: ShieldCheck, component: SecuritySettingsPanel },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const { syncStatus, isLoading } = useSettingsStore();
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash && tabs.some(t => t.id === hash)) {
      setActiveTab(hash);
    }
  }, [location.hash]);

  const ActiveComponent = tabs.find(t => t.id === activeTab)?.component || tabs[0].component;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto">
      <div className="flex items-center justify-between border-b border-border/40 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gradient">Workspace Settings</h1>
          <p className="text-muted-foreground mt-2">Manage your preferences, operations, and security globally.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <Link to="/dashboard/settings-observability">
            <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors bg-card/30 px-3 py-1.5 rounded-full border border-border/50">
              <ActivitySquare className="w-4 h-4" />
              Sync Health
            </button>
          </Link>

          <div className="flex items-center gap-2 text-sm">
            {syncStatus === 'syncing' && (
              <span className="flex items-center gap-2 text-muted-foreground bg-card/50 px-3 py-1.5 rounded-full border border-border/50">
                <RefreshCcw className="w-4 h-4 animate-spin" />
                Syncing...
              </span>
            )}
            {syncStatus === 'synced' && (
              <span className="flex items-center gap-2 text-emerald-500 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
                <CheckCircle2 className="w-4 h-4" />
                Synced
              </span>
            )}
            {syncStatus === 'error' && (
              <span className="flex items-center gap-2 text-destructive bg-destructive/10 px-3 py-1.5 rounded-full border border-destructive/20">
                <AlertCircle className="w-4 h-4" />
                Offline
              </span>
            )}
            {syncStatus === 'offline' && (
              <span className="flex items-center gap-2 text-muted-foreground bg-card/50 px-3 py-1.5 rounded-full border border-border/50">
                <AlertCircle className="w-4 h-4" />
                Connecting...
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 relative">
        {/* Sidebar Nav */}
        <nav className="flex flex-row md:flex-col gap-1 w-full md:w-64 shrink-0 overflow-x-auto custom-scrollbar pb-2 md:pb-0 relative z-20">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  window.history.replaceState(null, '', `#${tab.id}`);
                }}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all relative overflow-hidden shrink-0",
                  isActive 
                    ? "text-primary shadow-sm" 
                    : "text-muted-foreground hover:bg-card/50 hover:text-foreground"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-tab"
                    className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-xl"
                    initial={false}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <tab.icon className={cn("w-5 h-5 relative z-10", isActive ? "text-primary" : "")} />
                <span className="relative z-10">{tab.label}</span>
              </button>
            )
          })}
        </nav>

        {/* Content Area */}
        <div className="flex-1 bg-card/10 border border-border/30 rounded-3xl p-6 md:p-8 backdrop-blur-sm min-h-[500px]">
          {isLoading ? (
            <div className="space-y-6">
              <div className="h-8 bg-card/40 rounded-md w-1/4 animate-pulse" />
              <div className="h-px bg-border/40 w-full" />
              <div className="space-y-4">
                <div className="h-20 bg-card/20 border border-border/20 rounded-xl w-full animate-pulse" />
                <div className="h-20 bg-card/20 border border-border/20 rounded-xl w-full animate-pulse" />
                <div className="h-20 bg-card/20 border border-border/20 rounded-xl w-full animate-pulse" />
              </div>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <ActiveComponent />
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
}
