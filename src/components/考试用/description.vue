<template>
  <div class="wrapper">
    <el-row v-for="(item, index) in list" :key="index" class="descriptions-row">
      <el-col
        v-for="(table, index2) in item"
        :key="index2"
        :span="24 / item.length"
        class="descriptions-item"
      >
        <span class="label">{{ table.title }}</span>
        <span class="value">{{ table.value }}</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => [
        [
          {
            title: "姓名",
            value: "",
          },
          {
            title: "年龄",
            value: "",
          },
        ],
        [
          {
            title: "性别",
            value: "",
          },
          {
            title: "min号",
            value: "",
          },
        ],
        [
          {
            title: "个人简介",
            value: "",
          },
        ],
      ],
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  border: solid 1px #eaf2f8;

  .descriptions-row:not(:last-child) {
    border-bottom: solid 1px #eaf2f8;
  }

  .descriptions-item:not(:last-child) {
    border-right: solid 1px #eaf2f8;
  }

  .descriptions-row {
    height: 100%;
    display: flex;
  }

  .descriptions-item {
    height: 100%;
    display: flex;

    > div {
      display: flex;
    }

    .label {
      display: flex;
      align-items: center;
      width: 150px;
      text-align: left;
      background: #f2f9fc;
      color: #666;
      padding: 8px 12px;
    }

    .value {
      display: flex;
      align-items: center;
      word-wrap: break-word;
      color: #222;
      font-size: 14px;
      padding: 8px 12px;
      flex: 1;
    }
  }
}
</style>