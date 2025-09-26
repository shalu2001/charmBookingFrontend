import { Button } from '@heroui/react'
import { format } from 'date-fns'
import { SalonWorker } from '../../types/booking'
import { Service } from '../../types/salon'

export function AppointmentSidebar({
  serviceData,
  selectedDate,
  selectedTime,
  selectedWorker,
  selectedStep,
  setSelectedStep,
  handleContinue,
}: {
  serviceData: Service | undefined
  selectedDate: Date
  selectedTime: string | null
  selectedWorker: SalonWorker | null
  selectedStep: number
  setSelectedStep: (cb: (prev: number) => number) => void
  handleContinue: () => void
}) {
  return (
    <div className='mt-8 mr-4 h-[60vh] rounded-lg lg:w-1/3 bg-white shadow-lg border-l border-gray-200 p-8 flex flex-col'>
      <h2 className='text-xl font-semibold mb-4'>Appointment Details</h2>
      <div className='space-y-3 flex-1'>
        <div className='pb-4 border-b'>
          <p className='text-sm text-gray-500 mb-1'>Service</p>
          <p className='font-medium'>{serviceData?.name || '—'}</p>
          <p className='text-sm text-primary'>LKR {serviceData?.price || '—'}</p>
          <p className='text-xs text-gray-500'>
            {(serviceData?.duration ?? 0) + (serviceData?.bufferTime ?? 0)} minutes
          </p>
        </div>
        <div>
          <p className='text-sm text-gray-500'>Selected Date</p>
          <p className='font-medium'>{format(selectedDate, 'EEEE, MMM d yyyy')}</p>
        </div>
        <div>
          <p className='text-sm text-gray-500'>Selected Time</p>
          <p className='font-medium'>
            {selectedTime
              ? (() => {
                  const [h, m] = selectedTime.split(':').map(Number)
                  return format(new Date(2000, 0, 1, h, m), 'h:mm a')
                })()
              : '—'}
          </p>
        </div>
        <div>
          <p className='text-sm text-gray-500'>Selected Worker</p>
          <p className='font-medium'>{selectedWorker?.name || '—'}</p>
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        {selectedStep > 0 && (
          <Button
            variant='flat'
            className='w-full'
            onClick={() => setSelectedStep(prev => prev - 1)}
          >
            Back
          </Button>
        )}
        {selectedStep < 3 ? (
          <Button
            color='primary'
            className='w-full'
            isDisabled={
              (selectedStep === 0 && !selectedTime) || (selectedStep === 1 && !selectedWorker)
            }
            onClick={handleContinue}
          >
            {(() => {
              switch (selectedStep) {
                case 2:
                  return 'Proceed to Billing Information'
                case 1:
                  return 'Show Booking Confirmation'
                default:
                  return 'Continue to Select Worker'
              }
            })()}
          </Button>
        ) : null}
      </div>
    </div>
  )
}
