import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import SignUp from '../pages/signUp'
import Login from '../pages/login'
import HomePage from '../pages/homePage'
import SalonPage from '../pages/salon/salonPage'
import BusinessLanding from '../pages/businessPage'
import RegisterSalon from '../pages/salon/registerSalon'
import RegisterSalonServices from '../pages/salon/registerSalonServices'
import DashboardLayoutWrapper from '../pages/salon/salonDashboard/dashboardLayoutWrapper'
import { ServicesPage } from '../pages/salon/salonDashboard/manageServices'
import { BookingsPage } from '../pages/salon/salonDashboard/manageBookings'
import { AccountPage } from '../pages/salon/salonDashboard/manageSalonProfile'
import LoginSalon from '../pages/salon/loginSalon'
import AuthProvider from 'react-auth-kit'
import { customerStore, salonStore } from '../AuthStore'
import { BookTimeAndDate } from '../pages/booking/BookingForm'
import DashboardProfile from '../pages/customer/cutomerDashboard/manageCustomerProfile'
import DashboardLayoutWrapperCustomer from '../pages/customer/cutomerDashboard/dashboardLayoutWrapper'

// Auth wrapper for customer routes
function CustomerAuth() {
  return (
    <AuthProvider store={customerStore}>
      <Outlet />
    </AuthProvider>
  )
}

// Auth wrapper for salon routes
function SalonAuth() {
  return (
    <AuthProvider store={salonStore}>
      <Outlet />
    </AuthProvider>
  )
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Customer routes */}
        <Route element={<CustomerAuth />}>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<HomePage />} />
          <Route path='/salon/:salonId' element={<SalonPage />} />
          <Route path='/book/timeslot' element={<BookTimeAndDate />} />
          <Route path='customerDashboard' element={<DashboardLayoutWrapperCustomer />}>
            <Route path='customerProfile' element={<DashboardProfile />} />
            <Route path='customerBookings' element={<div>Bookings</div>} />
            <Route path='customerPayments' element={<div>Payments</div>} />
            <Route path='customerDashboard' element={<div>Dashboard</div>} />
          </Route>
        </Route>

        {/* Salon routes */}
        <Route path='/business' element={<SalonAuth />}>
          <Route index element={<BusinessLanding />} />
          <Route path='register-salon' element={<RegisterSalon />} />
          <Route path='login-salon' element={<LoginSalon />} />
          <Route path='register-services' element={<RegisterSalonServices />} />
          <Route path='dashboard' element={<DashboardLayoutWrapper />}>
            <Route path='services' element={<ServicesPage />} />
            <Route path='bookings' element={<BookingsPage />} />
            <Route path='account' element={<AccountPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
