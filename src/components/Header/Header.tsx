import { Link } from 'react-router-dom'
import Popover from '../Popover'

export function Header() {
  return (
    <div className='bg-[linear-gradient(-180deg,#f53d2d,#f63);] pb-5 pt-2 text-white'>
      <div className='container'>
        <div className='flex justify-end'>
          <Popover
            as='span'
            className='flex cursor-pointer items-center py-1 hover:text-gray-300'
            renderPopover={
              <div className='relative rounded-sm border border-gray-200 bg-white shadow-md'>
                <div className='flex flex-col py-2 px-3'>
                  <button className='py-2 px-3 hover:text-orange-600'>Tiếng Việt</button>
                  <button className='py-2 px-3 hover:text-orange-600'>Tiếng Anh</button>
                </div>
              </div>
            }
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-5 w-5'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418'
              />
            </svg>
            <span className='mx-1'>Tiếng Việt</span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-5 w-5'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
            </svg>
          </Popover>
          <Popover
            className='ml-3 flex cursor-pointer items-center py-1 hover:text-gray-300'
            renderPopover={
              <div>
                <Link
                  to='/profile'
                  className='block w-full bg-white py-2 px-3 text-left hover:bg-slate-100 hover:text-cyan-500'
                >
                  Tài khoản của tôi
                </Link>
                <Link
                  to='/'
                  className='block w-full bg-white py-2 px-3 text-left hover:bg-slate-100 hover:text-cyan-500'
                >
                  Đơn mua
                </Link>
                <button className='block w-full bg-white py-2 px-3 text-left hover:bg-slate-100 hover:text-cyan-500'>
                  Đăng xuất
                </button>
              </div>
            }
          >
            <div className='mr-2 h-6 w-6 flex-shrink-0'>
              <img
                className='h-full w-full rounded-full object-cover'
                src='https://scontent.fhan5-8.fna.fbcdn.net/v/t39.30808-1/272422631_615532239533773_5435424815684432432_n.jpg?stp=c0.1.60.60a_cp0_dst-jpg_p60x60&_nc_cat=107&ccb=1-7&_nc_sid=7206a8&_nc_ohc=_TvV36GgCcoAX9nJn46&_nc_ht=scontent.fhan5-8.fna&oh=00_AfBs6WdAiF2Dg60TzqShUWCC4YRrfE3qt9RMVFC6tjEueg&oe=641A7678'
                alt='avatar'
              />
            </div>
            <span>Anh Quân</span>
          </Popover>
        </div>
        <div className='mt-4 grid grid-cols-12 items-end gap-4'>
          <Link to='/' className='col-span-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              xmlnsXlink='http://www.w3.org/1999/xlink'
              aria-hidden='true'
              role='img'
              className='iconify iconify--logos h-11'
              width='31.88'
              height={32}
              preserveAspectRatio='xMidYMid meet'
              viewBox='0 0 256 257'
            >
              <defs>
                <linearGradient id='IconifyId1813088fe1fbc01fb466' x1='-.828%' x2='57.636%' y1='7.652%' y2='78.411%'>
                  <stop offset='0%' stopColor='#41D1FF' />
                  <stop offset='100%' stopColor='#BD34FE' />
                </linearGradient>
                <linearGradient id='IconifyId1813088fe1fbc01fb467' x1='43.376%' x2='50.316%' y1='2.242%' y2='89.03%'>
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
          </Link>
          <form className='col-span-9'>
            <div className='flex rounded-sm bg-white p-1'>
              <input
                type='text'
                name='search'
                placeholder='Search'
                className='flex-grow border-none bg-transparent px-3 py-2 text-black outline-none'
              />
              <button className='flex-shrink-0 rounded-sm bg-orange-600 py-2 px-6 hover:opacity-90'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-6 w-6'
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
          <div className='col-span-1 justify-self-end'>
            <Popover
              renderPopover={
                <div className='relative max-w-[400px] rounded-sm border border-gray-200 bg-white text-sm shadow-md'>
                  <div className='p-2'>
                    <div className='capitalize text-gray-400'>Sản phẩm mới thêm</div>
                    <div className='mt-5'>
                      <div className='mt-4 flex'>
                        <div className='flex-shrink-0'>
                          <img
                            src='https://cf.shopee.vn/file/978b9e4cb61c611aaaf58664fae133c5_tn'
                            alt='anh'
                            className='h-11 w-11 object-cover'
                          />
                        </div>
                        <div className='ml-2 flex-grow overflow-hidden'>
                          <div className='truncate'>
                            Tai nghe bluetooth MINPRO M10 PRO, tai nghe không dây nghe nhạc chơi game công nghệ
                            bluetooth 5.0
                          </div>
                        </div>
                      </div>
                      <div className='mt-4 flex'>
                        <div className='flex-shrink-0'>
                          <img
                            src='https://cf.shopee.vn/file/978b9e4cb61c611aaaf58664fae133c5_tn'
                            alt='anh'
                            className='h-11 w-11 object-cover'
                          />
                        </div>
                        <div className='ml-2 flex-grow overflow-hidden'>
                          <div className='truncate'>
                            Tai nghe bluetooth MINPRO M10 PRO, tai nghe không dây nghe nhạc chơi game công nghệ
                            bluetooth 5.0
                          </div>
                        </div>
                      </div>
                      <div className='mt-4 flex'>
                        <div className='flex-shrink-0'>
                          <img
                            src='https://cf.shopee.vn/file/978b9e4cb61c611aaaf58664fae133c5_tn'
                            alt='anh'
                            className='h-11 w-11 object-cover'
                          />
                        </div>
                        <div className='ml-2 flex-grow overflow-hidden'>
                          <div className='truncate'>
                            Tai nghe bluetooth MINPRO M10 PRO, tai nghe không dây nghe nhạc chơi game công nghệ
                            bluetooth 5.0
                          </div>
                        </div>
                        <div className='ml-2 flex-shrink-0'>
                          <span className='text-orange-500'></span>
                        </div>
                      </div>
                      <div className='mt-4 flex'>
                        <div className='flex-shrink-0'>
                          <img
                            src='https://cf.shopee.vn/file/978b9e4cb61c611aaaf58664fae133c5_tn'
                            alt='anh'
                            className='h-11 w-11 object-cover'
                          />
                        </div>
                        <div className='ml-2 flex-grow overflow-hidden'>
                          <div className='truncate'>
                            Tai nghe bluetooth MINPRO M10 PRO, tai nghe không dây nghe nhạc chơi game công nghệ
                            bluetooth 5.0
                          </div>
                        </div>
                      </div>
                      <div className='mt-4 flex'>
                        <div className='flex-shrink-0'>
                          <img
                            src='https://cf.shopee.vn/file/978b9e4cb61c611aaaf58664fae133c5_tn'
                            alt='anh'
                            className='h-11 w-11 object-cover'
                          />
                        </div>
                        <div className='ml-2 flex-grow overflow-hidden'>
                          <div className='truncate'>
                            Tai nghe bluetooth MINPRO M10 PRO, tai nghe không dây nghe nhạc chơi game công nghệ
                            bluetooth 5.0
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='mt-6 flex items-center justify-between'>
                      <div className='text-xs capitalize text-gray-500'>Thêm vào giỏ hàng</div>
                      <button className='rounded-sm bg-orange-500 px-4 py-2 capitalize text-white hover:bg-opacity-90'>
                        Xem giỏ hàng
                      </button>
                    </div>
                  </div>
                </div>
              }
            >
              <Link to='/' className=''>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-8 w-8'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                  />
                </svg>
              </Link>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  )
}