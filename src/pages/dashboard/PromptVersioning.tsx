import { GitCommit, History, ArrowRight, CornerDownRight } from 'lucide-react';

const history = [
  { id: 'v1.4', time: '10 mins ago', action: 'Auto-optimized for Claude 3.5 Sonnet', tokens: '-142', drift: '0.4%' },
  { id: 'v1.3', time: '2 hours ago', action: 'Manual edit: Added tone constraints', tokens: '+28', drift: '2.1%' },
  { id: 'v1.2', time: '1 day ago', action: 'Redundancy pruning applied', tokens: '-312', drift: '1.2%' },
  { id: 'v1.1', time: '2 days ago', action: 'Context window adjusted', tokens: '-84', drift: '0.8%' },
  { id: 'v1.0', time: '3 days ago', action: 'Initial prompt created', tokens: 'N/A', drift: 'N/A' },
];

export default function PromptVersioning() {
  return (
    <div className="space-y-6 flex flex-col h-full overflow-y-auto pb-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Version Control</h1>
        <p className="text-muted-foreground">Prompt snapshots, semantic rollbacks, and optimization history tracking.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 flex-1 min-h-[500px]">
         <div className="glass-panel p-6 rounded-3xl flex flex-col">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
               <History className="w-5 h-5 text-primary" /> Evolution Timeline
            </h2>
            <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar space-y-6">
               {history.map((ver, i) => (
                  <div key={ver.id} className="relative pl-6">
                     {i !== history.length - 1 && (
                       <div className="absolute left-[11px] top-8 bottom-[-24px] w-0.5 bg-white/10" />
                     )}
                     <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-background border-2 border-primary z-10 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                     </div>
                     <div className="bg-background/40 p-4 rounded-2xl border border-white/5 ml-4 hover:border-primary/30 transition-colors cursor-pointer group">
                        <div className="flex justify-between items-start mb-2">
                           <div>
                              <span className="font-mono text-primary font-bold mr-2">{ver.id}</span>
                              <span className="text-xs text-muted-foreground">{ver.time}</span>
                           </div>
                           <div className="text-xs font-mono px-2 py-1 rounded bg-white/5 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                              Restore
                           </div>
                        </div>
                        <p className="text-sm font-medium mb-3">{ver.action}</p>
                        <div className="flex items-center gap-4 text-xs font-mono border-t border-white/5 pt-3">
                           <div className="text-emerald-400">Tokens: {ver.tokens}</div>
                           <div className="text-yellow-400">Semantic Drift: {ver.drift}</div>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         <div className="glass-panel p-6 rounded-3xl flex flex-col">
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-6">
               <GitCommit className="w-5 h-5 text-primary" /> Semantic Diff (v1.4 vs v1.3)
            </h2>
            <div className="bg-background/50 rounded-2xl p-4 font-mono text-sm leading-relaxed whitespace-pre-wrap overflow-y-auto flex-1 border border-white/5 custom-scrollbar">
               <span className="text-muted-foreground">Analyze the provided sales data. </span>
               <span className="bg-destructive/20 text-destructive-foreground px-1 rounded line-through">Extract the total revenue, summarize the top 3 selling items, and provide a 2 sentence summary of overall performance. Keep the tone professional.</span>
               <br/><br/>
               <span className="bg-emerald-500/20 text-emerald-400 px-1 rounded">Extract total revenue and top 3 items. Summarize in 2 sentences. Tone: professional.</span>
            </div>
         </div>
      </div>

    </div>
  );
}
