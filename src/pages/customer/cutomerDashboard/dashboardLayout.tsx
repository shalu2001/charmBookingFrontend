import { useState } from 'react'
import {
  faMagic,
  faUser,
  faCalendarAlt,
  faCreditCard,
  faBars,
  faTimes,
  faSearch,
  faBell,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Input, Avatar } from '@heroui/react'
import Header from '../../../components/Header'

interface DashboardLayoutProps {
  currentPage: string
  onPageChange: (page: string) => void
  children: React.ReactNode
}

const sidebarItems = [
  { id: 'profile', label: 'Profile', icon: faUser },
  { id: 'bookings', label: 'Bookings', icon: faCalendarAlt },
]

export function DashboardLayout({ currentPage, onPageChange, children }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <>
      <div className='min-h-screen bg-background flex'>
        {/* Sidebar */}
        <aside
          className={`bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out flex flex-col ${
            sidebarCollapsed ? 'w-16' : 'w-64'
          }`}
        >
          {/* Navigation */}
          <nav className='flex-1 p-4'>
            <div className='space-y-2'>
              {sidebarItems.map(item => (
                <Button
                  key={item.id}
                  variant={currentPage === item.id ? 'solid' : 'light'}
                  className={`w-full justify-start gap-3 h-11 ${
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
          {/* Page Content */}
          <main className='flex-1 p-6 overflow-auto'>{children}</main>
        </div>
      </div>
    </>
  )
}
