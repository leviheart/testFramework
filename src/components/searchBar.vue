<template>
  <div>
    <el-form :model="data" :rules="rules" ref="ruleForm" class="demo-ruleForm">
      <div class="demo-input-suffix" v-for="(item, index) in list" :key="index">
        <span
          class="search-title"
          :style="{ marginRight: item.right }"
          v-show="item.label != ''"
          >{{ item.label }}：</span
        >
        <!-- input -->
        <div @click="handleAgency(item.readonly, item.key)">
          <el-form-item :prop="item.propId ? item.propId : item.prop">
            <el-input
              v-if="item.type === 'input'"
              v-model="data[item.prop]"
              @change="item.change && item.change(data[item.prop])"
              :disabled="item.disabled && item.disabled(data)"
              :readonly="item.readonly"
              :placeholder="item.placeholder"
              :style="{ width: item.width }"
              size="small"
            ></el-input>
          </el-form-item>
        </div>
        <el-input
          v-if="item.type === 'input'"
          v-model="data[item.prop]"
          @change="item.change && item.change(data[item.prop])"
          :disabled="item.disabled && item.disabled(data)"
          :readonly="item.readonly"
          :placeholder="item.placeholder"
          :style="{ width: item.width }"
          size="small"
        ></el-input>
        <!-- input组合 -->

        <div
          v-for="(inputOp, index) in item.options"
          :key="index"
          v-if="item.inputGroup"
          :class="{
            showWarn: showArr[index] == 1,
            show: show == true && index == 0,
          }"
        >
          <el-form-item :prop="inputOp.prop">
            <el-input
              v-if="inputOp.type === 'input'"
              v-model="data[inputOp.prop]"
              :disabled="inputOp.disabled && inputOp.disabled(data)"
              :readonly="inputOp.readonly"
              :placeholder="inputOp.placeholder"
              :style="{ width: inputOp.width }"
              :type="inputOp.objType == 'number' ? 'number' : 'text'"
              :max="inputOp.max"
              :min="inputOp.min"
              size="small"
              @change="item.change && item.change(data[item.prop])"
            >
            </el-input>
            <span v-if="index == 0">-</span>
          </el-form-item>
        </div>

        <!-- select -->
        <el-select
          v-if="item.type === 'select'"
          clearable
          v-model="data[item.prop]"
          @change="item.change && item.change(data[item.prop])"
          :disabled="item.disabled && item.disabled(data)"
          :placeholder="item.placeholder"
          :readonly="item.readonly"
          size="small"
          @clear="clear(item.prop, item.clearVal)"
          :style="{ width: item.width }"
        >
          <el-option
            v-for="op in item.options"
            :key="op.value"
            :label="op.label"
            :value="op.value"
          >
          </el-option>
        </el-select>
        <!-- 多选 -->
        <el-checkbox-group
          v-if="item.type === 'checkbox'"
          v-model="data[item.prop]"
          @change="item.change && item.change(data[item.prop])"
          :disabled="item.disabled && item.disabled(editData)"
        >
          <el-checkbox
            :label="ch.key"
            v-for="ch in item.options"
            :key="ch.key"
            >{{ ch.value }}</el-checkbox
          >
        </el-checkbox-group>
        <!-- 单选 -->
        <el-radio-group
          v-if="item.type === 'radio'"
          v-model="data[item.prop]"
          @change="item.change && item.change(data[item.prop])"
          :disabled="item.disabled && item.disabled(data)"
        >
          <el-radio v-for="ra in item.options" :label="ra.key" :key="ra.key">{{
            ra.value
          }}</el-radio>
        </el-radio-group>
        <!-- 日期 -->
        <el-date-picker
          v-if="item.type === 'date'"
          v-model="data[item.prop]"
          @change="item.change && item.change(data[item.prop])"
          :disabled="item.disabled && item.disabled(data)"
          :placeholder="item.placeholder"
          :style="{ width: item.width }"
          :picker-options="item.pickerOptions ? pickerOptions : ''"
          value-format="yyyy-MM-dd"
          size="small"
        ></el-date-picker>
        <!-- 日期组合 -->
        <div
          v-for="(dateOp, index) in item.options"
          :key="index"
          v-if="item.dateGroup"
        >
          <el-form-item :prop="dateOp.prop">
            <el-date-picker
              v-if="dateOp.type === 'date'"
              v-model="data[dateOp.prop]"
              @change="dateOp.change && dateOp.change(data[dateOp.prop])"
              :disabled="dateOp.disabled && dateOp.disabled(data)"
              :placeholder="dateOp.placeholder"
              :style="{ width: dateOp.width }"
              :picker-options="dateOp.pickerOptions ? pickerOptions : ''"
              value-format="yyyy-MM-dd"
              size="small"
            ></el-date-picker>
            <span v-if="index == 0">-</span>
          </el-form-item>
        </div>
      </div>
      <div class="date-box">
        <!-- <el-button type="primary"
                   icon="el-icon-search"
                   @click="handleSearch">搜索</el-button>
        <el-button icon="el-icon-refresh"
                   @click="handleClear">清空</el-button> -->
        <el-button type="primary" @click="handleSearch">搜索</el-button>
        <el-button type="danger" plain @click="handleClear">清空</el-button>
      </div>
      <div class="expend-box" v-if="isStatistic">
        <el-button type="primary" icon="el-icon-printer" @click="handlePrint"
          >打印</el-button
        >
        <el-button type="primary" icon="el-icon-download" @click="handleExcel"
          >导出</el-button
        >
      </div>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Object,
      default: () => {},
    },
    rules: {
      type: Object,
      default: () => {},
    },
    //是否显示打印/导出
    isStatistic: {
      type: Boolean,
      default: false,
    },
    isLegal: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showArr: [],
      show: false,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6;
        },
      },
    };
  },
  watch: {
    isLegal() {
      this.$refs.ruleForm.validate((validate) => {
        // console.log(validate)
        // this.isLegal = validate;
      });
    },
  },
  methods: {
    clear(prop, clearVal) {
      this.data[prop] = clearVal;
    },
    change(val) {
      console.log("d---------------");
    },
    handleSearch() {
      this.$refs.ruleForm.validate((valid) => {
        console.log(valid);
        if (valid) {
          this.$emit("handleSearch");
        }
      });
    },
    handleClear() {
      this.$emit("handleClear");
    },
    handlePrint() {
      this.$emit("handlePrint");
    },
    handleExcel() {
      this.$emit("handleExcel");
    },
    handleAgency(readonly, key) {
      if (readonly) {
        this.$emit("handleAgency", key);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.el-input .el-input__inner {
  border: 1px solid #dcdfe6;
}

.el-input .el-input__inner:focus {
  border-color: #409eff;
}

.demo-ruleForm {
  // width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding-bottom: 12px;
}

.el-form-item__content {
  line-height: 30px;
}

.el-form-item {
  margin-bottom: 0px;
}

.el-form-item__error {
  white-space: nowrap;
}

.demo-input-suffix {
  display: flex;
  align-items: center;
  padding-top: 10px;
  margin-right: 10px;
}

.search-title {
  font-size: 14px;
  margin-left: 4px;
  color: #081b27;
  font-weight: bold;
}

.date-box,
.expend-box {
  display: flex;
  align-items: center;
  margin: 2px 4px;
  padding-top: 10px;

  .el-button {
    padding: 7px 10px;
    width: 88px;
    // height: 40px;
  }
}

.showWarn {
  .el-input__inner {
    border: 1px solid red;
  }
}

.show {
  position: relative;
}

.show::after {
  content: "请输入0到200的年龄";
  font-size: 10px;
  position: absolute;
  color: red;
  left: 0px;
  bottom: -12px;
  white-space: nowrap;
}

.marginRight {
  // margin-right: 50px;
}
</style>
