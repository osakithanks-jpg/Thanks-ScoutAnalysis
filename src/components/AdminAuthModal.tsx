// 管理者パスワード入力モーダル
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { KeyRound, X, ShieldCheck } from 'lucide-react';

export const AdminAuthModal: React.FC = () => {
  const { isAdminAuthModalOpen, setIsAdminAuthModalOpen, setIsAdminMode } = useApp();
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isAdminAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setErrorMessage('パスワードを入力してください。');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      // Vercel Serverless Function (/api/admin-auth) に問い合わせ
      const response = await fetch('/api/admin-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        setIsAdminMode(true);
        setIsAdminAuthModalOpen(false);
        setPassword('');
      } else {
        // フォールバック: ローカル開発時の直接判定 (Thanks5877)
        if (password === 'Thanks5877') {
          setIsAdminMode(true);
          setIsAdminAuthModalOpen(false);
          setPassword('');
        } else {
          setErrorMessage('管理者パスワードが正しくありません。');
        }
      }
    } catch (err) {
      // ネット環境またはローカル直接実行のフォールバック
      if (password === 'Thanks5877') {
        setIsAdminMode(true);
        setIsAdminAuthModalOpen(false);
        setPassword('');
      } else {
        setErrorMessage('管理者パスワードが正しくありません。');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-card modal-sm">
        <div className="modal-header">
          <div className="title-row">
            <KeyRound className="icon-sm text-gold" />
            <h3 className="modal-title">管理者モードの認証</h3>
          </div>
          <button className="btn-close" onClick={() => setIsAdminAuthModalOpen(false)}>
            <X className="icon-sm" />
          </button>
        </div>

        <p className="modal-message">
          管理者メニューを開くには管理者パスワードを入力してください。
        </p>

        <form onSubmit={handleSubmit} className="admin-auth-form mt-3">
          <div className="form-group">
            <label>管理者パスワード</label>
            <input
              type="password"
              placeholder="パスワードを入力"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-text"
              autoFocus
            />
          </div>

          {errorMessage && <div className="error-message-text mt-2">{errorMessage}</div>}

          <div className="modal-actions mt-4">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setIsAdminAuthModalOpen(false)}
            >
              キャンセル
            </button>
            <button type="submit" className="btn-primary" disabled={isLoading}>
              {isLoading ? '認証中...' : '認証してオープン'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
