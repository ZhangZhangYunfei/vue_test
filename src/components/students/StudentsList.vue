<template>
  <div>
    <el-table
      :data="students"
      stripe
      border
      style="width: 100%">
      <el-table-column prop="name" label="姓名" align="center">
      </el-table-column>

      <el-table-column prop="school" label="学校" align="center">
      </el-table-column>

      <el-table-column prop="degree" label="年级" align="center">
      </el-table-column>

      <el-table-column prop="telephone" label="电话号码" align="center">
      </el-table-column>

      <el-table-column prop="address" label="地址" align="center">
      </el-table-column>

      <el-table-column
        fixed="right"
        label="课时情况"
        align="center">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import Vue from 'vue'

  export default {
    name: 'StudentsList',

    created() {
      this.query()
    },

    methods: {
      handleClick(row) {
        let vm = this
        vm.$emit('secected_studemt', row)
      },

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
      }
    },

    data() {
      return {
        students: []
      }
    }
  }
</script>

<style scoped>
  .el-table-column {
    width: auto;
    min-width: 100px;
  }
</style>
