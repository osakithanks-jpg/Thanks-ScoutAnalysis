// サイドバーナビゲーション
import React from 'react';
import { useApp } from '../context/AppContext';
import {
  CalendarDays,
  LayoutDashboard,
  Briefcase,
  TrendingUp,
  BookMarked,
  FileText,
  UserCog,
  History,
  Database,
  Sliders,
  LogOut,
  HelpCircle,
  Users,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { currentView, setCurrentView, isAdminMode, setIsAdminMode, setIsStaffModalOpen, setIsUsageGuideOpen } =
    useApp();

  return (
    <aside className="app-sidebar">
      <div className="sidebar-section-title">メインメニュー</div>
      <nav className="sidebar-nav">
        <button
          className={`nav-item ${currentView === 'daily_input' ? 'active' : ''}`}
          onClick={() => setCurrentView('daily_input')}
        >
          <CalendarDays className="nav-icon" />
          <span>1. 本日の実績入力</span>
        </button>

        <button
          className={`nav-item ${currentView === 'dashboard' ? 'active' : ''}`}
          onClick={() => setCurrentView('dashboard')}
        >
          <LayoutDashboard className="nav-icon" />
          <span>2. ダッシュボード</span>
        </button>

        <button
          className={`nav-item ${currentView === 'jobs' ? 'active' : ''}`}
          onClick={() => setCurrentView('jobs')}
        >
          <Briefcase className="nav-icon" />
          <span>3. 求人</span>
        </button>

        <button
          className={`nav-item ${currentView === 'analytics' ? 'active' : ''}`}
          onClick={() => setCurrentView('analytics')}
        >
          <TrendingUp className="nav-icon" />
          <span>4. 分析</span>
        </button>

        <button
          className={`nav-item ${currentView === 'knowledge' ? 'active' : ''}`}
          onClick={() => setCurrentView('knowledge')}
        >
          <BookMarked className="nav-icon" />
          <span>5. 求人振り返り・ナレッジ</span>
        </button>

        <button
          className={`nav-item ${currentView === 'templates' ? 'active' : ''}`}
          onClick={() => setCurrentView('templates')}
        >
          <FileText className="nav-icon" />
          <span>6. スカウト文面</span>
        </button>
      </nav>

      {/* 管理者モード専用メニュー */}
      {isAdminMode && (
        <div className="admin-menu-block">
          <div className="sidebar-section-title admin-title">管理者専用メニュー</div>
          <nav className="sidebar-nav">
            <button
              className={`nav-item admin-item ${currentView === 'admin_staff' ? 'active' : ''}`}
              onClick={() => setCurrentView('admin_staff')}
            >
              <UserCog className="nav-icon" />
              <span>担当者管理</span>
            </button>

            <button
              className={`nav-item admin-item ${currentView === 'admin_jobs' ? 'active' : ''}`}
              onClick={() => setCurrentView('admin_jobs')}
            >
              <Briefcase className="nav-icon" />
              <span>求人マスタ管理</span>
            </button>

            <button
              className={`nav-item admin-item ${currentView === 'admin_results' ? 'active' : ''}`}
              onClick={() => setCurrentView('admin_results')}
            >
              <CalendarDays className="nav-icon" />
              <span>実績管理・修正</span>
            </button>

            <button
              className={`nav-item admin-item ${currentView === 'admin_audit' ? 'active' : ''}`}
              onClick={() => setCurrentView('admin_audit')}
            >
              <History className="nav-icon" />
              <span>変更履歴</span>
            </button>

            <button
              className={`nav-item admin-item ${currentView === 'admin_data' ? 'active' : ''}`}
              onClick={() => setCurrentView('admin_data')}
            >
              <Database className="nav-icon" />
              <span>データ管理・バックアップ</span>
            </button>

            <button
              className={`nav-item admin-item ${currentView === 'admin_settings' ? 'active' : ''}`}
              onClick={() => setCurrentView('admin_settings')}
            >
              <Sliders className="nav-icon" />
              <span>システム設定</span>
            </button>

            <button className="nav-item exit-admin" onClick={() => setIsAdminMode(false)}>
              <LogOut className="nav-icon" />
              <span>管理者モードを終了</span>
            </button>
          </nav>
        </div>
      )}

      <div className="sidebar-footer">
        <button className="btn-sidebar-sub" onClick={() => setIsStaffModalOpen(true)}>
          <Users className="icon-xs" />
          <span>担当者を切り替える</span>
        </button>
        <button className="btn-sidebar-sub" onClick={() => setIsUsageGuideOpen(true)}>
          <HelpCircle className="icon-xs" />
          <span>使い方画面</span>
        </button>
      </div>
    </aside>
  );
};
