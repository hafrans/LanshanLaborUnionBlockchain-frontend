<template>
  <div calss="app-container">
    <el-container>
      <el-header>
        <div class="input" style="width: 80%">
          <el-input v-model="searchText" placeholder="请输入案件号搜索案件" size="large">
            <el-button
              slot="append"
              type="primary"
              icon="el-icon-search"
              @click="search()"
            >搜索</el-button>
          </el-input>
        </div>
      </el-header>
      <el-main>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>调解案件追溯信息</span>
          </div>
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
            <el-col :span="6">
              <b>申请人姓名</b>
            </el-col>
            <el-col :span="6">
              <span>{{ caseinfo.applicant.applicant_name }}</span>
            </el-col>
          </el-row>
        </el-card>
        <el-timeline>
          <el-timeline-item v-for="(item,index) in history" :key="index" size="large" color="rgb(50,143,254)" :timestamp="history[index].created_at" placement="top">
            <div @click="goDetail()">
              <el-card @click="goDetail(index)">
                <h3>{{ history[index].operation }}</h3>
                <el-row :gutter="20">
                  <el-col :span="3">
                    <b>案件号码</b>
                  </el-col>
                  <el-col :span="20">
                    <span>{{ history[index].case_id }}</span>
                  </el-col>
                  <el-col :span="3">
                    <b>操作人姓名</b>
                  </el-col>
                  <el-col :span="6">
                    <span>{{ history[index].user }}</span>
                  </el-col>
                  <el-col :span="3">
                    <b>操作创建时间</b>
                  </el-col>
                  <el-col :span="6">
                    <span>{{ history[index].created_at }}</span>
                  </el-col>
                </el-row>
              </el-card>
            </div>
          </el-timeline-item>
        </el-timeline>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { getHistory } from "@/api/history";
import { getCase } from "@/api/case";
export default {
  components: {

  },
  props: {
    caseId: {
      type: String,
      required: false,
      default: '3711002020071217413815945468986090287'
    }
  },
  data() {
    return {
      searchText: '3711002020071217413815945468986090287',
      caseinfo: {},
      history: {}
    }
  },
  created() {
    this.searchText = this.caseId
    this.loadHistory()
    this.getOneCase()
  },
  methods: {
    goDetail() {
      this.$router.push("caseManagement/view/" + this.caseinfo.id)
    },
    search() {
      this.getOneCase()
      this.loadHistory()
    },
    async getOneCase() {
      const res = await getCase({ caseId: this.searchText });
      this.caseinfo = res.data
      console.log("111111", this.caseinfo)
    },
    loadHistory() {
      getHistory({
        caseId: this.searchText
        // page: this.page,
        // pageSize: this.pageSize
      })
        .then(resp => {
          this.history = resp.data.list;
          this.total = resp.data.total_count;
          this.pageSize = resp.data.page_count;
          this.page = resp.data.page_num;
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: err
          });
        });
    }
  }
}
</script>

<style scoped>
.app-container {
  padding: 30px;
}
.input {
  margin: 2rem  5rem;
}
.el-header {
  width: 70%;
  margin: 0 auto;
}

.el-main {
  margin: 1rem 10%;
}
.box-card {
  margin: 1rem auto;
  /* width: 70%; */
}

.el-col {
  border-radius: 4px;
  margin: 0.5rem auto;
}
.el-timeline {
  margin: 2rem 10%;
}
</style>
