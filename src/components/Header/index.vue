<template>
  <div class="header">
    <div class="main">
      <div class="top">
        <img src="../../../public/img/logo.png" alt="" />
        <p class="name">岚山区总工会区块链共享平台</p>
        <el-input placeholder="请输入搜索内容" v-model="searchText">
          <el-button slot="append" type="primary" icon="el-icon-search"
            >搜索</el-button
          >
        </el-input>
        <div v-if="state" class="notLogin">
          <el-button class="register" type="primary" @click="goLogin"
            >登录</el-button
          >
          <el-button class="register" type="primary">注册</el-button>
        </div>
        <div v-else-if="!state">
          <el-button class="register" type="primary" @click="logOut"
            >退出登录</el-button
          >
        </div>
      </div>
      <div class="text">
        <p>推 进 劳 动 争 议 多 元 化 解 机 制 建 设</p>
        <p>构 建 和 谐 劳 动 关 系</p>
      </div>
    </div>
    <p class="note">请 按 分 类 选 择 您 需 要 咨 询 或 查 询 的 相 关 案 件</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchText: "",
      state: ""
    };
  },
  created() {
    this.judgeState();
  },
  methods: {
    judgeState() {
      let token = localStorage.getItem("token");
      if (token == null || token == "") {
        this.state = true;
      } else {
        this.state = false;
      }
    },
    goLogin() {
      this.$router.push({ path: "/login" });
    },
    logOut() {
      localStorage.removeItem("token");
      this.state = true;
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 24vw;
  background-image: url("../../../public/img/header_bg.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: relative;
  .main {
    width: 60%;
    margin: 0 auto;
    .top {
      padding-top: 10px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      position: relative;
      .notLogin {
        display: flex;
      }
      img {
        width: 60px;
        height: 60px;
      }
      p {
        color: #fff;
        font-size: 16px;
        font-weight: 600;
      }
      .el-input {
        width: 500px;
        .el-button {
          height: 58px;
        }
      }
      .el-button {
        height: 34px;
        display: flex;
        align-items: center;
      }
      .register {
        border: 1px solid #fff;
      }
    }
    .text {
      margin-top: 60px;
      p {
        text-align: right;
        font-size: 24px;
        font-weight: 600;
        color: #fff;
      }
    }
  }
  .note {
    width: 100%;
    height: 56px;
    position: absolute;
    left: 0;
    bottom: 0;
    line-height: 56px;
    color: #fff;
    font-weight: 400;
    text-align: center;
    background-color: rgba(13, 56, 187, 0.84);
  }
}
</style>
