<template>
  <div class="app-container">
    <el-row :gutter="20">
      <!--用户数据-->
      <el-col :span="20" :xs="24">
        <el-card class="box-card">
          <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
            <el-form-item label="手机号码" prop="phone">
              <el-input
                v-model="queryParams.phone"
                placeholder="请输入手机号码"
                clearable
                size="small"
                style="width: 240px"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" size="small" @click="handleQuery">搜索</el-button>
              <el-button icon="el-icon-refresh" size="small" @click="resetQuery">重置</el-button>
            </el-form-item>
          </el-form>

          <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
              <el-button
                type="primary"
                icon="el-icon-plus"
                size="mini"
                @click="handleAdd"
              >新增</el-button>
            </el-col>
            <el-col :span="1.5">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                :disabled="multiple"
                @click="handleDelete"
              >删除</el-button>
            </el-col>
          </el-row>

          <el-table
            v-loading="loading"
            :data="userList"
            border
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="45" align="center" />
            <el-table-column label="用户名称" align="center" prop="username" />
            <!-- <el-table-column label="账号类型" align="center" prop="user_type">
              <template slot-scope="scope">

              </template>
            </el-table-column> -->
            <el-table-column label="部门" align="center" prop="department.name" />
            <el-table-column label="手机号码" align="center" prop="phone" />
            <el-table-column label="邮箱" align="center" prop="email" />
            <el-table-column label="状态" width="68" align="center">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.active"
                  active-value="0"
                  inactive-value="1"
                />
              </template>
            </el-table-column>
            <!-- <el-table-column label="创建时间" align="center" prop="create_time" width="165">
              <template slot-scope="scope">
                <span>{{ new Date(scope.row.create_time).Format("yyyy-MM-dd hh:mm") }}</span>
              </template>
            </el-table-column> -->
            <el-table-column
              label="操作"
              align="center"
              width="220"
              class-name="small-padding fixed-width"
            >
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="text"
                  icon="el-icon-edit"
                  @click="handleUpdate(scope.row)"
                >编辑</el-button>
                <el-button
                  v-if="scope.row.username !== 'admin'"
                  size="mini"
                  type="text"
                  icon="el-icon-delete"
                  @click="handleDelete(scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>

          <pagination
            v-show="total>0"
            :total="total"
            :page.sync="queryParams.pageIndex"
            :limit.sync="queryParams.pageSize"
            @pagination="getList()"
          />
        </el-card>
      </el-col>
    </el-row>

    <!-- 添加或修改参数配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户名称" prop="username" style="width: 90%">
              <el-input v-model="form.username" placeholder="请输入用户名称" minlength="3" maxlength="20" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户密码" prop="password" style="width: 90%">
              <el-input v-model="form.password" placeholder="请输入用户密码" type="password" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="密码确认" prop="confirm_password" style="width: 90%">
              <el-input v-model="form.confirm_password" placeholder="请输入用户密码" type="password" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号码" prop="phone" style="width: 90%">
              <el-input v-model="form.phone" placeholder="请输入手机号码" maxlength="11" />
            </el-form-item>
          </el-col>
          <el-col :span="14">
            <el-form-item label="手机号验证状态" prop="phone_checked" style="width: 50%">
              <el-switch
                v-model="form.phone_checked"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email" style="width: 90%">
              <el-input v-model="form.email" placeholder="请输入邮箱" maxlength="50" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门" style="width: 90%" prop="department_id">
              <el-select v-model="form.department_id" placeholder="请选择" style="width: 100%">
                <el-option
                  v-for="item in departmentOptions"
                  :key="item.department_id"
                  :label="item.departmentName"
                  :value="item.department_id"
                  :disabled="item.status == 1"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="账号状态" prop="active" style="width: 90%">
              <el-switch
                v-model="form.active"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import Pagination from '../../components/Pagination'
