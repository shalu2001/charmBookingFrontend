import { useState } from 'react'
import {
  faCalendar,
  faClock,
  faScissors,
  faStore,
  faFilter,
  faEye,
  faCircleCheck,
  faCircleXmark,
  faCircleExclamation,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CustomCard } from '../../../components/Cards/CustomCard'
import { CustomTable } from '../../../components/Table'
import { addToast, Badge, Button, Chip, Input } from '@heroui/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import { Customer } from '../../../types/customer'
import CommonModal from '../../../components/commonModal'
import BookingDetailsView from '../../../components/Booking/BookingDetailsView'
import { getCustomerBookingsById } from '../../../actions/customerActions'
import { CustomerBooking, BookingStatus } from '../../../types/booking'
import { cancelConfirmedBookingCustomer } from '../../../actions/bookingActions'

export function CustomerBookingsPage() {
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedBooking, setSelectedBooking] = useState<CustomerBooking | null>(null)
  const customer = useAuthUser<Customer>()
  const queryClient = useQueryClient()

  // Fetch customer bookings
  const { data: bookings, isPending } = useQuery<CustomerBooking[]>({
    queryKey: ['customerBookings', customer!.customerId],
    enabled: !!customer!.customerId,
    queryFn: () => getCustomerBookingsById(customer!.customerId),
  })

  // Add cancel booking mutation
  const { mutate: cancelBooking, isPending: isCancelling } = useMutation({
    mutationFn: (bookingId: string) =>
      cancelConfirmedBookingCustomer(bookingId, customer!.customerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customerBookings'] })
      addToast({
        title: 'Booking cancelled successfully',
        description: 'Your booking has been cancelled.',
        color: 'success',
      })
    },
    onError: error => {
      addToast({
        title: 'Error cancelling booking',
        description: 'Failed to cancel booking. Please try again.',
        color: 'danger',
      })
      console.error('Error cancelling booking:', error)
    },
  })

  if (!bookings || isPending) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <div className='text-muted-foreground'>Loading your bookings...</div>
      </div>
    )
  }

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch =
      booking.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.salonName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return (
          <Chip className='bg-success/10 text-success border-success/20'>
            <FontAwesomeIcon icon={faCircleCheck} className='w-3 h-3 mr-1' />
            Confirmed
          </Chip>
        )
      case 'pending':
        return (
          <Chip className='bg-pending/10 text-pending border-pending/20'>
            <FontAwesomeIcon icon={faCircleExclamation} className='w-3 h-3 mr-1' />
            Pending
          </Chip>
        )
      case 'cancelled':
        return (
          <Chip className='bg-cancelled/10 text-cancelled border-cancelled/20'>
            <FontAwesomeIcon icon={faCircleXmark} className='w-3 h-3 mr-1' />
            Cancelled
          </Chip>
        )
      default:
        return <Chip variant='flat'>{status}</Chip>
    }
  }

  // Statistics for customer
  const stats = {
    total: bookings.length,
    upcoming: bookings.filter(b => ['CONFIRMED', 'PENDING'].includes(b.status)).length,
    completed: bookings.filter(b => b.status === 'COMPLETED').length,
    cancelled: bookings.filter(b => b.status === 'CANCELLED').length,
  }

  const tableHeaders = [
    { key: 'Salon', label: 'Salon' },
    { key: 'Service', label: 'Service' },
    { key: 'Date & Time', label: 'Date & Time' },
    { key: 'Booking Status', label: 'Status' },
    { key: 'Amount', label: 'Amount' },
    { key: 'Actions', label: 'Actions' },
  ]

  const tableData = filteredBookings.map(booking => ({
    key: booking.id,
    Salon: (
      <div>
        <p className='font-medium'>{booking.salonName}</p>
      </div>
    ),
    Service: booking.serviceName,
    'Date & Time': (
      <div>
        <div className='flex items-center gap-1'>
          <FontAwesomeIcon icon={faCalendar} className='w-4 h-4 text-muted-foreground' />
          <span>{booking.date}</span>
        </div>
        <div className='flex items-center gap-1'>
          <FontAwesomeIcon icon={faClock} className='w-4 h-4 text-muted-foreground' />
          <span>{booking.time}</span>
        </div>
      </div>
    ),
    'Booking Status': getStatusBadge(booking.status),
    Amount: `LKR ${booking.amount}`,
    Actions: (
      <div className='flex gap-2'>
        <Button variant='ghost' size='sm' onPress={() => setSelectedBooking(booking)}>
          <FontAwesomeIcon icon={faEye} className='w-4 h-4' />
        </Button>
        {booking.status !== 'CANCELLED' && booking.status !== 'COMPLETED' && (
          <Button
            variant='ghost'
            size='sm'
            color='danger'
            isDisabled={isCancelling}
            onPress={() => {
              cancelBooking(booking.id)
              // if (window.confirm('Are you sure you want to cancel this booking?')) {
              // }
            }}
          >
            <FontAwesomeIcon icon={faCircleXmark} className='w-4 h-4' />
          </Button>
        )}
      </div>
    ),
  }))

  return (
    <div className='space-y-6'>
      {/* Header Section */}
      <div>
        <h2 className='text-3xl font-bold text-foreground'>My Bookings</h2>
        <p className='text-muted-foreground'>View and manage your salon appointments</p>
      </div>

      {/* Statistics Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        <CustomCard
          icon={<FontAwesomeIcon icon={faCalendar} className='w-6 h-6 text-primary' />}
          title='Total Bookings'
          className='bg-primary/10 text-primary'
        >
          {stats.total}
        </CustomCard>
        <CustomCard
          icon={<FontAwesomeIcon icon={faCircleCheck} className='w-6 h-6 text-success' />}
          title='Upcoming'
          className='bg-success/10 text-success'
        >
          {stats.upcoming}
        </CustomCard>
        <CustomCard
          icon={<FontAwesomeIcon icon={faCircleCheck} className='w-6 h-6 text-accent' />}
          title='Completed'
          className='bg-accent/10 text-accent'
        >
          {stats.completed}
        </CustomCard>
        <CustomCard
          icon={<FontAwesomeIcon icon={faCircleXmark} className='w-6 h-6 text-cancelled' />}
          title='Cancelled'
          className='bg-cancelled/10 text-cancelled'
        >
          {stats.cancelled}
        </CustomCard>
      </div>

      {/* Filters Section */}
      <div className='flex flex-col md:flex-row gap-4'>
        <div className='flex-1'>
          <div className='relative'>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground'
            />
            <Input
              placeholder='Search by salon or service...'
              className='pl-10'
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <Button
          variant='bordered'
          size='sm'
          onPress={() => setStatusFilter(prev => (prev === 'all' ? 'upcoming' : 'all'))}
        >
          <FontAwesomeIcon icon={faFilter} className='w-4 h-4 mr-2' />
          {statusFilter === 'all' ? 'Show Upcoming' : 'Show All'}
        </Button>
      </div>

      {/* Bookings Table */}
      {!tableData.length ? (
        <p className='text-muted-foreground'>No bookings found</p>
      ) : (
        <CustomTable tableHeaders={tableHeaders} tableData={tableData} pagination />
      )}

      {/* Booking Details Modal */}
      <CommonModal
        isOpen={!!selectedBooking}
        onOpenChange={() => setSelectedBooking(null)}
        title='Booking Details'
        size='lg'
      >
        {selectedBooking && (
          <BookingDetailsView
            booking={{
              ...selectedBooking,
              status: selectedBooking.status.toUpperCase() as
                | BookingStatus.PENDING
                | BookingStatus.CONFIRMED
                | BookingStatus.CANCELLED
                | BookingStatus.COMPLETED,
            }}
            viewMode='customer'
          />
        )}
      </CommonModal>
    </div>
  )
}
