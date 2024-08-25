<template>
  <div>
    <el-select
      v-model="selectedProvince"
      multiple
      popper-class="custom-select-dropdown"
      @change="handleProvinceChange"
    >
      <el-option
        v-for="province in provinces"
        :key="province"
        :label="province"
        :value="province"
      ></el-option>
    </el-select>
    <el-select v-model="selectedCity">
      <el-option
        v-for="(city, index) in cities[selectedProvince]"
        :key="city"
        :label="city"
        :value="city"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedProvince: "",
      selectedCity: "",
      provinces: ["北京", "上海", "广东","南昌","扬州"],
      cities: {
        北京: ["北京市"],
        上海: ["上海市"],
        广东: ["广州市", "深圳市", "珠海市"],
      },
    };
  },
  mounted() {
    this.$bus.off("mapclick");
    this.$bus.$on("mapclick", (res, res1) => {
      console.log("res", res, res1);
    });
  },
  methods: {
    handleProvinceChange() {
      this.cities = {
        北京: ["北京市"],
        上海: ["上海市"],
        广东: ["广州市", "深圳市", "珠海市"],
      };
      if (this.selectedProvince === "北京") {
        this.cities = {
          北京: ["北京市"],
        };
      } else if (this.selectedProvince === "上海") {
        this.cities = {
          上海: ["上海市"],
        };
      } else if (this.selectedProvince === "广东") {
        this.cities = {
          广东: ["广州市", "深圳市", "珠海市"],
        };
      }
      this.selectedCity = "";
    },
  },
};
</script>

<style scoped>
.custom-select-dropdown {
  max-height: 200px; /* 设置一个固定的最大高度 */
  overflow-y: auto; /* 添加垂直滚动条 */
}

/* 限制标签的宽度并添加滚动条 */
::v-deep .el-select__tags {
  flex-wrap: nowrap; /* 不允许换行 */
  overflow-x: auto; /* 添加水平滚动条 */
}

/* 自定义滚动条样式 */
::v-deep .el-select__tags::-webkit-scrollbar {
  width: 4px; /* 滚动条宽度 */
  height: 4px; /* 滚动条高度 */
}

::v-deep .el-select__tags::-webkit-scrollbar-track {
  background-color: #f2e8e8; /* 滚动条轨道背景颜色 */
}

::v-deep .el-select__tags::-webkit-scrollbar-thumb {
  background-color: #a99090; /* 滚动条滑块颜色 */
  border-radius: 4px; /* 滑块圆角 */
}

::v-deep .el-select__tags::-webkit-scrollbar-thumb:hover {
  background-color: #c5a8a8; /* 滑块悬停颜色 */
}

::v-deep .el-select__tags-text {
  white-space: nowrap; /* 单行显示 */
}
</style>
