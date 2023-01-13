<template>
  <div>
    <el-card shadow="always">
      <el-button
        style="margin-bottom: 20px"
        type="success"
        icon="el-icon-plus"
        size="mini"
        @click="add()"
        >添加商品</el-button
      >
      <el-table
        :data="queryResult.data"
        style="font-size: 10px; width: 100%"
        row-key="id"
        lazy
        :default-expand-all="false"
      >
        <el-table-column prop="id" label="编号" width="80" />
        <el-table-column prop="name" label="商品名称" width="200" />
        <el-table-column prop="propic" label="商品图片" width="200" />
        <el-table-column prop="price" label="价格" width="200" />
        <el-table-column prop="ishot" label="是否热门" width="200" />
        <el-table-column prop="hotdatetime" label="创建时间" width="200" />
        <el-table-column label="操作" width="190">
          <template>
            <el-button size="mini">编辑</el-button>
            <el-button danger size="mini">删除</el-button>
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
    </el-card>
  </div>
</template>
<script>
import { getProductPage } from '@/api/product'
export default {
  data () {
    return {
      // 查询的条件
      queryParams: {
        pageNum: 1,
        pageSize: 10
      },
      // 查询的结果
      queryResult: {}
    }
  },
  components: {},
  mounted () {},
  created () {
    this.loadSources()
  },
  methods: {
    loadSources () {
      getProductPage(this.queryParams).then((res) => {
        if ((res.data.code = 200)) {
          const { pageNum, pageSize, totalCount, totalPage, data } =
            res.data.data
          Object.assign(this.queryParams, { pageNum, pageSize })
          this.queryResult = { totalCount, totalPage, data }
        } else {
          this.$message.error('获取资源失败')
        }
        console.log(res)
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
</style>
