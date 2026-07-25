// 使い方画面モーダル
import React from 'react';
import { useApp } from '../context/AppContext';
import { BookOpen, X, CheckCircle, ShieldAlert, UserCheck } from 'lucide-react';

export const UsageGuideModal: React.FC = () => {
  const { isUsageGuideOpen, setIsUsageGuideOpen } = useApp();

  if (!isUsageGuideOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-card modal-lg">
        <div className="modal-header">
          <div className="title-row">
            <BookOpen className="icon-sm text-gold" />
            <h3 className="modal-title">サンクスパートナーズ スカウト実績管理・分析ツール 使い方ガイド</h3>
          </div>
          <button className="btn-close" onClick={() => setIsUsageGuideOpen(false)}>
            <X className="icon-sm" />
          </button>
        </div>

        <div className="guide-content-body">
          <section className="guide-section">
            <h4>1. ログイン不要・チーム共有運用の前提</h4>
            <p>
              本ツールは社内の信頼ベースで運用される実績共有システムです。ログイン認証は行いません。
              画面上で選択された担当者として日々のスカウト実績を入力します。端末のLocalStorageには現在選択している担当者IDなどの表示設定のみが保持されます。
            </p>
          </section>

          <section className="guide-section mt-3">
            <h4>2. 返信数の定義</h4>
            <ul>
              <li>
                <strong>総返信数:</strong> 辞退・条件不一致を含む、候補者から届いたすべての返信。
              </li>
              <li>
                <strong>有効返信数:</strong> 興味がある、面談希望、応募希望などの前向きな返信。
              </li>
              <li>※ 返信はスカウト送信日ではなく、返信が届いた当日に入力します。</li>
            </ul>
          </section>

          <section className="guide-section mt-3">
            <h4>3. 実績入力と自動保存</h4>
            <p>
              「本日の実績入力」画面では、数字の入力や「+1」「+5」「総返信+1」「有効返信+1」ボタンを押すと自動的にクラウドへ保存されます。
              フォーカスが外れた際や操作後に小さく「保存済み HH:mm」が表示されます。
            </p>
          </section>

          <section className="guide-section mt-3">
            <h4>4. 管理者モード</h4>
            <p>
              管理者モードのパスワードは <code>Thanks5877</code> です。
              画面右上の「管理者モード」ボタンから認証を行うと、担当者マスタ管理、求人登録、実績修正、全データバックアップ、全データリセットが可能になります。
            </p>
          </section>
        </div>

        <div className="modal-actions mt-4">
          <button className="btn-primary" onClick={() => setIsUsageGuideOpen(false)}>
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
};
