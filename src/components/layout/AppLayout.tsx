import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50/30 overflow-hidden">
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-100/40 to-purple-100/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-100/30 to-indigo-100/20 rounded-full blur-3xl"></div>
      </div>

      {/* Sidebar: fixed on all screens */}
      <div className="fixed inset-y-0 left-0 z-30">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>

      {/* Header: fixed at top */}
      <div className="fixed top-0 right-0 left-0 lg:left-64 z-20">
        <Header setSidebarOpen={setSidebarOpen} />
      </div>

      {/* Main content wrapper */}
      <div className="lg:pl-64 pt-16">
        {/* Main content */}
        <main className="pb-8 min-h-screen overflow-auto">
          <div className="py-6 animate-slide-up">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
