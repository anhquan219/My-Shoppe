const path = {
  home: '/',
  profile: '/profile',
  register: '/register',
  login: '/login',
  logout: '/logout',
  productDetail: ':id' // Sử dụng ':' cho các URL động
} as const

export default path
