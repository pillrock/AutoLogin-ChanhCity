import { ipcRenderer } from 'electron';

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  level: number;
}

class AuthService {
  private currentUser: User | null = null;

  async login(email: string, password: string): Promise<User> {
    return new Promise((resolve, reject) => {
      ipcRenderer
        .invoke('login', { email, password })
        .then((user) => {
          this.currentUser = user;
          resolve(user);
        })
        .catch(reject);
    });
  }

  async register(email: string, password: string, username: string): Promise<User> {
    return new Promise((resolve, reject) => {
      ipcRenderer
        .invoke('register', { email, password, username })
        .then((user) => {
          this.currentUser = user;
          resolve(user);
        })
        .catch(reject);
    });
  }

  async logout(): Promise<void> {
    return new Promise((resolve) => {
      ipcRenderer.invoke('logout').then(() => {
        this.currentUser = null;
        resolve();
      });
    });
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }
}

export const authService = new AuthService(); 