<template>
  <div>
    <el-select v-model="selectedProvince" @change="handleProvinceChange">
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
      provinces: ["北京", "上海", "广东"],
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
