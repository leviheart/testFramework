<template>
	<div>
	<el-radio-group v-model="size">
		<el-radio label="">默认</el-radio>
		<el-radio label="medium">中等</el-radio>
		<el-radio label="small">小型</el-radio>
		<el-radio label="mini">超小</el-radio>
	</el-radio-group>

	<el-descriptions class="margin-top" title="带边框列表" :column="3" :size="size" border>
		<template slot="extra">
			<el-button type="primary" size="small">操作</el-button>
		</template>
		<el-descriptions-item>
			<template slot="label">
				<i class="el-icon-user"></i>
				用户名
			</template>
			kooriookami
		</el-descriptions-item>
		<el-descriptions-item>
			<template slot="label">
				<i class="el-icon-mobile-phone"></i>
				手机号
			</template>
			18100000000
		</el-descriptions-item>
		<el-descriptions-item>
			<template slot="label">
				<i class="el-icon-location-outline"></i>
				居住地
			</template>
			苏州市
		</el-descriptions-item>
		<el-descriptions-item>
			<template slot="label">
				<i class="el-icon-tickets"></i>
				备注
			</template>
			<el-tag size="small">学校</el-tag>
		</el-descriptions-item>
		<el-descriptions-item>
			<template slot="label">
				<i class="el-icon-office-building"></i>
				联系地址
			</template>
			江苏省苏州市吴中区吴中大道 1188 号
		</el-descriptions-item>
	</el-descriptions>

	<el-descriptions class="margin-top" title="无边框列表" :column="3" :size="size">
		<template slot="extra">
			<el-button type="primary" size="small">操作</el-button>
		</template>
		<el-descriptions-item label="用户名">kooriookami</el-descriptions-item>
		<el-descriptions-item label="手机号">18100000000</el-descriptions-item>
		<el-descriptions-item label="居住地">苏州市</el-descriptions-item>
		<el-descriptions-item label="备注">
			<el-tag size="small">学校</el-tag>
		</el-descriptions-item>
		<el-descriptions-item label="联系地址">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
	</el-descriptions>
	
	 <div class="block">
	    <span class="demonstration">默认</span>
	    <el-date-picker
	      v-model="value1"
	      type="daterange"
	      range-separator="至"
	      start-placeholder="开始日期"
	      end-placeholder="结束日期">
	    </el-date-picker>
	  </div>
	  <div class="block">
	    <span class="demonstration">带快捷选项</span>
	    <el-date-picker
	      v-model="value2"
	      type="daterange"
	      align="right"
	      unlink-panels
	      range-separator="至"
	      start-placeholder="开始日期"
	      end-placeholder="结束日期"
	      :picker-options="pickerOptions">
	    </el-date-picker>
	  </div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				size: '',
				
				pickerOptions: {
				          shortcuts: [{
				            text: '最近一周',
				            onClick(picker) {
				              const end = new Date();
				              const start = new Date();
				              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
				              picker.$emit('pick', [start, end]);
				            }
				          }, {
				            text: '最近一个月',
				            onClick(picker) {
				              const end = new Date();
				              const start = new Date();
				              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
				              picker.$emit('pick', [start, end]);
				            }
				          }, {
				            text: '最近三个月',
				            onClick(picker) {
				              const end = new Date();
				              const start = new Date();
				              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
				              picker.$emit('pick', [start, end]);
				            }
				          }]
				        },
				        value1: '',
				        value2: ''
			};
		}
	}
</script>

<style>
</style>
