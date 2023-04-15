import axios, { AxiosError } from 'axios'
import config from 'src/constants/config'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import userImage from 'src/assets/images/user.svg'
import { ErrorResponseApi } from 'src/types/utils.type'

// <T> : Generic type (Cho phép truyền type vào component)
// Từ đó ta có thể truyền type vào giá trị trả về từ lúc gọi Func
// => Có thể tái sử dụng vì mỗi chỗ dùng 1 type khác nhau thì ta tự quy định để truyền type vào lúc gọi Func để nhận kết quả có type đó

// Kiêm tra lỗi bắn về là của Axios
// Khi hàm isAxiosError() được gọi mà trả về true, thì error không còn unknown mà đc ép kiểu là type AxiosError<T> với T là type được truyền vào lúc gọi hàm
// "error is AxiosError<T>"": kiểm tra biến error có phải là AxiosError hay không, Nếu true thì đoạn code phía sau sẽ có thể
// truy cập các thuộc tính và phương thức của một Axios Error một cách an toàn (error được gán type là AxiosError<T>). và ngược lại
export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error) // Hàm kiểm tra của Axios trả về Boolean
}

// Check lỗi 422 của Axios
// Khi hàm được gọi (Truyền vào 1 type: FormError, truyền data: error) và trả về kqua error có type là AxiosError<FormError>
// ta truyền truyền khi gọi func
export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity // Kết quả có type AxiosError<FormError>
}

export function isAxiosUnauthorizedError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized
}

export function isAxiosExpiredTokenError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
  return (
    isAxiosUnauthorizedError<ErrorResponseApi<{ name: string; message: string }>>(error) &&
    error.response?.data?.data?.name === 'EXPIRED_TOKEN'
  )
}

// Format tiền
export function formatCurrency(currency: number) {
  return new Intl.NumberFormat('de-DE').format(currency)
}

// Format số lương vd: 1k, 2m
export function formatNumberToSocialStyle(value: number) {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
    .format(value)
    .replace('.', ',')
    .toLowerCase()
}

// Tính % sale
export const rateSale = (original: number, sale: number) => Math.round(((original - sale) / original) * 100) + '%'

// Xóa các kí tự đặc biệt trong chuỗi
const removeSpecialCharacter = (str: string) =>
  // eslint-disable-next-line no-useless-escape
  str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')

// Trả về URL chứa name product và id để gửi lên URL (thân thiện SEO)
export const generateNameId = ({ name, id }: { name: string; id: string }) => {
  // Chuyển tất cả các dâu ' ' thành '-' và cộng thêm '-i-' + id
  return removeSpecialCharacter(name).replace(/\s/g, '-') + `-i-${id}`
}

// Tách id ra từ chuỗi nhận được từ URL
export const getIdFromNameId = (nameId: string) => {
  const arr = nameId.split('-i-') // Biến chuỗi thành 1 array phân tách bởi '-i-'
  return arr[arr.length - 1]
}

export const getAvatarUrl = (avatarName?: string) => (avatarName ? `${config.baseUrl}images/${avatarName}` : userImage)
