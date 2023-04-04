import axios, { type AxiosInstance, AxiosError } from 'axios'
import { toast } from 'react-toastify'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import path from 'src/constants/path'
import { AuthResponse } from 'src/types/auth.types'
import { clearLS, getAccessTokenFromLS, setAcessTokenToLS, setProfileFromLS } from './auth'

class Http {
  instance: AxiosInstance
  // Sử dụng để lưu accessToken vào RAM tăng tốc độ khi không phải gọi localSotre liên tục
  private accessToken: string
  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    // Truyền accessToken vào header
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.authorization = this.accessToken
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    // Xử lý lỗi
    this.instance.interceptors.response.use(
      // Sử dụng arrow func để có thể lấy this từ bên ngoài
      (response) => {
        // Lưu accessToken vào localStore
        const { url } = response.config
        if (url === path.login || url === path.register) {
          const data = response.data as AuthResponse
          this.accessToken = data.data.access_token
          setProfileFromLS(data.data.user)
          setAcessTokenToLS(this.accessToken)
        } else if (url === path.logout) {
          this.accessToken = ''
          clearLS()
        }

        return response
      },
      (error: AxiosError) => {
        // Check điều khiện khác lỗi 422
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          const message = data?.message || error.message
          toast.error(message)
        }
        // Hết hạn đăng nhập
        if (error.response?.status === HttpStatusCode.Unauthorized) {
          clearLS()
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance
export default http
