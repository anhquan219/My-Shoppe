import { forwardRef, InputHTMLAttributes, useState } from 'react'

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
    value = '',
    ...rest
  },
  ref
) {
  const [localValue, setLocalValue] = useState<string>(value as string)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    // Kiểm tra khi ng dùng gõ số hoặc rỗng
    if (/^\d+$/.test(value) || value === '') {
      // Vẫn truyền data nhập vào ô input dù k truyền onChange
      setLocalValue(value)
      // Khi truyền onChange thì mới emit data e ra ngoài
      onChange && onChange(e)
    }
  }

  // Khi input change sẽ gọi hàm handleChange, hàm này kiểm tra xem có truyền onChange vào k
  // Nếu có sẽ check value nhập vào. Nếu t/m điều kiệm sẽ emit giá trị e ra bên ngoài qua onChange(e)
  // Bên ngoài sẽ nhận được e này khi truyền onChange

  return (
    <div className={className}>
      <input className={classNameInput} onChange={handleChange} value={value || localValue} {...rest} ref={ref} />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
})

export default InputNumber
