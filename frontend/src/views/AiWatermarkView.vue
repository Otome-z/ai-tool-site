<template>
  <el-card class="watermark-card">
    <template #header>
      <div class="card-header">
        <h2>AI去水印</h2>
      </div>
    </template>

    <div
      class="upload-area"
      :class="{ 'is-dragover': isDragOver }"
      @dragover.prevent="onDragOver"
      @dragleave.prevent="onDragLeave"
      @drop.prevent="onDrop"
      @click="openFilePicker"
    >
      <input
        ref="fileInputRef"
        class="hidden-input"
        type="file"
        accept="image/jpeg,image/png,image/webp"
        @change="onFileChange"
      />
      <p class="upload-title">拖拽图片到这里，或点击立即上传</p>
      <p class="upload-desc">支持 JPG/PNG/WebP，大小不超过 10MB，也可直接粘贴图片。</p>
    </div>

    <p v-if="uploadError" class="error-text">{{ uploadError }}</p>

    <div v-if="previewUrl" class="preview-section">
      <div class="preview-grid">
        <div class="preview-panel">
          <p class="panel-title">原图</p>
          <img :src="previewUrl" alt="原图预览" class="preview-image" />
        </div>
        <div class="preview-panel">
          <p class="panel-title">处理后图片</p>
          <img
            v-if="resultPreviewUrl"
            :src="resultPreviewUrl"
            alt="处理后图片预览"
            class="preview-image"
          />
          <div v-else class="result-placeholder">点击“立即开始”后显示处理后图片</div>
        </div>
      </div>
      <div class="preview-meta">
        <p class="file-name">文件名：{{ selectedFile?.name }}</p>
        <p>文件大小：{{ readableSize }}</p>
      </div>
    </div>

    <div class="actions">
      <el-button type="primary" @click="openFilePicker">立即上传</el-button>
      <el-button :disabled="!selectedFile" @click="clearSelection">重置</el-button>
      <el-button type="success" :loading="isProcessing" :disabled="!selectedFile" @click="startProcessing">
        立即开始
      </el-button>
      <el-button v-if="resultPreviewUrl" type="warning" @click="downloadResultImage">下载结果图</el-button>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);

const fileInputRef = ref<HTMLInputElement | null>(null);
const selectedFile = ref<File | null>(null);
const previewUrl = ref('');
const resultPreviewUrl = ref('');
const uploadError = ref('');
const isDragOver = ref(false);
const isProcessing = ref(false);

const readableSize = computed(() => {
  if (!selectedFile.value) return '';
  return `${(selectedFile.value.size / (1024 * 1024)).toFixed(2)} MB`;
});

function openFilePicker() {
  fileInputRef.value?.click();
}

function onFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    applyFile(file);
  }
  target.value = '';
}

function onDragOver() {
  isDragOver.value = true;
}

function onDragLeave() {
  isDragOver.value = false;
}

function onDrop(event: DragEvent) {
  isDragOver.value = false;
  const file = event.dataTransfer?.files?.[0];
  if (file) {
    applyFile(file);
  }
}

function onPaste(event: ClipboardEvent) {
  // Prefer clipboard image item and ignore non-image content.
  const item = event.clipboardData?.items
    ? Array.from(event.clipboardData.items).find((candidate) => candidate.type.startsWith('image/'))
    : null;

  const file = item?.getAsFile();
  if (file) {
    applyFile(file);
  }
}

function applyFile(file: File) {
  if (!ALLOWED_TYPES.has(file.type)) {
    const message = '请上传 JPG/PNG/WebP 格式的图片。';
    uploadError.value = message;
    ElMessage.error(message);
    return;
  }

  if (file.size > MAX_FILE_SIZE) {
    const message = '请上传 10MB 以内的图片。';
    uploadError.value = message;
    ElMessage.error(message);
    return;
  }

  uploadError.value = '';
  selectedFile.value = file;
  setPreview(file);
}

function setPreview(file: File) {
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value);
  }
  previewUrl.value = URL.createObjectURL(file);
}

function clearSelection() {
  selectedFile.value = null;
  resultPreviewUrl.value = '';
  uploadError.value = '';
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value);
    previewUrl.value = '';
  }
}

async function startProcessing() {
  if (!selectedFile.value) return;
  isProcessing.value = true;
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));
    resultPreviewUrl.value = previewUrl.value;
    ElMessage.success('图片已就绪，请继续后续处理。');
  } finally {
    isProcessing.value = false;
  }
}

function downloadResultImage() {
  if (!resultPreviewUrl.value || !selectedFile.value) return;
  const fileName = selectedFile.value.name;
  const dotIndex = fileName.lastIndexOf('.');
  const baseName = dotIndex > 0 ? fileName.slice(0, dotIndex) : fileName;
  const extension = dotIndex > 0 ? fileName.slice(dotIndex) : '.png';
  const link = document.createElement('a');
  link.href = resultPreviewUrl.value;
  link.download = `${baseName}-result${extension}`;
  link.click();
}

onMounted(() => {
  window.addEventListener('paste', onPaste);
});

onBeforeUnmount(() => {
  window.removeEventListener('paste', onPaste);
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value);
  }
});
</script>

<style scoped>
.watermark-card {
  width: min(860px, 100%);
}

.card-header h2 {
  margin: 0;
}

.upload-area {
  border: 1px dashed var(--el-border-color);
  border-radius: 10px;
  padding: 28px 16px;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.2s, background-color 0.2s;
}

.upload-area:hover,
.upload-area.is-dragover {
  border-color: var(--el-color-primary);
  background-color: var(--el-color-primary-light-9);
}

.hidden-input {
  display: none;
}

.upload-title {
  margin: 0;
  font-weight: 600;
}

.upload-desc {
  margin: 8px 0 0;
  color: var(--el-text-color-secondary);
}

.error-text {
  margin: 10px 0 0;
  color: var(--el-color-danger);
}

.preview-section {
  margin-top: 16px;
  display: grid;
  gap: 10px;
}

.preview-grid {
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.preview-panel {
  display: grid;
  gap: 8px;
}

.panel-title {
  margin: 0;
  font-weight: 600;
}

.preview-image {
  width: 100%;
  max-height: 360px;
  object-fit: contain;
  border-radius: 8px;
  border: 1px solid var(--el-border-color-lighter);
}

.result-placeholder {
  min-height: 220px;
  border: 1px dashed var(--el-border-color);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--el-text-color-secondary);
  padding: 12px;
  text-align: center;
}

.preview-meta {
  color: var(--el-text-color-secondary);
}

.file-name {
  margin: 0;
  color: var(--el-text-color-primary);
  font-weight: 500;
}

.actions {
  margin-top: 16px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .preview-grid {
    grid-template-columns: 1fr;
  }
}
</style>
