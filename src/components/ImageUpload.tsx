import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, DragEvent, useRef, useEffect } from 'react'

interface CustomUploadProps {
  label?: string
  name?: string
  multiple?: boolean
  description?: string
  onChange?: (files: File[]) => void
  className?: string // Optional className for custom styling
  style?: React.CSSProperties // Optional inline styles
}

const CustomUpload = ({
  label,
  name = 'upload',
  multiple = false,
  description,
  onChange,
}: CustomUploadProps) => {
  const [previews, setPreviews] = useState<string[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleFiles = (fileList: FileList) => {
    const imageFiles = Array.from(fileList).filter(file => file.type.startsWith('image/'))

    // Create preview URLs
    const previewUrls = imageFiles.map(file => URL.createObjectURL(file))
    setPreviews(previewUrls)

    // Store the actual files
    setFiles(imageFiles)

    // Notify parent component
    if (onChange) {
      onChange(imageFiles)
    }
  }

  useEffect(() => {
    return () => {
      previews.forEach(URL.revokeObjectURL)
    }
  }, [previews])

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  const handleDelete = (index: number) => {
    setPreviews(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className='w-full flex flex-col items-center gap-4 mt-6'>
      {label && <p className='text-lg font-medium'>{label}</p>}
      {description && <p className='text-gray-500 text-sm'>{description}</p>}

      <label
        htmlFor={name}
        onDrop={handleDrop}
        onDragOver={e => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        className={`w-full max-w-xl p-6 text-left border-2 rounded-lg cursor-pointer transition
                    ${
                      isDragging
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-dashed border-gray-400 hover:border-blue-500'
                    }`}
      >
        <p className='text-gray-600'>Click or drag image{multiple ? 's' : ''} here to upload</p>
        <input
          ref={inputRef}
          id={name}
          name={name}
          type='file'
          accept='image/*'
          multiple={multiple}
          className='hidden'
          onChange={handleInputChange}
        />
      </label>

      {previews.length > 0 && (
        <div className='w-full max-w-xl flex flex-col gap-3 mt-6'>
          {previews.map((src, idx) => (
            <div
              key={idx}
              className='flex items-center justify-between bg-white border rounded-md shadow-sm p-3'
            >
              <div className='flex items-center gap-3'>
                <img
                  src={src}
                  alt={`Preview ${idx}`}
                  className='w-16 h-16 object-cover rounded border'
                />
                <p className='text-sm text-gray-700'>Image {idx + 1}</p>
              </div>
              <button
                onClick={() => handleDelete(idx)}
                className='text-red-500 hover:text-red-700 transition'
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CustomUpload
