<template>
  <div class="header-container">
    <div class="l-content">
      <el-button
          type="primary"
          :icon="Menu"
          size="default"
          @click="changeCollapse"
          style="margin-right: 20px"
      />
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in useStore.tabList" :key="item.path" :to="item.path">{{ item.label }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown>
        <span><img class="user-img"
                   src="https://img1.baidu.com/it/u=2032516702,3871509458&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=498"></span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click="logOut">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup>
import {Menu} from "@element-plus/icons-vue";
import store from '../store/index'
import cookieJs from "js-cookie";
import {useRouter} from "vue-router";

const router = useRouter()
const useStore = store()
function logOut() {
  cookieJs.remove('token')
  router.push('/login')
}
function changeCollapse() {
  useStore.menuState = !useStore.menuState
}
</script>

<style scoped lang="less">
.header-container {
  height: 60px;
  background-color: #333;
  display: flex;
  padding: 0 20px;
  align-items: center;
  justify-content: space-between;

  .text {
    color: white;
    font-size: 14px;
    margin-left: 10px;
  }

  .user-img {
    height: 40px;
    width: 40px;
    border-radius: 50%;
  }

  .l-content {
    display: flex;
    align-items: center;

    //deep样式穿刺，解决scoped导致的样式失效
    /deep/ .el-breadcrumb__item {

      .el-breadcrumb__inner {
        font-weight: normal;

        &.is-link {
          color: #666;
        }
      }

      &:last-child {
        .el-breadcrumb__inner {
          color: white;
        }
      }
    }
  }
}
</style>