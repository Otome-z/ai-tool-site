<template>
  <div class="layout-page">
    <el-container class="layout-container">
      <el-aside width="220px" class="layout-aside">
        <div class="brand">AI Tool Site</div>
        <el-menu
          :default-active="route.path"
          router
          class="side-menu"
        >
          <el-menu-item index="/home">首页</el-menu-item>
          <el-menu-item index="/ai-watermark">AI去水印</el-menu-item>
          <el-menu-item index="/profile">个人中心</el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header class="layout-header">
          <div class="user-actions">
            <el-avatar :size="32">
              {{ avatarText }}
            </el-avatar>
            <span class="user-name">{{ displayName }}</span>
            <el-button type="danger" plain size="small" @click="onLogout">
              退出
            </el-button>
          </div>
        </el-header>
        <el-main class="layout-main">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ElMessage } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const displayName = computed(() => authStore.user?.email || '未登录');
const avatarText = computed(() => displayName.value.slice(0, 1).toUpperCase());

async function onLogout() {
  await authStore.logout();
  ElMessage.success('已退出登录');
  await router.push('/login');
}
</script>

<style scoped>
.layout-page {
  min-height: 100vh;
}

.layout-container {
  min-height: 100vh;
}

.layout-aside {
  border-right: 1px solid #e5e7eb;
  background: #ffffff;
}

.brand {
  height: 56px;
  padding: 0 16px;
  font-size: 18px;
  font-weight: 700;
  color: #111827;
  display: flex;
  align-items: center;
}

.side-menu {
  border-right: none;
}

.layout-header {
  border-bottom: 1px solid #e5e7eb;
  background: #ffffff;
  display: flex;
  align-items: center;
  padding: 0 16px;
}

.user-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-name {
  color: #111827;
  font-size: 14px;
}

.layout-main {
  background: #f5f7fa;
  padding: 20px;
}
</style>
