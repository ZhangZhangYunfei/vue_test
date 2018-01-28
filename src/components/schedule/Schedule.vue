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
      <!--<el-col :span="2" align="left">-->
        <!--<i class="el-icon-time"></i>-->
        <!--<span style="margin-left: 10px">{{start}}</span>-->
      <!--</el-col>-->
      <!--<el-col :span="2" align="left">-->
        <!--<i class="el-icon-time"></i>-->
        <!--<span style="margin-left: 10px">{{end}}</span>-->
      <!--</el-col>-->
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-row>
    <el-table
      :data="tableData"
      border
      stripe
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
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag.studentName}}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm">
          </el-input>
          <el-button v-else class="button-new-tag" size="small" type="text" @click="showInput">+
          </el-button>
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
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag.studentName}}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm">
          </el-input>
          <el-button v-else class="button-new-tag" size="small" type="text" @click="showInput">+
          </el-button>
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
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag.studentName}}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm">
          </el-input>
          <el-button v-else class="button-new-tag" size="small" type="text" @click="showInput">+
          </el-button>
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
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag.studentName}}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm">
          </el-input>
          <el-button v-else class="button-new-tag" size="small" type="text" @click="showInput">+
          </el-button>
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
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag.studentName}}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm">
          </el-input>
          <el-button v-else class="button-new-tag" size="small" type="text" @click="showInput">+
          </el-button>
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
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag.studentName}}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm">
          </el-input>
          <el-button v-else class="button-new-tag" size="small" type="text" @click="showInput">+</el-button>
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
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag.studentName}}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm">
          </el-input>
          <el-button v-else class="button-new-tag" size="small" type="text" @click="showInput">+</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import Vue from 'vue'

  export default {
    name: 'Schedule',

    created() {
      // this.query();
    },

    computed: {
      // start() {
      //   return this.date && this.date.length >= 10 ? '201800029938388383838383'.substr(0, 10) :  '';
      // },
      // end() {
      //   return this.date && this.date.length >= 10 ? '201800029938388383838383'.substr(0, 10) :  '';
      // }
    },

    methods: {
      onSubmit() {
        this.query('2018-01-15', '2018-01-15');
      },

      query(start, end) {
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

      handleClick(row) {
        console.log(row);
      },

      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
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
            return '要钱不要命？'
        }
      }
    },

    data() {
      return {
        date: '',
        inputVisible: false,
        inputValue: '',
        tableData: []
      }
    }
  }
</script>
