<template>
  <div class="containers">
    <el-row>
      <el-col :span="24">
        <el-card>
          <el-row>
            <el-col :span="12">
              <el-button
                  type="primary"
                  size="small"
                  icon="el-icon-plus"
                  @click="addUser"
              >新增
              </el-button>
            </el-col>
            <el-col :span="12">
              <div class="right">
                <el-input placeholder="请输入" size="small" v-model="searchValue"></el-input>
                <el-button
                    type="primary"
                    icon="el-icon-search"
                    size="small"
                    @click="searchUser"
                >搜索
                </el-button>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <!--    <el-divider></el-divider>-->
    <el-row class="main">
      <el-col :span="24">
        <el-card>
          <div class="table">
            <el-table
                :data="tableList"
                stripe
                style="width: 100%"
                v-loading="tableLoading">
              <el-table-column
                  type="index"
                  label="序号"
                  width="60"
                  align="center">
              </el-table-column>
              <el-table-column
                  prop="name"
                  label="姓名"
                  width="160"
                  align="center">
              </el-table-column>
              <el-table-column
                  prop="age"
                  label="年龄"
                  width="70"
                  align="center">
              </el-table-column>
              <el-table-column
                  prop="gender"
                  label="性别"
                  width="60"
                  align="center">
              </el-table-column>
              <el-table-column
                  prop="birth"
                  label="出生日期"
                  width="120"
                  align="center">
              </el-table-column>
              <el-table-column
                  prop="addr"
                  label="地址"
                  align="center"
                  width="351"
                  show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                  label="操作"
                  align="center"
                  width="180">
                <template v-slot="{row,$index}">
                  <el-button
                      type="success"
                      size="mini"
                      icon="el-icon-edit"
                      @click="editUser(row)"
                  >编辑
                  </el-button>
                  <el-button
                      type="danger"
                      size="mini"
                      icon="el-icon-delete"
                      @click="deleteUser(row)"
                  >删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="pagination">
            <el-pagination
                background
                @size-change="changePageSize"
                @current-change="changePage"
                :current-page="pageInfo.page"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="pageInfo.limit"
                layout="total, prev, pager, next, jumper, -> ,sizes"
                style="text-align: center"
                :total="totalPage">
            </el-pagination>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div class="operationDialog">
      <el-dialog
          :title="dialogVisible"
          :visible.sync="operationDialogVisible"
          width="700px"
          :before-close="handleClose">
        <el-form
            :model="operationDialogForm"
            inline
            ref="operationDialogForm"
            :rules="rules">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="operationDialogForm.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="年龄" prop="age" label-width="165px">
            <el-input v-model="operationDialogForm.age" placeholder="请输入年龄"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-select v-model="operationDialogForm.sex" placeholder="请选择性别">
              <el-option label="男" :value="1"></el-option>
              <el-option label="女" :value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出生日期" prop="birth" label-width="150px">
            <el-date-picker
                v-model="operationDialogForm.birth"
                clearable
                type="date"
                format="yyyy年MM月dd日"
                value-format="yyyy-MM-dd"
                align="center"
                placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="地址" prop="addr" label-width="50px">
            <el-input v-model="operationDialogForm.addr" placeholder="请输入地址" style="width: 300px"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelOperationDialog">取 消</el-button>
          <el-button
              type="primary"
              @click="confirmOperationDialog()"
          >确 定
          </el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {createUser, getUserList, updateUser, deleteUser} from '@/api/data'

