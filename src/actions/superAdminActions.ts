import { Salon } from '../types/salon'
import { SalonDetails, SalonDocuments } from '../types/superAdmin'
import axiosInstance from './axiosInstance'

export async function loginSuperAdmin(username: string, password: string) {
  const response = await axiosInstance.post('/super-admin/login', {
    username,
    password,
  })
  return response.data
}

export async function getAllSalons(): Promise<Salon[]> {
  const response = await axiosInstance.get('/super-admin/all-salons')
  return response.data
}

export async function getSalonDocuments(salonId: string): Promise<SalonDocuments[]> {
  const response = await axiosInstance.get(`/super-admin/salon-documents/${salonId}`)
  return response.data
}

export async function getSalonDetails(salonId: string): Promise<SalonDetails> {
  const response = await axiosInstance.get(`/super-admin/salon-details/${salonId}`)
  return response.data
}

export async function verifySalon(salonId: string): Promise<void> {
  const response = await axiosInstance.post('/super-admin/verify-salon', { salonId })
  return response.data
}

export async function failVerification(salonId: string): Promise<void> {
  const response = await axiosInstance.post('/super-admin/fail-verification', { salonId })
  return response.data
}
