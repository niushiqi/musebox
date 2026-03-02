import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { DashboardPage } from './pages/Dashboard';
import { TemplatesPage } from './pages/Templates';
import { SettingsPage } from './pages/Settings';

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'templates' | 'settings'>('dashboard');

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === 'dashboard' && (
        <DashboardPage 
          onNavigateToSettings={() => setActiveTab('settings')} 
          onNavigateToTemplates={() => setActiveTab('templates')}
        />
      )}
      {activeTab === 'templates' && <TemplatesPage />}
      {activeTab === 'settings' && <SettingsPage />}
    </Layout>
  );
}
