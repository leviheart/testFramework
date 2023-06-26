<template>
  <div class="leftTree">
    <!-- <el-button type="primary">按钮</el-button> -->
    <!-- <div id="svg" v-html="svgString" v-svgWheel v-svgDrag></div> -->
    <svg-icon className="svg-icon-18" iconClass="email"></svg-icon>
    <svg-icon className="svg-icon-18" iconClass="phone"></svg-icon>
    <svg-icon className="svg-icon-18" iconClass="sousuo1"></svg-icon>
    <img :src="eye" alt="SVG Icon" />
    <!-- ymx问题测试 -->
    <div style="display: inline-block">
      <el-dialog
        :visible.sync="dialog"
        :close-on-click-modal="false"
        :before-close="cancel"
        :title="title"
        append-to-body
        width="475px"
        @close="cancel"
      >
        <div v-for="(item, index) in detail" :key="item.id">
          <el-form
            :ref="'form' + index"
            :model="form"
            :rules="rules"
            size="small"
            label-width="88px"
          >
            <el-form-item label="新邮箱" prop="email" :key="item.it1">
              <el-input v-model="form.email" />
            </el-form-item>
            <el-form-item label="验证码" prop="code" :key="item.it2">
              <el-input v-model="form.code" style="width: 320px" />
            </el-form-item>
            <el-form-item label="当前密码" prop="pass" :key="item.it3">
              <el-input
                v-model="form.pass"
                type="password"
                style="width: 320px"
              />
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
    </div>
    <el-table
      :data="
        tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      "
      style="width: 100%"
    >
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <div class="block" style="margin-top: 15px">
      <el-pagination
        align="center"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[1, 5, 10, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
      >
      </el-pagination>
    </div>
    <div class="content_show">
      测试变量 这种方式是可以的，只有添加新元素和新属性时需要$set{{
        params.pageNum
      }}
    </div>
  </div>
</template>

<script>
import eye from "@/icons/svg/eye.svg";
export default {
  name: "leftTree",
  data() {
    return {
      svgString: "",
      loading: false,
      dialog: false,
      title: "修改邮箱",
      form: {
        pass: "",
        email: "",
        code: "",
      },
      codeLoading: false,
      buttonName: "获取验证码",
      time: 60,
      rules: {
        pass: [
          {
            required: true,
            message: "当前密码不能为空",
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            trigger: "blur",
          },
        ],
        code: [
          {
            required: true,
            message: "验证码不能为空",
            trigger: "blur",
          },
        ],
      },
      detail: [
        { id: 1, it1: "it1", it2: "it2", it3: "it3" },
        { id: 2, it1: "it11", it2: "it22", it3: "it33" },
      ],
      tableData: [
        {
          date: "2016-05-02",
          name: "第一页",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "第二页",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "第三页",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "第四页",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-01",
          name: "第五页",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "第六页",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-02",
          name: "第一页",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "第二页",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "第三页",
          address: "上海市普陀区金沙江路 1519 弄",
        },
      ],
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 2, // 每页的数据条数
      params: {
        pageNum: 1,
      },
    };
  },
  mounted() {
    this.svgString = `<svg t="1611065394758" class="icon" viewBox="0 0 3166 3166" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4813" xmlns:xlink="http://www.w3.org/1999/xlink" width="1024" height="1024"><defs><style type="text/css"></style></defs><path d="M512 128q69.674667 0 135.509333 21.162667t115.498667 54.997333 93.482667 74.837333 73.685333 82.005333 51.669333 74.837333 32.170667 54.826667l9.984 21.333333q-2.346667 4.992-6.314667 13.482667t-18.816 34.688-31.658667 51.669333-44.330667 59.989333-56.832 64.341333-69.504 60.16-82.346667 51.498667-94.848 34.688-107.349333 13.482667q-69.674667 0-135.509333-21.162667t-115.498667-54.826667-93.482667-74.325333-73.685333-81.493333-51.669333-74.496-32.170667-54.997333l-9.984-20.992q2.346667-4.992 6.314667-13.482667t18.816-34.816 31.658667-51.84 44.330667-60.330667 56.832-64.682667 69.504-60.330667 82.346667-51.84 94.848-34.816 107.349333-13.482667zM512 213.333333q-46.677333 0-91.648 12.330667t-81.152 31.829333-70.656 47.146667-59.648 54.485333-48.853333 57.685333-37.674667 52.821333-26.325333 43.989333q12.330667 21.674667 26.325333 43.52t37.674667 52.352 48.853333 57.002667 59.648 53.845333 70.656 46.677333 81.152 31.488 91.648 12.16 91.648-12.330667 81.152-31.658667 70.656-46.848 59.648-54.186667 48.853333-57.344 37.674667-52.650667 26.325333-43.648q-12.330667-21.674667-26.325333-43.648t-37.674667-52.650667-48.853333-57.344-59.648-54.186667-70.656-46.848-81.152-31.658667-91.648-12.330667zM512 341.333333q70.656 0 120.661333 50.005333t50.005333 120.661333-50.005333 120.661333-120.661333 50.005333-120.661333-50.005333-50.005333-120.661333 50.005333-120.661333 120.661333-50.005333zM512 426.666667q-35.328 0-60.330667 25.002667t-25.002667 60.330667 25.002667 60.330667 60.330667 25.002667 60.330667-25.002667 25.002667-60.330667-25.002667-60.330667-60.330667-25.002667z" p-id="4814"></path></svg>`;
    document.innerHtml = `<div style="width:20px;height:20px;">${eye}</div>`;
    const timer1 = (a) => {
      return new Promise((res) =>
        setTimeout(() => {
          res(a);
        }, 1 * 1000)
      );
    };

    const timer2 = (a) => {
      return new Promise((res) =>
        setTimeout(() => {
          res(a);
        }, 2 * 1000)
      );
    };

    const timer3 = (a) => {
      return new Promise((res) =>
        setTimeout(() => {
          res(a);
        }, 3 * 1000)
      );
    };
    //按数组里的索引顺序来打印data,等所有异步执行完毕后再执行
    const all = Promise.all([timer2("first"), timer1("second")]).then((data) =>
      console.log(data)
    );

    this.PromiseTest();
  },
  methods: {
    open() {
      this.dialog = true;
      this.$nextTick(() => {
        console.log(this.$refs);
        this.$refs.form0[0].resetFields();
      });
    },
    cancel() {
      this.resetForm();
    },
    resetForm() {
      this.dialog = false;
      // console.log(this.$refs.form)
      // this.$refs.form[0].resetFields()
      // this.form = {
      //   pass: '',
      //   email: '',
      //   code: ''
      // }
    },
    async PromiseTest() {
      const timer1 = (a) => {
        return new Promise((res) =>
          setTimeout(() => {
            res(a);
          }, 1 * 1000)
        );
      };
      await this.PromiseTest1("1111111111");
      console.log("第一次等待");
    },
    async PromiseTest1(text) {
      const timer2 = (a) => {
        return new Promise((res) =>
          setTimeout(() => {
            res(a);
          }, 2 * 1000)
        );
      };
      console.log("timer2执行前");
      await timer2(text);
      console.log("timer2执行完成");
      await this.PromiseTest2("2222222222");
    },
    async PromiseTest2(text) {
      const timer3 = (a) => {
        return new Promise((res) =>
          setTimeout(() => {
            res(a);
          }, 3 * 1000)
        );
      };
      console.log("timer3执行前");
      await timer3(text);
      console.log("timer3执行完成");
    },
    //每页条数改变时触发 选择一页显示多少行
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.params.pageNum = val;
      this.$set(this.params, "pageNum", 2);
      console.log("测试变量", this.params.pageNum, this.params);
    },
  },
};
</script>

<style scoped lang="scss">
.leftTree {
  // position: absolute;
  width: 100%;
  height: 100%;
}

svg {
  fill: blue !important;
}

#sousuo {
  fill: blue !important;
}

.content_show {
  width: 500px;
}
</style>
