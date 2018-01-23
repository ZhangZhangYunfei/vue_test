<template>
  <div>
    <el-row type="flex" class="row-bg" justify="start">
      <el-date-picker
        v-model="date"
        type="week"
        format="yyyy 第 WW 周"
        placeholder="选择周">
      </el-date-picker>
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
          {{tag.student}}
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
          {{tag.student}}
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
          {{tag.student}}
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
          {{tag.student}}
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
          {{tag.student}}
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
          {{tag.student}}
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
          {{tag.student}}
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
  export default {
    name: 'Schedule',

    methods: {
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
        switch(index) {
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
        tableData: [{
        monday: [{
          id: 1,
          teacher: '李应敏',
          student: '王晓',
          subject: '数学',
          date: '2017-12-12',
          state: 0
        },{
          id: 2,
          teacher: '李应敏',
          student: '王晓笑',
          subject: '数学',
          date: '2017-12-12',
          state: 0
        }],
        tuesday: [{
          id: 3,
          teacher: '李应敏',
          student: '王晓',
          subject: '数学',
          date: '2017-12-12',
          state: 1
        }],
        wednesday: [{
          id: 4,
          teacher: '李应敏',
          student: '王晓',
          subject: '数学',
          date: '2017-12-12',
          state: 0
        },{
          id: 5,
          teacher: '李应敏',
          student: '王晓笑',
          subject: '数学',
          date: '2017-12-12',
          state: 1
        }],
        thursday: [{
          id: 6,
          teacher: '李应敏',
          student: '王晓',
          subject: '数学',
          date: '2017-12-12',
          state: 1
        }],
        friday: [],
        saturday: [{
          id: 7,
          teacher: '李应敏',
          student: '王晓',
          subject: '数学',
          date: '2017-12-12',
          state: 1
        },{
          id: 8,
          teacher: '李应敏',
          student: '王晓笑',
          subject: '数学',
          date: '2017-12-12',
          state: 1
        }],
        sunday:[{
          id: 9,
          teacher: '李应敏',
          student: '王晓',
          subject: '数学',
          date: '2017-12-12',
          state: 0
        }]
      }, {
        monday: [{
          id: 10,
          teacher: '李应敏',
          student: '王晓',
          subject: '数学',
          date: '2017-12-12',
          state: 1
        },{
          id: 11,
          teacher: '李应敏',
          student: '王晓笑',
          subject: '数学',
          date: '2017-12-12',
          state: 1
        }],
        tuesday: [{
          id: 12,
          teacher: '李应敏',
          student: '王晓',
          subject: '数学',
          date: '2017-12-12',
          state: 0
        }],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [{
          id: 13,
          teacher: '李应敏',
          student: '王晓',
          subject: '数学',
          date: '2017-12-12',
          state: 0
        },{
          id: 14,
          teacher: '李应敏',
          student: '王晓笑',
          subject: '数学',
          date: '2017-12-12',
          state: 0
        }],
        sunday:[{
          id: 15,
          teacher: '李应敏',
          student: '王晓',
          subject: '数学',
          date: '2017-12-12',
          state: 1
        }]}
      ]
      }
    }
  }
</script>
