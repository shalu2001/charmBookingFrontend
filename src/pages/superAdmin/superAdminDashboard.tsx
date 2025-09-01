import { useState } from 'react'
import {
  faFilter,
  faCircleCheck,
  faClock,
  faCircleXmark,
  faMagnifyingGlass,
  faEye,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CustomCard } from '../../components/Cards/CustomCard'
import { CustomTable } from '../../components/Table'
import { addToast, Button, Chip, Input } from '@heroui/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import CommonModal from '../../components/commonModal'
import { getSalons } from '../../actions/salonActions'

import { BaseSalon } from '../../types/salon'
import { verifySalon } from '../../actions/superAdminActions'

export function SuperAdminDashboard() {
  const [statusFilter, setStatusFilter] = useState<string>('ALL')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSalon, setSelectedSalon] = useState<BaseSalon | null>(null)
  const queryClient = useQueryClient()

  // Fetch salons
  const { data: salons = [], isPending } = useQuery<BaseSalon[]>({
    queryKey: ['salons'],
    queryFn: getSalons,
  })

  // Verify salon mutation
  const { mutate: verifySalonMutation, isPending: isVerifying } = useMutation({
    mutationFn: (salonId: string) => verifySalon(salonId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['salons'] })
      addToast({
        title: 'Salon verified successfully',
        description: 'The salon has been marked as verified.',
        color: 'success',
      })
    },
    onError: () => {
      addToast({
        title: 'Error verifying salon',
        description: 'Something went wrong. Please try again.',
        color: 'danger',
      })
    },
  })

  if (isPending) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <div className='text-muted-foreground'>Loading salons...</div>
      </div>
    )
  }

  const filteredSalons = salons.filter((salon: BaseSalon) => {
    const matchesSearch =
      salon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      salon.ownerName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'ALL' || salon.verificationStatus === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusChip = (status: string) => {
    switch (status) {
      case 'VERIFIED':
        return (
          <Chip className='bg-success/10 text-success border-success/20'>
            <FontAwesomeIcon icon={faCircleCheck} className='w-3 h-3 mr-1' />
            Verified
          </Chip>
        )
      case 'PENDING':
        return (
          <Chip className='bg-pending/10 text-pending border-pending/20'>
            <FontAwesomeIcon icon={faClock} className='w-3 h-3 mr-1' />
            Pending
          </Chip>
        )
      default:
        return <Chip variant='flat'>{status}</Chip>
    }
  }

  const stats = {
    total: salons.length,
    pending: salons.filter((s: BaseSalon) => s.verificationStatus === 'PENDING').length,
    verified: salons.filter((s: BaseSalon) => s.verificationStatus === 'VERIFIED').length,
  }

  const tableHeaders = [
    { key: 'Name', label: 'Name' },
    { key: 'Owner', label: 'Owner' },
    { key: 'Location', label: 'Location' },
    { key: 'Phone', label: 'Phone' },
    { key: 'Status', label: 'Status' },
    { key: 'Actions', label: 'Actions' },
  ]

  const tableData = filteredSalons.map((salon: BaseSalon) => ({
    key: salon.id,
    Name: <p className='font-medium'>{salon.name}</p>,
    Owner: salon.ownerName,
    Location: salon.location,
    Phone: salon.phone,
    Status: getStatusChip(salon.verificationStatus ?? 'PENDING'),
    Actions: (
      <div className='flex gap-2'>
        <Button variant='ghost' size='sm' onPress={() => setSelectedSalon(salon)}>
          <FontAwesomeIcon icon={faEye} className='w-4 h-4' />
        </Button>
        {salon.verificationStatus === 'PENDING' && (
          <Button
            variant='ghost'
            size='sm'
            color='success'
            isDisabled={isVerifying}
            onPress={() => verifySalonMutation(salon.id)}
          >
            <FontAwesomeIcon icon={faCircleCheck} className='w-4 h-4' />
          </Button>
        )}
      </div>
    ),
  }))

  return (
    <div className='space-y-6 m-10'>
      {/* Header */}
      <div>
        <h2 className='text-3xl font-bold text-foreground'>Super Admin Dashboard</h2>
        <p className='text-muted-foreground'>Manage all salons</p>
      </div>

      {/* Stats */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <CustomCard
          icon={<FontAwesomeIcon icon={faCircleCheck} className='w-6 h-6 text-primary' />}
          title='Total Salons'
          className='bg-primary/10 text-primary'
        >
          {stats.total}
        </CustomCard>
        <CustomCard
          icon={<FontAwesomeIcon icon={faClock} className='w-6 h-6 text-pending' />}
          title='Pending'
          className='bg-pending/10 text-pending'
        >
          {stats.pending}
        </CustomCard>
        <CustomCard
          icon={<FontAwesomeIcon icon={faCircleCheck} className='w-6 h-6 text-success' />}
          title='Verified'
          className='bg-success/10 text-success'
        >
          {stats.verified}
        </CustomCard>
      </div>

      {/* Filters */}
      <div className='flex flex-col md:flex-row gap-4'>
        <div className='flex-1'>
          <div className='relative'>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground'
            />
            <Input
              placeholder='Search by salon or owner...'
              className='pl-10'
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <Button
          variant='bordered'
          size='sm'
          onPress={() => setStatusFilter(prev => (prev === 'ALL' ? 'PENDING' : 'ALL'))}
        >
          <FontAwesomeIcon icon={faFilter} className='w-4 h-4 mr-2' />
          {statusFilter === 'ALL' ? 'Show Pending' : 'Show All'}
        </Button>
      </div>

      {/* Table */}
      {!tableData.length ? (
        <p className='text-muted-foreground'>No salons found</p>
      ) : (
        <CustomTable tableHeaders={tableHeaders} tableData={tableData} pagination />
      )}

      {/* Salon Details Modal */}
      <CommonModal
        isOpen={!!selectedSalon}
        onOpenChange={() => setSelectedSalon(null)}
        title='Salon Details'
        size='lg'
      >
        {selectedSalon && (
          <div className='space-y-4'>
            <p>
              <span className='font-medium'>Name:</span> {selectedSalon.name}
            </p>
            <p>
              <span className='font-medium'>Owner:</span> {selectedSalon.ownerName}
            </p>
            <p>
              <span className='font-medium'>Location:</span> {selectedSalon.location}
            </p>
            <p>
              <span className='font-medium'>Phone:</span> {selectedSalon.phone}
            </p>
            <p>
              <span className='font-medium'>Status:</span>{' '}
              {selectedSalon.verificationStatus ?? 'PENDING'}
            </p>
          </div>
        )}
      </CommonModal>
    </div>
  )
}
