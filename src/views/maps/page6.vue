<template>
  <div>
    <el-input v-model="url" placeholder="请求URL"></el-input>
    <el-input v-model="getParams" placeholder="GET请求参数"></el-input>
    <el-input v-model="postParams" placeholder="POST请求参数"></el-input>
    <el-button @click="handleGet">执行GET请求</el-button>
    <el-button @click="handlePost">执行POST请求</el-button>
    <div>{{ response }}</div>
  </div>
</template>
<script>
import axios from "axios";
import { GetDetailed } from "@/api/apiService";
export default {
  data() {
    return {
      url: "",
      getParams: "",
      postParams: "",
      response: "",
    };
  },
  mounted() {
    GetDetailed().then((res) => {
      console.log(res, "res");
    });
    const searchParams = new URLSearchParams(
      window.location.hash.split("?")[1]
      // window.location.href
    );
    const psrId = searchParams.get("psrId");
    const psrType = searchParams.get("psrType");
    console.log(
      window.location.hash.split("?")[1],
      searchParams,
      psrId,
      psrType
    );
  },
  methods: {
    async handleGet() {
      let features = ["3245324"];
      console.log(features, this);
      this.$bus.$emit("mapclick", features[0], "1");
      // try {
      //   const response = await axios.get(
      //     this.url,
      //     JSON.parse(JSON.stringify(this.getParams))
      //   );
      //   this.response = response.data;
      // } catch (error) {
      //   console.error(error);
      // }
    },
    async handlePost() {
      try {
        const response = await axios.post(
          this.url,
          JSON.parse(JSON.stringify(this.postParams))
        );
        this.response = response.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
