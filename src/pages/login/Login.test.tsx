import { fireEvent, screen, waitFor } from '@testing-library/react'
import path from 'src/constants/path'
import { logScreen, renderWithRouter } from 'src/utils/testUtils'
import { describe, beforeAll, expect, it } from 'vitest'
import matchers from '@testing-library/jest-dom/matchers'
expect.extend(matchers)

describe('Test Login', () => {
  beforeAll(async () => {
    renderWithRouter({ router: path.login })
    await waitFor(() => {
      expect(screen.queryByPlaceholderText('Email')).toBeInTheDocument()
    })

    logScreen()
  })

  it('Hiển thị lỗi Requied ô Input', async () => {
    const submitButton = document.querySelector('form button[type="submit"]') as Element
    fireEvent.click(submitButton) // Sử dụng thay thế cho userEvent.setup()
    expect(await screen.findAllByText('Bắt buộc')).toBeTruthy()
  })

  it('Hiển thị lỗi khi nhấp không đúng định dạng', async () => {
    const emailInput = document.querySelector('form input[type="email"]') as HTMLInputElement
    const passInput = document.querySelector('form input[type="password"]') as HTMLInputElement
    const submitButton = document.querySelector('form button[type="submit"]') as HTMLInputElement

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
    expect(await screen.findAllByText('Không đúng định dạng')).toBeTruthy()
    expect(await screen.findAllByText('Độ dài tử 5 -160 kí tự')).toBeTruthy()
  })
})
