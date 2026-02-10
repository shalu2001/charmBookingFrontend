import { useState } from 'react'
import {
  faFilter,
  faCircleCheck,
  faClock,
  faMagnifyingGlass,
  faChevronRight,
  faX,
  faSignOut,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CustomCard } from '../../components/Cards/CustomCard'
import { CustomTable } from '../../components/Table'
import { Badge, Button, Chip, Input } from '@heroui/react'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import { BaseSalon } from '../../types/salon'
import { getAllSalons } from '../../actions/superAdminActions'
import { useNavigate } from 'react-router-dom'
import { VerificationStatus } from '../../types/superAdmin'
import useSignOut from 'react-auth-kit/hooks/useSignOut'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'

export function SuperAdminDashboard() {
  const [statusFilter, setStatusFilter] = useState<string>('ALL')
  const [searchTerm, setSearchTerm] = useState('')
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const signOut = useSignOut()
  const authHeader = useAuthHeader()

  const handleLogout = () => {
    signOut()
    window.location.href = '/super-admin/login'
  }
  // Fetch salons
  const { data: salons = [], isPending } = useQuery<BaseSalon[]>({
    queryKey: ['salons'],
    queryFn: () => getAllSalons(authHeader!),
    enabled: !!authHeader,
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
      case VerificationStatus.VERIFIED:
        return (
          <Chip className='bg-success/10 text-success border-success/20'>
            <FontAwesomeIcon icon={faCircleCheck} className='w-3 h-3 mr-1' />
            Verified
          </Chip>
        )
      case VerificationStatus.FAILED:
        return (
          <Chip className='bg-danger/10 text-danger-700 border-danger/20'>
            <FontAwesomeIcon icon={faX} className='w-3 h-3 mr-1' />
            Failed
          </Chip>
        )
      case VerificationStatus.PENDING:
        return (
          <Chip className='bg-warning/10 text-warning-700 border-warning/20'>
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
    { key: 'Actions', label: '' },
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
        <Badge
          color='success'
          content=''
          placement='top-right'
          shape='circle'
          isInvisible={salon.verificationStatus !== 'PENDING'}
        >
          <Button variant='ghost' size='sm' onPress={() => navigate(`salon/${salon.id}`)}>
            <FontAwesomeIcon icon={faChevronRight} className='w-4 h-4' />
          </Button>
        </Badge>
      </div>
    ),
  }))

  return (
    <div className='space-y-6 m-10'>
      {/* Header */}
      <div className='flex justify-between'>
        <div>
          <h2 className='text-3xl font-bold text-foreground'>Super Admin Dashboard</h2>
          <p className='text-muted-foreground'>Manage all salons</p>
        </div>
        <div>
          <Button
            variant='flat'
            size='md'
            className='m-4 mt-auto'
            startContent={<FontAwesomeIcon icon={faSignOut} className='w-4 h-4' />}
            onPress={handleLogout}
          >
            Logout
          </Button>
        </div>
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
    </div>
  )
}
