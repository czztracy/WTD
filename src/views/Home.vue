<template>
  <div class="home">
    <div class="BoxChunck">
      <div
        class="BGBox"
        :style="{
          background: `url(${ImgUrl}) repeat center`,
          'background-size': 'cover'
        }"
      >
        <!-- <img :src="ImgUrl" /> -->
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
                    @keyup.enter.native="handleEntrustmentInquiry"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-button
                  :icon="searchIcon"
                  @click="handleEntrustmentInquiry"
                  :disabled="searchIcon === 'el-icon-loading' ? true : false"
                  type="primary"
                  >查委托单</el-button
                >
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </div>
      <!-- 委托单信息 -->
      <div class="WTD" v-loading="WTDLoading">
        <el-card v-if="tableData && tableData.length > 0" class="box-card">
          <el-row>
            <el-select v-model="searchForm.dateType" placeholder="请选择">
              <!-- <el-option label="近三个月委托单" value="0"></el-option>
              <el-option label="近一年委托单" value="1"></el-option> -->
              <el-option label="全部委托单" value="2"></el-option>
            </el-select>
            <span class="hjwtd">合计委托单数量：{{ total }}</span>
          </el-row>
          <div v-for="(item, index) in tableData" :key="index">
            <el-divider v-if="index !== 0"></el-divider>
            <el-row :gutter="8" class="WTDInfo">
              <el-col :span="10">
                <span>委托单编号：</span>
                <span class="info">{{ item.wtdbh }}</span>
              </el-col>
              <el-col :span="7">
                <span>下单日期：</span>
                <span class="info">{{ item.orderDate }}</span>
              </el-col>
              <el-col :span="7">
                <span>委托单状态：</span>
                <span class="info">{{ item.status }}</span>
              </el-col>
            </el-row>

            <el-row style="margin-top: 24px;">
              <el-table
                :data="item.reports"
                :header-cell-style="{ color: '#666666', background: '#FAFAFA' }"
                border
                stripe
                height="241"
                style="width: 100%"
              >
                <el-table-column
                  prop="reportNo"
                  show-overflow-tooltip
                  label="报告编号"
                ></el-table-column>
                <el-table-column
                  prop="submitDate"
                  show-overflow-tooltip
                  label="上传日期"
                ></el-table-column>
                <el-table-column
                  prop="status"
                  show-overflow-tooltip
                  label="状态"
                ></el-table-column>
              </el-table>
            </el-row>

            <el-row>
              <div
                v-if="item.status !== '已完成' && item.status !== '完成'"
                style="text-align: right; margin-top: 16px;"
              >
                <el-button type="primary" @click="handleReminder(index)"
                  >我要催单</el-button
                >
              </div>
              <div
                v-else
                style="text-align: center; font-size: 13px; color: #606266; margin-top: 16px; color: red;"
              >
                您的订单已完成，感谢您的选择，如有新的测试需求请联系在线客服咨询
              </div>
            </el-row>
          </div>
          <div class="PAG">
            <el-pagination
              background
              @current-change="handleCurrentChange"
              :current-page.sync="searchForm.currentPage"
              layout="prev, pager, next"
              :page-size="searchForm.pageSize"
              :total="total"
            >
            </el-pagination>
          </div>
        </el-card>
        <!-- 未找到信息 -->
        <el-card
          v-else-if="tableData && tableData.length === 0"
          class="box-card"
        >
          <div style="padding: 6px;">
            <div class="undefind1">抱歉！未查到相关信息</div>
            <div class="undefind2">
              请检查委托单编号或手机号输入是否正确，或拨打售后客服热线0532-58668377，或<span
                class="onlineServe"
                @click="handleOnlineServe"
                >咨询在线客服</span
              >
            </div>
          </div>
        </el-card>
      </div>
      <!-- 常见问题 -->
      <div class="issue">
        <el-card class="box-card">
          <p class="line">常见问题解答</p>

          <p>Q：如何查？</p>
          <p class="line">
            A：输入委托单号或下单手机号，点击查委托单，即可查询委托单关联报告及手机号关联委托单详情。
          </p>

          <p>Q：怎么看？</p>
          <p class="line">
            A：报告为完成状态显示“完成”，除完成外，其他所有报告状态显示“未完成”。
          </p>

          <p>Q：报告状态统计是指哪些状态统计？</p>
          <p class="line">
            A：若依据委托单号查询，是指该一个委托单下所有报告的合计；若依据手机号查询，是指该手机号下所包含的所有委托单编号中所有报告的合计。
          </p>

          <p>Q：如何解读委托单状态？</p>
          <p>
            A：委托单状态说明如下：
          </p>
          <ul class="textCon">
            <li>1. <span>未下单：销售已下单，委托单系统生成中。</span></li>
            <li>2. <span>合同评审：委托单审批系统审批过程中。</span></li>
            <li>3. <span>方案编制：委托单提交至实验室。</span></li>
            <li>4. <span>样品接收：委托单审批通过，等待样品入库。</span></li>
            <li>5. <span>检测中：样品入库，实验室测试中。</span></li>
            <li>6. <span>报告中：实验测试已经完成，报告生成中。</span></li>
            <li>7. <span>评审中：报告已上传，进行审核确认。</span></li>
            <li>8. <span>完成： 订单已完结，报告已发送。</span></li>
          </ul>

          <p class="tip">
            <i class="el-icon-star-on"></i>
            <span
              >温馨提示：<span class="Click" @click="addFavorite"
                >点击这里</span
              >
              收藏本页面，下次查询更方便！</span
            >
          </p>
        </el-card>
      </div>
      <!-- 底部 -->
      <div class="bottom">
        <span>版权所有</span>
        <span>青岛斯坦德检测股份有限公司</span>
        <span class="upright"></span>
        <span>鲁ICP备16043534号-1</span>
      </div>
    </div>
  </div>
