import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor, waitForOptions } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import App from 'src/App'
import { expect } from 'vitest'

const delay = (time: number) =>
  // Tạo 1 Promise để xử lý tác vụ bất đồng bộ bên trong
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(true) // Sau khi chạy xong time thì trả về True (resolve() là đa ta muốn trả về khi xử lý xong)
    }, time)
  })

export const logScreen = async (
  body: HTMLElement = document.body.parentElement as HTMLElement,
  options?: waitForOptions
) => {
  const { timeout = 1000 } = options || {}
  await waitFor(
    async () => {
      // cần - 100 để trả về kết quả true trước khi waiFor kết thúc (nếu k sẽ lỗi do expect k pass)
      expect(await delay(timeout - 100)).toBe(true)
    },
    {
      ...options,
      timeout // Kết thúc waitFor sau khoảng thời giàn timeout (dù expect có pass hay không)
    }
  )
  screen.debug(body, 99999999)
}

// Tạo hàm để log ra toàn bộ HTML của trang đang test
// Sử dụng waitFor để run callback 1 vài lần (mục đích lấy đủ được HTML)
// Truyền vào expect hàm delay()
// (mụa đích cho waitFor run lại vài lần trong thời gian mình cài để lấy được HTML sau đó mới pass expect)
// Hàm delay sẽ đợi 1 khoảng thời gian là "time" sau đó trả về giá trị true
// Sau khoảng thời gian đó thì expect sẽ pass vì toBe(true)

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false // Khi call API thất bại thì k gọi lại nữa trong môi trường Test
      },
      mutations: {
        retry: false // Khi call API thất bại thì k gọi lại nữa trong môi trường Test
      }
    },
    // Tương tự không log ra bất kì thứ gì khi call không được API trong Mock
    logger: {
      log: console.log,
      warn: console.warn,
      // no more errors on the console
      error: () => null
    }
  })

  const Provider = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )

  return Provider
}

const Provider = createWrapper()

// Vì ta sử dụng renderWithRouter để chuyển trạng trong unit test nến setup 1 QueryClientProvider riêng cho unitTest
// để không làm ảnh hưởng tới QueryClientProvider trên dev
export const renderWithRouter = ({ router = '/' } = {}) => {
  window.history.pushState({}, 'Test', router)

  return {
    user: userEvent.setup(),
    ...render(
      <Provider>
        <App />
      </Provider>,
      { wrapper: BrowserRouter }
    )
  }
}
