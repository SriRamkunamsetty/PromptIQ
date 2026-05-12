import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, BrainCircuit, Activity, Zap, Shield, Sparkles, 
  Loader2, Cpu, Network, Globe, BarChart3, Database, 
  ShieldAlert, RefreshCcw, Layers, Search
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { auth } from '@/lib/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useAuthStore } from '@/lib/store';
import { useEffect, useState, useRef } from 'react';
import { toast } from 'sonner';

// --- Sub-components ---

function TokenWasteBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      {Array.from({ length: 20 }).map((_, i) => (
        <div 
          key={i} 
          className="token-waste-stream" 
          style={{ 
            left: `${Math.random() * 100}%`, 
            animationDelay: `${Math.random() * 5}s`,
            opacity: Math.random() * 0.5
          }} 
        />
      ))}
    </div>
  );
}

function FloatingMetric({ icon: Icon, label, value, delay = 0 }: { icon: any, label: string, value: string, delay?: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay }}
      className="glass-panel p-6 rounded-2xl flex flex-col items-center text-center backdrop-blur-3xl border-white/10 group"
    >
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <div className="text-2xl font-black text-white mb-1">{value}</div>
      <div className="text-[10px] uppercase tracking-extrawide text-muted-foreground font-bold">{label}</div>
    </motion.div>
  );
}

// --- Main Page ---

