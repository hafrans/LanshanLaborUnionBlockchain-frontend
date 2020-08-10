<template>
  <div class="dashboard-container">
    <el-container>
      <el-header>
        <el-steps :active="status" align-center>
          <el-step title="调解事项已提交" />
          <el-step title="部门正在处理" />
          <el-step title="正在请求确认" />
          <el-step title="用户已确认" />
          <el-step title="调解结束" />
        </el-steps>
      </el-header>
      <el-main>
        <div class="float" @click="proposeCE()">提出质证</div>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>调解案件信息</span>
          </div>
          <div>
            <el-row :gutter="20">
              <el-col :span="6">
                <b>案件号码</b>
              </el-col>
              <el-col :span="18">
                <span>{{ caseinfo.case_id }}</span>
              </el-col>
              <el-col :span="6">
                <b>案件类型</b>
              </el-col>
              <el-col :span="18">
                <span>{{ caseinfo.category.category_name }}</span>
              </el-col>
            </el-row>
            <el-divider />
            <el-row>
              <el-col :span="24">
                <b>申请人信息</b>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <b>申请人姓名</b>
              </el-col>
              <el-col :span="6">
                <span>{{ caseinfo.applicant.applicant_name }}</span>
              </el-col>
              <el-col :span="6">
                <b>出生日期</b>
              </el-col>
              <el-col :span="6">
                <span>{{ caseinfo.applicant.applicant_birth }}</span>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <b>身份证号码</b>
              </el-col>
              <el-col :span="6">
                <span>{{ caseinfo.applicant.applicant_id }}</span>
              </el-col>
              <el-col :span="6">
                <b>民族</b>
              </el-col>
              <el-col :span="6">
                <span>{{ caseinfo.applicant.applicant_nationality }}</span>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <b>联系方式</b>
              </el-col>
              <el-col :span="6">
                <span>{{ caseinfo.applicant.applicant_contact }}</span>
              </el-col>
              <el-col :span="6">
                <b>地址</b>
              </el-col>
              <el-col :span="6">
                <span>{{ caseinfo.applicant.applicant_address }}</span>
              </el-col>
            </el-row>
            <el-divider />
            <el-row>
              <el-col :span="24">
                <b>被申请人信息</b>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <b>被申请单位名称</b>
              </el-col>
              <el-col :span="6">
                <span>{{ caseinfo.respondent.employer_name }}</span>
              </el-col>
              <el-col :span="6">
                <b>单位法人代表</b>
              </el-col>
              <el-col :span="6">
                <span>{{ caseinfo.respondent.employer_faren }}</span>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <b>统一社会信用代码</b>
              </el-col>
              <el-col :span="18">
                <span>{{ caseinfo.respondent.employer_uscc }}</span>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <b>联系方式</b>
              </el-col>
              <el-col :span="6">
                <span>{{ caseinfo.respondent.employer_contact }}</span>
              </el-col>
              <el-col :span="6">
                <b>地址</b>
              </el-col>
              <el-col :span="6">
                <span>{{ caseinfo.respondent.employer_address }}</span>
              </el-col>
            </el-row>
            <el-divider />
            <el-row :gutter="20">
              <el-col :span="6">
                <b>调解事项</b>
              </el-col>
              <el-col :span="18">
                <span>{{ caseinfo.title }}</span>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <b>调解事项所依据的事实与理由</b>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <p>{{ caseinfo.content }}</p>
              </el-col>
            </el-row>
          </div>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>要素表查看</span>
          </div>
          <div v-if="caseid != ''">
            <el-button
              type="primary"
              icon="el-icon-view"
              size="small"
              plain
              @click.stop="goform()"
            >点击查看</el-button>
          </div>
          <div v-else style="text-aligin:center">加载中.....</div>
          <el-dialog title="案件要素表" :visible.sync="dialogFormVisible" width="70%">
            <avue-form v-model="caseinfo.form" :option="infolaborOption" />
          </el-dialog>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>提交材料信息</span>
          </div>
          <div v-if="caseid != ''">
            <el-table :data="caseinfo.materials" style="width: 100%">
              <el-table-column prop="id" label="材料唯一识别码" width="120" />
              <el-table-column prop="name" label="材料名称" width="180" />
              <el-table-column label="材料路径" min-width="180">
                <template #default="scope">
                  <a :href="getTruePath(scope.row.path)" target="_blank">点击跳转查看</a>&nbsp;
                  <i class="el-icon-link" />
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div v-else style="text-aligin:center">加载中.....</div>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>提交笔录信息</span>
          </div>
          <div v-if="caseid != ''">
            <el-table :data="caseinfo.records" style="width: 100%">
              <el-table-column prop="id" label="笔录唯一识别码" width="120" />
              <el-table-column prop="name" label="笔录名称" width="180" />
              <el-table-column prop="department_info.name" label="提交单位名称" width="180" />
              <el-table-column prop="department_info.contact" label="联系方式" width="180" />
              <el-table-column prop="submitter" label="经办人" width="180" />
              <el-table-column label="材料路径" min-width="180">
                <template #default="scope">
                  <a :href="scope.row.path" target="_blank">点击跳转查看</a>&nbsp;
                  <i class="el-icon-link" />
                </template>
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="100"
              >
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="delRecord(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div v-else style="text-aligin:center">加载中.....</div>
        </el-card>

        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>部门建议</span>
          </div>
          <div v-if="caseid != ''">
            <el-table :data="caseinfo.suggestions" style="width: 100%">
              <el-table-column prop="id" label="识别码" width="80" />
              <el-table-column prop="content" label="建议内容" min-width="300" />
              <el-table-column prop="department_info.name" label="提交单位名称" width="180" />
              <el-table-column prop="department_info.contact" label="联系方式" width="130" />
              <el-table-column prop="submitter" label="经办人" width="75" />
            </el-table>
          </div>
          <div v-else style="text-aligin:center">加载中.....</div>
        </el-card>

        <el-card v-if="caseinfo.comments != []" class="box-card">
          <div slot="header" class="clearfix">
            <span>质证环节</span>
          </div>
          <div v-if="caseid != ''">
            <el-table :data="caseinfo.comments" style="width: 100%">
              <el-table-column prop="submitter" label="提交质证者" width="180" />
              <el-table-column prop="submitter_phone" label="提交人员联系方式" width="200" />
              <el-table-column prop="content" label="质证内容" min-width="300" />
              <el-table-column
                fixed="right"
                label="操作"
                width="100"
              >
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="delComment(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div v-else style="text-aligin:center">加载中.....</div>
        </el-card>

        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>信息操作区块链追溯信息</span>
          </div>
          <div v-if="caseid != ''">
            <History :case-id="caseid" />
          </div>
          <div v-else style="text-aligin:center">加载中.....</div>
        </el-card>

        <el-dialog title="提出质证" :visible.sync="CEVisible" width="25%">
          <el-input
            v-model="comment"
            type="textarea"
            :rows="2"
            placeholder="请输入质证内容"
          />
          <div slot="footer" class="dialog-footer">
            <el-button @click="CEVisible = false">取 消</el-button>
            <el-button type="primary" @click.stop="createComment()">提 交</el-button>
          </div>
        </el-dialog>
      </el-main>
      <el-footer style="text-align:center">
        <el-row>
          <el-button type="primary" @click="$message({type:'info',message:'建设中'})">处理该案件</el-button>
          <el-button type="success" @click="creatRecordVisible = true">添加笔录</el-button>
          <el-button type="info" @click="$message({type:'info',message:'建设中'})">添加部门建议</el-button>
          <el-button type="warning" @click="$message({type:'info',message:'建设中'})">设置案件状态</el-button>
          <el-button type="danger" @click="$message({type:'info',message:'建设中'})">结束该案件</el-button>
        </el-row>
        <el-dialog title="添加笔录" :visible.sync="creatRecordVisible" width="40%">
          <el-form ref="recordForm" :model="recordForm" label-width="10rem" label-position="right">
            <el-form-item
              label="记录介绍"
              prop="name"
              :rules="[
                { required: true, message: '请输入记录介绍', trigger: 'blur' }
              ]"
            >
              <el-input v-model="recordForm.name" autocomplete="off" />
            </el-form-item>
            <el-form-item
              label="截图/材料"
              prop="dialogImageUrl"
              :rules="[
                { required: true, message: '请上传截图/材料', trigger: 'blur' }
              ]"
            >
              <el-upload
                ref="upload"
                action="a"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :http-request="uploadSectionFile"
              >
                <i class="el-icon-plus" />
              </el-upload>
              <el-dialog :visible.sync="imgVisible">
                <img width="100%" :src="recordForm.dialogImageUrl" alt="">
              </el-dialog>
            </el-form-item>
            <el-form-item>
              <el-button @click="creatRecordVisible = false">取 消</el-button>
              <el-button type="primary" @click="addRecord('recordForm')">确 定</el-button>
            </el-form-item>
          </el-form>
          <!-- <div slot="footer" class="dialog-footer">
            <el-button @click="creatRecordVisible = false">取 消</el-button>
            <el-button type="primary" @click="addRecord('recordForm')">确 定</el-button>
          </div> -->
        </el-dialog>
      </el-footer>
    </el-container>
  </div>
