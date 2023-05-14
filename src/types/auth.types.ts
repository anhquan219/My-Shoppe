import { User } from './user.type'
import { SucessResponseApi } from './utils.type'

export type AuthResponse = SucessResponseApi<{
  access_token: string
  refresh_token: string
  expires_refresh_token: number
  expires: string
  user: User
}>

export type RefreshTokenReponse = SucessResponseApi<{ access_token: string }>
