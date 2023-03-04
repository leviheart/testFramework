<template>
  <div id="container">
    <!-- 表格 -->
    <el-table
      :data="
        tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)
      "
      border
      style="width: 100%"
      @row-contextmenu="handleRowContextmenu"
    >
      <el-table-column fixed prop="date" label="日期" width="150">
      </el-table-column>
      <el-table-column fixed prop="name" label="姓名" width="120">
      </el-table-column>
      <el-table-column prop="province" label="省份" width="120">
      </el-table-column>
      <el-table-column prop="city" label="市区" width="120"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
      <el-table-column prop="zip" label="邮编" width="120"> </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pagesize"
      :page-sizes="[5, 10]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length"
    >
    </el-pagination>
  </div>
</template>

<script>
import tableData from "./data.js";
export default {
  name: "ELTable",
  data() {
    return {
      tableData,
      currentPage: 1,
      pagesize: 10,
    };
  },
  mounted() {},
  methods: {
    // 分页器方法
    handleSizeChange(val) {
      this.pagesize = val;
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    handleRowContextmenu(row, column, event) {
      this.$emit("handleRowContextmenu", row, column, event);
    },
    //新增与修改 如果是修改,那么tableData里会有一样的id
    increase(row) {
      let differ = true;
      tableData.forEach((value, index, array) => {
        if (value.id == row.id) {
          //发现相同id,进行修改
          this.$set(tableData, index, row);
          differ = false;
          return;
        }
      });
      //新增
      if (differ) {
        console.log("first");
        tableData.push(row);
      }
    },
    //删除
    delete(row) {
      tableData.forEach((value, index, array) => {
        if (value.id == row.id) {
          array.splice(index, 1);
        }
      });
    },
  },
  watch: {
    // increaseData(val) {
    //   tableData.push(val);
    // },
  },
};
</script>

<style scoped>
</style>
