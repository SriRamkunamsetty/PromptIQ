import { useSettingsStore } from '@/lib/settings/store';
import { SettingsService } from '@/lib/settings/service';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Monitor, Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';

export default function AppearanceSettings() {
  const { settings: { appearance } } = useSettingsStore();

  const handleUpdate = (updates: Partial<typeof appearance>) => {
    SettingsService.updateCategory('appearance', updates);
  };

  // Immediate effect to HTML tag for theme and scale
  useEffect(() => {
    const root = document.documentElement;
    if (appearance.theme === 'dark') {
      root.classList.add('dark');
    } else if (appearance.theme === 'light') {
      root.classList.remove('dark');
    } else {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }

    // Example CSS variable updates for real-time preview
    root.style.setProperty('--font-scaling', `${appearance.fontScaling}%`);
    root.style.setProperty('--neon-glow-opacity', `${appearance.neonGlow / 100}`);
    root.style.setProperty('--glass-blur', `${appearance.blurIntensity}px`);
  }, [appearance]);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-1">Appearance</h2>
        <p className="text-sm text-muted-foreground">Customize how the platform looks and feels.</p>
      </div>
      
      <div className="h-px bg-border/40 w-full" />

      <div className="space-y-6">
        <div className="space-y-4">
          <Label className="text-base">System Theme</Label>
          <RadioGroup 
            value={appearance.theme} 
            onValueChange={(val: any) => handleUpdate({ theme: val })}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {[
              { id: 'light', label: 'Light', icon: Sun },
              { id: 'dark', label: 'Dark', icon: Moon },
              { id: 'system', label: 'System', icon: Monitor },
            ].map(theme => (
              <Label
                key={theme.id}
                htmlFor={`theme-${theme.id}`}
                className={cn(
                  "flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all hover:bg-card/50",
                  appearance.theme === theme.id ? "border-primary bg-primary/5" : "border-border/40"
                )}
              >
                <RadioGroupItem value={theme.id} id={`theme-${theme.id}`} className="sr-only" />
                <theme.icon className={cn("w-6 h-6 mb-2", appearance.theme === theme.id ? "text-primary" : "text-muted-foreground")} />
                <span className="font-medium">{theme.label}</span>
              </Label>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-4 p-5 border border-border/40 rounded-xl bg-card/20">
          <div className="flex justify-between items-center">
            <div>
              <Label className="text-base">Glossymorphism Intensity</Label>
              <p className="text-sm text-muted-foreground">Adjust the glass effect opacity across panels.</p>
            </div>
            <span className="text-sm font-mono text-muted-foreground w-12 text-right">{appearance.glossymorphism}%</span>
          </div>
          <Slider 
            value={[appearance.glossymorphism]} 
            max={100} 
            step={5} 
            onValueChange={(vals) => handleUpdate({ glossymorphism: vals[0] })}
            className="w-full"
          />
        </div>

        <div className="space-y-4 p-5 border border-border/40 rounded-xl bg-card/20">
          <div className="flex justify-between items-center">
            <div>
              <Label className="text-base">Neon Glow Strength</Label>
              <p className="text-sm text-muted-foreground">Adjust the intensity of futuristic neon highlights.</p>
            </div>
            <span className="text-sm font-mono text-muted-foreground w-12 text-right">{appearance.neonGlow}%</span>
          </div>
          <Slider 
            value={[appearance.neonGlow]} 
            max={100} 
            step={5} 
            onValueChange={(vals) => handleUpdate({ neonGlow: vals[0] })}
            className="w-full"
          />
        </div>

        <div className="flex items-center justify-between p-5 border border-border/40 rounded-xl bg-card/20">
          <div className="space-y-0.5">
            <Label className="text-base">Compact Layout Mode</Label>
            <p className="text-sm text-muted-foreground">Reduce padding and margins to fit more data.</p>
          </div>
          <Switch 
            checked={appearance.compactMode}
            onCheckedChange={(val) => handleUpdate({ compactMode: val })}
          />
        </div>
      </div>
    </div>
  );
}
