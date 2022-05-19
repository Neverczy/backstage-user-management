<template>
  <div ref="homeCharts" :style="`height: ${chartHeight}px`"></div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: "echartsComponents",
  props: {
    isAxisChart: {
      type: Boolean,
      default: true,
    },
    chartsData: {
      type: Object,
      default() {
        return {
          xAxis: [],
          series: [],
        }
      }
    },
    chartHeight: {
      type: String,
      default() {
        return '260';
      }
    }
  },
  data() {
    return {
      axisOption: {
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
          data: [],
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
        color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
        series: [],
      },
      otherOption: {
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
        series: [],
      },
      echartsComponent: null,
    }
  },
  methods: {
    initCharts() {
      this.initChartsData()
      if (!this.echartsComponent) {
        this.echartsComponent = echarts.init(this.$refs.homeCharts)
      }
      this.echartsComponent.setOption(this.options)
    },
    initChartsData() {
      if (this.isAxisChart) {
        this.axisOption.xAxis = this.chartsData.xAxis
        this.axisOption.series = this.chartsData.series
      } else {
        this.options.series = this.chartsData.series
      }
    }
  },
  computed: {
    options() {
      return this.isAxisChart ? this.axisOption : this.otherOption
    },
  },
  watch: {
    chartsData: {
      handler: function () {
        this.initCharts()
      },
      deep: true,
      // immediate: true,
    }
  }
}
</script>

<style scoped>

</style>
