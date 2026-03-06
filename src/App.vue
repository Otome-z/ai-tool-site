<template>
  <div class="page">
    <el-container>
      <el-header class="header">
        <div class="brand">AI 工具站</div>
        <el-button type="primary" plain>登录 / 注册</el-button>
      </el-header>

      <el-main>
        <section class="hero">
          <el-tag type="success" effect="dark">Nuxt 3 规划中的前端 MVP</el-tag>
          <h1>1 分钟润色你的中文文案</h1>
          <p>先上线一个 AI 文案润色工具，后续扩展成 AI 工具集合站。</p>

          <el-card class="tool-card" shadow="hover">
            <template #header>
              <div class="card-header">
                <span>AI 文案润色</span>
                <el-tag type="info">Beta</el-tag>
              </div>
            </template>

            <el-form label-position="top">
              <el-form-item label="请输入待润色文案">
                <el-input
                  v-model="draft"
                  type="textarea"
                  :rows="6"
                  maxlength="1000"
                  show-word-limit
                  placeholder="例如：这款产品很好用，欢迎大家来买。"
                />
              </el-form-item>

              <el-form-item label="润色风格">
                <el-select v-model="tone" placeholder="请选择风格" class="full-width">
                  <el-option label="正式专业" value="formal" />
                  <el-option label="口语亲切" value="casual" />
                  <el-option label="营销转化" value="marketing" />
                </el-select>
              </el-form-item>

              <div class="actions">
                <el-button type="primary" size="large">开始润色（待接 API）</el-button>
                <el-button size="large" plain>查看定价</el-button>
              </div>
            </el-form>
          </el-card>
        </section>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const draft = ref('')
const tone = ref<'formal' | 'casual' | 'marketing'>('formal')
</script>
