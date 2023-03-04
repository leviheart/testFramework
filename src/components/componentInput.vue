<template>
	<div>
		<el-form :model="propFormObj.form" :rules="propFormObj.rules" ref="ValidateForm"
			:class="needCenter ? 'demo-ruleForm' : ''" :style="'width:' + formWidth" :status-icon="statusIcon"
			:label-position="labelPosition" :inline="inline" :label-width="labelWidth" :size="size">
			<template>
				<el-form-item v-for="(item, index) in Object.keys(propFormObj.form)" :label="
            propFormObj.extendInfo[Object.keys(propFormObj.extendInfo)[index]]
              .label
          " :prop="item" :key="item">
					<el-input v-if="
              (propFormObj.extendInfo[
                Object.keys(propFormObj.extendInfo)[index]
              ].type = 'number')
            " v-model.number="propFormObj.form[item]"></el-input>
					<el-input v-else v-model="propFormObj.form[item]"></el-input>
				</el-form-item>
			</template>
			<el-form-item>
				<el-button type="primary" @click="submitForm('ValidateForm')">提交</el-button>
				<el-button @click="resetForm('ValidateForm')">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		name: "Vue2TemplateIndex",
		props: {
			/**
			 * 整个表单的宽度
			 */
			formWidth: {
				type: String,
				default: "300px",
			},
			/**
			 * 整个表单是否需要居中
			 */
			needCenter: {
				type: Boolean,
				default: true,
			},
			/**
			 *整个表单的尺寸    medium / small / mini
			 */
			size: {
				type: String,
				default: "medium",
			},
			/**
			 * 是否为行内表单
			 */
			inline: {
				type: Boolean,
				default: false,
			},
			/**
			 * 表单  label长度
			 */
			labelWidth: {
				type: String,
				default: "80px",
			},
			/**
			 * 表单 label位置   right、left、top
			 */
			labelPosition: {
				type: String,
				default: "right",
			},
			/**
			 * 是否显示form 规则校验logo
			 */
			statusIcon: {
				type: Boolean,
				default: true,
			},
			propFormObj: {
				type: Object,
				required: false,
				default: () => ({
					/**
					 * form     表单
					 */
					form: {
						age: "",
						sex: "",
						address: "",
						name: "",
						phone: "",
					},
					/**
					 * form     表单label值和form类型
					 */
					extendInfo: {
						age: {
							label: "年龄",
							type: "number",
						},
						sex: {
							label: "性别",
							type: "string",
						},
						address: {
							label: "地址",
							type: "string",
						},
						name: {
							label: "姓名",
							type: "string",
						},
						phone: {
							label: "手机号",
							type: "string",
						},
					},
					/**
					 * 表单规则
					 */
					rules: {
						age: [{
								required: true,
								message: "年龄不能为空",
								trigger: "blur"
							},
							{
								type: "number",
								message: "年龄必须为数字值",
								trigger: "blur"
							},
							/**
							 * 你也可以自定义自己的验证规则
							 */
							{
								validator: (rule, value, callback) => {
									if (value < 0 || value > 100) {
										callback(new Error("值在0-100之间"));
									} else {
										callback();
									}
								},
							},
						],
						phone: [{
								required: true,
								message: "号码不能为空",
								trigger: "blur"
							},
							{
								validator: (rule, value, callback) => {
									if (!/^1[3-9]\d{9}/.test(value)) {
										callback(new Error("手机号码格式不对"));
									} else {
										callback();
									}
								},
							},
						],
					},
				}),
			},
		},
		data() {
			return {};
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.$message({
							message: "表单填写规则通过",
							type: "success",
						});
						this.$emit("submitForm", this.propFormObj.form);
					} else {
						this.$message({
							message: "表单填写规则不通过，请重试",
							type: "warning",
						});
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
		},
		created() {},
	};
</script>

<style lang="scss" scoped>
	.demo-ruleForm {
		margin: 0 auto;
	}
</style>
