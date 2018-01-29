<template>
  <div>
    <el-row type="flex" class="row-bg" justify="start">
      <el-col :span="5" align="left">
        <el-date-picker
          v-model="date"
          type="week"
          format="yyyy-MM-dd"
          placeholder="选择周">
        </el-date-picker>
      </el-col>
      <span style="margin-left: 10px"></span>
      <el-button type="primary" @click="onQuery" :disabled="!date || date===''">查询</el-button>
    </el-row>
    <el-table
      @cell-dblclick="cellDoubleClick"
      :data="tableData"
      border
      stripe
      :cellClassName="cellClassName"
      style="width: 100%">
      <el-table-column
        fixed="left"
        label="时间\日期"
        type="index"
        :index="indexMethod"
        align="center"
        width="150">
      </el-table-column>
      <el-table-column
        prop="monday"
        label="星期一"
        align="center">
        <template slot-scope="scope">
          <el-tag
            :key="tag.id"
            :type="tag.state === 0 ? 'danger' : 'success'"
            v-for="tag in scope.row.monday"
            :closable="tag.state === 0"
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag.studentName}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="tuesday"
        label="星期二"
        align="center">
        <template slot-scope="scope">
          <el-tag
            :key="tag.id"
            :type="tag.state === 0 ? 'danger' : 'success'"
            v-for="tag in scope.row.tuesday"
            :closable="tag.state === 0"
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag.studentName}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="wednesday"
        label="星期三"
        align="center">
        <template slot-scope="scope">
          <el-tag
            :key="tag.id"
            :type="tag.state === 0 ? 'danger' : 'success'"
            v-for="tag in scope.row.wednesday"
            :closable="tag.state === 0"
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag.studentName}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="thursday"
        label="星期四"
        align="center">
        <template slot-scope="scope">
          <el-tag
            :key="tag.id"
            :type="tag.state === 0 ? 'danger' : 'success'"
            v-for="tag in scope.row.thursday"
            :closable="tag.state === 0"
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag.studentName}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="friday"
        label="星期五"
        align="center">
        <template slot-scope="scope">
          <el-tag
            :key="tag.id"
            :type="tag.state === 0 ? 'danger' : 'success'"
            v-for="tag in scope.row.friday"
            :closable="tag.state === 0"
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag.studentName}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="saturday"
        label="星期六"
        align="center">
        <template slot-scope="scope">
          <el-tag
            :key="tag.id"
            :type="tag.state === 0 ? 'danger' : 'success'"
            v-for="tag in scope.row.saturday"
            :closable="tag.state === 0"
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag.studentName}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="sunday"
        label="星期天"
        align="center">
        <template slot-scope="scope">
          <el-tag
            :key="tag.id"
            :type="tag.state === 0 ? 'danger' : 'success'"
            v-for="tag in scope.row.sunday"
            :closable="tag.state === 0"
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag.studentName}}
          </el-tag>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title=""
      :visible.sync="createAssignVisible"
      width="60%">
      <el-row type="flex" justify="center">
        <el-form ref="form" :model="assignments" label-width="80px">
          <el-form-item label="上课日期">
            <el-input v-model="assignments.scheduledDate" disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="星期">
            <el-input v-model="assignments.weekIndex" disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="时间段">
            <el-input v-model="assignments.scheduledTime" disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="添加学生">
            <el-select v-model="assignments.assigns" placeholder="请选择">
              <el-option
                v-for="item in subjects"
                :key="item.id"
                :label="item.student_name"
                :value="item">
                <span style="float: left">{{ item.student_name }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">
                  {{ item.type }}:剩余{{ item.available_hours }}
                </span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="createAssignments">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import Vue from 'vue'

  export default {
    name: 'Schedule',

    created() {
      Vue.http.get('/api/subject')
        .then(resp => {
          if (resp.body.status && resp.body.status === 'FAILED') {
            this.$message.error(resp.body.message)
          } else {
            this.subjects = resp.body
          }
        })
        .catch(msg => this.$message.error(msg.data))
    },

    computed: {},

    methods: {
      onQuery() {
        let start = new Date(this.date);
        start.setDate(start.getDate() + 1);

        let end = new Date(this.date);
        end.setDate(end.getDate() + 7);

        this.queryAssignments(start.toISOString().substr(0, 10), end.toISOString().substr(0, 10));
      },

      queryAssignments(start, end) {
        Vue.http.get('/api/assignment?start=' + start + '&end=' + end)
          .then(resp => {
            if (resp.body.status && resp.body.status === 'FAILED') {
              this.$message.error(resp.body.message)
            } else {
              this.tableData = resp.body
            }
          })
          .catch(msg => this.$message.error(msg.data))
      },

      cellClassName({row, column, rowIndex, columnIndex}) {
        return 'YXCUSTOMIZATION:' + rowIndex + ':' + columnIndex;
      },

      cellDoubleClick(row, column, cell, event) {
        let index = cell.className.indexOf('YXCUSTOMIZATION:') + 'YXCUSTOMIZATION:'.length;
        let array = cell.className.substr(index, 3).split(':');

        let x = Number(array[1]);
        let y = Number(array[0]) + 1;
        let scheduledDate = new Date(this.date);
        scheduledDate.setDate(scheduledDate.getDate() + x);

        this.assignments = {
          scheduledDate: scheduledDate.toISOString().substr(0, 10),
          weekIndex: x,
          scheduledTime: this.indexMethod(y - 1),
          x: x,
          y: y,
          assigns: []
        };
        if (y > 5) {
          this.$message.success('亲爱的，此时间该休息了，不要点啦！')
        } else {
          this.createAssignVisible = true;
        }
      },

      createAssignments() {
        debugger
        assignments.assigns.forEach((v, _) => {
          Vue.http.post('/api/assignment', {
            subjectId: v.id,
            studentId: v.student_id,
            scheduledTime: assignments.scheduledDate,
            positionX: assignments.x,
            positionY: assignments.y
          })
            .then(resp => {
              if (resp.body.status && resp.body.status === 'FAILED') {
                this.$message.error(resp.body.message)
              } else {
                //this.tableData = resp.body
                this.assignments = {};
                this.createAssignVisible = false;
              }
            })
            .catch(msg => this.$message.error(msg.data))
        });
      },

      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },

      indexMethod(index) {
        switch (index) {
          case 0:
            return '8:00-10:00';
          case 1:
            return '10:00-12:00';
          case 2:
            return '13:00-15:00';
          case 3:
            return '15:00-17:00';
          case 4:
            return '17:00-19:00';
          case 5:
            return '19:00-21:00';
          default:
            return '21:00-23:00'
        }
      }
    },

    data() {
      return {
        date: '',
        createAssignVisible: false,
        assignments: {},
        subjects: [],
        tableData: []
      }
    }
  }
</script>

<style scoped>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .el-row {
    width: 100%;
  }
</style>
