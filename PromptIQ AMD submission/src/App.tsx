import { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';
import { useAuthStore } from './lib/store';
import { SkipToContent } from './components/accessibility/SkipToContent';

// Lazy load components for efficiency
const LandingPage = lazy(() => import('./pages/LandingPage'));
const DashboardLayout = lazy(() => import('./components/layout/DashboardLayout'));
const MainDashboard = lazy(() => import('./pages/dashboard/MainDashboard'));
const PromptOptimizer = lazy(() => import('./pages/dashboard/PromptOptimizer'));
const ContextManager = lazy(() => import('./pages/dashboard/ContextManager'));
const Benchmarks = lazy(() => import('./pages/dashboard/Benchmarks'));
const PromptDebugger = lazy(() => import('./pages/dashboard/PromptDebugger'));
const ModelRouter = lazy(() => import('./pages/dashboard/ModelRouter'));
const Analytics = lazy(() => import('./pages/dashboard/Analytics'));
const SystemArchitecture = lazy(() => import('./pages/dashboard/SystemArchitecture'));
const SecurityDashboard = lazy(() => import('./pages/dashboard/SecurityDashboard'));
const AccessibilityDashboard = lazy(() => import('./pages/dashboard/AccessibilityDashboard'));
const SemanticFidelity = lazy(() => import('./pages/dashboard/SemanticFidelity'));
const OptimizationReplay = lazy(() => import('./pages/dashboard/OptimizationReplay'));
const AutonomousAgent = lazy(() => import('./pages/dashboard/AutonomousAgent'));
const SemanticCache = lazy(() => import('./pages/dashboard/SemanticCache'));
const RuntimeObservability = lazy(() => import('./pages/dashboard/RuntimeObservability'));
const ProductionHealth = lazy(() => import('./pages/dashboard/ProductionHealth'));
const CostForecasting = lazy(() => import('./pages/dashboard/CostForecasting'));
const PromptVersioning = lazy(() => import('./pages/dashboard/PromptVersioning'));
const CaseStudies = lazy(() => import('./pages/dashboard/CaseStudies'));
const SettingsPage = lazy(() => import('./pages/dashboard/settings/SettingsPage'));
const SettingsObservability = lazy(() => import('./pages/dashboard/settings/SettingsObservability'));

function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="animate-pulse flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-muted-foreground text-sm tracking-widest uppercase">Initializing</p>
      </div>
    </div>
  );
}

function ProtectedRoute() {
  const { user, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-muted-foreground text-sm tracking-widest uppercase">Initializing</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default function App() {
  // Force dark mode on html element
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <BrowserRouter>
      <SkipToContent />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<MainDashboard />} />
              <Route path="optimizer" element={<PromptOptimizer />} />
              <Route path="context" element={<ContextManager />} />
              <Route path="benchmarks" element={<Benchmarks />} />
              <Route path="debugger" element={<PromptDebugger />} />
              <Route path="router" element={<ModelRouter />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="system" element={<SystemArchitecture />} />
              <Route path="security" element={<SecurityDashboard />} />
              <Route path="accessibility" element={<AccessibilityDashboard />} />
              <Route path="fidelity" element={<SemanticFidelity />} />
              <Route path="replay" element={<OptimizationReplay />} />
              <Route path="agent" element={<AutonomousAgent />} />
              <Route path="cache" element={<SemanticCache />} />
              <Route path="runtime" element={<RuntimeObservability />} />
              <Route path="health" element={<ProductionHealth />} />
              <Route path="forecasting" element={<CostForecasting />} />
              <Route path="versioning" element={<PromptVersioning />} />
              <Route path="case-studies" element={<CaseStudies />} />
              
              {/* Settings */}
              <Route path="settings" element={<SettingsPage />} />
              <Route path="settings-observability" element={<SettingsObservability />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
      <Toaster theme="dark" position="bottom-right" className="toast-glass" />
    </BrowserRouter>
  );
}
