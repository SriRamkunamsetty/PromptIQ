import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { BrainCircuit, Loader2, Plus, Trash2, ArrowRight } from 'lucide-react';
import { generateEmbedding, cosineSimilarity } from '@/lib/embeddings';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

interface Chunk {
  id: string;
  text: string;
  embedding: number[] | null;
  score: number;
}

export default function ContextManager() {
  const [query, setQuery] = useState('');
  const [queryEmbedding, setQueryEmbedding] = useState<number[] | null>(null);
  
  const [chunks, setChunks] = useState<Chunk[]>([
    { id: '1', text: 'PromptIQ was launched in 2026 as a premier token optimization platform.', embedding: null, score: 0 },
    { id: '2', text: 'The capital of France is Paris.', embedding: null, score: 0 },
    { id: '3', text: 'Context pruning reduces hallucination and saves token costs substantially.', embedding: null, score: 0 }
  ]);
  
  const [threshold, setThreshold] = useState(0.4);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleProcessContext = async () => {
    if (!query.trim()) {
      toast.error('Please enter a query to establish semantic relevance.');
      return;
    }

    setIsProcessing(true);
    let qEmb: number[];
    try {
      qEmb = await generateEmbedding(query);
      setQueryEmbedding(qEmb);
    } catch (error) {
      console.error(error);
      toast.error('Failed to generate query embedding.');
      setIsProcessing(false);
      return;
    }

    try {
      const updatedChunks = await Promise.all(chunks.map(async (c) => {
        let textEmb = c.embedding;
        if (!textEmb) {
           textEmb = await generateEmbedding(c.text);
        }
        const score = textEmb ? cosineSimilarity(qEmb, textEmb) : 0;
        return { ...c, embedding: textEmb, score };
      }));
      setChunks(updatedChunks.sort((a, b) => b.score - a.score));
      toast.success('Context successfully ranked!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to generate chunk embeddings.');
    } finally {
      setIsProcessing(false);
    }
  };

  const addChunk = () => {
    setChunks([...chunks, { id: Math.random().toString(), text: '', embedding: null, score: 0 }]);
  };

  const removeChunk = (id: string) => {
    setChunks(chunks.filter(c => c.id !== id));
  };

  const updateChunk = (id: string, text: string) => {
    setChunks(chunks.map(c => c.id === id ? { ...c, text, embedding: null, score: 0 } : c));
  };

  // derived metrics
  const includedChunks = chunks.filter(c => c.score >= threshold);
  const totalTokens = chunks.reduce((acc, c) => acc + Math.ceil(c.text.length / 4), 0);
  const savedTokens = chunks.filter(c => c.score < threshold).reduce((acc, c) => acc + Math.ceil(c.text.length / 4), 0);

  return (
    <div className="space-y-6 flex flex-col h-full min-h-[600px] overflow-hidden">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Smart Context Manager</h1>
        <p className="text-muted-foreground">Semantically prune RAG chunks to optimize token budgets without losing context.</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-6 flex-1 min-h-0">
        
        {/* LEFT PANEL: Editing */}
        <div className="lg:col-span-auto lg:col-span-5 flex flex-col space-y-6 overflow-y-auto pr-2 pb-10">
          
          <div className="glass-panel p-6 rounded-2xl">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
               Target Query (Intent)
            </h2>
            <Textarea 
              value={query} onChange={e => setQuery(e.target.value)}
              placeholder="What makes PromptIQ special?"
              className="resize-none h-24 bg-background/50"
            />
          </div>

          <div className="glass-panel p-6 rounded-2xl flex-1 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">RAG Chunks / Memory</h2>
              <Button size="sm" variant="secondary" onClick={addChunk} className="h-8 shadow-none bg-primary/10 hover:bg-primary/20 text-primary">
                <Plus className="w-4 h-4 mr-1" /> Add
              </Button>
            </div>
            
            <div className="space-y-4 flex-1">
              <AnimatePresence>
                {chunks.map((chunk, i) => (
                  <motion.div 
                    key={chunk.id} 
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="relative"
                  >
                    <Textarea 
                      value={chunk.text} onChange={e => updateChunk(chunk.id, e.target.value)}
                      placeholder={`Context chunk ${i + 1}...`}
                      className="resize-none pr-10 text-sm bg-background/50 h-20"
                    />
                    <Button 
                      variant="ghost" size="icon" 
                      className="absolute top-2 right-2 h-6 w-6 text-muted-foreground hover:text-destructive"
                      onClick={() => removeChunk(chunk.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <Button 
              className="w-full mt-6 glass-button" 
              onClick={handleProcessContext}
              disabled={isProcessing}
            >
              {isProcessing ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <BrainCircuit className="w-4 h-4 mr-2" />}
              Analyze Relevance
            </Button>
          </div>
        </div>

        {/* RIGHT PANEL: Visualization */}
        <div className="lg:col-span-7 flex flex-col space-y-6">
          <div className="grid grid-cols-2 gap-4">
             <div className="glass-panel p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                 <span className="text-sm text-muted-foreground mb-1">Total Tokens Available</span>
                 <span className="text-2xl font-bold">{totalTokens}</span>
             </div>
             <div className="glass-panel p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                 <span className="text-sm text-muted-foreground mb-1">Tokens Pruned</span>
                 <span className="text-2xl font-bold text-emerald-400">{queryEmbedding ? savedTokens : 0}</span>
             </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl flex flex-col flex-1">
            <div className="flex justify-between items-end mb-6">
               <div>
                 <h2 className="text-lg font-semibold mb-1">Semantic Assembly Graph</h2>
                 <p className="text-sm text-muted-foreground">Adjust threshold to prune irrelevant data.</p>
               </div>
               <div className="text-right">
                 <span className="text-sm text-primary font-medium">{Math.round(threshold * 100)}% Match Required</span>
               </div>
            </div>

            <div className="mb-8">
               <Slider 
                  value={[threshold]} 
                  min={0} max={1} step={0.01}
                  onValueChange={([val]) => setThreshold(val)}
                  disabled={!queryEmbedding}
                  className="w-full"
               />
            </div>

            <div className="flex-1 relative border border-white/5 rounded-xl bg-background/30 p-6 overflow-y-auto space-y-4">
               {queryEmbedding ? (
                 <AnimatePresence>
                   {chunks.map(chunk => {
                     const isIncluded = chunk.score >= threshold;
                     return (
                       <motion.div 
                         key={chunk.id}
                         layout
                         initial={{ opacity: 0 }}
                         animate={{ opacity: isIncluded ? 1 : 0.4 }}
                         className={`p-4 rounded-xl border flex items-center gap-4 transition-colors ${isIncluded ? 'border-primary/40 bg-primary/5' : 'border-destructive/30 bg-destructive/5'}`}
                       >
                         <div className="flex-1 min-w-0">
                           <p className={`text-sm truncate mb-2 ${!isIncluded && 'line-through text-muted-foreground'}`}>{chunk.text || '(Empty)'}</p>
                           <div className="h-1.5 rounded-full bg-secondary overflow-hidden w-full max-w-[200px]">
                              <div 
                                className={`h-full ${isIncluded ? 'bg-primary' : 'bg-muted-foreground'}`} 
                                style={{ width: `${Math.max(0, chunk.score * 100)}%` }}
                              />
                           </div>
                         </div>
                         <div className="text-right shrink-0">
                           <span className={`text-xs font-mono font-bold ${isIncluded ? 'text-primary' : 'text-muted-foreground'}`}>
                             {(chunk.score * 100).toFixed(1)}% match
                           </span>
                           {isIncluded ? (
                             <div className="text-[10px] text-emerald-400 mt-1 uppercase tracking-wider">included</div>
                           ) : (
                             <div className="text-[10px] text-destructive mt-1 uppercase tracking-wider">pruned</div>
                           )}
                         </div>
                       </motion.div>
                     )
                   })}
                 </AnimatePresence>
               ) : (
                 <div className="absolute inset-0 flex items-center justify-center flex-col text-muted-foreground opacity-50">
                    <BrainCircuit className="w-12 h-12 mb-4" />
                    <p>Run analysis to map semantic influence</p>
                 </div>
               )}
            </div>

            {queryEmbedding && (
               <div className="mt-6 flex justify-between items-center bg-primary/10 border border-primary/20 p-4 rounded-xl">
                 <div className="text-sm">
                   <span className="font-semibold text-foreground">Final Assembled Output: </span>
                   <span className="text-muted-foreground">{includedChunks.length} chunks ({totalTokens - savedTokens} tokens)</span>
                 </div>
                 <Button size="sm" className="shadow-[0_0_15px_rgba(45,212,191,0.3)] gap-2">
                   Send to LLM <ArrowRight className="w-4 h-4" />
                 </Button>
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
