import { Booking } from '../types/booking'

const mockBookings: Booking[] = [
  {
    id: '1',
    customerId: 'c1',
    customerName: 'Sarah Johnson',
    customerEmail: 'sarah@email.com',
    customerPhone: '(555) 123-4567',
    serviceId: 's1',
    serviceName: 'Hair Cut & Style',
    date: '2024-01-20',
    time: '10:00',
    duration: 60,
    price: 65,
    status: 'confirmed',
    paymentStatus: 'paid',
  },
  {
    id: '2',
    customerId: 'c2',
    customerName: 'Emily Davis',
    customerEmail: 'emily@email.com',
    customerPhone: '(555) 234-5678',
    serviceId: 's2',
    serviceName: 'Hair Color',
    date: '2024-01-20',
    time: '14:00',
    duration: 120,
    price: 120,
    status: 'pending',
    paymentStatus: 'unpaid',
  },
  {
    id: '3',
    customerId: 'c3',
    customerName: 'Jessica Wilson',
    customerEmail: 'jessica@email.com',
    customerPhone: '(555) 345-6789',
    serviceId: 's3',
    serviceName: 'Manicure',
    date: '2024-01-21',
    time: '11:30',
    duration: 45,
    price: 35,
    status: 'confirmed',
    paymentStatus: 'paid',
  },
  {
    id: '4',
    customerId: 'c4',
    customerName: 'Michelle Brown',
    customerEmail: 'michelle@email.com',
    customerPhone: '(555) 456-7890',
    serviceId: 's4',
    serviceName: 'Deep Cleansing Facial',
    date: '2024-01-22',
    time: '15:00',
    duration: 75,
    price: 85,
    status: 'cancelled',
    paymentStatus: 'refunded',
  },
]

export async function getBookings(salonId: string): Promise<Booking[]> {
  await new Promise(resolve => setTimeout(resolve, 1000))
  console.log('Mock bookings fetched')
  return mockBookings
}
