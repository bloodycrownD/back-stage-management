<template>
  <el-row>
    <el-col :span="8" style="padding-right: 10px">
      <el-card shadow="hover">
        <div class="user">
          <img src="https://img1.baidu.com/it/u=2032516702,3871509458&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=498">
          <div class="user-info">
            <h3 class="role">Admin</h3>
            <p class="role-name">超级管理员</p>
          </div>
        </div>
        <div class="log-info">
          <p>上次登录的时间：<span>2020-12-26</span></p>
          <p>上次登录的地点：<span>北京</span></p>
        </div>
      </el-card>
      <el-card shadow="hover" class="left-bottom">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="name" label="课程"/>
          <el-table-column prop="todayBuy" label="今日购买"/>
          <el-table-column prop="monthBuy" label="本月购买"/>
          <el-table-column prop="totalBuy" label="总购买"/>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="padding-left: 10px">
      <div class="num">
        <el-card
            shadow="hover"
            v-for="item in countData"
            :key="item.name"
            :body-style="{display: 'flex',padding:0}"
        >
          <el-icon :style="{backgroundColor:item.color}">
            <component :is="icons[item.icon]"/>
          </el-icon>
          <div class="info">
            <p class="value">￥{{ item.value }}</p>
            <p class="name">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height: 280px" shadow="hover">
        <div class="graph" ref="lineChart" style="height: 280px;"></div>
      </el-card>
      <div class="right-bottom">
        <el-card shadow="hover" style="height: 260px;">
          <div ref="barChart" style="height: 260px;"></div>
        </el-card>
        <el-card shadow="hover" style="height: 260px;">
          <div ref="pieChart" style="height: 240px;"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script setup>
import icons from "@/untils/icons";
import {onMounted, ref} from "vue";
import {getData} from "@/api";
import * as myEcharts from "echarts"


const lineChart = ref(null)
const barChart = ref(null)
const pieChart = ref(null)
let tableData = ref([])
onMounted(() => {
  let orderData = null
  getData().then(resp => {
    const data = resp.data.data
    tableData.value = data.tableData
    //折线图
    const lineChartOptions = {}
    orderData = data.orderData
    const lineChartGraph = myEcharts.init(lineChart.value)
    const xAxis = Object.keys(orderData.data[0])
    lineChartOptions.xAxis = {
      data: xAxis
    }
    lineChartOptions.legend = {
      data: xAxis,
    }
    lineChartOptions.series = []
    xAxis.forEach(key => {
      lineChartOptions.series.push({
        name: key,
        type: 'line',
        data: orderData.data.map(item => item[key])
      })
    })
    lineChartOptions.yAxis = {}
    lineChartOptions.tooltip = {
      trigger: "axis",
    }
    lineChartGraph.setOption(lineChartOptions)
    //柱状图
    const userData = data.userData
    const barChartGraph = myEcharts.init(barChart.value)
    const barChartOption = {
      legend: {
        // 图例文字颜色
        textStyle: {
          color: "#333",
        },
      },
      grid: {
        left: "20%",
      },
      // 提示框
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        type: "category", // 类目轴
        data: userData.map(item => item['date']),
        axisLine: {
          lineStyle: {
            color: "#17b3a3",
          },
        },
        axisLabel: {
          interval: 0,
          color: "#333",
        },
      },
      yAxis: [
        {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
        },
      ],
      color: ["#2ec7c9", "#b6a2de"],
      series: [
        {
          name: '新增用户',
          data: userData.map(item => item.new),
          type: 'bar'
        },
        {
          name: '活跃用户',
          data: userData.map(item => item.active),
          type: 'bar'
        }
      ]
    }
    barChartGraph.setOption(barChartOption)
    const pieChartGraph = myEcharts.init(pieChart.value)
    const pieChartOption = {
      tooltip: {
        trigger: "item",
      },
      color: [
        "#0f78f4",
        "#dd536b",
        "#9462e5",
        "#a6a6a6",
        "#e1bb22",
        "#39c362",
        "#3ed1cf",
      ],
      series: [
        {
          data: data.videoData,
          type:'pie'
        }
      ]
    }
    pieChartGraph.setOption(pieChartOption)
  })
})


const countData = [
  {
    name: "今日支付订单",
    value: 1234,
    icon: "success",
    color: "#2ec7c9",
  },
  {
    name: "今日收藏订单",
    value: 210,
    icon: "star-on",
    color: "#ffb980",
  },
  {
    name: "今日未支付订单",
    value: 1234,
    icon: "s-goods",
    color: "#5ab1ef",
  },
  {
    name: "本月支付订单",
    value: 1234,
    icon: "success",
    color: "#2ec7c9",
  },
  {
    name: "本月收藏订单",
    value: 210,
    icon: "star-on",
    color: "#ffb980",
  },
  {
    name: "本月未支付订单",
    value: 1234,
    icon: "s-goods",
    color: "#5ab1ef",
  },
]
</script>

<style scoped lang="less">
.user {
  display: flex;
  border-bottom: 1px #ccc solid;
  padding-bottom: 20px;
  margin-bottom: 20px;

  img {
    height: 150px;
    width: 150px;
    border-radius: 50%;
    margin-left: 40px;
  }

  align-items: center;

  .role {
    font-size: 32px;
    margin-bottom: 10px;
  }

  .role-name {
    color: #999;
  }
}

.log-info {
  line-height: 28px;
  font-size: 14px;
  color: #999;

  span {
    margin-left: 60px;
    color: #666;
  }
}

.left-bottom {
  margin-top: 20px;
}

.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .el-card {
    width: 32%;
    margin-bottom: 20px;

    .el-icon {
      height: 80px;
      width: 80px;
      font-size: 30px;
      color: #fff;
      text-align: center;
      line-height: 80px;
    }
  }

  .info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 15px;

    .value {
      font-size: 30px;
      margin-bottom: 10px;
      line-height: 30px;
    }

    .name {
      font-size: 14px;
      color: #999999;
      text-align: center;
    }
  }
}

.right-bottom {
  display: flex;
  margin-top: 20px;
  justify-content: space-between;

  .el-card {
    width: 48%;
  }
}
</style>