import { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Stat {
  savedTokens: number;
  inputTokens: number;
  outputTokens: number;
  createdAt: any;
}

export default function MainDashboard() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [totalSaved, setTotalSaved] = useState(0);

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, 'users', auth.currentUser.uid, 'optimizations'),
      orderBy('createdAt', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const records: Stat[] = [];
      let savedAcc = 0;
      snapshot.forEach(doc => {
        const data = doc.data() as Stat;
        records.push(data);
        savedAcc += data.savedTokens || 0;
      });
      setStats(records);
      setTotalSaved(savedAcc);
    });

    return () => unsubscribe();
  }, []);

  // Format data for chart (cumulative savings)
  let accum = 0;
  const chartData = stats.map((stat, i) => {
    accum += (stat.savedTokens || 0);
    return {
      run: i + 1,
      saved: accum,
      tokens: stat.savedTokens,
    };
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Overview</h1>
        <p className="text-muted-foreground">Monitor your API usage, token savings, and model efficiency.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Total Token Savings", value: totalSaved.toLocaleString(), desc: "Across all optimization runs", trend: "up" },
          { title: "Estimated Savings", value: `$${((totalSaved / 1000000) * 1.25).toFixed(4)}`, desc: "Based on $1.25 / 1M tokens", trend: "up" },
          { title: "Optimizations", value: stats.length, desc: "Lifetime prompts compressed", trend: "neutral" },
          { title: "Avg. Token Reduction", value: stats.length ? `${Math.round(totalSaved / stats.map(s => s.inputTokens).reduce((a,b)=>a+b, 0) * 100)}%` : '0%', desc: "Per optimized prompt", trend: "down" }
        ].map((stat, i) => (
          <div key={i} className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                 {/* Visual sugar */}
                 <div className="w-12 h-12 rounded-full border-2 border-primary/50 border-r-transparent animate-spin" style={{ animationDuration: '3s'}} />
             </div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">{stat.title}</h3>
            <div className="text-3xl font-bold tracking-tight mb-2 text-gradient">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.desc}</p>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="grid gap-4 md:grid-cols-7 h-[400px]">
        <div className="md:col-span-5 glass-panel p-6 rounded-3xl flex flex-col">
          <h2 className="text-lg font-semibold mb-6">Cumulative Token Savings</h2>
          <div className="flex-1 w-full relative min-h-0">
             {chartData.length > 0 ? (
               <ResponsiveContainer width="100%" height="100%">
                 <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                    <XAxis dataKey="run" stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'rgba(20,20,30,0.8)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', backdropFilter: 'blur(8px)' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Line type="monotone" dataKey="saved" stroke="#38bdf8" strokeWidth={3} dot={{ r: 4, fill: '#38bdf8', strokeWidth: 0 }} activeDot={{ r: 6 }} />
                 </LineChart>
               </ResponsiveContainer>
             ) : (
                <div className="absolute inset-0 flex items-center justify-center border border-dashed border-border/50 rounded-xl">
                    <p className="text-muted-foreground text-sm">Run your first optimization to see data here.</p>
                </div>
             )}
          </div>
        </div>
        <div className="md:col-span-2 glass-panel p-6 rounded-3xl">
          <h2 className="text-lg font-semibold mb-6">Model Distribution</h2>
          <div className="space-y-6">
            {[
              { model: "Gemini 3.1 Pro", usage: 100, color: "bg-blue-500" },
              { model: "Gemini 3.1 Flash", usage: 0, color: "bg-cyan-400" },
              { model: "Other", usage: 0, color: "bg-indigo-500" }
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">{item.model}</span>
                  <span className="text-muted-foreground">{item.usage}%</span>
                </div>
                <div className="h-2 rounded-full bg-secondary/50 overflow-hidden">
                  <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.usage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
