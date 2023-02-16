import request from '@/utils/request'
import qs from 'qs'

// 登录
export const login = (formData) => {
  return request({
    method: 'POST',
    url: '/systemuser/login',
    data: formData
  })
}

// 获取当前用户信息
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/systemuser/info'
  })
}

// 获取分页用户列表
export const getUserPage = (data = {}) => {
  return request({
    method: 'POST',
    url: '/systemUser/queryPage',
    data: qs.stringify(data)
  })
}

// 更改用户状态
export const updateStatus = (id,status) => {
  return request({
    method: 'GET',
    url: '/systemUser/updateStatus?id='+id+'&status='+status
  })
}

// 删除单个用户
export const deleteUserById = (id) => {
  return request({
    method: 'DELETE',
    url: '/systemUser/delete?id='+id
  })
}

// 获取单个用户
export const readUserById = (id) => {
  return request({
    method: 'GET',
    url: '/systemUser/read?id='+id
  })
}

// 编辑单个用户
export const updateUserById = (data) => {
  return request({
    method: 'POST',
    url: '/systemUser/update',
    data
  })
}
// 新增用户
export const insertUser = (data) => {
  return request({
    method: 'POST',
    url: '/systemUser/insert',
    data
  })
}
// 获取用户角色
export const toAssignUser = (userId) => {
  return request({
    method: 'GET',
    url: '/systemUser/toAssign',
    params: {
      userId
    }
  })
}
// 给用户分配角色
export const doAssignUser = (data = {}) => {
  return request({
    method: 'POST',
    url: '/systemUser/doAssign',
    data
  })
}
