<template>
  <div class="home">
    <leftTree ref="leftTree" />
    <el-button type="primary" @click="eventOpen">打开</el-button>
    <div class="layout">
      <div class="test">这里是用于测试postcss的文字 px2rem 216 rem2px 54</div>
      <div class="flex">这是用来测试flex的</div>
    </div>

    <div class="box">
      <el-scrollbar>
        <el-tree
          :data="data"
          :props="defaultProps"
          @node-click="handleNodeClick"
        ></el-tree>
      </el-scrollbar>
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
      data: [
        {
          label: "一级 1",
          children: [
            {
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-1-1",
                },
              ],
            },
          ],
        },
        {
          label: "一级 2",
          children: [
            {
              label: "二级 2-1",
              children: [
                {
                  label: "三级 2-1-1",
                },
              ],
            },
            {
              label: "二级 2-2",
              children: [
                {
                  label: "三级 2-2-1",
                },
              ],
            },
          ],
        },
        {
          label: "一级 3",
          children: [
            {
              label: "二级 3-1",
              children: [
                {
                  label: "三级 3-1-1",
                },
              ],
            },
            {
              label: "二级 3-2",
              children: [
                {
                  label: "三级 3-2-1",
                },
              ],
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
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
    handleNodeClick(data) {
      console.log(data);
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

.box {
  width: 300px;
  height: 600px;
  position: relative;
  overflow: hidden;
}

.el-scrollbar {
  height: calc(100% + 17px);
}
</style>
