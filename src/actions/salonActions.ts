import {
  BaseSalon,
  SalonWorker,
  Category,
  CreateServiceDTO,
  PaymentMethod,
  Salon,
  SalonAdmin,
  SalonRanked,
  SalonRankedRequestDto,
  Service,
  WeeklyHours,
  WorkerLeave,
  WorkerLeaveRequest,
  WorkersLeaves,
  BaseSalonWorker,
  CreateWorkerDto,
} from '../types/salon'
import axiosInstance from './axiosInstance'

export async function getSalons(): Promise<Salon[]> {
  const response = await axiosInstance.get('/getSalons')
  return response.data
}

export async function getSalonsRanked(params: SalonRankedRequestDto): Promise<SalonRanked[]> {
  const response = await axiosInstance.get('salon/getSalonsRanked', {
    params: {
      categoryId: params.categoryId,
      longitude: params.longitude,
      latitude: params.latitude,
      date: params.date,
      time: params.time,
    },
  })
  return response.data
}

export async function getSalon(salonId: string): Promise<Salon> {
  const response = await axiosInstance.get(`/salons?_id=${salonId}`)
  return response.data[0]
}

export async function registerSalon(formData: FormData): Promise<BaseSalon> {
  const response = await axiosInstance.post('/salon/registerSalon', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}

export async function loginSalon(
  email: string,
  password: string,
): Promise<{
  salon: SalonAdmin
  token: string
}> {
  const response = await axiosInstance.post('salon/loginSalon', { email, password })
  return response.data
}

const mockSalonProfile: BaseSalon = {
  id: '1',
  name: 'Charm Salon',
  ownerName: 'Linda Smith',
  location: '123 Main St, Cityville',
  phone: '(555) 987-6543',
  email: 'info@charmsalon.com',
  description: 'A modern salon offering hair, nail, and skin services.',
  longitude: '0',
  latitude: '0',
}

export async function getSalonProfile(salonId: string): Promise<BaseSalon> {
  const response = await axiosInstance.get(`/salon/getSalonProfile/${salonId}`)
  return response.data
}

export async function updateSalonProfile(
  salonId: string,
  profileData: Partial<BaseSalon>,
): Promise<BaseSalon> {
  await new Promise(resolve => setTimeout(resolve, 500))
  // Merge the mock profile with the new data
  return { ...mockSalonProfile, ...profileData }
}

export async function getSalonPaymentMethod(salonId: string): Promise<PaymentMethod[]> {
  const response = await axiosInstance.get(`/salons/${salonId}/payment-method`)
  return response.data
}
export async function getAllCategories(): Promise<Category[]> {
  const response = await axiosInstance.get('salonCategory/findAll')
  return response.data
}
export async function getSalonServices(salonId: string): Promise<Service[]> {
  const response = await axiosInstance.get(`salonService/findBySalon/${salonId}`)
  return response.data
}

export async function addSalonService(
  salonId: string,
  serviceData: CreateServiceDTO,
): Promise<Service> {
  const response = await axiosInstance.post('salonService/create', {
    ...serviceData,
    salonId,
  })
  return response.data
}

export async function updateSalonService(
  serviceId: string,
  serviceData: Partial<CreateServiceDTO>,
): Promise<Service> {
  const response = await axiosInstance.put(`salonService/update`, {
    ...serviceData,
    serviceId,
  })
  return response.data
}

export async function deleteSalonService(serviceId: string): Promise<void> {
  await axiosInstance.delete(`salonService/remove/${serviceId}`)
}

export async function getServiceById(serviceId: string): Promise<Service> {
  const response = await axiosInstance.get(`salonService/findOne/${serviceId}`)
  return response.data
}

export async function getSalonWeeklyHours(salonId: string): Promise<WeeklyHours[]> {
  const response = await axiosInstance.get(`/salon/${salonId}/getSalonWeeklyHours`)
  return response.data
}

export async function updateSalonWeeklyHours(
  salonId: string,
  weeklyHours: WeeklyHours[],
): Promise<WeeklyHours[]> {
  const response = await axiosInstance.put(`/salon/${salonId}/updateWeeklyHours`, {
    weeklyHours,
  })
  return response.data
}

export async function getSalonWorkers(salonId: string): Promise<SalonWorker[]> {
  const response = await axiosInstance.get(`/salonWorker/getWorkers/${salonId}`)
  return response.data
}

export async function addSalonWorker(workerData: CreateWorkerDto): Promise<SalonWorker> {
  const response = await axiosInstance.post('/salonWorker/createWorker', workerData)
  return response.data
}

export async function getSalonLeaves(salonId: string): Promise<WorkersLeaves[]> {
  const response = await axiosInstance.get(`/salonWorker/${salonId}/getWorkersLeaves`)
  return response.data
}

export async function addWorkerLeaves(
  workerId: string,
  salonId: string,
  leaveData: WorkerLeaveRequest,
): Promise<WorkersLeaves> {
  const response = await axiosInstance.post(
    `/salonWorker/${salonId}/addWorkerLeave/${workerId}`,
    leaveData,
  )
  return response.data
}
