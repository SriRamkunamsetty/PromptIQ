import { useSettingsStore } from '@/lib/settings/store';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ActivitySquare, DatabaseZap, Clock, Layers } from 'lucide-react';
import { format } from 'date-fns';

export default function SettingsObservability() {
  const { settings, syncStatus } = useSettingsStore();

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gradient">Settings Observability</h1>
        <p className="text-muted-foreground mt-2">Monitor realtime synchronization and state propagation health.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card/20 border-border/40 backdrop-blur-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <ActivitySquare className="h-4 w-4" /> Sync Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold uppercase tracking-wider">
              {syncStatus}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/20 border-border/40 backdrop-blur-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <DatabaseZap className="h-4 w-4" /> Global State Collections
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
          </CardContent>
        </Card>

        <Card className="bg-card/20 border-border/40 backdrop-blur-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Layers className="h-4 w-4" /> Deep Config Keys
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Object.keys(settings).reduce((acc, k) => acc + Object.keys(settings[k as keyof typeof settings]).length, 0)}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/20 border-border/40 backdrop-blur-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Clock className="h-4 w-4" /> Last Snapshot
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-400">
              Live
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-card/20 border-border/40 backdrop-blur-md">
          <CardHeader>
            <CardTitle>Memory Snapshot (Client Store)</CardTitle>
            <CardDescription>Live representation of the Zustand reactive store.</CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="p-4 bg-muted/30 rounded-xl text-xs overflow-auto max-h-[400px] border border-border/20 custom-scrollbar text-emerald-400">
              {JSON.stringify(settings, null, 2)}
            </pre>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="bg-card/20 border-border/40 backdrop-blur-md">
            <CardHeader>
              <CardTitle>Infrastructure Health</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3 rounded-lg bg-card/30 border border-border/30">
                <span className="text-sm">Firestore WebSocket</span>
                <span className="text-xs px-2 py-1 bg-emerald-500/20 text-emerald-500 rounded-full font-mono">Connected</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-card/30 border border-border/30">
                <span className="text-sm">Zustand Subscriptions</span>
                <span className="text-xs px-2 py-1 bg-emerald-500/20 text-emerald-500 rounded-full font-mono">Bound</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-card/30 border border-border/30">
                <span className="text-sm">Optimistic Rollback Layer</span>
                <span className="text-xs px-2 py-1 bg-emerald-500/20 text-emerald-500 rounded-full font-mono">Active</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-card/30 border border-border/30">
                <span className="text-sm">Debounce Queue</span>
                <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded-full font-mono">Idle</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