</template>
<script>
import { getOneCase } from "@/api/case";
import { creatRecord, upLoad, deleteRecord } from "@/api/record";
import { creatCE, deleteCE } from "@/api/comment";
import History from "@/components/history";
import laborOption from "@/components/Componentform/option";
import { getBaseAddr } from "@/api/common";
export default {
  components: {
    History
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data: () => ({
    recordForm: { name: '', dialogImageUrl: '' },
    imgVisible: false,
    creatRecordVisible: false,
    comment: "",
    status: 1,
    caseid: "",
    caseinfo: {},
    laborData: {},
    infolaborOption: laborOption.option,
    dialogFormVisible: false,
    CEVisible: false
  }),
  created() {
    this.loadCase();
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      console.log("file", file)
      this.recordForm.dialogImageUrl = file.url;
      this.imgVisible = true;
    },
    async uploadSectionFile(params) {
      const formData = new FormData();
      const file = params.file
      formData.append('file', file);
      const res = await upLoad(formData)
      this.upload = res.data.path
    },
    addRecord(recordForm) {
      this.$refs[recordForm].validate((valid) => {
        if (valid) {
          this.creatRe()
          this.loadCase();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    async creatRe() {
      const resp = await creatRecord({ case_id: this.caseid, name: this.recordForm.name, path: this.upload })
      if (resp.message == "success") {
        this.$message({
          message: resp.message,
          type: 'success'
        });
        this.creatRecordVisible = false
      }
    },
    async delComment(row) {
      const resp = await deleteCE(row.id)

      this.$message({
        message: resp.message,
        type: 'success'
      });
      this.loadCase();
    },

    async  delRecord(row) {
      const resp = await deleteRecord(row.id)

      this.$message({
        message: resp.message,
        type: 'success'
      });
      this.loadCase();
    },
    proposeCE() {
      this.CEVisible = true
    },
    async createComment() {
      if (this.comment == "") {
        this.$message({
          message: '质证内容不得为空',
          type: 'warning'
        });
        return
      }
      const resp = await creatCE({ case_id: this.caseid, content: this.comment })
      if (resp.message == "success") {
        this.$message({
          message: '提交成功',
          type: 'success'
        });
        this.loadCase();
        this.CEVisible = false
      }
    },
    getTruePath(path) {
      if (path.indexOf("http://") == 0 || path.indexOf("https://") == 0) {
        return path;
      } else {
        return getBaseAddr() + path;
      }
    },
    goform() {
      this.dialogFormVisible = true;
    },
    loadCase() {
      this.$nextTick(() => {
        getOneCase({ id: this.id })
          .then(resp => {
            if (resp.status == 0) {
              // ok
              this.caseinfo = resp.data;
              this.caseid = resp.data.case_id;
              this.laborData = resp.data.form;
              console.log(resp.data);
              if (this.caseinfo.status === 0) {
                this.status = 1;
              } else if (this.caseinfo.status === 1) {
                // pending
                this.status = 2;
              } else if (this.caseinfo.status === 2) {
                // confirming
                this.status = 3;
              } else if (this.caseinfo.status === 3) {
                // accept
                this.status = 4;
              } else if (this.caseinfo.status === 4) {
                // refuse
                this.status = 4;
              } else if (this.caseinfo.status === 5) {
                // completed
                this.status = 5;
              }
            } else {
              this.$message({
                type: "error",
                error: "获取案件信息失败"
              });
            }
          })
          .catch(err => {
            this.$message({
              type: "error",
              error: "获取案件信息失败"
            });
            this.$router.push("/");
          });
      });
    }
  }
};
</script>
<style scoped>
.el-header {
  margin-top: 2rem;
}

.el-main {
  margin: 1rem 10%;
}
.float {
  background-color: rgb(24,144,254);
  color: aliceblue;
  line-height: 5rem;
  text-align: center;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  position: fixed;
  top: 30%;
  left: 90%;
   box-shadow:rgb(24,144,254) 0px 0px 1rem
}
.box-card {
  margin: 1rem 0;
}

.el-col {
  border-radius: 4px;
  margin: 0.5rem auto;
}

.el-footer {
  margin-bottom: 10rem;
}
</style>

