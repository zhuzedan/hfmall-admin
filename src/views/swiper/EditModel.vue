<template>
  <el-dialog :title="currentTitle" :visible.sync="dialogFormVisible">
    <el-form :model="formData" v-loading="isLoading">
      <el-form-item label="名称" :label-width="formLabelWidth">
        <el-input v-model="formData.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="图片" :label-width="formLabelWidth">
        <el-input v-model="formData.pic" autocomplete="off"></el-input>
        <el-table-column label="图片" align="center">
          <template>
            <img
              width="80"
              height="80"
              :src="'http://localhost:8888/image' + formData.pic"
            />
          </template>
        </el-table-column>
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
  readSwiperById,
  insertSwiper,
  updateSwiperById,
} from '@/api/swiper.js'
export default {
  name: 'EditModel',
  data () {
    return {
      isCreate: true,
      dialogFormVisible: false,
      formData: {
        name: '',
        password: '',
        pic: '',
        id: undefined,
        userId: 0,
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
      return this.isCreate ? '添加轮播图' : '编辑轮播图'
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
        readSwiperById(userId)
          .then((res) => {
            if (res.data.code == 200) {
              const { id, name, pic } =
                res.data.data
              this.formData = {
                id,
                name,
                pic
              }
            }
          })
          .finally(() => {
            this.isLoading = false
          })
      }
    },
    onSubmit () {
      if (this.isCreate) {
        insertSwiper(this.formData).then((res) => {
          if (res.data.code == 200) {
            this.$message.success('新增成功')
            this.dialogFormVisible = false
            this.$emit('ok')
          } else {
            this.$message.error('新增失败')
          }
        })
      } else {
        updateSwiperById(this.formData).then((res) => {
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
