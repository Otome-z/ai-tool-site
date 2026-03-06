<template>
  <div class="auth-page">
    <el-card class="auth-card">
      <template #header>
        <span>登录</span>
      </template>
      <el-form ref="formRef" :model="form" :rules="rules" label-position="top" @submit.prevent="onSubmit">
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password" show-password placeholder="请输入密码" />
        </el-form-item>
        <el-button type="primary" :loading="authStore.loading" @click="onSubmit" class="full-btn">
          登录
        </el-button>
      </el-form>
      <div class="auth-footer">
        没有账号？
        <router-link to="/register">去注册</router-link>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus';
import { ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();
const formRef = ref<FormInstance>();
const form = reactive({
  email: '',
  password: ''
});

const rules: FormRules<typeof form> = {
  email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
};

async function onSubmit() {
  if (!formRef.value) return;
  const valid = await formRef.value.validate().catch(() => false);
  if (!valid) return;

  try {
    await authStore.login(form.email, form.password);
    ElMessage.success('登录成功');
    await router.push('/');
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : '登录失败';
    ElMessage.error(message);
  }
}
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
}

.auth-card {
  width: 420px;
}

.auth-footer {
  margin-top: 16px;
  text-align: center;
}

.full-btn {
  width: 100%;
}
</style>
