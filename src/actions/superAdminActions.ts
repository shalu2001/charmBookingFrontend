import axiosInstance from './axiosInstance'

export const loginSuperAdmin = async (username: string, password: string) => {
  const response = await axiosInstance.post('/super-admin/login', {
    username,
    password,
  })
  return response.data
}

export async function verifySalon(salonId: string): Promise<void> {
  const response = await axiosInstance.post(`/salons/'verify-salon`, salonId)
  return response.data
}
