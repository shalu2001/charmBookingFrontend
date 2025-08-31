import { useState } from 'react'
import {
  faUsers,
  faPlus,
  faEdit,
  faTrash,
  faPhone,
  faEnvelope,
  faCalendar,
  faCalendarDays,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Button,
  Input,
  Card,
  CardBody,
  CardHeader,
  Tabs,
  Tab,
  Avatar,
  Badge,
  Spinner,
  Checkbox,
  Select,
  SelectItem,
  Textarea,
} from '@heroui/react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Modal from '../../../components/commonModal'
import {
  addSalonWorker,
  getSalonLeaves,
  getSalonServices,
  getSalonWorkers,
} from '../../../actions/salonActions'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import { BaseSalonWorker, SalonAdmin, SalonWorker } from '../../../types/salon'

export function WorkersPage() {
  const admin = useAuthUser<SalonAdmin>()
  const queryClient = useQueryClient()

  // Fetch workers
  const { data: workers = [], isPending: loadingWorkersData } = useQuery({
    queryKey: ['workers', admin?.salonId],
    queryFn: () => getSalonWorkers(admin!.salonId),
    enabled: !!admin?.salonId,
  })

  //fetch leaves
  const { data: leaves, isPending: loadingLeaves } = useQuery({
    queryKey: ['leaves', admin?.salonId],
    queryFn: () => getSalonLeaves(admin!.salonId),
    enabled: !!admin?.salonId,
  })

  //fetch services
  const { data: services, isPending: loadingServices } = useQuery({
    queryKey: ['services', admin?.salonId],
    queryFn: () => getSalonServices(admin!.salonId),
    enabled: !!admin?.salonId,
  })

  //add worker
  const { mutate: addWorker, isPending: workerPending } = useMutation({
    mutationFn: (workerData: BaseSalonWorker) => addSalonWorker(workerData),
    onSuccess: newWorker => {
      queryClient.setQueryData<BaseSalonWorker[]>(['workers'], old => [...(old ?? []), newWorker])
      setShowAddModal(false)
      setNewWorker({ salonId: admin!.salonId, name: '', services: [] })
    },
  })

  const deleteWorkerMutation = useMutation({
    mutationFn: async (workerId: string) => {
      return new Promise(resolve => setTimeout(() => resolve(workerId), 300))
    },
    // onSuccess: workerId => {
    //   queryClient.setQueryData<Worker[]>(['workers'], old =>
    //     (old ?? []).filter(w => w.id !== workerId),
    //   )
    // },
  })

  const [showAddModal, setShowAddModal] = useState(false)
  const [showLeaveModal, setShowLeaveModal] = useState(false)
  const [selectedWorker, setSelectedWorker] = useState<SalonWorker | null>(null)
  const [newWorker, setNewWorker] = useState<{
    salonId: string
    name: string
    services: { id: string; name: string }[]
  }>({
    salonId: admin!.salonId,
    name: '',
    services: [],
  })
  const [newLeave, setNewLeave] = useState({
    date: '',
    type: 'full' as 'full' | 'half',
    reason: '',
  })

  const handleAddWorker = () => {
    if (!newWorker.name) return
    addWorker(newWorker)
    setNewWorker({ name: '', services: [], salonId: admin!.salonId })
    setShowAddModal(false)
  }

  const addWorkerModalFooter = (
    <>
      <Button variant='flat' onPress={() => setShowAddModal(false)}>
        Cancel
      </Button>
      <Button color='primary' onPress={handleAddWorker}>
        Add
      </Button>
    </>
  )

  const handleDeleteWorker = (id: string) => {
    deleteWorkerMutation.mutate(id)
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex justify-between items-start'>
        <div>
          <h2 className='text-3xl font-bold'>Workers Management</h2>
          <p className='text-gray-500'>Manage your salon staff and their schedules</p>
        </div>
        <Button onPress={() => setShowAddModal(true)} color='primary'>
          <FontAwesomeIcon icon={faPlus} className='mr-2' />
          Add Worker
        </Button>
      </div>

      <Tabs aria-label='Workers Management Tabs'>
        <Tab
          key='workers'
          title={
            <span>
              <FontAwesomeIcon icon={faUsers} className='mr-2' />
              Workers
            </span>
          }
        >
          {loadingWorkersData ? (
            <Spinner label='Loading workers...' />
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {workers.map(worker => (
                <Card key={worker.workerId}>
                  <CardHeader className='flex justify-between items-center'>
                    <div className='flex gap-3 items-center'>
                      <Avatar size='sm' name={worker.name} />
                      <div>
                        <h4 className='font-semibold'>{worker.name}</h4>
                      </div>
                    </div>
                    <Badge color={worker.status === 'active' ? 'success' : 'warning'}>
                      {worker.status}
                    </Badge>
                  </CardHeader>
                  <CardBody>
                    <div className='mt-2'>
                      <p className='text-sm font-medium'>Services:</p>
                      <div className='flex flex-wrap gap-1 mt-1'>
                        {worker.services.map(s => (
                          <Badge key={typeof s === 'string' ? s : s.id ?? s.name} variant='flat'>
                            {typeof s === 'string' ? s : s.name}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className='flex gap-2 mt-4'>
                      <Button size='sm' variant='flat' onPress={() => setSelectedWorker(worker)}>
                        <FontAwesomeIcon icon={faEdit} className='mr-1' /> Edit
                      </Button>
                      <Button size='sm' variant='flat' onPress={() => setShowLeaveModal(true)}>
                        <FontAwesomeIcon icon={faCalendarDays} />
                      </Button>
                      <Button
                        size='sm'
                        color='danger'
                        onPress={() => handleDeleteWorker(worker.workerId)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          )}
        </Tab>

        <Tab
          key='leave'
          title={
            <span>
              <FontAwesomeIcon icon={faCalendar} className='mr-2' />
              Leave Schedule
            </span>
          }
        >
          {loadingLeaves ? (
            <Spinner label='Loading leave schedule...' />
          ) : leaves && leaves.length > 0 ? (
            <div className='space-y-4'>
              {leaves.map(workerLeave => (
                <Card key={workerLeave.workerId} className='overflow-hidden'>
                  <CardHeader className='bg-gray-50'>
                    <div className='flex items-center justify-between'>
                      <h3 className='text-lg font-semibold'>{workerLeave.name}</h3>
                      <Badge color='primary'>{workerLeave.leaves.length} leaves</Badge>
                    </div>
                  </CardHeader>
                  <CardBody>
                    {workerLeave.leaves.length === 0 ? (
                      <p className='text-sm text-gray-500'>No scheduled leaves</p>
                    ) : (
                      <div className='space-y-2'>
                        {workerLeave.leaves.map(leave => (
                          <div
                            key={leave.id}
                            className='flex items-center justify-between p-2 rounded-lg border'
                          >
                            <div>
                              <p className='font-medium'>
                                {new Date(leave.date).toLocaleDateString('en-US', {
                                  weekday: 'short',
                                  month: 'short',
                                  day: 'numeric',
                                })}
                              </p>
                              <p className='text-sm text-gray-500'>
                                {leave.startTime.slice(0, 5)} - {leave.endTime.slice(0, 5)}
                              </p>
                            </div>
                            {/* <Button
                              size='sm'
                              color='danger'
                              variant='flat'
                              onPress={() => handleDeleteLeave(leave.id)}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </Button> */}
                          </div>
                        ))}
                      </div>
                    )}
                  </CardBody>
                </Card>
              ))}
            </div>
          ) : (
            <div className='text-center p-8 bg-gray-50 rounded-lg'>
              <p className='text-gray-500'>No leave schedules found</p>
            </div>
          )}
        </Tab>
      </Tabs>

      {/* Add Worker Modal */}
      <Modal
        isOpen={showAddModal}
        onOpenChange={setShowAddModal}
        title='Add Worker'
        footer={addWorkerModalFooter}
      >
        <div className='space-y-4'>
          <Input
            label='Name'
            value={newWorker.name}
            onChange={e => setNewWorker({ ...newWorker, name: e.target.value })}
          />
          {/* <Input
            label='Email'
            type='email'
            value={newWorker.email}
            onChange={e => setNewWorker({ ...newWorker, email: e.target.value })}
          />
          <Input
            label='Phone'
            value={newWorker.phone}
            onChange={e => setNewWorker({ ...newWorker, phone: e.target.value })}
          />
          <Input
            label='Role'
            value={newWorker.role}
            onChange={e => setNewWorker({ ...newWorker, role: e.target.value })}
          /> */}
          <div className='space-y-2'>
            <p className='text-sm font-medium'>Services</p>
            <div className='space-y-2'>
              {services?.map(service => (
                <Checkbox
                  key={service.serviceId}
                  isSelected={newWorker.services.some(s => s.id === service.serviceId)}
                  onChange={() =>
                    setNewWorker(prev => ({
                      ...prev,
                      services: prev.services.some(s => s.id === service.serviceId)
                        ? prev.services.filter(s => s.id !== service.serviceId)
                        : [...prev.services, { id: service.serviceId, name: service.name }],
                    }))
                  }
                >
                  {service.name}
                </Checkbox>
              ))}
            </div>
          </div>
        </div>
      </Modal>
      {/* Add Leave Modal */}
      <Modal
        isOpen={showLeaveModal}
        onOpenChange={setShowLeaveModal}
        title='Add Leave'
        footer={
          <>
            <Button variant='flat' onPress={() => setShowLeaveModal(false)}>
              Cancel
            </Button>
            <Button color='primary'>Save</Button>
          </>
        }
      >
        <div className='space-y-4'>
          <Input
            type='date'
            label='Date'
            value={newLeave.date}
            onChange={e => setNewLeave({ ...newLeave, date: e.target.value })}
          />
          <Select
            label='Leave Type'
            selectedKeys={[newLeave.type]}
            onSelectionChange={keys => {
              const value = Array.from(keys)[0] as 'full' | 'half'
              setNewLeave({ ...newLeave, type: value })
            }}
          >
            <SelectItem key='full'>Full Day</SelectItem>
            <SelectItem key='half'>Half Day</SelectItem>
          </Select>
          <Textarea
            label='Reason'
            value={newLeave.reason}
            onChange={e => setNewLeave({ ...newLeave, reason: e.target.value })}
          />
        </div>
      </Modal>
    </div>
  )
}
