<template>
  <div class="app-container">
    <div class="input">
      <el-input v-model="searchText" placeholder="请输入案件号搜索案件" size="medium" class="searchCase">
        <el-button
          slot="append"
          type="primary"
          icon="el-icon-search"
          @click="search()"
        >搜索</el-button>
      </el-input>
    </div>
    <div class="content">
      <avue-crud
        v-model="obj"
        :data="allCase"
        :option="option"
      >
        <template slot="menuLeft">
          <el-button
            type="danger"
            icon="el-icon-plus"
            size="small"
            plain
            @click.stop="handleAdd()"
          >新增</el-button>
        </template>
        <template slot="menu" slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="small"
            plain
            @click.stop="handleEdit(scope.row,scope.index)"
          >编辑</el-button>
          <el-button
            type="primary"
            icon="el-icon-view"
            size="small"
            plain
            @click.stop="handleView(scope.row,scope.index)"
          >查看</el-button>
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
      obj: {},
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
        addBtn: false,
        delBtn: false,
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
      const res = await modifyForm({ id: this.id, data: this.infoData });
      if (res.message === "success") {
        this.dialogFormVisible = true
      } else {
        this.$message({
          message: '修改失败',
          type: 'error'
        });
      }
    },
    handleView() {
      this.$router.push(
        "/caseManagement/view/1"
        // query: { id: this.id }
      )
    },
    handleAdd() {
      this.$router.push(
        "/newcase/newform"
      );
    },
    async search() {
      await getCase({ caseId: this.searchText })
        .then(res => {
          this.allCase = [{ "applicant_name": "", "case_id": "", "title": "", "updated_at": "", "respondent_name": "" }]
          this.allCase[0].applicant_name = res.data.applicant.applicant_name
          this.allCase[0].case_id = res.data.case_id
          this.allCase[0].title = res.data.title
          this.allCase[0].updated_at = res.data.updated_at
          this.allCase[0].respondent_name = res.data.respondent.employer_name
        })
        .catch(err => {
          alert("未查到该案件的信息")
          console.log(err)
          this.text()
        })
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
