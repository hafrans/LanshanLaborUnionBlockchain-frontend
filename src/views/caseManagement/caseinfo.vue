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

        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>信息操作区块链追溯信息</span>
          </div>
          <div v-if="caseid != ''">
            <History :case-id="caseid" />
          </div>
          <div v-else style="text-aligin:center">加载中.....</div>
        </el-card>
      </el-main>
      <el-footer style="text-align:center">
        <el-row>
          <el-button type="primary" @click="$message({type:'info',message:'建设中'})">处理该案件</el-button>
          <el-button type="success" @click="$message({type:'info',message:'建设中'})">添加笔录</el-button>
          <el-button type="info" @click="$message({type:'info',message:'建设中'})">添加部门建议</el-button>
          <el-button type="warning" @click="$message({type:'info',message:'建设中'})">设置案件状态</el-button>
          <el-button type="danger" @click="$message({type:'info',message:'建设中'})">结束该案件</el-button>
        </el-row>
      </el-footer>
    </el-container>
  </div>
</template>
<script>
import { getOneCase } from "@/api/case";
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
    status: 1,
    caseid: "",
    caseinfo: {},
    laborData: {},
    infolaborOption: laborOption.option,
    dialogFormVisible: false
  }),
  created() {
    this.loadCase();
  },
  methods: {
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

