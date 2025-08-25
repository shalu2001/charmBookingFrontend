import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Input,
  Textarea,
  Form,
  Checkbox,
} from '@heroui/react'
import { ServiceModalProps } from '../types/salon'
import { useEffect } from 'react'

const SalonServiceModal: React.FC<ServiceModalProps> = ({
  isOpen,
  onOpenChange,
  categories,
  onSubmit,
  formData,
  setFormData,
  isLoading,
  mode,
}) => {
  const handleCategoryChange = (categoryId: number) => {
    setFormData(prev => ({
      ...prev,
      categoryIds: prev.categoryIds.includes(categoryId)
        ? prev.categoryIds.filter(id => id !== categoryId)
        : [...prev.categoryIds, categoryId],
    }))
  }

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        name: '',
        price: '',
        duration: '',
        bufferTime: '',
        categoryIds: [],
      })
    }
  }, [isOpen, setFormData])

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <Form onSubmit={onSubmit}>
        <ModalContent>
          <ModalHeader>Add New Service</ModalHeader>
          <ModalBody>
            <div className='space-y-4'>
              <Input
                label='Service Name'
                isRequired
                value={formData.name}
                onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
              />

              <div className='grid grid-cols-2 gap-4'>
                <Input
                  label='Price'
                  type='number'
                  isRequired
                  min={0}
                  value={formData.price}
                  onChange={e => setFormData(prev => ({ ...prev, price: e.target.value }))}
                />
                <Input
                  label='Duration (minutes)'
                  type='number'
                  isRequired
                  min={1}
                  value={formData.duration}
                  onChange={e => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                />
              </div>

              <Input
                label='Buffer Time (minutes)'
                type='number'
                min={0}
                value={formData.bufferTime}
                onChange={e => setFormData(prev => ({ ...prev, bufferTime: e.target.value }))}
              />

              <div className='space-y-2'>
                <label className='text-sm font-medium'>Categories</label>
                <div className='border rounded-md p-3 space-y-2'>
                  {categories.map(category => (
                    <div key={category.categoryId} className='flex items-center gap-2'>
                      <Checkbox
                        isSelected={formData.categoryIds.includes(category.categoryId)}
                        onValueChange={() => handleCategoryChange(category.categoryId)}
                      >
                        {category.name}
                      </Checkbox>
                    </div>
                  ))}
                </div>
              </div>

              <div className='flex justify-end gap-2 mt-4'>
                <Button variant='flat' onPress={() => onOpenChange(false)} type='button'>
                  Cancel
                </Button>
                <Button color='primary' type='submit' isLoading={isLoading}>
                  {mode === 'add' ? 'Add Service' : 'Update Service'}
                </Button>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Form>
    </Modal>
  )
}

export default SalonServiceModal
