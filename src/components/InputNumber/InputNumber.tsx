import { forwardRef, InputHTMLAttributes } from 'react'

export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
}

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(function InputNumberInner(
  {
    className,
    errorMessage,
    classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm',
    classNameError = 'mt-1 text-red-600 min-h-[1.25rem] text-sm',
    onChange,
    ...rest
  },
  ref
) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    // Kiểm tra khi ng dùng gõ số hoặc rỗng và có truyền onChange thì ms chạy onChange
    if ((/^\d+$/.test(value) || value === '') && onChange) {
      onChange(e)
    }
  }

  // Khi input change sẽ gọi hàm handleChange, hàm này kiểm tra xem có truyền onChange vào k
  // Nếu có sẽ check value nhập vào. Nếu t/m điều kiệm sẽ emit giá trị e ra bên ngoài qua onChange(e)
  // Bên ngoài sẽ nhận được e này khi truyền onChange

  return (
    <div className={className}>
      <input className={classNameInput} onChange={handleChange} {...rest} ref={ref} />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
})

export default InputNumber
