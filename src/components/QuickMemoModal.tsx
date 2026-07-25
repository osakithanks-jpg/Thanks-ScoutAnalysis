// クイックメモ登録モーダル
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Job, Knowledge, KnowledgeTag } from '../types';
import { saveKnowledge } from '../services/storageService';
import { X, Tag, MessageSquare } from 'lucide-react';

interface QuickMemoModalProps {
  job: Job;
  onClose: () => void;
}

const AVAILABLE_TAGS: KnowledgeTag[] = [
  '媒体',
  '検索条件',
  '候補者像',
  '件名',
  '文面',
  '条件',
  '改善案',
  '成功事例',
  '苦戦要因',
];

export const QuickMemoModal: React.FC<QuickMemoModalProps> = ({ job, onClose }) => {
  const { currentStaff } = useApp();
  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState<KnowledgeTag[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const toggleTag = (tag: KnowledgeTag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !currentStaff) return;

    setIsSaving(true);
    const newMemo: Knowledge = {
      knowledgeId: 'memo_' + Date.now(),
      jobId: job.jobId,
      type: 'quick_memo',
      content: content.trim(),
      staffId: currentStaff.staffId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: selectedTags,
      isArchived: false,
      isPinned: false,
    };

    try {
      await saveKnowledge(newMemo);
      onClose();
    } catch (err) {
      console.error('Failed to save quick memo:', err);
      setIsSaving(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-card modal-md">
        <div className="modal-header">
          <div className="title-row">
            <MessageSquare className="icon-sm text-gold" />
            <h3 className="modal-title">クイックメモの登録</h3>
          </div>
          <button className="btn-close" onClick={onClose}>
            <X className="icon-sm" />
          </button>
        </div>

        <div className="job-context-badge">
          <span className="lbl">求人:</span> {job.companyName} / {job.jobTitle}
        </div>

        <form onSubmit={handleSubmit} className="quick-memo-form">
          <div className="form-group">
            <label>メモ本文（必須）</label>
            <textarea
              rows={4}
              placeholder="スカウト送信時の気づきや候補者からのレスポンス、改善案などを入力してください。"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="textarea-input"
            />
          </div>

          <div className="form-group">
            <label className="flex-align">
              <Tag className="icon-xs text-muted" /> 任意タグ
            </label>
            <div className="tags-selection-cloud">
              {AVAILABLE_TAGS.map((tag) => (
                <button
                  type="button"
                  key={tag}
                  className={`tag-chip ${selectedTags.includes(tag) ? 'active' : ''}`}
                  onClick={() => toggleTag(tag)}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose} disabled={isSaving}>
              キャンセル
            </button>
            <button type="submit" className="btn-primary" disabled={isSaving || !content.trim()}>
              {isSaving ? '保存中...' : 'メモを登録する'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
