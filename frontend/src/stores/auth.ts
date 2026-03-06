import { defineStore } from 'pinia';
import { getMe, login, logout, register } from '../api/auth';
import type { AuthUser } from '../types/auth';

interface AuthState {
  user: AuthUser | null;
  loading: boolean;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    loading: false
  }),
  getters: {
    isAuthenticated: (state) => Boolean(state.user)
  },
  actions: {
    async register(email: string, password: string) {
      this.loading = true;
      try {
        this.user = await register({ email, password });
      } finally {
        this.loading = false;
      }
    },
    async login(email: string, password: string) {
      this.loading = true;
      try {
        this.user = await login({ email, password });
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
    async logout() {
      await logout();
      this.user = null;
    }
  }
});
