<!-- $attrs 目的父传孙，写在子组件的孙组件上，孙组件里prop定义传入的属性
span-method 合并单元格
@select @select-all checkbox勾选事件
sortChange 当表格的排序条件发生变化的时候会触发该事件
sortable custom为远程排序 需要监听 Table 的 sort-change 或者 sort-by事件
sort-by 指定数据按照哪个属性进行排序
render-header 列标题 Label 区域渲染使用的 Function -->
<template>
  <div>
    <el-table
      ref="table"
      border
      :data="table_data"
      style="width: 100%"
      @sort-change="sortChange"
    >
      <el-table-column v-if="index" type="index" width="40"></el-table-column>
      <el-table-column
        v-if="checkbox"
        type="selection"
        width="40"
      ></el-table-column>
      <el-table-column
        v-for="item in column"
        :sortable="item.sort"
        :sort-by="item.sort_by"
        :render-header="item.render_header"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
      >
      </el-table-column>
    </el-table>
    <br />
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="current_page"
      :page-size="10"
      :page-sizes="[10, 20, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      table_data: [],
      // 合并的数据
      span_method_data: {},
      // 分页
      total: 0,
      current_page: 1, // 页码
      size: 10, // 条数
      // checkbox的数据
      checked_data: {},
      // checkbox的数据ID
      checked_id: [],
    };
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    column: {
      type: Array,
      default: () => [],
    },
    nodeKey: {
      type: String,
      default: "id",
    },
    checkbox: Boolean,
    index: Boolean,
    onLoad: Boolean,
    format: Function,
    initChecked: Boolean,
    mergeKey: {
      type: String,
      default: "id",
    },
    initRequest: {
      type: Boolean,
      default: true,
    },
    url: {
      type: String,
      default: "",
      require: true,
    },
    method: {
      type: String,
      default: "post",
      require: true,
    },
    data: {
      type: Object,
      default: () => ({}),
    },
    params: {
      type: Object,
      default: () => ({}),
    },
    defaultParams: {
      type: Object,
      default: () => ({}),
    },
    mergeColIndex: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    list: {
      handler(value) {
        this.table_data = value;
      },
      immediate: true,
    },
  },
  beforeDestroy() {
    this.checked_data = {};
    this.checked_id = [];
    this.table_data = [];
  },
  beforeMount() {
    this.initRequest && this.getTableList();
  },
  methods: {
    getTableList() {
      const url = this.url;
      if (!url) {
        console.log("请求地址不存在");
        return false;
      }
      const request_data = {
        url: this.url,
        method: this.method,
      };
      console.log(request_data);
      // 参数处理
      if (JSON.stringify(this.data) !== "{}") {
        request_data.data = {
          ...this.data,
          size: this.size,
          current: this.current_page,
          ...this.defaultParams,
        };
      }
      if (JSON.stringify(this.params) !== "{}") {
        request_data.params = {
          ...this.params,
          size: this.size,
          current: this.current_page,
          ...this.defaultParams,
        };
      }
      // 接口的请求
      this.$axios(request_data).then((response) => {
        let request_data = response.data.data;
        // 总页数更新
        this.total = response.data.total;
        // 数据格式化
        if (this.format && typeof this.format === "function") {
          request_data = this.format(response.data.data);
        }
        this.table_data = request_data;
        // 回调数据
        this.onLoad && this.$emit("onload", response.data.data);
      });
    },
    /** 远程排序 */
    sortChange({ column, prop, order }) {
      const sort_by = column.sortBy;
      console.log(sort_by, order);
    },
    // 分页
    handleCurrentChange(val) {
      this.current_page = val;
      this.getTableList();
    },
    handleSizeChange(val) {
      this.current_page = 1;
      this.size = val;
      this.getTableList();
    },
  },
};
</script>
<style>
.category span {
  margin-right: 10px;
}
</style>
