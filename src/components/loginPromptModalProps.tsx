import { Modal, ModalContent, ModalHeader, ModalBody, Button } from '@heroui/react'
import { useNavigate } from 'react-router-dom'

interface LoginPromptModalProps {
  isOpen: boolean
  onClose: () => void
  returnUrl?: string
}

export const LoginPromptModal = ({ isOpen, onClose, returnUrl }: LoginPromptModalProps) => {
  const navigate = useNavigate()

  const handleLogin = () => {
    navigate('/login', {
      state: {
        returnUrl: returnUrl || window.location.pathname + window.location.search,
      },
      replace: true,
    })
  }

  const handleSignup = () => {
    navigate('/signup', {
      state: {
        returnUrl: returnUrl || window.location.pathname + window.location.search,
      },
      replace: true,
    })
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} isDismissable={false} hideCloseButton>
      <ModalContent>
        <ModalHeader className='text-xl font-semibold'>
          Please log in or sign up to book an appointment.
        </ModalHeader>
        <ModalBody className='px-6 py-4'>
          {/* <p className='text-gray-600 mb-6'>Please log in or sign up to book an appointment.</p> */}
          <div className='flex flex-col gap-3'>
            <Button color='primary' className='w-full' onPress={handleLogin}>
              Log In
            </Button>
            <Button variant='flat' className='w-full' onPress={handleSignup}>
              Sign Up
            </Button>
            <Button variant='light' className='w-full' onPress={onClose}>
              Go Back
            </Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
