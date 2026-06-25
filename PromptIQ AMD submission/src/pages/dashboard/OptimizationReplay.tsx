import { useState, useEffect } from 'react';
import { Film, Play, Pause, SkipBack, SkipForward, Cpu, Bot, Minimize2, CheckCircle2, Zap, BrainCircuit, Sparkles, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const REPLAY_STAGES = [
  { id: 1, title: 'Neural Ingestion', desc: 'Parsing raw input tokens from source dimensions', icon: BrainCircuit, color: 'text-sky-400' },
  { id: 2, title: 'Topological Analysis', desc: 'Calculating frequency, weight, and topological cluster', icon: Activity, color: 'text-blue-400' },
  { id: 3, title: 'Particle Destruction', desc: 'Shattering redundant and zero-weight syntax', icon: Zap, color: 'text-red-500' },
  { id: 4, title: 'Context Distillation', desc: 'Condensing remaining vectors into dense matrices', icon: Minimize2, color: 'text-fuchsia-400' },
  { id: 5, title: 'Semantic Regrouping', desc: 'Fusing optimal concepts into highly retained pathways', icon: Sparkles, color: 'text-emerald-400' },
  { id: 6, title: 'Final Assembly', desc: 'Constructing execution-ready ultra-dense prompt', icon: CheckCircle2, color: 'text-emerald-500' },
];

export default function OptimizationReplay() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    let interval: any;
    if (isPlaying && currentStage < REPLAY_STAGES.length) {
      interval = setInterval(() => {
        setCurrentStage(prev => {
           if (prev >= REPLAY_STAGES.length - 1) {
             setIsPlaying(false);
             return prev;
           }
           return prev + 1;
        });
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentStage]);

  const handlePlay = () => {
    if (currentStage >= REPLAY_STAGES.length - 1) {
      setCurrentStage(0);
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex flex-col h-full space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-white uppercase mb-2">Neural Optimization <span className="text-primary">Runtime</span></h1>
          <p className="text-muted-foreground/80 font-medium tracking-wide">Cinematic visualization of the semantic pruning & context distillation pipeline.</p>
        </div>
        <div className="flex gap-4">
           <div className="glass-panel px-6 py-2 rounded-2xl flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,1)]" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white/60">System Online</span>
           </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
        {/* Cinematic Replay Viewport */}
        <div className="flex-1 glass-panel rounded-[2.5rem] relative overflow-hidden flex flex-col group/viewport">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 pointer-events-none" />
          
          {/* Dynamic Background Glows */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none transition-colors duration-1000"
              style={{
                background: currentStage === 2 
                  ? 'radial-gradient(circle at center, oklch(0.65 0.22 25 / 0.1) 0%, transparent 70%)'
                  : currentStage >= 4 
                  ? 'radial-gradient(circle at center, oklch(0.7 0.15 160 / 0.1) 0%, transparent 70%)'
                  : 'radial-gradient(circle at center, oklch(0.78 0.15 255 / 0.1) 0%, transparent 70%)'
              }}
            />
          </AnimatePresence>

          <div className="flex-1 flex items-center justify-center relative p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStage}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.1, y: -20 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full flex flex-col items-center"
              >
                <div className="relative mb-12">
                  <div className="w-32 h-32 rounded-huge glass-panel bg-white/5 flex items-center justify-center border-white/10 relative z-20 group shadow-2xl">
                    <div className="absolute inset-0 bg-primary/10 blur-2xl group-hover:bg-primary/20 transition-all opacity-50" />
                    {(() => {
                      const StageIcon = REPLAY_STAGES[currentStage].icon;
                      return <StageIcon className={cn("w-14 h-14 transition-all duration-700", REPLAY_STAGES[currentStage].color)} />;
                    })()}
                  </div>
                  
                  {/* Floating Particle Flow */}
                  <div className="absolute inset-[-100px] flex items-center justify-center pointer-events-none z-10">
                    {currentStage === 0 && (
                      <div className="flex gap-2 flex-wrap max-w-sm justify-center">
                        {Array.from({length: 40}).map((_, i) => (
                          <motion.div 
                            key={i} 
                            initial={{ opacity: 0, scale: 0, y: -100 }}
                            animate={{ opacity: 0.6, scale: 1, y: 0 }}
                            transition={{ delay: i * 0.01, duration: 1 }}
                            className="w-4 h-2 rounded-full bg-primary/30 border border-primary/50"
                          />
                        ))}
                      </div>
                    )}
                    {currentStage === 2 && (
                      <div className="relative w-full h-full">
                         {Array.from({length: 30}).map((_, i) => (
                           <motion.div
                             key={i}
                             initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                             animate={{ 
                               x: (Math.random() - 0.5) * 400, 
                               y: (Math.random() - 0.5) * 400, 
                               opacity: 0, 
                               scale: 0,
                               rotate: (Math.random() - 0.5) * 720
                             }}
                             transition={{ duration: 1.5, ease: "easeOut" }}
                             className="absolute left-1/2 top-1/2 w-4 h-4 bg-red-500/80 rounded-sm shadow-lg"
                           />
                         ))}
                      </div>
                    )}
                    {currentStage === 4 && (
                      <div className="relative w-full h-full flex items-center justify-center">
                        <motion.div 
                          animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute w-64 h-64 bg-emerald-500/20 blur-[60px] rounded-full"
                        />
                         {Array.from({length: 20}).map((_, i) => (
                           <motion.div
                             key={i}
                             initial={{ x: (Math.random() - 0.5) * 300, y: (Math.random() - 0.5) * 300, opacity: 0 }}
                             animate={{ x: 0, y: 0, opacity: 1 }}
                             transition={{ duration: 1, delay: i * 0.05 }}
                             className="absolute w-6 h-3 bg-emerald-400/60 rounded-full border border-emerald-300"
                           />
                         ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="max-w-md text-center">
                   <motion.div className="inline-block px-4 py-1 rounded-full border border-primary/20 bg-primary/5 mb-6">
                      <span className="text-[10px] font-black uppercase tracking-ultra text-primary">Execution Phase 0{currentStage + 1}</span>
                   </motion.div>
                   <h2 className="text-5xl font-black text-white tracking-tighter mb-4 uppercase">{REPLAY_STAGES[currentStage].title}</h2>
                   <p className="text-lg text-muted-foreground/80 font-medium leading-relaxed">{REPLAY_STAGES[currentStage].desc}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Timeline & Controls Overlay */}
          <div className="p-8 bg-black/40 backdrop-blur-3xl border-t border-white/5 relative z-30">
            <div className="flex items-center gap-4 mb-8">
               {REPLAY_STAGES.map((stage, i) => (
                 <div 
                   key={i} 
                   className="flex-1 h-1.5 rounded-full relative cursor-pointer group"
                   onClick={() => { setCurrentStage(i); setIsPlaying(false); }}
                 >
                    <div className={cn(
                      "absolute inset-0 rounded-full transition-all duration-700",
                      i <= currentStage ? "bg-primary shadow-primary-glow-sm" : "bg-white/10"
                    )} />
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-[8px] font-black uppercase tracking-extrawide text-primary">
                       {stage.title}
                    </div>
                 </div>
               ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <Button variant="ghost" size="icon" onClick={() => setCurrentStage(Math.max(0, currentStage - 1))} className="w-12 h-12 rounded-full border border-white/5 hover:bg-white/5">
                  <SkipBack className="w-5 h-5 text-white" />
                </Button>
                <Button 
                  onClick={handlePlay}
                  className="w-16 h-16 rounded-full bg-primary text-primary-foreground shadow-primary-glow hover:scale-105 transition-all"
                >
                  {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setCurrentStage(Math.min(REPLAY_STAGES.length - 1, currentStage + 1))} className="w-12 h-12 rounded-full border border-white/5 hover:bg-white/5">
                  <SkipForward className="w-5 h-5 text-white" />
                </Button>
              </div>

              <div className="flex items-center gap-8">
                 <div className="flex flex-col items-end">
                    <span className="text-[10px] uppercase tracking-extrawide text-muted-foreground font-black mb-1">Inference Speed</span>
                    <span className="text-xl font-bold text-white tracking-tighter">0.4x Optimized</span>
                 </div>
                 <div className="flex flex-col items-end">
                    <span className="text-[10px] uppercase tracking-extrawide text-muted-foreground font-black mb-1">Redundancy Δ</span>
                    <span className="text-xl font-bold text-red-400 tracking-tighter">-64.2%</span>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* Neural Logic Feed */}
        <div className="w-full lg:w-96 flex flex-col gap-6">
           <div className="glass-panel p-8 rounded-[2.5rem] border-white/5 flex flex-col h-[400px]">
              <div className="flex items-center justify-between mb-6">
                 <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-primary" />
                    <span className="text-[10px] font-black uppercase tracking-extrawide text-white">Live Execution Feed</span>
                 </div>
              </div>
              <div className="flex-1 overflow-y-auto custom-scrollbar font-mono text-[10px] space-y-3">
                 {[
                   `[0.00ms] INITIALIZING NEURAL PIPELINE...`,
                   `[12.4ms] PARSING TOKENS: [ID: 0x9f22, COUNT: 452]`,
                   `[45.8ms] ANALYZING SEMANTIC TOPOLOGY...`,
                   `[102.1ms] CLUSTERING NODES: [DENSITY: 0.84]`,
                   `[230.5ms] IDENTIFYING ZERO-WEIGHT SYNTAX...`,
                   `[245.2ms] SHATTERING REDUNDANT FRAGMENTS...`,
                   `[412.9ms] CONDENSING CONTEXTUAL MATRICES...`,
                   `[560.1ms] FUSING OPTIMAL PATHWAYS...`,
                   `[780.4ms] VALIDATING SEMANTIC FIDELITY...`,
                   `[890.2ms] FINAL ASSEMBLY COMPLETE.`
                 ].slice(0, (currentStage + 1) * 2).map((log, i) => (
                   <motion.div 
                     initial={{ opacity: 0, x: -10 }} 
                     animate={{ opacity: 1, x: 0 }} 
                     key={i} 
                     className={cn(i === (currentStage + 1) * 2 - 1 ? "text-primary" : "text-muted-foreground/60")}
                   >
                     {log}
                   </motion.div>
                 ))}
              </div>
           </div>

           <div className="glass-panel p-8 rounded-[2.5rem] border-white/5 flex-1 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
              <Bot className="w-8 h-8 text-primary mb-6" />
              <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-4">Optimization Strategy</h3>
              <p className="text-sm text-muted-foreground/80 leading-relaxed font-medium">
                The current pipeline is utilizing **Recursive Semantic Pruning** to minimize token overhead by {REPLAY_STAGES[currentStage]?.id * 10}% without losing high-dimensional intent.
              </p>
              <div className="mt-8 flex flex-col gap-2">
                 <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-extrawide text-muted-foreground">
                    <span>Precision</span>
                    <span className="text-white">99.2%</span>
                 </div>
                 <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div animate={{ width: '99.2%' }} className="h-full bg-primary" />
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
