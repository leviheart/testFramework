<template>
  <div>
    <el-button @click="showModal">
      <span style="font-size: 20px;">测试文字大小</span>
    </el-button>
    <el-dialog
      :visible.sync="dialogVisible"
      :show-close="false"
      :fullscreen="fullscreen"
      :width="dialogWidth"
      :close-on-click-modal="false"
    >
      <div slot="title" class="dialog-title">
        <el-row>
          <div class="dialog-header">
            <div class="dialog-header-left">
              <div class="main-title">
                主标题
              </div>
              <div class="sub-title">
                <!-- <svg-icon iconClass="bianhao" class="bianhao"></svg-icon> -->
                副标题
              </div>
            </div>
            <div class="dialog-buttons">
              <button class="close" @click="close"></button>
            </div>
          </div>
        </el-row>
      </div>
      <div class="measurement-section">
        <div class="measurement-title">量测趋势图</div>
      </div>
      <!-- 接着放自己的内容 -->
      <div class="content">
        <!-- <div>
          <el-radio-group v-model="selectedOption" @change="handleOptionChange">
            <el-radio label="day">日</el-radio>
            <el-radio label="week">近7日</el-radio>
            <el-radio label="month">近30日</el-radio>
          </el-radio-group>
        </div> -->
        <!-- <div>
          <el-select
            v-model="mulOption"
            multiple
            placeholder="请选择"
            @change="changeOption"
          >
            <el-option
              v-for="item in muloptions"
              :key="item"
              :label="item"
              :value="item"
            >
              <div class="options">
                <div v-if="item === 'A相电流'" class="line-red"></div>
                <div v-else-if="item === 'B相电流'" class="line-green"></div>
                <div v-else-if="item === 'C相电流'" class="line-yellow"></div>
                {{ item }}
              </div>
            </el-option>
          </el-select>
        </div> -->
      </div>
      <div id="chart"></div>
    </el-dialog>
    <div class="disabled" @click="handleClick">
      Click me
    </div>
  </div>
