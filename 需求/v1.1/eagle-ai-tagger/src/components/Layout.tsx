import React from 'react';
import { LayoutDashboard, FileText, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: 'dashboard' | 'templates' | 'settings';
  onTabChange: (tab: 'dashboard' | 'templates' | 'settings') => void;
}

export function Layout({ children, activeTab, onTabChange }: LayoutProps) {
  const tabs = [
    { id: 'dashboard', label: '主面板', icon: LayoutDashboard },
    { id: 'templates', label: '提示词模板', icon: FileText },
    { id: 'settings', label: '设置', icon: Settings },
  ] as const;

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans flex flex-col">
      {/* Header / Navigation */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold text-stone-800">
            <div className="w-6 h-6 bg-indigo-600 rounded-md flex items-center justify-center text-white text-xs font-bold">
              AI
            </div>
            Eagle AI 标注助手
          </div>
          
          <nav className="flex items-center gap-1 bg-stone-100 p-1 rounded-lg">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all",
                  activeTab === tab.id
                    ? "bg-white text-indigo-600 shadow-sm"
                    : "text-stone-500 hover:text-stone-700 hover:bg-stone-200/50"
                )}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-3xl mx-auto w-full p-4 md:p-6">
        {children}
      </main>
    </div>
  );
}
