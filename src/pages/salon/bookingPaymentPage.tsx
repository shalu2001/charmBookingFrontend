'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardHeader, CardBody } from '@heroui/react'
import { useState } from 'react'
import PaymentForm from '../../components/PaymentForm'

export default function BookingPaymentPage() {
  const [currentStep, setCurrentStep] = useState<'payment' | 'summary'>('payment')
  const [selectedDate] = useState<Date | null>(new Date())
  const [selectedTime] = useState<string | null>('2:00 PM')
  const [totalAmount] = useState<number>(120)
  const [paymentLoading, setPaymentLoading] = useState(false)

  const handlePaymentSubmit = () => {
    setPaymentLoading(true)
    setTimeout(() => {
      setPaymentLoading(false)
      setCurrentStep('summary')
    }, 2000)
  }

  return (
    <div className='min-h-screen bg-gray-50 p-8'>
      <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8'>
        {/* Main Section */}
        <div className='md:col-span-2 space-y-6'>
          <AnimatePresence mode='wait'>
            {currentStep === 'payment' && (
              <motion.div
                key='payment'
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className='w-full'
              >
                <PaymentForm
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  totalAmount={totalAmount}
                  onPaymentSubmit={handlePaymentSubmit}
                  loading={paymentLoading}
                />
              </motion.div>
            )}
            {currentStep === 'summary' && (
              <motion.div
                key='summary'
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <Card>
                  <CardHeader>
                    <h3 className='font-semibold text-lg'>Booking Confirmed</h3>
                  </CardHeader>
                  <CardBody>
                    <p>Your booking has been confirmed ✅</p>
                  </CardBody>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sidebar */}
        <div className='space-y-6'>
          {/* Selection Summary */}
          {(selectedDate || selectedTime) && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card>
                <CardHeader className='flex items-center gap-2'>
                  <h3 className='font-semibold'>Your Selection</h3>
                </CardHeader>
                <CardBody className='space-y-3 text-sm'>
                  {selectedDate && (
                    <div>
                      <div className='text-muted-foreground'>Date</div>
                      <div className='font-medium'>
                        {selectedDate.toLocaleDateString('en-US', {
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </div>
                    </div>
                  )}
                  {selectedTime && (
                    <div>
                      <div className='text-muted-foreground'>Time</div>
                      <div className='font-medium'>{selectedTime}</div>
                    </div>
                  )}
                  {selectedTime && (
                    <div className='border-t pt-3 flex justify-between items-center'>
                      <span className='font-semibold'>Total:</span>
                      <span className='font-bold text-primary text-lg'>${totalAmount}</span>
                    </div>
                  )}
                </CardBody>
              </Card>
            </motion.div>
          )}

          {/* Service Info */}
          <Card>
            <CardHeader>
              <h3 className='font-semibold'>Service Information</h3>
            </CardHeader>
            <CardBody className='space-y-3 text-sm'>
              <div>
                <strong>Duration:</strong> 60 minutes
              </div>
              <div>
                <strong>Includes:</strong> Consultation, service, and follow-up
              </div>
              <div>
                <strong>Cancellation:</strong> Free cancellation up to 24 hours before
              </div>
              <div>
                <strong>Location:</strong> 123 Service Street, City
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}
