import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import DashboardView from '../views/DashboardView.vue';
import HomeView from '../views/HomeView.vue';
import MainLayoutView from '../views/MainLayoutView.vue';
import AiWatermarkView from '../views/AiWatermarkView.vue';
import { useAuthStore } from '../stores/auth';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: MainLayoutView,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          redirect: '/home'
        },
        {
          path: 'home',
          name: 'home',
          component: HomeView
        },
        {
          path: 'ai-watermark',
          name: 'ai-watermark',
          component: AiWatermarkView
        },
        {
          path: 'profile',
          name: 'profile',
          component: DashboardView
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    }
  ]
});

router.beforeEach(async (to) => {
  const authStore = useAuthStore();

  if (!authStore.user) {
    await authStore.ensureSessionChecked();
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return { name: 'login' };
  }

  if ((to.name === 'login' || to.name === 'register') && authStore.isAuthenticated) {
    return { name: 'home' };
  }

  return true;
});

export default router;
