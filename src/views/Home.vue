<template>
  <div class="home">
    <leftTree ref="leftTree" />
    <el-button type="primary" @click="eventOpen">打开</el-button>
    <div class="layout">
      <div class="test">这里是用于测试postcss的文字 px2rem 216 rem2px 54</div>
      <div class="flex">这是用来测试flex的</div>
    </div>
    <!-- <sijiMap /> -->
    <!-- <chartview></chartview> -->
  </div>
</template>

<script>
// @ is an alias to /src
import leftTree from "@/views/leftTree.vue";
import sijiMap from "@/views/map.vue";
import chartview from "@/views/chartTest/index.vue";
export default {
  name: "home",
  components: {
    leftTree,
    sijiMap,
    chartview,
  },
  methods: {
    eventOpen() {
      console.log(
        window.document.documentElement.getBoundingClientRect().width
      );
      this.$refs.leftTree.open();
    },
  },
};
</script>
<style lang="scss">
.layout {
  width: 100%;
  height: 100%;
  display: flex;
  // justify-content: space-between;
  // align-items: center;
}
.test {
  color: red;
  font-size: 20px;
  width: 500px;
  height: 200px;
}
.flex {
  font-size: 16px;
  flex: 1;
}
</style>
