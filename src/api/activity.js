import request from '@/utils/request'
import qs from 'qs'

// 活动列表
export const getActivityPage = (data = {}) => {
  return request({
    method: 'POST',
    url: '/activity/queryPage',
    data: qs.stringify(data)
  })
}

// 删除活动
export const deleteActivityById = (id) => {
  return request({
    method: 'DELETE',
    url: '/activity/delete?id='+id
  })
}

// 获取单个活动
export const readActivityById = (id) => {
  return request({
    method: 'GET',
    url: '/activity/read?id='+id
  })
}

// 编辑单个活动
export const updateActivityById = (data) => {
  return request({
    method: 'POST',
    url: '/activity/update',
    data
  })
}

// 新增活动
export const insertActivity = (data) => {
  return request({
    method: 'POST',
    url: '/activity/save',
    data
  })
}