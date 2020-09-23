import axios from 'axios'
import { BASE_URL } from '@/config'

// create an axios instance
const service = axios.create({
  baseURL: BASE_URL,
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
})

// 拦截请求
service.interceptors.request.use(
  config => {
    // const token = getToken()
    // if (token) {
    //   config.headers.common['Authorization'] = token
    // }
    return config
  },
  error => {
    alert('bed request')
    Promise.reject(error)
  }
)

// 拦截响应
service.interceptors.response.use(
  response => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response.data
  },
  err => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
      if (err.response) {
        const { status, data } = err.response
        switch (status) {
          case 401:
            alert((data && data.message) || '登录信息过期或未授权，请重新登录！')
            break

          default:
            alert(data.message || `连接错误 ${status}！`)
            break
        }
      } else {
        alert(err.message)
      }

    return Promise.reject(err)
  }
)

export default service
