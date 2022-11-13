import Mock from "mockjs"
import mockData from './mockServerData/home'
import userData from './mockServerData/user'
import permission from "@/api/mockServerData/permission";
Mock.mock('/api/home/getData','get',mockData.getStatisticalData)
Mock.mock('/api/user/add','post',userData.createUser)
Mock.mock('/api/user/edit','post',userData.updateUser)
Mock.mock('/api/user/del','post',userData.deleteUser)
Mock.mock(/\/api\/user\/getUser/,'get',userData.getUserList)
Mock.mock(/\/api\/permission\/menu/,'post',permission.getMenu)