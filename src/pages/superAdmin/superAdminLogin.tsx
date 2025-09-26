import { useState } from 'react'
import useSignIn from 'react-auth-kit/hooks/useSignIn'
import axios from 'axios'
import { Button, Input, Spinner } from '@heroui/react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { loginSuperAdmin } from '../../actions/superAdminActions'
import { SuperAdminLoginResponse } from '../../types/superAdmin'

export default function SuperAdminLogin() {
  const location = useLocation()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [subLoading, setSubLoading] = useState(false)
  const signIn = useSignIn<SuperAdminLoginResponse>()

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ username, password }: { username: string; password: string }) => {
      const res = await loginSuperAdmin(username, password)
      console.log('logged in super admin', res)
      return res
    },
    onSuccess: data => {
      signIn({
        auth: {
          token: data.token,
          type: 'Bearer',
        },
        userState: {
          username: data.username,
        },
      })
      // Handle navigation with return URL
      if (location.state?.returnUrl) {
        navigate(location.state.returnUrl, { replace: true })
      } else {
        navigate('/super-admin/dashboard', { replace: true })
      }
    },
    onError: error => {
      console.error('Login failed:', error)
      setError('Login failed. Please try again.')
    },
  })

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    mutate(formData)
  }

  return (
    <div className='h-full p-5 flex items-center justify-center'>
      <div className=' text-center mx-50 my-10 bg-white shadow-xl rounded-3xl p-10'>
        <div className='text-center text-primary font-semibold text-5xl mb-10'>
          <h1>Super Admin Login</h1>
        </div>

        <form onSubmit={handleLogin} className='flex flex-col gap-4 space-y-3 mr-6 ml-6'>
          <Input
            type='text'
            label='Username'
            name='username'
            onChange={e => setFormData({ ...formData, username: e.target.value })}
          />
          <Input
            type='password'
            label='Password'
            name='password'
            onChange={e => setFormData({ ...formData, password: e.target.value })}
          />

          {error && <p className='text-red-600 font-light text-sm'>{error}</p>}
          {subLoading ? (
            <Spinner color='primary' />
          ) : (
            <>
              <Button
                type='submit'
                color='secondary'
                radius='lg'
                variant='shadow'
                className='mt-5 text-center w-full'
              >
                Login
              </Button>
            </>
          )}
        </form>
      </div>
    </div>
  )
}
