import { useSettingsStore } from '@/lib/settings/store';
import { SettingsService } from '@/lib/settings/service';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShieldCheck, KeyRound, Smartphone, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SecuritySettingsPanel() {
  const { settings: { security } } = useSettingsStore();

  const handleUpdate = (updates: Partial<typeof security>) => {
    SettingsService.updateCategory('security', updates);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-1">Security & Access</h2>
        <p className="text-sm text-muted-foreground">Manage organizational security, active sessions, and access keys.</p>
      </div>
      
      <div className="h-px bg-border/40 w-full" />

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-4 p-5 border border-border/40 rounded-xl bg-card/20">
          <Label className="text-base font-medium flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-primary" /> Cross-Device Sync
          </Label>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground leading-relaxed mr-4">
              Synchronize sessions and states seamlessly across desktop and mobile.
            </span>
            <Switch 
              checked={security.sessionManagement}
              onCheckedChange={(val) => handleUpdate({ sessionManagement: val })}
            />
          </div>
        </div>

        <div className="space-y-4 p-5 border border-border/40 rounded-xl bg-card/20">
          <Label className="text-base font-medium flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Audit Visibility
          </Label>
          <Select 
            value={security.auditVisibility} 
            onValueChange={(val: any) => handleUpdate({ auditVisibility: val })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Visibility level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="private">Private (Only Me)</SelectItem>
              <SelectItem value="team">Organizational (Team)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium mb-2">Workflow Security</h3>
        
        <div className="flex items-center justify-between p-5 border border-border/40 rounded-xl bg-card/20 hover:bg-card/30 transition-colors">
          <div className="space-y-0.5">
            <Label className="text-base text-foreground font-medium">Optimization Approval Mode</Label>
            <p className="text-sm text-muted-foreground max-w-[80%]">
              Require manual approval for AI prompt updates if cost change is estimated to increase by more than 10%.
            </p>
          </div>
          <Switch 
            checked={security.optimizationApprovalMode}
            onCheckedChange={(val) => handleUpdate({ optimizationApprovalMode: val })}
          />
        </div>

        <div className="flex items-center justify-between p-5 border border-border/40 rounded-xl bg-card/20 hover:bg-card/30 transition-colors">
          <div className="space-y-0.5">
            <Label className="text-base text-foreground font-medium text-amber-400">Suspicious Login Protection</Label>
            <p className="text-sm text-muted-foreground">
              Automatically revoke sessions if IP address rapidly changes across geographical boundaries.
            </p>
          </div>
          <Switch 
            checked={security.suspiciousLoginAlerts}
            onCheckedChange={(val) => handleUpdate({ suspiciousLoginAlerts: val })}
          />
        </div>
      </div>

      <div className="space-y-4 pt-4">
        <h3 className="text-lg font-medium mb-2">Access Credentials</h3>
        
        <div className="flex items-center justify-between p-5 border border-border/40 rounded-xl bg-card/10">
          <div className="flex flex-col gap-1">
            <Label className="text-base font-medium flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-muted-foreground" />
              API Key Management
            </Label>
            <p className="text-sm text-muted-foreground">
              {security.apiKeysConfigured ? 'Keys are actively configured and rotated' : 'No keys configured. Limited API feature access.'}
            </p>
          </div>
          <Button variant="outline" className="gap-2 shrink-0">
            Configure Keys
          </Button>
        </div>
        
        <div className="flex items-center justify-between p-5 border border-destructive/20 rounded-xl bg-destructive/5">
          <div className="flex flex-col gap-1">
            <Label className="text-base font-medium text-destructive flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Active Sessions
            </Label>
            <p className="text-sm text-muted-foreground">
              You are currently logged into {security.activeSessions} device{security.activeSessions !== 1 && 's'}. 
            </p>
          </div>
          <Button variant="destructive" className="shrink-0">
            Revoke All
          </Button>
        </div>
      </div>
    </div>
  );
}
