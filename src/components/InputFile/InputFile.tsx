import config from 'src/constants/config'
import { toast } from 'react-toastify'
import { useRef } from 'react'

interface Props {
  onChange?: (file?: File) => void
}

export function InputFile({ onChange }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = event.target.files?.[0]
    if (fileFromLocal && (fileFromLocal.size >= config.maxSizeUploadAvatar || !fileFromLocal.type.includes('image'))) {
      toast.error(`Dụng lượng file tối đa 1 MB. Định dạng:.JPEG, .PNG`, {
        position: 'top-center'
      })
    } else {
      onChange && onChange(fileFromLocal)
    }
  }

  const handleUpload = () => {
    fileInputRef.current?.click()
  }

  return (
    <>
      <input
        ref={fileInputRef}
        className='hidden'
        type='file'
        accept='.jpg,.jpeg,.png'
        onChange={onFileChange}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onClick={(e) => ((e.target as any).value = null)} // Clear value cũ đi để khi chọn bức ảnh 2 lần đều được validate
      />
      <button
        className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm'
        type='button'
        onClick={handleUpload}
      >
        Chọn ảnh
      </button>
      <div className='mt-3 text-gray-400'>
        <div>Dụng lượng file tối đa 1 MB</div>
        <div>Định dạng:.JPEG, .PNG</div>
      </div>
    </>
  )
}
