<template>
  <div>
    <el-card shadow="always">
      <el-table
        :data="queryResult.data"
        style="font-size: 10px; width: 100%"
        row-key="id"
        lazy
        :default-expand-all="false"
      >
        <el-table-column prop="id" label="编号" width="80" />
        <el-table-column prop="order_id" label="商品名称" width="200" />
        <el-table-column prop="user_id" label="商品图片" width="200" />
        <el-table-column prop="total_price" label="价格" width="200" />
        <el-table-column prop="receiver_address" label="收货地址" width="200" />
        <el-table-column prop="receiver_name" label="收货人" width="200" />
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
import { getOrderPage } from '@/api/order'
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
      getOrderPage(this.queryParams).then((res) => {
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
