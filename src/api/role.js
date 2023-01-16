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