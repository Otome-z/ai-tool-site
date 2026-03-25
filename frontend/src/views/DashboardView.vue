<template>
  <el-card class="dashboard-card">
    <template #header>
      <span>个人中心</span>
    </template>
    <p>当前用户 ID：{{ authStore.user?.id }}</p>
    <p>当前邮箱：{{ authStore.user?.email }}</p>
    <p>注册时间：{{ authStore.user?.createdAt }}</p>
  </el-card>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();
</script>

<style scoped>
.dashboard-card {
  max-width: 720px;
}
</style>
