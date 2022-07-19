<template>
  <el-row class="home" :gutter="20">
    <el-col :gutter="10" :span="8" style="margin-top: 20px">
      <el-card shadow="hover">
        <div class="user">
          <img :src="userImg" class="userimg" />
          <div class="userinfo">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间:<span>2022-7-6</span></p>
          <p>上次登录地点:<span>武汉</span></p>
        </div>
      </el-card>
      <el-card style="margin-top: 20px; height: 460px">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column v-for="(val, key) in tableLabel" :key="key" :prop="key" :label="val"> </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="margin-top: 20px" class="maniOrder">
      <div class="num">
        <el-card v-for="item in countData" :key="item.name" :body-style="{ display: 'flex', padding: 0 }" class="order">
          <i class="icon" :class="`el-icon-${item.icon}`" :style="{ background: item.color }"> </i>
          <div class="detail">
            <p class="num1">￥{{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height: 280px">
        <!-- <div style="height: 280px" ref="echarts"></div> -->
        <Echart :chartData="echartData.order" style="height: 280px"></Echart>
      </el-card>
      <div class="graph">
        <el-card style="height: 260px; width: 400px">
          <!-- <div style="height: 240px" ref="userEcharts"></div> -->
          <Echart :chartData="echartData.user" style="height: 240px"></Echart>
        </el-card>
        <el-card style="height: 260px; width: 400px">
          <!-- <div style="height: 240px" ref="videoEcharts"></div>
           -->
          <Echart :chartData="echartData.video" :isAxisChart="false" style="height: 240px"></Echart>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import { reqgetData } from '@/api/index.js'
import * as echarts from 'echarts'
import Echart from '@/components/Echarts/index.vue'
export default {
  data() {
    return {
      userImg: require('@/assets/tx.jpeg'),
      tableData: [],
      tableLabel: {
        name: '课程',
        todayBuy: '当日购买',
        monthBuy: '本月购买',
        totalBuy: '总购买'
      },
      countData: [
        {
          name: '今日支付订单',
          value: 1234,
          icon: 'success',
          color: '#2ec7c9'
        },
        {
          name: '今日收藏订单',
          value: 210,
          icon: 'star-on',
          color: '#ffb980'
        },
        {
          name: '今日未支付订单',
          value: 1234,
          icon: 's-goods',
          color: '#5ab1ef'
        },
        {
          name: '本月支付订单',
          value: 1234,
          icon: 'success',
          color: '#2ec7c9'
        },
        {
          name: '本月收藏订单',
          value: 210,
          icon: 'star-on',
          color: '#ffb980'
        },
        {
          name: '本月未支付订单',
          value: 1234,
          icon: 's-goods',
          color: '#5ab1ef'
        }
      ],
      echartData: {
        // 折线图数据
        order: {
          xData: [],
          series: []
        },
        // 柱状图数据
        user: { xData: [], series: [] },
        // 饼图数据
        video: { series: [] }
      }
    }
  },
  components: {
    Echart
  },
  mounted() {
    reqgetData().then((res) => {
      const { code, data } = res
      if (code === 20000) {
        this.tableData = data.tableData
        const order = data.orderData
        const xData = order.date
        const keyArray = Object.keys(order.data[0])
        const series = []
        keyArray.forEach((key) => {
          series.push({
            name: key,
            data: order.data.map((item) => {
              return item[key]
            }),
            type: 'line'
          })
        })
        // #region
        // const option = {
        //   xAxis: {
        //     data: xData
        //   },
        //   yAxis: {},
        //   legend: {
        //     data: keyArray
        //   },
        //   series
        // }

        // const E = echarts.init(this.$refs.echarts)
        // E.setOption(option)

        // #endregion
        this.echartData.order.xData = xData
        this.echartData.order.series = series
        // 用户图
        //#region
        /*  const userOption = {
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
            data: data.userData.map((item) => item.date),
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
          series: [
            {
              name: '新增用户',
              data: data.userData.map((item) => item.new),
              type: 'bar'
            },
            {
              name: '活跃用户',
              data: data.userData.map((item) => item.active),
              type: 'bar'
            }
          ]
        } */
        // const U = echarts.init(this.$refs.userEcharts)
        // U.setOption(userOption)
        //#endregion

        this.echartData.user.xData = data.userData.map((item) => item.date)
        this.echartData.user.series = [
          {
            name: '新增用户',
            data: data.userData.map((item) => item.new),
            type: 'bar'
          },
          {
            name: '活跃用户',
            data: data.userData.map((item) => item.active),
            type: 'bar'
          }
        ]

        // 饼图
        // #region
        // const videoOption = {
        //   tooltip: 'item',
        //   color: ['#0f78f4', '#dd536b', '#9462e5', '#a6a6a6', '#31bb22', '#39c362', '#3ed1cf'],
        //   series: [
        //     {
        //       data: data.videoData,
        //       type: 'pie'
        //     }
        //   ]
        // }
        // // 获取饼图的DOM实例
        // const V = echarts.init(this.$refs.videoEcharts)
        // V.setOption(videoOption)
        // #endregion
        this.echartData.video.series = [
          {
            data: data.videoData,
            type: 'pie'
          }
        ]
      }
    })
  }
}
</script>
<style lang="less">
/* .userimg {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  vertical-align: middle;
}
.user {
  display: flex;
  justify-content: space-evenly;
  border-bottom: 1px solid #999;
  padding-bottom: 20px;
}
.login-info {
  p {
    float: left;
    span {
      float: right;
      margin-left: 50px;
    }
  }
}
.order {
  display: inline-block;
  width: 210px;
  margin-right: 30px;
  text-align: center;
  // justify-content: space-around;
  i {
    font-size: 5vh;
    width: 80px;
    height: 80px;
    line-height: 80px;
    color: white;
  }
}

.num {
  text-align: left;
}
.order:nth-child(4) {
  margin-top: 15px;
}
.order:nth-child(5) {
  margin-top: 15px;
}
.order:nth-child(6) {
  margin-top: 15px;
}
.num1 {
  font-size: 4vh;
  margin: 0;
  margin-top: 10px;
}
.txt {
  // margin: 0;
  font-size: 10px;
  margin-top: 5px;
}
.graph {
  // .el-card {
  //   display: inline-block;
  // }
  display: flex;
  justify-content: space-between;
} */
</style>
