<template>
  <div>
    <el-button type="primary" @click="openDialog">打开弹框</el-button>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="90%">
      <div id="test"></div>
      <div id="bar"></div>
      <div id="line"></div>
    </el-dialog>
  </div>
</template>

<script>
import charDialog from "../components/dialog.vue";
export default {
  data() {
    return {
      dialogVisible: false,
      showEcharts1: true,
      showEcharts2: true,
      showEcharts3: true,
    };
  },
  components: {
    charDialog,
  },
  mounted() {},
  activated() {
    console.log("我被激活了");
  },
  deactivated() {
    console.log("我被释放了");
  },
  methods: {
    openDialog() {
      this.dialogVisible = true;
      this.showEcharts1 = false;
      this.showEcharts2 = true;
      this.showEcharts3 = false;
      this.$nextTick(() => {
        this.getECharts();
        this.createBarChart();
        this.createLineChart();
      });
    },
    getECharts() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("test"), null, {
        renderer: "svg",
        height: 250,
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
      myChart.on("click", (params) => {
        console.log(params);
      });
      myChart.on("legendselectchanged", (params) => {
        console.log(params, option);
        //加上这一行
        myChart.setOption({
          legend: { selected: { [params.name]: true } },
        });
      });
    },
    //创建一张柱状图表
    createBarChart() {
      let myChart = this.$echarts.init(document.getElementById("bar"), null, {
        renderer: "svg",
        height: 250,
      });
      let option = {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar",
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
      myChart.setOption(option);
      myChart.on("legendselectchanged", (params) => {
        console.log(params, option);
        //加上这一行
        myChart.setOption({
          legend: { selected: { [params.name]: true } },
        });
      });
      //防抖
      let timer;
      window.onresize = function() {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          myChart.resize();
        }, 500);
      };
    },
    //创建一个折线图
    createLineChart() {
      let myChart = this.$echarts.init(document.getElementById("line"), null, {
        renderer: "svg",
        height: 250,
      });
      let option = {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: "line",
            smooth: true,
          },
        ],
      };
      myChart.setOption(option);
      //防抖
      let timer;
      window.onresize = function() {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          myChart.resize();
        }, 500);
      };
    },
  },
};
</script>

<style lang="scss" scoped></style>
