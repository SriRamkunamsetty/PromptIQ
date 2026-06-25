import { TrendingUp, DollarSign, Target, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', projected: 45000, optimized: 28000 },
  { month: 'Feb', projected: 52000, optimized: 31000 },
  { month: 'Mar', projected: 61000, optimized: 35000 },
  { month: 'Apr', projected: 75000, optimized: 40000 },
  { month: 'May', projected: 89000, optimized: 44000 },
  { month: 'Jun', projected: 110000, optimized: 52000 },
];

export default function CostForecasting() {
  return (
    <div className="space-y-6 flex flex-col h-full overflow-y-auto pb-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Cost Forecasting</h1>
        <p className="text-muted-foreground">Enterprise API spend projection and infrastructure scaling simulations.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 shrink-0">
          <div className="glass-panel p-6 rounded-3xl flex flex-col justify-center">
             <div className="flex items-center gap-2 text-muted-foreground mb-4">
               <DollarSign className="w-5 h-5" />
               <h3 className="font-medium">Estimated Annual Savings</h3>
             </div>
             <div className="text-5xl font-black text-emerald-400 mb-2">$420,500</div>
             <p className="text-sm text-emerald-500/80">Based on current optimization rates</p>
          </div>
          
          <div className="glass-panel p-6 rounded-3xl flex flex-col justify-center">
             <div className="flex items-center gap-2 text-muted-foreground mb-4">
               <Target className="w-5 h-5" />
               <h3 className="font-medium">Inference Efficiency</h3>
             </div>
             <div className="text-5xl font-black text-primary mb-2">92<span className="text-2xl font-normal text-muted-foreground">%</span></div>
             <p className="text-sm text-primary/80">Cost-per-query reduction</p>
          </div>
          
          <div className="glass-panel p-6 rounded-3xl flex flex-col justify-center">
             <div className="flex items-center gap-2 text-muted-foreground mb-4">
               <TrendingUp className="w-5 h-5" />
               <h3 className="font-medium">Token Growth Trend</h3>
             </div>
             <div className="text-5xl font-black text-yellow-400 mb-2">+14<span className="text-2xl font-normal text-muted-foreground">%</span></div>
             <p className="text-sm text-yellow-500/80">Month over month total token volume</p>
          </div>
      </div>

      <div className="glass-panel flex-1 p-6 rounded-3xl min-h-[400px] flex flex-col relative" role="region" aria-label="Cost forecasting chart">
         <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" /> Projected Cost Savings
         </h2>
         <div className="sr-only">Chart comparing projected spend without PromptIQ versus optimized spend with PromptIQ over next 6 months.</div>
         <div className="flex-1 w-full relative" aria-hidden="true">
            <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                 <defs>
                   <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                     <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                   </linearGradient>
                   <linearGradient id="colorOptimized" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.3}/>
                     <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <XAxis dataKey="month" stroke="rgba(255,255,255,0.2)" fontSize={12} tickMargin={10} />
                 <YAxis stroke="rgba(255,255,255,0.2)" fontSize={12} tickFormatter={(val) => `$${val/1000}k`} />
                 <Tooltip 
                   contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                   itemStyle={{ color: '#fff' }}
                   formatter={(value: number) => `$${value.toLocaleString()}`}
                 />
                 <Area type="monotone" dataKey="projected" name="Projected Spend (No Optimizer)" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorProjected)" />
                 <Area type="monotone" dataKey="optimized" name="Optimized Spend" stroke="#2dd4bf" strokeWidth={3} fillOpacity={1} fill="url(#colorOptimized)" />
               </AreaChart>
            </ResponsiveContainer>
         </div>
      </div>

      <div className="glass-panel p-6 rounded-3xl mt-6 shrink-0 relative overflow-hidden">
         <h2 className="text-lg font-semibold mb-6">Optimization Impact Matrix</h2>
         <div className="overflow-x-auto">
           <table className="w-full text-sm text-left">
             <thead className="text-xs uppercase bg-white/5 text-muted-foreground">
               <tr>
                 <th className="px-6 py-4 rounded-tl-xl">Metric</th>
                 <th className="px-6 py-4">Without PromptIQ</th>
                 <th className="px-6 py-4">With PromptIQ</th>
                 <th className="px-6 py-4 rounded-tr-xl">Delta</th>
               </tr>
             </thead>
             <tbody>
               <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                 <td className="px-6 py-4 font-medium text-white">Monthly Tokens</td>
                 <td className="px-6 py-4 font-mono text-destructive">1.2B</td>
                 <td className="px-6 py-4 font-mono text-emerald-400">450M</td>
                 <td className="px-6 py-4 font-mono text-emerald-400">-62.5%</td>
               </tr>
               <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                 <td className="px-6 py-4 font-medium text-white">Monthly Cost</td>
                 <td className="px-6 py-4 font-mono text-destructive">$18,000</td>
                 <td className="px-6 py-4 font-mono text-emerald-400">$6,750</td>
                 <td className="px-6 py-4 font-mono text-emerald-400">-$11,250</td>
               </tr>
               <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                 <td className="px-6 py-4 font-medium text-white">P95 Latency</td>
                 <td className="px-6 py-4 font-mono text-destructive">850ms</td>
                 <td className="px-6 py-4 font-mono text-emerald-400">320ms</td>
                 <td className="px-6 py-4 font-mono text-emerald-400">-62.3%</td>
               </tr>
               <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                 <td className="px-6 py-4 font-medium text-white">Cache Hit Rate</td>
                 <td className="px-6 py-4 font-mono text-destructive">0%</td>
                 <td className="px-6 py-4 font-mono text-emerald-400">42%</td>
                 <td className="px-6 py-4 font-mono text-emerald-400">+42%</td>
               </tr>
               <tr className="hover:bg-white/5 transition-colors">
                 <td className="px-6 py-4 font-medium text-white rounded-bl-xl">Semantic Retention</td>
                 <td className="px-6 py-4 font-mono text-muted-foreground">-</td>
                 <td className="px-6 py-4 font-mono text-emerald-400">99.8%</td>
                 <td className="px-6 py-4 font-mono text-emerald-400"><span className="text-xs tracking-widest text-primary uppercase">VERIFIED</span></td>
               </tr>
             </tbody>
           </table>
         </div>
      </div>
    </div>
  );
}
