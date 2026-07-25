// ヘッダーコンポーネント
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserCheck, ShieldAlert, BookOpen, Bell, ArrowRightLeft, KeyRound } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentStaff,
    isAdminMode,
    setIsAdminMode,
    setIsStaffModalOpen,
    setIsAdminAuthModalOpen,
    setIsUsageGuideOpen,
  } = useApp();

  const [showSwitchConfirm, setShowSwitchConfirm] = useState(false);

  const handleStaffClick = () => {
    setShowSwitchConfirm(true);
  };

  const confirmSwitch = () => {
    setShowSwitchConfirm(false);
    setIsStaffModalOpen(true);
  };

  return (
    <header className="app-header">
      <div className="header-brand">
        <div className="brand-logo">SP</div>
        <div className="brand-titles">
          <h1 className="brand-title">サンクスパートナーズ</h1>
          <span className="brand-subtitle">スカウト実績管理・分析ツール</span>
        </div>
      </div>

      <div className="header-actions">
        {/* 使い方ボタン */}
        <button className="btn-header-action" onClick={() => setIsUsageGuideOpen(true)} title="使い方ガイド">
          <BookOpen className="icon-sm" />
          <span>使い方</span>
        </button>

        {/* 管理者モード切り替え */}
        {isAdminMode ? (
          <div className="admin-badge-active" onClick={() => setIsAdminMode(false)} title="クリックで管理者モード終了">
            <ShieldAlert className="icon-sm" />
            <span>管理者モード編集中</span>
          </div>
        ) : (
          <button className="btn-header-action admin-btn" onClick={() => setIsAdminAuthModalOpen(true)}>
            <KeyRound className="icon-sm" />
            <span>管理者モード</span>
          </button>
        )}

        {/* 担当者表示・切り替え */}
        <div className="staff-indicator-card" onClick={handleStaffClick} title="担当者を切り替える">
          <UserCheck className="icon-sm text-gold" />
          <span className="staff-label">担当者:</span>
          <span className="staff-name-highlight">{currentStaff ? currentStaff.name : '未選択'}</span>
          <ArrowRightLeft className="icon-xs text-muted" />
        </div>
      </div>

      {/* 担当者切り替え確認モーダル */}
      {showSwitchConfirm && (
        <div className="modal-backdrop">
          <div className="modal-card modal-sm">
            <h3 className="modal-title">担当者切替の確認</h3>
            <p className="modal-message">担当者を切り替えますか？未保存の入力がある場合は自動保存完了後に切り替わります。</p>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setShowSwitchConfirm(false)}>
                キャンセル
              </button>
              <button className="btn-primary" onClick={confirmSwitch}>
                切り替える
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
