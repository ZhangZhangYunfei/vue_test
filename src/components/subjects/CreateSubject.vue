<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="学生姓名" required="true">
      <el-col :span="8">
        <el-input v-model="form.name" placeholder="请输入学生姓名"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="课程类型" required="true">
      <el-col :span="8">
        <el-input v-model="form.type" placeholder="请输入课程类型"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="总共时长">
      <el-col :span="16" align="left">
        <el-input-number v-model="form.hours" :min="1"></el-input-number>
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
  export default {
    name: "create-subject",

    data() {
      return {
        form: {
          name: '',
          type: '',
          hours: 0,
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>

<style scoped>

</style>
