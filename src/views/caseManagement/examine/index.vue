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
    <div class="content">
      <avue-crud
        :data="allCase"
        :option="option"
      >
        <!-- <template slot="infoForm" slot-scope="scope">
          <avue-form ref="form" v-model="infoData" :option="infoOption" @submit="handleSubmit" />
        </template> -->
        <template slot="menu" slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-check"
            size="small"
            plain
            @click.stop="handleEdit(scope.row,scope.index)"
          >编辑</el-button>
        </template>
      </avue-crud>
      <el-dialog title="案件表单" :visible.sync="dialogFormVisible" width="80%">
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="案件表单" name="first">
            <avue-form ref="form" v-model="infoData" :option="infoOption" @submit="handleSubmit" />
          </el-tab-pane>
          <el-tab-pane label="案件要素表" name="second">
            <avue-form
              ref="form"
              v-model="laborData"
              :option="infolaborOption"
              @submit="handleSubmit"
            />
          </el-tab-pane>
        </el-tabs>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getAllCase, getCase, modifyForm } from "@/api/case";
import Option from '../newcase/newcase/elements';
import laborOption from '@/components/Componentform/option'
export default {
  components: {

  },
  data() {
    return {
      activeName: 'first',
      dialogFormVisible: false,
      infoOption: Option.option,
      infolaborOption: laborOption.option,
      laborData: {},
      infoData: {},
      searchText: '',
      allCase: '',
      id: '',
      option: {
        align: 'center',
        menuAlign: 'center',
        // viewBtn: true,
        editBtn: false,
        column: [
          {
            label: '姓名',
            prop: 'applicant_name'
          }, {
            label: '案件号码',
            prop: 'case_id'
          },
          {
            label: '调解事项',
            prop: 'title'
          }, {
            label: '案件进度更新时间',
            prop: 'updated_at'
          },
          {
            label: '用人单位',
            prop: 'respondent_name'
          }
        ]
      }
    }
  },
  created() {
    this.text()
  },
  methods: {
    async text() {
      const text = await getAllCase();
      this.allCase = text.data.list
      console.log("text", text.data.list);
    },
    async handleEdit(row, index) {
      this.dialogFormVisible = true
      const text = await getCase({ caseId: this.allCase[index].case_id });
      this.id = this.allCase[index].id
      this.infoData = text.data
      console.log("777777777777", this.infoData)
      this.laborData = text.data.form
    },
    async handleSubmit() {
      const res = await getCase({ id: this.id, data: this.infoData });
      if (res.message === "success") {
        this.dialogFormVisible = true
        // console.log("44444444444444", res.case_id)
        // this.$alert(res.data.case_id, '请记录案件号方便之后查询', {
        //   confirmButtonText: '确定',
        //   callback: action => {
        //     this.$router.push({
        //       path: "/examine"
        //     })
        //   }
        // });
        // this.option.detail = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.app-container {

  .input {
    width: 500px;
  }
  .content {
    margin-top:30px
    // background-color: rgb(243,243,243);

  }
}
</style>
