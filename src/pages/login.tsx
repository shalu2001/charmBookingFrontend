import { useState } from 'react'
import useSignIn from 'react-auth-kit/hooks/useSignIn'
import axios from 'axios'
import { Button, Input, Spinner } from '@heroui/react'

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [subLoading, setSubLoading] = useState(false)
  const signIn = useSignIn()

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubLoading(true)
    setError('')
    try {
      const res = await axios.post('http://localhost:3000/user/login', formData)
      if (res.status === 201) {
        if (
          signIn({
            auth: {
              token: res.data.token,
              type: 'Bearer',
            },
            // refresh: res.data.refreshToken,
            userState: res.data.customer,
          })
        ) {
          console.log('Sign in successful')
          window.location.href = '/'
        } else {
          console.log('Sign in failed')
        }
      }
    } catch (error: unknown) {
      // Handle Axios errors separately from other errors
      if (axios.isAxiosError(error)) {
        const backendMessage = error.response?.data?.error?.message || 'An error occurred'
        setError(backendMessage)
      } else if (error instanceof Error) {
        // Handle other errors
        setError(error.message)
      } else {
        // Fallback for any other unknown error types
        setError('An unknown error occurred')
      }
    } finally {
      setSubLoading(false) // Stop loading spinner
    }
  }

  return (
    <div className='flex h-screen'>
      <div className='w-1/2 h-full p-5 flex items-center justify-center'>
        <div className='w-5/6 text-center mx-50 my-10 bg-white shadow-xl rounded-3xl py-8 px-5'>
          <div className='text-center text-primary font-extrabold text-5xl mb-10'>
            <h1>Login</h1>
          </div>

          <form onSubmit={handleLogin} className='flex flex-col gap-4 space-y-3 mr-6 ml-6'>
            <Input
              type='text'
              label='Email'
              name='email'
              onChange={e => setFormData({ ...formData, email: e.target.value })}
            />
            <Input
              type='password'
              label='Password'
              name='password'
              onChange={e => setFormData({ ...formData, password: e.target.value })}
            />
            <p className='mt-5'>
              <a href='/signup' className='text-blue-400'>
                Don't have an account? Sign Up
              </a>
            </p>
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
      <div className='w-1/2 h-full'>
        <img
          className='object-cover w-full h-full'
          src='signup-drawing.avif'
          alt='Login Illustration'
        />
      </div>
    </div>
  )
}
