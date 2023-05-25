import { fireEvent, screen, waitFor } from '@testing-library/react'
import path from 'src/constants/path'
import { logScreen, renderWithRouter } from 'src/utils/testUtils'
import { describe, beforeAll, expect, it } from 'vitest'
import matchers from '@testing-library/jest-dom/matchers'
expect.extend(matchers)

describe('Test Login', () => {
  let emailInput: HTMLInputElement
  let passInput: HTMLInputElement
  let submitButton: HTMLButtonElement

  beforeAll(async () => {
    renderWithRouter({ router: path.login })
    await waitFor(() => {
      expect(screen.queryByPlaceholderText('Email')).toBeInTheDocument()
    })

    emailInput = document.querySelector('form input[type="email"]') as HTMLInputElement
    passInput = document.querySelector('form input[type="password"]') as HTMLInputElement
    submitButton = document.querySelector('form button[type="submit"]') as HTMLButtonElement
    logScreen()
  })

  it('Hiển thị lỗi Requied ô Input', async () => {
    fireEvent.click(submitButton) // Sử dụng thay thế cho userEvent.setup()
    expect(await screen.findAllByText('Bắt buộc')).toBeTruthy()
  })

  it('Hiển thị lỗi khi nhấp không đúng định dạng', async () => {
    fireEvent.change(emailInput, {
      target: {
        value: 'test'
      }
    })

    fireEvent.change(passInput, {
      target: {
        value: '123'
      }
    })

    fireEvent.click(submitButton) // Sử dụng thay thế cho userEvent.setup()
    await waitFor(() => {
      expect(screen.queryByText('Không đúng định dạng')).toBeTruthy()
      expect(screen.queryByText('Độ dài tử 5 -160 kí tự')).toBeTruthy()
    })
  })

  it('Không hiển thị error input khi nhập đúng', async () => {
    fireEvent.change(emailInput, {
      target: {
        value: 'quan8@gmail.com'
      }
    })

    fireEvent.change(passInput, {
      target: {
        value: '123123'
      }
    })

    // Những trường hợp chứng minh rằng tìm không ra text hay là element
    // Thì nên dùng query hơn là find hay get (find và get là promise khi k tìm đc giá trị sẽ throw ra lỗi khiến unit test bị dừng)
    // Khi sử dụng query cần sử dụng thêm await waitFor()
    await waitFor(() => {
      expect(screen.queryByText('Không đúng định dạng')).toBeFalsy()
      expect(screen.queryByText('Độ dài tử 5 -160 kí tự')).toBeFalsy()
    })

    fireEvent.click(submitButton) // Sử dụng thay thế cho userEvent.setup()
    await logScreen()

    // Kiểm tra đã đăng nhập thành công
    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe('Trang chủ | Shopee Clone')
    })
  })
})
