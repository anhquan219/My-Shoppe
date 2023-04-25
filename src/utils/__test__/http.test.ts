import { beforeEach, describe, expect, it } from 'vitest'
import { Http } from '../http'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import { setAcessTokenToLS, setRefreshTokenToLS } from '../auth'

// Không nên đụng đến thư mục apis
// Vì chúng ta test riêng file http thì chỉ "nên" dùng http thôi
// vì lỡ như thư mục apis có thay đổi gì đó
// thì cũng không ảnh hưởng gì đến file test này

const access_token_1s =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTZiZTNkNmQ3YzYyMDM0MDg1NjBiNSIsImVtYWlsIjoicXVhbjhAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyMy0wNC0yNVQxMzoxODo0Ny44MDBaIiwiaWF0IjoxNjgyNDI4NzI3LCJleHAiOjE2ODI0Mjg3Mjh9.m5lcZmRiWZM1Hlwoy5BCVMwvs2kTW3Wu-PaFOE3auO0'

const refresh_token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTZiZTNkNmQ3YzYyMDM0MDg1NjBiNSIsImVtYWlsIjoicXVhbjhAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyMy0wNC0yNVQxMzoxNzo1Ni4xMzFaIiwiaWF0IjoxNjgyNDI4Njc2LCJleHAiOjE2OTYyNTI2NzZ9.1o4olxn0UK1DFF2W6bEJkRO3qFYMn7CPxSnd0xK6uck'

describe('Test Http axios', () => {
  let http = new Http().instance // Khởi tạo biến lưu http (khởi tạo riêng không sử dụng chung vs http của web khi test)

  beforeEach(() => {
    localStorage.clear() // Clear để không ảnh hưởng đến các phần test khác
    http = new Http().instance // Gán lại http mới sau mỗi lần test
    // Mục đích tạo http mới mỗi lần test để không bị lưu cache trong biến "private accessToken" và "private refreshToken" trong file http.ts
  })

  // Nhớ sử dụng async await với các tác vụ không đồng bộ (call API)
  it('Test gọi thành công 1 API không cần access_token', async () => {
    const res = await http.get('products') // Gọi đến API product
    expect(res.status).toBe(HttpStatusCode.Ok)
  })

  it('Test gọi thành công 1 API cần access_token', async () => {
    // Cần đăng nhập trước để có thể test API cần access_token
    await http.post('login', {
      email: 'quan8@gmail.com',
      password: '123123'
    })

    const res = await http.get('me')
    expect(res.status).toBe(HttpStatusCode.Ok)
  })

  it('Test refresh_token khi access_token_1s hết hạn', async () => {
    setAcessTokenToLS(access_token_1s)
    setRefreshTokenToLS(refresh_token)
    // Vì khi gọi 1 API thì http sẽ chạy vào "this.instance.interceptors.request" trong file "http.ts"
    // Trong này gọi đến "this.accessToken", mà "this.accessToken" gán bằng getAccessTokenFromLS()
    // Lúc này nếu dùng http khởi tạo trong "beforeEach()" trên thì "getAccessTokenFromLS()" không có giá trị vì xuống dưới ta mới "setAcessTokenToLS()"
    // Nên ta "setAcessTokenToLS(access_token_1s)" trước sau đó mới khởi tạo new "Http.instance"
    const httpNew = new Http().instance

    const res = await httpNew.get('me')
    expect(res.status).toBe(HttpStatusCode.Ok)
  })
})
