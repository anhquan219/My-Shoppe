export const sortBy = {
  createAt: 'createAt',
  view: 'view',
  sold: 'sold',
  price: 'price'
} as const

// as const tránh TH gán lại nó (nếu gán sẽ báo lỗia)

export const order = {
  asc: 'asc',
  desc: 'desc'
} as const
