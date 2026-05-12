import { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db, auth, handleFirestoreError, OperationType } from '@/lib/firebase';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { TrendingUp, Zap, Sparkles, Activity, Cpu, ArrowUpRight } from 'lucide-react';

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
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'users/{userId}/optimizations');
    });

    return () => unsubscribe();
  }, []);

  const totalInput = stats.reduce((acc, s) => acc + (s.inputTokens || 0), 0);
  const avgReduction = totalInput ? Math.round((totalSaved / totalInput) * 100) : 0;
  const estimatedSavings = (totalSaved / 1000000) * 1.25;

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
    <div className="space-y-12 pb-20">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-end justify-between"
      >
        <div>
          <h1 className="text-5xl font-black tracking-tighter text-white uppercase mb-2">Network <span className="text-primary text-glow">Overview</span></h1>
          <p className="text-muted-foreground/80 font-medium tracking-extrawide uppercase text-[10px]">Realtime Token Economics & Model Efficiency</p>
        </div>
        <div className="flex gap-4">
           <div className="glass-panel px-6 py-2 rounded-2xl flex items-center gap-3">
              <Activity className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-extrawide text-white/60">Telemetry Active</span>
           </div>
        </div>
      </motion.div>

      {/* Hero Metric Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 glass-panel p-10 rounded-colossal relative overflow-hidden group border-white/5 shadow-2xl"
        >
          <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
            <Sparkles className="w-64 h-64 text-primary" />
          </div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary mb-8">
               <TrendingUp className="w-3 h-3" />
               <span className="text-[10px] font-black uppercase tracking-wider">Efficiency Leaderboard</span>
            </div>
            <h2 className="text-[100px] font-black text-white leading-none tracking-tighter mb-4">
              {avgReduction}% <span className="text-primary">SAVED</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-lg leading-relaxed font-medium">
              Average token reduction across all infrastructure runs. Preserving intent while shattering syntax.
            </p>
          </div>
          <div className="absolute bottom-0 right-0 p-10">
             <ArrowUpRight className="w-12 h-12 text-primary opacity-20 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-panel p-10 rounded-colossal relative overflow-hidden flex flex-col justify-between border-white/5 bg-gradient-to-br from-primary/5 to-transparent shadow-2xl"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-sm font-black uppercase tracking-extrawide text-muted-foreground/60 mb-2">Cost Mitigation</h3>
            <div className="text-5xl font-black text-white tracking-tighter mb-4">${estimatedSavings.toFixed(2)}</div>
          </div>
          <div className="space-y-4">
             <div className="h-[1px] bg-white/5 w-full" />
             <p className="text-xs text-muted-foreground font-medium uppercase tracking-extrawide">Cumulative ROI: 12.4x</p>
          </div>
        </motion.div>
      </div>

      {/* Grid of Secondary Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Sparkles, title: "Model Uptime", value: "99.98%", desc: "Neural path reliability" }
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + (i * 0.1) }}
            className="glass-panel p-8 rounded-3xl group hover:border-primary/20 transition-all cursor-default"
          >
            <stat.icon className="w-5 h-5 text-primary/40 group-hover:text-primary transition-colors mb-4" />
            <div className="text-xs font-black uppercase tracking-extrawide text-muted-foreground mb-2">{stat.title}</div>
            <div className="text-2xl font-black text-white tracking-tighter mb-2">{stat.value}</div>
            <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-extrawide">{stat.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Large Chart Area */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-panel p-10 rounded-[3rem] border-white/5 relative overflow-hidden h-[500px] flex flex-col"
      >
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Savings Velocity</h2>
            <p className="text-xs text-muted-foreground uppercase tracking-extrawide font-bold">Cumulative mitigation across temporal dimensions</p>
          </div>
          <div className="flex gap-4">
             <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-[10px] font-black uppercase tracking-extrawide text-white/60">Optimized Tokens</span>
             </div>
          </div>
        </div>

        <div className="flex-1 w-full relative">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSaved" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                <XAxis dataKey="run" hide />
                <YAxis stroke="rgba(255,255,255,0.2)" fontSize={10} fontWeight="bold" axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0,0,0,0.8)', 
                    borderColor: 'rgba(255,255,255,0.1)', 
                    borderRadius: '16px', 
                    backdropFilter: 'blur(16px)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                  }}
                  itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase' }}
                />
                <Area type="monotone" dataKey="saved" stroke="var(--primary)" strokeWidth={4} fillOpacity={1} fill="url(#colorSaved)" />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center border border-dashed border-white/5 rounded-3xl">
              <p className="text-[10px] uppercase tracking-ultra text-muted-foreground font-black animate-pulse">Waiting for Data Ingestion...</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
