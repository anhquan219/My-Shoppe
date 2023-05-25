import { afterAll, afterEach, beforeAll } from 'vitest'
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import config from './src/constants/config'
import HttpStatusCode from './src/constants/httpStatusCode.enum'

const loginRes = {
  message: 'Đăng nhập thành công',
  data: {
    access_token:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTZiZTNkNmQ3YzYyMDM0MDg1NjBiNSIsImVtYWlsIjoicXVhbjhAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyMy0wNS0xNFQwMzoyMzozMS43OTdaIiwiaWF0IjoxNjg0MDM0NjExLCJleHAiOjE2ODQxMjEwMTF9.FJYuRUPrpQGjxIxInwGhxV0W2gwFAclLemT2WMmvEjc',
    expires: 86400,
    refresh_token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTZiZTNkNmQ3YzYyMDM0MDg1NjBiNSIsImVtYWlsIjoicXVhbjhAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyMy0wNS0xNFQwMzoyMzozMS43OTdaIiwiaWF0IjoxNjg0MDM0NjExLCJleHAiOjE2OTc4NTg2MTF9.hiZVcDwzy1ytZQnHPbK7ikThgX8Le2a2K2vfBiQKxNE',
    expires_refresh_token: 13824000,
    user: {
      _id: '6416be3d6d7c6203408560b5',
      roles: ['User'],
      email: 'quan8@gmail.com',
      createdAt: '2023-03-19T07:48:13.390Z',
      updatedAt: '2023-04-08T09:37:37.720Z',
      __v: 0,
      address: 'Văn Quan',
      date_of_birth: '1998-10-19T17:00:00.000Z',
      name: 'quan 23',
      phone: '123123',
      avatar: 'ea39fd9b-7c0e-4e86-a274-937efacadb12.jpeg'
    }
  }
}

// Khi call API để test đến server với URL setting bên dưới thì sẽ thay thế băng Mocking và trả về data đã setup (loginRes)
// thay vì call đến API chính (Không sử dụng API chính khi test)
export const restHandlers = [
  rest.post(`${config.baseUrl}login`, (req, res, ctx) => {
    return res(ctx.status(HttpStatusCode.Ok), ctx.json(loginRes))
  })
]

const server = setupServer(...restHandlers)

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

//  Close server after all tests
afterAll(() => server.close())

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers())
