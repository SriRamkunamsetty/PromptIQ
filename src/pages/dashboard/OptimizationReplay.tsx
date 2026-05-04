import { useState, useEffect } from 'react';
import { Film, Play, Pause, SkipBack, SkipForward, Cpu, Bot, Minimize2, CheckCircle2, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const REPLAY_STAGES = [
  { id: 1, title: 'Prompt Ingestion', desc: 'Parsing raw input tokens from source dimensions' },
  { id: 2, title: 'Semantic Vectorization', desc: 'Calculating frequency, weight, and topological cluster' },
  { id: 3, title: 'Particle Token Destruction', desc: 'Shattering redundant and zero-weight syntax' },
  { id: 4, title: 'Context Distillation', desc: 'Condensing remaining vectors into dense matrices' },
  { id: 5, title: 'Semantic Regrouping', desc: 'Fusing optimal concepts into highly retained pathways' },
  { id: 6, title: 'Final Assembly', desc: 'Constructing execution-ready ultra-dense prompt' },
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
      }, 2500); // 2.5 sec per stage for dramatic effect
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

      <div className="glass-panel p-8 rounded-3xl flex-1 flex flex-col items-center justify-center relative overflow-hidden bg-[url('/grid.svg')] bg-center bg-[size:3rem_3rem]">
         {/* Deep Infrastructure Glow */}
         <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent z-0" />
         <div className="absolute inset-0 z-0 opacity-30 pointer-events-none transition-colors duration-1000 mix-blend-screen" style={{
           backgroundColor: currentStage === 2 ? 'rgba(239, 68, 68, 0.15)' : currentStage > 3 ? 'rgba(52, 211, 153, 0.15)' : 'rgba(14, 165, 233, 0.1)'
         }} />

         <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col h-full">
            <div className="flex-1 flex items-center justify-center min-h-[300px]">
                 <AnimatePresence mode="wait">
                    <motion.div
                       key={currentStage}
                       initial={{ opacity: 0, scale: 0.85, filter: 'blur(10px)' }}
                       animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                       exit={{ opacity: 0, scale: 1.15, filter: 'blur(5px)' }}
                       transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                       className="flex flex-col items-center text-center space-y-8 w-full"
                    >
                       <div className="w-full relative h-[160px] flex items-center justify-center perspective-[1000px]">
                          {/* Animated Cinematic Visualizer */}
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none perspective-1000">
                             
                             {/* Source tokens falling in */}
                             {currentStage === 0 && (
                               <div className="flex gap-2 flex-wrap max-w-sm justify-center transform-gpu -rotate-x-12">
                                  {Array.from({length: 45}).map((_, i) => (
                                    <motion.div 
                                      key={`s0-${i}`} 
                                      initial={{ opacity: 0, z: -500, y: -100 }} 
                                      animate={{ opacity: 0.8, z: 0, y: 0 }} 
                                      transition={{ delay: i*0.02, type: 'spring', damping: 20 }} 
                                      className="w-6 h-3 rounded-[2px] bg-sky-400/20 shadow-[0_0_10px_rgba(56,189,248,0.5)] border border-sky-400/50" 
                                    />
                                  ))}
                               </div>
                             )}

                             {/* Highlighting topological clusters */}
                             {currentStage === 1 && (
                               <div className="flex gap-2 flex-wrap max-w-sm justify-center">
                                  {Array.from({length: 45}).map((_, i) => {
                                      const isRedundant = i % 4 === 0 || i % 7 === 0;
                                      const isAction = i % 5 === 0;
                                      return (
                                        <motion.div 
                                          key={`s1-${i}`} 
                                          initial={{ scale: 1, opacity: 0.8, backgroundColor: 'rgba(56,189,248,0.2)', borderColor: 'rgba(56,189,248,0.5)' }}
                                          animate={{ 
                                            scale: isRedundant ? 0.9 : isAction ? 1.2 : 1, 
                                            opacity: 1,
                                            backgroundColor: isRedundant ? 'rgba(239, 68, 68, 0.4)' : isAction ? 'rgba(250, 204, 21, 0.4)' : 'rgba(56,189,248,0.2)',
                                            borderColor: isRedundant ? 'rgba(239, 68, 68, 0.8)' : isAction ? 'rgba(250, 204, 21, 0.8)' : 'rgba(56,189,248,0.5)'
                                          }} 
                                          transition={{ duration: 0.6, delay: i*0.01 }}
                                          className="w-6 h-3 rounded-[2px] border" 
                                        />
                                      );
                                  })}
                               </div>
                             )}

                             {/* Particle Destruction */}
                             {currentStage === 2 && (
                               <div className="flex gap-2 flex-wrap max-w-sm justify-center relative">
                                  {Array.from({length: 45}).map((_, i) => {
                                     const isRedundant = i % 4 === 0 || i % 7 === 0;
                                     const isAction = i % 5 === 0;
                                     return isRedundant ? (
                                        <motion.div 
                                          key={`s2-shatter-${i}`}
                                          initial={{ scale: 0.9, opacity: 1, rotate: 0 }}
                                          animate={{ scale: 0, opacity: 0, rotate: (Math.random() - 0.5) * 360, x: (Math.random() - 0.5) * 100, y: (Math.random() - 0.5) * 100 }}
                                          transition={{ duration: 1, ease: "circOut" }}
                                          className="w-6 h-3 rounded-[2px] bg-red-500/80 shadow-[0_0_20px_rgba(239,68,68,1)] border border-red-400 absolute"
                                          style={{ zIndex: 50 }}
                                        />
                                     ) : (
                                        <motion.div 
                                          key={`s2-keep-${i}`} 
                                          animate={{ opacity: 0.7 }} 
                                          className={`w-6 h-3 rounded-[2px] border ${isAction ? 'bg-yellow-400/40 border-yellow-400/80' : 'bg-sky-400/20 border-sky-400/50'}`} 
                                        />
                                     );
                                  })}
                               </div>
                             )}

                             {/* Matrix Distillation */}
                             {currentStage === 3 && (
                               <div className="flex gap-1.5 flex-wrap max-w-[280px] justify-center items-center">
                                  {Array.from({length: 25}).map((_, i) => (
                                    <motion.div 
                                      key={`s3-${i}`} 
                                      initial={{ scale: 1, filter: 'contrast(100%)' }}
                                      animate={{ scale: [1, 0.8, 1], filter: 'contrast(200%) brightness(150%)', opacity: 0.9 }} 
                                      transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', delay: i * 0.05 }}
                                      className="w-5 h-2.5 rounded-[1px] bg-fuchsia-500/40 border border-fuchsia-400/60 shadow-[0_0_8px_rgba(217,70,239,0.5)]" 
                                    />
                                  ))}
                               </div>
                             )}

                             {/* Semantic Regrouping Fusion */}
                             {currentStage === 4 && (
                               <div className="flex gap-1 flex-wrap max-w-[150px] justify-center relative">
                                  {Array.from({length: 12}).map((_, i) => (
                                    <motion.div 
                                      key={`s4-${i}`} 
                                      initial={{ scale: 0.1, x: (Math.random() - 0.5) * 200, y: (Math.random() - 0.5) * 200, opacity: 0 }} 
                                      animate={{ scale: 1.2, x: 0, y: 0, opacity: 1 }} 
                                      transition={{ type: 'spring', stiffness: 50, damping: 10, delay: i * 0.1 }} 
                                      className="w-8 h-4 rounded-[3px] bg-emerald-400/50 shadow-[0_0_15px_rgba(52,211,153,0.8)] border border-emerald-400" 
                                    />
                                  ))}
                                  <motion.div className="absolute inset-0 bg-emerald-400/20 mix-blend-screen blur-xl rounded-full" animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 2, repeat: Infinity }} />
                               </div>
                             )}

                             {/* Final Output Sparkle */}
                             {currentStage === 5 && (
                               <div className="flex gap-2 flex-wrap max-w-[180px] justify-center">
                                  {Array.from({length: 8}).map((_, i) => (
                                    <motion.div 
                                      key={`s5-${i}`} 
                                      initial={{ scale: 1.2, opacity: 0.5, backgroundColor: 'rgba(52,211,153,0.5)' }}
                                      animate={{ scale: 1, opacity: 1, backgroundColor: 'rgba(16,185,129,0.8)', boxShadow: '0 0 25px rgba(16,185,129,0.9)' }}
                                      transition={{ duration: 0.5, delay: i * 0.05 }}
                                      className="w-10 h-5 rounded-[4px] border border-emerald-300 relative overflow-hidden" 
                                    >
                                       <motion.div className="absolute inset-y-0 -left-full w-full bg-gradient-to-r from-transparent via-white/80 to-transparent skew-x-[-20deg]" animate={{ left: ['-100%', '200%'] }} transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2, delay: i * 0.2 }} />
                                    </motion.div>
                                  ))}
                               </div>
                             )}
                          </div>
                          
                          <div className="w-28 h-28 rounded-[2rem] bg-black/40 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-[0_0_60px_rgba(0,0,0,0.8),inset_0_0_20px_rgba(255,255,255,0.1)] z-10 relative overflow-hidden group">
                             <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50" />
                             {currentStage === 0 && <Cpu className="w-12 h-12 text-sky-400 drop-shadow-[0_0_10px_rgba(56,189,248,0.8)]" />}
                             {currentStage === 1 && <Bot className="w-12 h-12 text-blue-400 drop-shadow-[0_0_10px_rgba(96,165,250,0.8)]" />}
                             {currentStage === 2 && <Zap className="w-12 h-12 text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,1)] animate-pulse" />}
                             {currentStage === 3 && <Minimize2 className="w-12 h-12 text-fuchsia-400 drop-shadow-[0_0_10px_rgba(232,121,249,0.8)]" />}
                             {currentStage === 4 && <Bot className="w-12 h-12 text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.8)]" />}
                             {currentStage === 5 && <CheckCircle2 className="w-12 h-12 text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,1)]" />}
                          </div>
                       </div>
                       
                       <div>
                          <p className="text-xs font-mono text-primary mb-3 uppercase tracking-[0.3em]">Phase 0{currentStage + 1}</p>
                          <h2 className="text-4xl lg:text-5xl font-black text-white drop-shadow-md tracking-tight mb-4">{REPLAY_STAGES[currentStage]?.title}</h2>
                          <p className="text-lg text-muted-foreground max-w-md mx-auto">{REPLAY_STAGES[currentStage]?.desc}</p>
                       </div>
                    </motion.div>
                 </AnimatePresence>
            </div>

            {/* Playback Controls & Timeline */}
            <div className="mt-8 bg-black/40 backdrop-blur-2xl p-6 rounded-3xl border border-white/5 relative z-20">
               <div className="flex items-center justify-between gap-2 mb-8 px-2">
                  {REPLAY_STAGES.map((stage, i) => (
                    <div key={stage.id} className="flex-1 flex flex-col gap-3 group cursor-pointer relative" onClick={() => setCurrentStage(i)}>
                       <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-white/10 -z-10" />
                       <div className={`h-2 rounded-full transition-all duration-700 w-full relative z-10 ${
                         i < currentStage ? 'bg-primary' : 
                         i === currentStage ? 'bg-primary shadow-[0_0_20px_rgba(56,189,248,0.8)]' : 
                         'bg-white/10'
                       }`} />
                    </div>
                  ))}
               </div>

               <div className="flex justify-center flex-col items-center gap-2">
                 <div className="flex justify-center items-center gap-6">
                    <Button variant="ghost" size="icon" onClick={() => setCurrentStage(Math.max(0, currentStage - 1))} className="hover:bg-white/10 hover:text-white rounded-full">
                       <SkipBack className="w-5 h-5" />
                    </Button>
                    <Button 
                       size="lg"
                       onClick={handlePlay}
                       className="w-16 h-16 rounded-full bg-primary/10 text-primary border border-primary/40 hover:bg-primary/20 shadow-[0_0_20px_rgba(56,189,248,0.15)] hover:shadow-[0_0_30px_rgba(56,189,248,0.3)] transition-all"
                    >
                       {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1.5" />}
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => setCurrentStage(Math.min(REPLAY_STAGES.length - 1, currentStage + 1))} className="hover:bg-white/10 hover:text-white rounded-full">
                       <SkipForward className="w-5 h-5" />
                    </Button>
                 </div>
                 <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mt-4">
                     Playback Controls
                 </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
