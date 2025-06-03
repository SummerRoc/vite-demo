<template>
  <div class="file-sharding">
    <el-upload
      v-model:file-list="fileList"
      class="upload-demo"
      multiple
      :auto-upload="false"
      :limit="5"
    >
      <el-button type="primary">选择文件</el-button>
    </el-upload>
    <el-button type="success" @click="handleUpload">开始上传</el-button>
  </div>
</template>

<script setup lang="ts">
import { nanoid } from 'nanoid';
import type { UploadFile } from 'element-plus';
import type { FileChunkItem } from '@/utils/types';
import { cutFile } from '@/utils/tools';
const fileList = ref<UploadFile[]>([]);
const fileChunkList = ref<Array<FileChunkItem>>([]);
const handleUpload = async () => {
  fileChunkList.value = [];
  for (const item of fileList.value) {
    if (!item.raw) continue;
    const chunks = await cutFile(item.raw);
    fileChunkList.value.push({
      key: nanoid(),
      chunks,
      fileName: item.name!,
    });
  }
};
</script>

<style lang="scss" scoped></style>
