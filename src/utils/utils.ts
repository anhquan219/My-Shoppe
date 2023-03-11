import axios, { AxiosError } from 'axios'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'

// <T> : Generic type (Cho phép truyền type vào component)
// Từ đó ta có thể truyền type vào giá trị trả về từ lúc gọi Func
// => Có thể tái sử dụng vì mỗi chỗ dùng 1 type khác nhau thì ta tự quy định để truyền type vào lúc gọi Func

// Kiêm tra lỗi bắn về là của Axios
// Khi hàm isAxiosError() được gọi mà trả về true, thì error không còn unknown mà đc ép kiểu là type AxiosError
export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error) // Hàm kiểm tra của Axios trả về Boolean
}

// Check lỗi 422 của Axios
// Khi hàm được gọi và trả về kqua thì error có type là AxiosError và reponse trong error có type là FormError
// ta truyền truyền khi gọi func
export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}
