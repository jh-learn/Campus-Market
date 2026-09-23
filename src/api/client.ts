import axios, { AxiosError } from 'axios'

export const apiClient = axios.create({
    baseURL: '/api',
    timeout: 10000,
})

// 添加请求拦截器
apiClient.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

// 添加响应拦截器
apiClient.interceptors.response.use(
    //成功
    (res) => res,
    //失败
    (error: AxiosError<{ message?: string }>) => {
        const message = error.response?.data?.message ?? (error.response ? `请求失败 (${error.response.status})` : '网络异常')
        console.log('[API]', message)
        return Promise.reject(error)
        
    }
)

// 统一提取错误信息的工具
export function getErrorMessage(err: unknown): string {
  if (err instanceof AxiosError) {
    return err.response?.data?.message ?? err.message
  }
  if (err instanceof Error) return err.message
  return '未知错误'
}