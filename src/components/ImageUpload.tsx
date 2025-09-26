import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, DragEvent, useRef, useEffect } from 'react'

interface CustomUploadProps {
  label?: string
  name?: string
  multiple?: boolean
  description?: string
  onChange?: (files: File[]) => void
  maxFiles?: number
  className?: string
}

const CustomUpload = ({
  label,
  name = 'upload',
  multiple = false,
  description,
  onChange,
  maxFiles = 5,
}: CustomUploadProps) => {
  const [previews, setPreviews] = useState<Array<{ url: string; file: File }>>([])
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string>('')
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleFiles = (fileList: FileList) => {
    const imageFiles = Array.from(fileList).filter(file => file.type.startsWith('image/'))

    // Check if adding new files would exceed the limit
    if (previews.length + imageFiles.length > maxFiles) {
      setError(`Maximum ${maxFiles} images allowed`)
      return
    }

    setError('')

    // Create preview URLs and store files
    const newPreviews = imageFiles.map(file => ({
      url: URL.createObjectURL(file),
      file: file,
    }))

    setPreviews(prev => [...prev, ...newPreviews])

    // Notify parent component with all files
    if (onChange) {
      onChange([...previews.map(p => p.file), ...imageFiles])
    }
  }

  useEffect(() => {
    return () => {
      // Cleanup preview URLs
      previews.forEach(preview => URL.revokeObjectURL(preview.url))
    }
  }, [previews])

  const handleDelete = (index: number) => {
    setPreviews(prev => {
      const newPreviews = prev.filter((_, i) => i !== index)
      // Update parent component
      if (onChange) {
        onChange(newPreviews.map(p => p.file))
      }
      return newPreviews
    })
    setError('')
  }

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

  return (
    <div className='w-full flex flex-col items-start gap-4'>
      {label && (
        <div className='flex items-center gap-2'>
          <p className='text-base'>{label}</p>
          <span className='text-sm text-muted-foreground'>
            ({previews.length}/{maxFiles})
          </span>
        </div>
      )}

      {error && <p className='text-sm text-red-500'>{error}</p>}

      <label
        htmlFor={name}
        onDrop={handleDrop}
        onDragOver={e => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        className={`w-full p-6 text-center border-2 rounded-lg cursor-pointer transition
          ${
            isDragging
              ? 'border-primary bg-primary/5'
              : 'border-dashed border-border hover:border-primary'
          }
          ${previews.length >= maxFiles ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <p className='text-muted-foreground'>
          {previews.length >= maxFiles
            ? 'Maximum images reached'
            : `Click or drag image${multiple ? 's' : ''} here to upload`}
        </p>
        <input
          ref={inputRef}
          id={name}
          name={name}
          type='file'
          accept='image/*'
          multiple={multiple}
          className='hidden'
          onChange={handleInputChange}
          disabled={previews.length >= maxFiles}
        />
      </label>

      {previews.length > 0 && (
        <div className='w-full grid grid-cols-2 gap-4 mt-4'>
          {previews.map((preview, idx) => (
            <div
              key={idx}
              className='group relative bg-card border rounded-lg overflow-hidden shadow-sm'
            >
              <img
                src={preview.url}
                alt={`Preview ${idx + 1}`}
                className='w-full h-48 object-cover'
              />
              <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity'>
                <button
                  onClick={e => {
                    e.preventDefault()
                    handleDelete(idx)
                  }}
                  className='absolute top-2 right-2 p-2 bg-white/10 rounded-full text-white 
                    hover:bg-white/20 transition-colors'
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
              <div className='absolute bottom-0 left-0 right-0 p-2 bg-black/40 text-white text-sm'>
                {preview.file.name}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CustomUpload
