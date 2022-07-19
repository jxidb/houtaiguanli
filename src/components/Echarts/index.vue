<template>
  <div ref="echart"></div>
</template>
<script>
import * as echarts from 'echarts'
export default {
  props: {
    isAxisChart: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      default() {
        return {
          xData: [],
          series
        }
      }
    }
  },
  data() {
    return {
      // 折线图和柱状图配置
      axisOption: {
        legend: {
          // 图例文字颜色
          textStyle: {
            color: '#333'
          }
        },
        grid: {
          left: '20%'
        },
        // 提示桩
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: [],
          axixLine: {
            lineStyle: {
              color: '#17b3a3'
            }
          },
          axixLabel: {
            interval: 0,
            color: '#333'
          }
        },
        yAxis: [
          {
            type: 'value',
            axixLine: {
              lineStyle: {
                color: '#17b3a3'
              }
            }
          }
        ],
        color: ['#2ec7c9', '#b6a2de'],
        series: []
      },
      // 饼图数据
      normalOption: {
        tooltip: 'item',
        color: ['#0f78f4', '#dd536b', '#9462e5', '#a6a6a6', '#31bb22', '#39c362', '#3ed1cf'],
        series: [
          {
            data: [],
            type: 'pie'
          }
        ]
      },
      // 这个是DOM实例
      echart: null
    }
  },
  computed: {
    options() {
      return this.isAxisChart ? this.axisOption : this.normalOption
    }
  },
  watch: {
    chartData: {
      handler() {
        this.initChart()
      },
      deep: true
    }
  },
  methods: {
    initChart() {
      this.initChartData()
      if (this.echart) {
        this.echart.setOption(this.options)
      } else {
        this.echart = echarts.init(this.$refs.echart)
        this.echart.setOption(this.options)
      }
    },
    initChartData() {
      if (this.isAxisChart) {
        this.axisOption.xAxis.data = this.chartData.xData
        this.axisOption.series = this.chartData.series
      } else {
        this.normalOption.series = this.chartData.series
      }
    }
  }
}
</script>
<style lang=""></style>
