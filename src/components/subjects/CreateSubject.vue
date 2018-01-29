<template>
  <el-form ref="form" :model="form" label-width="110px">
    <el-form-item label="学生姓名" required="true">
      <el-col :span="8" align="left">
        <el-select v-model="form.studentId" placeholder="请选择">
          <el-option
            v-for="item in students"
            :key="item.telephone"
            :label="item.name"
            :value="item.id">
            <span style="float: left">{{ item.name }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.school }}</span>
          </el-option>
        </el-select>
      </el-col>
    </el-form-item>
    <el-form-item label="课程类型" required="true">
      <el-col :span="8">
        <el-input v-model="form.type" placeholder="请输入课程类型"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="报名时长">
      <el-col :span="8" align="left">
        <el-input-number v-model="form.hours" :min="1"></el-input-number>
      </el-col>
    </el-form-item>
    <el-form-item label="学费">
      <el-col :span="8" align="left">
        <el-input-number v-model="form.amount" :min="1"></el-input-number>
      </el-col>
    </el-form-item>
    <el-form-item label="课程描述">
      <el-col :span="8">
        <el-input v-model="form.desc" placeholder="请输入课程描述"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-col :span="8">
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
      </el-col>
    </el-form-item>
  </el-form>
</template>


<script>
  import Vue from 'vue'

  export default {
    name: "create-subject",

    created() {
      this.query();
    },

    data() {
      return {
        students: [],

        form: {
          studentId: null,
          telephone: '',
          name: '',
          type: '',
          hours: 1,
          amount: 1,
          desc: ''
        }
      }
    },
    methods: {
      query() {
        Vue.http.get('/api/subject/students')
          .then(resp => {
            if (resp.body.status && resp.body.status === 'FAILED') {
              this.$message.error(resp.body.message)
            } else {
              this.students = resp.body
            }
          })
          .catch(msg => this.$message.error(msg.data))
      },

      onSubmit() {
        debugger
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
              this.$message.success(resp.body.message || '课程报名成功！');
              this.step++;
            }
          })
          .catch(msg => this.$message.error(msg.data))
      }
    }
  }
</script>

<style scoped>
  .el-select {
    width: 100%;
  }
  .el-input-number {
    width: 100%;
  }
</style>
