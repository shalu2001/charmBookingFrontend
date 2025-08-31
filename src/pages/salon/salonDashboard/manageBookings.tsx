import {
  faCalendar,
  faClock,
  faUser,
  faEnvelope,
  faPhone,
  faCheckCircle,
  faFilter,
  faEye,
  faEllipsisH,
  faCircleExclamation,
  faCircleXmark,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CustomDropdown } from '../../../components/Dropdown'
import { CustomTable } from '../../../components/Table'
import { CustomCard } from '../../../components/Cards/CustomCard'
import { Chip, Button, Input } from '@heroui/react'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Booking, BookingStatus, PaymentStatus } from '../../../types/booking'
import { getBookings } from '../../../actions/bookingActions'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import { SalonAdmin } from '../../../types/salon'
import CommonModal from '../../../components/commonModal'
import BookingDetailsView from '../../../components/Booking/BookingDetailsView'

export function BookingsPage() {
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [paymentFilter, setPaymentFilter] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const admin = useAuthUser<SalonAdmin>()

  const { data: bookings, isPending: bookingsLoading } = useQuery<Booking[]>({
    queryKey: ['bookings'],
    queryFn: () => getBookings(admin!.salonId),
  })
  if (!bookings || bookingsLoading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <div className='text-muted-foreground'>Loading bookings...</div>
      </div>
    )
  }
  const filteredBookings = bookings?.filter(booking => {
    const matchesSearch =
      booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customerEmail.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter
    const matchesPayment = paymentFilter === 'all' || booking.paymentStatus === paymentFilter
    return matchesSearch && matchesStatus && matchesPayment
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return (
          <Chip className='bg-success/10 text-success border-success/20'>
            <FontAwesomeIcon icon={faCheckCircle} className='w-3 h-3 mr-1' />
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
      case 'completed':
        return (
          <Chip className='bg-accent/10 text-accent border-accent/20'>
            <FontAwesomeIcon icon={faCheckCircle} className='w-3 h-3 mr-1' />
            Completed
          </Chip>
        )
      default:
        return <Chip variant='flat'>{status}</Chip>
    }
  }

  const getPaymentBadge = (paymentStatus: string) => {
    switch (paymentStatus) {
      case 'paid':
        return <Chip className='bg-success/10 text-success border-success/20'>Paid</Chip>
      case 'unpaid':
        return <Chip className='bg-warning/10 text-warning border-warning/20'>Unpaid</Chip>
      case 'refunded':
        return <Chip className='bg-muted/10 text-muted-foreground border-muted/20'>Refunded</Chip>
      default:
        return <Chip variant='flat'>{paymentStatus}</Chip>
    }
  }

  const updateBookingStatus = (bookingId: string, newStatus: Booking['status']) => {}

  const updatePaymentStatus = (bookingId: string, newPaymentStatus: Booking['paymentStatus']) => {}

  const tableHeaders = [
    { key: 'Booking ID', label: 'Booking ID' },
    { key: 'Customer', label: 'Customer' },
    { key: 'Service', label: 'Service' },
    { key: 'Date & Time', label: 'Date & Time' },
    { key: 'Status', label: 'Status' },
    { key: 'Payment', label: 'Payment' },
    { key: 'Amount', label: 'Amount' },
    { key: 'Actions', label: 'Actions' },
  ]

  const tableData = filteredBookings?.map(booking => ({
    key: booking.id,
    'Booking ID': booking.id,
    Customer: (
      <div>
        <p className='font-medium'>{booking.customerName}</p>
        <p className='text-sm text-muted-foreground'>{booking.customerEmail}</p>
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
    Status: getStatusBadge(booking.status),
    Payment: getPaymentBadge(booking.paymentStatus),
    Amount: `${booking.amount}`,
    Actions: (
      <div className='flex gap-2'>
        <Button variant='ghost' size='sm' onPress={() => setSelectedBooking(booking)}>
          <FontAwesomeIcon icon={faEye} className='w-4 h-4' />
        </Button>
        <CustomDropdown
          dropdownTrigger={
            <Button variant='ghost' size='sm'>
              <FontAwesomeIcon icon={faEllipsisH} className='w-4 h-4' />
            </Button>
          }
          dropdownItems={[
            ...(booking.status === 'PENDING'
              ? [{ label: 'Confirm Booking', value: 'Confirm Booking' }]
              : []),
            ...(booking.status !== 'CANCELLED'
              ? [{ label: 'Cancel Booking', value: 'Cancel Booking' }]
              : []),
            ...(booking.paymentStatus === 'PAID'
              ? [{ label: 'Mark as Paid', value: 'Mark as Paid' }]
              : []),
          ]}
          onItemSelect={item => {
            if (item === 'Confirm Booking') updateBookingStatus(booking.id, BookingStatus.CONFIRMED)
            if (item === 'Cancel Booking') updateBookingStatus(booking.id, BookingStatus.CANCELLED)
            if (item === 'Mark as Paid') updatePaymentStatus(booking.id, PaymentStatus.PAID)
          }}
        />
      </div>
    ),
  }))

  // Statistics
  const stats = {
    total: bookings.length,
    confirmed: bookings.filter(b => b.status === 'CONFIRMED').length,
    pending: bookings.filter(b => b.status === 'PENDING').length,
    cancelled: bookings.filter(b => b.status === 'CANCELLED').length,
    totalRevenue: bookings
      .filter(b => b.paymentStatus === 'PAID')
      .reduce((sum, b) => sum + b.amount, 0),
  }

  return (
    <div className='space-y-6'>
      {/* Header Section */}
      <div>
        <h2 className='text-3xl font-bold text-foreground'>Bookings Management</h2>
        <p className='text-muted-foreground'>
          Manage your salon appointments and customer bookings
        </p>
      </div>

      {/* Statistics Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4'>
        <CustomCard
          icon={<FontAwesomeIcon icon={faCalendar} className='w-6 h-6 text-primary' />}
          title='Total Bookings'
          className='bg-primary/10 text-primary'
        >
          {stats.total}
        </CustomCard>
        <CustomCard
          icon={<FontAwesomeIcon icon={faCheckCircle} className='w-6 h-6 text-success' />}
          title='Confirmed'
          className='bg-success/10 text-success'
        >
          {stats.confirmed}
        </CustomCard>
        <CustomCard
          icon={<FontAwesomeIcon icon={faCircleExclamation} className='w-6 h-6 text-pending' />}
          title='Pending'
          className='bg-pending/10 text-pending'
        >
          {stats.pending}
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
      {/* <Card>
        <CardBody className='p-6'> */}
      <div className='flex flex-col md:flex-row gap-4'>
        <div className='flex-1'>
          <div className='relative'>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground'
            />
            <Input
              placeholder='Search by customer, service, or email...'
              className='pl-10'
              value={searchTerm}
              // onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className='flex gap-2'>
          <CustomDropdown
            dropdownTrigger={
              <Button variant='bordered' size='sm'>
                <FontAwesomeIcon icon={faFilter} className='w-4 h-4' />
                <span className='ml-2'>Filters</span>
              </Button>
            }
            dropdownItems={[
              { label: 'All Status', value: 'all' },
              { label: 'Pending', value: 'pending' },
              { label: 'Confirmed', value: 'confirmed' },
              { label: 'Cancelled', value: 'cancelled' },
              { label: 'Completed', value: 'completed' },
            ]}
            onItemSelect={value => setStatusFilter(value)}
          />
          <CustomDropdown
            dropdownTrigger={
              <Button variant='bordered' size='sm'>
                <FontAwesomeIcon icon={faFilter} className='w-4 h-4' />
                <span className='ml-2'>Payment Status</span>
              </Button>
            }
            dropdownItems={[
              { label: 'All Payments', value: 'all' },
              { label: 'Paid', value: 'paid' },
              { label: 'Unpaid', value: 'unpaid' },
              { label: 'Refunded', value: 'refunded' },
            ]}
            onItemSelect={value => setPaymentFilter(value)}
          />
          {/* <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className='w-[150px]'>
                  <SelectValue placeholder='Status' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>All Status</SelectItem>
                  <SelectItem value='pending'>Pending</SelectItem>
                  <SelectItem value='confirmed'>Confirmed</SelectItem>
                  <SelectItem value='cancelled'>Cancelled</SelectItem>
                  <SelectItem value='completed'>Completed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                <SelectTrigger className='w-[150px]'>
                  <SelectValue placeholder='Payment' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>All Payments</SelectItem>
                  <SelectItem value='paid'>Paid</SelectItem>
                  <SelectItem value='unpaid'>Unpaid</SelectItem>
                  <SelectItem value='refunded'>Refunded</SelectItem>
                </SelectContent>
              </Select> */}
        </div>
      </div>
      {/* </CardBody>
      </Card> */}

      {/* Bookings Table */}
      {/* <Card>
        <CardBody className='p-0'> */}
      <CustomTable tableHeaders={tableHeaders} tableData={tableData} pagination />

      {/* Booking Details Dialog */}

      <CommonModal
        isOpen={!!selectedBooking}
        onOpenChange={() => setSelectedBooking(null)}
        title='Booking Details'
        size='lg'
        footer={
          selectedBooking && (
            <div className='flex justify-between items-center w-full'>
              <div className='flex gap-2'>
                {getStatusBadge(selectedBooking.status)}
                {getPaymentBadge(selectedBooking.paymentStatus)}
              </div>
              <div className='flex gap-2'>
                {selectedBooking.status === 'PENDING' && (
                  <Button
                    color='primary'
                    onPress={() => {
                      updateBookingStatus(selectedBooking.id, BookingStatus.CONFIRMED)
                      setSelectedBooking(null)
                    }}
                  >
                    Confirm Booking
                  </Button>
                )}
                {selectedBooking.status !== 'CANCELLED' && (
                  <Button
                    variant='flat'
                    onPress={() => {
                      updateBookingStatus(selectedBooking.id, BookingStatus.CANCELLED)
                      setSelectedBooking(null)
                    }}
                  >
                    Cancel Booking
                  </Button>
                )}
              </div>
            </div>
          )
        }
      >
        {selectedBooking && (
          <BookingDetailsView
            booking={selectedBooking}
            onStatusUpdate={updateBookingStatus}
            viewMode='salon'
          />
        )}
      </CommonModal>
    </div>
  )
}
