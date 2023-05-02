import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import matchers from '@testing-library/jest-dom/matchers'
import App from './App'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import { log } from 'console'
import { logScreen, renderWithRouter } from './utils/testUtils'
import path from './constants/path'

expect.extend(matchers)

describe('App', () => {
  it('Test app render và chuyển trang', async () => {
    render(<App />, {
      wrapper: BrowserRouter
    })

    // Khởi tạo biến user để sử dụng các hành động (onClick)
    const user = userEvent.setup()
    /**
     * waitFor sẽ run callback 1 vài lần
     * cho đến khi hết timeout hoặc expect pass
     * số lần run phụ thuộc vào timeout và interval
     * mặc định: timeout = 1000ms và interval = 50ms
     * Tuy nhiên khi expect trong waitFor đã có kết quả trong 500ms thì sẽ dừng lại luôn
     */

    // Verify vào đúng trang chủ
    await waitFor(
      () => {
        expect(document.querySelector('title')?.textContent).toBe('Trang chủ | Shopee Clone')
      },
      {
        timeout: 3000
      }
    )

    // Verify chuyển sang trang login
    await user.click(screen.getByText(/Đăng nhập/i)) // regex thỏa mã cả chữ hoa chữ thường
    await waitFor(() => {
      expect(screen.queryByText('Bạn chưa có tài khoản?')).toBeInTheDocument() //Mong đợi text kia tồn tại trong document
      expect(document.querySelector('title')?.textContent).toBe('Đăng nhập | Shopee Clone')
    })

    // log ra HTML
    // tham số muốn in ra (toàn bộ HTML) và số dòng (99999999 dòng)
    screen.debug(document.body.parentElement as HTMLElement, 99999999)
  })

  it('Test chuyển đến trang not found', async () => {
    const badRouter = '/some/bad/route'
    render(
      <MemoryRouter initialEntries={[badRouter]}>
        <App />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.queryByText(/Page Not Found/i)).toBeInTheDocument()
    })

    await logScreen()
  })

  it('Render register page', async () => {
    // Cách 1 (Sử dụng window.history):
    // window.history.pushState({}, 'Test', path.register)
    // render(<App />, { wrapper: BrowserRouter })

    renderWithRouter({ router: path.register })

    // Cách 2 (Sử dụng <MemoryRouter>):
    // render(
    //   <MemoryRouter initialEntries={[path.register]}>
    //     <App />
    //   </MemoryRouter>
    // )

    await waitFor(() => {
      expect(screen.queryByText(/Bạn đã có tài khoản?/i)).toBeInTheDocument()
    })

    await logScreen()
  })
})
