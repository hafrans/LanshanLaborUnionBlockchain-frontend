<template>
  <div class="app-container">
    <el-dialog title="通知" :visible.sync="dialogVisible" width="30%">
      <span>
        应国家法律要求,
        使用本账号服务需进行账号实名，目前您的手机号尚未进行实名认证，本平台服务将无法正常使用，请尽快前往认证。
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="$router.push('/user/selfcheckphone')"
          >前往实名</el-button
        >
      </span>
    </el-dialog>
    <!-- <Header /> -->
    <div class="main">
      <!-- <Tab /> -->
      <div class="item active">
        <p>调解事项</p>
      </div>
      <Option style="margin: 0 auto" />
    </div>
    <Message v-if="false" />
  </div>
</template>
<script>
// import Header from "@/components/Header/index.vue";
// import Tab from "@/components/Tab/index.vue";
import Option from "@/components/Option/index.vue";
import { mapState } from "vuex";

export default {
  data() {
    return {
      dialogVisible: false,
    };
  },
  mounted() {
    if (!this.userinfo.phone_checked) {
      this.dialogVisible = true;
    }
  },
  components: {
    // Header,
    // Tab,
    Option,
  },
  computed:{
    ...mapState({
      userinfo: (state) => state.user.info,
    })
  },
};
</script>

<style lang="less" scoped>
.app-container {
  // width: 100%;
  // min-width: 1366px;
  // max-width: 1366px;
  // height: 90vh;
  // margin: 0 auto;
  position: relative;
  .main {
    position: relative;
    height: 90%;
    width: 100%;
    .item {
      width: 10rem;
      margin: 0 50px;
      font-size: 1.2rem;
      color: #000;
      font-weight: bold;
      text-align: center;
      p {
        height: 40px;
        line-height: 40px;
      }
    }
    .active {
      p {
        background: linear-gradient(
          to bottom,
          rgb(97, 190, 246),
          rgb(69, 164, 221)
        );
        border-radius: 25px;
      }
      color: #fff;
    }
    // margin: 30px auto;
    // background-color: #999;
  }
}
</style>
