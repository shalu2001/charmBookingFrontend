import { AvailableWorkersResponse, Booking, TimeSlotResponse } from '../types/booking'
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

export async function getAvailableWorkers(
  salonId: string,
  serviceId: string,
  date: string,
  startTime: string,
): Promise<AvailableWorkersResponse> {
  const response = await axiosInstance.get(
    `/booking/${salonId}/checkServiceTimeAvailability?serviceId=${serviceId}&date=${date}&startTime=${startTime}`,
  )
  return response.data
}

export async function bookSlot(data: {
  salonId: string
  userId: string
  serviceId: string
  date: string
  startTime: string
  workerId: string
}): Promise<Booking> {
  console.log('Booking appointment:', data)
  const response = await axiosInstance.post(`/booking/${data.salonId}/book`, data)
  return response.data
}
