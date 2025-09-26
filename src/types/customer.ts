export interface Customer {
  customerId: string
  firstName: string
  lastName: string
  email: string
  createdAt: string
  phone: string
}

export interface LoginResponse {
  token: string
  customerId: string
  firstName: string
  lastName: string
  email: string
}

export interface UpdatePassword {
  oldPassword: string
  newPassword: string
}

export interface BookingDetails {
  id: string
  user_id: string
  salon_id: string
  salon_service_id: string
  amount: number
  payment_id: string | null
  worker_id: string
  booking_date: string
  start_time: string
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED' | string
  created_at: string
  serviceName: string
  salonName: string
}

export interface CreateReview {
  rating: number
  comment: string
  salonId: string
}
