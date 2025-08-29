import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import { getSalonProfile } from '../../actions/salonActions'
import { SalonWorker } from '../../types/booking'
import { Customer } from '../../types/customer'
import { Service } from '../../types/salon'
import { formatTime } from '../../utils/helper'

// --- Step 2: Booking Confirmation ---
export function BookingConfirmationStep({
  serviceData,
  selectedDate,
  selectedTime,
  selectedWorker,
  salonId,
}: {
  serviceData: Service
  selectedDate: Date
  selectedTime: string | null
  selectedWorker: SalonWorker | null
  salonId: string | undefined
}) {
  const user = useAuthUser<Customer>()
  console.log(user)
  const { data: salon } = useQuery({
    queryKey: ['salon', salonId],
    queryFn: () => getSalonProfile(salonId!),
    enabled: !!salonId,
  })

  return (
    <div>
      <h1 className='text-3xl font-bold mb-8 text-center text-primary'>Confirm Your Booking</h1>
      <div className='bg-white rounded-xl shadow-lg p-8 space-y-6 border border-primary-100 max-w-md mx-auto'>
        <div className='flex items-center justify-between'>
          <span className='font-semibold text-gray'>Salon:</span>
          <span className='font-bold text-primary text-lg'>{salon?.name || 'N/A'}</span>
        </div>
        <div className='flex items-center justify-between'>
          <span className='font-semibold text-gray-600'>Service:</span>
          <span className='font-bold text-primary text-lg'>{serviceData?.name || 'N/A'}</span>
        </div>
        <div className='flex items-center justify-between'>
          <span className='font-semibold text-gray-600'>Date:</span>
          <span className='font-bold text-primary text-lg'>
            {selectedDate ? format(selectedDate, 'do MMMM yyyy') : 'N/A'}
          </span>
        </div>
        <div className='flex items-center justify-between'>
          <span className='font-semibold text-gray-600'>Time:</span>
          <span className='font-bold text-primary text-lg'>
            {selectedTime ? formatTime(selectedTime) : 'N/A'}
          </span>
        </div>
        <div className='flex items-center justify-between'>
          <span className='font-semibold text-gray-600'>Worker:</span>
          <span className='font-bold text-primary text-lg'>
            {selectedWorker ? (
              selectedWorker.name
            ) : (
              <span className='italic text-gray-400'>Any</span>
            )}
          </span>
        </div>
        <div className='flex items-center justify-between'>
          <span className='font-semibold text-gray-600'>Booked By:</span>
          <span className='font-bold text-primary text-lg'>
            {user?.firstName} {user?.lastName}
          </span>
        </div>
        <div className='flex items-center justify-between'>
          <span className='font-semibold text-gray-600'>Email:</span>
          <span className='font-bold text-primary text-lg'>{user?.email}</span>
        </div>
      </div>
      <p className='mt-6 text-center text-gray-500 text-base'>
        <span className='font-medium text-primary'>
          Please review your booking details carefully before proceeding.
        </span>
      </p>
    </div>
  )
}
