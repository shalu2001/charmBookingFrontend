export interface BaseSalon {
  id: string
  name: string
  ownerName: string
  location: string
  phone: string
  email: string
  description: string
  longitude: string
  latitude: string
}

export enum DayOfWeek {
  Sunday = 'Sunday',
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday',
}

export interface Salon extends BaseSalon {
  services: Service[]
  reviews: Review[]
  weeklyHours: {
    id: string
    day_of_week: DayOfWeek
    open_time: string
    close_time: string
  }[]
  images: SalonImage[]
}

export interface SalonImage {
  id: number
  salonId: string
  url: string
  createdAt: string
}

export interface SalonRanked extends Salon {
  services: ServiceWithAvailability[]
  rank: number
  distanceKm: number
}

export interface ServiceModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  categories: Category[]
  onSubmit: (e: React.FormEvent) => void
  formData: ServiceFormData
  setFormData: React.Dispatch<React.SetStateAction<ServiceFormData>>
  isLoading: boolean
  mode: 'add' | 'edit' // Add this to handle different modal modes
}

export interface Category {
  categoryId: number
  name: string
}
export interface CategorySelection {
  categoryId: number
  name: string
  selected: boolean
}

export interface Service {
  serviceId: string
  salonId: string
  name: string
  price: number
  duration: number
  bufferTime: number
  categories: Array<{
    categoryId: number
    name: string
  }>
}

export interface BookingSlot {
  serviceId: string
  date: string
  startTime: string
  duration: number
  buffer: number
  worker: SalonWorker
}

export type ServiceWithAvailability = Service & {
  slots: BookingSlot[]
  nextAvailableSlot?: BookingSlot
}

export interface ServiceFormData {
  name: string
  price: string
  duration: string
  bufferTime?: string
  categoryIds: number[]
}

export interface CreateServiceDTO {
  salonId: string
  name: string
  price: number
  duration: number
  bufferTime: number
  categoryIds: number[]
}

export interface Review {
  reviewId: number
  rating: number
  comment: string
  createdAt: string
  user: User
}

export interface User {
  firstName: string
  lastName: string
}

export type RegisterSalonDTO = {
  email: string
  password: string
  ownerName: string
  location: string
  latitude: number
  longitude: number
  name: string
  phone: string
  description: string
  salonImages: File[]
}

export interface DashboardLayoutProps {
  children: React.ReactNode
  currentPage: string
  onPageChange: (page: string) => void
}

export interface PaymentMethod {
  id: number
  name: string
  identifier: string
  status: 'connected' | 'disconnected' | 'pending'
  isDefault: boolean
}

export interface SalonAdmin {
  adminId: string
  email: string
  salonId: string
}

export interface SalonRankedRequestDto {
  categoryId: number
  longitude: number
  latitude: number
  date: string
  time: string
}

export interface WeeklyHours {
  id: string
  salon_id: string
  day_of_week: DaysOfWeek
  open_time: string
  close_time: string
}

export enum DaysOfWeek {
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday',
  Sunday = 'Sunday',
}

export interface BaseSalonWorker {
  name: string
  salonId: string
  services: {
    id: string
    name: string
  }[]
}

export interface SalonWorker extends BaseSalonWorker {
  workerId: string
  status: 'active' | 'on-leave'
}
export interface WorkerLeave {
  id: string
  workerId: string
  worker: {
    workerId: string
    name: string
    salonId: string
  }
  date: string
  startTime: string
  endTime: string
}

export interface WorkersLeaves {
  workerId: string
  name: string
  leaves: WorkerLeave[]
}

export interface WorkerLeaveRequest {
  workerId: string
  date: string
  startTime: string
  endTime: string
}
