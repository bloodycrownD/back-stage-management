<template>
  <!--总菜单的设置-->
  <el-menu
      class="el-menu-vertical-demo"
      :collapse="useStore.menuState"
      background-color="#5d656b"
      text-color="#dfe6e0"
  >
    <h3 class="title">{{ !useStore.menuState ? '我的管理系统' : '我的' }}</h3>
    <!--    没有子菜单的菜单-->
    <el-menu-item v-for="(item,index) in noChildre"
                  :index="index + 'noChildre'"
                  :key="index"
                  @click="clickMenu(item)"
    >
      <el-icon>
        <Component :is="iconList[item.icon]" class="icon"/>
      </el-icon>
      <template #title>{{ item.label }}</template>
    </el-menu-item>
    <!-- 有子菜单的菜单   -->
    <el-sub-menu
        v-for="(item,index) in hasChildre"
        :index="index + 'hasChildre'"
        :key="index"
    >
      <template #title>
        <el-icon>
          <component :is="iconList[item.icon]" class="icons"></component>
        </el-icon>
        <span>{{ item.label }}</span>
      </template>
      <!--      子菜单-->
      <el-menu-item-group>
        <el-menu-item :index="'children'+`${index}`"
                      :key="index"
                      v-for="(childItem,index) in item.children"
                      @click="clickMenu(childItem)"
        >
          <el-icon>
            <component :is="iconList[childItem.icon]" class="icons"></component>
          </el-icon>
          <span>{{ childItem.label }}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import iconList from '../untils/icons'
import {useRouter} from "vue-router";
import store from '../store'
import {storeToRefs} from "pinia";

const useStore = store()
const route = useRouter()
//这里是菜单的数据，不同权限，获取的菜单不同
const {menuData} = storeToRefs(useStore)

const hasChildre = menuData.value.filter(item => item.children)
const noChildre = menuData.value.filter(item => !item.children)

function clickMenu(item) {
  route.push(item.path)
  const flag = useStore.tabList.findIndex(key =>key.name === item.name)
  if (flag === -1) {
    useStore.tabList.push(item)
  }
}
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  /*min-height: 400px;*/
  /*右侧菜单铺满*/
  height: 100%;
}

.title {
  color: #dfe6e0;
  font-size: 16px;
  text-align: center;
}

.el-menu {
  border: 0;
}
</style>
