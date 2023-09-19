<template>
  <div>
    <el-button type="primary" @click="openDialog">打开弹框</el-button>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="90%"
      @close="handleClose"
    >
      <el-button type="primary" @click="onVisble">更改显示</el-button>
      <charDialog ref="charDialog1" :showEcharts="showEcharts1"></charDialog>
      <charDialog ref="charDialog2" :showEcharts="showEcharts2"></charDialog>
      <charDialog ref="charDialog3" :showEcharts="showEcharts3"></charDialog>
    </el-dialog>
  </div>
</template>

<script>
import charDialog from "../components/dialog.vue";
export default {
  data() {
    return {
      dialogVisible: false,
      showEcharts1: true,
      showEcharts2: true,
      showEcharts3: true,
    };
  },
  components: {
    charDialog,
  },
  mounted() {},
  methods: {
    openDialog() {
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.$refs.charDialog1.getECharts();
        this.$refs.charDialog2.getECharts();
        this.$refs.charDialog3.getECharts();
      });
    },
    onVisble() {
      this.showEcharts1 = false;
      this.showEcharts2 = false;
      this.showEcharts3 = false;
    },
  },
};
</script>

<style></style>
