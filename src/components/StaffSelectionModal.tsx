// 初回アクセス時・担当者選択画面 / モーダル
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserCheck, Plus, Shield } from 'lucide-react';
import { saveStaff } from '../services/storageService';
import { Staff } from '../types';

export const StaffSelectionModal: React.FC = () => {
  const { staffList, isStaffModalOpen, setCurrentStaffId, refreshData } = useApp();
  const [newStaffName, setNewStaffName] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [isAdminRole, setIsAdminRole] = useState(false);

  if (!isStaffModalOpen) return null;

  const activeStaffList = staffList.filter((s) => s.status === 'active');

  const handleSelect = (staffId: string) => {
    setCurrentStaffId(staffId);
  };

  const handleCreateStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaffName.trim()) return;

    const newStaff: Staff = {
      staffId: 'staff_' + Date.now(),
      name: newStaffName.trim(),
      status: 'active',
      adminRole: isAdminRole ? 'admin' : 'member',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await saveStaff(newStaff);
    await refreshData();
    setCurrentStaffId(newStaff.staffId);
    setNewStaffName('');
    setIsAdding(false);
  };

  return (
    <div className="modal-backdrop modal-staff-selection">
      <div className="modal-card modal-md">
        <div className="modal-header-centered">
          <div className="hotel-badge">サンクスパートナーズ 社内実績ツール</div>
          <h2 className="modal-title-lg">利用する担当者を選択してください</h2>
          <p className="modal-subtitle">
            本ツールは社内信頼ベースで運用しています。現在作業されるご自身の担当者名を選択してください。
          </p>
        </div>

        <div className="staff-selection-grid">
          {activeStaffList.length === 0 ? (
            <div className="empty-staff-notice">
              <p>利用可能な担当者が未登録です。以下のフォームから担当者を新規登録してください。</p>
            </div>
          ) : (
            activeStaffList.map((staff) => (
              <div key={staff.staffId} className="staff-card-option" onClick={() => handleSelect(staff.staffId)}>
                <div className="staff-card-avatar">{staff.name.slice(0, 1)}</div>
                <div className="staff-card-info">
                  <div className="staff-card-name">
                    {staff.name}
                    {staff.adminRole === 'admin' && <span title="管理者"><Shield className="icon-xs text-gold ml-1" /></span>}
                  </div>
                  <div className="staff-card-status">利用中</div>
                </div>
                <button className="btn-select-start">選択して開始する</button>
              </div>
            ))
          )}
        </div>

        {/* 担当者新規登録エリア */}
        {!isAdding ? (
          <div className="modal-footer-action">
            <button className="btn-secondary btn-full" onClick={() => setIsAdding(true)}>
              <Plus className="icon-sm" /> 担当者を新規追加登録する
            </button>
          </div>
        ) : (
          <form className="staff-add-form" onSubmit={handleCreateStaff}>
            <h4 className="form-subtitle">新しい担当者の登録</h4>
            <div className="form-group">
              <label>担当者氏名</label>
              <input
                type="text"
                placeholder="例：尾﨑 優理"
                value={newStaffName}
                onChange={(e) => setNewStaffName(e.target.value)}
                required
                className="input-text"
              />
            </div>
            <div className="form-checkbox">
              <label>
                <input
                  type="checkbox"
                  checked={isAdminRole}
                  onChange={(e) => setIsAdminRole(e.target.checked)}
                />
                管理者区分（管理者権限を付与する）
              </label>
            </div>
            <div className="form-actions-inline">
              <button type="button" className="btn-secondary" onClick={() => setIsAdding(false)}>
                キャンセル
              </button>
              <button type="submit" className="btn-primary">
                登録して選択
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
