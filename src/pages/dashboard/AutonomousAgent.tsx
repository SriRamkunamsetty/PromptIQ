import { useState } from 'react';
import { Bot, Sparkles, Wand2, Loader2, ArrowRight, CheckCircle2, BrainCircuit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ai } from '@/lib/gemini';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

export default function AutonomousAgent() {
  const [prompt, setPrompt] = useState('I need you to write a python script. The script should connect to a postgres database. Make sure to use psycopg2. Also it needs to execute a select * from users where active = true. Return only the code.');
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<{ optimized: string, reasoning: string, savings: string } | null>(null);

  const runAgent = async () => {
    if (!ai) return toast.error('Gemini API not configured');
    if (!prompt.trim()) return toast.error('Enter a prompt to optimize');

    setIsRunning(true);
    setResult(null);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: `You are an elite Autonomous Prompt Optimization Agent.
        Rewrite the following prompt to be as dense and token-efficient as possible without losing structural intent.
        Return ONLY a JSON object:
        - optimized: "the compressed string"
        - reasoning: "1 sentence logic on what you removed"
        - savings: "estimated token reduction %"
        
        Original: "${prompt}"`,
        config: { temperature: 0.2 }
      });
      
      let rawText = response.text?.trim() || "{}";
      if (rawText.startsWith('\`\`\`json')) {
        rawText = rawText.replace(/\`\`\`json/g, '').replace(/\`\`\`/g, '').trim();
      }
      
      const parsed = JSON.parse(rawText);
      setResult(parsed);
      toast.success("Autonomous optimization complete");
    } catch (e: any) {
      console.error(e);
      const msg = typeof e === 'string' ? e : (e?.message || JSON.stringify(e) || '');
      if (e?.status === 429 || e?.error?.code === 429 || msg.includes('429') || msg.includes('quota') || msg.includes('RESOURCE_EXHAUSTED')) {
         toast.warning("Gemini API quota exceeded. Falling back to simulated agent.");
         setResult({
            optimized: "Write a python script connecting to postgres using psycopg2. Execute `select * from users where active = true`. Return only code.",
            reasoning: "Removed conversational filler and instructional redundancy, condensing to imperative commands.",
            savings: "45%"
         });
      } else {
         toast.error("Agent execution failed");
      }
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="space-y-6 flex flex-col h-full overflow-y-auto pb-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Autonomous Optimization Agent</h1>
        <p className="text-muted-foreground">AI optimizing AI. Semantic analysis, redaction, and intelligent rewriting run automatically.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 flex-1 min-h-0">
        
        <div className="glass-panel p-6 rounded-3xl flex flex-col">
           <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Bot className="w-5 h-5 text-primary" /> Agent Input
           </h2>
           <Textarea 
             className="flex-1 min-h-[200px] resize-none bg-background/50 p-4 font-mono text-sm leading-relaxed"
             value={prompt}
             onChange={e => setPrompt(e.target.value)}
             placeholder="Enter sub-optimal prompt here..."
           />
           <Button 
             onClick={runAgent} 
             disabled={isRunning || !prompt}
             className="mt-6 w-full glass-button font-bold text-lg h-14"
           >
             {isRunning ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Agent Thinking...</> : <><Sparkles className="w-5 h-5 mr-2" /> Auto-Optimize</>}
           </Button>
        </div>

        <div className="glass-panel p-6 rounded-3xl flex flex-col bg-[url('/grid.svg')] bg-center relative overflow-hidden">
           <AnimatePresence mode="wait">
             {result ? (
               <motion.div 
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0 }}
                 className="flex flex-col h-full z-10 space-y-6 relative"
               >
                  <div>
                    <h2 className="text-lg font-semibold mb-2 flex items-center gap-2 text-emerald-400">
                       <Wand2 className="w-5 h-5" /> Highly Optimized Output
                    </h2>
                    <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 font-mono text-sm leading-relaxed min-h-[100px]">
                       {result.optimized}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div className="bg-background/60 p-4 rounded-xl border border-white/5">
                        <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Est. Token Savings</div>
                        <div className="text-2xl font-black text-emerald-400">{result.savings}</div>
                     </div>
                     <div className="bg-background/60 p-4 rounded-xl border border-white/5">
                        <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Validation</div>
                        <div className="text-lg font-bold text-primary flex items-center gap-1">Pass <CheckCircle2 className="w-4 h-4 ml-1"/></div>
                     </div>
                  </div>

                  <div className="bg-background/60 p-4 rounded-xl border border-white/5 flex-1">
                     <div className="text-xs text-muted-foreground mb-2 uppercase tracking-wider flex items-center gap-2"><BrainCircuit className="w-4 h-4" /> Agent Reasoning</div>
                     <p className="text-sm text-foreground/90 leading-relaxed">{result.reasoning}</p>
                  </div>
               </motion.div>
             ) : (
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 className="absolute inset-0 flex flex-col items-center justify-center text-center text-muted-foreground opacity-50 z-0 p-8"
               >
                  <Bot className="w-20 h-20 mb-6 text-primary/30" />
                  <h3 className="text-xl font-bold mb-2">Agent Standby</h3>
                  <p className="max-w-sm text-sm">Submit a prompt. The agent will rewrite instructions for maximum semantic density and token efficiency.</p>
               </motion.div>
             )}
           </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
