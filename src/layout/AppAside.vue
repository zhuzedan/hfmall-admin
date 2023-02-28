<template>
  <div>
    <el-menu router unique-opened :collapse="isCollapse">
      <a href="/" class="logo">
        <img src="@/assets/logo.png" alt="" />
        <h1 v-if="!isCollapse">汉服后台管理系统</h1>
      </a>
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>系统管理</template>
        <el-menu-item index="/roles">角色管理</el-menu-item>
        <el-menu-item index="/users">用户管理</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-setting"></i>商品管理</template>
        <el-menu-item index="/products">商品列表</el-menu-item>
        <el-menu-item index="/category">商品分类</el-menu-item>
        <el-menu-item index="/swiper">轮播图列表</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title"><i class="el-icon-s-claim"></i>订单管理</template>
        <el-menu-item index="/orders">订单列表</el-menu-item>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title"><i class="el-icon-share"></i>汉服相关</template>
        <el-menu-item index="/activity">汉服活动</el-menu-item>
        <el-menu-item index="/news">汉服头条</el-menu-item>
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
