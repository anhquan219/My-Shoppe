import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <div className='bg-orange-500'>
      <div className='mx-auto max-w-7xl px-4'>
        {/* Desktop chia 5 cột, mobile chia 1 cột */}
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          {/* Đặt thẻ này bắt đầu tại cột 4 (chiều rộng có thể chiếm là cột 4 và 5, vì thế nếu col-span-3 thì cũng chỉ là 2 cột)  */}
          {/* Nếu col-start-3 thì chiều rộng có thể chiếm là cột 3,4,5 thì col-span-3 ms đủ 3 cột)  */}
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm'>
              <div className='text-2xl'>Đăng Nhập</div>
              <div className='mt-8'>
                <input
                  type='email'
                  name='email'
                  className='w-full rounded-sm border border-solid border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm'
                  placeholder='Email'
                />
                <div className='mt-1 min-h-[1rem] text-sm text-red-600'></div>
              </div>
              <div className='mt-3'>
                <input
                  type='password'
                  name='password'
                  className='w-full rounded-sm border border-solid border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm'
                  placeholder='Password'
                />
                <div className='mt-1 min-h-[1rem] text-sm text-red-600'></div>
              </div>
              <div className='mt-3'>
                <button className='w-full bg-red-500 py-4 px-2 text-center text-sm text-white hover:bg-red-600'>
                  Đăng nhập
                </button>
              </div>
              <div className='item-center mt-8 flex justify-center text-center'>
                <span className='text-slate-400'>Bạn chưa có tài khoản?</span>
                <Link className='ml-1 text-red-400' to='/register'>
                  Đăng ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
