<template>
  <div>
    <el-table
      :data="subjects"
      border
      style="width: 100%">
      <el-table-column prop="student_name" label="姓名" align="center">
      </el-table-column>

      <el-table-column prop="type" label="课程类型" align="center">
      </el-table-column>

      <el-table-column prop="total_hours" label="总课时" align="center">
      </el-table-column>

      <el-table-column prop="available_hours" label="剩余课时" align="center">
      </el-table-column>

      <el-table-column prop="reserved_hours" label="待确认课时" align="center">
      </el-table-column>

      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="registrationDetails(scope.row)" type="text" size="small">报名详情</el-button>
          <el-button @click="assignmentDetails(scope.row)" type="text" size="small">上课详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title=""
      :visible.sync="registrationDetailsVisible"
      width="60%">
      <el-table
        :data="registrations"
        border
        style="width: 100%">
        <el-table-column prop="name" label="姓名" align="center">
        </el-table-column>
        <el-table-column prop="hours" label="小时" align="center">
        </el-table-column>
        <el-table-column prop="created_time" label="创建日期" align="center">
        </el-table-column>
        <el-table-column prop="amount" label="金额" align="center">
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="registrationDetailsVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title=""
      :visible.sync="assignmentDetailsVisible"
      width="60%">
      <el-table
        :data="assignments"
        border
        style="width: 100%">
        <el-table-column prop="studentName" label="姓名" align="center">
        </el-table-column>
        <el-table-column prop="type" label="课程类型" align="center">
        </el-table-column>
        <el-table-column prop="hours" label="时长" align="center">
        </el-table-column>
        <el-table-column prop="scheduled_time" label="上课日期" align="center">
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <el-tag size="medium" :type="scope.row.status === 1 ? 'success':'warning'">
              {{ scope.row.status === 1 ? '已结束':'未确认' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="onConfirm(scope.row)" type="text" size="small" :disabled="scope.row.status===1">
              确认
            </el-button>
            <el-button @click="onDelete(scope.row)" type="text" size="small" :disabled="scope.row.status===1">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="assignmentDetailsVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
  import Vue from 'vue'

  export default {
      name: "students-subject-details",

      props: ['selected_student'],

      watch: {
        selected_student: function(newVal) {
          let vm = this;
          vm.$emit('switchLoading', true);
          this.query();
          vm.$emit('switchLoading', false);
        }
      },

      computed: {
      },

      data() {
        return {
          registrationDetailsVisible: false,
          assignmentDetailsVisible: false,

          subjects: [],
          registrations: [],
          assignments: []
        }
      },

      created: function () {
        this.query();
      },

      methods: {
        registrationDetails(row) {
          Vue.http.get('/api/registration?studentId='+row.student_id+'&subjectId='+row.id)
            .then(resp => {
              if (resp.body.status && resp.body.status === 'FAILED') {
                this.$message.error(resp.body.message)
              } else {
                this.registrations = resp.body;
                this.registrationDetailsVisible = true;
              }
            })
            .catch(msg => this.$message.error(msg.data))
        },
        assignmentDetails(row){
          Vue.http.get('/api/assignment/student?studentId='+row.student_id+'&subjectId='+row.id)
            .then(resp => {
              if (resp.body.status && resp.body.status === 'FAILED') {
                this.$message.error(resp.body.message)
              } else {
                this.assignments = resp.body;
                this.assignmentDetailsVisible = true;
              }
            })
            .catch(msg => this.$message.error(msg.data))
        },
        onConfirm(row) {
          Vue.http.post('/api/assignment/'+row.id)
            .then(resp => {
              if (resp.body.status && resp.body.status === 'FAILED') {
                this.$message.error(resp.body.message)
              } else {
                this.assignmentDetails({student_id:row.student_id, id:row.subject_id});
              }
            })
            .catch(msg => this.$message.error(msg.data))
        },
        onDelete(row) {
          Vue.http.delete('/api/assignment/'+row.id)
            .then(resp => {
              if (resp.body.status && resp.body.status === 'FAILED') {
                this.$message.error(resp.body.message)
              } else {
                this.assignmentDetails({student_id:row.student_id, id:row.subject_id});
              }
            })
            .catch(msg => this.$message.error(msg.data))
        },
        query() {
          Vue.http.get('/api/subject/student?studentId='+this.selected_student.id)
            .then(resp => {
              if (resp.body.status && resp.body.status === 'FAILED') {
                this.$message.error(resp.body.message)
              } else {
                this.subjects = resp.body
              }
            })
            .catch(msg => this.$message.error(msg.data))
        }
      }

    }
</script>

<style scoped>

</style>
