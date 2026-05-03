import { useState, useEffect } from 'react';
import { Film, Play, Pause, SkipBack, SkipForward, Cpu, Bot, Minimize2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const REPLAY_STAGES = [
  { id: 1, title: 'Prompt Ingestion', desc: 'Parsing raw input tokens' },
  { id: 2, title: 'Token Analysis', desc: 'Calculating frequency and weight' },
  { id: 3, title: 'Redundancy Detection', desc: 'Identifying duplicate instructions' },
  { id: 4, title: 'Context Pruning', desc: 'Removing zero-weight context' },
  { id: 5, title: 'Semantic Compression', desc: 'Rewriting with high-density tokens' },
  { id: 6, title: 'Final Assembly', desc: 'Constructing execution-ready prompt' },
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
      }, 2000); // 2 sec per stage for dramatic effect
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
    <div className="space-y-6 flex flex-col h-full overflow-y-auto pb-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Optimization Replay Engine</h1>
        <p className="text-muted-foreground">Cinematic playback of the token elimination and semantic regrouping pipeline.</p>
      </div>

      <div className="glass-panel p-8 rounded-3xl flex-1 flex flex-col items-center justify-center relative overflow-hidden bg-[url('/grid.svg')] bg-center">
         {/* Background Glow based on stage */}
         <div className="absolute inset-0 z-0 opacity-20 pointer-events-none transition-colors duration-1000" style={{
           backgroundColor: currentStage > 3 ? 'rgba(52, 211, 153, 0.2)' : 'rgba(45, 212, 191, 0.1)'
         }} />

         <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col h-full">
            <div className="flex-1 flex items-center justify-center">
                 <AnimatePresence mode="wait">
                    <motion.div
                       key={currentStage}
                       initial={{ opacity: 0, scale: 0.8, y: 20 }}
                       animate={{ opacity: 1, scale: 1, y: 0 }}
                       exit={{ opacity: 0, scale: 1.1, y: -20 }}
                       transition={{ duration: 0.5 }}
                       className="flex flex-col items-center text-center space-y-6 w-full"
                    >
                       <div className="w-full relative h-[120px] flex items-center justify-center">
                          {/* Animated Token Visualizer */}
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                             {currentStage === 0 && (
                               <div className="flex gap-2 flex-wrap max-w-sm justify-center">
                                  {Array.from({length: 20}).map((_, i) => (
                                    <motion.div key={i} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i*0.05 }} className="w-8 h-4 rounded bg-primary/20 border border-primary/40" />
                                  ))}
                               </div>
                             )}
                             {currentStage === 1 && (
                               <div className="flex gap-2 flex-wrap max-w-sm justify-center">
                                  {Array.from({length: 20}).map((_, i) => (
                                    <motion.div key={i} animate={{ backgroundColor: i % 3 === 0 ? 'rgba(239, 68, 68, 0.4)' : i % 5 === 0 ? 'rgba(234, 179, 8, 0.4)' : 'rgba(45, 212, 191, 0.4)' }} className="w-8 h-4 rounded border border-white/20" />
                                  ))}
                               </div>
                             )}
                             {currentStage === 2 && (
                               <div className="flex gap-2 flex-wrap max-w-sm justify-center">
                                  {Array.from({length: 20}).map((_, i) => (
                                    <motion.div key={i} animate={{ opacity: i % 3 === 0 ? 0 : 1, y: i % 3 === 0 ? 50 : 0, scale: i % 3 === 0 ? 0 : 1 }} transition={{ duration: 0.5, delay: i*0.05 }} className="w-8 h-4 rounded bg-primary/20 border border-white/20" />
                                  ))}
                               </div>
                             )}
                             {currentStage === 3 && (
                               <div className="flex gap-2 flex-wrap max-w-sm justify-center">
                                  {Array.from({length: 12}).map((_, i) => (
                                    <motion.div key={i} animate={{ opacity: 0.5 }} className="w-8 h-4 rounded bg-orange-400/20 border border-orange-400/40" />
                                  ))}
                               </div>
                             )}
                             {currentStage === 4 && (
                               <div className="flex gap-1 flex-wrap max-w-[200px] justify-center">
                                  {Array.from({length: 8}).map((_, i) => (
                                    <motion.div key={i} initial={{ scale: 2, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring' }} className="w-10 h-6 rounded bg-yellow-400/30 border border-yellow-400/60" />
                                  ))}
                               </div>
                             )}
                             {currentStage === 5 && (
                               <div className="flex gap-1 flex-wrap max-w-[150px] justify-center">
                                  {Array.from({length: 6}).map((_, i) => (
                                    <motion.div key={i} animate={{ boxShadow: '0 0 15px rgba(52, 211, 153, 0.6)' }} className="w-12 h-6 rounded bg-emerald-400/30 border border-emerald-400" />
                                  ))}
                               </div>
                             )}
                          </div>
                          
                          <div className="w-24 h-24 rounded-3xl bg-card/80 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.05)] text-primary z-10 relative">
                             {currentStage === 0 && <Cpu className="w-12 h-12" />}
                             {currentStage === 1 && <Bot className="w-12 h-12 text-blue-400" />}
                             {currentStage === 2 && <Film className="w-12 h-12 text-purple-400" />}
                             {currentStage === 3 && <Minimize2 className="w-12 h-12 text-orange-400" />}
                             {currentStage === 4 && <Bot className="w-12 h-12 text-yellow-400" />}
                             {currentStage === 5 && <CheckCircle2 className="w-12 h-12 text-emerald-400" />}
                          </div>
                       </div>
                       
                       <div>
                          <p className="text-sm font-mono text-primary mb-2 uppercase tracking-widest">Phase 0{currentStage + 1}</p>
                          <h2 className="text-4xl font-black text-gradient">{REPLAY_STAGES[currentStage]?.title}</h2>
                          <p className="text-xl text-muted-foreground mt-4 max-w-md mx-auto">{REPLAY_STAGES[currentStage]?.desc}</p>
                       </div>
                    </motion.div>
                 </AnimatePresence>
            </div>

            {/* Playback Controls & Timeline */}
            <div className="mt-12 bg-background/60 backdrop-blur-xl p-6 rounded-2xl border border-white/10">
               <div className="flex items-center gap-4 mb-8">
                  {REPLAY_STAGES.map((stage, i) => (
                    <div key={stage.id} className="flex-1 flex flex-col gap-2 group cursor-pointer" onClick={() => setCurrentStage(i)}>
                       <div className={`h-2 rounded-full transition-all duration-500 ${
                         i < currentStage ? 'bg-primary' : 
                         i === currentStage ? 'bg-primary shadow-[0_0_15px_rgba(45,212,191,0.5)]' : 
                         'bg-white/10'
                       }`} />
                       <span className={`text-[10px] uppercase tracking-wider font-semibold transition-colors ${
                         i <= currentStage ? 'text-primary' : 'text-muted-foreground opacity-50'
                       }`}>{stage.title}</span>
                    </div>
                  ))}
               </div>

               <div className="flex justify-center items-center gap-6">
                  <Button variant="ghost" size="icon" onClick={() => setCurrentStage(Math.max(0, currentStage - 1))}>
                     <SkipBack className="w-5 h-5" />
                  </Button>
                  <Button 
                     size="lg"
                     onClick={handlePlay}
                     className="w-16 h-16 rounded-full bg-primary/20 text-primary border border-primary/50 hover:bg-primary/30"
                  >
                     {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setCurrentStage(Math.min(REPLAY_STAGES.length - 1, currentStage + 1))}>
                     <SkipForward className="w-5 h-5" />
                  </Button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
