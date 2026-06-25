import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Accessibility, Eye, ZapOff, Command, Keyboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

export function AccessibilityCommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      document.documentElement.classList.add('reduced-motion');
    } else {
      document.documentElement.classList.remove('reduced-motion');
    }
  }, [reducedMotion]);

  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [highContrast]);

  return (
    <>
      <Button 
        variant="ghost" 
        size="icon" 
        className="fixed bottom-6 left-6 z-50 rounded-full w-12 h-12 bg-card/50 backdrop-blur-md border border-white/10 hover:bg-card shadow-lg"
        onClick={() => setIsOpen(true)}
      >
        <Accessibility className="w-5 h-5 text-primary" />
        <span className="sr-only">Accessibility Menu</span>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed bottom-24 left-6 z-50 w-80 glass-panel rounded-3xl p-6 shadow-2xl border border-white/20"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Accessibility className="w-5 h-5 text-primary" /> Accessibility
                </h3>
                <div className="text-xs text-muted-foreground flex items-center gap-1 bg-white/5 px-2 py-1 rounded">
                  <Command className="w-3 h-3" /> K
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-medium flex items-center gap-2">
                      <ZapOff className="w-4 h-4 text-emerald-400" /> Reduced Motion
                    </span>
                    <span className="text-xs text-muted-foreground">Disable all UI animations</span>
                  </div>
                  <Switch checked={reducedMotion} onCheckedChange={setReducedMotion} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-medium flex items-center gap-2">
                      <Eye className="w-4 h-4 text-emerald-400" /> High Contrast
                    </span>
                    <span className="text-xs text-muted-foreground">Increase text legibility</span>
                  </div>
                  <Switch checked={highContrast} onCheckedChange={setHighContrast} />
                </div>

                <div className="pt-4 border-t border-white/10">
                   <div className="text-xs text-muted-foreground mb-3 flex items-center gap-2 font-medium">
                      <Keyboard className="w-4 h-4" /> Keyboard Shortcuts
                   </div>
                   <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center text-xs">
                         <span>Toggle Menu</span>
                         <span className="bg-white/10 px-2 py-1 rounded font-mono">Cmd + K</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                         <span>Focus Main Content</span>
                         <span className="bg-white/10 px-2 py-1 rounded font-mono">Tab</span>
                      </div>
                   </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
