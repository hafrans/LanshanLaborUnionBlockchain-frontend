<template>
  <div class="dashboard-container">

    <!-- <div class="dashboard-text">name: {{ name }}</div> -->
    <!--     <el-form>
      <el-form-item label="User name">
        {{ name }}
      </el-form-item>
      <el-form-item label="User mail">
        {{ email }}
      </el-form-item></el-form>
    <el-form ref="changePassForm" :model="changePassForm" :rules="changePassRules" label-width="120px">

      <el-form-item prop="old_password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="changePassForm.old_password"
          :type="passwordType"
          placeholder="旧密码"
          name="password"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="new_password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="changePassForm.new_password"
          :type="passwordType"
          placeholder="新密码"
          name="password"
          tabindex="2"
          auto-complete="on"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-form-item prop="confirm_password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="changePassForm.confirm_password"
          :type="passwordType"
          placeholder="确认新密码"
          name="password"
          tabindex="3"
          auto-complete="on"
          @keyup.enter.native="handleChangePass"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleChangePass">Change Password</el-button>
        <el-button @click="cancelPass">Cancel</el-button>
      </el-form-item>

    </el-form> -->

    <el-form ref="changeMailForm" :model="changeMailForm" :rules="changeMailRules" label-width="120px">
      <el-form-item prop="email">
        <el-input
          v-model="changeMailForm.email"
          placeholder="新邮箱"
          name="email"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item prop="phone">
        <el-input
          v-model="changeMailForm.phone"
          placeholder="新手机"
          name="phone"
          tabindex="2"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleChangeMail">Change Email</el-button>
        <el-button @click="cancelMail">Cancel</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    const validateMail = (rule, value, callback) => {
      const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (reg.test(value)) {
        callback();
      } else {
        callback(new Error("邮箱格式不正确"));
      }
    };
    const validatePhone = (rule, value, callback) => {
      callback()
    };

    return {
      changeMailForm: {
        email: "",
        phone: ""
      },
      changeMailRules: {
        email: [
          { required: true, trigger: "blur", validator: validateMail }],
        phone: [
          { required: true, trigger: "blur", validator: validatePhone }]
      }
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'email'
    ])
  },
  methods: {
    handleChangeMail() {
      this.$refs.changeMailForm.validate(valid => {
        if (valid) {
          this.$store
            .dispatch("user/setEmail", this.changeMailForm)
            .then(() => {
            })
            .catch(err => {
              this.$message({
                type: "error",
                message: err
              });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    cancelMail() {
      this.changeMailForm.email = "";
      this.changeMailForm.phone = "";
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
