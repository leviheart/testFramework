<template>
  <div>
    <input v-model="newData" />
    <div>{{ status.one }}</div>
    <button type="button" @click="back">click</button>

    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      :key="domin.one"
      v-if="formStatus"
    >
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="活动区域" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <el-form
      :model="ruleForm1"
      :rules="rules"
      ref="ruleForm1"
      label-width="100px"
      class="demo-ruleForm"
      :key="domin.two"
      v-if="formStatus1"
    >
      <el-form-item label="活动名称1" prop="name">
        <el-input v-model="ruleForm1.name"></el-input>
      </el-form-item>
      <el-form-item label="活动区域1" prop="region">
        <el-select v-model="ruleForm1.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <el-button @click="showForm">显示</el-button>
    <el-button @click="showForm1">显示1</el-button>
  </div>
</template>

<script>
export default {
  name: "PropsCom",
  props: {
    status: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      newData: null,
      ruleForm: {
        name: null,
        region: null,
      },
      ruleForm1: {
        name: null,
        region: null,
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入活动名称",
            trigger: "blur",
          },
          {
            min: 3,
            max: 5,
            message: "长度在 3 到 5 个字符",
            trigger: "blur",
          },
        ],
        region: [
          {
            required: true,
            message: "请选择活动区域",
            trigger: "change",
          },
        ],
      },
      formStatus: false,
      formStatus1: false,
      domin: {
        one: 1,
        two: 2,
      },
    };
  },
  mounted() {
    this.newData = this.status.one;
  },
  methods: {
    back() {
      this.$emit("changeValue", this.newData);
    },
    showForm() {
      this.formStatus = !this.formStatus;
      this.formStatus1 = false;
    },
    showForm1() {
      this.formStatus1 = !this.formStatus1;
      this.formStatus = false;
    },
  },
};
</script>

<style>
</style>
<!-- 传入的props,把对象中的一个属性赋值给子组件里的参数,如果赋的是基础数据类型,则不需要深拷贝 -->
<!-- 给form单独的key,防止验证问题 key要求是基本类型 并且值唯一 -->
