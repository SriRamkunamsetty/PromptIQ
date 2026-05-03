import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, BrainCircuit, Activity, Zap, Shield, Sparkles, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '@/lib/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useAuthStore } from '@/lib/store';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function LandingPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [isSigningIn, setIsSigningIn] = useState(false);

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSignIn = async () => {
    if (isSigningIn) return;
    setIsSigningIn(true);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account'
    });
    try {
      await signInWithPopup(auth, provider);
      navigate('/dashboard');
    } catch (error: any) {
      console.error("Sign in failed", error);
      if (error.code === 'auth/cancelled-popup-request' || error.code === 'auth/popup-closed-by-user' || error.code === 'auth/popup-blocked') {
        toast.error('Sign in was cancelled. Please ensure your browser allows popups for this site and try again.');
      } else {
        toast.error(`Sign in failed: ${error.message}`);
      }
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden flex flex-col items-center">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[150px] opacity-50" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] opacity-40" />
      </div>

      <nav className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between z-10 glass-panel mt-6 rounded-2xl border-white/5">
        <div className="flex items-center gap-2">
          <BrainCircuit className="w-8 h-8 text-primary" />
          <span className="text-xl font-bold tracking-tighter text-gradient">PromptIQ</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="#features" className="hover:text-primary transition-colors">Features</a>
          <a href="#benchmarks" className="hover:text-primary transition-colors">Benchmarks</a>
          <a href="#pricing" className="hover:text-primary transition-colors">Pricing</a>
        </div>
        <Button onClick={handleSignIn} disabled={isSigningIn} className="glass-button rounded-full px-6 shadow-[0_0_20px_rgba(45,212,191,0.2)]">
          {isSigningIn ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Connecting...</> : <>Launch App <ArrowRight className="w-4 h-4 ml-2" /></>}
        </Button>
      </nav>

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 flex flex-col items-center text-center pt-32 pb-20 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-md mb-8">
             <Sparkles className="w-4 h-4 text-primary" />
             <span className="text-sm font-medium text-primary">Intelligent LLM Optimization & Prompt Intelligence</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-tight">
            Stop guessing.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-indigo-400">
              Start optimizing.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl leading-relaxed">
            The enterprise-grade platform to compress context, reduce token waste, and unlock peak LLM performance without prompt engineering.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button disabled={isSigningIn} onClick={handleSignIn} size="lg" className="h-14 px-8 text-lg rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_40px_rgba(45,212,191,0.4)] transition-all hover:scale-105">
              {isSigningIn ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Connecting Account...</> : "Start Optimizing Free"}
            </Button>
            <Button variant="outline" size="lg" className="h-14 px-8 text-lg rounded-full border-border/50 hover:bg-card/50 glass-panel">
              View Benchmarks
            </Button>
          </div>
        </motion.div>

        {/* Feature Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-32 w-full text-left"
        >
          {[
            {
              icon: Activity,
              title: "Context Compression",
              desc: "Intelligently prune redundant conversation history and RAG chunks to save up to 40% on token costs."
            },
            {
              icon: Zap,
              title: "Smart Orchestration",
              desc: "Automatically route workloads to the most cost-efficient model without sacrificing quality."
            },
            {
              icon: Shield,
              title: "Prompt Debugger",
              desc: "Analyze your prompts to find conflicting instructions and ignored context segments."
            }
          ].map((feat, i) => (
            <div key={i} className="glass-panel p-8 rounded-3xl hover:border-primary/30 transition-colors group">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                <feat.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feat.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}
