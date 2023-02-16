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
// 获取单个商品id
export const readProductById = (id) => {
  return request({
    method: 'GET',
    url: '/product/read?id='+id
  })
}
// 删除单个商品
export const deleteProductById = (id) => {
  return request({
    method: 'DELETE',
    url: '/product/delete?id='+id
  })
}
// 编辑单个角色
export const updateProductById = (data) => {
  return request({
    method: 'POST',
    url: '/product/update',
    data
  })
}
// 新增角色
export const insertProduct = (data) => {
  return request({
    method: 'POST',
    url: '/product/insert',
    data
  })
}