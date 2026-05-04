import { useSettingsStore } from '@/lib/settings/store';
import { SettingsService } from '@/lib/settings/service';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function NotificationSettingsPanel() {
  const { settings: { notifications } } = useSettingsStore();

  const handleUpdate = (updates: Partial<typeof notifications>) => {
    SettingsService.updateCategory('notifications', updates);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-1">Notifications</h2>
        <p className="text-sm text-muted-foreground">Manage your alerts and daily digests.</p>
      </div>
      
      <div className="h-px bg-border/40 w-full" />

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-3 p-5 border border-border/40 rounded-xl bg-card/20">
          <Label className="text-base font-medium">In-App Toasts</Label>
          <Select 
            value={notifications.toastPreferences} 
            onValueChange={(val: any) => handleUpdate({ toastPreferences: val })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select preference" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All notifications</SelectItem>
              <SelectItem value="errors">Critical/Errors only</SelectItem>
              <SelectItem value="none">Mute all</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3 p-5 border border-border/40 rounded-xl bg-card/20">
          <Label className="text-base font-medium">Email Digest</Label>
          <Select 
            value={notifications.digest} 
            onValueChange={(val: any) => handleUpdate({ digest: val })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select digest freq" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily report</SelectItem>
              <SelectItem value="weekly">Weekly round-up</SelectItem>
              <SelectItem value="none">No digest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium mb-4">Event Alerts</h3>

        <div className="flex items-center justify-between p-4 border-b border-border/20">
          <Label className="font-medium">Optimization Results</Label>
          <Switch 
            checked={notifications.optimizationAlerts}
            onCheckedChange={(val) => handleUpdate({ optimizationAlerts: val })}
          />
        </div>

        <div className="flex items-center justify-between p-4 border-b border-border/20">
          <Label className="font-medium text-emerald-400">Benchmark Completions</Label>
          <Switch 
            checked={notifications.benchmarkAlerts}
            onCheckedChange={(val) => handleUpdate({ benchmarkAlerts: val })}
          />
        </div>

        <div className="flex items-center justify-between p-4 border-b border-border/20">
          <Label className="font-medium text-amber-400">Cost Spikes</Label>
          <Switch 
            checked={notifications.costSpikeAlerts}
            onCheckedChange={(val) => handleUpdate({ costSpikeAlerts: val })}
          />
        </div>

        <div className="flex items-center justify-between p-4 border-b border-border/20">
          <Label className="font-medium text-purple-400">Runtime Anomalies</Label>
          <Switch 
            checked={notifications.runtimeAnomalyAlerts}
            onCheckedChange={(val) => handleUpdate({ runtimeAnomalyAlerts: val })}
          />
        </div>

        <div className="flex items-center justify-between p-4 border-b border-border/20">
          <Label className="font-medium text-destructive">Security Breaches</Label>
          <Switch 
            checked={notifications.securityAlerts}
            onCheckedChange={(val) => handleUpdate({ securityAlerts: val })}
          />
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <div className="flex items-center justify-between p-5 border border-border/40 rounded-xl bg-card/20 w-full hover:bg-card/30 transition-colors">
          <div className="space-y-0.5">
            <Label className="text-base text-foreground font-medium">Master Email Switch</Label>
            <p className="text-sm text-muted-foreground">Toggle to pause all email communications.</p>
          </div>
          <Switch 
            checked={notifications.emailNotifications}
            onCheckedChange={(val) => handleUpdate({ emailNotifications: val })}
          />
        </div>
      </div>
    </div>
  );
}
