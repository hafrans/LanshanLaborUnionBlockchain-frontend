<template>
  <div class="app-container">
    <div class="input">
      <el-input v-model="searchText" placeholder="请输入案件号搜索案件" size="medium" class="searchCase">
        <el-button
          slot="append"
          type="primary"
          icon="el-icon-search"
        >搜索</el-button>
      </el-input>
    </div>

  </div>
</template>

<script>
import { getAllCase } from "@/api/case";
export default {
  components: {

  },
  data() {
    return {
      searchText: ''
    }
  },
  created() {
    this.text()
  },
  methods: {
    async text() {
      const text = await getAllCase();
      console.log(this.text);
    }
  }
}
</script>

<style lang="less" scoped>
.app-container {
  .input {
    width: 500px;
  }
}
</style>
