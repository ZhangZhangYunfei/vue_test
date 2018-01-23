<template>
  <el-container>
    <el-header style="text-align: center;">
      <el-row :span="24">
        <el-col :span="2">
          <el-switch
            v-model="isCollapse">
          </el-switch>
        </el-col>
        <el-col :span="20">
          <span>优学教育课程管理系统</span>
        </el-col>
        <el-col :span="1">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 5px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>修改密码</el-dropdown-item>
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
        <el-col :span="1">
          <span>李应敏</span>
        </el-col>
      </el-row>
    </el-header>

    <el-container>
      <el-aside style="background-color: rgb(238, 241, 246)"  width="auto">
        <el-menu :collapse="isCollapse" class="el-menu-vertical-demo">
          <el-menu-item index="1" @click="$router.push({path: '/home/schedule'})">
            <i class="el-icon-date"></i>
            <span slot="title">我的课表</span>
          </el-menu-item>
          <el-menu-item index="2" @click="$router.push({path: '/home/students'})">
            <i class="el-icon-view"></i>
            <span slot="title">我的学生</span>
          </el-menu-item>
          <el-menu-item index="3" @click="$router.push({path: '/home/subjects'})">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">新课录入</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 200px;
  }
  .el-header {
    background-color: #0B77E6;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
</style>

<script>

export default {
  name: 'Home',

  data() {
    return {
      isCollapse: false
    }
  }
}
</script>