</template>
<script>
var myChart;
export default {
  data() {
    return {
      dialogVisible: false,
      fullscreen: false,
      dialogWidth: "100%",
      selectedOption: "day",
      mulOption: ["A相电流", "B相电流", "C相电流"],
      muloptions: ["A相电流", "B相电流", "C相电流"],
      xAxisData: [],
      yAxisData: [
        2,
        3,
        4,
        65,
        5,
        8,
        0,
        4,
        32,
        2,
        34,
        2,
        3,
        34,
        45,
        5,
        46,
        4,
        56,
        45,
        4,
        45,
        6,
        54,
        6,
        45,
        6,
        3,
        7,
        3,
        5,
        3,
        32,
        2,
        3,
        21,
        34,
        5,
        5,
        3,
        4,
        3,
        34,
        45,
        5,
        46,
        4,
        56,
        45,
        4,
        45,
        6,
        54,
        6,
        45,
        6,
        3,
        7,
        3,
        5,
      ],
      color1: "#24ffff",
      color2: "white",
    };
  },
  methods: {
    handleClick() {
      console.log("Clicked");
    },
    showModal() {
      this.dialogVisible = true;
      const now = new Date();
      const dates = [];
      const start = new Date(now);
      start.setDate(now.getDate() - 6);
      start.setHours(0, 0, 0, 0);
      for (let i = 0; i < 7; i++) {
        const date = new Date(start);
        date.setDate(start.getDate() + i);
        for (let j = 0; j < 96; j++) {
          // 96 intervals in a day (24 hours * 60 minutes / 15 minutes)
          const minute = j * 15;
          const hour = Math.floor(minute / 60);
          const minuteString = (minute % 60).toString().padStart(2, "0");
          const dateCopy = new Date(date);
          dateCopy.setHours(hour);
          dateCopy.setMinutes(parseInt(minuteString));
          dateCopy.setSeconds(0);
          const year = dateCopy.getFullYear();
          const month = (dateCopy.getMonth() + 1).toString().padStart(2, "0");
          const day = dateCopy
            .getDate()
            .toString()
            .padStart(2, "0");
          const hourString = hour.toString().padStart(2, "0");
          const second = dateCopy
            .getSeconds()
            .toString()
            .padStart(2, "0");
          dates.push(
            `${year}-${month}-${day} ${hourString}:${minuteString}:${second}`
          );
        }
      }

      // console.log(dates);
      this.xAxisData = dates;
      this.$nextTick(() => {
        this.drawChart();
      });
    },
    close() {
      this.mulOption = [];
      if (myChart) {
        myChart.dispose();
        myChart = null;
      }
      this.dialogVisible = false;
    },
    drawChart() {
      console.log(`${window.location.origin}${window.location.pathname}`);
      myChart = this.$echarts.init(document.getElementById("chart"));
      const option = this.createOption();
      myChart.setOption(option);
    },
    createOption() {
      let that = this;
      var option = {
        // tooltip: {
        //   trigger: "axis",
        // },
        tooltip: {
          trigger: "axis",
          // axisPointer: {
          //   type: "cross",
          //   label: {
          //     backgroundColor: "#6a7985",
          //   },
          // },
          formatter: function(params) {
            // console.log(params);
            var ydata = params[0].value;
            var date = params[0].axisValue;
            return "当前时间:" + date + "<br />" + "量测值:" + ydata;
          },
        },
        xAxis: {
          // type: "time",
          // splitLine: {
          //   lineStyle: {
          //     type: "dashed",
          //     color: "green",
          //   },
          // },
          // axisLabel: {
          //   interval: 15,
          // },
          data: that.xAxisData,
          axisLabel: {
            interval: 95,
            formatter: function(value) {
              // console.log(value);
              const monthDay = value ? value.substring(5, 10) : "";
              return monthDay;
            },
          },
        },
        yAxis: {
          type: "value",
          // name: "电流(A)",
          // splitLine: {
          //   lineStyle: {
          //     type: "solid",
          //     color: "#ccc",
          //     width: 2,
          //   },
          // },
        },
        series: [
          {
            type: "line",
            data: that.yAxisData,
            markPoint: {
              data: [
                {
                  type: "min",
                  name: "最低点",
                  symbol: "image://" + require("@/icons/svg/预警@3x.png"),
                },
                {
                  type: "max",
                  name: "最高点",
                  symbol: "image://" + "预警.svg",
                },
              ],
            },
          },
        ],
      };
      return option;
    },
    changeOption() {
      const option = this.createOption();
      myChart.setOption(option);
    },
    handleOptionChange(e) {},
  },
};
</script>
<style lang="less" scoped>
::v-deep .el-dialog {
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
::v-deep .el-dialog__header {
  padding: 0;
}

::v-deep .el-dialog__body {
  padding: 16px 20px 20px 20px;
}

.dialog-title {
  display: flex;
  flex-direction: column;
}

.dialog-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f3f3f3;
  height: 40px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 0 10px;
}

.dialog-header-left {
  display: flex;
  align-items: baseline;
}

.main-title {
  display: inline-block;
  font-size: 16px;
  font-weight: bold;
  margin: 0;
}

.bianhao {
  position: relative;
  width: 14px;
  height: 14px;
}

.sub-title {
  display: inline-block;
  font-size: 12px; /* 设置12px大小的字体 */
  transform-origin: right bottom;
  margin-left: 10px;
}

.dialog-buttons {
  display: flex;
  align-items: center;
}

.dialog-buttons button {
  width: 20px;
  height: 20px;
  margin-left: 5px;
  border: none;
  background: no-repeat;
  cursor: pointer;
}

.close {
  position: relative;
}

.close:before,
.close:after {
  content: "";
  position: absolute;
  top: 50%;
  left: 20%;
  transform: translate(-50%, -50%);
  width: 12px;
  height: 1px;
  background-color: #333333;
}

.close:before {
  transform: rotate(45deg);
}

.close:after {
  transform: rotate(-45deg);
}

.measurement-section {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.measurement-title {
  font-family: Source Han Sans CN;
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  color: #333333;
}

.content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.options {
  display: flex;
  align-items: center;
}

.line-red {
  width: 21px;
  height: 2px;
  background-color: #cf2b30;
  display: inline-block;
  margin-right: 7px;
}

.line-green {
  width: 21px;
  height: 2px;
  background-color: #159652;
  display: inline-block;
  margin-right: 7px;
}

.line-yellow {
  width: 21px;
  height: 2px;
  background-color: #ffc300;
  display: inline-block;
  margin-right: 7px;
}

#chart {
  height: 400px;
}

.disabled {
  // pointer-events: none;
}
</style>
