import { User } from 'src/types/user.type'
import { SucessResponseApi } from 'src/types/utils.type'
import http from 'src/utils/http'

interface BodyUpdateProfile extends Omit<User, '_id' | 'roles' | 'createdAt' | 'updatedAt' | 'email'> {
  password?: string
  newPassword?: string
}

const userApi = {
  getProfile() {
    return http.get<SucessResponseApi<User>>('me')
  },
  updateProfile(body: BodyUpdateProfile) {
    return http.put<SucessResponseApi<User>>('user', body)
  },
  uploadAvatar(body: FormData) {
    return http.post<SucessResponseApi<string>>('user/upload-avatar', body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}

export default userApi
