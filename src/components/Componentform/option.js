module.exports = {
  option: {
    size: this.sizeValue,
    // mockBtn: true,
    labelWidth: 200,
    gutter: 150,
    submitText: '提交',
    // printBtn: true,
    column: [
      {
        label: '主体性质',
        prop: 'main',
        span: 24,
        type: 'radio',
        // dataType: "number",
        dicData: [
          {
            label: '劳动者',
            value: 1
          },
          {
            label: '用人单位',
            value: 2
          },
          {
            label: '用工单位',
            value: 3
          }
        ],
        rules: [
          {
            required: true,
            message: '请选择主体性质',
            trigger: 'blur'
          }
        ],
        mock: {
          type: 'dic'
        }
      },
      {
        label: '入职时间',
        prop: 'hire_date',
        type: 'date',
        span: 14,
        format: 'yyyy-MM-dd',
        valueFormat: 'yyyy-MM-dd',
        mock: {
          type: 'datetime',
          format: 'yyyy-MM-dd'
        }
      },
      {
        label: '是否签订书面劳动合同',
        prop: 'labor_contract_signed',
        span: 12,
        type: 'radio',
        dicData: [
          {
            label: '是',
            value: 'true'
          },
          {
            label: '否',
            value: 'false'
          }
        ],
        mock: {
          type: 'dic'
        }
      },
      {
        label: '签订书面劳动合同时间',
        prop: 'labor_contract_signing_date',
        type: 'date',
        span: 14,
        format: 'yyyy-MM-dd',
        valueFormat: 'yyyy-MM-dd',
        mock: {
          type: 'datetime',
          format: 'yyyy-MM-dd'
        }
      },
      {
        label: '次数',
        span: 12,
        prop: 'number',
        mock: {
          type: 'number'
        }
      },
      {
        label: '双方发生劳动争议时间',
        prop: 'parties_dispute_time',
        type: 'date',
        span: 14,
        format: 'yyyy-MM-dd',
        valueFormat: 'yyyy-MM-dd',
        mock: {
          type: 'datetime',
          format: 'yyyy-MM-dd'
        }
      },
      {
        label: '解除或终止劳动关系时间',
        prop: 'sever_labor_relationship_date',
        type: 'date',
        span: 14,
        format: 'yyyy-MM-dd',
        valueFormat: 'yyyy-MM-dd',
        mock: {
          type: 'datetime',
          format: 'yyyy-MM-dd'
        }
      },
      {
        label: '劳动合同起止时间',
        prop: 'labor_contract',
        type: 'daterange',
        span: 16,
        startPlaceholder: '日期开始范围自定义',
        endPlaceholder: '日期结束范围自定义'
      },
      {
        label: '未签书面劳动合同工作期间',
        prop: 'labor_contract_not_signed',
        type: 'daterange',
        span: 16,
        startPlaceholder: '日期开始范围自定义',
        endPlaceholder: '日期结束范围自定义'
      },

      {
        label: '是否进行社会保险',
        prop: 'social_insurance',
        span: 12,
        type: 'radio',
        dicData: [
          {
            label: '是',
            value: 'true'
          },
          {
            label: '否',
            value: 'false'
          }
        ],
        mock: {
          type: 'dic'
        },
        rules: [
          {
            required: true,
            message: '请选择是否进行社会保险',
            trigger: 'blur'
          }
        ]
      },
      {
        label: '社会保险险种',
        prop: 'social_insurance_type',
        span: 12,
        type: 'radio',
        dicData: [
          {
            label: '五险',
            value: 1
          },
          {
            label: '仅工伤险',
            value: 2
          }
        ],
        mock: {
          type: 'dic'
        }
      },
      {
        label: '社会保险缴险时间',
        prop: 'social_insurance_payment_time',
        type: 'monthrange',
        span: 16,
        startPlaceholder: '日期开始范围自定义',
        endPlaceholder: '日期结束范围自定义'
      },
      {
        label: '发生工伤时间',
        prop: 'injury_time',
        type: 'date',
        span: 14,
        format: 'yyyy-MM-dd',
        valueFormat: 'yyyy-MM-dd',
        mock: {
          type: 'datetime',
          format: 'yyyy-MM-dd'
        }
      },
      {
        label: '是否经过工伤认定',
        prop: 'industrial_injury',
        span: 12,
        type: 'radio',
        dicData: [
          {
            label: '是',
            value: 'true'
          },
          {
            label: '否',
            value: 'false'
          }
        ],
        mock: {
          type: 'dic'
        }
      },
      {
        label: '住院起止时间',
        prop: 'hospitalization_time',
        type: 'daterange',
        span: 16,
        startPlaceholder: '日期开始范围自定义',
        endPlaceholder: '日期结束范围自定义'
      },
      {
        label: '伤残等级鉴定时间',
        prop: 'Disability_rating_time',
        type: 'date',
        span: 14,
        format: 'yyyy-MM-dd',
        valueFormat: 'yyyy-MM-dd',
        mock: {
          type: 'datetime',
          format: 'yyyy-MM-dd'
        }
      },
      {
        label: '伤残等级鉴定结果',
        prop: 'disable_results',
        type: 'select',
        dataType: 'number',
        dicData: [
          {
            label: '一级',
            value: 1
          },
          {
            label: '二级',
            value: 2
          },
          {
            label: '三级',
            value: 3
          },
          {
            label: '四级',
            value: 4
          },
          {
            label: '五级',
            value: 5
          },
          {
            label: '六级',
            value: 6
          },
          {
            label: '七级',
            value: 7
          },
          {
            label: '八级',
            value: 8
          },
          {
            label: '九级',
            value: 9
          },
          {
            label: '十级',
            value: 10
          }
        ],
        span: 13,
        mock: {
          type: 'dic'
        }
      },
      {
        label: '已办理劳动合同解除手续',
        prop: 'labor_contract_completed',
        span: 12,
        type: 'radio',
        dataType: 'boolean',
        dicData: [
          {
            label: '是',
            value: 'true'
          },
          {
            label: '否',
            value: 'false'
          }
        ],
        mock: {
          type: 'dic'
        }
      },
      {
        label: '劳动者在本单位工作年限',
        prop: 'work_year',
        span: 14,
        type: 'number'
      },
      {
        label: '申请仲裁时间',
        prop: 'arbitration_time',
        type: 'date',
        span: 14,
        format: 'yyyy-MM-dd',
        valueFormat: 'yyyy-MM-dd',
        mock: {
          type: 'datetime',
          format: 'yyyy-MM-dd'
        }
      },

      {
        label: '涉及群体性',
        prop: 'involve_group',
        span: 12,
        type: 'radio',
        dataType: 'boolean',
        dicData: [
          {
            label: '是',
            value: 'true'
          },
          {
            label: '否',
            value: 'false'
          }
        ],
        rules: [
          {
            required: true,
            message: '请选择是否涉及主体性质',
            trigger: 'blur'
          }
        ]
      }
    ],
    group: [
      {
        label: '劳动合同规定内容',
        prop: 'labor_contract',
        column: [
          {
            label: '劳动合同约定的工作岗位',
            span: 12,
            prop: 'job_name',
            mock: {
              type: 'string'
            }
          },
          {
            label: '劳动合同约定的工作地点',
            span: 12,
            prop: 'job_work_place',
            mock: {
              type: 'string'
            }
          },
          {
            label: '劳动合同约定的工资数',
            span: 12,
            prop: 'contract_wage',
            mock: {
              type: 'number'
            }
          },
          {
            label: '劳动合同约定的工资构成',
            span: 12,
            prop: 'contract_wage_component',
            mock: {
              type: 'string'
            }
          },
          {
            label: '劳动合同约定的工时制',
            prop: 'contract_wage_type',
            span: 24,
            type: 'radio',
            dataType: 'number',
            dicData: [
              {
                label: '标准工时制',
                value: 1
              },
              {
                label: '综合工时制',
                value: 2
              },
              {
                label: '不定时工时制',
                value: 3
              }
            ],
            mock: {
              type: 'dic'
            }
          }
        ]
      },
      {
        label: '实际工资发放情况',
        prop: 'actual_payment_wage',
        column: [
          {
            label: '实发工资数',
            span: 12,
            prop: 'wage',
            mock: {
              type: 'number'
            }
          },
          {
            label: '实发工资构成',
            span: 12,
            prop: 'wage_component',
            mock: {
              type: 'string'
            }
          },
          {
            label: '发放形式',
            prop: 'payment_type',
            span: 12,
            type: 'radio',
            dataType: 'number',
            dicData: [
              {
                label: '现金',
                value: 1
              },
              {
                label: '银行转账',
                value: 2
              }
            ]
          },
          {
            label: '发放周期',
            prop: 'payment_cycle',
            span: 12,
            type: 'radio',
            dataType: 'number',
            dicData: [
              {
                label: '当月支付',
                value: 1
              },
              {
                label: '次月支付当月',
                value: 2
              }
            ]
          },
          {
            label: '最后一次支付工资时间',
            prop: 'last_payment',
            type: 'month',
            span: 12,
            format: 'yyyy-MM',
            valueFormat: 'yyyy-MM',
            mock: {
              type: 'datetime',
              format: 'yyyy-MM'
            }
          },
          {
            label: '欠发工资数',
            span: 12,
            prop: 'unpaid_wages',
            mock: {
              type: 'number'
            },
            rules: [
              {
                required: true,
                message: '请填写欠发工资数',
                trigger: 'blur'
              }
            ]
          },
          {
            label: '欠发加班费奖金',
            span: 12,
            prop: 'overtime_bonus',
            mock: {
              type: 'number'
            },
            rules: [
              {
                required: true,
                message: '请填写欠发加班费奖金',
                trigger: 'blur'
              }
            ]
          }
        ]
      },
      {
        label: '停工留薪期限时间',
        prop: 'leaves_pay_time',
        column: [
          {
            label: '劳动者（单位为月）',
            prop: 'laborer_time',
            type: 'number',
            span: 12
          },
          {
            label: '用人单位（单位为月）',
            prop: 'employer_time',
            type: 'number',
            span: 12
          }
        ]
      },
      {
        label: '需支付的工伤预算项目及费用',
        prop: 'injury_cost',
        column: [
          {
            label: '医疗费',
            prop: 'work_related_treatment_ylf',
            span: 12,
            mock: {
              type: 'number'
            }
          },
          {
            label: '假肢安装费',
            prop: 'work_related_treatment_jzaz',
            span: 12,
            mock: {
              type: 'number'
            }
          },
          {
            label: '住院期间伙食补助',
            prop: 'work_related_treatment_hsbz',
            span: 12,
            mock: {
              type: 'number'
            }
          },
          {
            label: '交通费',
            prop: 'work_related_treatment_jt',
            span: 12,
            mock: {
              type: 'number'
            }
          },
          {
            label: '陪护费',
            prop: 'work_related_treatment_ph',
            span: 12,
            mock: {
              type: 'number'
            }
          },
          {
            label: '生活护理费',
            prop: 'work_related_treatment_shhl',
            span: 12,
            mock: {
              type: 'number'
            }
          },

          {
            label: '伤残津贴',
            prop: 'work_related_treatment_scjt',
            span: 12,
            mock: {
              type: 'number'
            }
          },
          {
            label: '一次性伤残补助金',
            prop: 'work_related_treatment_scbz',
            span: 12,
            mock: {
              type: 'number'
            }
          },
          {
            label: '一次性工伤医疗补助金',
            prop: 'work_related_treatment_gsylbz',
            span: 12,
            mock: {
              type: 'number'
            }
          },
          {
            label: '一次性伤残就业补助金',
            prop: 'work_related_treatment_scjybz',
            span: 12,
            mock: {
              type: 'number'
            }
          },
          {
            label: '其他',
            prop: 'work_related_treatment_other',
            span: 12,
            mock: {
              type: 'number'
            }
          }
        ]
      },
      {
        label: '加班时间',
        prop: 'overtime',
        column: [
          {
            label: '正常工作日加班小时',
            prop: 'normal_overtime',
            span: 12,
            mock: {
              type: 'number'
            }
          },
          {
            label: '法定休息日加班小时',
            prop: 'statutory_rest',
            span: 12,
            mock: {
              type: 'number'
            }
          },
          {
            label: '法定节假日加班小时',
            prop: 'statutory_holidays',
            span: 12,
            mock: {
              type: 'number'
            }
          },
          {
            label: '加班工资计算基数',
            prop: 'overtime_wage_base',
            span: 12,
            mock: {
              type: 'number'
            }
          }
        ]
      },
      {
        label: '双方解除或终止劳动关系前十二个月劳动者月平均工资数额',
        prop: 'before_sever_labor_relationship',
        column: [
          {
            label: '金额',
            prop: 'before_sever_labor_relationship_avg_wage',
            span: 12,
            mock: {
              type: 'number'
            }
          },
          {
            label: '计算期间',
            prop: 'before_sever_labor_relationship_range',
            span: 12,
            mock: {
              type: 'number'
            }
          }
        ]
      },
      {
        label: '未休带薪年休假天数',
        prop: 'unpaid_annual_leave_days',
        column: [
          {
            label: '应休天数',
            prop: 'should_rest',
            span: 12,
            mock: {
              type: 'number'
            }
          },
          {
            label: '实休天数',
            prop: 'real_rest',
            span: 12,
            mock: {
              type: 'number'
            }
          },
          {
            label: '未休天数',
            prop: 'not_take_days',
            span: 12,
            mock: {
              type: 'number'
            }
          }
        ]
      },
      {
        label: '扣除加班工资后十二个月劳动者月平均工资数额',
        prop: 'no_overtime_avg',
        column: [
          {
            label: '金额',
            prop: 'no_overtime_avg_wage',
            span: 12,
            mock: {
              type: 'number'
            }
          },
          {
            label: '计算期间',
            prop: 'no_overtime_avg_wage_range',
            span: 12,
            mock: {
              type: 'number'
            }
          }
        ]
      },
      {
        label: '双方解除或终止劳动关系的原因',
        prop: 'sever_labor_relationship_labor_reason',
        column: [
          {
            label: '劳动者提出原因',
            prop: 'sever_labor_relationship_labor',
            span: 12,
            mock: {
              type: 'number'
            }
          },
          {
            label: '用人单位提出原因',
            prop: 'sever_labor_relationship_employer',
            span: 12,
            mock: {
              type: 'number'
            }
          }
        ]
      }
    ],
    column1: [
      {
        label: '本表遗漏的其他项目',
        prop: 'other_information',
        span: 12,
        type: 'string'
      }
    ]
  }
}
