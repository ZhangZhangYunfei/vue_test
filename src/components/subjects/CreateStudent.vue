<template>
  <div>
    <el-steps :active="step" finish-status="success" align-center>
      <el-step title="步骤 1" description="创建一个新学生"></el-step>
      <el-step title="步骤 2" description="给新的学生报名"></el-step>
    </el-steps>

    <el-row type="flex" justify="center" :span="24">
      <el-col :xs="0" :sm="2" :md="4" :lg="6" :xl="8"></el-col>
      <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="8" align="center">
        <el-form ref="form" :model="form" label-width="80px" v-show="step===0">
          <el-form-item label="学生姓名" required="true">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="所属学校" required="true">
            <el-input v-model="form.school"></el-input>
          </el-form-item>
          <el-form-item label="年级" required="true">
            <el-input v-model="form.degree"></el-input>
          </el-form-item>
          <el-form-item label="电话号码" required="true">
            <el-input v-model="form.telephone"></el-input>
          </el-form-item>
          <el-form-item label="住址" required="true">
            <el-input v-model="form.address"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmitStudent">立即创建</el-button>
            <el-button type="warning" @click="step++">跳过</el-button>
          </el-form-item>
        </el-form>

        <el-form ref="form" :model="form" label-width="80px" v-show="step===1">
          <el-form-item label="电话号码" required="true">
            <el-input v-model="form.telephone" placeholder="请输入学生号码"></el-input>
          </el-form-item>
          <el-form-item label="学生姓名" required="true">
            <el-input v-model="form.name" placeholder="请输入学生姓名"></el-input>
          </el-form-item>
          <el-form-item label="课程类型" required="true">
            <el-input v-model="form.type" placeholder="请输入课程类型"></el-input>
          </el-form-item>
          <el-form-item label="报名时长">
            <el-input-number v-model="form.hours" :min="1"></el-input-number>
          </el-form-item>
          <el-form-item label="学费">
            <el-input-number v-model="form.amount" :min="1"></el-input-number>
          </el-form-item>
          <el-form-item label="课程描述">
            <el-input v-model="form.desc" placeholder="请输入课程描述"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="warning" @click="step--">回退</el-button>
            <el-button type="primary" @click="onSubmitSubject">立即创建</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :xs="0" :sm="2" :md="4" :lg="6" :xl="8"></el-col>
    </el-row>
  </div>
</template>


<script>
  import Vue from 'vue'

  export default {
    name: 'create-student',
    props: ['activeTab'],

    watch: {
      activeTab: function (newVal) {
        this.step = 0
      }
    },

    data() {
      return {
        step: 0,

        form: {
          studentId: null,
          name: '',
          school: '',
          degree: '',
          telephone: '',
          address: '',
          type: '',
          hours: 1,
          amount: 1,
        }
      }
    },
    methods: {
      onSubmitStudent() {
        Vue.http.post('/api/user/register', {
          telephone: this.form.telephone,
          password: '123456',
          type: 'student',
          name: this.form.name,
          school: this.form.school,
          degree: this.form.degree,
          address: this.form.address
        })
          .then(resp => {
            if (resp.body.status && resp.body.status === 'FAILED') {
              this.$message.error(resp.body.message)
            } else {
              this.$message.success(resp.body.message || '创建成功！')
              this.form.studentId = resp.body.id
              this.step++
            }
          })
          .catch(msg => this.$message.error(msg.data))
      },

      onSubmitSubject() {
        Vue.http.post('/api/registration', {
          studentId: this.form.studentId,
          type: this.form.type,
          hours: this.form.hours,
          amount: this.form.amount
        })
          .then(resp => {
            if (resp.body.status && resp.body.status === 'FAILED') {
              this.$message.error(resp.body.message)
            } else {
              this.$message.success(resp.body.message || '课程报名成功！')
              this.step++
            }
          })
          .catch(msg => this.$message.error(msg.data))
      }
    }
  }
</script>

<style scoped>
  .el-input-number {
    width: 100%;
  }
  .el-row {
    margin-top: 20px;
  }
</style>
