import { useSettingsStore } from '@/lib/settings/store';
import { SettingsService } from '@/lib/settings/service';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function AccessibilitySettingsPanel() {
  const { settings: { accessibility } } = useSettingsStore();

  const handleUpdate = (updates: Partial<typeof accessibility>) => {
    SettingsService.updateCategory('accessibility', updates);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-1">Accessibility</h2>
        <p className="text-sm text-muted-foreground">Adjust features to make the platform work best for you.</p>
      </div>
      
      <div className="h-px bg-border/40 w-full" />

      <div className="space-y-6">
        <div className="flex items-center justify-between p-5 border border-border/40 rounded-xl bg-card/20 hover:bg-card/30 transition-colors">
          <div className="space-y-0.5 w-[80%]">
            <Label className="text-base text-foreground font-medium flex items-center gap-2">
              Reduced Motion
            </Label>
            <p className="text-sm text-muted-foreground mr-6">
              Minimize animations and transitions. Framer Motion will instantly disable layout animations globally.
            </p>
          </div>
          <Switch 
            checked={accessibility.reducedMotion}
            onCheckedChange={(val) => handleUpdate({ reducedMotion: val })}
          />
        </div>

        <div className="flex items-center justify-between p-5 border border-border/40 rounded-xl bg-card/20 hover:bg-card/30 transition-colors">
          <div className="space-y-0.5 w-[80%]">
            <Label className="text-base text-foreground font-medium">High Contrast Mode</Label>
            <p className="text-sm text-muted-foreground">
              Increase contrast ratio of text and important UI borders. (Realtime UI switch)
            </p>
          </div>
          <Switch 
            checked={accessibility.highContrast}
            onCheckedChange={(val) => handleUpdate({ highContrast: val })}
          />
        </div>

        <div className="flex items-center justify-between p-5 border border-border/40 rounded-xl bg-card/20 hover:bg-card/30 transition-colors">
          <div className="space-y-0.5 w-[80%]">
            <Label className="text-base text-foreground font-medium">Enhanced Focus Indicators</Label>
            <p className="text-sm text-muted-foreground">
              Thicker, more prominent outlines when navigating via keyboard.
            </p>
          </div>
          <Switch 
            checked={accessibility.focusEnhancement}
            onCheckedChange={(val) => handleUpdate({ focusEnhancement: val })}
          />
        </div>

        <div className="space-y-4 p-5 border border-border/40 rounded-xl bg-card/20">
          <div className="flex justify-between items-center">
            <div>
              <Label className="text-base text-foreground font-medium">Font Size Scaling</Label>
              <p className="text-sm text-muted-foreground">Globally scale up Typography.</p>
            </div>
            <span className="text-sm font-mono text-muted-foreground w-12 text-right">{accessibility.fontSizeScaling}%</span>
          </div>
          <Slider 
            value={[accessibility.fontSizeScaling]} 
            max={150} 
            min={90}
            step={5} 
            onValueChange={(vals) => handleUpdate({ fontSizeScaling: vals[0] })}
            className="w-full"
          />
        </div>

        <div className="space-y-3 p-5 border border-border/40 rounded-xl bg-card/20">
          <Label className="text-base text-foreground font-medium">Colorblind Filter</Label>
          <div className="pt-2">
            <Select 
              value={accessibility.colorblindMode} 
              onValueChange={(val: any) => handleUpdate({ colorblindMode: val })}
            >
              <SelectTrigger className="w-full sm:w-[280px]">
                <SelectValue placeholder="Select mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Default (None)</SelectItem>
                <SelectItem value="protanomaly">Protanomaly (Red-weak)</SelectItem>
                <SelectItem value="deuteranomaly">Deuteranomaly (Green-weak)</SelectItem>
                <SelectItem value="tritanomaly">Tritanomaly (Blue-weak)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
