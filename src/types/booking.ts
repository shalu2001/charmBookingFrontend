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
