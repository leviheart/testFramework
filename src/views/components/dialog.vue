<template>
  <div>
    <el-empty
      class="chartnull"
      v-show="!showEcharts"
      decription="暂无数据"
    ></el-empty>
    <div :id="chartId" v-show="showEcharts" class="chartClass"></div>
  </div>
</template>

<script>
let timer;
let myChart;
export default {
  props: {
    showEcharts: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      chartId: "chart-" + Date.now(),
    };
  },
  mounted() {},
  methods: {
    getECharts() {
      // 基于准备好的dom，初始化echarts实例
      myChart = this.$echarts.init(document.getElementById(this.chartId), null, {
        renderer: "svg",
        height: 500,
      });
      let option = {
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "15%",
          right: "10%",
          orient: "vertical", // 图例垂直布局
          align: "right", // 图例文字靠右对齐
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 1048, name: "Search Engine" },
              { value: 735, name: "Direct" },
              { value: 580, name: "Email" },
              { value: 484, name: "Union Ads" },
              { value: 300, name: "Video Ads" },
            ],
          },
        ],
      };

      //写一个echarts饼图option，变量名为option1
      let option1 = {
        title: {
          text: "饼图",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["盒学", "小学", "创业", "大学", "其他"],
        },
        series: [
          {
            name: "访问次数",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 335, name: "盒学" },
              { value: 310, name: "小学" },
              { value: 234, name: "创业" },
              { value: 135, name: "大学" },
              { value: 1548, name: "其他" },
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      option1 && myChart.setOption(option1);
      window.addEventListener("resize", this.chartResize);
    },
    chartResize() {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        console.log("resize");
        myChart.resize();
      }, 500);
    },
    handleClose() {
      window.removeEventListener("resize", this.chartResize);
    },
  },
};
</script>

<style scoped>
.chartClass {
  height: 246px;
}
.chartnull {
  height: 246px;
}
</style>
