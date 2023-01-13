import request from '@/utils/request'
import qs from 'qs'

// 分页查询商品
export const getProductPage = (data = {}) => {
  return request({
    method: 'POST',
    url: '/product/queryProduct',
    data: qs.stringify(data)
  })
}