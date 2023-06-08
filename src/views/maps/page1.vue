<template>
  <div ref="chart" style="width: 100%; height: 500px;"></div>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      const chart = this.$echarts.init(this.$refs.chart);
      const option = {
        xAxis: {
          type: "category",
          data: ["开关", "变压器", "专变用户", "居民用户"],
        },
        yAxis: {
          type: "value",
          min: 0,
          max: 5000,
        },
        series: [
          {
            type: "bar",
            data: [1000],
            itemStyle: {
              color: "#81ceff",
            },
          },
          {
            type: "bar",
            data: [
              /* your data here */
            ],
            itemStyle: {
              color: "transparent",
              borderColor: "#179bff",
              borderWidth: 1,
              borderType: "solid",
              shadowColor: "rgba(0, 0, 0, 0.5)",
              shadowBlur: 10,
            },
          },
          {
            type: "bar",
            data: [
              /* your data here */
            ],
            itemStyle: {
              color: "#81ceff",
            },
          },
          {
            type: "bar",
            data: [
              /* your data here */
            ],
            itemStyle: {
              color: "#81ceff",
            },
          },
        ],
      };
      chart.setOption(option);
    },
  },
};
</script>
