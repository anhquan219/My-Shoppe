## Unit Test:

```tsx
import { beforeEach, describe, expect, it } from 'vitest'

describe('Test Refresh Tocken', () => {
  it('Set refresh_tocken vào localStorage thành công', () => {
    setRefreshTokenToLS(refresh_tocken)
    expect(getRefreshTokenFromLS()).toEqual(refresh_tocken) //toEqual kiểm tra giá trị thực (kiểm tra Object)
  })
})
```

```tsx
expect().toBe() // So sánh kết quả tham chiếu
expect().toEqual() // So sánh giá trị thực (Dùng cho so sánh giá trị Object)
```

- Sử dụng thư viện jsdom để có thể sử dụng document.get hoặc localStorage (Sử dụng DOM) của trình duyệt (Vì vitest chạy trên môi trường node.js nên không tự truy cập được vào các cấu trúc môi trườn trình duyệt (DOM))

```tsx
beforeEach(() => {
  console.log('Chạy trước mỗi lần describe')
  localStorage.clear()
})
```

- beforeEach(): Chạy trước mỗi lần describe
- beforeAll(): Chạy trước lần describe đầu tiên (chạy 1 lần)
- afterEach(): Chạy sau mỗi lần describe
- afterAll(): Chạy sau mỗi lần describe cuối cùng (chạy 1 lần)

\*\* Nếu đặt trong hàm describe thì sẽ chạy so với it()

```tsx
describe('Test Refresh Tocken', () => {
  beforeEach(() => {
    console.log('Chạy trước mỗi it()')
    localStorage.clear()
  })

  it('Set refresh_tocken vào localStorage thành công', () => {
    setRefreshTokenToLS(refresh_tocken)
    expect(getRefreshTokenFromLS()).toEqual(refresh_tocken) //toEqual kiểm tra giá trị thực (kiểm tra Object)
  })
})
```

# Test các thư viện (library):

- Để test các thư viện ví dụ như react-router-dom cần cài thêm các thư viện sau

```tsx
  @testing-library/jest-dom
  @testing-library/react
  @testing-library/user-event
```

- Khi render component sử dụng useRouter() cần lưu ý nó phải được bọc bởi <Router>

- Để tương tác được với HTML sử dụng:

```tsx
const user = userEvent.setup()
await user.click(screen.getByText(/Đăng nhập/i)) // regex thỏa mã cả chữ hoa chữ thường
```

# Tạo hành động chuyển trang trong Unit Test:

- Sử dụng <MemoryRouter> và truyền URL cần chuyển đến vào initialEntries

```tsx
const badRouter = '/some/bad/route'
render(
  <MemoryRouter initialEntries={[badRouter]}>
    <App />
  </MemoryRouter>
)
```

# Hàm hay sử dụng tìm kiếm text, element trong HTML:

```js
-document.querySelector('title').textContent - // Lấy nội dung trong 1 thẻ (thẻ title)
  -screen.queryByText(/Page Not Found/i) - // Tìm kiếm đoạn text có tồn tại trong HTML hay không
  -screen.getByText(/Đăng nhập/i) // Trả về Element chứa text đó để tương tác (onClick)
```

# Sử dụng MOCK server để test chứ k sử dụng API thật (để xuất sử dụng msw)

- Khi tạo file `vitest.setup.js` nhớ bỏ nó vào trong `vite.config.ts`

```js
test: {
    // Set môi trường test là jsdom để có thể sử dụng localStorage
    environment: 'jsdom', // Mặc định là môi trường "node"
    setupFiles: path.resolve(__dirname, './vitest.setup.js')  //  <---- Vị trí cần thêm
  },
```

- Khi setup Mock Api trong file `vitest.setup.js` cần set `onUnhandledRequest: 'error'` để tránh các TH call các API ta chưa Mock sẽ tự nhẩy sang call API thật

```js
// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
```

# Lưu ý

- Những trường hợp chứng minh rằng tìm không ra text hay là element
  Thì nên dùng query hơn là find hay get (find và get là promise khi k tìm đc giá trị sẽ throw ra lỗi khiến unit test bị dừng)
- Khi sử dụng query cần sử dụng thêm await waitFor()
