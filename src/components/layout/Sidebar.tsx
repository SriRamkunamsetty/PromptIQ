import React, { HTMLAttributes } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Sparkles, 
  Rows3, 
  BarChart3, 
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
    { icon: Bot, label: 'Autonomous Agent', href: '/dashboard/agent' },
    { icon: Sparkles, label: 'Prompt Optimizer', href: '/dashboard/optimizer' },
    { icon: Rows3, label: 'Context Manager', href: '/dashboard/context' },
    { icon: Film, label: 'Optimization Replay', href: '/dashboard/replay' },
    { icon: Microscope, label: 'Semantic Fidelity', href: '/dashboard/fidelity' },
    { icon: DatabaseZap, label: 'Semantic Cache', href: '/dashboard/cache' },
    { icon: BugPlay, label: 'Prompt Debugger', href: '/dashboard/debugger' },
    { icon: GitCommit, label: 'Version Control', href: '/dashboard/versioning' },
    { icon: Network, label: 'Model Router', href: '/dashboard/router' },
    { icon: BarChart3, label: 'Benchmarks', href: '/dashboard/benchmarks' },
    { icon: Activity, label: 'Observability', href: '/dashboard/runtime' },
    { icon: HeartPulse, label: 'Runtime Health', href: '/dashboard/health' },
    { icon: ActivitySquare, label: 'Analytics', href: '/dashboard/analytics' },
    { icon: TrendingUp, label: 'Cost Forecasting', href: '/dashboard/forecasting' },
    { icon: Cpu, label: 'System Architecture', href: '/dashboard/system' },
    { icon: ShieldAlert, label: 'Security Intelligence', href: '/dashboard/security' },
    { icon: Accessibility, label: 'Accessibility', href: '/dashboard/accessibility' },
    { icon: BookOpen, label: 'Case Studies', href: '/dashboard/case-studies' },
  ];

  return (
    <div className={cn("pb-12 border-r border-border/40 bg-card/20 backdrop-blur-md flex flex-col h-full", className)}>
      <div className="space-y-4 py-4 flex-1 overflow-hidden flex flex-col">
        <div className="px-3 py-2 flex-1 flex flex-col min-h-0">
          <div className="flex items-center px-4 mb-6 mt-2 shrink-0">
            <BrainCircuit className="w-8 h-8 text-primary mr-3" />
            <h2 className="text-2xl font-semibold tracking-tight text-gradient">
              PromptIQ
            </h2>
          </div>
          <div className="space-y-1 overflow-y-auto flex-1 pr-2 pb-2 custom-scrollbar">
            {navItems.map((item) => (
              <Link key={item.href} to={item.href}>
                <Button
                  variant={location.pathname === item.href ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start mb-1 gap-3",
                    location.pathname === item.href 
                      ? "bg-primary/20 hover:bg-primary/30 text-primary border border-primary/20" 
                      : "hover:bg-card/50 text-muted-foreground hover:text-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="px-3 py-2 flex flex-col gap-1">
        <Link to="/dashboard/settings">
          <Button variant={location.pathname.startsWith('/dashboard/settings') ? "secondary" : "ghost"} className={cn("w-full justify-start gap-3", location.pathname.startsWith('/dashboard/settings') ? "bg-primary/20 hover:bg-primary/30 text-primary border border-primary/20" : "hover:bg-card/50 text-muted-foreground hover:text-foreground")}>
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </Link>
        <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-destructive/10 hover:text-destructive text-muted-foreground" onClick={handleSignOut}>
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}