import { getAllUser, delUser, createNewUser, updateUser } from "@/api/admin";
export default {
  name: 'User',
  components: { Pagination },
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 用户表格数据
      userList: null,
      // 弹出层标题
      title: '',
      // 部门树选项
      deptOptions: undefined,
      // 是否显示弹出层
      open: false,
      // 部门名称
      deptName: undefined,
      // 日期范围
      dateRange: [],
      // 归属部门
      deptIdOptions: ['岚山区总工会', '岚山区人民法院', '岚山区人力和资源社会保障局', '岚山区司法局'],
      // 岗位选项
      postOptions: [],
      // 角色选项
      departmentOptions: [
        { department_id: 1, departmentName: '系统管理员' },
        { department_id: 2, departmentName: '劳动者' },
        { department_id: 3, departmentName: '用人单位' },
        { department_id: 4, departmentName: '部门管理员' }
      ],
      // 表单参数
      form: {},
      defaultProps: {
        children: 'children',
        label: 'deptName'
      },

      // 查询参数
      queryParams: {
        pageIndex: 1,
        pageSize: 10,
        username: undefined,
        phone: undefined,
        status: undefined,
        deptId: undefined
      },
      // 表单校验
      rules: {
        username: [
          { required: true, message: '用户名称不能为空', trigger: 'blur' },
          { min: 3, message: "长度最少3字符", trigger: "blur" },
          { min: 20, message: "长度最长20字符", trigger: "blur" }
        ],
        department_id: [
          { required: true, message: '部门不能为空', trigger: 'blur' }
        ],
        phone_checked: [
          { required: true, message: '手机验证状态不能为空', trigger: 'blur' }
        ],
        active: [
          { required: true, message: '账户状态不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '用户密码不能为空', trigger: 'blur' },
          { min: 3, message: "长度最少3字符", trigger: "blur" },
          { min: 20, message: "长度最长20字符", trigger: "blur" }
        ],
        confirm_password: [
          { required: true, message: '确认密码不能为空', validator: validatePass2, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱地址不能为空', trigger: 'blur' },
          {
            type: 'email',
            message: "'请输入正确的邮箱地址",
            trigger: ['blur', 'change']
          }
        ],
        phone: [
          { required: true, message: '手机号码不能为空', trigger: 'blur' },
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: '请输入正确的手机号码',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  watch: {
    // 根据名称筛选部门树
    deptName(val) {
      this.$refs.tree.filter(val)
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询用户列表 */
    getList() {
      this.loading = true
      getAllUser({
        currentPage: this.queryParams.pageIndex,
        pageSize: this.queryParams.pageSize
      }).then(response => {
        this.userList = response.data.list
        this.total = response.data.total_count
        this.loading = false
        console.log(66666, this.userList);
      })
    },
    // 用户状态修改
    handleStatusChange(row) {
      const text = row.status === '0' ? '启用' : '停用'
      this.$confirm('确认要"' + text + '""' + row.username + '"用户吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return changeUserStatus(row.userId, row.status)
      }).then(() => {
        this.msgSuccess(text + '成功')
      }).catch(function() {
        row.status = row.status === '0' ? '1' : '0'
      })
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
        username: undefined,
        department_id: undefined,
        phone_checked: undefined,
        active: undefined,
        password: undefined,
        confirm_password: undefined,
        email: undefined,
        phone: undefined
      }
      // this.resetForm('form')
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.page = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = []
      // this.resetForm('queryForm')
      this.handleQuery()
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.userId)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      // getUserInit().then(response => {
      //   this.postOptions = response.data.posts
      //   this.roleOptions = response.data.roles
      //   this.open = true
      //   this.title = '添加用户'
      //   this.form.password = '123456'
      // })
      this.open = true
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      this.form = row
      this.form.id = row.id
      this.open = true
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id !== undefined) {
            updateUser(this.form).then(response => {
              if (response.message === '注册成功') {
                this.$message({
                  message: response.message,
                  type: "success"
                });
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          } else {
            createNewUser(this.form).then(response => {
              if (response.message === '注册成功') {
                this.$message({
                  message: response.message,
                  type: "success"
                });
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          }
        }
      })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const id = row.id
      this.$confirm('是否确认删除用户的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(
        delUser(id)
      ).then(() => {
        this.getList()
      }).catch(function() {})
    }
  }
}
</script>

