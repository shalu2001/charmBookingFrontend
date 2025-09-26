import { PayHerePayload } from '../types/booking'
import axiosInstance from './axiosInstance'

export async function paymentInitiate(data: {
  bookingId: string
  address1: string
  address2: string
  city: string
}): Promise<PayHerePayload> {
  const response = await axiosInstance.post('/payments/initiate', data)
  return response.data
}
