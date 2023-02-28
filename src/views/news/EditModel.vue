<template>
  <el-dialog :title="currentTitle" :visible.sync="dialogFormVisible">
    <el-form :model="formData" v-loading="isLoading">
      <el-form-item label="新闻名称" :label-width="formLabelWidth">
        <el-input v-model="formData.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="新闻内容" :label-width="formLabelWidth">
        <el-input type="textarea" v-model="formData.content" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="新闻图片" :label-width="formLabelWidth">
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
import { readNewsById,updateNewsById,insertNews } from '@/api/news.js'
export default {
  name: 'EditModel',
  data () {
    return {
      dialogImageUrl: '',
        dialogVisible: false,
      isCreate: true,
      dialogFormVisible: false,
      formData: {
        title: '',
        content: '',
        image: '',
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
      return this.isCreate ? '添加新闻' : '编辑新闻'
    }
  },
  methods: {
    handleImgSuccess(response, file, fileList) {
      console.log('成功',response.data)
      console.log(response.data.slice(28))
      this.formData.image = response.data.slice(27)
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
        readNewsById(roleId).then((res) => {
          if(res.data.code == 200) {
            console.log(res.data)
            const {id,title,content,image} = res.data.data
            this.formData = {id,title,content,image}
          }
        }).finally(() => {
          this.isLoading = false
        })
      }
    },
    onSubmit() {
      if(this.isCreate) {
        insertNews(this.formData).then((res) => {
          if(res.data.code == 200) {
            this.$message.success('新增成功')
            this.dialogFormVisible = false
            this.$emit('role-change')
          }else {
            this.$message.error('新增失败')
          }
        })
      }else {
        updateNewsById(this.formData).then((res) => {
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
