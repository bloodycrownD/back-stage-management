<template>
  <div class="middle">
    <el-button type="primary" @click="handleAdd">
      + 新增
    </el-button>
    <div class="search">
      <el-input v-model="keyWords" placeholder="输入查询名称"  />
      <el-button type="primary" :icon="Search" circle  @click="searchData"/>
    </div>
  </div>
  <el-dialog
      v-model="dialogVisible"
      title="新增用户"
      width="50%"
      :before-close="beforeClose"
  >
    <el-form :model="form"
             label-width="120px"
             :inline="true"
             :rules="rules"
             ref="addFrom"
    >
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" placeholder="请输入姓名"/>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select v-model="form.sex" placeholder="请输入性别">
          <el-option label="男" :value="1"/>
          <el-option label="女" :value="0"/>
        </el-select>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model="form.age" placeholder="请输入年龄"/>
      </el-form-item>
      <el-form-item label="出生日期" prop="birth">
        <el-date-picker
            v-model="form.birth"
            type="date"
            placeholder="选择日期"
            value-format="YYYY-MM-DD"
        />
      </el-form-item>
      <el-form-item label="地址" prop="addr">
        <el-input v-model="form.addr" placeholder="请输入地址"/>
      </el-form-item>

    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="submit">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
  <!--    表格-->
  <el-table :data="tableData"
            stripe
            style="width: 100%"
            height="85%"
  >
    <el-table-column prop="name" label="姓名"/>
    <el-table-column label="性别" width="180">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">{{ scope.row.sex === 1 ? '男' : '女' }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="age" label="年龄"/>
    <el-table-column prop="birth" label="出生日期"/>
    <el-table-column prop="addr" label="地址"/>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.row)"
        >编辑
        </el-button
        >
        <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.row)"
        >删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>


  <el-pagination layout="prev, pager, next"
                 :total="total"
                 @current-change="handleCurrentPage"
  />
  <el-dialog
      v-model="delMsg"
      title="Waring!!!"
      width="20%"
  >
    <span>确认删除吗？</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="delMsg = false">取消</el-button>
        <el-button type="danger" @click="confirmDel">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import {onMounted, reactive, ref} from 'vue'
import {addUser, editUser, getUser,delUser} from "@/api";
import {Search} from "@element-plus/icons-vue"


const dialogVisible = ref(false)
const delMsg = ref(false)
const addFrom = ref(null)
let tableData = ref([])
let tableType = 0 //0是添加1是编辑
let mayDelData = null
const total = ref(0)
const keyWords = ref('')
// do not use same name with ref
const form = ref({
  name: '',
  age: '',
  sex: '',
  birth: '',
  addr: ''
})


const rules = reactive({
  name: [
    {
      required: true,
      message: "请输入姓名"
    }
  ],
  age: [
    {
      required: true,
      message: "请输入年龄"
    }
  ],
  sex: [
    {
      required: true,
      message: "请选择性别"
    }
  ],
  birth: [
    {
      required: true,
      message: "请输入出生日期"
    }
  ],
  addr: [
    {
      required: true,
      message: "请输入地址"
    }
  ],

})


function searchData() {
  refreshTable({
    params:{
      name:keyWords.value
    }
  })
}

function handleCurrentPage(val) {
  refreshTable({
    params:{
      page:val,
      name:keyWords.value
    }
  })
}

async function confirmDel() {
  delMsg.value = false
  await delUser(mayDelData)
  await refreshTable()
}

function handleAdd() {
  tableType = 0
  dialogVisible.value = true
}

function handleEdit(data) {
  tableType = 1
  form.value = JSON.parse(JSON.stringify(data))
  dialogVisible.value = true
}

function handleDelete( data) {
  mayDelData = data
  delMsg.value = true
}

const refreshTable = async (param) => {
  const data = await getUser(param)
  tableData.value = data.data.list
  total.value = data.data.count
}


onMounted(refreshTable)


function submit() {
  addFrom.value.validate(val => {
    if (val) {
      if (tableType === 0) {
          addUser(form.value).then(() => {
            refreshTable()
          })
      }
      else {
        editUser(form.value).then(() => {
          refreshTable()
        })
      }
        dialogVisible.value = false
    }
    addFrom.value.resetFields()
  })
}

async function beforeClose() {
  addFrom.value.resetFields()
  dialogVisible.value = false
}

function cancel() {
  addFrom.value.resetFields()
  dialogVisible.value = false
}



</script>

<style scoped lang="less">
.el-pagination{
  position: absolute;
  right: 20px;
}
.middle{
  display: flex;
  justify-content: space-between;
  .el-input{
    width: 200px;
  }
}
</style>