import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  //   useDisclosure,
  Input,
  Textarea,
  Select,
  SelectItem,
} from '@heroui/react'
import { useState } from 'react'
import { ServiceModalProps, Category } from '../types/salon'

const SalonServiceModal = ({
  isOpen,
  onOpenChange,
  categories = [],
}: //   onAddService,
ServiceModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
    category: '',
  })

  const handleAddService = () => {
    // onAddService(formData)
    setFormData({
      name: '',
      description: '',
      price: '',
      duration: '',
      category: '',
    })
    onOpenChange(false)
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader>Add New Service</ModalHeader>
        <ModalBody>
          <div className='space-y-4'>
            <Input
              id='name'
              label='Service Name'
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />

            <Textarea
              id='description'
              label='Description'
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
            />
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <Input
                  id='price'
                  label='Price'
                  type='number'
                  value={formData.price}
                  onChange={e => setFormData({ ...formData, price: e.target.value })}
                />
              </div>
              <div>
                <Input
                  id='duration'
                  label='Duration'
                  type='number'
                  value={formData.duration}
                  onChange={e => setFormData({ ...formData, duration: e.target.value })}
                />
              </div>
            </div>

            <Select
              label='Category'
              placeholder='Select category'
              value={formData.category}
              //   onValueChange={value => setFormData({ ...formData, category: value })}
            >
              {categories.map((category: Category) => (
                <SelectItem key={category.categoryId}>{category.name}</SelectItem>
              ))}
            </Select>
            <Button onPress={handleAddService}>Add</Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default SalonServiceModal
