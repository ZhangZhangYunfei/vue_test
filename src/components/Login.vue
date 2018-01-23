<template>
  <div>
    <el-row >
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="6">
        <el-input
          placeholder="请输入用户名"
          prefix-icon="el-icon-info"
          v-model="name">
        </el-input>
        <el-input
          type="password"
          placeholder="请输入密码"
          prefix-icon="el-icon-info"
          v-model="pwd">
        </el-input>
        <el-alert
          title="请输入正确的用户名或者密码"
          v-if="showError"
          type="error"
          show-icon>
        </el-alert>
        <el-button type="primary" @click="doLogin()">登陆</el-button>
      </el-col>
    </el-row>
    <el-row>
    </el-row>
  </div>
</template>

<script>
import {set}  from '../assets/js/cookieUtil'

export default {
  name: 'Login',

  data () {
    return {
      name: '',
      pwd: '',
      showError: false
    }
  },
  methods: {
    doLogin () {
      if (!this.name.length || !this.pwd.length) {
        this.showError = true
        return
      }

      this.$router.push({path: '/home'})

      // this.login({name: this.name, pwd: this.pwd})
      //   .then(() => {
      //     const date = new Date(Date.now() + 60000 * 30)
      //     // set('user', this.name, date, '/', window.location.hostname)
      //     this.$router.push({path: '/welcome'})
      //   })
      //   .catch(msg => this.info = msg)
    },
    clearInfo () {
      this.showError = false
    }
    // ...mapActions(['login'])
  },
  watch: {
    name: 'clearInfo',
    pwd: 'clearInfo'
  }
}
</script>

<style scoped>
  .el-row {
    margin-bottom: 120px;
  }
  .el-input {
    margin-bottom: 20px;
  }
</style>
