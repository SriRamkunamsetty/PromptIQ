import { useState } from 'react';
import { Microscope, Activity, ArrowRight, Target, BrainCircuit, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ai } from '@/lib/gemini';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export default function SemanticFidelity() {
  const [original, setOriginal] = useState('Analyze the provided sales data. Extract the total revenue, summarize the top 3 selling items, and provide a 2 sentence summary of overall performance. Keep the tone professional.');
  const [optimized, setOptimized] = useState('Extract total revenue and top 3 items from sales data. Summarize performance in 2 sentences. Tone: professional.');
  
  const [isValidating, setIsValidating] = useState(false);
  const [result, setResult] = useState<{ similarity: number, drift: number, confidence: string } | null>(null);

  const validateFidelity = async () => {
    if (!ai) return toast.error('Gemini API not configured');
    if (!original || !optimized) return toast.error('Please provide both prompts');

    setIsValidating(true);
    try {
      // Import dynamic to avoid top-level issues if any, but better to import at top.
      const { generateEmbedding, cosineSimilarity } = await import('@/lib/embeddings');
      
      const vecA = await generateEmbedding(original);
      const vecB = await generateEmbedding(optimized);
      
      const similarity = cosineSimilarity(vecA, vecB);
      const drift = 1 - similarity;
      
      let confidence = 'Low';
      if (similarity > 0.95) confidence = 'High';
      else if (similarity > 0.85) confidence = 'Moderate';
      
      setResult({
        similarity,
        drift: drift < 0 ? 0 : drift, // clamp
        confidence
      });
      toast.success('Vector validation complete');
    } catch (e) {
      console.error(e);
      toast.error('Validation failed');
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="space-y-6 flex flex-col h-full overflow-y-auto pb-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Semantic Fidelity Validation</h1>
        <p className="text-muted-foreground">Mathematically continuous semantic validation to ensure prompt meaning is preserved after compression.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-3xl flex flex-col space-y-4">
           <h2 className="text-lg font-semibold flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" /> Pre-Optimization Prompt
           </h2>
           <Textarea 
             className="flex-1 min-h-[150px] resize-none bg-background/50 text-sm font-mono p-4"
             value={original}
             onChange={e => setOriginal(e.target.value)}
           />
        </div>

        <div className="glass-panel p-6 rounded-3xl flex flex-col space-y-4">
           <h2 className="text-lg font-semibold flex items-center gap-2 text-emerald-400">
              <Target className="w-5 h-5" /> Post-Optimization Prompt
           </h2>
           <Textarea 
             className="flex-1 min-h-[150px] resize-none bg-emerald-500/5 border-emerald-500/20 text-sm font-mono p-4"
             value={optimized}
             onChange={e => setOptimized(e.target.value)}
           />
        </div>
      </div>

      <div className="flex justify-center">
        <Button 
          size="lg" 
          onClick={validateFidelity} 
          disabled={isValidating}
          className="glass-button px-12 py-6 rounded-full text-lg font-semibold gap-3 bg-primary/20 text-primary border-primary/50"
        >
          {isValidating ? <><Loader2 className="w-5 h-5 animate-spin" /> Computing Vector Distance...</> : <><Microscope className="w-5 h-5" /> Execute Semantic Validation</>}
        </Button>
      </div>

      {result && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-8 rounded-3xl mt-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
             <BrainCircuit className="w-64 h-64" />
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 relative z-10">
              <div className="flex flex-col items-center justify-center p-6 bg-background/40 rounded-2xl border border-white/5">
                 <div className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4">Similarity Score</div>
                 <div className="relative flex items-center justify-center w-32 h-32">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="64" cy="64" r="56" fill="transparent" stroke="currentColor" strokeWidth="12" className="text-white/5" />
                      <circle 
                        cx="64" cy="64" r="56" 
                        fill="transparent" 
                        stroke="currentColor" 
                        strokeWidth="12" 
                        strokeDasharray={351} 
                        strokeDashoffset={351 - (351 * result.similarity)} 
                        className={`transition-all duration-1000 ${result.similarity > 0.85 ? 'text-emerald-400' : 'text-yellow-400'}`} 
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center font-black text-3xl">
                       {(result.similarity * 100).toFixed(1)}<span className="text-sm font-normal">%</span>
                    </div>
                 </div>
              </div>

              <div className="flex flex-col items-center justify-center p-6 bg-background/40 rounded-2xl border border-white/5">
                 <div className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4">Semantic Drift</div>
                 <div className="text-5xl font-black mb-2 text-destructive">
                   {(result.drift * 100).toFixed(1)}<span className="text-xl font-normal">%</span>
                 </div>
                 <p className="text-xs text-muted-foreground text-center">Measured degradation of meaning</p>
              </div>

              <div className="flex flex-col items-center justify-center p-6 bg-background/40 rounded-2xl border border-white/5">
                 <div className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4">Confidence</div>
                 <div className={`text-4xl font-bold uppercase tracking-widest ${
                   result.confidence === 'High' ? 'text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]' : 
                   result.confidence === 'Moderate' ? 'text-yellow-400' : 'text-destructive'
                 }`}>
                   {result.confidence}
                 </div>
                 <p className="text-xs text-muted-foreground mt-4 text-center">Optimization Safety Rating</p>
              </div>
          </div>
        </motion.div>
      )}

    </div>
  );
}
