<template>
  <div>
    <el-card shadow="always">
      <el-table
      :data="sysMenuList"
      row-key="id"
      lazy
      style="width: 100%"
      :default-expand-all="false"
      >

      <el-table-column prop="name" label="名称" width="160"/>
      <el-table-column prop="remark" label="标识"/>
      <el-table-column prop="sort" label="排序"/>
      <el-table-column prop="createTime" label="创建时间" width="160"/>
      <el-table-column label="操作" width="180" fixed="right">
        <template slot-scope="scope">
          <el-button type="success" v-if="scope.row.type !== 2" icon="el-icon-plus" size="mini" @click="add(scope.row)" title="添加下级节点"/>
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="edit(scope.row)" title="修改"/>
        </template>
      </el-table-column>
    </el-table>
    </el-card>
  </div>
</template>

<script>
import { getSubCate } from '@/api/category'
const defaultForm = {
  id: '',
  parentId: '',
  name: '',
  type: 0,
  path: '',
  component: '',
  perms: '',
  icon: '',
  sortValue: 1,
  status: 1
}
export default {
  name: 'Index',
  data () {
    return {
      sysMenuList: [],
      expandKeys: [] // 需要自动展开的项
    }
  },
  created () {
    this.loadMenus()
  },
  methods: {
    loadMenus () {
      getSubCate().then((res) => {
        console.log(res)
        if (res.data.code == 200) {
          this.sysMenuList = res.data.data
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
