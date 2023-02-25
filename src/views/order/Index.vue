<template>
  <div>
    <el-card shadow="always">
      <el-table
        :data="queryResult.data"
        style="width: 100%"
        row-key="id"
        lazy
        :default-expand-all="false"
      >
        <el-table-column prop="id" label="编号" width="80" />
        <el-table-column prop="orderId" label="商品名称" width="200" />
        <el-table-column prop="receiverPhone" label="联系电话" width="200" />
        <el-table-column prop="totalPrice" label="价格" width="200" />
        <el-table-column prop="receiverAddress" label="收货地址" width="200" />
        <el-table-column prop="receiverName" label="收货人" width="200" />
        <el-table-column prop="createTime" label="订单创建时间" width="200" />
        <el-table-column label="操作">
          <template v-slot="scope">
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
    </el-card>
  </div>
</template>
<script>
import { getOrderPage,deleteOrderById } from '@/api/order'
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
    // 删除某个订单
    handleDelete(id) {
      this.$confirm('确认要删除该订单吗','删除提示')
        .then(() => {
          deleteOrderById(id).then((res) => {
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
</style>
