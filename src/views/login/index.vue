<template>
  <div class="login-container">
    <div class="top">
      <img src="../../../public/img/logo.png" alt="">
      <p class="name">岚山区总工会区块链共享平台</p>
      <div class="registered">
        <el-button
          style="width:100%;margin-bottom:30px;"
          @click="goRegistered"
        >{{ regtext }}</el-button>
      </div>
    </div>
    <div v-if="clickReg" class="regist">
      <el-tabs type="border-card">
        <el-tab-pane label="用人单位账号注册">
          <el-form ref="ruleForm" :model="ruleForm" status-icon :rules="rules" label-width="170px" class="ruleForm">
            <el-form-item label="用人单位地址" prop="employer_address">
              <el-input v-model="ruleForm.employer.employer_address" />
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="ruleForm.email" />
            </el-form-item>
            <el-form-item label="联系方式" prop="employer_contact">
              <el-input v-model="ruleForm.employer.employer_contact" />
            </el-form-item>
            <el-form-item label="法人代表" prop="employer_faren">
              <el-input v-model="ruleForm.employer.employer_faren" />
            </el-form-item>
            <el-form-item label="用人单位" prop="employer_name">
              <el-input v-model="ruleForm.employer.employer_name" />
            </el-form-item>
            <el-form-item label="社会统一信用代码" prop="employer_uscc">
              <el-input v-model="ruleForm.employer.employer_uscc" />
            </el-form-item>

            <el-form-item label="密码" prop="password">
              <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item label="确认密码" prop="confirm_password">
              <el-input v-model="ruleForm.confirm_password" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item label="手机号码" prop="phone">
              <el-input v-model="ruleForm.phone" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="employer('ruleForm')">注册</el-button>
            </el-form-item>
          </el-form>

        </el-tab-pane>
        <el-tab-pane label="劳动者账号注册">
          <el-form ref="laborForm" :model="laborForm" status-icon :rules="rules" label-width="170px" class="laborForm">
            <el-form-item label="地址" prop="applicant_address">
              <el-input v-model="laborForm.applicant.applicant_address" />
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="ruleForm.email" />
            </el-form-item>
            <el-form-item label="生日" prop="applicant_birth">
              <el-date-picker
                v-model="laborForm.applicant.applicant_birth"
                type="date"
                value-format="yyyy-MM-dd"
              />
            </el-form-item>
            <el-form-item label="联系方式" prop="applicant_contact">
              <el-input v-model="laborForm.applicant.applicant_contact" />
            </el-form-item>
            <el-form-item label="身份证号" prop="applicant_id">
              <el-input v-model="laborForm.applicant.applicant_id" />
            </el-form-item>
            <el-form-item label="姓名" prop="applicant_name">
              <el-input v-model="laborForm.applicant.applicant_name" />
            </el-form-item>
            <el-form-item label="国籍" prop="applicant_nationality">
              <el-input v-model="laborForm.applicant.applicant_nationality" />
            </el-form-item>

            <el-form-item label="密码" prop="password">
              <el-input v-model="laborForm.password" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item label="确认密码" prop="confirm_password">
              <el-input v-model="laborForm.confirm_password" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item label="手机号码" prop="phone">
              <el-input v-model="laborForm.phone" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="labor('laborForm')">点击注册</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div v-if="!clickReg" class="login">
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        auto-complete="on"
        label-position="left"
      >
        <div class="title-container">
          <h3 class="title">统一用户登录</h3>
            <!-- <el-tabs v-model="tabActiveName" @tab-click="tabHandleClick">
    <el-tab-pane label="普通用户" name="first">普通用户</el-tab-pane>
    <el-tab-pane label="职能部门" name="second">职能部门</el-tab-pane>
    <el-tab-pane label="管理员" name="third">管理员</el-tab-pane>
  </el-tabs> -->
  <div class="menuList">
      <ul>
        <li v-for="(item,index) in list" :key="item.id" :class="{active:num==index}" @click="getNum(index)">
          {{item}}
        </li>
      </ul>
    </div>
<!--     <div class="tabCon">
      <div v-for='(itemCon,index) in tabContents' v-show="index == num">
        {{itemCon}}
      </div>
    </div> -->
        </div>

        <el-form-item prop="phone">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="phone"
            v-model="loginForm.phone"
            placeholder="用户手机号"
            name="phone"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>

        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="密码"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>

        <el-form-item prop="captcha">
          <span class="svg-container">
            <i class="el-icon-c-scale-to-original" />
          </span>
          <el-input
            ref="captcha"
            v-model="loginForm.captcha"
            style="width:60%"
            type="text"
            placeholder="验证码"
            name="captcha"
            tabindex="3"
            auto-complete="off"
            @keyup.enter.native="handleLogin"
          />
          <Captcha id="login" ref="captchax" style="width:25%" />
        </el-form-item>

        <el-button
          :loading="loading"
          type="primary"
          style="width:100%;margin-bottom:30px;"
          @click.native.prevent="handleLogin"
        >Login</el-button>

      <!-- <div class="tips">
        <span style="margin-right:20px;">username: admin</span>
        <span>password: any</span>
      </div>-->
      </el-form>
    </div>
  </div>
</template>

<script>
import { validPhone } from "@/utils/validate";
import { employerReg, laborReg } from "@/api/user";
import Captcha from "@/components/captcha";

