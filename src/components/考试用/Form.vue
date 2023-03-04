<template>
  <el-form
    ref="ruleForm"
    :model="ruleForm"
    :label-width="labelWidth"
    :label-position="labelPosition"
  >
    <el-row :gutter="gutter">
      <template v-for="item in form_item">
        <el-col :key="item.prop" :span="item.col">
          <el-form-item
            :label="item.label"
            :prop="item.prop"
            :rules="item.rules"
            :label-width="item.label_width"
          >
            <el-input v-model="ruleForm[item.prop]"></el-input>
          </el-form-item>
        </el-col>
      </template>
    </el-row>
    <el-form-item>
      <el-button
        v-for="item in button"
        :loading="item.loading"
        :key="item.key"
        :type="item.type"
        @click="handlerButton(item)"
        >{{ item.label }}</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
import { validateSpecialKey } from "./validate.js";
export default {
  name: "Form",
  data() {
    return {
      form_item: [
        {
          prop: "date",
          col: 24,
          label: "日期",
          rules: null,
          label_width: "60px",
        },
        {
          prop: "name",
          col: 24,
          label: "姓名",
          rules: null,
          label_width: "60px",
        },
        {
          prop: "province",
          col: 24,
          label: "省份",
          rules: null,
          label_width: "60px",
        },
        {
          prop: "city",
          col: 24,
          label: "市区",
          rules: null,
          label_width: "60px",
        },
        {
          prop: "address",
          col: 24,
          label: "地址",
          rules: null,
          label_width: "60px",
        },
        {
          prop: "zip",
          col: 24,
          label: "邮编",
          rules: [
            { required: true, message: "请输入邮编", trigger: "blur" },
            {
              validator: validateSpecialKey,
              trigger: "blur",
            },
          ],
          label_width: "60px",
        },
      ],
      ruleForm: {
        date: "",
        name: "",
        province: "",
        city: "",
        address: "",
        zip: "",
      }, //表单字段
      button: [
        { loading: false, key: "submit", type: "submit", label: "确认" },
        { loading: false, key: "cancel", type: "cancel", label: "取消" },
      ], //按钮组
      gutter: 0,
      labelWidth: "200px",
      labelPosition: "left",
    };
  },
  beforeMount() {},
  methods: {
    handlerButton(data) {
      if (data.key === "submit") {
        this.submit("ruleForm");
      }
      if (data.key === "cancel") {
        this.cancel("ruleForm");
      }
    },
    submit(formName) {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          //调接口,成功后关闭弹窗
          this.$emit("changeDialogVisible", false, this.ruleForm); //这里的this.ruleForm是接口返回的
          this.$refs[formName].resetFields();
        }
      });
    },
    //取消时重置表单
    cancel(formName) {
      this.$refs[formName].resetFields();
      this.$emit("changeDialogVisible", false);
    },
    //修改
    updateRow(data) {
      console.log(data);
      this.ruleForm = data;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>