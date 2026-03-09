import { defineStore } from 'pinia';
import { getMe, login, logout, register } from '../api/auth';
import type { AuthUser } from '../types/auth';

interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  sessionChecked: boolean;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    loading: false,
    sessionChecked: false
  }),
  getters: {
    isAuthenticated: (state) => Boolean(state.user)
  },
  actions: {
    async register(email: string, password: string) {
      this.loading = true;
      try {
        this.user = await register({ email, password });
        this.sessionChecked = true;
      } finally {
        this.loading = false;
      }
    },
    async login(email: string, password: string) {
      this.loading = true;
      try {
        this.user = await login({ email, password });
        this.sessionChecked = true;
      } finally {
        this.loading = false;
      }
    },
    async fetchMe() {
      try {
        this.user = await getMe();
      } catch {
        this.user = null;
      }
    },
    async ensureSessionChecked() {
      if (this.sessionChecked) {
        return;
      }
      this.sessionChecked = true;
      await this.fetchMe();
    },
    async logout() {
      await logout();
      this.user = null;
      this.sessionChecked = true;
    }
  }
});
