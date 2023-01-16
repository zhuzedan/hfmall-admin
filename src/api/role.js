import request from '@/utils/request'
import qs from 'qs'

// 分页查询角色
export const getRolePage = (data = {}) => {
  return request({
    method: 'POST',
    url: '/systemRole/queryPage',
    data: qs.stringify(data)
  })
}
// 获取单个角色id
export const readRoleById = (id) => {
  return request({
    method: 'GET',
    url: '/systemRole/read?id='+id
  })
}
// 删除单个角色
export const deleteRoleById = (id) => {
  return request({
    method: 'DELETE',
    url: '/systemRole/delete?id='+id
  })
}
// 编辑单个角色
export const updateRoleById = (data) => {
  return request({
    method: 'POST',
    url: '/systemRole/update',
    data
  })
}
// 新增角色
export const insertRole = (data) => {
  return request({
    method: 'POST',
    url: '/systemRole/save',
    data
  })
}