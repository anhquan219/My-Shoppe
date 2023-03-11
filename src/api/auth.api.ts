import { AuthResponse } from 'src/types/auth.types'
import http from 'src/utils/http'

export const registerAccount = (body: { email: string; password: string }) => {
  return http.post<AuthResponse>('/registerr', body)
}

export const loginAccount = (body: { email: string; password: string }) => {
  return http.post<AuthResponse>('/login', body)
}
