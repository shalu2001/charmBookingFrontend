import { useState } from 'react'
import {
  faCut,
  faCalendarAlt,
  faUser,
  faBars,
  faTimes,
  faUsers,
  faSignOut,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '@heroui/react'
import { Outlet } from 'react-router-dom'
import { DashboardLayoutProps } from '../../../types/salon'
import useSignOut from 'react-auth-kit/hooks/useSignOut'

const sidebarItems = [
  { id: 'services', label: 'Services', icon: faCut },
  { id: 'bookings', label: 'Bookings', icon: faCalendarAlt },
  { id: 'account', label: 'Account', icon: faUser },
  { id: 'workers', label: 'Workers', icon: faUsers },
]

export default function DashboardLayout({ currentPage, onPageChange }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const signOut = useSignOut()

  const handleLogout = () => {
    signOut()
    window.location.href = '/business/login-salon' // Redirect to login page after logout
  }

  return (
    <div className='min-h-screen bg-background flex'>
      {/* Sidebar */}
      <aside
        className={`bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out flex flex-col ${
          sidebarCollapsed ? 'w-16' : 'w-64'
        }`}
      >
        {/* Logo Section */}
        <div className='p-6 border-b border-sidebar-border'>
          <div className='flex items-center gap-3'>
            <div className='w-8 h-8 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center'>
              <FontAwesomeIcon icon={faCut} className='w-4 h-4 text-primary-foreground' />
            </div>
            {!sidebarCollapsed && (
              <div>
                <h2 className='text-lg font-semibold text-sidebar-foreground'>SalonAdmin</h2>
                <p className='text-xs text-sidebar-foreground/60'>Management Dashboard</p>
              </div>
            )}
          </div>
        </div>
        {/* Navigation */}
        <nav className='flex-1 p-4'>
          <div className='space-y-2'>
            {sidebarItems.map(item => (
              <Button
                key={item.id}
                variant={currentPage === item.id ? 'solid' : 'light'}
                className={`w-full justify-start gap-3 h-11  ${
                  currentPage === item.id
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                } ${sidebarCollapsed ? 'px-3' : ''}`}
                onPress={() => onPageChange(item.id)}
                startContent={
                  <FontAwesomeIcon icon={item.icon} className='w-5 h-5 flex-shrink-0' />
                }
              >
                {!sidebarCollapsed && <span>{item.label}</span>}
              </Button>
            ))}
          </div>
        </nav>
        {/* Collapse Toggle */}
        <Button
          variant='flat'
          size='md'
          className='m-4 mt-auto'
          startContent={<FontAwesomeIcon icon={faSignOut} className='w-4 h-4' />}
          onPress={handleLogout}
        >
          Logout
        </Button>
        <div className='p-4 border-t border-sidebar-border'>
          <Button
            variant='light'
            size='sm'
            className='w-full text-sidebar-foreground hover:bg-sidebar-accent'
            onPress={() => setSidebarCollapsed(!sidebarCollapsed)}
            startContent={
              <FontAwesomeIcon icon={sidebarCollapsed ? faBars : faTimes} className='w-4 h-4' />
            }
          >
            {!sidebarCollapsed && <span className='ml-2'>Collapse</span>}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className='flex-1 flex flex-col'>
        {/* Header */}
        {/* <header className='bg-card border-b border-border px-6 py-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
              <h1 className='text-2xl font-bold text-foreground capitalize font-instrumentSerif'>
                {currentPage}
              </h1>
            </div>

            <div className='flex items-center gap-4'>
              {/* Search */}
        {/* <div className='relative'>
                <FontAwesomeIcon
                  icon={faSearch}
                  className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground'
                />
                <Input placeholder='Search...' className='pl-10 w-64 bg-background' />
              </div> */}

        {/* Notifications */}
        {/* <Button variant='light' size='sm' className='relative'>
                <FontAwesomeIcon icon={faBell} className='w-5 h-5' />
                <span className='absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full text-xs'>
                  3
                </span>
              </Button> */}

        {/* Profile */}
        {/* <div className='w-8 h-8 bg-gradient-to-br from-accent to-accent/80 rounded-full flex items-center justify-center'>
                <FontAwesomeIcon icon={faUser} className='w-4 h-4 text-accent-foreground' />
              </div>
            </div>
          </div> */}
        {/* </header> */}

        {/* Page Content */}
        <main className='flex-1 p-6 overflow-auto'>{<Outlet />}</main>
      </div>
    </div>
  )
}
