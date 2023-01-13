<template>
  <el-container>
    <el-aside width="auto" style="background-color: rgb(238, 241, 246)">
      <app-aside :isCollapse="isCollapse"></app-aside>
    </el-aside>

    <el-container>
      <el-header>
        <app-header :isCollapse="isCollapse" :toggleCollapse="toggleCollapse"></app-header>
      </el-header>

      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<style>
.el-container {
  height: 100vh;
}
.el-header {
  background-color: #ffffff;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>

<script>
import AppAside from './AppAside.vue'
import AppHeader from './AppHeader.vue'
export default {
  data () {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    }
    return {
      tableData: Array(20).fill(item),
      isCollapse: false
    }
  },
  components: {
    AppAside,
    AppHeader
  },
  methods: {
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>
