<template>
  <div class="tab-container">
    <el-tabs v-model="activeName">
      <el-tab-pane name="1">
        <span slot="label"><i class="el-icon-edit"></i> 录入</span>
        <CreateSubject></CreateSubject>
      </el-tab-pane>
      <el-tab-pane name="2">
        <span slot="label"><i class="el-icon-plus"></i> 新学生</span>
        <CreateStudent></CreateStudent>
      </el-tab-pane>
      <el-tab-pane name="3">
        <span slot="label"><i class="el-icon-edit-outline"></i> 学生信息更新</span>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import CreateStudent from './CreateStudent.vue'
  import CreateSubject from './CreateSubject.vue'

  export default {
    name: "subjects",
    components: { CreateStudent, CreateSubject },

    data() {
      return {
        activeName: '1',
      };
    },
    methods: {

    }
  };
</script>

<style scoped>
  .tab-container {
    margin-bottom: 30px;
  }
</style>
