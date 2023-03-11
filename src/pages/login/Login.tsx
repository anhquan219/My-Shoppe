import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { loginAccount } from 'src/api/auth.api'
import { loginSchema, schemaLogin } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ResponseApi } from 'src/types/utils.type'
import Input from 'src/components/Input'

export type FormData = schemaLogin

export default function Login() {
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })

  const loginAccountMutation = useMutation({
    mutationFn: (body: FormData) => loginAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    loginAccountMutation.mutate(data, {
      onSuccess: (data) => {
        console.log(data)
      },
      onError: (error) => {
        // Kiểm tra nếu lỗi là 422 của Axios
        if (isAxiosUnprocessableEntityError<ResponseApi<FormData>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof FormData, {
                message: formError[key as keyof FormData],
                type: 'Server'
              })
            })
          }
        }
      }
    })
  })

  return (
    <div className='bg-orange-500'>
      <div className='container'>
        {/* Desktop chia 5 cột, mobile chia 1 cột */}
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          {/* Đặt thẻ này bắt đầu tại cột 4 (chiều rộng có thể chiếm là cột 4 và 5, vì thế nếu col-span-3 thì cũng chỉ là 2 cột)  */}
          {/* Nếu col-start-3 thì chiều rộng có thể chiếm là cột 3,4,5 thì col-span-3 ms đủ 3 cột)  */}
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng Nhập</div>
              <Input
                className='mt-8'
                name='email'
                type='email'
                placeholder='Email'
                register={register}
                // rules={rules.email}
                errorMessage={errors.email?.message}
              />

              <Input
                className='mt-2'
                name='password'
                type='password'
                autoComplete='on'
                placeholder='Password'
                register={register}
                // rules={rules.password}
                errorMessage={errors.password?.message}
              />
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
