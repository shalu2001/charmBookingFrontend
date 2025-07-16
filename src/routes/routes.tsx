import { Routes, Route, BrowserRouter } from 'react-router-dom'
import SignUp from '../pages/signUp'
import Login from '../pages/login'
import HomePage from '../pages/homePage'
import SalonPage from '../pages/salon/salonPage'
import BusinessLanding from '../pages/businessPage'
import RegisterSalon from '../pages/salon/registerSalon'
import RegisterSalonServices from '../pages/salon/registerSalonServices'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='' element={<HomePage />} />
        <Route path='/salon/:salonId' element={<SalonPage />} />
        <Route path='/business'>
          <Route path='' element={<BusinessLanding />} />
          <Route path='register-salon' element={<RegisterSalon />} />
          <Route path='register-services' element={<RegisterSalonServices />} />
          {/* <Route path="register-product" element={<div>Business Settings</div>} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
