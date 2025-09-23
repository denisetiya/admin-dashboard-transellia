import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden lg:grid lg:grid-cols-[16rem_1fr] lg:grid-rows-[auto_1fr] lg:overflow-hidden">
      {/* Sidebar: overlay on mobile, static on desktop (left column) */}
      <div className="lg:row-span-2 lg:col-start-1 lg:col-end-2">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>

      {/* Header: top row, main column */}
      <div className="lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-2">
        <Header setSidebarOpen={setSidebarOpen} />
      </div>

      {/* Main content: bottom row, main column */}
      <main className="lg:col-start-2 lg:col-end-3 lg:row-start-2 lg:row-end-3 pb-8 min-w-0 lg:min-h-0 lg:overflow-auto">
        <div className="py-6 animate-slide-up">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};
