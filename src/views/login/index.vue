<template>
  <el-form
    :model="loginForm"
    ref="loginForm"
    :rules="rules"
    label-width="65px"
    class="login-container"
  >
    <h1 class="login-title">后台系统登录</h1>
    <el-form-item prop="username" label="用户名">
      <el-input
        v-model="loginForm.username"
        placeholder="请输入用户名"
        clearable
        autocomplete="off"
        prefix-icon="el-icon-user-solid"
      ></el-input>
    </el-form-item>
    <el-form-item prop="password" label="密码">
      <el-input
        show-password
        clearable
        autocomplete="off"
        v-model="loginForm.password"
        placeholder="请输入密码"
        prefix-icon="el-icon-key"
      ></el-input>
    </el-form-item>
    <el-form-item class="login-fa-item" label-width="0px">
      <el-button
        type="primary"
        icon="el-icon-s-check"
        class="login-submit"
        @click="goLogin"
      >
        登录
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {getMenu} from '@/api/data'

export default {
  name: "login",
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, max: 16, message: '用户名在3至16个字符之间', trigger: 'blur'},
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      },
    }
  },
  methods: {
    goLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          getMenu(this.loginForm).then(res => {
            console.log(res)
            const {data} = res
            if (data.code === 20000) {
              this.$store.commit('CLEARMENU')
              this.$store.commit('SETMENU', data.data.menu)
              this.$store.commit('SETTOKEN', data.data.token)
              this.$store.commit('ADDMENU', this.$router)
              this.$router.push({name: 'home'})
            } else {
              this.$message.error(data.data.message)
            }
          }).catch(err => {
            this.$message.error(`登录失败:${err}`)
          })
        } else {
          this.$message.error('请检查输入的信息!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  width: 400px;
  border: 2px solid #ccc;
  border-radius: 5%;
  margin: 180px auto;
  padding: 35px 35px 0 35px;
  background-color: #eee;
  box-shadow: 0 0 25px #bbb;

  .login-title {
    text-align: center;
    margin: 0 auto 40px auto;
    font-size: 26px;
    font-weight: 600;
    letter-spacing: 10px;
    text-shadow: 0 0 30px #000;
    color: #606266;
  }

  .login-fa-item {
    display: flex;
    justify-content: center;
    align-items: center;

    .login-submit {
      margin: 10px 0 10px 0;
    }
  }

}

/deep/ .el-form-item__error {
  font-size: 14px;
}
</style>
