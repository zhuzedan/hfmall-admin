<template>
  <div>
    <el-menu router unique-opened :collapse="isCollapse">
      <a href="/" class="logo">
        <img src="@/assets/logo.png" alt="" />
        <h1 v-if="!isCollapse">通用后台管理系统</h1>
      </a>
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>系统管理</template>
        <el-menu-item index="/menus">菜单管理</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-menu"></i>导航二</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-setting"></i>导航三</template>
        <el-menu-item index="3-1">选项1</el-menu-item>
        <el-menu-item index="3-2">选项2</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  components: {},
  mounted () {},
  methods: {},
}
</script>
<style scoped lang='scss'>
.logo {
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: black;
  img {
    width: 36px;
  }
}
.el-menu {
  height: 100vh;
  width: 200px;
}
.el-menu.el-menu--collapse {
  width: 64px;
}
</style>
