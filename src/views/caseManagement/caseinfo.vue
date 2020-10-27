<template>
  <div class="dashboard-container">
    <!-- 对话框 -->
    <el-dialog
      title="创建预约会议"
      :visible.sync="dialogVisible"
      width="40%"
    >
      <el-form
        ref="meetingform"
        :model="meetingCreateForm"
        :rules="formRules"
      >
        <el-form-item
          label="案件号码"
          label-width="80px"
          prop="case_id"
        >
          <el-input
            v-model.lazy.trim="meetingCreateForm.case_id"
            auto-complete="xxx"
            readonly="true"
          />
        </el-form-item>
        <el-form-item
          label="会议主题"
          label-width="80px"
          prop="subject"
        >
          <el-input
            v-model.lazy.trim="meetingCreateForm.subject"
            auto-complete="xxx"
          />
        </el-form-item>
        <el-form-item
          label="会议时间"
          label-width="80px"
          prop="end_time"
        >
          <el-date-picker
            v-model.trim="meetingCreateForm.start_time"
            type="datetime"
            name="xsaxsa"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="开始时间"
            auto-complete="xxx"
          />
          <el-date-picker
            v-model.trim="meetingCreateForm.end_time"
            type="datetime"
            name="asxe"
            placeholder="结束时间"
            value-format="yyyy-MM-dd HH:mm:ss"
            auto-complete="xxx"
          />
        </el-form-item>
        <el-form-item
          label="会议密码"
          label-width="80px"
        >
          <el-input
            v-model.lazy.trim="meetingCreateForm.password"
            placeholder="留空为不设密码"
            auto-complete="new_password"
          />
        </el-form-item>
        <el-form-item
          label="会议设置"
          label-width="80px"
        >
          <el-checkbox
            v-model="meetingCreateForm.mute_enable_join"
            label="成员入会时静音"
          />
          <el-checkbox
            v-model="meetingCreateForm.allow_unmute_self"
            label="允许自行解除静音"
          />
          <el-checkbox
            v-model="meetingCreateForm.mute_all"
            label="全体静音"
          />
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="handleCreateNewMeeting"
        >确 定</el-button>
      </span>
    </el-dialog>
    <el-container>
      <el-header>
        <el-steps
          :active="status"
          align-center
        >
          <el-step title="调解事项已提交" />
          <el-step title="部门正在处理" />
          <el-step title="正在请求确认" />
          <el-step title="用户已确认" />
          <el-step title="调解结束" />
        </el-steps>
      </el-header>
      <el-main>
        <div
          class="float"
          @click="proposeCE()"
        >提出质证</div>
        <div
          v-show="claims.type == 1 || claims.type == 4"
          class="float second"
          @click="showCreateMeetingDialog"
        >创建会议</div>
        <el-card class="box-card">
          <div
            slot="header"
            class="clearfix"
          >
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
          <div
            slot="header"
            class="clearfix"
          >
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
          <div
            v-else
            style="text-aligin:center"
          >加载中.....</div>
          <el-dialog
            title="案件要素表"
            :visible.sync="dialogFormVisible"
            width="70%"
          >
            <avue-form
              v-model="caseinfo.form"
              :option="infolaborOption"
            />
          </el-dialog>
        </el-card>
        <el-card class="box-card">
          <div
            slot="header"
            class="clearfix"
          >
            <span>提交材料信息</span>
          </div>
          <div v-if="caseid != ''">
            <el-table
              :data="caseinfo.materials"
              style="width: 100%"
            >
              <el-table-column
                prop="id"
                label="材料唯一识别码"
                width="120"
              />
              <el-table-column
                prop="name"
                label="材料名称"
                width="180"
              />
              <el-table-column
                label="材料路径"
                min-width="180"
              >
                <template #default="scope">
                  <a
                    :href="getTruePath(scope.row.path)"
                    target="_blank"
                  >点击跳转查看</a>&nbsp;
                  <i class="el-icon-link" />
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div
            v-else
            style="text-aligin:center"
          >加载中.....</div>
        </el-card>
        <el-card class="box-card">
          <div
            slot="header"
            class="clearfix"
          >
            <span>提交笔录信息</span>
          </div>
          <div v-if="caseid != ''">
            <el-table
              :data="caseinfo.records"
              style="width: 100%"
            >
              <el-table-column
                prop="id"
                label="笔录唯一识别码"
                width="120"
              />
              <el-table-column
                prop="name"
                label="笔录名称"
                width="180"
              />
              <el-table-column
                prop="department_info.name"
                label="提交单位名称"
                width="180"
              />
              <el-table-column
                prop="department_info.contact"
                label="联系方式"
                width="180"
              />
              <el-table-column
                prop="submitter"
                label="经办人"
                width="180"
              />
              <el-table-column
                label="材料路径"
                min-width="180"
              >
                <template #default="scope">
                  <a
                    :href="scope.row.path"
                    target="_blank"
                  >点击跳转查看</a>&nbsp;
                  <i class="el-icon-link" />
                </template>
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="100"
              >
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="small"
                    @click="delRecord(scope.row)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div
            v-else
            style="text-aligin:center"
          >加载中.....</div>
        </el-card>

        <el-card class="box-card">
          <div
            slot="header"
            class="clearfix"
          >
            <span>部门建议</span>
          </div>
          <div v-if="caseid != ''">
            <el-table
              :data="caseinfo.suggestions"
              style="width: 100%"
            >
              <el-table-column
                prop="id"
                label="识别码"
                width="80"
              />
              <el-table-column
                prop="content"
                label="建议内容"
                min-width="300"
              />
              <el-table-column
                prop="department_info.name"
                label="提交单位名称"
                width="180"
              />
              <el-table-column
                prop="department_info.contact"
                label="联系方式"
                width="130"
              />
              <el-table-column
                prop="submitter"
                label="经办人"
                width="75"
              />
            </el-table>
          </div>
          <div
            v-else
            style="text-aligin:center"
          >加载中.....</div>
        </el-card>

        <el-card
          v-if="caseinfo.comments != []"
          class="box-card"
        >
          <div
            slot="header"
            class="clearfix"
          >
            <span>质证环节</span>
          </div>
          <div v-if="caseid != ''">
            <el-table
              :data="caseinfo.comments"
              style="width: 100%"
            >
              <el-table-column
                prop="submitter"
                label="提交质证者"
                width="180"
              />
              <el-table-column
                prop="submitter_phone"
                label="提交人员联系方式"
                width="200"
              />
              <el-table-column
                prop="content"
                label="质证内容"
                min-width="300"
              />
              <el-table-column
                fixed="right"
                label="操作"
                width="100"
              >
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="small"
                    @click="delComment(scope.row)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div
            v-else
            style="text-aligin:center"
          >加载中.....</div>
        </el-card>

        <el-card class="box-card">
          <div
            slot="header"
            class="clearfix"
          >
            <span>信息操作区块链追溯信息</span>
          </div>
          <div v-if="caseid != ''">
            <History :case-id="caseid" />
          </div>
          <div
            v-else
            style="text-aligin:center"
          >加载中.....</div>
        </el-card>

        <el-dialog
          title="提出质证"
          :visible.sync="CEVisible"
          width="25%"
        >
          <el-input
            v-model="comment"
            type="textarea"
            :rows="2"
            placeholder="请输入质证内容"
          />
          <div
            slot="footer"
            class="dialog-footer"
          >
            <el-button @click="CEVisible = false">取 消</el-button>
            <el-button
              type="primary"
              @click.stop="createComment()"
            >提 交</el-button>
          </div>
        </el-dialog>
      </el-main>
      <el-footer v-if="user_type == 1||user_type == 4" style="text-align:center">
        <el-row>
          <el-button
            type="primary"
            @click="changeStatus(1)"
          >处理该案件</el-button>
          <el-button
            type="success"
            @click="creatRecordVisible = true"
          >添加笔录</el-button>
          <el-button
            type="info"
            @click="addSuggestion = true"
          >添加部门建议</el-button>
          <el-button
            type="warning"
            @click="changeStatus(2)"
          >通知当事人调解结果</el-button>
          <el-button
            type="danger"
            @click="changeStatus(5)"
          >结束该案件</el-button>
        </el-row>
      </el-footer>
      <el-footer v-if="user_type == 2||user_type == 3" style="text-align:center">
        <el-row>
          <el-button
            type="success"
            @click="changeStatus(4)"
          >确认调解</el-button>
          <el-button
            type="danger"
            @click="changeStatus(3)"
          >拒绝调解</el-button>
        </el-row>
      </el-footer>
      <el-dialog
        title="添加部门意见"
        :visible.sync="addSuggestion"
        width="25%"
      >
        <el-input
          v-model="departmentSug"
          type="textarea"
          :rows="2"
          placeholder="请输入部门意见"
        />
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="addSuggestion = false">取 消</el-button>
          <el-button
            type="primary"
            @click.stop="addDepartSuggest()"
          >提 交</el-button>
        </div>
      </el-dialog>

      <el-dialog
        title="添加笔录"
        :visible.sync="creatRecordVisible"
        width="40%"
      >
        <el-form
          ref="recordForm"
          :model="recordForm"
          label-width="10rem"
          label-position="right"
        >
          <el-form-item
            label="记录介绍"
            prop="name"
            :rules="[
              { required: true, message: '请输入记录介绍', trigger: 'blur' }
            ]"
          >
            <el-input
              v-model="recordForm.name"
              autocomplete="off"
            />
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
              <img
                width="100%"
                :src="recordForm.dialogImageUrl"
                alt
              >
            </el-dialog>
          </el-form-item>
          <el-form-item>
            <el-button @click="creatRecordVisible = false">取 消</el-button>
            <el-button
              type="primary"
              @click="addRecord('recordForm')"
            >确 定</el-button>
          </el-form-item>
        </el-form>
        <!-- <div slot="footer" class="dialog-footer">
            <el-button @click="creatRecordVisible = false">取 消</el-button>
            <el-button type="primary" @click="addRecord('recordForm')">确 定</el-button>
          </div>-->
      </el-dialog>
    </el-container>
  </div>
