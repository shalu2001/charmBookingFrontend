import axiosInstance from './axiosInstance'
import { Customer } from '../types/customer'

export const getCustomerProfile = async (customerId: string): Promise<Customer> => {
  const response = await axiosInstance.get(`/user/getCustomerByID/${customerId}`)
  return response.data
}

export const updateCustomerByID = async (
  customerId: string,
  data: Partial<Customer>,
): Promise<Customer> => {
  const response = await axiosInstance.put(`/user/updateCustomerByID/${customerId}`, data)
  return response.data
}

export const updateCustomerPassword = async (
  customerId: string,
  currentPassword: string,
  newPassword: string,
): Promise<void> => {
  await axiosInstance.put(`/user/updateCustomerPassword/${customerId}`, {
    currentPassword,
    newPassword,
  })
}

export const loginCustomer = async (email: string, password: string): Promise<Customer> => {
  const response = await axiosInstance.post('/user/login', { email, password })
  return response.data
}