export default {
  name: "user",
  data() {
    return {
      operationDialogTitle: 0,
      operationDialogVisible: false,
      operationDialogForm: {
        name: '',
        age: '',
        sex: '',
        birth: '',
        addr: ''
      },
      searchValue: '',
      rules: {
        name: [
          {required: true, message: '请输入用户名称', trigger: 'blur'},
          {min: 2, max: 12, message: '长度在 2 到 12 个字符', trigger: 'blur'}
        ],
        sex: [
          {required: true, message: '请选择性别', trigger: 'change'}
        ],
      },
      tableList: [],
      tableLoading: true,
      totalPage: 0,
      pageInfo: {
        page: 1,
        limit: 10,
        name: ''
      }
    }
  },
  computed: {
    dialogVisible() {
      return this.operationDialogTitle === 0 ? '新增用户' : '编辑用户'
    }
  },
  methods: {
    async requestUser(pageInfo = {}) {
      const {data} = await getUserList(pageInfo)
      if (data.code === 20000) {
        this.totalPage = data.count
        this.tableList = data.list
        this.tableList.map(item => {
          this.$set(item, 'gender', item.sex === 1 ? '男' : '女')
        })
        this.tableLoading = false
      }
    },
    addUser() {
      this.$refs.operationDialogForm.resetFields()
      this.operationDialogTitle = 0
      this.operationDialogVisible = true
    },
    cancelOperationDialog() {
      this.operationDialogVisible = false
      this.$message.info('已取消')
      this.$refs.operationDialogForm.resetFields()
      console.log(this.operationDialogForm)
    },

    confirmOperationDialog() {
      this.$refs.operationDialogForm.validate((valid) => {
        if (valid) {
          if (!this.operationDialogTitle) {
            this.goAddUser()
          } else {
            this.goModifyUser()
          }
        } else {
          this.$message.error('输入信息有误!')
        }
      })
    },
    async goAddUser() {
      const {data} = await createUser(this.operationDialogForm)
      if (data.code === 20000) {
        this.operationDialogVisible = false
        this.$message.success('新增用户成功')
        this.pageInfo.page = 1
        this.requestUser(this.pageInfo)
            .then(() => {
            })
            .catch((err) => {
              this.$message.error(`请求数据失败:${err}`)
            })
      } else {
        this.$message.error('新增用户失败')
      }
    },
    async goModifyUser() {
      const {data} = await updateUser(this.operationDialogForm)
      if (data.code === 20000) {
        this.$message.success('编辑用户成功!')
        this.operationDialogVisible = false
        this.requestUser(this.pageInfo)
            .then(() => {
            })
            .catch((err) => {
              this.$message.error(`请求数据失败:${err}`)
            })
      } else {
        this.$message.error('编辑用户失败!')
      }
    },
    handleClose(done) {
      this.$confirm('确认关闭窗口吗?已填信息将被清空')
          .then(() => {
            done()
            this.$message.info('已关闭')
            this.$refs.operationDialogForm.resetFields()
          })
          .catch(() => {
          })
    },
    editUser(row) {
      this.operationDialogTitle = 1
      this.operationDialogVisible = true
      this.$nextTick(() => {
        this.operationDialogForm = Object.assign({}, row)
      })
    },
    deleteUser(row) {
      this.$confirm(`确定要删除'${row.name}'吗?`, '删除用户', {
        type: 'warning',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        showClose: false,
      }).then(async () => {
        const {data} = await deleteUser({id: row.id})
        if (data.code === 20000) {
          this.$message.success('删除成功')
          this.pageInfo.page = 1
          this.requestUser(this.pageInfo)
              .then(() => {
              })
              .catch((err) => {
                this.$message.error(`请求数据失败:${err}`)
              })
        }
      }).catch(() => {
        this.$message.info('已取消删除')
      })

    },
    searchUser() {
      this.tableLoading = true
      if (this.searchValue.trim()) {
        this.pageInfo.name = this.searchValue
        this.searchValue = ''
      } else {
        this.pageInfo.name = ''
      }
      this.pageInfo.page = 1
      this.requestUser(this.pageInfo)
    },
    changePageSize(size) {
      this.tableLoading = true
      this.pageInfo.limit = size
      this.pageInfo.page = 1
      this.requestUser(this.pageInfo)
    },
    changePage(page) {
      this.tableLoading = true
      this.pageInfo.page = page
      this.requestUser(this.pageInfo)
    }
  },
  mounted() {
    this.requestUser(this.pageInfo)
  }
}
</script>

<style scoped lang="less">
.el-card /deep/ .el-card__body {
  padding: 10px;
}

.containers {
  margin-top: 20px;

  .right {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .el-input {
      width: 200px;
    }

  }
}

.main {
  margin-top: 10px;
}

.pagination {
  margin-top: 10px;
}
</style>
