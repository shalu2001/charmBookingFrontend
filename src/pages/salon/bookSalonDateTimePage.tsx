import { useEffect, useState } from 'react'
import { format, addDays, startOfToday } from 'date-fns'
import { useQuery } from '@tanstack/react-query'
import { getAvailableTimeSlots, getAvailableWorkers } from '../../actions/bookingActions'
import {
  AvailableWorkersResponse,
  SalonWorker,
  TimeSlotResponse,
  WorkerSlot,
} from '../../types/booking'
import { Calendar, Modal, ModalBody, ModalContent, ModalHeader, Button } from '@heroui/react'
import { today, getLocalTimeZone, CalendarDate } from '@internationalized/date'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSearchParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { getServiceById } from '../../actions/salonActions'
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import { LoginPromptModal } from '../../components/loginPromptModalProps'

export const BookTimeAndDate = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const salonId = searchParams.get('salonId') || undefined
  const serviceId = searchParams.get('serviceId') || undefined
  const [selectedStep, setSelectedStep] = useState(0)
  const [selectedWorker, setSelectedWorker] = useState<SalonWorker | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<WorkerSlot | null>(null)
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const isAuthenticated = useIsAuthenticated()

  useEffect(() => {
    if (!isAuthenticated) {
      setShowLoginPrompt(true)
    }
  }, [])
  const handleLoginPromptClose = () => {
    setShowLoginPrompt(false)
    navigate(-1)
  }

  const returnUrl = `/book/timeslot?salonId=${salonId}&serviceId=${serviceId}`

  // Redirect to home if salonId or serviceId is missing
  if (!salonId || !serviceId) {
    navigate('/')
  }

  // JS date for backend formatting
  const jsToday = startOfToday()
  const [selectedDate, setSelectedDate] = useState<Date>(jsToday)

  // HeroUI Calendar expects DateValue
  const tz = getLocalTimeZone()
  const [calendarValue, setCalendarValue] = useState(today(tz))

  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  // next 7 days strip
  const dates = Array.from({ length: 7 }, (_, i) => addDays(jsToday, i))

  const {
    data: availableSlots,
    isPending: isTimeSlotsFetching,
    refetch: refetchTimeSlots,
  } = useQuery<TimeSlotResponse>({
    queryKey: ['availableSlots', salonId, serviceId, format(selectedDate, 'yyyy-MM-dd')],
    queryFn: () => getAvailableTimeSlots(salonId!, serviceId!, format(selectedDate, 'yyyy-MM-dd')),
    enabled: !!salonId && !!serviceId,
  })

  const { data: availableWorkers, isPending: isWorkersPending } =
    useQuery<AvailableWorkersResponse>({
      queryKey: [
        'availableWorkers',
        salonId,
        serviceId,
        format(selectedDate, 'yyyy-MM-dd'),
        selectedTime,
      ],
      queryFn: () =>
        getAvailableWorkers(
          salonId!,
          serviceId!,
          format(selectedDate, 'yyyy-MM-dd'),
          selectedTime!,
        ),
      enabled: !!salonId && !!serviceId && !!selectedTime,
    })

  const { data: serviceData, isPending: isServicePending } = useQuery({
    queryKey: ['serviceData', salonId, serviceId],
    queryFn: () => getServiceById(serviceId!),
    enabled: !!serviceId,
  })

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setSelectedTime(null)
    setCalendarValue(new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate()))
    refetchTimeSlots()
  }

  const handleContinue = () => {
    switch (selectedStep) {
      case 0:
        if (selectedTime) {
          setSelectedStep(1)
        }
        break
      case 1:
        if (selectedWorker) {
          setSelectedStep(2)
        }
        break
      case 2:
        // Handle payment initiation
        console.log('Proceeding to payment')
        break
    }
  }

  //   useEffect(() => {
  //     if (window.payhere) {
  //       window.payhere.onCompleted = function onCompleted(orderId: string) {
  //         console.log('Payment completed. OrderID:', orderId)
  //         navigate('/booking-success?orderId=' + orderId)
  //       }

  //       window.payhere.onDismissed = function onDismissed() {
  //         console.log('Payment dismissed')
  //       }

  //       window.payhere.onError = function onError(error: string) {
  //         console.error('Error:', error)
  //       }
  //     }
  //   }, [])

  //   const handlePay = () => {
  //     if (window.payhere) {
  //     }
  //   }

  return (
    <div className='flex h-screen w-screen bg-gray-50'>
      {/* Main Booking Area (changes per step) */}
      <div className='flex flex-col flex-1 items-center px-10 py-8'>
        {selectedStep === 0 && (
          <div>
            {/* Step 0 - Date & Time */}
            <h1 className='text-2xl font-semibold mb-6'>Book Your Appointment</h1>

            {/* 7-day quick select + Calendar Button */}
            <div className='flex flex-col lg:flex-row gap-6 mb-8 items-start'>
              {/* Quick Date Picker */}
              <div className='flex gap-4 overflow-x-auto pb-2'>
                {dates.map(date => (
                  <button
                    key={date.toISOString()}
                    onClick={() => handleDateSelect(date)}
                    className={`flex flex-col items-center justify-center rounded-xl px-5 py-3 min-w-[80px]
                  transition-all border
                  ${
                    date.toDateString() === selectedDate?.toDateString()
                      ? 'bg-primary text-white border-primary shadow-md'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-primary hover:bg-primary/5'
                  }`}
                  >
                    <span className='text-sm'>{format(date, 'EEE')}</span>
                    <span className='text-lg font-bold'>{format(date, 'd')}</span>
                  </button>
                ))}
              </div>

              {/* Calendar Icon Button */}
              <Button
                isIconOnly
                variant='flat'
                className='bg-white shadow rounded-lg border'
                onClick={() => setIsCalendarOpen(true)}
              >
                <FontAwesomeIcon icon={faCalendar} className='w-5 h-5' />
              </Button>
            </div>

            {/* Time Slots */}
            <div className='flex-1 overflow-y-auto flex flex-col items-center'>
              {isTimeSlotsFetching ? (
                <div className='text-center text-gray-500 p-6'>Loading available slots...</div>
              ) : availableSlots?.isHoliday ? (
                <div className='text-center p-6 bg-red-50 text-red-600 rounded-xl shadow-sm'>
                  This date is marked as a holiday. No slots available.
                </div>
              ) : (
                <div className='flex flex-col items-center gap-4 max-h-[700px] overflow-y-auto p-2'>
                  {availableSlots?.times?.length ? (
                    availableSlots.times.map(time => {
                      const [h, m] = time.split(':').map(Number)
                      const display = new Date(2000, 0, 1, h, m)
                      return (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`w-72 rounded-lg px-6 py-3 border text-sm font-medium transition-all text-center
                        ${
                          selectedTime === time
                            ? 'bg-primary text-white border-primary shadow-md'
                            : 'bg-white text-gray-700 border-gray-200 hover:bg-primary/5 hover:border-primary'
                        }`}
                        >
                          {format(display, 'h:mm a')}
                        </button>
                      )
                    })
                  ) : (
                    <div className='text-gray-500 p-6'>No slots available for this day</div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {selectedStep === 1 && (
          <div className='flex flex-col w-1/2 gap-6'>
            <h1 className='text-2xl font-semibold mb-2'>Choose a Worker</h1>

            {isWorkersPending ? (
              <div className='text-center text-gray-500 p-6'>Loading available workers...</div>
            ) : availableWorkers && availableWorkers.slots.length > 0 ? (
              <div className='flex flex-col gap-4'>
                {availableWorkers.slots.map(slot => (
                  <button
                    key={`${slot.worker.workerId}-${slot.startTime}`}
                    onClick={() => {
                      setSelectedWorker(slot.worker)
                      setSelectedSlot(slot)
                    }}
                    className={`p-4 rounded-lg border bg-white shadow-sm hover:shadow-md transition-all flex items-center gap-4
              ${
                selectedWorker?.workerId === slot.worker.workerId
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200 hover:border-primary/50'
              }`}
                  >
                    {/* Avatar Circle with First Letter */}
                    <div className='relative w-12 h-12'>
                      <div className='absolute inset-0 rounded-full bg-primary opacity-10'></div>
                      <div className='relative w-full h-full rounded-full flex items-center justify-center'>
                        <span className='text-primary font-semibold text-lg'>
                          {slot.worker.name.charAt(0)}
                        </span>
                      </div>
                    </div>

                    {/* Worker Info */}
                    <div className='flex flex-col items-start'>
                      <span className='font-medium'>{slot.worker.name}</span>
                      <span className='text-sm text-gray-500'>{slot.startTime}</span>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className='text-center p-6 bg-gray-50 rounded-lg text-gray-500'>
                No workers available for this time slot.
              </div>
            )}
          </div>
        )}

        {selectedStep === 2 && (
          <div>
            <h1 className='text-2xl font-semibold mb-6'>Payment</h1>
            {/* Payment Form */}
          </div>
        )}
      </div>

      {/* Appointment Details Sidebar (always visible) */}
      <div className='w-full lg:w-1/3 bg-white shadow-lg border-l border-gray-200 p-8 flex flex-col'>
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
          <Button
            color='primary'
            className='w-full'
            isDisabled={
              (selectedStep === 0 && !selectedTime) || (selectedStep === 1 && !selectedWorker)
            }
            onClick={handleContinue}
          >
            {selectedStep === 2
              ? 'Continue to Pay with Payhere'
              : selectedStep === 1
              ? 'Continue to Payment'
              : 'Continue to Select Worker'}
          </Button>
        </div>
      </div>

      {/* Calendar Modal */}
      <Modal isOpen={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
        <ModalContent>
          <ModalHeader>Select a Date</ModalHeader>
          <ModalBody>
            <Calendar
              aria-label='Pick a date'
              value={calendarValue}
              onChange={val => {
                setCalendarValue(val)
                const d = val.toDate(tz)
                handleDateSelect(new Date(d.getFullYear(), d.getMonth(), d.getDate()))
                setIsCalendarOpen(false)
              }}
              minValue={today(tz)}
              className='rounded-md'
            />
          </ModalBody>
        </ModalContent>
      </Modal>
      <LoginPromptModal
        isOpen={showLoginPrompt}
        onClose={handleLoginPromptClose}
        returnUrl={returnUrl}
      />
    </div>
  )
}

export default BookTimeAndDate
