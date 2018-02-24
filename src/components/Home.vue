<template>
  <div>
    <el-container>
      <el-header style="text-align: center;">
        <el-row :span="24">
          <el-col :xs="4" :sm="8" align="left">
            <el-switch
              v-model="isCollapse">
            </el-switch>
          </el-col>
          <el-col :xs="14" :sm="8">
            <span>优学教育课程管理系统</span>
          </el-col>
          <el-col :xs="6" :sm="8" align="right">
            <el-dropdown @command="handleCommand">
              <i class="el-icon-setting" style="margin-right: 5px"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="info">概要</el-dropdown-item>
                <el-dropdown-item command="pwd_reset">修改密码</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <span>{{userName}}</span>
          </el-col>
        </el-row>
      </el-header>

      <el-container>
        <el-aside style="background-color: rgb(238, 241, 246)" width="auto">
          <el-menu :collapse="isCollapse" class="el-menu-vertical-demo">
            <el-menu-item index="1" @click="$router.push({path: '/home/schedule'})">
              <i class="el-icon-date"></i>
              <span slot="title">我的课表</span>
            </el-menu-item>
            <el-menu-item index="2" @click="$router.push({path: '/home/students'})">
              <i class="el-icon-view"></i>
              <span slot="title">我的学生</span>
            </el-menu-item>
            <el-menu-item index="3" @click="$router.push({path: '/home/subjects'})">
              <i class="el-icon-edit-outline"></i>
              <span slot="title">新课录入</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>

    <el-dialog
      title=""
      :visible.sync="infoDialogVisible"
      width="60%">
      <el-form :model="user" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="user.name" disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="电话号码">
          <el-input v-model="user.telephone" disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="user.address" disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="科目">
          <el-input v-model="user.subject" disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input v-model="user.created_time" disabled="true"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="infoDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title=""
      :visible.sync="pwdResetDialogVisible"
      width="60%">
      <el-form :model="pwdInfo" label-width="90px">
        <el-form-item label="旧密码">
          <el-input v-model="pwdInfo.oldPwd" type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="pwdInfo.newPwd" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码">
          <el-input v-model="pwdInfo.newPwdAgain" type="password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="resetPwd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 150px;
    min-height: 200px;
  }
  .el-header {
    background-color: #0B77E6;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
</style>

<script>
  import Vue from 'vue'
  import {setCookie, getCookie, delCookie} from '../assets/js/cookieUtil'
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

  export default {
    name: 'Home',

    data() {
      return {
        infoDialogVisible: false,
        pwdResetDialogVisible: false,
        isCollapse: false,

        pwdInfo: {
          oldPwd: '',
          newPwd: '',
          newPwdAgain: ''
        }
      }
    },

    created() {
      const user = getCookie('user')
      if (!user) this.$router.push('/login')
      if (user && !this.user.name) {
        Vue.http.get('/api/user')
          .then(response => {
            if (response.body.status && response.body.status === 'FAILED') {
              this.$message.error(response.body.message)
            } else {
              this.setUser(response.body)
            }
          })
          .catch(msg => this.$message.error(msg.data))
      }
    },

    computed: {
      user() {
        return this.$store.state.user
      },
      ...mapState(['user']),
      ...mapGetters(['userName'])
    },

    methods: {
      handleCommand(command) {
        if (command === 'info') {
          this.infoDialogVisible = true
        } else if (command === 'logout') {
          Vue.http.post('/api/user/logout')
            .then(response => {
              if (response.body.status && response.body.status === 'FAILED') {
                this.$message.error(response.body.message)
              } else {
                delCookie('user', '/', window.location.hostname)
                this.setUser({})
                this.$message.success(response.body.message || '执行成功')
                this.$router.push('/login')
              }
            })
            .catch(msg => this.$message.error(msg.data))
        } else if (command === 'pwd_reset') {
          this.pwdResetDialogVisible = true
        }
      },

      resetPwd() {
        if (this.pwdInfo.newPwd !== this.pwdInfo.newPwdAgain) {
          this.$message.error('新密码两次输入不一致！')
        } else {
          Vue.http.post('/api/user/password-resets', {
            oldPassword: this.pwdInfo.oldPwd,
            newPassword: this.pwdInfo.newPwd
          })
            .then(response => {
              if (response.body.status && response.body.status === 'FAILED') {
                this.$message.error(response.body.message)
              } else {
                delCookie('user', '/', window.location.hostname)
                this.setUser({})
                this.$message.success(response.body.message)
                this.pwdResetDialogVisible = false
                this.$router.push('/login')
              }
            })
            .catch(msg => this.$message.error(msg.data))
        }
      },

      ...mapMutations(['SET_USER']),
      ...mapActions(['setUser'])
    }
  }
</script>
