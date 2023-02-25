import request from '@/utils/request'
import qs from 'qs'

// 分页查询订单
export const getOrderPage = (data = {}) => {
  return request({
    method: 'POST',
    url: '/order/queryPage',
    data: qs.stringify(data)
  })
}

// 删除单个轮播图
export const deleteOrderById = (id) => {
  return request({
    method: 'DELETE',
    url: '/order/delete?id='+id
  })
}