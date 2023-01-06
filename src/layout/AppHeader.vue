<template>
  <div class="app-header">
    <i class="el-icon-s-fold" @click="toggleCollapse"></i>

    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar shape="square" :size="40" :src="userInfo.headUrl"></el-avatar>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>{{userInfo.name}}</el-dropdown-item>
        <el-dropdown-item>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import { getUserInfo } from '@/api/user'
export default {
  data () {
    return {
      userInfo: {}
    }
  },
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    },
    toggleCollapse: {
      type: Function,
      required: true
    }
  },
  created () {
    getUserInfo().then((res) => {
      console.log(res)
      this.userInfo = res.data.data
    })
  }
}
</script>
<style scoped lang='scss'>
.app-header {
  display: flex;
  align-items: center;
  height: 100%;
  .el-breadcrumb {
    margin-left: 10px;
  }
  .el-dropdown {
    margin-left: auto;
    .el-dropdown-link {
      display: flex;
      align-items: center;
    }
  }
}
</style>