</template>
<script>
import { createMeeting } from "@/api/meeting";
import { getOneCase, CaseStatus } from "@/api/case";
import { creatRecord, upLoad, deleteRecord, createSuggestion } from "@/api/record";
import { creatCE, deleteCE } from "@/api/comment";
import History from "@/components/history";
import laborOption from "@/components/Componentform/option";
import { getBaseAddr } from "@/api/common";
import { mapState } from "vuex";
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
  data() {
    // validators

    var checkCaseID = (r, v, c) => {
      if (v.trim().length == 0) {
        return c(new Error("案件号码为空"));
      }
      c();
    };

    var checkSubject = (r, v, c) => {
      if (v.trim().length == 0) {
        return c(new Error("会议主题为空"));
      }
      c();
    };

    var checkStart = (r, v, c) => {
      if (v.trim().length == 0) {
        return c(new Error("会议开始时间为空"));
      }
      c();
    };

    var checkEnd = (r, v, c) => {
      if (this.meetingCreateForm.start_time.length == 0) {
        return c(new Error("会议开始时间为空"));
      }
      if (v.length == 0) {
        return c(new Error("会议结束时间为空"));
      }
      if (this.meetingCreateForm.start_time.length != 0) {
        const date = new Date(this.meetingCreateForm.start_time);
        const enddate = new Date(v);
        if (date > enddate) {
          return c(new Error("会议结束时间在开始时间之前！"));
        }
      }
      c();
    };
    return {
      departmentSug: '',
      addSuggestion: false,
      meetingCreateForm: {
        allow_unmute_self: true,
        case_id: "",
        start_time: "",
        end_time: "",
        meeting_type: 1,
        mute_all: false,
        mute_enable_join: false,
        password: "",
        subject: ""
      },
      formRules: {
        case_id: [{ validator: checkCaseID, trigger: "blur" }],
        subject: [{ validator: checkSubject, trigger: "blur" }],
        end_time: [{ validator: checkEnd, trigger: "blur" }]
      },
      dialogVisible: false,
      recordForm: { name: "", dialogImageUrl: "" },
      imgVisible: false,
      creatRecordVisible: false,
      comment: "",
      status: 1,
      caseid: "",
      caseinfo: {},
      laborData: {},
      infolaborOption: laborOption.option,
      dialogFormVisible: false,
      CEVisible: false,
      user_type: ''
    };
  },
  created() {
    this.loadCase();
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      this.user_type = this.$store.state.user.info.user_type
    },
    // 修改案件状态
    async changeStatus(status) {
      if (status == 3 || status == 4) {
        if (this.status == 2) {
          const res = await CaseStatus({ id: this.id, status: status })
          if (res.message == '状态修改成功') {
            this.$message({
              message: res.message,
              type: "success"
            });
            this.loadCase();
          }
        } else {
          this.$message({
            message: '请等待工作人员调解',
            type: "warning"
          });
        }
      } else {
        const res = await CaseStatus({ id: this.id, status: status })
        if (res.message == '状态修改成功') {
          this.$message({
            message: res.message,
            type: "success"
          });
          this.loadCase();
        }
      }
    },
    async addDepartSuggest() {
      const resp = await createSuggestion({
        case_id: this.caseid,
        content: this.departmentSug
      });
      if (resp.message == "success") {
        this.$message({
          message: resp.message,
          type: "success"
        });
        this.addSuggestion = false;
      }
    },
    showCreateMeetingDialog() {
      this.meetingCreateForm = {
        allow_unmute_self: true,
        case_id: this.caseinfo.case_id,
        start_time: "",
        end_time: "",
        meeting_type: 1,
        mute_all: false,
        mute_enable_join: false,
        password: "",
        subject: ""
      };
      this.dialogVisible = true;
    },
    handleCreateNewMeeting() {
      this.$refs["meetingform"].validate((valid) => {
        if (valid) {
          const myLoading = this.$loading({
            lock: true,
            text: "处理中",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });
          // 尝试创建会议
          createMeeting(this.meetingCreateForm)
            .then((resp) => {
              if (resp.status == 0) {
                let passwordTip = "空";
                if (resp.data.password != null) {
                  passwordTip = resp.data.password;
                }
                this.$alert(
                  `会议创建成功，请您牢记以下内容！<br>
                 会议主题：${resp.data.subject}<br> 
                 会议号码：<b>${resp.data.meeting_code}</b> <br> 
                 开始时间：${resp.data.start_time} <br> 
                 结束时间：${resp.data.end_time} <br>
                 会议密码：<b>${passwordTip}</b><br>
                 会议链接：${resp.data.join_url}`,
                  "创建成功",
                  {
                    confirmButtonText: "确定",
                    dangerouslyUseHTMLString: true,
                    callback: (action) => {}
                  }
                );
                this.loadMyMeeting();
              }
            })
            .finally(() => {
              myLoading.close();
              this.dialogVisible = false;
            });
        } else {
          return false;
        }
      });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      console.log("file", file);
      this.recordForm.dialogImageUrl = file.url;
      this.imgVisible = true;
    },
    async uploadSectionFile(params) {
      const formData = new FormData();
      const file = params.file;
      formData.append("file", file);
      const res = await upLoad(formData);
      this.upload = res.data.path;
    },
    addRecord(recordForm) {
      this.$refs[recordForm].validate((valid) => {
        if (valid) {
          this.creatRe();
          this.loadCase();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async creatRe() {
      const resp = await creatRecord({
        case_id: this.caseid,
        name: this.recordForm.name,
        path: this.upload
      });
      if (resp.message == "success") {
        this.$message({
          message: resp.message,
          type: "success"
        });
        this.creatRecordVisible = false;
      }
    },
    async delComment(row) {
      const resp = await deleteCE(row.id);

      this.$message({
        message: resp.message,
        type: "success"
      });
      this.loadCase();
    },

    async delRecord(row) {
      const resp = await deleteRecord(row.id);

      this.$message({
        message: resp.message,
        type: "success"
      });
      this.loadCase();
    },
    proposeCE() {
      this.CEVisible = true;
    },
    async createComment() {
      if (this.comment == "") {
        this.$message({
          message: "质证内容不得为空",
          type: "warning"
        });
        return;
      }
      const resp = await creatCE({
        case_id: this.caseid,
        content: this.comment
      });
      if (resp.message == "success") {
        this.$message({
          message: "提交成功",
          type: "success"
        });
        this.loadCase();
        this.CEVisible = false;
      }
    },
    getTruePath(path) {
      if (path.indexOf("http://") == 0 || path.indexOf("https://") == 0) {
        return path;
      } else {
        return getBaseAddr() + "/" + path;
      }
    },
    goform() {
      this.dialogFormVisible = true;
    },
    loadCase() {
      this.$nextTick(() => {
        getOneCase({ id: this.id })
          .then((resp) => {
            if (resp.status == 0) {
              // ok
              this.caseinfo = resp.data;
              this.caseid = resp.data.case_id;
              this.laborData = resp.data.form;
              console.log(resp.data);
              this.status = this.caseinfo.status
              // if (this.caseinfo.status === 0) {
              //   this.status = 1;
              // } else if (this.caseinfo.status === 1) {
              //   // pending
              //   this.status = 2;
              // } else if (this.caseinfo.status === 2) {
              //   // confirming
              //   this.status = 3;
              // } else if (this.caseinfo.status === 3) {
              //   // accept
              //   this.status = 4;
              // } else if (this.caseinfo.status === 4) {
              //   // refuse
              //   this.status = 4;
              // } else if (this.caseinfo.status === 5) {
              //   // completed
              //   this.status = 5;
              // }
            } else {
              this.$message({
                type: "error",
                error: "获取案件信息失败"
              });
            }
          })
          .catch((err) => {
            this.$message({
              type: "error",
              error: "获取案件信息失败"
            });
            this.$router.push("/");
          });
      });
    }
  },
  computed: {
    ...mapState({
      claims: (state) => state.user.claims
    })
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
  background-color: rgb(24, 144, 254);
  color: aliceblue;
  line-height: 5rem;
  text-align: center;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  position: fixed;
  top: 30%;
  left: 90%;
  box-shadow: rgb(24, 144, 254) 0px 0px 0.9rem;
  transition: background-color 0.2s;
  cursor: pointer;
}

.float:hover {
  background-color: rgb(10, 75, 156);
}

.second {
  top: 42%;
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