export default function LandingPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [booting, setBooting] = useState(true);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
    const timer = setTimeout(() => setBooting(false), 2000);
    return () => clearTimeout(timer);
  }, [user, navigate]);

  const handleSignIn = async () => {
    if (isSigningIn) return;
    setIsSigningIn(true);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    try {
      await signInWithPopup(auth, provider);
      navigate('/dashboard');
    } catch (error: any) {
      console.error("Sign in failed", error);
      toast.error(`Sign in failed: ${error.message}`);
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <div ref={containerRef} className="bg-black text-foreground selection:bg-primary/30 relative">
      <AnimatePresence>
        {booting && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
          >
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1 }}
                className="relative"
              >
                <BrainCircuit className="w-16 h-16 text-primary animate-pulse" />
                <div className="absolute inset-0 bg-primary/20 blur-2xl animate-pulse rounded-full" />
              </motion.div>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: 200 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="h-[1px] bg-primary/50 mt-8 mb-4 overflow-hidden"
              >
                <motion.div 
                  animate={{ x: [-200, 200] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-20 h-full bg-primary shadow-primary-glow-intense"
                />
              </motion.div>
              <p className="text-[10px] uppercase tracking-ultra text-primary/60 font-mono">Initializing Neural Runtime</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cinematic Overlays */}
      <div className="infrastructure-overlay" />
      <div className="scanline-effect opacity-10" />

      {/* --- ACT 0: THE HERO --- */}
      <section className="relative min-h-screen flex flex-col items-center overflow-hidden">
        <motion.div style={{ scale, opacity, y }} className="w-full flex flex-col items-center pt-32 pb-40 relative z-10">
          <nav className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between absolute top-0 left-0 right-0">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center border-primary/20 group-hover:border-primary/50 transition-colors">
                <BrainCircuit className="w-6 h-6 text-primary" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-white uppercase">Prompt<span className="text-primary">IQ</span></span>
            </motion.div>
            <div className="hidden md:flex items-center gap-10 text-[10px] uppercase tracking-wide-extra font-black text-muted-foreground/60">
              <a href="#problem" className="hover:text-primary transition-colors">Intelligence Gap</a>
              <a href="#solution" className="hover:text-primary transition-colors">Semantic Runtime</a>
              <a href="#network" className="hover:text-primary transition-colors">Neural Network</a>
            </div>
            <Button onClick={handleSignIn} disabled={isSigningIn} className="glass-panel border-white/10 hover:border-primary/50 rounded-full px-8 h-12 bg-white/5 hover:bg-white/10 text-white transition-all font-black text-[10px] uppercase tracking-widest">
              {isSigningIn ? <Loader2 className="w-4 h-4 animate-spin" /> : <><span className="mr-2">Access System</span> <ArrowRight className="w-4 h-4" /></>}
            </Button>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-center px-6 max-w-6xl"
          >
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/5 bg-white/5 backdrop-blur-2xl mb-12 shadow-lg">
               <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-primary-glow-intense" />
               <span className="text-[10px] font-black uppercase tracking-extrawide text-white/80">Neural Infrastructure Runtime Activated</span>
            </div>
            
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.85] text-white uppercase italic">
              OPTIMIZE <span className="text-primary text-glow">INTELLIGENCE.</span><br/>
              SHATTER <span className="text-primary text-glow">WASTE.</span>
            </h1>
            
            <p className="text-lg md:text-2xl text-muted-foreground/80 mb-14 max-w-3xl mx-auto leading-relaxed font-medium">
              The high-performance semantic optimization layer for the agentic era. 
              Eliminate token redundancy. Preserve neural fidelity.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button disabled={isSigningIn} onClick={handleSignIn} size="lg" className="h-16 px-12 text-md font-black uppercase tracking-widest rounded-2xl bg-primary text-primary-foreground shadow-xl hover:shadow-2xl shadow-primary/40 transition-all hover:scale-[1.02] active:scale-[0.98]">
                Initialize Runtime
              </Button>
              <Button variant="ghost" size="lg" className="h-16 px-10 text-md font-black uppercase tracking-widest rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 text-white backdrop-blur-xl">
                View Architecture
              </Button>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-40 w-full max-w-7xl px-6">
            <FloatingMetric icon={Cpu} label="Avg Compression" value="42.8%" delay={0.6} />
            <FloatingMetric icon={BrainCircuit} label="Semantic Retention" value="98.4%" delay={0.7} />
            <FloatingMetric icon={Activity} label="Latency Savings" value="-120ms" delay={0.8} />
            <FloatingMetric icon={Zap} label="API ROI" value="12.4x" delay={0.9} />
          </div>
        </motion.div>
      </section>

      {/* --- ACT 1: THE PROBLEM --- */}
      <section id="problem" className="relative min-h-screen py-40 bg-black flex flex-col items-center justify-center">
        <TokenWasteBackground />
        <div className="container max-w-7xl px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase leading-none mb-8">
                AI SYSTEMS ARE <br />
                <span className="text-red-500">WASTING BILLIONS</span> <br />
                OF TOKENS.
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-lg">
                Bloated prompts, redundant context, and noisy retrieval are killing your margins. 
                Every extra token is latent heat in your infrastructure.
              </p>
              <div className="space-y-6">
                {[
                  { label: "Token Redundancy", value: "85%", color: "bg-red-500" },
                  { label: "Context Noise", value: "92%", color: "bg-orange-500" },
                  { label: "API Inefficiency", value: "78%", color: "bg-yellow-500" },
                ].map((stat, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-[10px] uppercase tracking-widest font-black text-white/60">
                      <span>{stat.label}</span>
                      <span>{stat.value}</span>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: stat.value }}
                        transition={{ duration: 1.5, delay: i * 0.2 }}
                        className={`h-full ${stat.color} shadow-[0_0_10px_rgba(239,68,68,0.5)]`} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-red-500/10 blur-[120px] animate-neural-pulse" />
              <div className="relative z-10 w-full glass-panel rounded-[3rem] p-12 border-red-500/20">
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-3xl bg-red-500/10 flex items-center justify-center mb-8 border border-red-500/30">
                    <ShieldAlert className="w-10 h-10 text-red-500" />
                  </div>
                  <div className="text-5xl font-black text-white tracking-tighter mb-4 italic uppercase">Context Bloat</div>
                  <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">Unoptimized Input Stream Detected</p>
                  
                  <div className="grid grid-cols-2 gap-4 mt-12 w-full">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                      <div className="text-xs font-black uppercase tracking-widest text-red-400 mb-1">Waste</div>
                      <div className="text-2xl font-black text-white">12.4M</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                      <div className="text-xs font-black uppercase tracking-widest text-red-400 mb-1">Cost Leak</div>
                      <div className="text-2xl font-black text-white">$1,420</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- ACT 2: THE SOLUTION --- */}
      <section id="solution" className="relative min-h-screen py-40 flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 opacity-30 neural-bg animate-neural" />
        <div className="container max-w-7xl px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-32"
          >
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-white uppercase leading-none mb-8 italic">
              THE <span className="text-primary text-glow">INTELLIGENT</span> LAYER.
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              PromptIQ sits between your users and your models, programmatically pruning 
              context while preserving the high-dimensional intent of your prompts.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: Layers, 
                title: "Recursive Pruning", 
                desc: "Our engine recursively identifies and eliminates semantic noise from long-context streams.",
                color: "from-primary/20"
              },
              { 
                icon: RefreshCcw, 
                title: "Realtime Injection", 
                desc: "Inject dynamic context variables at the edge with zero-latency overhead.",
                color: "from-indigo-500/20"
              },
              { 
                icon: Search, 
                title: "Semantic Routing", 
                desc: "Route requests to the most efficient model based on real-time complexity analysis.",
                color: "from-emerald-500/20"
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className={`glass-panel p-10 rounded-[2.5rem] text-left relative overflow-hidden group border-white/10 hover:border-primary/50 transition-all cursor-default bg-gradient-to-br ${feature.color} to-transparent`}
              >
                <feature.icon className="w-10 h-10 text-primary mb-8 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-4 italic">{feature.title}</h3>
                <p className="text-muted-foreground font-medium leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- ACT 3: INFRASTRUCTURE --- */}
      <section id="network" className="relative py-40 bg-black">
        <div className="container max-w-7xl px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase leading-[0.9] italic">
                INFRASTRUCTURE <br />
                <span className="text-primary text-glow">MADE VISIBLE.</span>
              </h2>
            </div>
            <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold max-w-xs md:text-right">
              Total observability into your prompt lifecycle and token economics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             <div className="lg:col-span-2 glass-panel p-10 rounded-[3rem] border-white/5 relative overflow-hidden h-[400px]">
                <div className="relative z-10">
                   <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2 italic">Neural Dashboard</h3>
                   <p className="text-muted-foreground text-sm font-medium">Real-time telemetry for every inference run.</p>
                </div>
                <div className="absolute bottom-0 right-0 left-0 h-1/2 bg-gradient-to-t from-primary/10 to-transparent p-10 flex items-end justify-between">
                   <div className="flex gap-2 items-end">
                      {[40, 70, 45, 90, 65, 80, 50, 100].map((h, i) => (
                        <motion.div 
                          key={i}
                          initial={{ height: 0 }}
                          whileInView={{ height: h }}
                          className="w-8 bg-primary/40 rounded-t-lg"
                        />
                      ))}
                   </div>
                   <div className="text-right">
                      <div className="text-4xl font-black text-primary italic leading-none">ACTIVE</div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Monitoring Stream</div>
                   </div>
                </div>
             </div>
             
             <div className="glass-panel p-10 rounded-[3rem] border-white/5 flex flex-col justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                   <Shield className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                   <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2 italic">Security First</h3>
                   <p className="text-muted-foreground text-sm font-medium leading-relaxed">Injection detection and PII redaction at the edge.</p>
                </div>
             </div>

             <div className="glass-panel p-10 rounded-[3rem] border-white/5 flex flex-col justify-between group cursor-default">
                <div className="flex justify-between items-start">
                   <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                      <Network className="w-6 h-6 text-indigo-500" />
                   </div>
                   <ArrowRight className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div>
                   <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2 italic">Global Mesh</h3>
                   <p className="text-muted-foreground text-sm font-medium leading-relaxed">Deployed across 24 regions for sub-10ms processing.</p>
                </div>
             </div>

             <div className="lg:col-span-2 glass-panel p-10 rounded-[3rem] border-white/5 relative overflow-hidden group">
                <div className="grid md:grid-cols-2 gap-10 items-center">
                   <div>
                      <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-4 italic">Enterprise Ready</h3>
                      <ul className="space-y-4">
                         {[
                           "Multi-tenant Workspace support",
                           "Advanced Role Based Access Control",
                           "Custom Optimization Presets",
                           "SOC2 & HIPAA Compliant Infrastructure"
                         ].map((item, i) => (
                           <li key={i} className="flex items-center gap-3 text-xs text-muted-foreground font-bold uppercase tracking-widest">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                              {item}
                           </li>
                         ))}
                      </ul>
                   </div>
                   <div className="relative">
                      <div className="absolute inset-0 bg-primary/20 blur-[60px] group-hover:bg-primary/30 transition-all" />
                      <div className="relative z-10 glass-panel p-6 rounded-2xl border-white/10 text-center scale-90 group-hover:scale-100 transition-transform">
                         <div className="text-5xl font-black text-white tracking-tighter italic">99.99%</div>
                         <div className="text-[10px] font-black uppercase tracking-widest text-primary mt-2">Guaranteed Uptime SLA</div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* --- ACT 4: THE FINAL CTA --- */}
      <section className="relative py-60 flex flex-col items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-primary/10 blur-[150px] opacity-20" />
        <div className="container max-w-4xl px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <BrainCircuit className="w-20 h-20 text-primary mb-12 animate-pulse" />
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-white uppercase mb-12 italic">
              OWN YOUR <span className="text-primary text-glow">INTELLIGENCE.</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-16 max-w-2xl leading-relaxed">
              Don't let inefficient prompts drain your innovation. 
              Join the future of AI infrastructure today.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-8">
               <Button onClick={handleSignIn} size="lg" className="h-20 px-16 text-lg font-black uppercase tracking-widest rounded-3xl bg-primary text-primary-foreground shadow-2xl hover:scale-105 transition-all shadow-primary/40">
                  Boot System Now
               </Button>
               <Button variant="ghost" size="lg" className="h-20 px-12 text-lg font-black uppercase tracking-widest rounded-3xl border border-white/10 glass-panel text-white hover:bg-white/10">
                  Schedule Demo
               </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="py-20 border-t border-white/5 relative z-10">
         <div className="container max-w-7xl px-6 flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/40">
                <BrainCircuit className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xl font-black tracking-tighter text-white uppercase">Prompt<span className="text-primary">IQ</span></span>
            </div>
            <div className="flex gap-12 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
               <a href="#" className="hover:text-primary transition-colors">Documentation</a>
               <a href="#" className="hover:text-primary transition-colors">API Status</a>
               <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            </div>
            <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">
               © 2026 PromptIQ Neural Systems.
            </div>
         </div>
      </footer>
    </div>
  );
}
