<template>
  <div class="common-layout">
    <el-container class="common-layout-container">
      <el-header></el-header>
      <el-container class="el-container">
        <el-aside>
          <Menu></Menu>
        </el-aside>
        <el-main>
          <router-view />
          <el-footer></el-footer>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import Menu from '../components/Menu.vue';
</script>

<style lang="scss" scoped>
.common-layout {
  width: 100%;
  height: 100%;
  .common-layout-container {
    width: 100%;
    height: 100%;
    .el-container {
      width: 100%;
      height: calc(100% - 60px);
      padding-bottom: 20px;
    }
  }
}
</style>
