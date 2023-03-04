<template>
  <div id="app-containter">
    <ELTable
      ref="elTable"
      @handleRowContextmenu="handleRowContextmenu"
      v-if="elTableVisible"
    />
    <!-- 右键菜单 -->
    <context-button
      v-if="menuVisible"
      @foo="foo"
      ref="contextbutton"
      @handleMenu="handleMenu"
    ></context-button>
    <el-dialog title="新增" :visible.sync="dialogVisible" width="30%">
      <FormCom ref="formCom" @changeDialogVisible="changeDialogVisible" />
    </el-dialog>
    <description :list="list" v-if="descriptionVisible" />
  </div>
</template>
<script>
import ELTable from "./ELTable.vue";
import contextButton from "./ContextButton.vue";
import FormCom from "./Form.vue";
import description from "./description";
export default {
  name: "forExplainTest",
  components: { ELTable, contextButton, FormCom, description },
  data() {
    return {
      //右键菜单
      menuVisible: false,
      detailData: {},
      //dialog
      dialogVisible: false,
      elTableVisible: true,
      //详情组件
      list: null,
      descriptionVisible: false,
    };
  },
  mounted() {},
  methods: {
    handleRowContextmenu(row, column, event) {
      console.log(row, column, event);
      //点击鼠标右键触发
      this.detailData = row;
      this.menuVisible = false;
      this.menuVisible = true;
      // 阻止右键默认行为
      event.preventDefault();
      this.$nextTick(() => {
        this.$refs.contextbutton.init(row, column, event);
      });
    },
    foo() {
      // 取消鼠标监听事件 菜单栏
      this.menuVisible = false;
      document.removeEventListener("click", this.foo);
    },
    handleMenu(item) {
      const value = item.value;
      //点击菜单内容触发操作
      if (value == 0) {
        //新增,唤出弹框
        this.dialogVisible = true;
      } else if (value == 1) {
        //删除
        this.$refs.elTable.delete({ ...this.detailData });
      } else if (value == 2) {
        //修改 往from里面填值 以ID作为标识符
        this.dialogVisible = true;
        //组件渲染完成后调用组件方法
        this.$nextTick(function () {
          console.log(this.$refs.formCom);
          this.$refs.formCom.updateRow({ ...this.detailData });
        });
      } else if (value == 3) {
        //查看
        this.elTableVisible = false;
        this.descriptionVisible = true;
        // 请求接口,获得list数组,填入
        this.list = [
          [
            {
              title: "姓名",
              value: "我是某某某",
            },
            {
              title: "年龄",
              value: "25",
            },
          ],
          [
            {
              title: "性别",
              value: "男",
            },
            {
              title: "min号",
              value: "11111111",
            },
          ],
          [
            {
              title: "个人简介",
              value:
                "蒋冬季大三角发上来的菲利克斯都发了客家豆腐撒就看电视罚款了就打算就分开了就开了",
            },
          ],
        ];
      }
    },
    changeDialogVisible(bool, data) {
      this.dialogVisible = bool;
      if (data) {
        this.$refs.elTable.increase({ ...data });
      }
    },
  },
};
</script>

<style scoped>
</style>