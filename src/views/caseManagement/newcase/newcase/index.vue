<template>
  <div class="form">
    <div class="title">
      案件申请调解表
    </div>
    <!-- <el-button style="margin-left: 20px" @click="handle">编辑</el-button> -->
    <!-- <el-button v-if="option.detail" style="margin-left: 20px" type="primary" @click="goform">请点击创建案件要素表</el-button> -->
    <avue-form ref="form" v-model="obj" :option="option" @submit="handleSubmit" />

  </div>
</template>

<script>
import Data from './elements.js'
import { createNewCases, getFormExm } from "@/api/case";
export default {
  data() {
    return {
      option: Data.option,
      labor: '',
      type: 0,
      obj: {

      },
      // upload: { form_id: this.$route.query.laborId,
      //   applicant: { applicant_name: this.obj.applicant_name, applicant_birth: this.obj.applicant_birth, applicant_nationality: this.obj.applicant_nationality, applicant_id: this.obj.applicant_id, applicant_contact: this.obj.applicant_id, applicant_name: this.obj.applicant_name, applicant_nationality: this.obj.applicant_nationality },
      //   category_id: this.obj.category_id,
      //   content: this.obj.content,
      //   materials: [{ name: this.obj.name, path: this.obj.path }],
      //   respondent: { employer_name: this.obj.employer_name, employer_faren: this.obj.employer_faren, employer_uscc: this.obj.employer_uscc, employer_contact: this.obj.employer_contact, employer_address: this.obj.employer_address },
      //   title: this.obj.title
      // },
      sizeValue: ''

    }
  },
  computed: {
    title() {
      return this.type === 0 ? '编辑' : ''
    }
  },
  created() {
    this.labor = this.$route.query.laborId;
    console.log("labor00000000000000", this.labor)
    // console.log(Data)
    this.text()
  },
  methods: {
    // goform() {
    //   this.$router.push({ path: '/newcase/newform' })
    // },
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
          if (this.labor === '') {
            this.$message({
              message: '请先填写并提交案件要素表',
              type: '"warning"'
            })
            return
          }

          // console.log("labor", labor)
          this.postForm()
        } else {
          this.$message({
            message: '请填写必填项',
            type: '"warning"'
          })
          return false
        }
      })
    },
    async postForm() {
      // var timestamp = (new Date()).getTime();
      console.log("this.obj", upload)
      const upload = { form_id: this.$route.query.laborId,
        applicant: { applicant_name: this.obj.applicant_name,
          applicant_birth: this.obj.applicant_birth,
          applicant_nationality: this.obj.applicant_nationality,
          applicant_id: this.obj.applicant_id,
          applicant_contact: this.obj.applicant_contact,
          applicant_address: this.obj.applicant_address },
        category_id: this.obj.category_id,
        content: this.obj.content,
        materials: [{ name: this.obj.name, path: this.obj.path }],
        respondent: { employer_name: this.obj.employer_name,
          employer_faren: this.obj.employer_faren,
          employer_uscc: this.obj.employer_uscc,
          employer_contact: this.obj.employer_contact,
          employer_address: this.obj.employer_address },
        title: this.obj.title
      };
      const res = await createNewCases(upload);
      if (res.message === "success") {
        // console.log("44444444444444", res.case_id)
        this.$alert(res.data.case_id, '请记录案件号方便之后查询', {
          confirmButtonText: '确定',
          callback: action => {
            this.$router.push({
              path: "/examine"
            })
          }
        });
        // this.option.detail = true
      } else {
        this.$message({
          message: '请按正确格式填写',
          type: 'warning'
        })
      }
      console.log("0000000", res);
    },
    async text() {
      const text = await getFormExm();
      this.objText = text.data;
      console.log(this.objText);
    }
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
