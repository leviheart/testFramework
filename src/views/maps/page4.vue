<template>
  <div class="table-wrap">
    <div class="table-content">
      <a-table
        ref="table"
        url="/api/name/"
        on-load
        @onload="onload"
        :column="column"
        :list="tableData"
        :gutter="20"
        :col-button="18"
        :data="data_1"
        :default-params="default_params"
      >
      </a-table>
    </div>
  </div>
</template>
<script>
export default {
  name: "Home",
  components: {
    "a-table": () => import("./page3"),
  },
  data() {
    return {
      //sort: 'custom' sort_by: 'id' 设置排序
      column: [
        { label: "ID", prop: "id" },
        { label: "姓名", prop: "name" },
        { label: "数值1", prop: "amount1" },
        { label: "数值2", prop: "amount2" },
        { label: "数值3", prop: "amount3" },
      ],
      tableData: [
        {
          id: "1",
          name: "张三",
          amount1: "234",
          amount2: "4.43",
          amount3: 10,
        },
        {
          id: "1",
          name: "张三",
          amount1: "165",
          amount2: "4.43",
          amount3: 12,
        },
        {
          id: "1",
          name: "张三",
          amount1: "324",
          amount2: "4.43",
          amount3: 9,
        },
        {
          id: "2",
          name: "李四",
          amount1: "165",
          amount2: "4.43",
          amount3: 12,
        },
        {
          id: "2",
          name: "李四",
          amount1: "324",
          amount2: "4.43",
          amount3: 9,
        },
        {
          id: "3",
          name: "王五",
          amount1: "165",
          amount2: "4.43",
          amount3: 12,
        },
        {
          id: "3",
          name: "王五",
          amount1: "324",
          amount2: "4.43",
          amount3: 9,
        },
        {
          id: "3",
          name: "王五",
          amount1: "324",
          amount2: "4.43",
          amount3: 9,
        },
        {
          id: "4",
          name: "刘六",
          amount1: "324",
          amount2: "4.43",
          amount3: 9,
        },
        {
          id: "4",
          name: "刘六",
          amount1: "324",
          amount2: "4.43",
          amount3: 9,
        },
      ],
      data_1: {
        name: 22,
      },
      params_1: {
        name: 255555,
      },
      check_list: [],
      default_params: {
        category: 10,
      },
    };
  },
  watch: {
    check_list: {
      handler(value) {},
    },
  },
  mounted() {},
  methods: {
    getCheckList() {
      // console.log(this.check_list)
    },
    onload(data) {
      console.log(data);
    },
    formatData(data) {
      const first_data = [data[0]];
      return first_data;
    },
    jumn(data) {
      console.log(data);
    },
    category(value) {
      this.default_params.category = value;
    },
    mergeSpan({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex === 0 || rowIndex === 3) {
          return {
            rowspan: 3, // 合并的行
            colspan: 1, // 合并的列
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.table-wrap {
  margin: auto;
  background-color: #f8f8f8;
  height: 100vh;
}

.table-content {
  background-color: #fff;
  width: 1440px;
  padding: 16px;
  margin: auto;
}

::v-deep.el-table .el-table__cell {
  padding: 7px 0;
}

::v-deep.el-table tr th {
  background-color: #ebf4f7;
  border-bottom: 1px solid #e5e5e5;
}
</style>
