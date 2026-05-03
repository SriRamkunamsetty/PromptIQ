import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';
import { useAuthStore } from './lib/store';
import LandingPage from './pages/LandingPage';
import DashboardLayout from './components/layout/DashboardLayout';
import MainDashboard from './pages/dashboard/MainDashboard';
import PromptOptimizer from './pages/dashboard/PromptOptimizer';
import ContextManager from './pages/dashboard/ContextManager';
import Benchmarks from './pages/dashboard/Benchmarks';
import PromptDebugger from './pages/dashboard/PromptDebugger';
import ModelRouter from './pages/dashboard/ModelRouter';
import Analytics from './pages/dashboard/Analytics';
import SystemArchitecture from './pages/dashboard/SystemArchitecture';
import SecurityDashboard from './pages/dashboard/SecurityDashboard';
import AccessibilityDashboard from './pages/dashboard/AccessibilityDashboard';

import SemanticFidelity from './pages/dashboard/SemanticFidelity';
import OptimizationReplay from './pages/dashboard/OptimizationReplay';
import AutonomousAgent from './pages/dashboard/AutonomousAgent';
import SemanticCache from './pages/dashboard/SemanticCache';
import RuntimeObservability from './pages/dashboard/RuntimeObservability';
import ProductionHealth from './pages/dashboard/ProductionHealth';
import CostForecasting from './pages/dashboard/CostForecasting';
import PromptVersioning from './pages/dashboard/PromptVersioning';
import CaseStudies from './pages/dashboard/CaseStudies';

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
          </Route>
        </Route>
      </Routes>
      <Toaster theme="dark" position="bottom-right" className="toast-glass" />
    </BrowserRouter>
  );
}
