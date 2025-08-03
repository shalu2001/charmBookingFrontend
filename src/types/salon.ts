export interface Salon {
  id: number
  name: string
  ownerName: string
  services: Service[]
  location: string
  phone: string
  email: string
  description: string
  longitude: string
  latitude: string
  reviews: Review[]
}

export interface Service {
  serviceId: number
  categories: Category[]
  name: string
  price: number
  duration: number
}

export interface ServiceModalProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  categories: Category[]
  onAddService: (service: Service) => void
  // serviceName: string
  // description: string
  // price: number
  // duration: number
  // category: string
}

export interface Category {
  categoryId: number
  name: string
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
  ownerName: string
  location: string
  latitude: number
  longitude: number
  name: string
  phone: string
  description: string
  salonImages: string[]
}

export interface DashboardLayoutProps {
  children: React.ReactNode
  currentPage: string
  onPageChange: (page: string) => void
}
