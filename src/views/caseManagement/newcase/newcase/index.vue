<template>
  <div class="form">
    <div class="title">案件申请调解表</div>
    <!-- <el-button style="margin-left: 20px" @click="handle">编辑</el-button> -->
    <!-- <el-button v-if="option.detail" style="margin-left: 20px" type="primary" @click="goform">请点击创建案件要素表</el-button> -->
    <avue-form ref="form" v-model="obj" :option="option">
      <template slot="menuForm">
        <el-button type="primary" :loading="loading" @click="handleSubmit">提 交</el-button>
        <el-button @click="handleEmpty">清 空</el-button>
      </template>
    </avue-form>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt>
    </el-dialog>
  </div>
</template>

<script>
import Data from "./elements.js";
import { createNewCases, getFormExm } from "@/api/case";
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      loading: false,
      dialogImageUrl: "",
      dialogVisible: false,
      option: Data.option,
      labor: "",
      type: 0,
      obj: {
        materials: [
          // {
          //   name: "Hello",
          //   path:
          //     "/static/2020/7/9/MTExMUFMT0hB5Y2P6K6u77ya5pWw5o2u5rqQ6KGM5Li6LnBuZw==.png"
          // }
        ]
      },
      sizeValue: ""
    };
  },
  computed: {
    title() {
      return this.type === 0 ? "编辑" : "";
    },
    ...mapState({
      token: state => state.user.token
    })
  },
  created() {
    this.labor = this.$route.query.laborId;
    console.log("labor", this.labor);
    Data.setUploadToken(this.token);
    this.text();
    this.option = Data.option;
    console.log(Data);
  },
  methods: {
    // goform() {
    //   this.$router.push({ path: '/newcase/newform' })
    // },
    handle() {
      if (this.type === 1) {
        this.option.detail = true;
      } else {
        this.option.detail = false;
      }
    },
    handleEmpty() {
      this.$refs.form.resetForm();
    },
    handleSubmit(file, done, loading) {
      this.loading = true
      this.$refs.form.validate(vaild => {
        if (vaild) {
          if (this.labor == undefined) {
            this.$message({
              message: "请先填写并提交案件要素表",
              type: 'warning'
            });
            this.loading = false
            return;
          }
          this.postForm();
        } else {
          this.$message({
            message: "请填写必填项",
            type: 'warning'
          });
          this.loading = false
          return false;
        }
      });
    },
    async postForm() {
      // var timestamp = (new Date()).getTime();
      console.log("this.obj", upload);
      const upload = {
        form_id: this.$route.query.laborId,
        applicant: {
          applicant_name: this.obj.applicant_name.trim(),
          applicant_birth: this.obj.applicant_birth,
          applicant_nationality: this.obj.applicant_nationality.trim(),
          applicant_id: this.obj.applicant_id.trim(),
          applicant_contact: this.obj.applicant_contact.trim(),
          applicant_address: this.obj.applicant_address.trim()
        },
        category_id: this.obj.category_id,
        content: this.obj.content.trim(),
        materials: this.obj.materials,
        respondent: {
          employer_name: this.obj.employer_name.trim(),
          employer_faren: this.obj.employer_faren.trim(),
          employer_uscc: this.obj.employer_uscc.trim(),
          employer_contact: this.obj.employer_contact.trim(),
          employer_address: this.obj.employer_address.trim()
        },
        title: this.obj.title.trim()
      };
      // setTimeout(function() {
      //   console.log(111);
      //   this.loading = false
      //   this.$message({
      //     message: "请检查网络",
      //     type: 'warning'
      //   });
      // }, 10000);
      const res = await createNewCases(upload);
      if (res.message === "success") {
        this.loading = false
        this.$alert(res.data.case_id, "请记录案件号方便之后查询", {
          confirmButtonText: "确定",
          callback: action => {
            this.$router.push({
              path: "/examine"
            });
          }
        });
        // this.option.detail = true
      } else {
        this.$message({
          message: "请按正确格式填写",
          type: "warning"
        });
      }
    },
    async text() {
      const text = await getFormExm();
      this.objText = text.data;
      console.log(this.objText);
    },
    // / post
    uploadDelete(column, file) {
      console.log(column, file);
      return this.$confirm(`这里是自定义的，是否确定移除该选项？`);
    },
    uploadBefore(file, done, loading, column) {
      console.log("上传前", file, column);
      // 如果你想修改file文件,由于上传的file是只读文件，必须复制新的file才可以修改名字，完后赋值到done函数里,如果不修改的话直接写done()即
      done();
      this.$message.success("上传前的方法");
    },
    uploadError(error, column) {
      this.$message.success("上传失败");
      console.log(error, column);
    },
    uploadAfter(res, done, loading, column) {
      console.log("上传后", res, column);
      done();
      this.$message.success("上传后的方法");
    },
    uploadPreview(file, column, done) {
      console.log(file, column);
      done(); // 默认执行打开方法
      this.$message.success("自定义查看方法,查看控制台");
    }
  }
};
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
