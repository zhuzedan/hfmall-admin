import axios from 'axios'
import store from '@/store/index'

const request = axios.create({
  baseURL: 'http://localhost:8888/api'
})
// 请求拦截器
request.interceptors.request.use(function (config) {
  if(store.state.tokenInfo) {
    config.headers.Authorization = store.state.tokenInfo?.tokenHead + ' ' + store.state.tokenInfo?.token
  }
  return config
})

export default request
