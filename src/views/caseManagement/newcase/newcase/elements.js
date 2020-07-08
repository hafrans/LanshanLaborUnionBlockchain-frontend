module.exports = {
  option: {
    // detail: false,
    size: this.sizeValue,
    // mockBtn: true,
    labelWidth: 200,
    gutter: 150,
    submitText: '提交',
    // printBtn: true,
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
        label: '材料上传',
        prop: 'materials',
        icon: 'el-icon-edit-outline',
        column: [
          {
            label: '资料描述',
            prop: 'name',
            span: 12,
            dataType: 'string',
            rules: [
              {
                required: true,
                message: '资料描述',
                trigger: 'blur'
              }
            ]
          },
          {
            label: '资料上传',
            prop: 'materials',
            dataType: 'array',
            type: 'upload',
            propsHttp: {
              res: 'data.0'
            },
            span: 24,
            listType: 'picture-card',
            tip: '只能上传jpg/png文件，且不超过500kb',
            action: '/imgupload'
          }
        ]
      }
    ]
  }
}
