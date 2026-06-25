import { BookOpen, CheckCircle2, ChevronRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CaseStudies() {
  const cases = [
    {
      title: 'Enterprise Customer Support',
      desc: 'Optimized massive prompt chains for automated helpdesk agents.',
      tokensBefore: '12,500',
      tokensAfter: '3,200',
      savings: '74%',
      latency: '-42%'
    },
    {
      title: 'RAG Context Trimming',
      desc: 'Dynamically eliminating duplicated facts from 20+ retrieved dense documents before synthesis.',
      tokensBefore: '34,000',
      tokensAfter: '14,200',
      savings: '58%',
      latency: '-61%'
    },
    {
      title: 'Coding Assistant Pipeline',
      desc: 'Compressing massive codebase AST representations into semantic summaries prior to hitting GPT-4o.',
      tokensBefore: '110,000',
      tokensAfter: '28,000',
      savings: '74%',
      latency: '-35%'
    }
  ];

  return (
    <div className="space-y-6 flex flex-col h-full overflow-y-auto pb-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Real-world Validation</h1>
        <p className="text-muted-foreground">Proven enterprise use-cases demonstrating the economic and operational value of layer-7 AI optimization.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 shrink-0 pt-4">
         {cases.map((cs, i) => (
            <div key={i} className="glass-panel p-8 rounded-3xl flex flex-col relative group overflow-hidden">
               {/* Hover effect background */}
               <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
               
               <h3 className="text-xl font-bold mb-3">{cs.title}</h3>
               <p className="text-sm text-muted-foreground mb-8 flex-1 leading-relaxed">{cs.desc}</p>
               
               <div className="space-y-4 mb-8 relative z-10">
                  <div className="flex justify-between items-end border-b border-white/5 pb-2">
                     <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Avg Input</span>
                     <span className="font-mono line-through text-destructive opacity-80">{cs.tokensBefore}</span>
                  </div>
                  <div className="flex justify-between items-end border-b border-white/5 pb-2">
                     <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">Optimized Input</span>
                     <span className="font-mono text-emerald-400 font-bold text-lg">{cs.tokensAfter}</span>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-4 relative z-10">
                  <div className="bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20 text-center">
                     <div className="text-xs text-emerald-400/80 mb-1">Token Reduction</div>
                     <div className="text-2xl font-black text-emerald-400">{cs.savings}</div>
                  </div>
                  <div className="bg-blue-500/10 p-3 rounded-xl border border-blue-500/20 text-center">
                     <div className="text-xs text-blue-400/80 mb-1">Latency Drop</div>
                     <div className="text-2xl font-black text-blue-400">{cs.latency}</div>
                  </div>
               </div>
               
               <Button variant="ghost" className="mt-6 w-full justify-between group/btn hover:bg-white/5">
                  View Full Report
                  <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
               </Button>
            </div>
         ))}
      </div>

      <div className="glass-panel p-8 rounded-3xl mt-6 flex flex-col md:flex-row gap-8 items-center bg-[url('/grid.svg')] bg-center relative overflow-hidden">
         <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Zap className="w-64 h-64 text-primary" />
         </div>
         <div className="flex-1 relative z-10">
            <h2 className="text-2xl font-bold mb-4">Enterprise Benchmarks Published</h2>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mb-6">
              In a recent evaluation of 10,000 production prompts across financial, legal, and operational sectors, PromptIQ's layer-7 proxy achieved an average <strong>62% token reduction</strong> and <strong>45% lower latency</strong> while preserving <strong>99.8% semantic fidelity</strong> verified via Gemini embedding vector distances.
            </p>
            <div className="flex flex-wrap gap-4">
               <div className="flex items-center gap-2 text-sm font-medium"><CheckCircle2 className="w-5 h-5 text-primary" /> No model retraining needed</div>
               <div className="flex items-center gap-2 text-sm font-medium"><CheckCircle2 className="w-5 h-5 text-primary" /> Deploys as a proxy</div>
               <div className="flex items-center gap-2 text-sm font-medium"><CheckCircle2 className="w-5 h-5 text-primary" /> Provider agnostic</div>
            </div>
         </div>
      </div>
    </div>
  );
}
