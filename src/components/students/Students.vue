<template>
  <div class="tab-container">
  <el-tabs v-model="activeName">
    <el-tab-pane name="first">
      <span slot="label"><i class="el-icon-search"></i> 学生列表</span>
      <StudentsList v-on:secected_studemt="selectedStudentNotify"></StudentsList>
    </el-tab-pane>
    <el-tab-pane name="second" :disabled="disableSubjectDetails">
      <span slot="label"><i class="el-icon-info"></i> 课时详情</span>
      <StudentsSubjectDetails :selected_student='selectedStudent'></StudentsSubjectDetails>
    </el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
  import StudentsList from './StudentsList.vue'
  import StudentsSubjectDetails from './StudentsSubjectDetails.vue'

  export default {
    name: 'Students',
    components: { StudentsList, StudentsSubjectDetails },

    data() {
      return {
        activeName: 'first',

        disableSubjectDetails: true,
        selectedStudent: null
      };
    },
    methods: {
      selectedStudentNotify(student) {
        this.disableSubjectDetails = false;
        this.activeName = 'second';
        this.selectedStudent = student;
      },
    }
  };
</script>

<style scoped>
  .tab-container {
    margin-bottom: 30px;
  }
</style>
