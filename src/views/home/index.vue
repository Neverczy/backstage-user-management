<template>
  <div>
    <el-row class="home" :gutter="20">
      <el-col :span="8" style="margin-top: 20px">
        <el-card shadow="hover">
          <div class="user">
            <img src="@/assets/images/user.png" alt="头像图片"/>
            <div class="userinfo">
              <p class="name">Admin</p>
              <p class="access">超级管理员</p>
            </div>
          </div>
          <div class="login-info">
            <p>上次登录时间<span>2022-4-26</span></p>
            <p>上次登录地点<span>南京</span></p>
          </div>
        </el-card>
        <el-card shadow="hover" style="margin-top: 20px;height: 460px">
          <el-table
              :data="tableData"
              stripe
              style="width: 100%">
            <el-table-column
                v-for="(item,index) in tableLabel"
                :key="index"
                :prop="index"
                :label="item"
                width="71"
                align="center">
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="16" style="margin-top: 20px">
        <div class="num">
          <el-card
              shadow="hover"
              v-for="item in countData"
              :key="item.name"
              :body-style="{display:'flex',padding: 0}">
            <i
                class="icon" :class="`el-icon-${item.icon}`"
                :style="{backgroundColor: item.color}">
            </i>
            <div class="detail">
              <p class="num">${{ item.value }}</p>
              <p class="txt">{{ item.name }}</p>
            </div>
          </el-card>
        </div>
        <el-card style="height: 280px">
          <echarts-components :charts-data="lineChart" chart-height="280"></echarts-components>
        </el-card>
        <div class="graph">
          <el-card style="height: 260px">
            <echarts-components :charts-data="barChart" chart-height="260"></echarts-components>
          </el-card>
          <el-card style="height: 260px">
            <echarts-components
                :is-axis-chart="false"
                :charts-data="pieChart"
                chart-height="200">
            </echarts-components>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {getData} from '@/api/data'
import echartsComponents from '@/components/echartsComponents'

export default {
  name: "home",
  components: {
    echartsComponents
  },
  data() {
    return {
      tableData: [],
      tableLabel: {
        name: '课程',
        todayBuy: '今日购买',
        monthBuy: '本月购买',
        totalBuy: '总购买',
      },
      countData: [
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
      ],
      lineChart: {
        xAxis: {},
        series: []
      },
      barChart: {
        xAxis: {},
        series: []
      },
      pieChart: {
        series: []
      }
    }
  },
  mounted() {
    getData().then(res => {
      const {code, data} = res.data
      if (code === 20000) {
        //table data
        this.tableData = data.tableData
        //line charts
        const series = []
        const keys = Object.keys(data.orderData.data[0])
        keys.forEach(item => {
          series.push({
            name: item,
            data: data.orderData.data.map(item1 => item1[item]),
            type: 'line',
          })
        })
        this.lineChart.series = series
        this.lineChart.xAxis.data = data.orderData.date
        //bar charts
        this.barChart.xAxis.data = data.userData.map(item => item.date)
        for (let i = 0; i < 2; i++) {
          this.barChart.series.push({
            name: i === 1 ? '新增用户' : '活跃用户',
            data: data.userData.map(item => item[i === 1 ? 'new' : 'active']),
            type: 'bar'
          })
        }
        //pie charts
        this.pieChart.series.push({
          data: data.videoData,
          type: 'pie'
        })
      }
    })
  }
}
</script>

<style scoped>

</style>
