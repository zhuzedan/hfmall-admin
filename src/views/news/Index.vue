<template>
  <div>
    <el-card shadow="always">
      <el-row>
        <el-form :inline="true" :model="queryParams">
          <el-col :span="6">
            <el-form-item label="新闻名">
              <el-input
                v-model="queryParams.title"
                size="small"
                clearable
                placeholder="输入新闻名"
                style="width: 100%;"
              />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="创建时间">
              <el-date-picker
                v-model="dateArr"
                type="daterange"
                unlink-panels
                size="small"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                style="width:300px"
                :picker-options="pickerOptions"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <el-button type="primary" size="mini" @click="loadSources">搜索</el-button>
              <el-button type="primary" size="mini" @click="resetData">重置</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <el-button size="mini" type="success" icon="el-icon-plus" @click="handleDialog(0)">添加</el-button>
      <el-table
        :data="queryResult.data"
        v-loading="listLoading"
        row-key="id"
        lazy
        :default-expand-all="false"
      >
        <el-table-column prop="id" label="编号"  />
        <el-table-column prop="title" label="新闻名称" />
        <el-table-column prop="content" label="内容"  width="400px"/>
        <el-table-column label="图片" align="center">
          <template slot-scope="scope">
            <img
              width="80"
              height="80"
              :src="'http://localhost:8888/image' + scope.row.image"
            />
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间"  />
        <el-table-column label="操作" >
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
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryParams.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="queryResult.totalCount"
      >
      </el-pagination>
      <edit-model ref="roleDlg" @role-change="loadSources"/>
    </el-card>
  </div>
</template>
<script>
import { getNewsPage,deleteNewsById } from '@/api/news'
import EditModel from './EditModel.vue'
export default {
  data () {
    return {
      // 是否显示加载
      listLoading: true,
      // 查询的条件
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        title: '',
        startCreateTime: '',
        endCreateTime: ''
      },
      // 查询的结果
      queryResult: {},
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
      getNewsPage(this.queryParams).then((res) => {
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
      this.queryParams.title = '',
      this.queryParams.startCreateTime = '',
      this.queryParams.endCreateTime = ''
      this.loadSources()
    },
    // 编辑、添加角色
    handleDialog(roleId) {
      this.$refs.roleDlg.showAndInit(roleId)
    },
    // 删除某个角色
    handleDelete(id) {
      this.$confirm('确认要删除该新闻吗','删除提示')
        .then(() => {
          deleteNewsById(id).then((res) => {
            if(res.data.code == 200) {
              this.$message.success('删除新闻成功')
              this.loadSources()
            }else {
              this.$message.error('删除新闻失败')
            }
          })
        })
        .catch(() => {
          this.$message.info('取消删除该新闻')
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
