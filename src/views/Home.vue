<template>
  <div class="home">
    <div class="BoxChunck">
      <div class="BGBox">
        <img :src="ImgUrl" />
      </div>
    </div>
    <div class="content">
      <div class="TEXT">
        <p class="wtd">委托单状态查询</p>
        <p>获取您委托单和报告最新的状态</p>
      </div>
      <!-- 查询 -->
      <div class="search">
        <el-card class="box-card">
          <el-form
            :model="searchForm"
            :rules="searchRules"
            ref="searchRuleForm"
            class="demo-ruleForm"
          >
            <el-row :gutter="12">
              <el-col :span="12">
                <el-form-item label-width="0" prop="wtdno">
                  <el-input
                    v-model.trim="searchForm.wtdno"
                    clearable
                    placeholder="请输入委托单号或手机号"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <div class="YZMBox">
                  <img :src="YZMUrl" @click="GetYZMInfo" />
                </div>
              </el-col>
              <el-col :span="4">
                <el-form-item label-width="0" prop="captchaCode">
                  <el-input
                    v-model.trim="searchForm.captchaCode"
                    clearable
                    placeholder="验证码"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-button
                  icon="el-icon-search"
                  @click="handleEntrustmentInquiry"
                  type="primary"
                  >查委托单</el-button
                >
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {
      ImgUrl: "/WTD.jpg",
      searchForm: {
        dateType: "0",
        currentPage: 1,
        pageSize: 10
      },
      searchRules: {
        wtdno: [
          { required: true, message: "请输入委托单号或手机号", trigger: "blur" }
        ],
        captchaCode: [
          { required: true, message: "请输入验证码", trigger: "blur" }
        ]
      },
      YZMUrl: ""
    };
  },
  methods: {
    // 获取验证码
    GetYZMInfo() {
      this.YZMUrl = `${
        this.baseUrl
      }/report/captcha.jpg?${new Date().getTime()}`;
    },
    // 委托单查询
    handleEntrustmentInquiry() {
      this.$refs.searchRuleForm.validate(valid => {
        if (valid) {
          console.log(this.searchForm);
        } else {
          return false;
        }
      });
    }
  },
  created() {
    this.YZMUrl = this.baseUrl + "/report/captcha.jpg";
  }
};
</script>

<style scoped>
.home {
  width: 80%;
  min-width: 1360px;
  max-width: 1360px;
  margin: 0 auto;
  position: relative;
}
.BGBox {
  height: 620px;
  width: 100%;
}
.BGBox img {
  vertical-align: middle;
  height: 100%;
  width: 100%;
  border-radius: 2px;
}
.content {
  width: 800px;
  position: absolute;
  top: 208px;
  right: 280px;
}
.content .TEXT {
  color: #ffffff;
  font-size: 20px;
}
.content .TEXT p {
  margin: 0;
}
.content .TEXT .wtd {
  font-weight: 600;
  font-size: 48px;
  margin-bottom: 16px;
}
.content .search /deep/ .el-card:first-child {
  margin-top: 100px;
}
.content .search /deep/ .el-card:first-child .el-card__body {
  padding: 28px 26px 16px;
}
.content .search /deep/ .el-card .el-form .el-form-item {
  margin-bottom: 12px;
}
.content .search /deep/ .el-card .YZMBox {
  width: 100%;
  height: 40px;
  overflow: hidden;
}
.content .search /deep/ .el-card .YZMBox img {
  vertical-align: middle;
  height: 100%;
  width: 100%;
  cursor: pointer;
}
</style>
