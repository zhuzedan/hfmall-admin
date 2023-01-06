import request from '@/utils/request'

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