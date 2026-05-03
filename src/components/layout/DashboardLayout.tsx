import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { AccessibilityCommandPalette } from './AccessibilityCommandPalette';

export default function DashboardLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar className="w-64 hidden md:flex" />
      <main className="flex-1 overflow-y-auto w-full relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="container mx-auto p-6 md:p-8 relative z-10 h-full max-w-7xl">
          <Outlet />
        </div>
      </main>
      <AccessibilityCommandPalette />
    </div>
  );
}
