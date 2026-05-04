export interface AppearanceSettings {
  theme: 'light' | 'dark' | 'system';
  glossymorphism: number;
  blurIntensity: number;
  animationSpeed: 'fast' | 'normal' | 'slow';
  neonGlow: number;
  compactMode: boolean;
  fontScaling: number;
  sidebarDensity: 'comfortable' | 'compact';
  chartDensity: 'comfortable' | 'compact';
}

export interface AccessibilitySettings {
  reducedMotion: boolean;
  highContrast: boolean;
  screenReaderMode: boolean;
  focusEnhancement: boolean;
  fontSizeScaling: number;
  keyboardNavigation: boolean;
  simplifiedAnimations: boolean;
  colorblindMode: 'none' | 'protanomaly' | 'deuteranomaly' | 'tritanomaly';
}

export interface AISettings {
  defaultModel: string;
  optimizationAggressiveness: number;
  semanticPreservationThreshold: number;
  tokenBudgetLimit: number;
  cachePreferences: 'none' | 'local' | 'semantic';
  routingStrategy: 'cost' | 'latency' | 'quality';
  autoOptimization: boolean;
}

export interface NotificationSettings {
  emailNotifications: boolean;
  optimizationAlerts: boolean;
  securityAlerts: boolean;
  costSpikeAlerts: boolean;
  benchmarkAlerts: boolean;
  runtimeAnomalyAlerts: boolean;
  toastPreferences: 'all' | 'errors' | 'none';
  digest: 'daily' | 'weekly' | 'none';
}

export interface SecuritySettings {
  sessionManagement: boolean;
  activeSessions: number;
  deviceTracking: boolean;
  apiKeysConfigured: boolean;
  suspiciousLoginAlerts: boolean;
  optimizationApprovalMode: boolean;
  auditVisibility: 'private' | 'team';
}

export interface UserSettings {
  appearance: AppearanceSettings;
  accessibility: AccessibilitySettings;
  ai: AISettings;
  notifications: NotificationSettings;
  security: SecuritySettings;
}

export const defaultSettings: UserSettings = {
  appearance: {
    theme: 'dark',
    glossymorphism: 50,
    blurIntensity: 50,
    animationSpeed: 'normal',
    neonGlow: 50,
    compactMode: false,
    fontScaling: 100,
    sidebarDensity: 'comfortable',
    chartDensity: 'comfortable',
  },
  accessibility: {
    reducedMotion: false,
    highContrast: false,
    screenReaderMode: false,
    focusEnhancement: false,
    fontSizeScaling: 100,
    keyboardNavigation: false,
    simplifiedAnimations: false,
    colorblindMode: 'none',
  },
  ai: {
    defaultModel: 'gemini-3.1-pro-preview',
    optimizationAggressiveness: 50,
    semanticPreservationThreshold: 80,
    tokenBudgetLimit: 100000,
    cachePreferences: 'semantic',
    routingStrategy: 'latency',
    autoOptimization: false,
  },
  notifications: {
    emailNotifications: true,
    optimizationAlerts: true,
    securityAlerts: true,
    costSpikeAlerts: true,
    benchmarkAlerts: true,
    runtimeAnomalyAlerts: true,
    toastPreferences: 'all',
    digest: 'weekly',
  },
  security: {
    sessionManagement: true,
    activeSessions: 1,
    deviceTracking: true,
    apiKeysConfigured: false,
    suspiciousLoginAlerts: true,
    optimizationApprovalMode: false,
    auditVisibility: 'private',
  }
};
