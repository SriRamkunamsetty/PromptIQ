import { useState, useEffect } from 'react';
import { Activity, GaugeCircle, Cpu, Wifi, Code2, ShieldAlert, CircleDot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RuntimeObservability() {
  const [logs, setLogs] = useState<any[]>([]);

  // Simulate incoming telemetry logs
  useEffect(() => {
    const events = [
      { type: 'info', msg: 'Job #9234 starting optimization phase', service: 'orchestrator' },
      { type: 'success', msg: 'Cache hit via semantic embedding (score: 0.94)', service: 'cache' },
      { type: 'warning', msg: 'High token density detected (>80%)', service: 'analyzer' },
      { type: 'info', msg: 'Routing inference request to Gemini 3.1 Flash', service: 'router' },
      { type: 'error', msg: 'Threat detected: Injection heuristic triggered', service: 'firewall' },
      { type: 'success', msg: 'Compression complete (-3409 tokens)', service: 'optimizer' },
    ];

    const intv = setInterval(() => {
      setLogs(prev => {
        const next = [
           { ...events[Math.floor(Math.random() * events.length)], id: Date.now(), time: new Date().toISOString() },
           ...prev
        ];
        return next.slice(0, 15);
      });
    }, 1500);

    return () => clearInterval(intv);
  }, []);

  return (
    <div className="space-y-6 flex flex-col h-full overflow-hidden">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Runtime Observability</h1>
        <p className="text-muted-foreground">Real-time edge telemetry, optimization job execution states, and diagnostic tracing.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 shrink-0">
          <div className="glass-panel p-4 rounded-2xl flex items-center gap-4">
             <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
               <Activity className="w-5 h-5 animate-pulse" />
             </div>
             <div>
               <div className="text-2xl font-bold font-mono">14,239</div>
               <div className="text-[10px] text-muted-foreground uppercase tracking-widest">Jobs / min</div>
             </div>
          </div>
          <div className="glass-panel p-4 rounded-2xl flex items-center gap-4">
             <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
               <GaugeCircle className="w-5 h-5" />
             </div>
             <div>
               <div className="text-2xl font-bold font-mono">3.2<span className="text-sm text-muted-foreground font-normal">M</span></div>
               <div className="text-[10px] text-muted-foreground uppercase tracking-widest">Tokens / sec</div>
             </div>
          </div>
          <div className="glass-panel p-4 rounded-2xl flex items-center gap-4">
             <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400">
               <Cpu className="w-5 h-5" />
             </div>
             <div>
               <div className="text-2xl font-bold font-mono">24<span className="text-sm text-muted-foreground font-normal">ms</span></div>
               <div className="text-[10px] text-muted-foreground uppercase tracking-widest">Avg Latency</div>
             </div>
          </div>
          <div className="glass-panel p-4 rounded-2xl flex items-center gap-4">
             <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
               <Wifi className="w-5 h-5" />
             </div>
             <div>
               <div className="text-2xl font-bold font-mono">99.9<span className="text-sm text-muted-foreground font-normal">%</span></div>
               <div className="text-[10px] text-muted-foreground uppercase tracking-widest">Uptime</div>
             </div>
          </div>
      </div>

      <div className="glass-panel rounded-3xl flex-1 flex flex-col overflow-hidden relative">
         <div className="absolute top-0 left-0 right-0 p-4 border-b border-white/5 bg-background/50 backdrop-blur-xl z-20 flex justify-between items-center">
             <h2 className="font-semibold flex items-center gap-2"><Code2 className="w-4 h-4" /> Live Telemetry Stream</h2>
             <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <CircleDot className="w-3 h-3 animate-pulse" /> CONNECTED
             </div>
         </div>
         
         <div className="flex-1 overflow-y-auto p-4 pt-20 custom-scrollbar font-mono text-xs space-y-1">
             <AnimatePresence>
                {logs.map((log) => (
                   <motion.div 
                     initial={{ opacity: 0, x: -10 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0 }}
                     key={log.id}
                     className="flex items-start gap-4 p-2 rounded hover:bg-white/5 transition-colors"
                   >
                      <div className="w-24 text-muted-foreground shrink-0 mt-0.5 opacity-50">
                          {log.time.split('T')[1].substring(0, 12)}
                      </div>
                      <div className={`w-20 uppercase tracking-widest font-bold shrink-0 mt-0.5 ${
                        log.type === 'error' ? 'text-destructive' :
                        log.type === 'warning' ? 'text-yellow-400' :
                        log.type === 'success' ? 'text-emerald-400' : 'text-blue-400'
                      }`}>
                         [{log.type}]
                      </div>
                      <div className="w-24 text-primary shrink-0 mt-0.5">
                         {log.service}
                      </div>
                      <div className="flex-1 break-words">
                         {log.msg}
                      </div>
                   </motion.div>
                ))}
             </AnimatePresence>
         </div>
      </div>

    </div>
  );
}
