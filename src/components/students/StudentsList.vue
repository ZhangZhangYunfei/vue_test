<template>
  <div>
    <el-table
      :data="students"
      stripe
      border
      style="width: 100%">
      <el-table-column prop="name" label="姓名" width="150" align="center">
      </el-table-column>

      <el-table-column prop="school" label="学校" width="200" align="center">
      </el-table-column>

      <el-table-column prop="degree" label="年级" width="120" align="center">
      </el-table-column>

      <el-table-column prop="telephone" label="电话号码" width="160" align="center">
      </el-table-column>

      <el-table-column prop="address" label="地址" align="center">
      </el-table-column>

      <el-table-column
        fixed="right"
        label="课时情况"
        align="center"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: 'StudentsList',

    methods: {
      handleClick(row) {
        let vm = this;
        vm.$emit('secected_studemt', row)
      }
    },

    data() {
      return {
        students: [{
          name: '王小虎',
          school: '香山中学',
          degree: '高一',
          address: '上海市普陀区金沙江路 1518 弄',
          telephone: 13917043650
        }, {
          name: '王小',
          school: '香山中学',
          degree: '高一',
          address: '上海市普陀区金沙江路 1518 弄',
          telephone: 13917043650
        }, {
          name: '小虎',
          school: '香山中学',
          degree: '高一',
          address: '上海市普陀区金沙江路 1518 弄',
          telephone: 13917043650
        }, {
          name: '虎',
          school: '香山中学',
          degree: '高一',
          address: '上海市普陀区金沙江路 1518 弄',
          telephone: 13917043650
        }]
      }
    }
  }
</script>
