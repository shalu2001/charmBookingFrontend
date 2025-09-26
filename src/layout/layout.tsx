import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

import { ReactNode } from 'react'

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div>
      <Header />
      <main className='h-fit min-h-[calc(100vh-64px-243px-2px)]'>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
