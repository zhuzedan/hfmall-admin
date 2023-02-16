<template>
  <div>
    <el-card shadow="always">
      <el-button style="margin-bottom:20px" type="success" icon="el-icon-plus" size="mini" @click="add()">添 加</el-button>
      <el-table
      :data="sysMenuList"
      row-key="id"
      lazy
      style="width: 100%"
      :default-expand-all="false"
      :tree-props="{children: 'children'}">

      <el-table-column prop="name" label="名称" width="160"/>
      <el-table-column label="图标" width="100">
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column prop="perms" label="权限标识"/>
      <el-table-column prop="path" label="路由地址"/>
      <el-table-column prop="component" label="组件路径"/>
      <el-table-column prop="sortValue" label="排序"/>
      <el-table-column label="状态" >
        <template>
          <el-switch
             disabled="true">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="160"/>
      <el-table-column label="操作" width="180" fixed="right">
        <template slot-scope="scope">
          <el-button type="success" v-if="scope.row.type !== 2" icon="el-icon-plus" size="mini" @click="add(scope.row)" title="添加下级节点"/>
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="edit(scope.row)" title="修改"/>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeDataById(scope.row.id)" title="删除" :disabled="scope.row.children.length > 0"/>
        </template>
      </el-table-column>
    </el-table>
    </el-card>
  </div>
</template>

<script>
import { getAllMenus } from '@/api/menu'
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
      getAllMenus().then((res) => {
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
