<template>
  <el-dialog :title="currentTitle" :visible.sync="dialogFormVisible">
    <el-form :model="formData" v-loading="isLoading">
      <el-form-item label="活动名称" :label-width="formLabelWidth">
        <el-input v-model="formData.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="参与人数" :label-width="formLabelWidth">
        <el-input v-model="formData.num" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="粉丝数" :label-width="formLabelWidth">
        <el-input  v-model="formData.funs" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="图片" :label-width="formLabelWidth">
        <el-upload
          action="http://localhost:8888/api/upload"
          list-type="picture-card"
          :on-success="handleImgSuccess"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>    
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
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
import { readActivityById,updateActivityById,insertActivity } from '@/api/activity.js'
export default {
  name: 'EditModel',
  data () {
    return {
      dialogImageUrl: '',
        dialogVisible: false,
      isCreate: true,
      dialogFormVisible: false,
      formData: {
        name: '',
        num: '',
        funs: '',
        img: '',
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
    handleImgSuccess(response, file, fileList) {
      console.log('成功',response.data)
      console.log(response.data.slice(28))
      this.formData.img = response.data.slice(28)
    },
    handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
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
        readActivityById(roleId).then((res) => {
          if(res.data.code == 200) {
            console.log(res.data)
            const {id,name,num,funs,img} = res.data.data
            this.formData = {id,name,num,funs,img}
          }
        }).finally(() => {
          this.isLoading = false
        })
      }
    },
    onSubmit() {
      if(this.isCreate) {
        insertActivity(this.formData).then((res) => {
          if(res.data.code == 200) {
            this.$message.success('新增成功')
            this.dialogFormVisible = false
            this.$emit('role-change')
          }else {
            this.$message.error('新增失败')
          }
        })
      }else {
        updateActivityById(this.formData).then((res) => {
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
