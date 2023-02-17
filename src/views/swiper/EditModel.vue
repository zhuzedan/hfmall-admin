<template>
  <el-dialog :title="currentTitle" :visible.sync="dialogFormVisible">
    <el-form :model="formData" v-loading="isLoading">
      <el-form-item label="用户名" :label-width="formLabelWidth">
        <el-input v-model="formData.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="昵称" :label-width="formLabelWidth">
        <el-input v-model="formData.nickname" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" :label-width="formLabelWidth">
        <el-input v-model="formData.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号" :label-width="formLabelWidth">
        <el-input v-model="formData.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="描述" :label-width="formLabelWidth">
        <el-input
          type="textarea"
          v-model="formData.description"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="分配角色" :label-width="formLabelWidth">
        <el-select
          v-model="formData.userRoleIds"
          multiple
          placeholder="请选择角色"
        >
          <el-option
            v-for="role in allRoles"
            :key="role.id"
            :label="role.roleName"
            :value="role.id"
            >{{ role.roleName }}</el-option
          >
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import {
  readUserById,
  updateUserById,
  insertUser,
  toAssignUser,
  doAssignUser
} from '@/api/user.js'
export default {
  name: 'EditModel',
  data () {
    return {
      isCreate: true,
      dialogFormVisible: false,
      formData: {
        username: '',
        password: '',
        nickname: '',
        email: '',
        phone: '',
        description: '',
        id: undefined,
        userId: 0,
        userRoleIds: []
      },
      allRoles: [],
      isLoading: false,
      formLabelWidth: '120px'
    }
  },
  components: {},
  mounted () {},
  computed: {
    currentTitle () {
      return this.isCreate ? '添加用户' : '编辑用户'
    }
  },
  methods: {
    showAndInit (userId) {
      this.formData.id = userId
      this.isCreate = !userId
      this.dialogFormVisible = true
      if (this.isCreate) {
        // 添加，把表单数据清空
        this.formData = {}
      } else {
        // 编辑，显示要编辑的信息
        this.isLoading = true
        readUserById(userId)
          .then((res) => {
            if (res.data.code == 200) {
              // console.log(res.data)
              const { id, username, nickname, email, phone, description } =
                res.data.data
              this.formData = {
                id,
                username,
                nickname,
                email,
                phone,
                description
              }
            }
          })
          .finally(() => {
            this.isLoading = false
          }),
        toAssignUser(userId).then((res) => {
          if (res.data.code == 200) {
            this.allRoles = res.data.data.allRoles
            this.formData.userRoleIds = res.data.data.userRoleIds
            this.userId = userId
          }
        })
      }
    },
    onSubmit () {
      if (this.isCreate) {
        insertUser(this.formData).then((res) => {
          if (res.data.code == 200) {
            this.$message.success('新增成功')
            this.dialogFormVisible = false
            this.$emit('ok')
          } else {
            this.$message.error('新增失败')
          }
        })
      } else {
        updateUserById(this.formData).then((res) => {
          if (res.data.code == 200) {
            this.$message.success('编辑成功')
            this.dialogFormVisible = false
            this.$emit('ok')
          } else {
            this.$message.error('编辑失败')
          }
        })
      }
    }
  }
}
</script>
<style scoped lang='scss'>
</style>
