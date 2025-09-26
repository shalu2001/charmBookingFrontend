import { AvailableWorkersResponse, SalonWorker } from '../../types/booking'
import { formatTime } from '../../utils/helper'

export function WorkerStep({
  availableWorkers,
  isWorkersPending,
  selectedWorker,
  setSelectedWorker,
}: {
  availableWorkers?: AvailableWorkersResponse
  isWorkersPending: boolean
  selectedWorker: SalonWorker | null
  setSelectedWorker: (w: SalonWorker) => void
}) {
  return (
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
              }}
              className={`p-4 rounded-lg border bg-white shadow-sm hover:shadow-md transition-all flex items-center gap-4
                ${
                  selectedWorker?.workerId === slot.worker.workerId
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-primary/50'
                }`}
            >
              <div className='relative w-12 h-12'>
                <div className='absolute inset-0 rounded-full bg-primary opacity-10'></div>
                <div className='relative w-full h-full rounded-full flex items-center justify-center'>
                  <span className='text-primary font-semibold text-lg'>
                    {slot.worker.name.charAt(0)}
                  </span>
                </div>
              </div>
              <div className='flex flex-col items-start'>
                <span className='font-medium'>{slot.worker.name}</span>
                <span className='text-sm text-gray-500'>{formatTime(slot.startTime)}</span>
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
  )
}
