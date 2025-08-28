export interface Booking {
  id: string
  customerId: string
  customerName: string
  customerEmail: string
  customerPhone: string
  serviceId: string
  serviceName: string
  date: string
  time: string
  duration: number
  amount: number
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  paymentStatus: 'paid' | 'unpaid' | 'refunded'
  notes?: string
}

export interface TimeSlotResponse {
  salonId: string
  serviceId: string
  date: string
  isHoliday: boolean
  times: string[]
}

export interface SalonWorker {
  workerId: string
  name: string
  salonId: string
  services: Array<{
    serviceId: string
    salonId: string
    name: string
  }>
}

export interface WorkerSlot {
  serviceId: string
  date: string
  startTime: string
  duration: number
  buffer: number
  worker: SalonWorker
}

export interface AvailableWorkersResponse {
  slots: WorkerSlot[]
}
