import { Salon } from './salon'

export interface SuperAdmin {
  username: string
}

export interface SuperAdminLoginResponse {
  username: string
}

export enum SalonDocumentType {
  ID_PROOF = 'ID_PROOF',
  BANKING_PROOF = 'BANKING_PROOF',
  COMPANY_REGISTRATION = 'COMPANY_REGISTRATION',
}

export enum VerificationStatus {
  PENDING = 'PENDING',
  VERIFIED = 'VERIFIED',
  FAILED = 'FAILED',
}

export interface SalonDocuments {
  id: string
  salonId: string
  salon: Salon
  url: string
  documentType: SalonDocumentType
  createdAt: Date
}

export interface SalonDetails {
  salonId: string
  salon: Salon
  owner_nic: string
  bank_account_full_name: string
  bank_account_number: string
  bank_name: string
  bank_branch: string
  createdAt: Date
  updatedAt: Date
}
