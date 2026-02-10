import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import { createViewDay, createViewWeek } from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import { useQuery } from '@tanstack/react-query'
import { getSalonSchedule } from '../actions/salonActions'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import { SalonAdmin } from '../types/salon'
import { useState, useEffect } from 'react'
import 'temporal-polyfill/global'
import '@schedule-x/theme-default/dist/index.css'

interface ScheduleEvent {
  id: string
  title: string
  start: string
  end: string
  type: 'AVAILABLE' | 'LEAVE' | 'BOOKING'
  status?: string
}

interface Worker {
  workerId: string
  name: string
}

interface ScheduleResponse {
  events: ScheduleEvent[]
  workers: Worker[]
}

export function WorkerScheduler() {
  const admin = useAuthUser<SalonAdmin>()
  const [selectedWorkers, setSelectedWorkers] = useState<string[]>([])
  const eventsService = useState(() => createEventsServicePlugin())[0]

  const { data: scheduleData, isLoading } = useQuery<ScheduleResponse>({
    queryKey: ['workerSchedules', admin?.salonId],
    queryFn: () => getSalonSchedule(admin!.salonId),
    enabled: !!admin?.salonId,
  })

  const workersArray = scheduleData?.workers || []
  const uniqueWorkers = workersArray.map(worker => worker.name)

  const calendar = useCalendarApp({
    views: [createViewDay(), createViewWeek()],
    plugins: [eventsService],
    calendars: {
      BOOKING: {
        colorName: 'booking',
        lightColors: {
          main: '#3b82f6',
          container: '#dbeafe',
          onContainer: '#1e40af',
        },
      },
      LEAVE: {
        colorName: 'leave',
        lightColors: {
          main: '#f59e0b',
          container: '#fef3c7',
          onContainer: '#92400e',
        },
      },
    },
  })

  const toggleWorkerFilter = (workerName: string) => {
    setSelectedWorkers(prev =>
      prev.includes(workerName) ? prev.filter(name => name !== workerName) : [...prev, workerName],
    )
  }

  useEffect(() => {
    if (!scheduleData?.events) return

    const eventsArray = scheduleData.events
    const filteredEvents =
      selectedWorkers.length === 0
        ? eventsArray
        : eventsArray.filter(event => selectedWorkers.includes(event.title))

    const calendarEvents = filteredEvents.map(event => ({
      id: event.id,
      title: `${event.title} (${event.type})`,
      start: Temporal.ZonedDateTime.from(event.start + '[UTC]'),
      end: Temporal.ZonedDateTime.from(event.end + '[UTC]'),
    }))

    calendar?.events.set(calendarEvents)
  }, [scheduleData?.events, selectedWorkers, calendar])

  if (isLoading) {
    return <div className='p-4 text-center'>Loading worker schedules...</div>
  }

  if (!scheduleData?.events.length) {
    return (
      <div className='p-8 text-center bg-gray-50 rounded-lg'>
        <p className='text-gray-500'>No worker schedules found</p>
      </div>
    )
  }

  return (
    <div className='space-y-4'>
      <div className='mb-4'>
        <h3 className='text-lg font-semibold mb-2'>Filter by Workers</h3>
        <div className='flex flex-wrap gap-2 mb-4'>
          {uniqueWorkers.map(workerName => (
            <button
              key={workerName}
              onClick={() => toggleWorkerFilter(workerName)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedWorkers.includes(workerName)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {workerName}
            </button>
          ))}
          {selectedWorkers.length > 0 && (
            <button
              onClick={() => setSelectedWorkers([])}
              className='px-3 py-1 bg-red-100 text-red-700 hover:bg-red-200 rounded-full text-sm font-medium'
            >
              Clear All
            </button>
          )}
        </div>
        <p className='text-sm text-gray-600'>
          {selectedWorkers.length === 0
            ? `Showing all workers (${uniqueWorkers.length})`
            : `Showing ${selectedWorkers.length} of ${uniqueWorkers.length} workers`}
        </p>
      </div>
      <div className='w-full h-screen'>
        <ScheduleXCalendar calendarApp={calendar} />
      </div>
    </div>
  )
}
