<template>
  <div style="height: 100%" ref="echart">echart</div>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      echart: null, //存放初始化echart对象
      // 有坐标轴的配置
      axisOption: {
        title : {
          text : '[title]'
        },
        legend: {//顶部分类图表组
          textStyle: {
            color: '#333'
          }
        },
        tooltip: {//悬浮提示
          trigger: 'axis'
        },
        grid: {//往右边偏移 使其居中
          left: '20%'
        },
        xAxis: {
          type: "category",
          data: [],
           axisLine: {//配置x轴颜色
            lineStyle: {
              color: '#17b3a3'
            }
          },
        },
         yAxis: [
          {
            type: 'value',
            axisLine: {//配置y轴颜色
              lineStyle: {
                color: '#17b3a3'
            }
          },
          }
        ],
        series : [],
         color: [
          '#2ec7c9',
          '#b6a2de',
          '#5ab1ef',
          '#ffb980',
          '#d87a80',
          '#8d98b3',
          '#e5cf0d',
          '#97b552',
          '#95706d',
          '#dc69aa',
          '#07a2a4',
          '#9a7fd1',
          '#588dd5',
          '#f5994e',
          '#c05050',
          '#59678c',
          '#c9ab00',
          '#7eb00a',
          '#6f5553',
          '#c14089'
        ],
      },
      // 没有坐标轴的配置
      normalOption: {
        series : [],
        tooltip: {//悬浮提示
          trigger: 'item'
        },
        color: ['#0f78f4', '#dd536b', '#9462e5', '#a6a6a6', '#e1bb22', '#39c362', '#3ed1cf'],
      },
    };
  },
  props: {
    // 传入的数据
    chartData: {
      type: Object,
      default() {
        return {
          xData: [],
          series: [],
        };
      },
    },
    // 是否有坐标轴
    isAxisChart: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    options() {
      //计算最终使用的是有坐标轴还是无坐标轴
      return this.isAxisChart ? this.axisOption : this.normalOption;
    },
    isCollapse(){
      return this.$store.state.tab.isCollapse;
    }
  },
  watch: {
    chartData: {//监听chartData的变化，变化的时候初始化/更新折线图表
      handler: function() {
        this.initChart()
      },
      deep: true
    },
    isCollapse() {//折叠 重新设置图表尺寸
      setTimeout(() => {
        this.resizeChart()
      }, 300)
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
      //对传入的数据处理
      if (this.isAxisChart) {
        this.axisOption.xAxis.data = this.chartData.xData;
        this.axisOption.series = this.chartData.series;
      } else {
        this.normalOption.series = this.chartData.series;
      }
    },
    resizeChart() {//重置图表尺寸
      this.echart ? this.echart.resize() : ''
    }
  },
  mounted(){
    window.addEventListener('resize', this.resizeChart)//添加监听，窗口有缩放就回调重置
  },
  destroyed(){
    window.removeEventListener('resize', this.resizeChart)
  }
};
</script>

<style lang="scss" scoped></style>
