<template>
  <div class="app-container">
    <div class="tip">
      您的腾讯会议账号绑定到该平台后，您登录腾讯会议时系统会提示您选择账号，请您选择“日照市岚山区总工会”，以便对会议进行管理操作，如果使用个人账号则对会议没有管理权限。
      <br />
      <b>如果需要解绑腾讯会议企业账号，请点击解绑按钮。</b> <br />
      <b>您在解绑后，对于您已创建的会议，您将不再拥有其管理权限！</b><br>
     如果您在该平台内创建新的会议，系统将自动为您重新绑定。
    </div>
    <div>
      <el-button size="large" type="primary" @click="deleteAccount" :disabled="!(claims.type == 1 || claims.type == 4)">解绑</el-button>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { deleteMeetingAccount } from "@/api/meeting";
export default {
  data: () => {
    return {};
  },
  methods: {
    deleteAccount() {
      let myLoading = null;
      this.$confirm("此操作将解绑会议账户，会议账户将在下次创建会议时自动绑定，您确定?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          myLoading = this.$loading({
            lock: true,
            text: "处理中",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
          });
          return deleteMeetingAccount();
        })
        .then((resp) => {
          if (resp.status == 0) {
            this.$message({
              type: "success",
              message: "解绑成功!",
            });
          } else {
            this.$message({
              type: "success",
              message: "解绑失败!",
            });
          }
          this.loadMyMeeting();
        })
        .finally(() => {
          if (myLoading !== null) {
            myLoading.close();
          }
        });
    },
  },
  computed:{
      ...mapState({
          claims : state => state.user.claims
      })
  }
};
</script>
<style scoped>
.tip {
  background: rgba(64, 158, 255, 0.2);
  width: 75%;
  height: 150px;
  font-weight: 200;
  padding: 1.2rem;
  margin: 1rem 0 2rem 0;
  line-height: 150%;
}
</style>