import request from '@/utils/request'
import qs from 'qs'

// 上传文件
export const upload = (data = {}) => {
  return request({
    method: 'POST',
    url: '/upload',
    data: qs.stringify(data)
  })
}