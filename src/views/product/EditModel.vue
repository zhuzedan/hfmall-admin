<template>
  <el-dialog :title="currentTitle" :visible.sync="dialogFormVisible">
    <el-form :model="formData" v-loading="isLoading">
      <el-form-item label="角色名称" :label-width="formLabelWidth">
        <el-input v-model="formData.roleName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色编码" :label-width="formLabelWidth">
        <el-input v-model="formData.roleCode" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色描述" :label-width="formLabelWidth">
        <el-input type="textarea" v-model="formData.description" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button
      >
    </div>
  </el-dialog>
</template>
<script>
import { readRoleById,updateRoleById,insertRole } from '@/api/role.js'
export default {
  name: 'EditModel',
  data () {
    return {
      isCreate: true,
      dialogFormVisible: false,
      formData: {
        roleName: '',
        roleCode: '',
        description: '',
        id: undefined
      },
      isLoading: false,
      formLabelWidth: '120px'
    }
  },
  components: {},
  mounted () {},
  computed: {
    currentTitle() {
      return this.isCreate ? '添加角色' : '编辑角色'
    }
  },
  methods: {
    showAndInit(roleId) {
      this.formData.id = roleId
      this.isCreate = !roleId
      this.dialogFormVisible = true
      if(this.isCreate) {
        // 添加，把表单数据清空
        this.formData = {}
      }
      else {
        // 编辑，显示要编辑的信息
        this.isLoading = true
        readRoleById(roleId).then((res) => {
          if(res.data.code == 200) {
            console.log(res.data)
            const {id,roleName,roleCode,description} = res.data.data
            this.formData = {id,roleName,roleCode,description}
          }
        }).finally(() => {
          this.isLoading = false
        })
      }
    },
    onSubmit() {
      if(this.isCreate) {
        insertRole(this.formData).then((res) => {
          if(res.data.code == 200) {
            this.$message.success('新增成功')
            this.dialogFormVisible = false
            this.$emit('role-change')
          }else {
            this.$message.error('新增失败')
          }
        })
      }else {
        updateRoleById(this.formData).then((res) => {
          if(res.data.code == 200) {
            this.$message.success('编辑成功')
            this.dialogFormVisible = false
            this.$emit('role-change')
          }else {
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
