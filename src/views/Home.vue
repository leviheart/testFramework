<template>
  <div class="home">
    <leftTree ref="leftTree" />
    <el-button type="primary" @click="eventOpen">打开</el-button>
    <div class="layout">
      <div class="test">这里是用于测试postcss的文字 px2rem 216 rem2px 54</div>
      <div class="flex">这是用来测试flex的</div>
    </div>
    <!-- <sijiMap />
    <chartview></chartview>
    <HelloWorld v-if="num.includes(6)" />
    <DeepCopy></DeepCopy>
    <VtkState></VtkState>
    <PropsCom :status="status" @changeValue="changeValue"></PropsCom>
    <Label></Label>
    <componentInput></componentInput>
    <descriptions></descriptions>
    <searchBar></searchBar>
    <AmapProject></AmapProject> -->
  </div>
</template>

<script>
// @ is an alias to /src
import leftTree from "@/views/leftTree.vue";
import sijiMap from "@/views/map.vue";
import chartview from "@/views/chartTest/index.vue";
import HelloWorld from "@/components/HelloWorld.vue";
import DeepCopy from "@/components/DeepCopy.vue";
import VtkState from "@/components/VtkState.vue";
import PropsCom from "@/components/PropsCom.vue";
import Label from "@/components/Label.vue";
import componentInput from "@/components/componentInput.vue";
import descriptions from "@/components/descriptions.vue";
import searchBar from "@/components/searchBar.vue";
import AmapProject from "@/components/AmapProject.vue";
export default {
  name: "home",
  components: {
    leftTree,
    sijiMap,
    chartview,
    HelloWorld,
    componentInput,
    descriptions,
    DeepCopy,
    VtkState,
    PropsCom,
    Label,
    searchBar,
    AmapProject,
  },
  data() {
    return {
      status: {
        one: 1,
        two: 2,
      },
      // status:12 //传基础类型会报错,复杂类型如对象不会报错
      fatherValue: null,
      num: [1, 2, 3, 4, 5],
    };
  },
  methods: {
    eventOpen() {
      console.log(
        window.document.documentElement.getBoundingClientRect().width
      );
      this.$refs.leftTree.open();
    },
    changeValue(childvalue) {
      this.fatherValue = childvalue;
    },
  },
  watch: {
    fatherValue: {
      handler(newval, oldval) {
        console.log(newval);
      },
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
