<template>
  <div class="app-container">
    <!-- 对话框 -->
    <el-dialog title="创建预约会议" :visible.sync="dialogVisible" width="40%">
      <el-form :model="meetingCreateForm" ref="meetingform" :rules="formRules">
        <el-form-item label="案件号码" label-width="80px" prop="case_id">
          <el-input v-model.lazy.trim="meetingCreateForm.case_id" auto-complete="xxx"></el-input>
        </el-form-item>
        <el-form-item label="会议主题" label-width="80px" prop="subject">
          <el-input v-model.lazy.trim="meetingCreateForm.subject" auto-complete="xxx"></el-input>
        </el-form-item>
        <el-form-item label="会议时间" label-width="80px" prop="end_time">
          <el-date-picker
            type="datetime"
            v-model.trim="meetingCreateForm.start_time"
            name="xsaxsa"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="开始时间"
            auto-complete="xxx"
          ></el-date-picker>
          <el-date-picker
            type="datetime"
            name="asxe"
            v-model.trim="meetingCreateForm.end_time"
            placeholder="结束时间"
            value-format="yyyy-MM-dd HH:mm:ss"
            auto-complete="xxx"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="会议密码" label-width="80px">
          <el-input
            v-model.lazy.trim="meetingCreateForm.password"
            placeholder="留空为不设密码"
            auto-complete="new_password"
          ></el-input>
        </el-form-item>
        <el-form-item label="会议设置" label-width="80px">
          <el-checkbox label="成员入会时静音" v-model="meetingCreateForm.mute_enable_join"></el-checkbox>
          <el-checkbox label="允许自行解除静音" v-model="meetingCreateForm.allow_unmute_self"></el-checkbox>
          <el-checkbox label="全体静音" v-model="meetingCreateForm.mute_all"></el-checkbox>
        </el-form-item>
      </el-form>
      <span class="dialog-footer" slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleCreateNewMeeting">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 显示 -->
    <div class="block" style="display:none;margin:0rem auto 1rem auto">
      <!-- <el-col span="4">
        <p>&nbsp;</p>
      </el-col>-->
      <el-col :span="12">
        <el-input placeholder="请输入案件号码（模糊搜索）" prefix-icon="el-icon-search" style="width:98%"></el-input>
      </el-col>
      <el-col :span="4">
        <el-button>搜索</el-button>
      </el-col>
      <el-col :span="8">
        <p>&nbsp;</p>
      </el-col>
    </div>
    <div class="block" style="margin:1rem 0 1rem 0;">
      <p v-show="claims.type == 1 || claims.type == 4">
        <el-button @click="showCreateMeetingDialog" type="primary" plain>+ 新建会议</el-button>
      </p>
    </div>
    <div class="block" style="text-align:center;margin:1rem auto">
      <el-table :data="meetings" border style="width: 100%" v-loading="loading">
        <el-table-column fixed prop="id" label="ID" width="50" height="100" />
        <el-table-column prop="case_id" label="案件号码" width="305" height="100" />
        <el-table-column prop="meeting_code" label="会议号码" width="100" height="100" />
        <el-table-column prop="start_time" label="会议开始时间" width="150" height="100" />
        <el-table-column prop="end_time" label="会议结束时间" width="150" height="100" />
        <el-table-column prop="password" label="密码" width="80" height="100">
          <template #default="{row}">
            <p v-if="row.password == null">无密码</p>
            <p v-else>{{row.password}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="join_url" label="会议链接" min-width="200" max-width="300" height="100">
          <template v-slot:default="{row}">
            <a :href="row.join_url" target="_blank" style="font-weight:bold;color:#888">{{row.join_url}}</a>
          </template>
        </el-table-column>
        <el-table-column prop="creator" label="会议创建者" width="100" />
        <el-table-column  fixed="right" label="操作" width="200">
          <template #default="{row}">
            <span v-if="claims.type == 1 || claims.type == 4">
              <el-button size="mini" v-on:click="$message('服务正在对接中,暂时不可用')">修改时间</el-button>
            <el-button size="mini" v-on:click="handleCancel(row.id)" type="danger">取消会议</el-button>
            </span>
            <span v-else>
              <el-link type="primary" :href="row.join_url" target="_blank" icon="el-icon-phone-outline">进入会议</el-link>
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block" style="text-align:center">
      <el-pagination
        layout="prev, pager, next, total, sizes"
        :total="total"
        :current-page="page"
        :size="pageSize"
        :page-size="pageSize"
        :page-sizes="[1,10, 25, 50, 100, 200]"
        @current-change="changePage"
        @size-change="changePageSize"
      />
    </div>
  </div>
</template>
<script>
import { getMeetingList, cancelMeeting, createMeeting } from "@/api/meeting";
import { mapState } from "vuex"
export default {
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
        let date = new Date(this.meetingCreateForm.start_time);
        let enddate = new Date(v);
        if (date > enddate) {
          return c(new Error("会议结束时间在开始时间之前！"));
        }
      }
      c();
    };

    return {
      meetingCreateForm: {
        allow_unmute_self: true,
        case_id: "",
        start_time: "",
        end_time: "",
        meeting_type: 1,
        mute_all: false,
        mute_enable_join: false,
        password: "",
        subject: "",
      },
      formRules: {
        case_id: [{ validator: checkCaseID, trigger: "blur" }],
        subject: [{ validator: checkSubject, trigger: "blur" }],
        end_time: [{ validator: checkEnd, trigger: "blur" }],
      },
      dialogVisible: false,
      loading: true,
      meetings: [],
      total: 0,
      page: 1,
      pageSize: 10,
    };
  },
  created() {
    this.loadMyMeeting();
  },
  methods: {
    showCreateMeetingDialog() {
      this.meetingCreateForm = {
        allow_unmute_self: true,
        case_id: "",
        start_time: "",
        end_time: "",
        meeting_type: 1,
        mute_all: false,
        mute_enable_join: false,
        password: "",
        subject: "",
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
            background: "rgba(0, 0, 0, 0.7)",
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
                    callback: (action) => {},
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
    handleCancel(id) {
      let myLoading = null;
      this.$confirm("此操作将取消会议，您确定?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          myLoading = this.$loading({
            lock: true,
            text: "处理中",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
          });
          return cancelMeeting({ meetingId: id });
        })
        .then((resp) => {
          if (resp.status == 0) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          } else {
            this.$message({
              type: "success",
              message: "删除失败!",
            });
          }
          this.loadMyMeeting();
        })
        .finally(() => {
          if (myLoading !== null) {
            myLoading.close();
          }
        });
    },
    changePage(val) {
      this.page = val;
      this.loadMyMeeting();
    },
    changePageSize(val) {
      this.pageSize = val;
      this.loadMyMeeting();
    },
    loadMyMeeting() {
      // set loading
      this.loading = true;
      getMeetingList({
        pageNum: this.page,
        pageSize: this.pageSize,
      })
        .then((resp) => {
          this.loading = false;

          if (resp.status == 0) {
            this.$nextTick(() => {
              this.meetings = resp.data.list;
              this.total = resp.data.total_count;
              this.pageSize = resp.data.page_count;
              this.page = resp.data.page_num;
            });
          } else {
            this.$message({
              type: "error",
              message: "信息获取失败",
            });
          }
        })
        .catch((err) => {
          // this.$message({
          //   type: "error",
          //   message: err,
          // });
        });
    },
  },
  computed:{
    ...mapState({
      claims: state=>state.user.claims
    })
  }
};
</script>
<style scoped>
.app-container {
  margin: 0 auto;
  padding: 2.5rem !important;
}
</style>
