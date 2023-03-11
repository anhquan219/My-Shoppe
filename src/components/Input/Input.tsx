import React from 'react'
import { type UseFormRegister, RegisterOptions } from 'react-hook-form'

interface Props {
  type?: React.HTMLInputTypeAttribute
  className?: string
  errorMessage?: string
  placeholder?: string
  name: string
  register: UseFormRegister<any>
  rules?: RegisterOptions
  autoComplete?: string | undefined
}

export default function Input({
  type,
  className,
  errorMessage,
  placeholder,
  name,
  autoComplete,
  register,
  rules
}: Props) {
  return (
    <div className={className}>
      <input
        type={type}
        autoComplete={autoComplete}
        className='w-full rounded-sm border border-solid border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm'
        placeholder={placeholder}
        {...register(name, rules)}
      />
      <div className='mt-1 min-h-[1.25rem] text-sm text-red-600'>{errorMessage}</div>
    </div>
  )
}
