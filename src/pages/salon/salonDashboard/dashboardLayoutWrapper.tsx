import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import DashboardLayout from './dashboardLayout'

const dashboardPages = ['services', 'appointments', 'workers', 'account']

export default function DashboardLayoutWrapper() {
  const location = useLocation()
  const navigate = useNavigate()

  // Determine current page from URL
  const currentPage = dashboardPages.find(page => location.pathname.includes(page)) || 'overview'

  const handlePageChange = (page: string) => {
    navigate(`/business/dashboard/${page}`)
  }

  return (
    <DashboardLayout currentPage={currentPage} onPageChange={handlePageChange}>
      <Outlet />
    </DashboardLayout>
  )
}
