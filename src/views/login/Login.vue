<template>
  <div class="login">
    <el-form
      ref="loginForm"
      :model="formData"
      label-position="top"
      label-width="80px"
      :rules="myRoles"
    >
      <h2>登录</h2>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="密  码" prop="password">
        <el-input type="password" v-model="formData.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :loading="isLoading">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { login } from '@/api/user'
export default {
  data () {
    return {
      // 表单数据
      formData: {
        username: 'admin',
        password: 'admin'
      },
      myRoles: {
        username: [
          {
            required: true,
            message: '用户名必填',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
          }
        ]
      },
      // 是否请求中
      isLoading: false
    }
  },
  components: {},
  mounted () {},
  methods: {
    onSubmit () {
      this.isLoading = true
      this.$refs.loginForm
        .validate()
        .then(() => {
          return login(this.formData)
        })
        .then((res) => {
          console.log(res.data.data.token);
          const { data } = res
          if(data.success) {
            this.$message.success(data.message)
            this.$store.commit('saveTokenInfo',data.data)
            this.$router.push(this.$route.query.redirect || '/')           
          }else {
            this.$message.error(data.message)
          }
        })
        .catch(() => {
          this.$message.error('验证失败')
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  }
}
</script>
<style scoped lang='scss'>
.login {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
}
.el-form {
  width: 400px;
  padding: 30px;
  border-radius: 10px;
  background: #fff;
}
</style>
