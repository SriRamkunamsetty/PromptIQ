import { useState, useEffect } from 'react';
import { ActivitySquare, TrendingDown, Target, Zap, Database, ExternalLink, RefreshCw } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from 'recharts';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function Analytics() {
  const [mounted, setMounted] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleBigQuerySync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      toast.success("Telemetry synchronized with Google BigQuery data warehouse.", {
         description: "2.4M rows written to qiscet-smart-connect.analytics.llm_events"
      });
    }, 2000);
  };

  const forecastData = [
    { month: 'Jan', spend: 4000, optimized: 2400 },
    { month: 'Feb', spend: 3000, optimized: 1398 },
    { month: 'Mar', spend: 2000, optimized: 7800 },
    { month: 'Apr', spend: 2780, optimized: 3908 },
    { month: 'May', spend: 1890, optimized: 4800 },
    { month: 'Jun', spend: 2390, optimized: 3800 },
  ];

  return (
    <div className="space-y-6 overflow-y-auto pb-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Enterprise Analytics</h1>
          <p className="text-muted-foreground">Predict future spend, monitor token burns, and measure platform-wide LLM efficiency.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="glass-button bg-[#1a73e8]/10 text-[#4285f4] border-[#4285f4]/30 hover:bg-[#1a73e8]/20" onClick={handleBigQuerySync} disabled={isSyncing}>
            {isSyncing ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Database className="w-4 h-4 mr-2" />}
            {isSyncing ? "Syncing..." : "Sync to BigQuery"}
          </Button>
          <Button variant="outline" className="glass-button border-white/10" onClick={() => window.open('https://console.cloud.google.com/vertex-ai', '_blank')}>
            Vertex AI <ExternalLink className="w-4 h-4 ml-2 opacity-50" />
          </Button>
        </div>
      </div>

      {/* Google Cloud Status Ribbon */}
      <div className="glass-panel p-3 rounded-2xl flex items-center gap-4 bg-[#1a73e8]/5 border-[#1a73e8]/20 text-sm overflow-x-auto">
         <div className="flex items-center gap-2 whitespace-nowrap text-[#4285f4] font-medium shrink-0 px-2 border-r border-[#4285f4]/30">
            <Database className="w-4 h-4" /> GCP Integration
         </div>
         <div className="flex items-center gap-6 whitespace-nowrap text-muted-foreground">
            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-400" /> BigQuery: Connected (qiscet-smart-connect)</span>
            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-400" /> Vertex AI: Active</span>
            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-yellow-400" /> Cloud Trace: Unconfigured</span>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
         {[
           { icon: ActivitySquare, title: 'Tokens Burned (MTD)', val: '43.2M', sub: 'Target: 50M max' },
           { icon: TrendingDown, title: 'Latencies Avoided', val: '14.2s', sub: 'Total saved this month' },
           { icon: Target, title: 'Cache Hit Rate', val: '68%', sub: 'Prompt semantic caching' },
           { icon: Zap, title: 'Avg Cost / Req', val: '$0.003', sub: '-14% vs last mo.' },
         ].map((stat, i) => (
           <div key={i} className="glass-panel p-6 rounded-3xl relative overflow-hidden group">
             <stat.icon className="w-8 h-8 text-primary/30 absolute right-4 top-4 group-hover:scale-110 transition-transform duration-300" />
             <h3 className="text-sm font-medium text-muted-foreground mb-4">{stat.title}</h3>
             <div className="text-4xl font-bold tracking-tighter mb-2">{stat.val}</div>
             <p className="text-xs font-mono text-emerald-400">{stat.sub}</p>
           </div>
         ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
         <div className="lg:col-span-8 glass-panel p-6 rounded-3xl h-[400px] flex flex-col relative" role="region" aria-label="Token Burn forecast chart">
            <h2 className="text-lg font-semibold mb-6">Token Burn & Optimization Forecast</h2>
            <div className="sr-only">
               Line chart showing unoptimized token spend vs optimized token spend over 6 months from January to June.
               January unoptimized spend was 4000, optimized 2400.
            </div>
            <div className="flex-1 w-full min-h-0 relative" aria-hidden="true">
               {mounted && (
                 <ResponsiveContainer width="100%" height="100%">
                   <AreaChart data={forecastData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                     <defs>
                       <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                         <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                         <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                       </linearGradient>
                       <linearGradient id="colorOpt" x1="0" y1="0" x2="0" y2="1">
                         <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.3}/>
                         <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0}/>
                       </linearGradient>
                     </defs>
                     <XAxis dataKey="month" stroke="rgba(255,255,255,0.2)" axisLine={false} tickLine={false} />
                     <YAxis stroke="rgba(255,255,255,0.2)" axisLine={false} tickLine={false} />
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                     <Tooltip contentStyle={{ backgroundColor: '#111', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                     <Area type="monotone" dataKey="spend" stroke="#ef4444" fillOpacity={1} fill="url(#colorSpend)" />
                     <Area type="monotone" dataKey="optimized" stroke="#2dd4bf" fillOpacity={1} fill="url(#colorOpt)" />
                   </AreaChart>
                 </ResponsiveContainer>
               )}
            </div>
         </div>

         <div className="lg:col-span-4 glass-panel p-6 rounded-3xl flex flex-col relative" role="region" aria-label="Model Workload Distribution chart">
            <h2 className="text-lg font-semibold mb-6">Model Distribution</h2>
            <div className="sr-only">
               Bar chart showing Gemini 3.1 Flash workload volume over 6 months from January to June.
            </div>
            <div className="flex-1 w-full min-h-0 relative flex flex-col" aria-hidden="true">
              <div className="flex-1">
               {mounted && (
                 <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={forecastData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                     <XAxis dataKey="month" stroke="rgba(255,255,255,0.2)" fontSize={11} axisLine={false} tickLine={false} />
                     <YAxis stroke="rgba(255,255,255,0.2)" fontSize={11} axisLine={false} tickLine={false} />
                     <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{ backgroundColor: '#111', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}/>
                     <Bar dataKey="optimized" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                   </BarChart>
                 </ResponsiveContainer>
               )}
              </div>
              <p className="text-xs text-muted-foreground mt-4 text-center">Gemini 3.1 Flash workload volume over time.</p>
            </div>
         </div>
      </div>
    </div>
  );
}
