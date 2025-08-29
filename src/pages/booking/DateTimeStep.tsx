import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Modal, ModalContent, ModalHeader, ModalBody, Calendar } from '@heroui/react'
import { format } from 'date-fns'
import { today, CalendarDate } from '@internationalized/date'
import { TimeSlotResponse, SalonWorker } from '../../types/booking'

export function DateTimeStep({
  dates,
  selectedDate,
  onDateSelect,
  isCalendarOpen,
  setIsCalendarOpen,
  calendarValue,
  setCalendarValue,
  tz,
  availableSlots,
  isTimeSlotsFetching,
  selectedTime,
  setSelectedTime,
  setSelectedWorker,
}: {
  dates: Date[]
  selectedDate: Date
  onDateSelect: (date: Date) => void
  isCalendarOpen: boolean
  setIsCalendarOpen: (open: boolean) => void
  calendarValue: CalendarDate
  setCalendarValue: (val: CalendarDate) => void
  tz: string
  availableSlots?: TimeSlotResponse
  isTimeSlotsFetching: boolean
  selectedTime: string | null
  setSelectedTime: (t: string) => void
  setSelectedWorker: (w: SalonWorker | null) => void
}) {
  return (
    <div>
      <h1 className='text-2xl font-semibold mb-6'>Book Your Appointment</h1>
      <div className='flex flex-col lg:flex-row gap-6 mb-8 items-start'>
        <div className='flex gap-4 overflow-x-auto pb-2'>
          {dates.map(date => (
            <button
              key={date.toISOString()}
              onClick={() => onDateSelect(date)}
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
        <Button
          isIconOnly
          variant='flat'
          className='bg-white shadow rounded-lg border'
          onClick={() => setIsCalendarOpen(true)}
        >
          <FontAwesomeIcon icon={faCalendar} className='w-5 h-5' />
        </Button>
      </div>
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
                    onClick={() => {
                      setSelectedTime(time)
                      setSelectedWorker(null)
                    }}
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
                onDateSelect(new Date(d.getFullYear(), d.getMonth(), d.getDate()))
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
