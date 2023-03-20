import { User } from './user.type'
import { SucessResponseApi } from './utils.type'

export type AuthResponse = SucessResponseApi<{
  access_token: string
  expires: string
  user: User
}>
