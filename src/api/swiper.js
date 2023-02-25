import request from '@/utils/request'
import qs from 'qs'

// 分页查询轮播图
export const getSwiperPage = (data = {}) => {
  return request({
    method: 'POST',
    url: '/swiper/querySwiper',
    data: qs.stringify(data)
  })
}

// 删除单个轮播图
export const deleteSwiperById = (id) => {
  return request({
    method: 'DELETE',
    url: '/swiper/delete?id='+id
  })
}

// 获取单个轮播图
export const readSwiperById = (id) => {
  return request({
    method: 'GET',
    url: '/swiper/read?id='+id
  })
}

// 编辑单个轮播图
export const updateSwiperById = (data) => {
  return request({
    method: 'POST',
    url: '/update/update',
    data
  })
}
// 新增角色
export const insertSwiper = (data) => {
  return request({
    method: 'POST',
    url: '/swiper/save',
    data
  })
}