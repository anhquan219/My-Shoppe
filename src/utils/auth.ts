import { User } from 'src/types/user.type'

export const LocalStorageEventTarget = new EventTarget() // Tạo đối tượng EventTarget để emit sự kiện

// Set khi đăng nhập thành công
export const setAcessTokenToLS = (access_token: string) => {
  localStorage.setItem('access_tocken', access_token)
}

export const setRefreshTokenToLS = (refresh_tocken: string) => {
  localStorage.setItem('refresh_tocken', refresh_tocken)
}

// Clear khi đăng xuất (Khi Logout hoặc hết hạn đăng nhập sẽ được gọi)
export const clearLS = () => {
  localStorage.removeItem('access_tocken')
  localStorage.removeItem('refresh_tocken')
  localStorage.removeItem('profile')
  const clearLSEvent = new Event('clearLS') // Tạo đối tượng Event để tương tác với đối tượng EventTarget tạo ở trên
  LocalStorageEventTarget.dispatchEvent(clearLSEvent) // Emit sự kiện vừa tạo
}

// Get data vào Context
export const getAccessTokenFromLS = () => {
  return localStorage.getItem('access_tocken') || ''
}

export const getRefreshTokenFromLS = () => {
  return localStorage.getItem('refresh_tocken') || ''
}

// Get data vào Context
export const getProfileFromLS = () => {
  const result = localStorage.getItem('profile')
  return result ? JSON.parse(result) : null
}

// Set khi đăng nhâp thành công
export const setProfileFromLS = (profile: User) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}
