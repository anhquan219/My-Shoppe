import { Link } from 'react-router-dom'
import path from 'src/constants/path'
import useSearchProducts from 'src/hooks/useSearchProducts'
import NavHeader from '../NavHeader'

export function CartHeader() {
  const { onSubmitSearch, register } = useSearchProducts()

  return (
    <div className='border-b border-b-black/10'>
      <div className='bg-orange-600 text-white'>
        <div className='container'>
          <NavHeader />
        </div>
      </div>
      <div className='bg-white py-6'>
        <div className='container'>
          <nav className='md:flex md:items-center md:justify-between'>
            <Link to={path.home} className='flex flex-shrink-0 items-center'>
              <div>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  xmlnsXlink='http://www.w3.org/1999/xlink'
                  aria-hidden='true'
                  role='img'
                  className='fill-orange h-8 md:h-11'
                  width='31.88'
                  height={32}
                  preserveAspectRatio='xMidYMid meet'
                  viewBox='0 0 256 257'
                >
                  <defs>
                    <linearGradient
                      id='IconifyId1813088fe1fbc01fb466'
                      x1='-.828%'
                      x2='57.636%'
                      y1='7.652%'
                      y2='78.411%'
                    >
                      <stop offset='0%' stopColor='#41D1FF' />
                      <stop offset='100%' stopColor='#BD34FE' />
                    </linearGradient>
                    <linearGradient
                      id='IconifyId1813088fe1fbc01fb467'
                      x1='43.376%'
                      x2='50.316%'
                      y1='2.242%'
                      y2='89.03%'
                    >
                      <stop offset='0%' stopColor='#FFEA83' />
                      <stop offset='8.333%' stopColor='#FFDD35' />
                      <stop offset='100%' stopColor='#FFA800' />
                    </linearGradient>
                  </defs>
                  <path
                    fill='url(#IconifyId1813088fe1fbc01fb466)'
                    d='M255.153 37.938L134.897 252.976c-2.483 4.44-8.862 4.466-11.382.048L.875 37.958c-2.746-4.814 1.371-10.646 6.827-9.67l120.385 21.517a6.537 6.537 0 0 0 2.322-.004l117.867-21.483c5.438-.991 9.574 4.796 6.877 9.62Z'
                  />
                  <path
                    fill='url(#IconifyId1813088fe1fbc01fb467)'
                    d='M185.432.063L96.44 17.501a3.268 3.268 0 0 0-2.634 3.014l-5.474 92.456a3.268 3.268 0 0 0 3.997 3.378l24.777-5.718c2.318-.535 4.413 1.507 3.936 3.838l-7.361 36.047c-.495 2.426 1.782 4.5 4.151 3.78l15.304-4.649c2.372-.72 4.652 1.36 4.15 3.788l-11.698 56.621c-.732 3.542 3.979 5.473 5.943 2.437l1.313-2.028l72.516-144.72c1.215-2.423-.88-5.186-3.54-4.672l-25.505 4.922c-2.396.462-4.435-1.77-3.759-4.114l16.646-57.705c.677-2.35-1.37-4.583-3.769-4.113Z'
                  />
                </svg>
              </div>
              <div className='mx-4 h-6 w-[1px] bg-orange-600 md:h-8' />
              <div className='capitalize text-orange-600 md:text-xl'>Giỏ hàng</div>
            </Link>
            <form className='mt-3 md:mt-0 md:w-[50%]' onSubmit={onSubmitSearch}>
              <div className='border-orange flex rounded-sm border-2'>
                <input
                  type='text'
                  className='w-full flex-grow border-none bg-transparent px-3 py-1 text-black outline-none'
                  placeholder='Free Ship Đơn Từ 0Đ'
                  {...register('search')}
                />
                <button className='bg-orange flex-shrink-0 rounded-sm py-2 px-8 hover:opacity-90'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-5 w-5 stroke-white'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                    />
                  </svg>
                </button>
              </div>
            </form>
          </nav>
        </div>
      </div>
    </div>
  )
}