export default {
  name: "Login",
  components: {
    Captcha
  },
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    const validatePhone = (rule, value, callback) => {
      if (!validPhone(value)) {
        callback(new Error("请输入合法的手机号码"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 4) {
        callback(new Error("密码长度不能小于4"));
      } else {
        callback();
      }
    };

    const validateCaptcha = (rule, value, callback) => {
      console.log(value)
      if (value.length !== 6) {
        callback(new Error("验证码长度必须为6"));
      } else {
        callback();
      }
    };
    return {
      num: 0,
      list: ["普通用户", "职能部门", "管理员"],
      regtext: "注册账号",
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now();// 如果没有后面的-8.64e6就是不可以选择今天的
        }
      },
      laborForm: {
        password: '',
        confirm_password: '',
        phone: '',
        email: "",
        applicant: {
          applicant_address: "",
          applicant_birth: "",
          applicant_contact: "",
          applicant_id: "",
          applicant_name: "",
          applicant_nationality: ""
        }
      },
      ruleForm: { password: '',
        confirm_password: '',
        phone: '',
        email: "",
        employer: {
          employer_address: "",
          employer_contact: "",
          employer_faren: "",
          employer_name: "",
          employer_uscc: ""
        }},
      rules: {
        // employer_address: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        // employer_contact: [{ required: true, trigger: "blur" }],
        // employer_faren: [{ required: true, trigger: "blur" }],
        // employer_name: [{ required: true, trigger: "blur" }],
        // employer_uscc: [{ required: true, trigger: "blur" }],
        // applicant_address: [{ required: true, trigger: "blur" }],
        // applicant_birth: [{ required: true, trigger: "blur" }],
        // applicant_contact: [{ required: true, trigger: "blur" }],
        // applicant_id: [{ required: true, trigger: "blur" }],
        // applicant_name: [{ required: true, trigger: "blur" }],
        // applicant_nationality: [{ required: true, trigger: "blur" }],
        password: [
          { validator: validatePass, trigger: 'blur' },
          { min: 4, message: '长度最少4字符', trigger: 'blur' }
        ],
        confirm_password: [
          { validator: validatePass2, trigger: 'blur' },
          { min: 4, message: '长度最少4字符', trigger: 'blur' }
        ],
        phone: [
          { validator: validatePhone, trigger: 'blur' }
        ]
      },
      clickReg: false,
      loginForm: {
        phone: "13800138001",
        password: "test",
        captcha: "",
        captcha_challenge: "",
        captcha_timestamp: ""
      },
      loginRules: {
        phone: [{ required: true, trigger: "blur", validator: validatePhone }],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ],
        captcha: [
          { required: true, trigger: "blur", validator: validateCaptcha }
        ]
      },
      loading: false,
      passwordType: "password",
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  methods: {
    getNum(index) {
          this.num = index;
        },
    tabHandleClick(tab, event) {
        console.log(tab, event);
      },
    employer(formName) {
      this.employeRegistered()
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.employeRegistered()
          this.clickReg = false
        } else {
          this.$message({
            message: '请填写所有内容',
            type: 'warning'
          });
          return false;
        }
      });
    },
    async employeRegistered() {
      const text = await employerReg(this.ruleForm);
      console.log("employeRegistered", text)
    },
    labor(formName) {
      this.laborRegistered()
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.employeRegistered()
          this.clickReg = false
        } else {
          this.$message({
            message: '请填写所有内容',
            type: 'warning'
          });
          return false;
        }
      });
    },
    async laborRegistered() {
      const text = await laborReg(this.laborForm);
      if (text.message !== "注册成功") {
        this.$message({
          message: '请填写所有内容',
          type: 'warning'
        });
      }
      console.log("laborRegistered", text)
    },
    goRegistered() {
      this.clickReg = !this.clickReg
      this.regtext = this.clickReg ? "返回" : "点击注册"
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loginForm.captcha_challenge = this.$refs.captchax.captcha.captcha_challenge;
          this.loginForm.captcha_timestamp = this.$refs.captchax.captcha.captcha_timestamp;
          this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || "/" });
              this.loading = false;
            })
            .catch(err => {
              this.$message({
                type: "error",
                message: err
              });
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #283443;
$cursor: #283443;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
   background-image: url("../../../public/img/loginbkg.png");
  background-repeat:no-repeat;
   background-size:100% 100%;
   .regist {
     width: 35%;
     margin: 0 auto;
   }
   .top {
     padding: 30px  80px;
     display: flex;
     height: 100px;
     align-items: center;
     position: relative;
     .registered {
       position: absolute;
       right: 100px;
       top: 30px;
     };
     p {
       padding:20px;
        color: #fff;
        font-size: 24px;
        font-weight: 600;
      }
   }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      margin-top: 5px;
      margin-left: 5px;
      background: transparent;
      // border: 0px;
      -webkit-appearance: none;
      // border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    // background: rgba(0, 0, 0, 0.1);
    background-color: #fff;
    border-radius: 5px;
    // color: #454545;
    color: black;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

    .active {
      color: #fff;
      background: #18B3C3;
    }
.menuList {
      width: 100%;
      height: 60px;
      background-color:   #778899;
      margin-bottom: 15px;
    }

    ul {
      width: 100%;
      display: flex;
      list-style: none;
      padding: 0;
      margin: 0;
      color: #fff;
      font-size: 16px;
      line-height: 60px;

    }

    ul li {
      flex: 1;
      text-align: center;
      cursor: pointer;
    }

    .tabCon {
      width: 700px;
      margin: 0 auto;
      padding: 40px 20px;
      color: #999;
      font-size: 14px;
      background-color: #fff;
    }

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
