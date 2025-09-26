import createStore from 'react-auth-kit/createStore'
import { Customer } from './types/customer'
import { SalonAdmin } from './types/salon'
import { SuperAdmin } from './types/superAdmin'

export const customerStore = createStore<Customer>({
  authName: '_auth',
  authType: 'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:',
})

export const salonStore = createStore<SalonAdmin>({
  authName: '_salon_admin_auth',
  authType: 'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:',
})

export const SuperAdminStore = createStore<SuperAdmin>({
  authName: '_super_admin_auth',
  authType: 'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:',
})
