<template>
  <div>
    <el-row type="flex" class="row-bg">
      <el-date-picker
        v-model="date"
        type="week"
        format="yyyy-MM-dd"
        placeholder="选择周">
      </el-date-picker>
      <span style="margin-left: 5px"></span>
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
        width="100">
      </el-table-column>
      <el-table-column
        prop="monday"
        :label="getTitle(1)"
        align="center">
        <template slot-scope="scope">
          <el-tag
            :key="tag.id"
            :type="tag.status === 0 ? 'danger' : 'success'"
            v-for="tag in scope.row.monday"
            :closable="tag.status === 0"
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag.studentName}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="tuesday"
        :label="getTitle(2)"
        align="center">
        <template slot-scope="scope">
          <el-tag
            :key="tag.id"
            :type="tag.status === 0 ? 'danger' : 'success'"
            v-for="tag in scope.row.tuesday"
            :closable="tag.status === 0"
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag.studentName}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="wednesday"
        :label="getTitle(3)"
        align="center">
        <template slot-scope="scope">
          <el-tag
            :key="tag.id"
            :type="tag.status === 0 ? 'danger' : 'success'"
            v-for="tag in scope.row.wednesday"
            :closable="tag.status === 0"
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag.studentName}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="thursday"
        :label="getTitle(4)"
        align="center">
        <template slot-scope="scope">
          <el-tag
            :key="tag.id"
            :type="tag.status === 0 ? 'danger' : 'success'"
            v-for="tag in scope.row.thursday"
            :closable="tag.status === 0"
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag.studentName}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="friday"
        :label="getTitle(5)"
        align="center">
        <template slot-scope="scope">
          <el-tag
            :key="tag.id"
            :type="tag.status === 0 ? 'danger' : 'success'"
            v-for="tag in scope.row.friday"
            :closable="tag.status === 0"
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag.studentName}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="saturday"
        :label="getTitle(6)"
        align="center">
        <template slot-scope="scope">
          <el-tag
            :key="tag.id"
            :type="tag.status === 0 ? 'danger' : 'success'"
            v-for="tag in scope.row.saturday"
            :closable="tag.status === 0"
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag.studentName}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="sunday"
        :label="getTitle(7)"
        align="center">
        <template slot-scope="scope">
          <el-tag
            :key="tag.id"
            :type="tag.status === 0 ? 'danger' : 'success'"
            v-for="tag in scope.row.sunday"
            :closable="tag.status === 0"
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag.studentName}}
          </el-tag>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="安排课时"
      :visible.sync="createAssignVisible"
      width="80%">
      <el-row type="flex" justify="center">
        <el-col :xs="24" :sm="22" :md="20" :lg="18" :xl="14">
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
            <el-form-item label="添加学生" required="true">
              <el-select v-model="assignments.assigns" multiple placeholder="请选择">
                <el-option
                  v-for="item in subjects"
                  :disabled="item.available_hours===0"
                  :key="item.id"
                  :label="item.student_name+':'+item.type"
                  :value="item.id+':'+item.student_id">
                  <span style="float: left">{{ item.student_name }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">
                  {{ item.type }}:剩余{{ item.available_hours }}
                </span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="createAssignments">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title=""
      :visible.sync="operateAssignVisible"
      width="50%">
      <el-button type="success" round @click="onConfirm()">
        已上课
      </el-button>
      <el-button type="danger" round @click="onDelete()">
        删除
      </el-button>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="operateAssignVisible = false">确 定</el-button>
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
      getTitle(index) {
        let weekDate = '';
        if (this.date !== '' && this.date !== null) {
          let start = new Date(this.date);
          start.setDate(start.getDate() + index);
          weekDate = start.toISOString().substr(5, 5);
        }

        switch (index) {
          case 1:
            return '星期一' + (weekDate !== '' ? '(' + weekDate + ')' : '');
          case 2:
            return '星期二' + (weekDate !== '' ? '(' + weekDate + ')' : '');
          case 3:
            return '星期三' + (weekDate !== '' ? '(' + weekDate + ')' : '');
          case 4:
            return '星期四' + (weekDate !== '' ? '(' + weekDate + ')' : '');
          case 5:
            return '星期五' + (weekDate !== '' ? '(' + weekDate + ')' : '');
          case 6:
            return '星期六' + (weekDate !== '' ? '(' + weekDate + ')' : '');
          case 7:
          default:
            return '星期日' + (weekDate !== '' ? '(' + weekDate + ')' : '');
        }
      },

      onQuery() {
        let start = new Date(this.date)
        start.setDate(start.getDate() + 1)

        let end = new Date(this.date)
        end.setDate(end.getDate() + 7)

        this.queryAssignments(start.toISOString().substr(0, 10), end.toISOString().substr(0, 10))
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
        return 'YXCUSTOMIZATION:' + rowIndex + ':' + columnIndex
      },

      cellDoubleClick(row, column, cell, event) {
        let index = cell.className.indexOf('YXCUSTOMIZATION:') + 'YXCUSTOMIZATION:'.length
        let array = cell.className.substr(index, 3).split(':')

        let x = Number(array[1])
        let y = Number(array[0]) + 1
        let scheduledDate = new Date(this.date)
        scheduledDate.setDate(scheduledDate.getDate() + x)

        this.assignments = {
          scheduledDate: scheduledDate.toISOString().substr(0, 10),
          weekIndex: x,
          scheduledTime: this.indexMethod(y - 1),
          x: x,
          y: y,
          assigns: []
        }
        if (y > 5) {
          this.$message.success('亲爱的，此时间该休息了，不要点啦！')
        } else {
          this.createAssignVisible = true
        }
      },

      createAssignments() {
        if (this.assignments.assigns.length) {
          this.assignments.assigns.forEach((v, _) => {
            Vue.http.post('/api/assignment', {
              subjectId: v.split(':')[0],
              studentId: v.split(':')[1],
              scheduledTime: this.assignments.scheduledDate,
              positionX: this.assignments.x,
              positionY: this.assignments.y
            })
              .then(resp => {
                if (resp.body.status && resp.body.status === 'FAILED') {
                  this.$message.error(resp.body.message)
                } else {
                  this.$message.success(resp.body.message || '操作成功！')
                  this.createAssignVisible = false
                  this.onQuery()
                }
              })
              .catch(msg => this.$message.error(msg.data))
          })
        } else {
          this.$message.error('请选择学生！')
        }
      },

      handleClose(tag) {
        this.assignId = tag.id;
        this.operateAssignVisible = true;
      },

      onConfirm() {
        Vue.http.post('/api/assignment/' + this.assignId)
          .then(resp => {
            if (resp.body.status && resp.body.status === 'FAILED') {
              this.$message.error(resp.body.message)
            } else {
              this.operateAssignVisible = false;
              this.onQuery()
            }
          })
          .catch(msg => this.$message.error(msg.data))
      },

      onDelete() {
        Vue.http.delete('/api/assignment/' + this.assignId)
          .then(resp => {
            if (resp.body.status && resp.body.status === 'FAILED') {
              this.$message.error(resp.body.message)
            } else {
              this.$message.success(resp.body.message || '操作成功！');
              this.operateAssignVisible = false;
              this.onQuery()
            }
          })
          .catch(msg => this.$message.error(msg.data))
      },

      indexMethod(index) {
        switch (index) {
          case 0:
            return '8:00-10:00'
          case 1:
            return '10:00-12:00'
          case 2:
            return '13:00-15:00'
          case 3:
            return '15:00-17:00'
          case 4:
            return '17:00-19:00'
          case 5:
            return '19:00-21:00'
          default:
            return '21:00-23:00'
        }
      }
    },

    data() {
      return {
        date: '',
        createAssignVisible: false,
        operateAssignVisible: false,
        assignId: null,
        assignments: {},
        subjects: [],
        tableData: [{
          monday: [],
          tuesday: [],
          wednesday: [],
          thursday: [],
          friday: [],
          saturday: [],
          sunday: []
        },{
          monday: [],
          tuesday: [],
          wednesday: [],
          thursday: [],
          friday: [],
          saturday: [],
          sunday: []
        },{
          monday: [],
          tuesday: [],
          wednesday: [],
          thursday: [],
          friday: [],
          saturday: [],
          sunday: []
        },{
          monday: [],
          tuesday: [],
          wednesday: [],
          thursday: [],
          friday: [],
          saturday: [],
          sunday: []
        },{
          monday: [],
          tuesday: [],
          wednesday: [],
          thursday: [],
          friday: [],
          saturday: [],
          sunday: []
        },{
          monday: [],
          tuesday: [],
          wednesday: [],
          thursday: [],
          friday: [],
          saturday: [],
          sunday: []
        }]
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

  .el-date-picker {
    width: 100%;
  }

  .el-select {
    width: 100%;
  }

  .el-table-column {
    width: auto;
    min-width: 100px;
  }
</style>
