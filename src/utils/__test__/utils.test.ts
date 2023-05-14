import { describe, it, expect } from 'vitest'
import { isAxiosError, isAxiosUnprocessableEntityError } from '../utils'
import { AxiosError } from 'axios'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'

// Mô tả tập hợp các ngữ cảnh cần test
describe('Test isAxiosError', () => {
  // it dùng để ghi chú trường hợp cần test
  it('isAxiosError trả về Boolean', () => {
    // expect dùng để mong đợi giá trị trả về
    expect(isAxiosError(new Error())).toBe(false)
    expect(isAxiosError(new AxiosError())).toBe(true)
  })
})

describe('Test isAxiosUnauthorizedError', () => {
  // it dùng để ghi chú trường hợp cần test
  it('isAxiosUnauthorizedError trả về Boolean', () => {
    // expect dùng để mong đợi giá trị trả về
    expect(isAxiosUnprocessableEntityError(new Error())).toBe(false)
    expect(
      isAxiosUnprocessableEntityError(
        // Tạo 1 lỗi với status là HttpStatusCode.InternalServerError
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: HttpStatusCode.InternalServerError,
          data: null
        } as any)
      )
    ).toBe(false)
    expect(
      isAxiosUnprocessableEntityError(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: HttpStatusCode.UnprocessableEntity,
          data: null
        } as any)
      )
    ).toBe(true)
  })
})
