import { Activity, ServerPulse, Wifi, CircleDot, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProductionHealth() {
  return (
    <div className="space-y-6 flex flex-col h-full overflow-y-auto pb-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Production Runtime Health</h1>
        <p className="text-muted-foreground">SLA metrics, inference queue health, and api routing stability.</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-4 shrink-0">
         <div className="glass-panel p-6 rounded-3xl">
            <h3 className="text-sm font-medium text-muted-foreground mb-4 flex items-center gap-2"><Wifi pos="relative" className="w-4 h-4 text-emerald-400" /> Platform Uptime</h3>
            <div className="text-4xl font-black text-emerald-400">99.99<span className="text-lg font-normal text-muted-foreground">%</span></div>
            <p className="text-xs text-muted-foreground mt-2">Zero dropped requests</p>
         </div>
         <div className="glass-panel p-6 rounded-3xl">
            <h3 className="text-sm font-medium text-muted-foreground mb-4 flex items-center gap-2"><Activity pos="relative" className="w-4 h-4 text-blue-400" /> API Latency P99</h3>
            <div className="text-4xl font-black text-blue-400">24<span className="text-lg font-normal text-muted-foreground">ms</span></div>
            <p className="text-xs text-muted-foreground mt-2">Optimizer overhead</p>
         </div>
         <div className="glass-panel p-6 rounded-3xl">
            <h3 className="text-sm font-medium text-muted-foreground mb-4 flex items-center gap-2"><CircleDot pos="relative" className="w-4 h-4 text-yellow-400" /> Active Connections</h3>
            <div className="text-4xl font-black text-yellow-400">4,203</div>
            <p className="text-xs text-muted-foreground mt-2">Concurrent streaming</p>
         </div>
         <div className="glass-panel p-6 rounded-3xl border-destructive/20 border">
            <h3 className="text-sm font-medium text-muted-foreground mb-4 flex items-center gap-2"><AlertTriangle pos="relative" className="w-4 h-4 text-destructive" /> Error Rate</h3>
            <div className="text-4xl font-black text-destructive">0.02<span className="text-lg font-normal text-muted-foreground">%</span></div>
            <p className="text-xs text-destructive/50 mt-2">Provider timeouts</p>
         </div>
      </div>

      <div className="glass-panel p-6 rounded-3xl flex-1 min-h-[400px] flex flex-col items-center justify-center relative overflow-hidden bg-[url('/grid.svg')] bg-center">
         <div className="absolute inset-0 z-0 bg-emerald-500/5 pulse-bg pointer-events-none" />
         
         <div className="flex flex-col items-center relative z-10 text-center">
            <div className="w-24 h-24 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(52,211,153,0.2)]">
               <svg className="w-12 h-12 text-emerald-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
               </svg>
            </div>
            <h2 className="text-3xl font-black text-gradient">All Systems Operational</h2>
            <p className="text-muted-foreground mt-4 max-w-md">The Context Intelligence Runtime is currently processing inference traffic across 14 geographic zones with optimal latency.</p>
         </div>
      </div>
    </div>
  );
}
