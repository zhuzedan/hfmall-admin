import request from '@/utils/request'

export const login = (formData) => {
  return request({
    method: 'POST',
    url: '/systemuser/login',
    data: formData
  })
}