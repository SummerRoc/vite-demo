<template>
  <div class="menu">
    <el-menu router class="el-menu">
      <el-menu-item v-for="(item, index) in menu" :key="index" :index="item.url">
        <el-tooltip effect="dark" :content="item.label" placement="top">
          {{ item.label }}
        </el-tooltip>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { menu } from '../router/menu';
</script>

<style lang="scss" scoped>
.menu {
  width: 100%;
  height: 100%;
  .el-menu {
    width: 100%;
    height: 100%;
  }
}
</style>
