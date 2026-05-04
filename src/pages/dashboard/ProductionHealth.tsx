import { useState, useEffect } from 'react';
import { Activity, Wifi, CircleDot, AlertTriangle, ShieldCheck, Cpu, HardDrive } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProductionHealth() {
  const [streamData, setStreamData] = useState<number[]>(Array(40).fill(20));
  
  useEffect(() => {
    const int = setInterval(() => {
      setStreamData(prev => {
        const next = [...prev.slice(1)];
        // Generate random variance around 22ms latency
        next.push(20 + Math.random() * 8);
        return next;
      });
    }, 800);
    return () => clearInterval(int);
  }, []);

  return (
    <div className="space-y-6 flex flex-col h-full overflow-y-auto pb-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Production Runtime Health</h1>
        <p className="text-muted-foreground">SLA metrics, inference queue health, cache pressure, and telemetry stability.</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-4 shrink-0">
         <div className="glass-panel p-6 rounded-3xl relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
            <div className="absolute inset-x-0 bottom-0 h-1 bg-emerald-500/50" />
            <h3 className="text-sm font-medium text-muted-foreground mb-4 flex items-center gap-2"><Wifi strokeWidth={3} className="w-4 h-4 text-emerald-400" /> Platform Uptime</h3>
            <div className="text-4xl font-black text-emerald-400">99.99<span className="text-lg font-normal text-emerald-500/50">%</span></div>
            <p className="text-xs text-muted-foreground mt-2">Zero dropped requests in 90d</p>
         </div>
         <div className="glass-panel p-6 rounded-3xl relative overflow-hidden group hover:border-blue-500/50 transition-colors">
            <div className="absolute inset-x-0 bottom-0 h-1 bg-blue-500/50" />
            <h3 className="text-sm font-medium text-muted-foreground mb-4 flex items-center gap-2"><Activity strokeWidth={3} className="w-4 h-4 text-blue-400" /> API Latency P99</h3>
            <div className="text-4xl font-black text-blue-400">24<span className="text-lg font-normal text-blue-500/50">ms</span></div>
            <p className="text-xs text-muted-foreground mt-2">Optimizer intercept overhead</p>
         </div>
         <div className="glass-panel p-6 rounded-3xl relative overflow-hidden group hover:border-yellow-500/50 transition-colors">
            <div className="absolute inset-x-0 bottom-0 h-1 bg-yellow-500/50" />
            <h3 className="text-sm font-medium text-muted-foreground mb-4 flex items-center gap-2"><Cpu strokeWidth={3} className="w-4 h-4 text-yellow-400" /> Cache Pressure</h3>
            <div className="text-4xl font-black text-yellow-400">82<span className="text-lg font-normal text-yellow-500/50">%</span></div>
            <p className="text-xs text-muted-foreground mt-2">L1 semantic cache utilization</p>
         </div>
         <div className="glass-panel p-6 rounded-3xl border-destructive/20 relative overflow-hidden group hover:border-destructive/80 transition-colors">
            <div className="absolute inset-x-0 bottom-0 h-1 bg-destructive/50" />
            <h3 className="text-sm font-medium text-muted-foreground mb-4 flex items-center gap-2"><AlertTriangle strokeWidth={3} className="w-4 h-4 text-destructive" /> Error Rate</h3>
            <div className="text-4xl font-black text-destructive">0.02<span className="text-lg font-normal text-destructive/50">%</span></div>
            <p className="text-xs text-destructive/50 mt-2">Third-party provider timeouts</p>
         </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 flex-1 min-h-[400px]">
        {/* Core Status Block */}
        <div className="lg:col-span-1 glass-panel p-8 rounded-3xl flex flex-col items-center justify-center relative overflow-hidden bg-[url('/grid.svg')] bg-center bg-[size:2rem_2rem]">
           <div className="absolute inset-0 z-0 bg-emerald-500/5 animate-pulse pointer-events-none" />
           
           <div className="flex flex-col items-center relative z-10 text-center">
              <div className="relative">
                <div className="absolute inset-0 bg-emerald-400 rounded-full blur-[40px] opacity-20" />
                <div className="w-28 h-28 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-8 shadow-[inset_0_0_20px_rgba(52,211,153,0.2)]">
                   <ShieldCheck className="w-14 h-14 text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,1)]" />
                </div>
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight mb-2">Systems Operational</h2>
              <p className="text-sm text-muted-foreground max-w-[250px]">Context Intelligence Runtime is processing global inference traffic normally.</p>
           </div>
        </div>

        {/* Live Metrics Stream */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl flex flex-col">
          <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
             <Activity className="w-5 h-5 text-primary" /> Live Latency Distribution Stream
          </h2>
          <div className="flex-1 flex items-end justify-between gap-[2px] mt-4 relative">
             <div className="absolute inset-0 border-b border-l border-white/10 pointer-events-none" />
             {/* Y-axis labels */}
             <div className="absolute -left-1 pb-2 bottom-0 text-[10px] text-muted-foreground transform -translate-x-full">0ms</div>
             <div className="absolute -left-1 top-1/2 text-[10px] text-muted-foreground transform -translate-x-full -translate-y-1/2">25ms</div>
             <div className="absolute -left-1 top-0 text-[10px] text-muted-foreground transform -translate-x-full">50ms</div>
             
             {/* Chart grid lines */}
             <div className="absolute inset-x-0 top-1/2 border-b border-dashed border-white/5 pointer-events-none" />
             
             {streamData.map((val, i) => (
                <div 
                  key={i} 
                  className="w-full bg-gradient-to-t from-primary/20 to-primary/80 rounded-t-sm transition-all duration-300"
                  style={{ height: `${(val / 50) * 100}%`, minHeight: '1px' }}
                />
             ))}
          </div>
          <div className="flex justify-between items-center mt-6 text-xs text-muted-foreground">
             <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-primary animate-pulse" /> Live Telemetry Feed (US-Central-1)</div>
             <div className="font-mono">Avg: 23.4ms</div>
          </div>
        </div>
      </div>
      
      {/* Infrastructure Diagnostics */}
      <div className="glass-panel p-6 rounded-3xl relative overflow-hidden">
         <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <HardDrive className="w-5 h-5" /> Edge Routing Nodes
         </h2>
         <div className="grid md:grid-cols-3 gap-4">
            {['EU-WEST-1 (Dublin)', 'US-EAST-4 (Ashburn)', 'ASIA-NORTHEAST-1 (Tokyo)'].map((region, i) => (
               <div key={region} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono text-muted-foreground uppercase">{region}</span>
                    <span className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-medium bg-emerald-400/10 px-2 py-0.5 rounded-full"><div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" /> HEALTHY</span>
                  </div>
                  <div className="flex justify-between items-center">
                     <div>
                       <div className="text-xs text-muted-foreground">Queue Depth</div>
                       <div className="text-lg font-bold text-white">0</div>
                     </div>
                     <div className="text-right">
                       <div className="text-xs text-muted-foreground">Throughput</div>
                       <div className="text-lg font-bold text-white">{1240 + Math.floor(Math.random()*100)} r/s</div>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>

    </div>
  );
}
