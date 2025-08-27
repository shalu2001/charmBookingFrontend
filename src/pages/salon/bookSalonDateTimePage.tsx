import { useState } from 'react'
import { format, addDays, startOfToday } from 'date-fns'
import { useQuery } from '@tanstack/react-query'
import { getAvailableTimeSlots } from '../../actions/bookingActions'
import { TimeSlotResponse } from '../../types/booking'
import { Calendar, Modal, ModalBody, ModalContent, ModalHeader, Button } from '@heroui/react'
import { today, getLocalTimeZone, CalendarDate } from '@internationalized/date'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSearchParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export const BookTimeAndDate = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const salonId = searchParams.get('salonId') || undefined
  const serviceId = searchParams.get('serviceId') || undefined

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
    isPending,
    refetch,
  } = useQuery<TimeSlotResponse>({
    queryKey: ['availableSlots', salonId, serviceId, format(selectedDate, 'yyyy-MM-dd')],
    queryFn: () => getAvailableTimeSlots(salonId!, serviceId!, format(selectedDate, 'yyyy-MM-dd')),
    enabled: !!salonId && !!serviceId,
  })

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setSelectedTime(null)
    setCalendarValue(new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate()))
    refetch()
  }

  return (
    <div className='flex h-screen w-screen bg-gray-50'>
      {/* Main Booking Area */}
      <div className='flex flex-col flex-1 px-10 py-8'>
        <h1 className='text-2xl font-semibold mb-6'>Book Your Appointment</h1>

        {/* Date Selection (Quick strip + Calendar trigger) */}
        <div className='flex flex-col lg:flex-row gap-6 mb-8 items-start'>
          {/* 7-day quick select */}
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

          {/* Calendar Icon Button (opens modal) */}
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
        <div className='flex-1 overflow-y-auto'>
          {isPending && (
            <div className='text-center text-gray-500 p-6'>Loading available slots...</div>
          )}

          {availableSlots?.isHoliday ? (
            <div className='text-center p-6 bg-red-50 text-red-600 rounded-xl shadow-sm'>
              This date is marked as a holiday. No slots available.
            </div>
          ) : (
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
              {availableSlots?.times?.length ? (
                availableSlots.times.map(time => {
                  const [h, m] = time.split(':').map(Number)
                  const display = new Date(2000, 0, 1, h, m)
                  return (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`rounded-lg px-4 py-3 text-center border transition-all
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

      {/* Appointment Details Sidebar */}
      <div className='w-full lg:w-1/3 bg-white shadow-lg border-l border-gray-200 p-8 flex flex-col'>
        <h2 className='text-xl font-semibold mb-4'>Appointment Details</h2>

        <div className='space-y-3 flex-1'>
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
        </div>

        {/* Dummy Payment CTA */}
        <button
          disabled={!selectedTime}
          className={`mt-auto py-3 rounded-lg font-medium transition-all
            ${
              selectedTime
                ? 'bg-primary text-white hover:bg-primary/90 shadow'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
        >
          {selectedTime ? 'Continue' : 'Select a time slot'}
        </button>
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
    </div>
  )
}

export default BookTimeAndDate
