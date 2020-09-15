import { getBaseAddr } from "@/api/common";

export default {
  setUploadToken(token) {
    this.option.group[2].column[0].headers = {
      "Authorization": "Bearer " + token
    }
  },
  form: {
    // materials: [
    //   { name: "Hello", path: "http://node-1.hafrans.com:888/phpmyadmin_62850a27bfb437c1/themes/pmahomme/img/logo_right.png" }
    // ]
  },
  option: {
    detail: false,
    size: "small",
    // mockBtn: true,
    labelWidth: 200,
    gutter: 150,
    submitText: '提交',
    // printBtn: true,
    column: [
      {
        label: "争议类型",
        prop: "category_id",
        span: 12,
        type: "select",
        dicData: [
          {
            value: 1,
            label: '社会保险'
          },
          {
            value: 2,
            label: '劳动报酬'
          },
          {
            value: 3,
            label: '经济补偿金'
          },
          {
            value: 4,
            label: '双倍工资'
          },
          {
            value: 5,
            label: '工伤'
          },
          {
            value: 6,
            label: '赔偿金'
          },
          {
            value: 7,
            label: '劳动关系'
          },
          {
            value: 8,
            label: '其他'
          }
        ],
        mock: {
          type: 'dic'
        },
        rules: [
          {
            required: true,
            message: '争议类型',
            trigger: 'blur'
          }
        ]
        // change: ({ value, column }) => {
        //   this.$message.success('change')
        // }
      },
      {
        label: '调解事项',
        prop: 'title',
        span: 12,
        rules: [
          {
            required: true,
            message: '调解事项',
            trigger: 'blur'
          }
        ]
      },
      {
        label: '调解事实与理由',
        prop: 'content',
        span: 24,
        rules: [
          {
            required: true,
            message: '调解事实与理由',
            trigger: 'blur'
          }
        ]
      }
    ],
    group: [
      {
        label: '劳动者信息',
        prop: 'applicant',
        icon: 'el-icon-edit-outline',
        column: [
          {
            label: '姓名',
            prop: 'applicant_name',
            mock: {
              type: 'name'
            },
            span: 12,
            rules: [
              {
                required: true,
                message: '请填写姓名',
                trigger: 'blur'
              }
            ]
          },
          {
            label: '生日',
            prop: 'applicant_birth',
            type: 'date',
            span: 12,
            format: 'yyyy-MM-dd',
            valueFormat: 'yyyy-MM-dd',
            mock: {
              type: 'datetime',
              format: 'yyyy-MM-dd'
            },
            rules: [
              {
                required: true,
                message: '请填写您的生日',
                trigger: 'blur'
              }
            ]
          },
          {
            label: '联系方式',
            prop: 'applicant_contact',
            span: 12,
            dataType: 'number',
            rules: [
              {
                required: true,
                message: '请填写联系方式',
                trigger: 'blur'
              }
            ]
          },
          {
            label: '身份证号',
            prop: 'applicant_id',
            span: 12,
            dataType: 'number',
            rules: [
              {
                required: true,
                message: '请填写身份证号',
                trigger: 'blur'
              }
            ]
          },
          {
            label: '民族',
            prop: 'applicant_nationality',
            span: 12,
            dataType: 'string',
            rules: [
              {
                required: true,
                message: '请填写民族',
                trigger: 'blur'
              }
            ]
          },
          {
            label: '地址',
            prop: 'applicant_address',
            span: 12,
            dataType: 'string',
            rules: [
              {
                required: true,
                message: '请填写地址',
                trigger: 'blur'
              }
            ]
          }
        ]
      },
      {
        label: '公司信息',
        prop: 'respondent',
        icon: 'el-icon-edit-outline',
        column: [
          {
            label: '公司名',
            prop: 'employer_name',
            mock: {
              type: 'name'
            },
            span: 12,
            rules: [
              {
                required: true,
                message: '请填写公司名称',
                trigger: 'blur'
              }
            ]
          },
          {
            label: '法人',
            prop: 'employer_faren',
            mock: {
              type: 'name'
            },
            span: 12,
            rules: [
              {
                required: true,
                message: '请填写法人名称',
                trigger: 'blur'
              }
            ]
          },
          {
            label: '联系方式',
            prop: 'employer_contact',
            span: 12,
            dataType: 'number',
            rules: [
              {
                required: true,
                message: '请填写联系方式',
                trigger: 'blur'
              }
            ]
          },
          {
            label: '识别号',
            prop: 'employer_uscc',
            span: 12,
            dataType: 'number',
            rules: [
              {
                required: true,
                message: '请填写识别号',
                trigger: 'blur'
              }
            ]
          },

          {
            label: '地址',
            prop: 'employer_address',
            span: 12,
            dataType: 'string',
            rules: [
              {
                required: true,
                message: '请填写地址',
                trigger: 'blur'
              }
            ]
          }
        ]
      },
      {
        label: '相关材料上传（最多5张图片）',
        // prop: 'materialxs',
        icon: 'el-icon-edit-outline',
        column: [
          // {
          //   label: '资料描述',
          //   prop: 'name',
          //   span: 12,
          //   dataType: 'string',
          //   rules: [
          //     {
          //       required: true,
          //       message: '资料描述',
          //       trigger: 'blur'
          //     }
          //   ]
          // },
          {
            label: '资料上传',
            prop: 'materials',
            props: {
              label: "name",
              value: "path"
            },
            type: 'upload',
            listType: "picture-card",
            span: 24,
            limit: 5,
            tip: '只能上传jpg/png文件，且不超过2MiB，图片要保持清晰',
            propsHttp: {
              res: 'data',
              name: 'filename',
              url: 'path',
              home: getBaseAddr() + "/"
            },
            headers: {},
            action: getBaseAddr() + "/api/v1/upload"
          }
        ]
      }
    ]
  }
}
