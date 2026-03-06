<template>
  <div class="dashboard">
    <el-card class="dashboard-card">
      <template #header>
        <div class="header">
          <span>用户中心</span>
          <el-button type="danger" plain @click="onLogout">退出登录</el-button>
        </div>
      </template>
      <p>当前用户 ID：{{ authStore.user?.id }}</p>
      <p>当前邮箱：{{ authStore.user?.email }}</p>
      <p>注册时间：{{ authStore.user?.createdAt }}</p>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();

async function onLogout() {
  await authStore.logout();
  ElMessage.success('已退出登录');
  await router.push('/login');
}
</script>

<style scoped>
.dashboard {
  min-height: 100vh;
  padding: 24px;
}

.dashboard-card {
  max-width: 680px;
  margin: 0 auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
