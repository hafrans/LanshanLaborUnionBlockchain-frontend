<template>
  <div class="form">
    <div>
      <h1 class="title">劳动争议案件申请调解要素表</h1>
      <div style="color:#666; margin:3rem 0;">
        <p>1.为了帮助您更好地参加调解，保护您的合法权利，请填写本表。</p>
        <p>2.本表所列各项内容都是查明案件事实所需，务必如实填写。</p>
        <p>3.您在本表中所填内容属于依法陈述的重要事实，不如实填写应承担由此产生的法律后果。</p>
        <p>4.本表的设计系针对一般劳动争议案件，有些内容可能与您的案件无关，您认为与案件无关的项目可以填“无”或不填；对于本表中勾选项可以在对应项选中；您认为另有重要内容未予列明的，可以在本表尾部填写。</p>
      </div>
    </div>
    <el-form ref="form" :model="form" label-width="300px" :disabled="state">
      <el-form-item
        prop="main"
        label="主体性质"
        :rules="{
          required: true,
          message: '主体性质不能为空',
          trigger: 'blur'
        }"
      >
        <el-radio-group v-model="form.main">
          <el-radio :label="1">劳动者</el-radio>
          <el-radio :label="2">用人单位</el-radio>
          <el-radio :label="3">用工单位</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        prop="hire_date"
        label="入职时间"
        :rules="[
          { required: true, message: '请选择入职时间', trigger: 'blur' }
        ]"
      >
        <el-date-picker
          v-model="form.hire_date"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions0"
        />
      </el-form-item>

      <el-form-item label="是否签订书面劳动合同" prop="labor_contract_signed">
        <el-radio-group v-model="form.labor_contract_signed">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="签订书面劳动合同时间">
        <el-date-picker
          v-model="form.labor_contract_signing_date"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions0"
        />
      </el-form-item>
      <el-form-item label="次数">
        <el-input v-model.number="form.number" placeholder="请输入次数" style="width:220px" />
      </el-form-item>

      <el-form-item
        label="双方发生劳动争议时间"
        prop="parties_dispute_time"
        :rules="[
          {
            required: true,
            message: '请选择双方发生劳动争议时间',
            trigger: 'blur'
          }
        ]"
      >
        <el-date-picker
          v-model="form.parties_dispute_time"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions0"
        />
      </el-form-item>
      <el-form-item label="解除或终止劳动关系时间">
        <el-date-picker
          v-model="form.sever_labor_relationship_date"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="选择日期"
        />
      </el-form-item>
      <el-form-item label="劳动合同起止时间">
        <el-date-picker
          v-model="form.labor_contract"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions0"
        />
      </el-form-item>
      <el-form-item label="未签劳动合同工作期间">
        <el-date-picker
          v-model="form.labor_contract_not_signed"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
      <el-form-item label="是否进行社会保险">
        <el-radio-group v-model="form.social_insurance">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="社会保险险种">
        <el-radio-group v-model="form.social_insurance_type">
          <el-radio :label="1">五险</el-radio>
          <el-radio :label="2">仅工伤险</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="社会保险缴险时间">
        <el-date-picker
          v-model="form.social_insurance_payment_time"
          format="yyyy 年 MM 月"
          value-format="yyyy-MM"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions0"
        />
      </el-form-item>
      <el-form-item label="发生工伤时间">
        <el-date-picker
          v-model="form.injury_time"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="选择日期"
        />
      </el-form-item>
      <el-form-item label="是否经过工伤认定">
        <el-radio-group v-model="form.industrial_injury">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="住院起止时间">
        <el-date-picker
          v-model="form.hospitalization_time"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions0"
        />
      </el-form-item>
      <el-form-item label="伤残等级鉴定时间">
        <el-date-picker
          v-model="form.disability_rating_time"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions0"
        />
      </el-form-item>
      <el-form-item label="伤残等级鉴定结果">
        <el-select v-model="form.disable_results" placeholder="请选择">
          <el-option
            v-for="item in disable_results_list"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="已办理劳动合同解除手续">
        <el-radio-group v-model="form.labor_contract_completed">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="劳动者在本单位工作年限">
        <el-input-number v-model="form.work_year" controls-position="right" />
      </el-form-item>
      <el-form-item
        label="申请仲裁时间"
        prop="arbitration_time"
        :rules="[
          { required: true, message: '请选择申请仲裁时间', trigger: 'blur' }
        ]"
      >
        <el-date-picker
          v-model="form.arbitration_time"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions0"
        />
      </el-form-item>
      <el-form-item label="涉及群体性">
        <el-radio-group v-model="form.involve_group">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-collapse v-model="activeNames">
        <el-collapse-item title="劳动合同规定内容" name="1">
          <el-form-item label="工作岗位">
            <el-input v-model="form.job_name" placeholder="请输入劳动合同约定的工作岗位" style="width:240px" />
          </el-form-item>
          <el-form-item label="工作地点">
            <el-input
              v-model="form.job_work_place"
              placeholder="请输入劳动合同约定的工作地点"
              style="width:240px"
            />
          </el-form-item>
          <el-form-item label="工资数">
            <el-input v-model.number="form.contract_wage" placeholder="请输入工资数" style="width:240px" />
          </el-form-item>
          <el-form-item label="工资构成">
            <el-input
              v-model="form.contract_wage_component"
              placeholder="请输入劳动合同约定的工资构成"
              style="width:240px"
            />
          </el-form-item>
          <el-form-item label="劳动合同约定的工时制">
            <el-radio-group v-model="form.contract_wage_type">
              <el-radio :label="1">标准工时制</el-radio>
              <el-radio :label="2">综合工时制</el-radio>
              <el-radio :label="3">不定时工时制</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-collapse-item>
        <el-collapse-item title="实际工资发放情况" name="2">
          <el-form-item
            label="实发工资数"
            prop="wage"
            :rules="[
              { required: true, message: '请输入实发工资数', trigger: 'blur' }
            ]"
          >
            <el-input v-model.number="form.wage" placeholder="请输入实发工资数" style="width:220px" />
          </el-form-item>
          <el-form-item label="实发工资构成">
            <el-input v-model="form.wage_component" placeholder="请输入实发工资构成" style="width:220px" />
          </el-form-item>
          <el-form-item
            label="发放形式"
            prop="payment_type"
            :rules="[
              { required: true, message: '请选择发放形式', trigger: 'blur' }
            ]"
          >
            <el-radio-group v-model="form.payment_type">
              <el-radio :label="1">现金</el-radio>
              <el-radio :label="2">转账</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="发放周期"
            prop="payment_cycle"
            :rules="[
              { required: true, message: '请选择发放周期', trigger: 'blur' }
            ]"
          >
            <el-radio-group v-model="form.payment_cycle">
              <el-radio :label="1">当月支付</el-radio>
              <el-radio :label="2">次月支付当月</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="最后一次支付工资时间">
            <el-date-picker
              v-model="form.last_payment"
              format="yyyy 年 MM 月"
              value-format="yyyy-MM"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions0"
            />
          </el-form-item>
          <el-form-item label="欠发工资数">
            <el-input
              v-model.number="form.unpaid_wages"
              placeholder="请输入欠发工资数"
              style="width:220px"
            />
          </el-form-item>
          <el-form-item label="欠发加班费奖金">
            <el-input
              v-model.number="form.overtime_bonus"
              placeholder="请输入欠发加班费奖金"
              style="width:220px"
            />
          </el-form-item>
        </el-collapse-item>
        <el-collapse-item title="停职留薪期限时间" name="3">
          <el-form-item label="劳动者(单位为月)">
            <el-input-number v-model="form.laborer_time" controls-position="right" />
          </el-form-item>
          <el-form-item label="用人单位(单位为月)">
            <el-input-number v-model="form.employer_time" controls-position="right" />
          </el-form-item>
        </el-collapse-item>
        <el-collapse-item title="需支付的工伤预算项目及费用" name="4">
          <el-form-item label="医疗费">
            <el-input
              v-model.number="form.work_related_treatment_ylf"
              placeholder="请输入医疗费"
              style="width:240px"
            />
          </el-form-item>
          <el-form-item label="假肢安装费">
            <el-input
              v-model.number="form.work_related_treatment_jzaz"
              placeholder="请输入假肢安装费"
              style="width:240px"
            />
          </el-form-item>
          <el-form-item label="住院期间伙食补助">
            <el-input
              v-model.number="form.work_related_treatment_hsbz"
              placeholder="请输入住院期间伙食补助"
              style="width:240px"
            />
          </el-form-item>
          <el-form-item label="交通费">
            <el-input
              v-model.number="form.work_related_treatment_jt"
              placeholder="请输入交通费"
              style="width:240px"
            />
          </el-form-item>
          <el-form-item label="陪护费">
            <el-input
              v-model.number="form.work_related_treatment_ph"
              placeholder="请输入陪护费"
              style="width:240px"
            />
          </el-form-item>
          <el-form-item label="生活护理费">
            <el-input
              v-model.number="form.work_related_treatment_shhl"
              placeholder="请输入生活护理费"
              style="width:240px"
            />
          </el-form-item>
          <el-form-item label="伤残津贴">
            <el-input
              v-model.number="form.work_related_treatment_scjt"
              placeholder="请输入伤残津贴"
              style="width:240px"
            />
          </el-form-item>
          <el-form-item label="一次性伤残补助金">
            <el-input
              v-model.number="form.work_related_treatment_scbz"
              placeholder="请输入一次性伤残补助金"
              style="width:240px"
            />
          </el-form-item>
          <el-form-item label="一次性工伤医疗补助金">
            <el-input
              v-model.number="form.work_related_treatment_gsylbz"
              placeholder="请输入一次性工伤医疗补助金"
              style="width:240px"
            />
          </el-form-item>
          <el-form-item label="一次性伤残就业补助金">
            <el-input
              v-model.number="form.work_related_treatment_scjybz"
              placeholder="请输入一次性伤残就业补助金"
              style="width:240px"
            />
          </el-form-item>
          <el-form-item label="其他">
            <el-input
              v-model="form.work_related_treatment_other"
              placeholder="请输入其他"
              style="width:240px"
            />
          </el-form-item>
        </el-collapse-item>
        <el-collapse-item title="加班时间" name="5">
          <el-form-item label="正常工作日加班小时">
            <el-input
              v-model.number="form.normal_overtime"
              placeholder="请输入正常工作日加班小时"
              style="width:240px"
            />
          </el-form-item>
          <el-form-item label="法定休息日加班小时">
            <el-input
              v-model.number="form.statutory_rest"
              placeholder="请输入法定休息日加班小时"
              style="width:240px"
            />
          </el-form-item>
          <el-form-item label="法定节假日加班小时">
            <el-input
              v-model.number="form.statutory_holidays"
              placeholder="请输入法定节假日加班小时"
              style="width:240px"
            />
          </el-form-item>
          <el-form-item label="加班工资计算基数">
            <el-input
              v-model="form.overtime_wage_base"
              placeholder="请输入加班工资计算基数"
              style="width:240px"
            />
          </el-form-item>
        </el-collapse-item>
        <el-collapse-item title="双方解除或终止劳动关系前十二个月劳动者平均工资数额" name="6">
          <el-form-item label="金额">
            <el-input
              v-model.number="form.before_sever_labor_relationship_avg_wage"
              placeholder="请输入金额"
              style="width:240px"
            />
          </el-form-item>
          <el-form-item label="计算期间">
            <el-input
              v-model="form.before_sever_labor_relationship_range"
              placeholder="请输入计算期间"
              style="width:240px"
            />
          </el-form-item>
        </el-collapse-item>
        <el-collapse-item title="未带薪年休假天数" name="7">
          <el-form-item label="应休天数">
            <el-input v-model="form.should_rest" placeholder="请输入应休天数" style="width:240px" />
          </el-form-item>
          <el-form-item label="实修天数">
            <el-input v-model="form.real_rest" placeholder="请输入实修天数" style="width:240px" />
          </el-form-item>
          <el-form-item label="未休天数">
            <el-input v-model="form.not_take_days" placeholder="请输入未休天数" style="width:240px" />
          </el-form-item>
        </el-collapse-item>
        <el-collapse-item title="扣除加班工资后十二个月劳动者月平均工资数额" name="8">
          <el-form-item label="金额">
            <el-input v-model="form.no_overtime_avg_wage" placeholder="请输入金额" style="width:240px" />
          </el-form-item>
          <el-form-item label="计算时间">
            <el-input
              v-model="form.no_overtime_avg_wage_range"
              placeholder="请输入计算时间"
              style="width:240px"
            />
          </el-form-item>
        </el-collapse-item>
        <el-collapse-item title="双方解除或终止劳动关系原因" name="9">
          <el-form-item label="劳动者提出原因">
            <el-input
              v-model="form.sever_labor_relationship_employer_reason"
              placeholder="请输入劳动者提出原因"
              style="width:240px"
            />
          </el-form-item>
          <el-form-item label="用人单位提出原因">
            <el-input
              v-model="form.sever_labor_relationship_labor_reason"
              placeholder="请输入用人单位提出原因"
              style="width:240px"
            />
          </el-form-item>
        </el-collapse-item>
      </el-collapse>
      <el-form-item class="confirm">
        <el-button type="primary" class="button" @click="onSubmit('form')">提交</el-button>
        <el-button @click="resetForm('form')">清空</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { formSunmit } from "../../api/case.js";
