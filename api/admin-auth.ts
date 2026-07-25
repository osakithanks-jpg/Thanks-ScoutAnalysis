// Vercel Serverless Function: 管理者パスワード検証 API
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { password } = req.body || {};

  if (!password || typeof password !== 'string') {
    return res.status(400).json({ success: false, message: 'パスワードを入力してください。' });
  }

  // 環境変数 ADMIN_PASSWORD またはデフォルト値 Thanks5877
  const expectedPassword = process.env.ADMIN_PASSWORD || 'Thanks5877';

  // 完全一致判定 (大文字小文字区別・空白トリムなし)
  if (password === expectedPassword) {
    return res.status(200).json({
      success: true,
      message: '管理者認証に成功しました。',
      adminToken: 'thanks_admin_authenticated_' + Date.now(),
    });
  } else {
    return res.status(401).json({
      success: false,
      message: '管理者パスワードが正しくありません。',
    });
  }
}
