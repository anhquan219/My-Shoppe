import axios, { type AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios'
import { toast } from 'react-toastify'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import { AuthResponse, RefreshTokenReponse } from 'src/types/auth.types'
import {
  clearLS,
  getAccessTokenFromLS,
  getRefreshTokenFromLS,
  setAcessTokenToLS,
  setProfileFromLS,
  setRefreshTokenToLS
} from './auth'
import config from 'src/constants/config'
import { URL_LOGIN, URL_LOGOUT, URL_REFRESH_TOKEN, URL_REGISTER } from 'src/api/auth.api'
import { isAxiosExpiredTokenError, isAxiosUnauthorizedError } from './utils'
import { ErrorResponseApi } from 'src/types/utils.type'

class Http {
  instance: AxiosInstance
  // Sử dụng để lưu accessToken vào RAM tăng tốc độ khi không phải gọi localSotre liên tục
  private accessToken: string
  private refreshToken: string
  private refreshTokenRequest: Promise<string> | null // Check xem có bị gọi refreshToken 2 lần không
  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.refreshToken = getRefreshTokenFromLS()
    this.refreshTokenRequest = null

    // Khai báo biến khởi tạo axios
    this.instance = axios.create({
      baseURL: config.baseUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'expire-access-token': 60 * 60 * 24, // 1 ngày
        'expire-refresh-token': 60 * 60 * 24 * 160 // 160 ngày
      }
    })
    //Mỗi khi 1 request gửi đi sẽ gửi kèm các phần config bên dưới (Chạy trước khi 1 request được gửi)
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          //Truyền accessToken vào header
          config.headers.authorization = this.accessToken
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    // Chạy sau  khi 1 response trả về
    this.instance.interceptors.response.use(
      // Sử dụng arrow func để có thể lấy this từ bên ngoài
      (response) => {
        // Lưu accessToken vào localStore
        const { url } = response.config
        if (url === URL_LOGIN || url === URL_REGISTER) {
          const data = response.data as AuthResponse
          this.accessToken = data.data.access_token
          this.refreshToken = data.data.refresh_token
          setRefreshTokenToLS(this.refreshToken)
          setAcessTokenToLS(this.accessToken)
          setProfileFromLS(data.data.user)
        } else if (url === URL_LOGOUT) {
          this.accessToken = ''
          this.refreshToken = ''
          clearLS()
        }

        return response
      },
      //Xử lý lỗi
      (error: AxiosError) => {
        // Chỉ toast lỗi không phải 422 và 401
        if (
          ![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(error.response?.status as number)
        ) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          const message = data?.message || error.message
          toast.error(message)
        }

        // Xử lý lỗi 401
        // Lỗi Unauthorized (401) có nhiều TH
        // - Token không đúng
        // - Không truyền token
        // - Token hết hạn*
        if (isAxiosUnauthorizedError<ErrorResponseApi<{ name: string; message: string }>>(error)) {
          const config = error.response?.config || ({ headers: {} } as InternalAxiosRequestConfig)
          const { url } = config
          // TH Token hết hạn và request đó không phải là của request refresh token
          if (isAxiosExpiredTokenError(error) && url !== URL_REFRESH_TOKEN) {
            // Han chế gọi 2 lần RefreshToken
            // Lúc này this.refreshTokenRequest = null nên sẽ được gán thành hàm this.handleRefreshToken()
            this.refreshTokenRequest = this.refreshTokenRequest
              ? this.refreshTokenRequest
              : this.handleRefreshToken().finally(() => {
                  // Chờ cho .then() bên dưới chạy xong (Chỉ chạy khi hàm được gọi và finally())
                  // Tiếp tục chờ 10s rồi mới gán lại null
                  setTimeout(() => {
                    this.refreshTokenRequest = null
                  }, 10000)
                })
            // Lúc này this.refreshTokenRequest = this.handleRefreshToken()
            // bên dưới sẽ gọi hàm this.refreshTokenRequest, sau khi chạy xong .then() thì .finally() mới chạy gán this.refreshTokenRequest = null
            return this.refreshTokenRequest.then((access_token) => {
              // Phần này tiếp tục gọi lại request cũ vừa bị lôi với access_token mới
              return this.instance({ ...config, headers: { ...config.headers, authorization: access_token } })
            })
          }

          // Còn những trường hợp như token không đúng
          // không truyền token,
          // token hết hạn nhưng gọi refresh token bị fail
          // thì tiến hành xóa local storage và toast message
          clearLS()
          this.accessToken = ''
          this.refreshToken = ''
          toast.error(error.response?.data.data?.message || error.response?.data.message)
        }
        return Promise.reject(error)
      }
    )
  }

  private handleRefreshToken() {
    return this.instance
      .post<RefreshTokenReponse>(URL_REFRESH_TOKEN, {
        refresh_token: this.refreshToken
      })
      .then((res) => {
        const { access_token } = res.data.data
        setAcessTokenToLS(access_token)
        this.accessToken = access_token
        return access_token
      })
      .catch((error) => {
        this.accessToken = ''
        this.refreshToken = ''
        clearLS()
        throw error
      })
  }
}

const http = new Http().instance
export default http
