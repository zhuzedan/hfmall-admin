import request from '@/utils/request'

// 查询分类
export const getSubCate = () => {
  return request({
    method: 'GET',
    url: '/category/queryAll',
  })
}