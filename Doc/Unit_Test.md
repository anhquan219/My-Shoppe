## Unit Test:

```ts
import { beforeEach, describe, expect, it } from 'vitest'

describe('Test Refresh Tocken', () => {
  it('Set refresh_tocken vào localStorage thành công', () => {
    setRefreshTokenToLS(refresh_tocken)
    expect(getRefreshTokenFromLS()).toEqual(refresh_tocken) //toEqual kiểm tra giá trị thực (kiểm tra Object)
  })
})
```

```ts
expect().toBe() // So sánh kết quả tham chiếu
expect().toEqual() // So sánh giá trị thực (Dùng cho so sánh giá trị Object)
```

- Sử dụng thư viện jsdom để có thể sử dụng document.get hoặc localStorage (Sử dụng DOM) của trình duyệt (Vì vitest chạy trên môi trường node.js nên không tự truy cập được vào các cấu trúc môi trườn trình duyệt (DOM))


```ts
beforeEach(() => {
  console.log('Chạy trước mỗi lần describe')
  localStorage.clear()
})
```

- beforeEach(): Chạy trước mỗi lần describe
- beforeAll(): Chạy trước lần describe đầu tiên (chạy 1 lần)
- afterEach(): Chạy sau mỗi lần describe
- afterAll(): Chạy sau mỗi lần describe cuối cùng (chạy 1 lần)

** Nếu đặt trong hàm describe thì sẽ chạy so với it()

```ts
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
