import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from '@heroui/react'
import { useNavigate } from 'react-router-dom'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import { User } from '@heroui/react'
import { Customer } from '../types/customer'

const Header = () => {
  const navigate = useNavigate()
  const customer = useAuthUser<Customer>()
  console.log('customer details:', customer)
  return (
    <Navbar>
      <NavbarBrand>
        <Link href='/'>
          <p className='font-birthstone text-5xl'>CharmBooking</p>
        </Link>
      </NavbarBrand>
      <NavbarContent className='hidden sm:flex gap-4' justify='center'>
        {!customer && (
          <NavbarItem>
            <Link href='/business'>For Business</Link>
          </NavbarItem>
        )}
      </NavbarContent>
      <NavbarContent justify='end' className=''>
        {customer ? (
          <User
            name={customer?.firstName}
            description={customer?.email}
            onClick={() => navigate('/customer/profile')}
            isFocusable
          />
        ) : (
          <>
            <NavbarItem className='hidden lg:flex rounded-lg mr-4'>
              <Button
                color='secondary'
                radius='lg'
                variant='shadow'
                className='text-center'
                onClick={() => navigate('/signup')}
              >
                Sign Up
              </Button>
            </NavbarItem>
            <NavbarItem className='hidden lg:flex rounded-lg mr-4'>
              <Link href='/login'>
                <Button
                  color='secondary'
                  radius='lg'
                  variant='shadow'
                  className='text-center'
                  onClick={() => navigate('/login')}
                >
                  Login
                </Button>
              </Link>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  )
}

export default Header
