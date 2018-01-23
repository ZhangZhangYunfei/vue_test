<template>
  <div>
    <el-table
      :data="subjects"
      border
      style="width: 100%">
      <el-table-column prop="name" label="姓名" align="center">
      </el-table-column>

      <el-table-column prop="type" label="课程类型" align="center">
      </el-table-column>

      <el-table-column prop="totalHours" label="总课时" align="center">
      </el-table-column>

      <el-table-column prop="availableHours" label="剩余课时" align="center">
      </el-table-column>

      <el-table-column prop="reservedHours" label="待确认课时" align="center">
      </el-table-column>

      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="confirmSubject(scope.row)" type="text" size="small">课时确认</el-button>
          <el-button @click="reviseSubject(scope.row)" type="text" size="small">课时修改</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title=""
      :visible.sync="confirmDialogVisible"
      width="60%">
      <el-table
        :data="assignments"
        border
        style="width: 100%">
        <el-table-column prop="name" label="姓名" align="center">
        </el-table-column>
        <el-table-column prop="type" label="课程类型" align="center">
        </el-table-column>
        <el-table-column prop="date" label="上课日期" align="center">
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="onConfirm(scope.row)" type="text" size="small">确认</el-button>
            <el-button @click="onDelete(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title=""
      :visible.sync="reviseDialogVisible"
      width="60%">
      <el-form ref="form" :model="subject" label-width="80px">
        <el-form-item label="学生姓名">
          <el-col :span="8">
            <el-input v-model="subject.name" placeholder="请输入学生姓名" disabled="true"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="课程类型" required="true">
          <el-col :span="8">
            <el-input v-model="subject.type" placeholder="请输入课程类型" disabled="true"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="课程描述">
          <el-col :span="8">
            <el-input v-model="subject.desc" placeholder="请输入课程描述" disabled="true"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="总共时长">
          <el-col :span="16" align="left">
            <el-input-number v-model="subject.totalHours" :disabled="true"></el-input-number>
          </el-col>
        </el-form-item>
        <el-form-item label="待确认时长">
          <el-col :span="16" align="left">
            <el-input-number v-model="subject.reservedHours" disabled="true"></el-input-number>
          </el-col>
        </el-form-item>
        <el-form-item label="剩余时长">
          <el-col :span="16" align="left">
            <el-input-number v-model="subject.availableHours"
                             :onchange="subject.totalHours=subject.reservedHours+subject.availableHours"></el-input-number>
            <el-button type="primary" @click="onRevise">确定</el-button>
          </el-col>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>

</template>

<script>
    export default {
      name: "students-subject-details",

      props: ['selected_student'],

      watch: {
        selected_student: function(newVal) {
          let vm = this;
          vm.$emit('switchLoading', true);
          console.info(this.selected_student);
          this.subjects = [{
            name: "李晓",
            type: '一对三',
            totalHours: 10,
            availableHours: 9,
            reservedHours: 1
          }]
          vm.$emit('switchLoading', false);
        }
      },

      computed: {
        studentName: function () {
          return this.selected_student.name;
        }
      },

      data() {
        return {
          confirmDialogVisible: false,
          reviseDialogVisible: false,

          subjects: [{
            name: '王晓',
            type: '一对三',
            totalHours: 10,
            availableHours: 9,
            reservedHours: 1
          }, {
            name: '王晓',
            type: '一对一',
            totalHours: 5,
            availableHours: 4,
            reservedHours: 1
          }],

          assignments: [{
            name: '王晓',
            type: '一对三',
            date: '2017-12-05',
            teacher: '',
            subject: '',
            state: ''
          }, {
            name: '王晓',
            type: '一对三',
            date: '2017-11-05',
            teacher: '',
            subject: '',
            state: ''
          }],

          subject:{
            name: '王晓',
            type: '一对三',
            totalHours: 10,
            availableHours: 9,
            reservedHours: 1,
            desc:'假的课程'
          }
        }
      },

      created: function () {
        console.info(this.selected_student)
      },

      methods: {
        confirmSubject(row) {
          this.confirmDialogVisible = true;
        },
        reviseSubject(row){
          this.reviseDialogVisible = true;
        },
        onConfirm(row) {
        },
        onDelete(row) {
        },
        onRevise(){
        }
      }

    }
</script>

<style scoped>

</style>
