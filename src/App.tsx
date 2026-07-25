// アプリケーションメインエントリー・レイアウト
import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { DailyInput } from './components/DailyInput';
import { Dashboard } from './components/Dashboard';
import { Jobs } from './components/Jobs';
import { Analytics } from './components/Analytics';
import { KnowledgeComponent } from './components/Knowledge';
import { Templates } from './components/Templates';
import { AdminPanel } from './components/AdminPanel';
import { StaffSelectionModal } from './components/StaffSelectionModal';
import { AdminAuthModal } from './components/AdminAuthModal';
import { UsageGuideModal } from './components/UsageGuideModal';

const MainContent: React.FC = () => {
  const { currentView } = useApp();

  const renderView = () => {
    switch (currentView) {
      case 'daily_input':
        return <DailyInput />;
      case 'dashboard':
        return <Dashboard />;
      case 'jobs':
        return <Jobs />;
      case 'analytics':
        return <Analytics />;
      case 'knowledge':
        return <KnowledgeComponent />;
      case 'templates':
        return <Templates />;
      case 'admin_staff':
      case 'admin_jobs':
      case 'admin_results':
      case 'admin_audit':
      case 'admin_data':
      case 'admin_settings':
        return <AdminPanel />;
      default:
        return <DailyInput />;
    }
  };

  return (
    <div className="app-layout">
      <Header />
      <div className="app-body">
        <Sidebar />
        <main className="app-main-content">{renderView()}</main>
      </div>

      {/* グローバルモーダル */}
      <StaffSelectionModal />
      <AdminAuthModal />
      <UsageGuideModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
