<template>
  <div class="hello">
    <el-row>
      <el-col
        :span="5"
        :class="{ isactive: isactive[0] }"
        @click.native="oepnDialog(0)"
      >
        <div style="width: 200px;height:200px;background:red;"></div>
      </el-col>
      <el-col
        :span="5"
        :class="{ isactive: isactive[1] }"
        @click.native="oepnDialog(1)"
      >
        <div style="width: 200px;height:200px;background:red;"></div>
      </el-col>
      <el-col
        :span="5"
        :class="{ isactive: isactive[2] }"
        @click.native="oepnDialog(2)"
      >
        <div style="width: 200px;height:200px;background:red;"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      isactive: [false, false, false],
    };
  },
  methods: {
    //该组件用来应付项目新首页,实现点击效果
    oepnDialog(i) {
      let arr = this.isactive;
      for (let j = 0; j < arr.length; j++) {
        arr[j] = false;
      }
      this.$set(arr, i, true);
      // arr[i] = true;
      console.log(arr);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  width: 2000px;
  height: 1000px;
  background: blue;
}
.isactive {
  height: 600px;
  background: yellow;
}
</style>
