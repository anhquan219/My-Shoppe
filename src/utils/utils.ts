import axios, { AxiosError } from 'axios'
import config from 'src/constants/config'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import userImage from 'src/assets/images/user.svg'

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
