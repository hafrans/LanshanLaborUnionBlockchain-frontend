<template>
  <div class="block">
    <el-table :data="history" border style="width: 100%">
      <el-table-column fixed prop="user" label="操作人" width="80" height="100"></el-table-column>
      <el-table-column prop="operation_id" label="操作哈希" width="300" height="100"></el-table-column>
      <el-table-column prop="operation" label="操作内容" width="120" height="100"></el-table-column>
      <el-table-column prop="content" label="区块记录信息" minwidth="200" height="100"></el-table-column>
      <el-table-column prop="verified" label="区块验证状态" width="110" height="100">
        <template #default>
          <p style="color:#20A53A">
            <i class="el-icon-success">已验证</i>
          </p>
        </template>
      </el-table-column>
    </el-table>
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
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import { getHistory } from "@/api/history";

export default {
  props: {
    caseId: {
      type: String,
      required: true
    }
  },
  data: () => ({
    history: [],
    total: 0,
    page: 1,
    pageSize: 25
  }),
  created() {
    this.loadHistory();
  },
  methods: {
    changePage(val) {
      this.page = val;
      this.loadHistory();
    },
    changePageSize(val) {
      this.pageSize = val;
      this.loadHistory();
    },
    loadHistory() {
      getHistory({
        caseId: this.caseId,
        page: this.page,
        pageSize: this.pageSize
      })
        .then(resp => {
          this.$nextTick(() => {
            this.history = resp.data.list;
            this.total = resp.data.total_count;
            this.pageSize = resp.data.page_count;
            this.page = resp.data.page_num;
          });
          //   console.log(this.history);
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: err
          });
        });
    }
  },
  computed: {}
};
</script>

<style scoped>
</style>
