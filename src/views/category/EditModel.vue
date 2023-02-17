<template>
  <el-dialog :title="currentTitle" :visible.sync="dialogFormVisible">
    <el-form :model="formData" v-loading="isLoading">
      <el-form-item label="商品名称" :label-width="formLabelWidth">
        <el-input v-model="formData.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="商品价格" :label-width="formLabelWidth">
        <el-input v-model="formData.price" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="商品库存" :label-width="formLabelWidth">
        <el-input v-model="formData.stock" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="商品描述" :label-width="formLabelWidth">
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
import { readProductById,updateProductById,insertProduct } from '@/api/product.js'
export default {
  name: 'EditModel',
  data () {
    return {
      isCreate: true,
      dialogFormVisible: false,
      formData: {
        name: '',
        price: '',
        stock: '',
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
      return this.isCreate ? '添加商品' : '编辑商品'
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
        readProductById(roleId).then((res) => {
          if(res.data.code == 200) {
            console.log(res.data)
            const {id,name,price,stock,description} = res.data.data
            this.formData = {id,name,price,stock,description}
          }
        }).finally(() => {
          this.isLoading = false
        })
      }
    },
    onSubmit() {
      if(this.isCreate) {
        insertProduct(this.formData).then((res) => {
          if(res.data.code == 200) {
            this.$message.success('新增成功')
            this.dialogFormVisible = false
            this.$emit('role-change')
          }else {
            this.$message.error('新增失败')
          }
        })
      }else {
        updateProductById(this.formData).then((res) => {
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
