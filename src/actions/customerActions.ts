import axiosInstance from './axiosInstance'
import { CreateReview, Customer, LoginResponse, UpdatePassword } from '../types/customer'
import { CustomerBooking } from '../types/booking'
import { Salon } from '../types/salon'

export const getCustomerProfile = async (
  customerId: string,
  authHeader: string,
): Promise<Customer> => {
  const response = await axiosInstance.get('/user/getCustomerByID', {
    params: {
      id: customerId,
    },
    headers: {
      Authorization: authHeader,
    },
  })
  return response.data
}

export const updateCustomerByID = async (
  customerId: string,
  data: Partial<LoginResponse>,
  authHeader: string,
): Promise<LoginResponse> => {
  const response = await axiosInstance.put(`/user/updateCustomerByID/${customerId}`, data, {
    headers: {
      Authorization: authHeader,
    },
  })
  return response.data
}

export const updateCustomerPassword = async (
  customerId: string,
  passwordData: UpdatePassword,
  authHeader: string,
): Promise<void> => {
  await axiosInstance.put(`/user/updateCustomerPassword/${customerId}`, passwordData, {
    headers: {
      Authorization: authHeader,
    },
  })
}

export const loginCustomer = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await axiosInstance.post('/user/login', { email, password })
  return response.data
}

export const getCustomerBookingsById = async (
  customerId: string,
  authHeader: string,
): Promise<CustomerBooking[]> => {
  const response = await axiosInstance.get<CustomerBooking[]>(
    `/user/${customerId}/getUserBookingsByID`,
    {
      headers: {
        Authorization: authHeader,
      },
    },
  )
  return response.data
}

export const cancelBookingById = async (bookingId: string): Promise<void> => {
  await axiosInstance.put(`/user/cancelBooking/${bookingId}`)
}

export const getSalonById = async (salonId: string): Promise<Salon> => {
  const response = await axiosInstance.get(`salon/getSalon/${salonId}`)
  return response.data
}

export const createReview = async (
  bookingId: string,
  userId: string,
  reviewData: CreateReview,
  authHeader: string,
): Promise<void> => {
  await axiosInstance.post(`user/${userId}/createReview/${bookingId}`, reviewData, {
    headers: {
      Authorization: authHeader,
    },
  })
}
