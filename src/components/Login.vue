<template>
  <div>
    <el-row>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="6">
        <el-form label-width="0px" align="left">
          <el-form-item>
            <el-input
              placeholder="请输入电话号码"
              prefix-icon="el-icon-phone"
              v-model="telephone">
            </el-input>
          </el-form-item>
          <el-input
            type="password"
            placeholder="请输入密码"
            prefix-icon="el-icon-info"
            v-model="password">
          </el-input>
          <el-form-item>
            <el-alert
              title="请输入正确的电话号码或者密码"
              v-if="showError"
              type="error"
              show-icon>
            </el-alert>
          </el-form-item>
          <el-form-item>
            <el-select v-model="type" placeholder="请选择身份">
              <el-option
                v-for="item in types"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-button type="primary" @click="doLogin()">登陆</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
    </el-row>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {mapActions} from 'vuex'
  import {setCookie} from '../assets/js/cookieUtil'

  export default {
    name: 'Login',

    data() {
      return {
        types: [{
          value: 'teacher',
          label: '老师'
        }
        // , {
        //   value: 'student',
        //   label: '学生'
        // }
        ],
        telephone: '',
        password: '',
        type: '',

        showError: false
      }
    },
    methods: {
      doLogin() {
        if (!this.telephone.length || !this.password.length) {
          this.showError = true;
          return
        }

        return Vue.http.post('/api/user/login', {telephone: this.telephone, password: this.password, type: 'teacher'})
          .then(response => {
            if (response.body.status && response.body.status === 'FAILED') {
              this.$message.error(response.body.message)
            } else {
              const date = new Date(Date.now() + 60000 * 30)
              setCookie('user', this.name, date, '/', window.location.hostname)
              Vue.http.get('/api/user')
                .then(response2 => {
                  if (response2.body.status && response2.body.status === 'FAILED') {
                    this.$message.error(response2.body.message)
                  } else {
                    this.setUser(response2.body)
                    this.$router.push({path: '/home'})
                  }
                })
                .catch(msg => this.$message.error(msg.data))
            }
          })
          .catch(msg => this.$message.error(msg.data))
      },
      clearInfo() {
        this.showError = false
      },
      ...mapActions(['setUser'])
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
</style>
