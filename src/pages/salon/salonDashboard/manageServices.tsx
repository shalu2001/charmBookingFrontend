import { useState } from 'react'
import {
  faPlus,
  faSearch,
  faEdit,
  faTrash,
  faDollarSign,
  faClock,
  //   faTag,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Input, Card, CardHeader } from '@heroui/react'
import SalonServiceModal from '../../../components/salonServiceModal'
import { Category } from '../../../types/salon'

interface Service {
  id: string
  name: string
  description: string
  price: number
  duration: number
  category: string
}

const mockCategories: Category[] = [
  { categoryId: 1, name: 'Hair Services' },
  { categoryId: 2, name: 'Nail Care' },
  { categoryId: 3, name: 'Facial Treatments' },
  { categoryId: 4, name: 'Massage Therapy' },
]

const mockServices: Service[] = [
  {
    id: '1',
    name: 'Hair Cut & Style',
    description: 'Professional haircut with styling',
    price: 65,
    duration: 60,
    category: 'hair',
  },
  {
    id: '2',
    name: 'Hair Color',
    description: 'Full hair coloring service',
    price: 120,
    duration: 120,
    category: 'hair',
  },
  {
    id: '3',
    name: 'Manicure',
    description: 'Classic manicure with nail polish',
    price: 35,
    duration: 45,
    category: 'nails',
  },
  {
    id: '4',
    name: 'Deep Cleansing Facial',
    description: 'Comprehensive facial treatment',
    price: 85,
    duration: 75,
    category: 'facial',
  },
]

export function ServicesPage() {
  const [services, setServices] = useState<Service[]>(mockServices)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
    category: '',
  })

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  //   const getCategoryColor = (categoryId: string) => {
  //     const category = mockCategories.find(cat => cat.id === categoryId)
  //     return category?.color || 'secondary'
  //   }

  const handleAddService = () => {
    const newService: Service = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      duration: parseInt(formData.duration),
      category: formData.category,
    }
    setServices([...services, newService])
    setFormData({ name: '', description: '', price: '', duration: '', category: '' })
    setIsAddDialogOpen(false)
  }

  const handleEditService = () => {
    if (!editingService) return

    const updatedServices = services.map(service =>
      service.id === editingService.id
        ? {
            ...service,
            name: formData.name,
            description: formData.description,
            price: parseFloat(formData.price),
            duration: parseInt(formData.duration),
            category: formData.category,
          }
        : service,
    )
    setServices(updatedServices)
    setEditingService(null)
    setFormData({ name: '', description: '', price: '', duration: '', category: '' })
  }

  const handleDeleteService = (serviceId: string) => {
    setServices(services.filter(service => service.id !== serviceId))
  }

  const openEditDialog = (service: Service) => {
    setEditingService(service)
    setFormData({
      name: service.name,
      description: service.description,
      price: service.price.toString(),
      duration: service.duration.toString(),
      category: service.category,
    })
  }

  return (
    <div className='space-y-6'>
      <div className='flex flex-col md:flex-row gap-4 justify-between items-start md:items-center'>
        <div>
          <h2 className='text-3xl font-bold text-foreground'>Services Management</h2>
          <p className='text-muted-foreground'>Manage your salon services and categories</p>
        </div>
        <Button onPress={() => setIsAddDialogOpen(true)}>
          <FontAwesomeIcon icon={faPlus} className='mr-2' /> Add Service
        </Button>
        <SalonServiceModal
          isOpen={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          categories={mockCategories}
          onAddService={handleAddService}
        />
      </div>

      <Card>
        <div className='p-6'>
          <div className='flex flex-col md:flex-row gap-4'>
            <div className='relative flex-1'>
              <FontAwesomeIcon
                icon={faSearch}
                className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4'
              />
              <Input
                placeholder='Search services...'
                className='pl-10'
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <div className='flex gap-2'>
              <Button
                // variant={selectedCategory === "all" ? "solid" : "outline"}
                onPress={() => setSelectedCategory('all')}
              >
                All
              </Button>
              {mockCategories.map(cat => (
                <Button
                  key={cat.categoryId}
                  //   variant={selectedCategory === cat.id ? "solid" : "outline"}
                  //   onPress={() => setSelectedCategory(cat.categoryId)}
                >
                  {cat.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {filteredServices.map(service => (
          <Card key={service.id} className='hover:shadow-lg'>
            <CardHeader className='pb-3'>
              <div className='flex justify-between'>
                <div>
                  <h3 className='text-lg font-semibold'>{service.name}</h3>
                  {/* <Badge className={`bg-${getCategoryColor(service.category)}`}>
                    {<FontAwesomeIcon icon={faTag} className='mr-1' />}
                    {mockCategories.find(c => c.categoryId === service.category)?.name}
                  </Badge> */}
                </div>
                <div className='flex gap-1'>
                  <Button variant='ghost' size='sm' onPress={() => openEditDialog(service)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                  <Button
                    variant='ghost'
                    size='sm'
                    className='text-destructive'
                    onPress={() => handleDeleteService(service.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <div>
              <p className='text-sm text-muted-foreground mb-4'>{service.description}</p>
              <div className='flex justify-between'>
                <span className='text-primary font-semibold'>
                  <FontAwesomeIcon icon={faDollarSign} className='mr-1' />
                  {service.price}
                </span>
                <span className='text-muted-foreground text-sm'>
                  <FontAwesomeIcon icon={faClock} className='mr-1' />
                  {service.duration} min
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Edit Modal */}
      <SalonServiceModal
        isOpen={!!editingService}
        onOpenChange={() => setEditingService(null)}
        categories={mockCategories}
        onAddService={handleEditService}
      />
    </div>
  )
}
