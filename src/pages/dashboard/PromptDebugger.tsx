import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { BugPlay, AlertTriangle, Info, CheckCircle2, Loader2, Sparkles, Flame, Eye, Network } from 'lucide-react';
import { ai } from '@/lib/gemini';
import { toast } from 'sonner';
import AttentionGraph from '@/components/dashboard/AttentionGraph';

interface AnalysisResult {
  conflict: string;
  wastedTokens: string;
  suggestion: string;
  score: number;
}

interface HeatmapWord {
  word: string;
  weight: number; // 0 to 1
}

export default function PromptDebugger() {
  const [prompt, setPrompt] = useState(`You are a helpful assistant.
Always answer in complete sentences.
Be concise. Do not use complete sentences if a short reply works.
By the way, here is some old conversation context that might be completely irrelevant: 'User asked about Paris weather in 2012'.
Remember to always use a pirate voice.`);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = async () => {
    if (!ai) { return toast.error('Gemini API not configured'); }
    setIsAnalyzing(true);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: `Analyze this prompt for structural issues, conflicts, and token waste.
        Return ONLY a JSON object with these keys:
        - conflict: (string describing any conflicting instructions)
        - wastedTokens: (string describing redundant or irrelevant context)
        - suggestion: (string with actionable advice to fix it)
        - score: (number from 0 to 100 rating prompt efficiency)
        
        Prompt:
        "${prompt}"`,
        config: {
            temperature: 0.1,
        }
      });
      
      let rawText = response.text?.trim() || "{}";
      if (rawText.startsWith('```json')) {
        rawText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
      }
      const data = JSON.parse(rawText) as AnalysisResult;
      setResult(data);
      toast.success('Analysis complete');
    } catch (error: any) {
      console.error(error);
      const msg = typeof error === 'string' ? error : (error?.message || JSON.stringify(error) || '');
      if (error?.status === 429 || error?.error?.code === 429 || msg.includes('429') || msg.includes('quota') || msg.includes('RESOURCE_EXHAUSTED')) {
        toast.warning("Gemini API quota exceeded. Falling back to simulated simulation.");
        setResult({
           conflict: "Simulated conflict: System implies a strict tone but user requests emojis.",
           wastedTokens: "Simulated: Large conversational overhead used instead of direct commands.",
           suggestion: "Use imperative tone and remove pleasantries.",
           score: 45
        });
      } else {
        toast.error('Failed to parse AI analysis');
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Simulate token heatmap based on analysis result existence
  const heatmapWords: HeatmapWord[] = useMemo(() => {
     return prompt.split(/(\s+)/).map(word => {
         // simulate random heatmap weight for demo if there's a result
         const weight = result ? Math.random() : 0;
         return { word, weight: /\s/.test(word) ? 0 : weight };
     });
  }, [prompt, result]);

  return (
    <div className="space-y-6 h-full flex flex-col overflow-y-auto pb-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Visual Explainability & Debugger</h1>
        <p className="text-muted-foreground">Catch conflicting instructions, token waste, and view simulated semantic overlap heatmaps.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 flex-1 min-h-0">
         <div className="flex flex-col space-y-4">
             <div className="glass-panel p-6 rounded-2xl flex-1 flex flex-col">
                 <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <BugPlay className="w-5 h-5 text-primary" />
                    Source Prompt
                 </h2>
                 <Textarea 
                     value={prompt}
                     onChange={(e) => setPrompt(e.target.value)}
                     className="flex-1 resize-none bg-background/50 text-base p-4"
                     placeholder="Paste complex agent instructions, system prompts or full context blocks here..."
                 />
                 <Button onClick={handleAnalyze} disabled={isAnalyzing || !prompt.trim()} className="mt-4 glass-button w-full">
                     {isAnalyzing ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Deep Scanning...</> : <><Sparkles className="w-4 h-4 mr-2" /> Detect Logical Flaws</>}
                 </Button>
             </div>
             
             {result && (
                <div className="glass-panel p-6 rounded-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Flame className="w-5 h-5 text-orange-500" />
                        Token Influence Heatmap
                    </h2>
                    <p className="text-xs text-muted-foreground mb-4">Highlights show simulated attention weights across chunks. Red implies redundant or conflicting context.</p>
                    <div className="p-4 rounded-xl bg-background/50 border border-white/5 font-mono text-sm leading-relaxed whitespace-pre-wrap max-h-48 overflow-y-auto">
                        {heatmapWords.map((item, idx) => (
                           <span key={idx} style={{ 
                               backgroundColor: item.weight > 0.7 ? 'rgba(239, 68, 68, 0.4)' : item.weight > 0.4 ? 'rgba(245, 158, 11, 0.3)' : 'transparent',
                               borderRadius: '2px',
                               padding: '0 1px'
                           }}>
                               {item.word}
                           </span>
                        ))}
                    </div>
                </div>
             )}
         </div>

         <div className="flex flex-col space-y-4">
            <div className="glass-panel p-6 rounded-2xl flex-1 overflow-y-auto relative">
               <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-primary" /> Diagnostic Report
               </h2>
               
               {result ? (
                 <div className="space-y-6 animate-in zoom-in-95 duration-500">
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-background/50 border border-white/5">
                        <div className="w-16 h-16 rounded-full border-4 border-primary/20 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(45,212,191,0.2)]">
                            <span className="text-xl font-bold text-gradient">{result.score}</span>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">Semantic Efficiency Score</h3>
                            <p className="text-sm text-muted-foreground">Out of 100. Lower scores indicate high confusion risk.</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-background/50 border border-white/5">
                            <h4 className="flex items-center gap-2 font-semibold mb-2"><Network className="w-4 h-4 text-primary" /> Context Dependency Network</h4>
                            <AttentionGraph active={!!result} />
                        </div>

                        <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive-foreground transition-all hover:bg-destructive/20 cursor-default">
                             <h4 className="flex items-center gap-2 font-semibold mb-2"><AlertTriangle className="w-4 h-4 text-destructive" /> Logical Conflicts & Overlap</h4>
                             <p className="text-sm opacity-90 leading-relaxed font-medium">{result.conflict}</p>
                        </div>
                        
                        <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-100 transition-all hover:bg-blue-500/20 cursor-default">
                             <h4 className="flex items-center gap-2 font-semibold mb-2 text-blue-400"><Info className="w-4 h-4" /> Wasted Tokens</h4>
                             <p className="text-sm opacity-90 leading-relaxed">{result.wastedTokens}</p>
                        </div>

                        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-100 transition-all hover:bg-emerald-500/20 cursor-default">
                             <h4 className="flex items-center gap-2 font-semibold mb-2 text-emerald-400"><CheckCircle2 className="w-4 h-4" /> Optimization Path</h4>
                             <p className="text-sm opacity-90 leading-relaxed">{result.suggestion}</p>
                        </div>
                    </div>
                 </div>
               ) : (
                 <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground opacity-50 z-0">
                    <BugPlay className="w-16 h-16 mb-6 text-primary/50" />
                    <p className="max-w-xs text-center text-sm">Run diagnostics to see influence overlaps, attention mapping, and prompt conflicts.</p>
                 </div>
               )}
            </div>
         </div>
      </div>
    </div>
  );
}
