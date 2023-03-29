<template>
  <div class="userContent">
    <div class="wz">基本信息</div>
    <el-dialog
      title="用户档案"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose"
      :append-to-body="true"
      :close-on-click-modal="false"
    >
      <div style="display: flex;">
        <!-- 用户信息 -->
        <div class="leftUserInfo">
          <!-- <svg-icon iconClass="用户头像" class="userHead"></svg-icon> -->
          <div class="userName">{{ resData.custName }}</div>
          <div style="display: flex;margin-bottom: 15px;">
            <!-- <svg-icon iconClass="bianhao" class="bianhao"></svg-icon> -->
            <div class="bianhao_Text">{{ resData.custNo }}</div>
          </div>
          <div style="display: flex;justify-content: space-between;">
            <div class="userType">
              <!-- <svg-icon
                iconClass="fuwuleixing"
                class="userType-icon"
              ></svg-icon> -->
              <div class="userType_Text">{{ resData.custClsName }}</div>
            </div>
            <div class="userVoltageName">
              <!-- <svg-icon
                iconClass="IOTtubiao_huabanfuben-2"
                class="voltageName-icon"
              >
              </svg-icon> -->
              <div class="voltageName_Text">{{ resData.voltageName }}</div>
            </div>
          </div>
        </div>
        <div style="display: flex;flex-direction: column;margin-left: 20px;">
          <div style="display: flex;flex-direction: column;">
            <div class="title1">基本信息</div>
            <el-form :model="userForm" size="mini" label-width="auto">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="联系方式">
                    <el-input
                      v-model="resData.contactInfo"
                      :disabled="true"
                      width="340px"
                      :title="resData.contactInfo"
                    >
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="联系地址">
                    <el-input
                      v-model="resData.custAddr"
                      :disabled="true"
                      width="340px"
                      :title="resData.custAddr"
                    >
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="用电户用能地址">
                    <el-input
                      v-model="resData.ecAddr"
                      :disabled="true"
                      width="340px"
                      :title="resData.ecAddr"
                    >
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div style="display: flex;flex-direction: column;">
            <div class="title1">详细信息</div>
            <div style="margin-left: 40px;">
              <el-form :model="userForm" size="mini" label-width="auto">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="所在地区">
                      <el-input
                        v-model="inputCon1"
                        :disabled="true"
                        width="340px"
                        :title="inputCon1"
                      >
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="详细地址">
                      <el-input
                        v-model="inputCon2"
                        :disabled="true"
                        width="340px"
                        :title="inputCon2"
                      >
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { queryUserInfoByConsNo } from "_api/apiserve.js";
export default {
  data() {
    return {
      dialogVisible: true,
      userForm: {
        list: [
          {
            custNo: "用户编号",
            custName: "用户名称",
            custClsName: "用户类型",
            voltageName: "用户电压等级",
          },
          {
            contactInfo: "联系方式",
            custAddr: "联系地址",
            ecAddr: "用电户用能地址",
          },
          {
            provName: "省名称",
            cityName: "市名称",
            cmnyName: "小区名称",
            countyName: "区县名称",
            stName: "街道名称（乡镇）",
            rdName: "道路名称",
            neighborCommName: "社区名称（村）",
          },
        ],
      },
      resData: {
        custNo: null,
        provName: null,
        contactInfo: null,
        ecAddr: null,
        provCode: null,
        cityCode: null,
        custAddr: null,
        stName: null,
        custName: null,
        custCls: null,
        stCode: null,
        voltage: null,
        countyCode: null,
        neighborCommCode: null,
        rdName: null,
        cityName: null,
        rdCode: null,
        neighborCommName: null,
        cmnyCode: null,
        cmnyName: null,
        countyName: null,
      },
      inputCon1: null,
      inputCon2: null,
    };
  },
  mounted() {},
  methods: {
    // 父调子(传值)
    getUserInfo(val) {
      console.log(val, "用户档案的值");
      queryUserInfoByConsNo({ consNo: val }).then((res) => {
        console.log(res, "3333");
        if (res.data.result.length == 0) {
          this.dialogVisible = false;
          this.$message("未查询到数据");
        } else {
          this.resData = res.data.result[0];
          this.dialogVisible = true;
          this.inputCon1 = `${this.resData.provName}${this.resData.cityName}${this.resData.cmnyName}`;
          this.inputCon2 = `${this.resData.countyName}${this.resData.stName}${this.resData.rdName}${this.resData.neighborCommName}`;
        }
      });
    },
    // 弹出框的关闭
    handleClose() {
      this.dialogVisible = false;
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.el-dialog {
  border-radius: 10px !important;
}

/deep/.el-dialog__header {
  display: flex;
  height: 53px;
  background-color: #f7f7f7;
  align-items: center;
  border-radius: 10px;
  padding: 0 !important;
}

/deep/.el-dialog__title {
  display: inline-block;
  color: #666666;
  font-size: 20px !important;
  font-family: SourceHanSansCN-Medium;
  margin-left: 26px;
}

/deep/.el-dialog__headerbtn {
  position: absolute;
  top: 13px !important;
}

/deep/.el-dialog__close {
  color: #707070 !important;
}

/deep/.el-input__inner {
  width: 340px;
  height: 32px;
}

/deep/.el-col-8 {
  margin-top: 18px;
}

.userContent {
}

.leftUserInfo {
  width: 188px;
  height: 260px;
  background-color: #ffffff;
  box-shadow: 0px 3px 6px 0px rgba(25, 52, 85, 0.16);
  border-radius: 26px;
  border: solid 1px #70aeeb;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  .userHead {
    width: 80px;
    height: 80px;
  }

  .userName {
    font-family: Source Han Sans CN;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 24px;
    letter-spacing: 0px;
    color: #333333;
    margin: 18px 31px 10px 31px;
  }

  .bianhao {
    position: relative;
    top: 3px;
    width: 14px;
    height: 14px;
  }

  .bianhao_Text {
    font-family: Source Han Sans CN;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 20px;
    letter-spacing: 0px;
    color: #333333;
    margin-left: 5px;
  }

  .userType {
    width: 70px;
    height: 28px;
    background-image: linear-gradient(315deg, #9ccaf8 0%, #539feb 100%);
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 8px;
  }

  .userVoltageName {
    width: 70px;
    height: 28px;
    background-image: linear-gradient(316deg, #d196d6 0%, #bf68c7 100%);
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .userType-icon {
    width: 16px;
    height: 16px;
  }

  .userType_Text {
    font-family: Source Han Sans CN;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 20px;
    letter-spacing: 0px;
    color: #ffffff;
  }

  .voltageName-icon {
    width: 18px;
    height: 18px;
  }

  .voltageName_Text {
    font-family: Source Han Sans CN;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 20px;
    letter-spacing: 0px;
    color: #ffffff;
  }
}

.title1 {
  font-family: Source Han Sans CN;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 24px;
  letter-spacing: 0px;
  color: #333333;
}

.wz {
  width: 56px;
  height: 14px;
  font-family: Source Han Sans CN;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 24px;
  letter-spacing: 0px;
  color: #333333;
}
</style>
