import { type RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'

type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
  email: {
    required: {
      value: true,
      message: 'Bắt buộc'
    },
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'Không đúng định dạng'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài tử 5 -160 kí tự'
    },
    minLength: {
      value: 5,
      message: 'Độ dài tử 5 -160 kí tự'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Bắt buộc'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài tử 5 -160 kí tự'
    },
    minLength: {
      value: 6,
      message: 'Độ dài tử 5 -160 kí tự'
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: 'Bắt buộc'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài tử 5 -160 kí tự'
    },
    minLength: {
      value: 6,
      message: 'Độ dài tử 5 -160 kí tự'
    },
    validate:
      typeof getValues === 'function'
        ? (value) => {
            if (getValues('password') === value) return true
            return 'Không khớp'
          }
        : undefined
  }
})

function testPriceMinMax(this: yup.TestContext<yup.AnyObject>) {
  const { price_max, price_min } = this.parent as { price_min: string; price_max: string }

  if (price_min !== '' && price_max !== '') {
    return Number(price_max) >= Number(price_min)
  }
  return price_min !== '' || price_max !== ''
}

export const schema = yup.object({
  email: yup
    .string()
    .required('Bắt buộc')
    .email('Không đúng định dạng')
    .min(5, 'Độ dài tử 5 -160 kí tự')
    .max(160, 'Độ dài tử 5 -160 kí tự'),
  password: yup.string().required('Bắt buộc').min(6, 'Độ dài tử 5 -160 kí tự').max(160, 'Độ dài tử 5 -160 kí tự'),
  confirm_password: yup
    .string()
    .required('Bắt buộc')
    .min(6, 'Độ dài tử 6 -160 kí tự')
    .max(160, 'Độ dài tử 6 -160 kí tự')
    // Kiểm tra data confirm_password trùng với 1 trong số data trong mảng không
    .oneOf([yup.ref('password')], 'Không khớp'),
  price_min: yup.string().test({
    name: 'price-not-allowed',
    message: 'Giá không phù hợp',
    test: testPriceMinMax
  }),
  price_max: yup.string().test({
    name: 'price-not-allowed',
    message: 'Giá không phù hợp',
    test: testPriceMinMax
  })
})

// Xuất type form từ schema
export type Schema = yup.InferType<typeof schema>

// Type và schema của login sinh ra từ schema tổng
export const loginSchema = schema.omit(['confirm_password'])
export type schemaLogin = yup.InferType<typeof loginSchema>
