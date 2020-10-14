<template>
  <div class="app-container">
    <el-dialog
      title="请输入图形验证码"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span>
        <p>
          <el-row type="flex" justify="space-around">
            <el-col :span="9"
              ><Captcha
                style="height: 3em; width: 8em"
                id="captcha"
                ref="compCaptcha"
            /></el-col>
            <el-col :span="10">
              <el-input
                placeholder="请输入图片验证码"
                v-model="captcha_image.captcha_code"
                maxlength="6"
              />
            </el-col>
          </el-row>
        </p>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="checkPicCaptcha">确 定</el-button>
      </span>
    </el-dialog>

    <h2>实名认证</h2>
    <div v-if="!userinfo.phone_checked">
      <div class="tip">
        应国家法律要求, 使用本账号服务需进行账号实名，目前您的手机号
        {{ aterisknumber }} 尚未进行实名认证，本平台服务将无法正常使用。
        <br />
        <br />
        <div class="self-check">
          <div style="font-weight: bold; margin: 0.75rem 0">
            <el-row>
              <el-col :span="10">
                {{ userinfo.phone }} <b style="color: red">未验证</b>
              </el-col>
              <el-col :span="6" :offset="3">
                <el-button
                  v-if="captcha_timeout"
                  @click="dialogVisible = true"
                  type="info"
                  >获取验证码</el-button
                ><span v-else style="color: #aaa"
                  >剩余 {{ captcha_timeout_count }} 秒</span
                >
              </el-col>
            </el-row>
          </div>

          <el-row v-if="captcha_image_status">
            <el-col :span="10">
              <el-input
                placeholder="手机验证码"
                v-model="captcha"
                maxlength="6"
              >
              </el-input>
            </el-col>
            <el-col :offset="3" :span="6">
              <el-button @click="checkSMSCaptcha" type="primary"
                >验证手机号</el-button
              >
            </el-col>
          </el-row>
        </div>

        <br />
      </div>
    </div>
    <div v-else>
      <div class="tip">
        您的手机号 {{ aterisknumber }} 已通过实名认证！
        <br />
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { sendShortMessage } from "@/api/common";
import { checkSelf } from "@/api/user";

import Captcha from "@/components/captcha";

export default {
  data() {
    return {
      captcha: "", // 短信验证码
      captcha_image_status: false,
      captcha_image: {
        captcha_code: "",
        captcha_challenge: "",
        captcha_timestamp: "",
        captcha_time: "", // bugfix
      }, // 图片验证码
      captcha_timeout: true,
      captcha_timeout_count: 0,
      captcha_timeout_flag: null,
      dialogVisible: false,
    };
  },
  methods: {
    async checkSMSCaptcha() {
      // check all params correct
      if (!this.captcha_image_status) {
        this.$message({
          type: "error",
          message: "您调用该接口的途径非法",
        });
        //  invalid call! post userinfo is needed
        return;
      } // if
      if (this.captcha.length !== 6) {
        this.$message({
          type: "error",
          message: "请输入手机验证码",
        });
        return;
      } // if
      // check end
      // post req to srv
      let { status, message } = await checkSelf({
        phone_captcha: this.captcha,
      });
      if (status === 0) {
        this.$message({
          type: "success",
          message,
        });
        // dispatch getInfo
        await this.refreshUserInfo()
      } // if
    },
    async checkPicCaptcha() {
      this.captcha_image = Object.assign(
        { phone: this.userinfo.phone },
        this.captcha_image,
        this.$refs.compCaptcha.captcha
      );
      // >>>> bug fix captcha check request field error srv returns 422
      this.captcha_image.captcha_time = this.captcha_image.captcha_timestamp;
      // <<<< bug fix end
      // check captcha
      let { status, message } = await sendShortMessage(this.captcha_image);
      if (status === 0) {
        this.$message({
          type: "success",
          message,
        });
        this.startTick();
        this.dialogVisible = false;
        this.captcha_image_status = true;
      } else {
        // otherwise
      } // if
    },
    startTick() {
      if (this.captcha_timeout_flag != null) {
        clearTimeout(this.captcha_timeout_flag);
        this.captcha_timeout_flag = null;
      } // if
      this.captcha_timeout = false;
      this.captcha_timeout_count = 60;
      let ticker = () => {
        // run per second.
        if (this.captcha_timeout_count > 0) {
          this.captcha_timeout_count -= 1;
          this.captcha_timeout_flag = setTimeout(ticker, 1000);
        } else {
          clearTimeout(this.captcha_timeout_flag);
          this.captcha_timeout_flag = null;
          this.captcha_timeout = true;
        }
      }; // ticker
      this.captcha_timeout_flag = setTimeout(ticker, 1000);
    },
  },
  computed: {
    ...mapState({
      userinfo: (state) => state.user.info,
    }),
    aterisknumber() {
      return this.$store.state.user.info.phone.substring(0, 3) + "********";
    },
    ...mapActions({
        'refreshUserInfo': "user/getInfo"
    })
  },
  beforeDestroy() {
    if (this.captcha_timeout_flag != null) {
      clearTimeout(this.captcha_timeout_flag);
    }
  },
  components: {
    Captcha,
  },
};
</script>
<style>
.tip {
  background: rgba(64, 158, 255, 0.2);
  width: 75%;

  font-weight: 200;
  padding: 1.2rem;
  margin: 1rem 0 2rem 0;
  line-height: 150%;
}
.self-check > div {
  margin: 0.75em auto;
}
</style>