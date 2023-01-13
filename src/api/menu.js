import request from '@/utils/request'

// 获取菜单列表
export const getAllMenus = () => {
  return request({
    method: 'GET',
    url: '/menu/findNodes',
  })
}