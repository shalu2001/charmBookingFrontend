export interface Customer {
  customerId: string
  firstName: string
  lastName: string
  email: string
  createdAt: string
  phone: string
}

export interface LoginResponse {
  token: string
  customer: Customer
}

export interface UpdatePassword {
  oldPassword: string
  newPassword: string
}
