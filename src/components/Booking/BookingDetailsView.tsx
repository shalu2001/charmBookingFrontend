import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUser,
  faEnvelope,
  faPhone,
  faCalendar,
  faXmark,
  faClock,
  faDollarSign,
} from '@fortawesome/free-solid-svg-icons'
import { Booking, BookingStatus, CustomerBooking } from '../../types/booking'
import { Button } from '@heroui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { cancelBookingById } from '../../actions/customerActions'

interface BookingDetailsViewProps {
  booking: Booking | CustomerBooking
  onStatusUpdate?: (bookingId: string, status: Booking['status']) => void
  viewMode: 'customer' | 'salon'
}

const BookingDetailsView: React.FC<BookingDetailsViewProps> = ({
  booking,
  onStatusUpdate,
  viewMode,
}) => {
  const queryClient = useQueryClient()
  const isCustomerView = viewMode === 'customer'
  const customerBooking = booking as CustomerBooking
  const salonBooking = booking as Booking

  // // Add cancel booking mutation
  // const { mutate: cancelBooking, isPending: isCancelling } = useMutation<void, unknown, string>({
  //   mutationFn: cancelBookingById,
  //   onSuccess: () => {
  //     // Invalidate and refetch bookings
  //     queryClient.invalidateQueries({ queryKey: ['customerBookings'] })
  //   },
  // })

  const canCancel = () => {
    if (booking.status === BookingStatus.CANCELLED) return false

    const bookingDate = new Date(`${booking.date}T${booking.time}`)
    const now = new Date()
    const hoursUntilBooking = (bookingDate.getTime() - now.getTime()) / (1000 * 60 * 60)

    return hoursUntilBooking > 24
  }

  return (
    <div className='grid grid-cols-2 gap-6 pb-10'>
      {/* Left Column - Customer Information */}
      <div className='space-y-4'>
        {viewMode === 'salon' ? (
          <>
            <h3 className='text-lg font-semibold'>Customer Information</h3>
            <div className='space-y-3'>
              <div className='flex items-center gap-2'>
                <FontAwesomeIcon icon={faUser} className='w-4 h-4 text-muted-foreground' />
                <span>{salonBooking.customerName}</span>
              </div>
              <div className='flex items-center gap-2'>
                <FontAwesomeIcon icon={faEnvelope} className='w-4 h-4 text-muted-foreground' />
                <span>{salonBooking.customerEmail}</span>
              </div>
              <div className='flex items-center gap-2'>
                <FontAwesomeIcon icon={faPhone} className='w-4 h-4 text-muted-foreground' />
                <span>{salonBooking.customerPhone}</span>
              </div>
            </div>
          </>
        ) : (
          <>
            <h3 className='text-lg font-semibold'>Salon Information</h3>
            <div className='flex items-center gap-2'>
              <FontAwesomeIcon icon={faUser} className='w-4 h-4 text-muted-foreground' />
              <span>{customerBooking?.salonName}</span>
            </div>
            <div className='flex items-center gap-2'>
              <FontAwesomeIcon icon={faEnvelope} className='w-4 h-4 text-muted-foreground' />
              <span>{customerBooking.serviceName}</span>
            </div>
          </>
        )}
      </div>

      {/* Right Column - Booking Information */}
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Booking Information</h3>
        <div className='space-y-3'>
          <div className='flex items-center gap-2'>
            <FontAwesomeIcon icon={faCalendar} className='w-4 h-4 text-muted-foreground' />
            <span>{booking.date}</span>
          </div>
          <div className='flex items-center gap-2'>
            <FontAwesomeIcon icon={faClock} className='w-4 h-4 text-muted-foreground' />
            <span>{booking.time}</span>
            <span className='text-sm text-muted-foreground'>({booking.duration} minutes)</span>
          </div>
          <div className='flex items-center gap-2'>
            <FontAwesomeIcon icon={faDollarSign} className='w-4 h-4 text-muted-foreground' />
            <span className='font-semibold'>LKR {booking.amount}</span>
          </div>
          <div className='pt-2'>
            <p className='text-sm text-muted-foreground'>Service</p>
            <p className='font-medium'>{booking.serviceName}</p>
          </div>
          {viewMode === 'salon' && (
            <div className='pt-2'>
              <p className='text-sm text-muted-foreground'>Assigned Worker</p>
              <p className='font-medium'>{booking.workerName}</p>
            </div>
          )}
          {isCustomerView && (
            <>
              <div className='pt-2'>
                <p className='text-sm text-muted-foreground'>Cancellation Policy</p>
                <p className={!canCancel() ? 'text-destructive' : ''}>
                  {canCancel()
                    ? 'Free cancellation up to 24 hours before appointment'
                    : 'Cancellation period has expired'}
                </p>
              </div>
              {/* <div className='pt-2'>
                <Button
                  color='danger'
                  variant='flat'
                  className='w-full mt-4'
                  isDisabled={isCancelling}
                  startContent={<FontAwesomeIcon icon={faXmark} className='w-4 h-4' />}
                  onPress={() => {
                    if (window.confirm('Are you sure you want to cancel this booking?')) {
                      cancelBooking(customerBooking.id)
                    }
                  }}
                >
                  {isCancelling ? 'Cancelling...' : 'Cancel Booking'}
                </Button>
              </div> */}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default BookingDetailsView