</template>

<script>
import * as API from "@/api/wtd";
export default {
  name: "Home",
  components: {},
  data() {
    return {
      ImgUrl: "./WTD.jpg",
      searchForm: {
        dateType: "2",
        currentPage: 1,
        pageSize: 10
      },
      total: 0,
      searchRules: {
        wtdno: [
          { required: true, message: "请输入委托单号或手机号", trigger: "blur" }
        ]
        // captchaCode: [
        //   { required: true, message: "请输入验证码", trigger: "blur" }
        // ]
      },
      YZMUrl: "",
      searchIcon: "el-icon-search",
      form: {},
      tableData: null,
      // 记录催单
      reminderArr: [],
      WTDLoading: false
    };
  },
  methods: {
    // 获取验证码
    GetYZMInfo() {
      this.YZMUrl = `${
        this.baseUrl
      }/report/captcha.jpg?${new Date().getTime()}`;
      this.$set(this.searchForm, "captchaCode", "");
    },
    // 委托单查询
    handleEntrustmentInquiry() {
      this.$refs.searchRuleForm.validate(valid => {
        if (valid) {
          let params = this.searchForm;
          this.searchIcon = "el-icon-loading";
          this.WTDLoading = true;
          API.getWtdData(params)
            .then(res => {
              this.searchIcon = "el-icon-search";
              this.WTDLoading = false;
              this.GetYZMInfo();
              if (res.code === 20000) {
                this.tableData = res.data.data.items;
                this.total = res.data.data.total;
                this.$set(this.searchForm, "captchaCode", "");
              }
            })
            .catch(error => {
              this.searchIcon = "el-icon-search";
              this.WTDLoading = false;
              console.log(error);
            });
        } else {
          return false;
        }
      });
    },
    // 添加收藏夹处理
    addFavorite() {
      // 获取当前网页网址
      var url = window.location;
      // 获取当前网页标题
      var title = document.title;
      // 获取当前浏览器 判断浏览器版本
      var ua = navigator.userAgent.toLowerCase();
      if (ua.indexOf("360se") > -1) {
        alert("由于360浏览器功能限制，请按 Ctrl+D 手动收藏！");
      } else if (ua.indexOf("msie 8") > -1) {
        // IE8 加入收藏夹
        window.external.AddToFavoritesBar(url, title);
        // document.all是页面内所有元素的一个集合。
      } else if (document.all) {
        try {
          window.external.addFavorite(url, title);
        } catch (e) {
          alert("您的浏览器不支持,请按 Ctrl+D 手动收藏!");
        }
      } else if (window.sidebar) {
        // firfox等浏览器
        window.sidebar.addPanel(title, url, "");
      } else {
        alert("您的浏览器不支持,请按 Ctrl+D 手动收藏!");
      }
    },
    // 选择页数
    handleCurrentChange(val) {
      this.searchForm.currentPage = val;
      this.handleEntrustmentInquiry();
    },
    // 我要催单
    handleReminder(index) {
      if (!this.reminderArr[index]) {
        this.$set(this.reminderArr, index, 1);
        this.$message({
          showClose: true,
          message: "您的催单请求已提交，请耐心等待！",
          type: "success"
        });
      } else {
        this.reminderBool = 2;
        this.$message({
          showClose: true,
          message: "同一订单每天只能催单一次哦~",
          type: "warning"
        });
      }
    },
    // 咨询在线客户
    handleOnlineServe() {
      window.open(
        "http://p.qiao.baidu.com/cps/chat?siteId=11693461&userId=25113089",
        "_blank"
      );
    }
  },
  created() {
    this.YZMUrl = this.baseUrl + "/report/captcha.jpg";
  }
};
</script>

