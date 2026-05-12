import { useState } from 'react';
import { DatabaseZap, Network, CornerDownRight, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SemanticCache() {
  const [hits, setHits] = useState(14502);
  const [saved, setSaved] = useState(3.42);

  return (
    <div className="space-y-6 flex flex-col h-full overflow-y-auto pb-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Semantic Cache Engine</h1>
        <p className="text-muted-foreground">Vector-based retrieval preventing duplicate LLM executions for conceptually identical queries.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 shrink-0">
          <div className="glass-panel p-6 rounded-3xl flex flex-col items-center justify-center relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <DatabaseZap className="w-16 h-16 text-emerald-400" />
             </div>
             <h3 className="text-sm font-medium text-muted-foreground mb-2 z-10 w-full text-left">Cache Hit Rate</h3>
             <div className="text-5xl font-black text-emerald-400 z-10 w-full text-left">84.2<span className="text-2xl font-normal text-muted-foreground">%</span></div>
             <p className="text-xs text-muted-foreground mt-2 z-10 w-full text-left">Last 30 days active requests</p>
          </div>
          
          <div className="glass-panel p-6 rounded-3xl flex flex-col items-center justify-center relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Zap className="w-16 h-16 text-yellow-400" />
             </div>
             <h3 className="text-sm font-medium text-muted-foreground mb-2 z-10 w-full text-left">Latency Avoided</h3>
             <div className="text-5xl font-black text-yellow-500 z-10 w-full text-left">42<span className="text-2xl font-normal text-muted-foreground">h</span></div>
             <p className="text-xs text-muted-foreground mt-2 z-10 w-full text-left">Cumulative execution time saved</p>
          </div>

          <div className="glass-panel p-6 rounded-3xl flex flex-col items-center justify-center relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Network className="w-16 h-16 text-primary" />
             </div>
             <h3 className="text-sm font-medium text-muted-foreground mb-2 z-10 w-full text-left">Est API Savings</h3>
             <div className="text-5xl font-black text-primary z-10 w-full text-left"><span className="text-2xl text-muted-foreground font-normal">$</span>{saved}k</div>
             <p className="text-xs text-muted-foreground mt-2 z-10 w-full text-left">Calculated from skipped API calls</p>
          </div>
      </div>

      <div className="glass-panel p-6 rounded-3xl flex-1 flex flex-col bg-grid-pattern min-h-dashboard-sm">
         <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <Network className="w-5 h-5 text-primary" /> Semantic Hit Feed
         </h2>
         <div className="flex-1 overflow-y-auto pr-4 space-y-4 custom-scrollbar">
            {/* Fake Activity Feed */}
            {[
              { id: 1, text: "Summarize Q3 earnings report...", match: "Can you give me a summary of Q3 financials?", conf: "0.98" },
              { id: 2, text: "Write python script to parse xml...", match: "Python code to read xml file", conf: "0.94" },
              { id: 3, text: "Explain backpropagation simply", match: "How does backprop work for beginners", conf: "0.91" },
              { id: 4, text: "React useEffect dependency loop fix", match: "Fix infinite effect loop in React", conf: "0.96" },
              { id: 5, text: "Translate english to french: Hello", match: "French for Hello", conf: "0.99" },
            ].map((item, i) => (
               <motion.div 
                 initial={{ opacity: 0, x: -10 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: i * 0.1 }}
                 key={item.id} 
                 className="p-4 rounded-xl bg-background/60 border border-white/5 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between"
               >
                  <div className="flex-1">
                     <p className="text-sm text-muted-foreground line-clamp-1 border-b border-white/5 pb-2 mb-2">"{item.match}" <span className="text-xs opacity-50 ml-2">(Cached Origin)</span></p>
                     <div className="flex items-center gap-2">
                        <CornerDownRight className="w-4 h-4 text-emerald-400" />
                        <p className="font-mono text-sm line-clamp-1">"{item.text}"</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-4 shrink-0 mt-4 md:mt-0">
                     <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs">
                        Cache Hit
                     </div>
                     <div className="text-right">
                        <div className="text-lg font-bold text-gradient">{item.conf}</div>
                        <div className="text-[10px] text-muted-foreground uppercase tracking-widest">Similarity</div>
                     </div>
                  </div>
               </motion.div>
            ))}
         </div>
      </div>
    </div>
  );
}
