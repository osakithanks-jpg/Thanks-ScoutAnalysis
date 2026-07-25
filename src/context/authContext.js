// ユーザー認証およびセッション状態管理コンテキスト

import { dbService } from '../services/dbService.js';

class AuthContext {
  constructor() {
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser') || 'null');
    if (!this.currentUser) {
      // Default to initial admin user for effortless demo/testing
      const defaultUser = dbService.getUserById('user_admin_01');
      if (defaultUser && defaultUser.status === 'active') {
        this.setUser(defaultUser);
      }
    }
  }

  setUser(user) {
    this.currentUser = user;
    sessionStorage.setItem('currentUser', JSON.stringify(user));
  }

  login(email, password) {
    const users = dbService.getUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      throw new Error('メールアドレスまたはパスワードが正しくありません。');
    }

    if (user.status === 'disabled') {
      throw new Error('このアカウントは利用停止されています。管理者に問い合わせてください。');
    }

    this.setUser(user);
    return user;
  }

  logout() {
    this.currentUser = null;
    sessionStorage.removeItem('currentUser');
  }

  isAdmin() {
    return this.currentUser && this.currentUser.role === 'admin';
  }

  isMember() {
    return this.currentUser && this.currentUser.role === 'member';
  }
}

export const authContext = new AuthContext();
