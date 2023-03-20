import { User } from 'src/types/user.type'

// Set khi đăng nhập thành công
export const setAcessTokenToLS = (access_token: string) => {
  localStorage.setItem('access_tocken', access_token)
}

// Clear khi đăng xuất
export const clearLS = () => {
  localStorage.removeItem('access_tocken')
  localStorage.removeItem('profile')
}

// Get data vào Context
export const getAccessTokenFromLS = () => {
  return localStorage.getItem('access_tocken') || ''
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
