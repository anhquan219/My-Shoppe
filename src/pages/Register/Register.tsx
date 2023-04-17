import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import Input from 'src/components/Input'
import { schema, Schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import authApi from 'src/api/auth.api'
import omit from 'lodash/omit'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponseApi } from 'src/types/utils.type'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import Button from 'src/components/Button'
import { Helmet } from 'react-helmet-async'

export type FormData = Pick<Schema, 'password' | 'email' | 'confirm_password'>
const registerSchema = schema.pick(['email', 'password', 'confirm_password'])

export default function Register() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()

  const {
    register, // Cung cấp thông tin trường cho from
    handleSubmit,
    watch,
    getValues,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema)
  })

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.registerAccount(body)
  })

  // const rules = getRules(getValues)

  // handleSubmit() nhận vào 2 func:
  // 1. chạy khi valid thành công
  // 2. chạy khi valid không thành công
  const onSubmit = handleSubmit(
    (dataOnValid) => {
      const body = omit(dataOnValid, ['confirm_password'])
      registerAccountMutation.mutate(body, {
        onSuccess: (data) => {
          setIsAuthenticated(true)
          setProfile(data.data.data.user)
          navigate('/')
        },
        onError: (error) => {
          // Kiểm tra nếu lỗi là 422 của Axios
          if (isAxiosUnprocessableEntityError<ErrorResponseApi<Omit<FormData, 'confirm_password'>>>(error)) {
            const formError = error.response?.data.data
            if (formError) {
              Object.keys(formError).forEach((key) => {
                setError(key as keyof Omit<FormData, 'confirm_password'>, {
                  message: formError[key as keyof Omit<FormData, 'confirm_password'>],
                  type: 'Server'
                })
              })
            }
            // if (formError?.email)
            //   setError('email', {
            //     message: formError.email,
            //     type: 'Server'
            //   })

            // if (formError?.password)
            //   setError('password', {
            //     message: formError.password,
            //     type: 'Server'
            //   })
          }
        }
      })
    },
    (dataOnInvalid) => {
      console.log(dataOnInvalid)
    }
  )

  return (
    <div className='bg-orange-500'>
      <Helmet>
        <title>Đăng ký | Shopee Clone</title>
        <meta name='description' content='Đăng ký tài khoản vào dự án Shopee Clone' />
      </Helmet>
      <div className='container'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng Ký</div>
              <Input
                className='mt-8'
                name='email'
                type='email'
                placeholder='Email'
                register={register}
                classNameEye='absolute right-[8px] h-5 w-5 cursor-pointer top-[12px]'
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
                classNameEye='absolute right-[8px] h-5 w-5 cursor-pointer top-[12px]'
                // rules={rules.password}
                errorMessage={errors.password?.message}
              />

              <Input
                className='mt-2'
                name='confirm_password'
                type='password'
                autoComplete='on'
                placeholder='Confirm Password'
                register={register}
                // rules={rules.confirm_password}
                errorMessage={errors.confirm_password?.message}
              />

              <div className='mt-2'>
                <Button
                  type='submit'
                  isLoading={registerAccountMutation.isLoading}
                  disabled={registerAccountMutation.isLoading}
                  className='w-full bg-red-500 py-4 px-2 text-center text-sm text-white hover:bg-red-600'
                >
                  Đăng Ký
                </Button>
              </div>
              <div className='item-center mt-8 flex justify-center text-center'>
                <span className='text-slate-400'>Bạn đã có tài khoản?</span>
                <Link className='ml-1 text-red-400' to='/login'>
                  Đăng nhâp
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
