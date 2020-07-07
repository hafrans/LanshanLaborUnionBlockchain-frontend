<template>
  <el-image
    style="float:right;display:inline-block;width: 80px; height:50px;margin-right:0.1rem;background-color:white;"
    :src="captcha_image"
    fit="contain"
    :alt="id"
    @click="getNewCaptcha"
  />
</template>
<script>
import { getCaptcha } from "@/api/common";

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      captcha_image: "",
      captcha: {
        captcha_challenge: "",
        captcha_timestamp: ""
      }
    };
  },
  beforeMount() {
    this.getNewCaptcha();
  },
  methods: {
    async getNewCaptcha() {
      try {
        const resp = await getCaptcha({ id: this.id });

        this.$nextTick(() => {
          this.captcha_image = resp.data.captcha.image;
          this.captcha.captcha_challenge = resp.data.captcha.challenge;
          this.captcha.captcha_timestamp = resp.data.captcha.timestamp;
        });
      } catch (err) {
        this.$message({
          type: "error",
          message: err
        });
      }
    }
  }
};
</script>
<style>
</style>
