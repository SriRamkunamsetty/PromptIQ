import { useState } from 'react';
import { Accessibility, Keyboard, MousePointerClick, Type, Eye, CheckCircle2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export default function AccessibilityDashboard() {
  return (
    <div className="space-y-6 flex flex-col h-full overflow-y-auto pb-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Accessibility Center</h1>
        <p className="text-muted-foreground">Enterprise compliance metrics, WCAG audits, and inclusive rendering.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="glass-panel p-6 rounded-3xl col-span-1 md:col-span-2 flex flex-col justify-center relative overflow-hidden group">
            <div className="absolute -right-10 -bottom-10 opacity-5">
               <Accessibility className="w-64 h-64" />
            </div>
            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                   <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                      <CheckCircle2 className="w-6 h-6" />
                   </div>
                   <div>
                       <h2 className="text-lg font-semibold">WCAG 2.1 AA Compliant</h2>
                       <p className="text-sm text-emerald-400">Platform recently audited</p>
                   </div>
                </div>
                <p className="text-muted-foreground text-sm max-w-xl">
                  PromptIQ enforces strict accessibility standards across all dashboards. This includes semantic HTML, robust ARIA labeling, full keyboard navigation, and contrast-safe color palettes. AI outputs are rendered with screen-reader optimized structure.
                </p>
            </div>
         </div>
         
         <div className="glass-panel p-6 rounded-3xl flex flex-col items-center justify-center text-center">
            <div className="text-6xl font-black text-gradient mb-2">98<span className="text-2xl text-muted-foreground font-normal">/100</span></div>
            <h3 className="font-semibold mb-1">A11y Score</h3>
            <p className="text-xs text-muted-foreground">Automated lighthouse audit</p>
         </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 flex-1 min-h-0">
          
          <div className="glass-panel p-6 rounded-3xl">
             <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
               <Keyboard className="w-5 h-5 text-primary" /> Core Compliance Metrics
             </h2>
             <div className="space-y-8">
                 <div className="space-y-2">
                    <div className="flex justify-between items-end">
                       <div className="flex items-center gap-2 font-medium text-sm"><Keyboard className="w-4 h-4 text-muted-foreground"/> Keyboard Navigation</div>
                       <span className="font-mono text-xs text-primary">100%</span>
                    </div>
                    <Progress value={100} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">All interactive elements reachable via Tab.</p>
                 </div>
                 
                 <div className="space-y-2">
                    <div className="flex justify-between items-end">
                       <div className="flex items-center gap-2 font-medium text-sm"><Type className="w-4 h-4 text-muted-foreground"/> Screen Reader Coverage</div>
                       <span className="font-mono text-xs text-primary">95%</span>
                    </div>
                    <Progress value={95} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">ARIA labels on buttons, charts, and dynamic content.</p>
                 </div>

                 <div className="space-y-2">
                    <div className="flex justify-between items-end">
                       <div className="flex items-center gap-2 font-medium text-sm"><Eye className="w-4 h-4 text-muted-foreground"/> Color Contrast</div>
                       <span className="font-mono text-xs text-primary">100%</span>
                    </div>
                    <Progress value={100} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">Foreground components exceed 4.5:1 ratio threshold.</p>
                 </div>
             </div>
          </div>

          <div className="glass-panel p-6 rounded-3xl">
             <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
               <MousePointerClick className="w-5 h-5 text-primary" /> Active Enhancements
             </h2>
             <div className="space-y-4">
                <div className="p-4 rounded-xl bg-background/50 border border-white/5 flex gap-4">
                    <div className="mt-1">
                        <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    </div>
                    <div>
                        <h4 className="font-semibold text-sm">Reduced Motion Support</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                            Platform respects `prefers-reduced-motion` to disable complex Framer Motion animations gracefully for sensitive users.
                        </p>
                    </div>
                </div>
                <div className="p-4 rounded-xl bg-background/50 border border-white/5 flex gap-4">
                    <div className="mt-1">
                        <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    </div>
                    <div>
                        <h4 className="font-semibold text-sm">Accessible Visualizations</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                            Recharts components are configured with semantic summaries, tooltips, and alternative data tables for tabular data consumption.
                        </p>
                    </div>
                </div>
                 <div className="p-4 rounded-xl bg-background/50 border border-white/5 flex gap-4">
                    <div className="mt-1">
                        <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    </div>
                    <div>
                        <h4 className="font-semibold text-sm">Focus Management</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                            Modals retain focus traps, and logical ordering is maintained during single-page application route transitions.
                        </p>
                    </div>
                </div>
             </div>
          </div>

      </div>
    </div>
  );
}
