import { Booking, TimeSlotResponse } from '../types/booking'
import axiosInstance from './axiosInstance'

export async function getBookings(salonId: string): Promise<Booking[]> {
  const response = await axiosInstance.get(`/booking/${salonId}/bookings`)
  return response.data
}

export async function getAvailableTimeSlots(
  salonId: string,
  serviceId: string,
  date: string,
): Promise<TimeSlotResponse> {
  const response = await axiosInstance.get(
    `/booking/${salonId}/getAvailableSlots?serviceId=${serviceId}&date=${date}`,
  )
  return response.data
}
