<template>
  <!-- 主要内容包裹div -->
  <div>
    <!-- 使用Element UI的按钮，类型为"primary"，点击触发openDialog方法 -->
    <el-button type="primary" @click="openDialog">打开弹框</el-button>
    <!-- 弹出框组件，标题为"提示"，宽度占90%，可见性受dialogVisible控制 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="90%">
      <!-- 用于显示ECharts图表的div -->
      <div id="test"></div>
      <div id="bar"></div>
      <div id="line"></div>
    </el-dialog>
    <!-- <div class="testStyle"></div> -->
  </div>
</template>

<script>
import charDialog from "../components/dialog.vue";
// import "../../styles/testStyle.scss"

export default {
  data() {
    // 定义组件的数据属性
    return {
      dialogVisible: false, // 控制弹框是否显示
      showEcharts1: true, // 控制第一个图表的显示
      showEcharts2: true, // 控制第二个图表的显示
      showEcharts3: true, // 控制第三个图表的显示
    };
  },
  components: {
    charDialog, // 注册自定义对话框组件
  },
  mounted() {}, // 组件挂载后的钩子
  activated() {
    console.log("我被激活了");
  },
  deactivated() {
    console.log("我被释放了");
  },
  methods: {
    // 打开弹框并初始化图表
    openDialog() {
      this.dialogVisible = true; // 打开弹框
      this.showEcharts1 = false; // 隐藏第一个图表
      this.showEcharts2 = true; // 显示第二个图表
      this.showEcharts3 = false; // 隐藏第三个图表
      this.$nextTick(() => {
        this.getECharts();
        this.createBarChart();
        this.createLineChart();
      });
    },
    // 初始化并配置第一个图表：饼图
    getECharts() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("test"), null, {
        renderer: "svg",
        height: 250,
      });
      // 饼图的配置项
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

      // 饼图的option1
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
      // 添加饼图事件监听
      myChart.on("click", (params) => {
        console.log(params);
      });
      myChart.on("legendselectchanged", (params) => {
        console.log(params, option);
        // 更新图表选中状态
        myChart.setOption({
          legend: { selected: { [params.name]: true } },
        });
      });
    },
    // 初始化并配置第二个图表：柱状图
    createBarChart() {
      let myChart = this.$echarts.init(document.getElementById("bar"), null, {
        renderer: "svg",
        height: 250,
      });
      // 柱状图的配置项
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
      // 添加柱状图事件监听
      myChart.on("legendselectchanged", (params) => {
        console.log(params, option);
        // 更新图表选中状态
        myChart.setOption({
          legend: { selected: { [params.name]: true } },
        });
      });
      // 防抖处理，防止频繁窗口重绘
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
    // 初始化并配置第三个图表：折线图
    createLineChart() {
      let myChart = this.$echarts.init(document.getElementById("line"), null, {
        renderer: "svg",
        height: 250,
      });
      // 折线图的配置项
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
      // 防抖处理，防止频繁窗口重绘
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

<style lang="scss" scoped>
// @import "@s/testStyle.scss"
</style>
