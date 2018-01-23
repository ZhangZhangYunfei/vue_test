<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="学生姓名" required="true">
      <el-col :span="8">
        <el-input v-model="form.name"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="所属学校">
      <el-col :span="8">
        <el-input v-model="form.school"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="年级">
      <el-col :span="8">
        <el-input v-model="form.degree"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="电话号码">
      <el-col :span="8">
        <el-input v-model="form.telephone"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="住址">
      <el-col :span="8">
        <el-input v-model="form.address"></el-input>
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
      name: "create-student",

      data() {
        return {
          form: {
            name: '',
            school: '',
            degree: '',
            telephone: '',
            address: ''
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