<style scoped>
.home {
  width: 100%;
  /* min-width: 1360px;
  max-width: 1360px; */
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
  top: 27%;
  right: 50%;
  margin-right: -400px;
}
.content .TEXT {
  color: #ffffff;
  font-size: 20px;
}
.content /deep/ .el-card {
  border-radius: 8px;
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
  margin-top: 80px;
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
.content .issue {
  margin-top: 60px;
}
.content .issue /deep/ .el-card p {
  margin: 0;
  color: #666666;
  font-size: 13px;
  line-height: 20px;
}
.content .issue /deep/ .el-card p:first-child {
  font-weight: 600;
}
.content .issue /deep/ .el-card .line {
  margin-bottom: 20px;
}
.content .issue /deep/ .el-card .line:last-child {
  margin-bottom: 0;
}
.content .issue /deep/ .el-card .el-card__body {
  padding: 26px;
}
.issue ul li {
  list-style: none;
  line-height: 20px;
}
.issue ul {
  margin: 0;
  padding: 0;
  color: #666666;
  font-size: 13px;
}
.content .bottom {
  font-size: 12px;
  color: #cccccc;
  text-align: center;
  padding: 50px 0 30px 0;
}
.content .bottom span {
  padding: 0 10px;
}
.content .bottom .upright {
  display: inline-block;
  width: 1px;
  background: #cccccc;
  height: 9px;
  padding: 0;
}
.content .textCon li span {
  padding-left: 20px;
}
.content .issue p.tip {
  font-size: 16px;
  color: #ff9900;
  font-weight: 600;
  margin-top: 70px;
}
.content .issue .tip .Click {
  cursor: pointer;
  color: #ff6000;
}
.content .issue p.tip i {
  font-size: 18px;
  margin-right: 4px;
}
.content .WTD {
  margin-top: 28px;
}
.content .WTD .hjwtd {
  font-size: 14px;
  color: #606266;
  margin-left: 12px;
  vertical-align: sub;
}
.content .WTD /deep/ .el-form .el-form-item__label {
  font-size: 20px;
}
.content .WTD .WTDInfo {
  font-size: 17px;
  color: #606266;
  margin-top: 24px;
}
.content .WTD .WTDInfo .info {
  font-size: 15px;
}
.content .WTD .PAG {
  text-align: right;
  margin-top: 16px;
}
.content .WTD .undefind1 {
  text-align: center;
  color: #606266;
  font-size: 20px;
}
.content .WTD .undefind2 {
  text-align: center;
  color: #606266;
  font-size: 14px;
  margin-top: 28px;
}
.content .onlineServe {
  cursor: pointer;
}
.content .onlineServe:hover {
  color: #409eff;
  text-decoration: underline;
}
</style>
