import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { DashboardLayout } from './dashboardLayout'

const dashboardPages = ['customerProfile', 'customerBookings', 'customerPayments']

export default function DashboardLayoutWrapperCustomer() {
  const location = useLocation()
  const navigate = useNavigate()

  // Determine current page from URL
  const currentPage =
    dashboardPages.find(page => location.pathname.includes(page)) || 'customerDashboard'

  const handlePageChange = (page: string) => {
    navigate(`/customerDashboard/${page}`)
  }

  return (
    <DashboardLayout currentPage={currentPage} onPageChange={handlePageChange}>
      <Outlet />
    </DashboardLayout>
  )
}
