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
          <div style="height:280px" ref="echartsLine"></div>
        </el-card>
        <div class="graph">
          <el-card style="height: 260px">
            <div style="height: 260px" ref="echartsBar"></div>
          </el-card>
          <el-card style="height: 260px">
            <div style="height: 200px" ref="echartsPie"></div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {getData} from '@/api/data'
import * as echarts from 'echarts'

export default {
  name: "home",
  data() {
    return {
      tableData: [
        {
          name: 'oppo',
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800
        },
        {
          name: 'vivo',
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800
        },
        {
          name: '苹果',
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800
        },
        {
          name: '小米',
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800
        },
        {
          name: '三星',
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800
        },
        {
          name: '魅族',
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800
        }
      ],
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
    }
  },
  mounted() {
    getData().then(res => {
      const {code, data} = res.data
      if (code === 20000) {
        console.log(data)
        const series = []
        this.tableData = data.tableData
        const keys = Object.keys(data.orderData.data[0])
        keys.forEach(item => {
          series.push({
            name: item,
            data: data.orderData.data.map(item1 => item1[item]),
            type: 'line',
            // smooth: true,
          })
        })
        const option = {
          xAxis: {data: data.orderData.date},
          yAxis: {},
          legend: {data: keys},
          series,
          tooltip: {}
        }
        const el = echarts.init(this.$refs.echartsLine)
        el.setOption(option)
        console.log(data.orderData.date)
        const userOption = {
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
            data: data.userData.map(item => item.date),
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
              data: data.userData.map(item => item.new),
              type: 'bar'
            }, {
              name: '活跃用户',
              data: data.userData.map(item => item.active),
              type: 'bar'
            },],
        }
        const eb = echarts.init(this.$refs.echartsBar)
        eb.setOption(userOption)
        const videoOption = {
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
          series: [{
            data: data.videoData,
            type: 'pie',
          }],
        }
        const ep = echarts.init(this.$refs.echartsPie)
        ep.setOption(videoOption)
      }
    })
  }
}
</script>

<style scoped>

</style>
