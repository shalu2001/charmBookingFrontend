import React, { ReactNode } from 'react'
import {
  Modal as HeroModal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@heroui/react'

interface ModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  title: string
  children: ReactNode
  footer?: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  hideCloseButton?: boolean
  preventClose?: boolean
  className?: string
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onOpenChange,
  title,
  children,
  footer,
  size = 'md',
  hideCloseButton = false,
  preventClose = false,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
    full: 'max-w-[95vw]',
  }

  return (
    <HeroModal
      isOpen={isOpen}
      onOpenChange={preventClose ? undefined : onOpenChange}
      backdrop='opaque'
      classNames={{
        backdrop: 'bg-zinc-900/80 backdrop-opacity-20',
      }}
    >
      <ModalContent className={`${sizeClasses[size]} ${className}`}>
        <ModalHeader className='flex justify-between items-center'>
          {title}
          {!hideCloseButton && (
            <Button variant='light' onPress={() => onOpenChange(false)} className='min-w-0 p-0'>
              ×
            </Button>
          )}
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
        {footer && <ModalFooter>{footer}</ModalFooter>}
      </ModalContent>
    </HeroModal>
  )
}

export default Modal
