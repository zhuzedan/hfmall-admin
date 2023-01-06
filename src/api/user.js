import request from '@/utils/request'
import store from '@/store/index'

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
    url: '/systemuser/info',
    headers: {
      Authorization: store.state.tokenInfo?.tokenHead+' '+store.state.tokenInfo?.token
    }
  })
}