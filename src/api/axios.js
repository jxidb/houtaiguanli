import axios from 'axios'
// 导入请求进入条
import nprogress from 'nprogress'
// 引入进度条的样式   如果进度条没有显示，那可能就是没有引入样式
import 'nprogress/nprogress.css'

const requests = axios.create({
  //基础路径
  // 使用这个请求的时候，会在前面加上基础路径
  baseURL: '/api',
  //请求不能超过5S`
  timeout: 5000
})

// 请求拦截器
requests.interceptors.request.use((config) => {
  nprogress.start()
  return config
})

requests.interceptors.response.use(
  (res) => {
    // 在请求结束时，进度条结束
    nprogress.done()
    return res.data
  },
  (error) => {
    console.log(error)
    return Promise.reject(new Error(error))
  }
)

export default requests
