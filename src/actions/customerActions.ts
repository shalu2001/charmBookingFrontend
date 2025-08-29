import axiosInstance from './axiosInstance'
import { Customer, LoginResponse, UpdatePassword } from '../types/customer'

export const getCustomerProfile = async (customerId: string): Promise<Customer> => {
  const response = await axiosInstance.get('/user/getCustomerByID', {
    params: {
      id: customerId,
    },
  })
  return response.data
}

export const updateCustomerByID = async (
  customerId: string,
  data: Partial<LoginResponse>,
): Promise<LoginResponse> => {
  const response = await axiosInstance.put(`/user/updateCustomerByID/${customerId}`, data)
  return response.data
}

export const updateCustomerPassword = async (
  customerId: string,
  passwordData: UpdatePassword,
): Promise<void> => {
  await axiosInstance.put(`/user/updateCustomerPassword/${customerId}`, passwordData)
}

export const loginCustomer = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await axiosInstance.post('/user/login', { email, password })
  return response.data
}
