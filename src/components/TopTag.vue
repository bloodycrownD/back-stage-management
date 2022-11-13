<template>
  <div class="tabs">
    <el-tag
        v-for="item in useStore.tabList"
        :closable="item.path === myRoute.path"
        :key="item.path"
        :effect="item.path === myRoute.path?'dark':'plain'"
        @click="changeRoute(item)"
        @close="handleClose(item)"
        size="small"
    >{{ item.label }}
    </el-tag>
  </div>
</template>

<script setup>
import store from '../store'
import {useRoute,useRouter} from 'vue-router'
const myRoute = useRoute()
const myRouter = useRouter()
const useStore = store()
function changeRoute(item) {
  myRouter.push(item.path)
}
function handleClose(item){
  useStore.tabList = useStore.tabList.filter(key=>key.path !== item.path)
  myRouter.push(useStore.tabList[useStore.tabList.length - 1].path)
}
</script>

<style scoped lang="less">
.tabs{
  padding: 20px;
  .el-tag{
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>