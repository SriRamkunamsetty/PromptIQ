import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Sparkles, 
  Rows3, 
  Settings, 
  LogOut,
  BrainCircuit,
  BugPlay,
  Network,
  ActivitySquare,
  Cpu,
  ShieldAlert,
  Accessibility,
  Microscope,
  Film,
  Bot,
  DatabaseZap,
  Activity,
  TrendingUp,
  GitCommit,
  BookOpen,
  HeartPulse
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { motion } from 'framer-motion';

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const location = useLocation();
  
  const handleSignOut = async () => {
    await signOut(auth);
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
    { icon: Bot, label: 'Agent Runtime', href: '/dashboard/agent' },
    { icon: Sparkles, label: 'Optimizer', href: '/dashboard/optimizer' },
    { icon: Rows3, label: 'Context', href: '/dashboard/context' },
    { icon: Film, label: 'Replay Engine', href: '/dashboard/replay' },
    { icon: Microscope, label: 'Fidelity', href: '/dashboard/fidelity' },
    { icon: DatabaseZap, label: 'Cache', href: '/dashboard/cache' },
    { icon: BugPlay, label: 'Debugger', href: '/dashboard/debugger' },
    { icon: GitCommit, label: 'Versioning', href: '/dashboard/versioning' },
    { icon: Network, label: 'Router', href: '/dashboard/router' },
    { icon: Activity, label: 'Observability', href: '/dashboard/runtime' },
    { icon: HeartPulse, label: 'Health', href: '/dashboard/health' },
    { icon: ActivitySquare, label: 'Analytics', href: '/dashboard/analytics' },
    { icon: TrendingUp, label: 'Forecasting', href: '/dashboard/forecasting' },
    { icon: Cpu, label: 'Architecture', href: '/dashboard/system' },
    { icon: ShieldAlert, label: 'Security', href: '/dashboard/security' },
  ];

  return (
    <div className={cn("h-screen p-4 flex flex-col z-50", className)}>
      <div className="glass-panel rounded-huge flex flex-col h-full border-white/5 shadow-2xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5 opacity-50" />
        
        <div className="relative z-10 flex flex-col h-full">
          <div className="px-6 py-8 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center shadow-primary-glow">
                <BrainCircuit className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-lg font-black tracking-tighter text-white uppercase leading-none">Prompt<span className="text-primary">IQ</span></h2>
                <span className="text-[10px] uppercase tracking-extrawide text-primary/60 font-bold">Runtime 2.5</span>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 custom-scrollbar space-y-1 pb-4">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link key={item.href} to={item.href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start h-12 gap-4 rounded-xl transition-all duration-300 relative group/btn overflow-hidden",
                      isActive 
                        ? "bg-primary/10 text-primary border border-primary/20 shadow-primary-glow-sm" 
                        : "text-muted-foreground hover:text-white hover:bg-white/5"
                    )}
                  >
                    {isActive && (
                      <motion.div 
                        layoutId="active-pill" 
                        className="absolute left-0 w-1 h-6 bg-primary rounded-r-full shadow-primary-glow-intense" 
                      />
                    )}
                    <item.icon className={cn("h-5 w-5 transition-transform duration-300 group-hover/btn:scale-110", isActive ? "text-primary" : "text-muted-foreground")} />
                    <span className="text-xs font-bold uppercase tracking-widest">{item.label}</span>
                  </Button>
                </Link>
              );
            })}
          </div>

          <div className="p-4 border-t border-white/5 bg-black/20 backdrop-blur-xl">
            <Link to="/dashboard/settings">
              <Button variant="ghost" className={cn("w-full justify-start h-12 gap-4 rounded-xl mb-1", location.pathname.startsWith('/dashboard/settings') ? "bg-white/10 text-white" : "text-muted-foreground hover:text-white")}>
                <Settings className="h-5 w-5" />
                <span className="text-xs font-bold uppercase tracking-widest">Settings</span>
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              className="w-full justify-start h-12 gap-4 rounded-xl text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-colors" 
              onClick={handleSignOut}
            >
              <LogOut className="h-5 w-5" />
              <span className="text-xs font-bold uppercase tracking-widest">Disconnect</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
