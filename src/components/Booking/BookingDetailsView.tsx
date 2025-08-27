import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUser,
  faEnvelope,
  faPhone,
  faCalendar,
  faClock,
  faDollarSign,
} from '@fortawesome/free-solid-svg-icons'
import { Booking } from '../../types/booking'

interface BookingDetailsViewProps {
  booking: Booking
  onStatusUpdate?: (bookingId: string, status: Booking['status']) => void
}

const BookingDetailsView: React.FC<BookingDetailsViewProps> = ({ booking, onStatusUpdate }) => {
  return (
    <div className='grid grid-cols-2 gap-6'>
      {/* Left Column - Customer Information */}
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Customer Information</h3>
        <div className='space-y-3'>
          <div className='flex items-center gap-2'>
            <FontAwesomeIcon icon={faUser} className='w-4 h-4 text-muted-foreground' />
            <span>{booking.customerName}</span>
          </div>
          <div className='flex items-center gap-2'>
            <FontAwesomeIcon icon={faEnvelope} className='w-4 h-4 text-muted-foreground' />
            <span>{booking.customerEmail}</span>
          </div>
          <div className='flex items-center gap-2'>
            <FontAwesomeIcon icon={faPhone} className='w-4 h-4 text-muted-foreground' />
            <span>{booking.customerPhone}</span>
          </div>
        </div>
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
            <span>
              {booking.time} ({booking.duration} minutes)
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <FontAwesomeIcon icon={faDollarSign} className='w-4 h-4 text-muted-foreground' />
            <span className='font-semibold'>LKR {booking.amount}</span>
          </div>
          <div className='pt-2'>
            <p className='text-sm text-muted-foreground'>Service</p>
            <p className='font-medium'>{booking.serviceName}</p>
          </div>
          {booking.notes && (
            <div className='pt-2'>
              <p className='text-sm text-muted-foreground'>Notes</p>
              <p>{booking.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BookingDetailsView
