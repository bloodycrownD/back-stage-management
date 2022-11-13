<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="auto">
        <simple-aside/>
      </el-aside>
      <el-container>
        <el-header>
          <HeaderComponent/>
        </el-header>
        <top-tag></top-tag>
        <el-main style="height: 90vh">
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import SimpleAside from '../components/SimpleAside'
import HeaderComponent from "@/components/HeaderComponent";
import TopTag from '@/components/TopTag'

</script>

<style scoped>
.el-header {
  padding: 0;
}
</style>