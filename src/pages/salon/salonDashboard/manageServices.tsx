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
import {
  Category,
  CreateServiceDTO,
  SalonAdmin,
  Service,
  ServiceFormData,
} from '../../../types/salon'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import {
  addSalonService,
  deleteSalonService,
  getAllCategories,
  getSalonServices,
  updateSalonService,
} from '../../../actions/salonActions'
import SalonServiceModal from '../../../components/salonServiceModal'
import { CircularProgress } from '@heroui/react'

export function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState<number>(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const admin = useAuthUser<SalonAdmin>()
  const queryClient = useQueryClient()
  const [formData, setFormData] = useState<ServiceFormData>({
    name: '',
    price: '',
    duration: '',
    bufferTime: '0',
    categoryIds: [],
  })

  const { data: categories, isPending: categoriesFetching } = useQuery({
    queryKey: ['salonCategories'],
    queryFn: () => getAllCategories(),
  })

  const { data: services, isPending: servicesFetching } = useQuery({
    queryKey: ['salonServices'],
    enabled: !!admin?.salonId,
    queryFn: () => getSalonServices(admin!.salonId),
  })

  const { mutate: addService, isPending: serviceCreating } = useMutation({
    mutationFn: (newService: CreateServiceDTO) => addSalonService(admin!.salonId, newService),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['salonServices'] })
      setIsAddDialogOpen(false)
      // Reset form data
      setFormData({
        name: '',
        price: '',
        duration: '',
        bufferTime: '0',
        categoryIds: [],
      })
    },
  })

  const { mutate: updateMutate, isPending: serviceUpdating } = useMutation({
    mutationFn: (updatedService: CreateServiceDTO) =>
      updateSalonService(editingService!.serviceId, updatedService),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['salonServices'] })
      setEditingService(null)
      setFormData({
        name: '',
        price: '',
        duration: '',
        bufferTime: '0',
        categoryIds: [],
      })
    },
  })

  const { mutate: deleteMutate, isPending: serviceDeleting } = useMutation({
    mutationFn: (serviceId: string) => deleteSalonService(serviceId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['salonServices'] })
    },
  })
  let filteredServices: Service[] = []
  if (services) {
    filteredServices = services.filter(service => {
      const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory =
        selectedCategory === 0 ||
        service.categories.some(cat => cat.categoryId === selectedCategory)
      return matchesSearch && matchesCategory
    })
  }

  if (
    categoriesFetching ||
    servicesFetching ||
    serviceCreating ||
    serviceUpdating ||
    serviceDeleting
  ) {
    return <CircularProgress />
  }
  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault()

    const newService: CreateServiceDTO = {
      salonId: admin!.salonId,
      name: formData.name,
      price: parseFloat(formData.price),
      duration: parseInt(formData.duration),
      bufferTime: parseInt(formData.bufferTime || '0'),
      categoryIds: formData.categoryIds,
    }

    addService(newService)
  }

  const handleEditService = (e: React.FormEvent) => {
    e.preventDefault()

    if (!editingService) return

    const updatedService: CreateServiceDTO = {
      salonId: admin!.salonId,
      name: formData.name,
      price: parseFloat(formData.price),
      duration: parseInt(formData.duration),
      bufferTime: parseInt(formData.bufferTime || '0'),
      categoryIds: formData.categoryIds,
    }

    updateMutate(updatedService)
  }

  const openEditDialog = (service: Service) => {
    setEditingService(service)
    setFormData({
      name: service.name,
      price: service.price.toString(),
      duration: service.duration.toString(),
      bufferTime: service.bufferTime.toString(),
      categoryIds: service.categories.map(cat => cat.categoryId),
    })
  }

  const handleDeleteService = (serviceId: string) => {
    deleteMutate(serviceId)
  }

  return (
    <div className='space-y-6'>
      <div className='flex flex-col md:flex-row gap-4 justify-between items-start md:items-center'>
        <div>
          <h2 className='text-3xl font-bold text-foreground'>Services Management</h2>
          <p className='text-muted-foreground'>Manage your salon services</p>
        </div>
        <Button onPress={() => setIsAddDialogOpen(true)}>
          <FontAwesomeIcon icon={faPlus} className='mr-2' /> Add Service
        </Button>
        <SalonServiceModal
          isOpen={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          categories={categories || []}
          onSubmit={handleAddService}
          formData={formData}
          setFormData={setFormData}
          isLoading={serviceCreating}
          mode='add'
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
                variant={selectedCategory === 0 ? 'solid' : 'ghost'}
                onPress={() => setSelectedCategory(0)}
              >
                All
              </Button>
              {categories?.map(cat => (
                <Button
                  key={cat.categoryId}
                  variant={selectedCategory === cat.categoryId ? 'solid' : 'ghost'}
                  onPress={() => setSelectedCategory(cat.categoryId)}
                >
                  {cat.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </Card>
      {services && services.length > 0 ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredServices.map(service => (
            <Card
              key={service.serviceId}
              className='hover:shadow-lg transition-shadow duration-200'
            >
              <CardHeader className='pb-3'>
                <div className='flex justify-between items-start w-full'>
                  <div className='space-y-1 flex-1 pr-4'>
                    <h3 className='text-lg font-semibold leading-none'>{service.name}</h3>
                    {/* <p className='text-sm text-muted-foreground'>{service.description}</p> */}
                  </div>
                  <div className='flex gap-1 shrink-0'>
                    <Button
                      variant='ghost'
                      size='sm'
                      onPress={() => openEditDialog(service)}
                      className='h-8 w-8 min-w-[2rem]'
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </Button>
                    <Button
                      variant='ghost'
                      size='sm'
                      className='text-destructive h-8 w-8 min-w-[2rem]'
                      onPress={() => handleDeleteService(service.serviceId)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <div className='p-6 pt-0'>
                <div className='flex justify-between items-center mt-4'>
                  <span className='flex items-center text-primary font-semibold gap-1'>
                    <p>LKR</p>
                    {service.price}
                  </span>
                  <div className='flex items-center gap-3 text-muted-foreground text-sm'>
                    <span className='flex items-center'>
                      <FontAwesomeIcon icon={faClock} className='mr-1 h-4 w-4' />
                      {service.duration} min
                    </span>
                    {service.bufferTime > 0 && (
                      <span className='flex items-center'>
                        <span className='text-xs mr-1'>+</span>
                        {service.bufferTime} min buffer
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className='text-center p-8 bg-gray-50 rounded-lg'>
          <p className='text-lg text-gray-600 mb-2'>No services found.</p>
          <p className='text-sm text-muted-foreground'>
            Click the "Add Service" button to create your first service.
          </p>
        </div>
      )}
      {/* Edit Modal */}
      <SalonServiceModal
        isOpen={!!editingService}
        onOpenChange={() => setEditingService(null)}
        categories={categories || []}
        onSubmit={handleEditService}
        formData={formData}
        setFormData={setFormData}
        isLoading={serviceUpdating}
        mode='edit'
      />
    </div>
  )
}
