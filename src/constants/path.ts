const path = {
  home: '/',
  profile: '/profile',
  register: '/register',
  login: '/login',
  logout: '/logout',
  productDetail: ':nameId', // Sử dụng ':' cho các URL động
  cart: '/cart'
} as const

export default path
