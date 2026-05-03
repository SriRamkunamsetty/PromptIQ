import { motion } from 'framer-motion';
import { Database, Server, Smartphone, Cpu, Shield, Zap, Workflow, ArrowRight } from 'lucide-react';

export default function SystemArchitecture() {
  return (
    <div className="space-y-6 flex flex-col min-h-[600px] h-full">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">System Architecture</h1>
        <p className="text-muted-foreground">Real-time visualization of the PromptIQ optimization pipeline.</p>
      </div>

      <div className="glass-panel p-8 rounded-3xl flex-1 flex flex-col items-center justify-center relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col space-y-12">
          
          {/* Top Layer */}
          <div className="flex justify-between items-center w-full">
             <div className="flex flex-col items-center">
                 <div className="w-16 h-16 rounded-2xl bg-card border border-white/10 flex items-center justify-center mb-3 shadow-[0_0_30px_rgba(255,255,255,0.05)] text-foreground">
                    <Smartphone className="w-8 h-8" />
                 </div>
                 <span className="text-sm font-medium">React Client</span>
             </div>

             <motion.div 
               animate={{ x: [0, 20, 0] }} 
               transition={{ repeat: Infinity, duration: 2 }}
               className="text-primary opacity-50"
             >
                <ArrowRight className="w-6 h-6" />
             </motion.div>

             <div className="flex flex-col items-center relative">
                 <div className="absolute -inset-4 bg-primary/20 blur-xl rounded-full" />
                 <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center mb-3 text-primary relative shadow-[0_0_40px_rgba(45,212,191,0.2)]">
                    <Workflow className="w-10 h-10" />
                 </div>
                 <span className="text-sm font-bold text-primary">Orchestration Layer</span>
             </div>

             <motion.div 
               animate={{ x: [0, 20, 0] }} 
               transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
               className="text-primary opacity-50"
             >
                <ArrowRight className="w-6 h-6" />
             </motion.div>

             <div className="flex flex-col items-center">
                 <div className="w-16 h-16 rounded-2xl bg-card border border-white/10 flex items-center justify-center mb-3 shadow-[0_0_30px_rgba(255,255,255,0.05)] text-blue-400">
                    <Cpu className="w-8 h-8" />
                 </div>
                 <span className="text-sm font-medium">Gemini 3.1 APIs</span>
             </div>
          </div>

          {/* Bottom Layer */}
          <div className="flex justify-center gap-24 items-center w-full mt-12">
             <div className="flex flex-col items-center">
                 <div className="w-14 h-14 rounded-2xl bg-card border border-white/10 flex items-center justify-center mb-3 text-emerald-400 opacity-80">
                    <Database className="w-6 h-6" />
                 </div>
                 <span className="text-xs text-muted-foreground uppercase tracking-widest text-center">Firestore<br/>Metrics & Cache</span>
             </div>

             <div className="flex flex-col items-center">
                 <div className="w-14 h-14 rounded-2xl bg-card border border-white/10 flex items-center justify-center mb-3 text-yellow-400 opacity-80">
                    <Shield className="w-6 h-6" />
                 </div>
                 <span className="text-xs text-muted-foreground uppercase tracking-widest text-center">Firebase <br/>Auth & Rules</span>
             </div>

             <div className="flex flex-col items-center">
                 <div className="w-14 h-14 rounded-2xl bg-card border border-white/10 flex items-center justify-center mb-3 text-purple-400 opacity-80">
                    <Server className="w-6 h-6" />
                 </div>
                 <span className="text-xs text-muted-foreground uppercase tracking-widest text-center">Edge <br/>Deployment</span>
             </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
