import request from '@/utils/request'
import qs from 'qs'

// 新闻列表
export const getNewsPage = (data = {}) => {
  return request({
    method: 'POST',
    url: '/news/queryPage',
    data: qs.stringify(data)
  })
}

// 删除新闻
export const deleteNewsById = (id) => {
  return request({
    method: 'DELETE',
    url: '/news/delete?id='+id
  })
}

// 获取单个新闻
export const readNewsById = (id) => {
  return request({
    method: 'GET',
    url: '/news/read?id='+id
  })
}

// 编辑单个新闻
export const updateNewsById = (data) => {
  return request({
    method: 'POST',
    url: '/news/update',
    data
  })
}

// 新增新闻
export const insertNews = (data) => {
  return request({
    method: 'POST',
    url: '/news/save',
    data
  })
}