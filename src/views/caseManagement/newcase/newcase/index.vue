<template>
  <div class="form">
    <div class="title">
      案件申请调解表
    </div>
    <!-- <el-button style="margin-left: 20px" @click="handle">编辑</el-button> -->
    <el-button v-if="this.option.detail" style="margin-left: 20px" type="primary" @click="goform">请点击创建案件要素表</el-button>
    <avue-form ref="form" v-model="obj" :option="option" @submit="handleSubmit" />

  </div>
</template>

<script>
import Data from './elements.js'
// import { createNewCases, getFormExm } from "@/api/laber";
export default {
  data() {
    return {
      type: 0,
      obj: {},
      sizeValue: '',
      option: Data.option
    }
  },
  computed: {
    title() {
      return this.type === 0 ? '编辑' : ''
    }
  },
  created() {
    console.log(Data)
    // this.text()
  },
  methods: {
    goform() {
      this.$router.push({ path: '/newcase/newform' })
    },
    handle() {
      if (this.type === 1) {
        this.option.detail = true
      } else {
        this.option.detail = false
      }
    },
    handleSubmit() {
      this.$refs.form.validate(vaild => {
        if (vaild) {
          this.option.detail = true
          // this.postForm()
        } else {
          this.$message({
            message: '请填写必填项',
            type: '"warning"'
          })
          return false
        }
      })
    }
    // async postForm() {
    //   // var timestamp = (new Date()).getTime();
    //   let res = await createNewCases(this.objText);
    //   console.log("0000000", res);
    // },
    // async text() {
    //   let text = await getFormExm();
    //   this.objText = text.data;
    //   console.log(this.objText);
    // }
  }
}
</script>

<style lang="less" scoped>
.form {
  background-color: white;
  padding: 15px 30px;
  .title {
    margin: 30px 0;
    // background-color: thistle;
    width: 100%;
    text-align: center;
    color: rgb(0, 157, 218);
    font-size: 24px;
    font-weight: bold;
  }
}
</style>
