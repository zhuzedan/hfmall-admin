<template>
  <div>
    <el-card shadow="always">
      <el-button size="mini" type="success" icon="el-icon-plus" @click="handleDialog(0)">添加</el-button>
      <el-table
        :data="queryResult.data"
        v-loading="listLoading"
        row-key="id"
        lazy
        :default-expand-all="false"
      >
        <el-table-column prop="id" label="编号" width="100px" />
        <el-table-column prop="name" label="名称" />
        <el-table-column label="图片" align="center">
          <template slot-scope="scope">
            <img
              width="80"
              height="80"
              :src="'http://localhost:8888/image' + scope.row.pic"
            />
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间"/>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button type="primary" size="mini" @click="handleDialog(scope.row.id)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryParams.pageNum"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="queryParams.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="queryResult.totalCount"
      >
      </el-pagination>
      <edit-model ref="userDlg" @ok="loadSources"/>
    </el-card>
  </div>
</template>
<script>
import { getSwiperPage,deleteSwiperById } from '@/api/swiper'
import EditModel from './EditModel.vue'
export default {
  data () {
    return {
      // 是否显示加载
      listLoading: true,
      // 查询的条件
      queryParams: {
        pageNum: 1,
        pageSize: 10
      },
      // 查询的结果
      queryResult: {},
      // 定义头像默认值
      defaultFace: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      // 日期选择器
      dateArr: [],
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      }
    }
  },
  watch: {
    dateArr: {
      deep: true,
      handler (newVal) {
        const date_value = []
        for(var i = 0;i<newVal.length;i++) {
          const date = new Date(newVal[i])
          date_value[i] = date.getFullYear() +'-' +(date.getMonth() + 1) +'-' +date.getDate()
        }
        this.queryParams.startCreateTime = date_value[0],
        this.queryParams.endCreateTime = date_value[1]
      }
    }
  },
  components: {
    EditModel
  },
  mounted () {},
  created () {
    this.loadSources()
  },
  methods: {
    // 加载数据
    loadSources () {
      getSwiperPage(this.queryParams).then((res) => {
        if ((res.data.code = 200)) {
          this.listLoading = false
          const { pageNum, pageSize, totalCount, totalPage, data } =
            res.data.data
          Object.assign(this.queryParams, { pageNum, pageSize })
          this.queryResult = { totalCount, totalPage, data }
        } else {
          this.$message.error('获取资源失败')
        }
      })
    },
    // 重置按钮
    resetData() {
      this.queryParams.username = '',
      this.queryParams.phone = '',
      this.queryParams.startCreateTime = '',
      this.queryParams.endCreateTime = ''
      this.loadSources()
    },
    // 编辑、添加用户
    handleDialog(roleId) {
      this.$refs.userDlg.showAndInit(roleId)
    },
    // 删除某个用户
    handleDelete(id) {
      this.$confirm('确认要删除该轮播图吗','删除提示')
        .then(() => {
          deleteSwiperById(id).then((res) => {
            if(res.data.code == 200) {
              this.$message.success('删除成功')
              this.loadSources()
            }else {
              this.$message.error('删除失败')
            }
          })
        })
        .catch(() => {
          this.$message.info('取消删除该条')
        })
    },
    // 改变每页显示的记录数
    handleSizeChange (val) {
      this.queryParams.pageSize = val
      this.queryParams.pageNum = 1
      this.loadSources()
    },
    handleCurrentChange (val) {
      this.queryParams.pageNum = val
      this.loadSources()
    }
  }
}
</script>
<style scoped lang='scss'>
  .el-card {
    .el-table {
      padding-top: 20px;
      width: 100%
    }
  }
</style>
