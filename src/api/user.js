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