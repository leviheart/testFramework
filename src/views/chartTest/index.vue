<template>
  <chart-view
    class="chart-content"
    :chart-option="chartOpt"
    :auto-resize="true"
    height="600px"
  />
</template>

<script>
export default {
  name: "chartTestView",
  data() {
    return {
      chartOpt: {},
    };
  },
  mounted() {},
  created() {
    this.chartOpt = this.$eChartFn.testBar();
  },
  methods: {},
  watch: {},
};
</script>

<style>
</style>