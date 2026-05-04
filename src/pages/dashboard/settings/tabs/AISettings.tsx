import { useSettingsStore } from '@/lib/settings/store';
import { SettingsService } from '@/lib/settings/service';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BrainCircuit, Bolt, ShieldAlert } from 'lucide-react';

export default function AISettingsPanel() {
  const { settings: { ai } } = useSettingsStore();

  const handleUpdate = (updates: Partial<typeof ai>) => {
    SettingsService.updateCategory('ai', updates);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-1">AI & Operations</h2>
        <p className="text-sm text-muted-foreground">Configure global model routing, performance limits, and optimization rules.</p>
      </div>
      
      <div className="h-px bg-border/40 w-full" />

      <div className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-3 p-5 border border-border/40 rounded-xl bg-card/20">
            <Label className="text-base font-medium flex items-center gap-2">
              <BrainCircuit className="w-4 h-4 text-primary" /> Default Model
            </Label>
            <Select 
              value={ai.defaultModel} 
              onValueChange={(val) => handleUpdate({ defaultModel: val })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gemini-3.1-pro-preview">Gemini 3.1 Pro Preview</SelectItem>
                <SelectItem value="gemini-3-flash-preview">Gemini 3.0 Flash</SelectItem>
                <SelectItem value="gemini-2.5-flash">Gemini 2.5 Flash</SelectItem>
                <SelectItem value="gemini-2.0-pro">Gemini 2.0 Pro</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-2">Fallback model if dynamic routing fails.</p>
          </div>

          <div className="space-y-3 p-5 border border-border/40 rounded-xl bg-card/20">
            <Label className="text-base font-medium flex items-center gap-2">
              <Bolt className="w-4 h-4 text-emerald-500" /> Default Routing Strategy
            </Label>
            <Select 
              value={ai.routingStrategy} 
              onValueChange={(val: any) => handleUpdate({ routingStrategy: val })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select strategy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latency">Minimize Latency</SelectItem>
                <SelectItem value="cost">Minimize Cost</SelectItem>
                <SelectItem value="quality">Maximize Reasoning Quality</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-2">Used by the smart router globally.</p>
          </div>
        </div>

        <div className="space-y-6 p-6 border border-border/40 rounded-xl bg-card/20">
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <div>
                <Label className="text-base font-medium">Optimization Aggressiveness</Label>
                <p className="text-sm text-muted-foreground mt-1">Controls how tightly the optimizer compresses tokens.</p>
              </div>
              <span className="text-sm font-mono text-primary w-12 text-right">{ai.optimizationAggressiveness}%</span>
            </div>
            <Slider 
              value={[ai.optimizationAggressiveness]} 
              max={100} 
              step={5} 
              onValueChange={(vals) => handleUpdate({ optimizationAggressiveness: vals[0] })}
              className="w-full"
            />
          </div>

          <div className="h-px bg-border/40 w-full" />

          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <div>
                <Label className="text-base font-medium text-emerald-400">Semantic Preservation Threshold</Label>
                <p className="text-sm text-muted-foreground mt-1">Minimum similarity score allowed during compression updates.</p>
              </div>
              <span className="text-sm font-mono text-emerald-400 w-12 text-right">{ai.semanticPreservationThreshold}%</span>
            </div>
            <Slider 
              value={[ai.semanticPreservationThreshold]} 
              max={99} 
              min={50}
              step={1} 
              onValueChange={(vals) => handleUpdate({ semanticPreservationThreshold: vals[0] })}
              className="w-full"
            />
          </div>
        </div>

        <div className="flex items-center justify-between p-5 border border-border/40 rounded-xl bg-card/20 hover:bg-card/30 transition-colors">
          <div className="space-y-0.5 w-[80%]">
            <Label className="text-base text-foreground font-medium">Auto-Optimization Engine</Label>
            <p className="text-sm text-muted-foreground">
              Automatically trigger prompt optimizations in the background if semantic cache hit rates drop below 40%.
            </p>
          </div>
          <Switch 
            checked={ai.autoOptimization}
            onCheckedChange={(val) => handleUpdate({ autoOptimization: val })}
          />
        </div>

        <div className="space-y-3 p-5 border border-destructive/20 bg-destructive/5 rounded-xl">
          <Label className="text-base font-medium text-destructive flex items-center gap-2">
            <ShieldAlert className="w-4 h-4" /> Global Token Budget (Daily limit)
          </Label>
          <div className="pt-2 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Automatically halt heavy operations if rolling 24hr requests exceed budget.</p>
            <div className="flex items-center gap-2">
               <span className="font-mono text-lg">{ai.tokenBudgetLimit.toLocaleString()}</span>
               <span className="text-muted-foreground text-sm">tokens</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