export default {
  data() {
    return {
      state: false,
      form: {},
      id: "",
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6; // 如果没有后面的-8.64e6就是不可以选择今天的
        }
      },
      formExm: {
        main: 1,
        hire_date: "2020-07-01",
        labor_contract_signed: true,
        labor_contract_signing_date: "2020-07-01",
        number: 1,
        labor_contract_type: 1,
        labor_contract: ["2020-07-01", "2020-07-01"],
        labor_contract_not_signed: ["2020-07-01", "2020-07-01"],
        job_name: "测试文本",
        job_work_place: "测试文本",
        contract_wage: 12345.6,
        contract_wage_component: "测试文本",
        contract_wage_type: 1,
        wage: 123.45,
        wage_component: "ceshi test",
        payment_type: 1,
        payment_cycle: 1,
        last_payment: "2020-07",
        unpaid_wages: 1,
        overtime_bonus: 1,
        social_insurance: true,
        social_insurance_type: 1,
        social_insurance_payment_time: ["2020-07", "2020-07"],
        injury_time: "2020-07-01",
        industrial_injury: null,
        hospitalization_time: ["2020-07-01", "2020-07-01"],
        disability_rating_time: "2020-07-01",
        disable_results: 1,
        laborer_time: 1.5,
        employer_time: 1.5,
        work_related_treatment_ylf: 12345.6,
        work_related_treatment_jzaz: 12345.6,
        work_related_treatment_hsbz: 12345.6,
        work_related_treatment_jt: 12345.6,
        work_related_treatment_ph: 12345.6,
        work_related_treatment_shhl: 12345.6,
        work_related_treatment_scjt: 12345.6,
        work_related_treatment_scbz: 12345.6,
        work_related_treatment_gsylbz: 12345.6,
        work_related_treatment_scjybz: 12345.6,
        work_related_treatment_other: 12345.6,
        normal_overtime: 1.5,
        statutory_rest: 1.5,
        statutory_holidays: 1.5,
        overtime_wage_base: 1.5,
        before_sever_labor_relationship_avg_wage: 12345.6,
        before_sever_labor_relationship_range: ["2020-07-01", "2020-07-01"],
        work_year: 1,
        paid_annual_leave_not_leave_day: true,
        should_rest: 1,
        real_rest: 1,
        not_take_days: 1,
        no_overtime_avg_wage: 12345.6,
        no_overtime_avg_wage_range: ["2020-07-01", "2020-07-01"],
        parties_dispute_time: "2020-07-01",
        sever_labor_relationship_employer: true,
        sever_labor_relationship_labor: true,
        sever_labor_relationship_employer_reason: "测试文本",
        sever_labor_relationship_labor_reason: "测试文本",
        sever_labor_relationship_date: "2020-07-01",
        labor_contract_completed: true,
        arbitration_time: "2020-07-01",
        involve_group: false,
        other_information: "无"
      },
      activeNames: "1",
      disable_results_list: [
        {
          value: 1,
          label: "一级"
        },
        {
          value: 2,
          label: "二级"
        },
        {
          value: 3,
          label: "三级"
        },
        {
          value: 4,
          label: "四级"
        },
        {
          value: 5,
          label: "五级"
        },
        {
          value: 6,
          label: "六级"
        },
        {
          value: 7,
          label: "七级"
        },
        {
          value: 8,
          label: "八级"
        },
        {
          value: 9,
          label: "九级"
        },
        {
          value: 10,
          label: "十级"
        }
      ]
    };
  },
  created() {},
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.submitWay();
        } else {
          this.$message({
            message: "请填写必填项",
            type: "warning"
          });
          return false;
        }
      });
    },
    async submitWay() {
      const res = await formSunmit(this.form);
      if (res.message === "success") {
        this.$message({
          message: "提交成功",
          type: "success"
        });
        this.state = false;
        // this.id = res.data.id
        this.$router.push({
          path: "newcase",
          query: { laborId: res.data.id }
        });
        // localStorage.setItem('laborid', res.data.id)
      }
      console.log(res);
    }
  }
};
</script>

<style lang="less" scoped>
.form {
  background-color: white;
  padding: 15px 30px;
  .title {
    margin-bottom: 40px ;
    // background-color: thistle;
    width: 100%;
    // text-align: center;
    color: rgb(1, 157, 218);
    font-size: 2rem;
    font-weight: bold;
  }
  .el-collapse-item_content {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: violet;
  }
  .confirm {
    display: flex;
    width: 50%;
    height: 50px;
    // justify-content: space-around;
    align-items: center;
    margin: 30px auto;
    // background-color: violet;
    .button {
      margin-right: 50px;
    }
  }
}
</style>
