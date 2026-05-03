import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Network, Loader2, Cpu, Zap, Activity } from 'lucide-react';
import { ai } from '@/lib/gemini';
import { toast } from 'sonner';

interface RouteResult {
  recommendedModel: string;
  reason: string;
  estimatedCost: number;
  expectedLatency: string;
}

export default function ModelRouter() {
  const [prompt, setPrompt] = useState('Write a complex neural network architecture in PyTorch from scratch, including custom backward pass logic.');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<RouteResult | null>(null);

  const handleRoute = async () => {
    if (!ai) return toast.error('Gemini API missing');
    setIsProcessing(true);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: `Evaluate the following prompt and determine the most cost-efficient but capable model required to complete this task.
        Available Models: [Gemini 3.1 Pro, Gemini 3.1 Flash, GPT-4o, Claude 3.5 Sonnet].
        Return ONLY a JSON object:
        - recommendedModel: (string, the exact name of the selected model)
        - reason: (string, short explanation why)
        - estimatedCost: (number, estimate out of 100 on a comparative scale)
        - expectedLatency: (string, e.g. '0.8s' or '3.5s')
        
        Prompt:
        "${prompt}"`,
        config: { temperature: 0.2 }
      });

      let rawText = response.text?.trim() || "{}";
      if (rawText.startsWith('```json')) {
        rawText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
      }
      setResult(JSON.parse(rawText));
    } catch (e: any) {
      console.error(e);
      const msg = typeof e === 'string' ? e : (e?.message || JSON.stringify(e) || '');
      if (e?.status === 429 || e?.error?.code === 429 || msg.includes('429') || msg.includes('quota') || msg.includes('RESOURCE_EXHAUSTED')) {
        toast.warning("Gemini API quota exceeded. Falling back to simulated simulation.");
        setResult({
           model: "gemini-3-flash-preview",
           reason: "Simulated routing: Low complexity task, high priority on speed and cost.",
           estimatedCost: 10,
           expectedLatency: "0.2s"
        });
      } else {
        toast.error('Routing evaluation failed');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6 flex flex-col h-full min-h-[600px]">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Adaptive Model Router</h1>
        <p className="text-muted-foreground">Intelligently route workloads based on complexity, latency, and cost factors.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 flex-1 min-h-0">
        
        <div className="flex flex-col space-y-4">
          <div className="glass-panel p-6 rounded-2xl flex-1 flex flex-col">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Incoming Workload
            </h2>
            <Textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="flex-1 resize-none bg-background/50 p-4"
              placeholder="Paste the prompt to be evaluated..."
            />
            <Button onClick={handleRoute} disabled={isProcessing || !prompt} className="mt-4 glass-button w-full">
              {isProcessing ? <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Evaluating Pipeline...</> : <><Network className="w-4 h-4 mr-2" /> Calculate Optimal Route</>}
            </Button>
          </div>
        </div>

        <div className="flex flex-col space-y-4 relative">
           <div className="glass-panel p-6 rounded-2xl flex-1 justify-center flex flex-col items-center">
              {result ? (
                <div className="space-y-8 w-full max-w-md animate-in fade-in zoom-in duration-500">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center p-4 rounded-full bg-primary/20 border border-primary/40 mb-4">
                       <Cpu className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-1">Optimal Route Selected</h3>
                    <h2 className="text-3xl font-bold text-gradient">{result.recommendedModel}</h2>
                  </div>

                  <div className="space-y-4 bg-background/40 p-6 rounded-2xl border border-white/5">
                    <p className="text-sm border-b border-border/50 pb-4 mb-4 text-center italic opacity-90">
                      "{result.reason}"
                    </p>
                    <div className="flex justify-between items-center text-sm">
                       <span className="text-muted-foreground flex items-center gap-2"><Zap className="w-4 h-4 text-yellow-400" /> Relative Cost Index</span>
                       <span className="font-mono font-bold text-lg">{result.estimatedCost} / 100</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                       <span className="text-muted-foreground flex items-center gap-2"><Activity className="w-4 h-4 text-emerald-400" /> Expected Latency</span>
                       <span className="font-mono font-bold text-lg">{result.expectedLatency}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground opacity-50 flex flex-col items-center">
                   <Network className="w-16 h-16 mb-6" />
                   <h2 className="text-xl font-semibold mb-2">Simulate Intelligent Routing</h2>
                   <p className="max-w-xs text-sm">Submit a prompt to test the model selection logic. The router chooses cost-effective tiers for simple tasks, and heavier models for logical challenges.</p>
                </div>
              )}
           </div>
        </div>

      </div>
    </div>
  );
}
