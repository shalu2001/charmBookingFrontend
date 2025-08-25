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
import { Badge, Button, Input } from '@heroui/react'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Booking } from '../../../types/booking'
import { getBookings } from '../../../actions/bookingActions'

export function BookingsPage() {
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [paymentFilter, setPaymentFilter] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)

  //useQuery to get bookings
  const { data: bookings, isPending } = useQuery<Booking[]>({
    queryKey: ['bookings'],
    queryFn: () => getBookings('1'),
  })
  if (!bookings || isPending) {
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
          <Badge className='bg-success/10 text-success border-success/20'>
            <FontAwesomeIcon icon={faCheckCircle} className='w-3 h-3 mr-1' />
            Confirmed
          </Badge>
        )
      case 'pending':
        return (
          <Badge className='bg-pending/10 text-pending border-pending/20'>
            <FontAwesomeIcon icon={faCircleExclamation} className='w-3 h-3 mr-1' />
            Pending
          </Badge>
        )
      case 'cancelled':
        return (
          <Badge className='bg-cancelled/10 text-cancelled border-cancelled/20'>
            <FontAwesomeIcon icon={faCircleXmark} className='w-3 h-3 mr-1' />
            Cancelled
          </Badge>
        )
      case 'completed':
        return (
          <Badge className='bg-accent/10 text-accent border-accent/20'>
            <FontAwesomeIcon icon={faCheckCircle} className='w-3 h-3 mr-1' />
            Completed
          </Badge>
        )
      default:
        return <Badge variant='flat'>{status}</Badge>
    }
  }

  const getPaymentBadge = (paymentStatus: string) => {
    switch (paymentStatus) {
      case 'paid':
        return <Badge className='bg-success/10 text-success border-success/20'>Paid</Badge>
      case 'unpaid':
        return <Badge className='bg-warning/10 text-warning border-warning/20'>Unpaid</Badge>
      case 'refunded':
        return <Badge className='bg-muted/10 text-muted-foreground border-muted/20'>Refunded</Badge>
      default:
        return <Badge variant='flat'>{paymentStatus}</Badge>
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
    Amount: `$${booking.price}`,
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
            ...(booking.status === 'pending'
              ? [{ label: 'Confirm Booking', value: 'Confirm Booking' }]
              : []),
            ...(booking.status !== 'cancelled'
              ? [{ label: 'Cancel Booking', value: 'Cancel Booking' }]
              : []),
            ...(booking.paymentStatus === 'unpaid'
              ? [{ label: 'Mark as Paid', value: 'Mark as Paid' }]
              : []),
          ]}
          onItemSelect={item => {
            if (item === 'Confirm Booking') updateBookingStatus(booking.id, 'confirmed')
            if (item === 'Cancel Booking') updateBookingStatus(booking.id, 'cancelled')
            if (item === 'Mark as Paid') updatePaymentStatus(booking.id, 'paid')
          }}
        />
      </div>
    ),
  }))

  // Statistics
  const stats = {
    total: bookings.length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    pending: bookings.filter(b => b.status === 'pending').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
    totalRevenue: bookings
      .filter(b => b.paymentStatus === 'paid')
      .reduce((sum, b) => sum + b.price, 0),
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

      {/* <Dialog open={!!selectedBooking} onOpenChange={() => setSelectedBooking(null)}>
        <DialogContent className='max-w-2xl'>
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
          </DialogHeader>
          {selectedBooking && (
            <div className='space-y-6'>
              <div className='grid grid-cols-2 gap-6'>
                <div>
                  <h3 className='font-semibold mb-3'>Customer Information</h3>
                  <div className='space-y-2'>
                    <div className='flex items-center gap-2'>
                      <FontAwesomeIcon icon={faUser} className='w-4 h-4 text-muted-foreground' />
                      <span>{selectedBooking.customerName}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <FontAwesomeIcon icon={faEnvelope} className='w-4 h-4 text-muted-foreground' />
                      <span>{selectedBooking.customerEmail}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <FontAwesomeIcon icon={faPhone} className='w-4 h-4 text-muted-foreground' />
                      <span>{selectedBooking.customerPhone}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className='font-semibold mb-3'>Booking Information</h3>
                  <div className='space-y-2'>
                    <div>
                      <span className='text-muted-foreground'>Service:</span>
                      <span className='ml-2 font-medium'>{selectedBooking.serviceName}</span>
                    </div>
                    <div>
                      <span className='text-muted-foreground'>Date:</span>
                      <span className='ml-2'>{selectedBooking.date}</span>
                    </div>
                    <div>
                      <span className='text-muted-foreground'>Time:</span>
                      <span className='ml-2'>{selectedBooking.time}</span>
                    </div>
                    <div>
                      <span className='text-muted-foreground'>Duration:</span>
                      <span className='ml-2'>{selectedBooking.duration} minutes</span>
                    </div>
                    <div>
                      <span className='text-muted-foreground'>Price:</span>
                      <span className='ml-2 font-semibold'>${selectedBooking.price}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex justify-between items-center pt-4 border-t'>
                <div className='flex gap-2'>
                  {getStatusBadge(selectedBooking.status)}
                  {getPaymentBadge(selectedBooking.paymentStatus)}
                </div>
                <div className='flex gap-2'>
                  {selectedBooking.status === 'pending' && (
                    <Button
                      onClick={() => {
                        updateBookingStatus(selectedBooking.id, 'confirmed')
                        setSelectedBooking(null)
                      }}
                      className='bg-success hover:bg-success/90'
                    >
                      Confirm Booking
                    </Button>
                  )}
                  {selectedBooking.status !== 'cancelled' && (
                    <Button
                      variant='ghost'
                      onPress={() => {
                        updateBookingStatus(selectedBooking.id, 'cancelled')
                        setSelectedBooking(null)
                      }}
                    >
                      Cancel Booking
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog> */}
    </div>
  )
}
