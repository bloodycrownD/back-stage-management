<template>
  <el-form
      :model="formData"
      :rules="rules"
      class="container"
      title="系统登录"
      ref="form"
  >
    <p class="login">登录</p>
    <el-form-item label="账号" prop="username">
      <el-input v-model="formData.username" placeholder="请输入账号"/>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="formData.password" placeholder="请输入密码" type="password"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="login">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import {reactive, ref} from 'vue'
import cookieJs from 'js-cookie'
import {useRouter} from "vue-router";
import {getPermission} from "@/api";
import {ElMessage} from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import store from '../store'

const myStore = store()
const router = useRouter()
const form = ref(null)
const formData = reactive({
  username: '',
  password: '',
})



function login() {
  form.value.validate(async (val) => {
    if (val) {

      const data = await getPermission(formData)
      if (data.data.code === 20000) {
        myStore.menuData = data.data.data.menu
        cookieJs.set('token', data.data.data.token)
        myStore.addRoute(router);
        await router.push({path: '/home'})
      } else {
        ElMessage('密码或账号输入错误')
      }
    }
  })
}

const rules = reactive({
  username: [
    {
      required: true,
      message: '账号不能为空',
    },
  ],
  password: [
    {
      required: true,
      message: '密码不能为空',
    },
  ],
})
</script>

<style scoped lang='less'>
.container {
  width: 350px;
  border: 3px #eaeaea solid;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 0 25px #cac6c6;

  .el-button {
    margin: 0 auto;
  }

  .login {
    text-align: center;
    font-weight: 900;
    font-size: 20px;
  }
}
</style>