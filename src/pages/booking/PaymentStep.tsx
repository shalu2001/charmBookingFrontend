/* eslint-disable @typescript-eslint/no-explicit-any */
import { Booking, PayHerePayload, SalonWorker } from '../../types/booking'
import { Service } from '../../types/salon'
import { useEffect, useState } from 'react'
import { bookSlot } from '../../actions/bookingActions'
import { paymentInitiate } from '../../actions/paymentActions'
import { useMutation } from '@tanstack/react-query'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import { Customer } from '../../types/customer'
import { Button, Input, Spinner } from '@heroui/react'

export function PaymentStep({
  salonId,
  service,
  date,
  startTime,
  worker,
}: {
  salonId: string
  service: Service
  date: Date
  startTime: string
  worker: SalonWorker
}) {
  const user = useAuthUser<Customer>()
  const [bookingResponse, setBookingResponse] = useState<Booking | null>(null)
  const [billingInfo, setBillingInfo] = useState({
    address1: '',
    address2: '',
    city: '',
  })
  const [paymentPayload, setPaymentPayload] = useState<PayHerePayload | null>(null)
  const [showPaymentForm, setShowPaymentForm] = useState(false)

  const bookSlotMutation = useMutation({
    mutationFn: (params: Parameters<typeof bookSlot>[0]) => bookSlot(params),
  })

  const paymentMutation = useMutation({
    mutationFn: (params: Parameters<typeof paymentInitiate>[0]) => paymentInitiate(params),
    onSuccess: data => {
      setPaymentPayload(data)
    },
  })

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).payhere) {
      const payhere = (window as any).payhere

      // Called when payment is completed successfully
      payhere.onCompleted = function onCompleted(orderId: string) {
        console.log('Payment completed. OrderID:', orderId)
        // You can update backend / show success UI
      }

      // Called when user closes the popup without paying
      payhere.onDismissed = function onDismissed() {
        console.log('Payment dismissed')
      }

      // Called if an error occurs
      payhere.onError = function onError(error: string) {
        console.error('Error:', error)
      }
    }
  }, [])

  useEffect(() => {
    if (!user) return
    bookSlotMutation.mutate(
      {
        salonId: salonId,
        userId: user?.customerId,
        serviceId: service.serviceId,
        date: date.toLocaleDateString('en-CA'),
        startTime,
        workerId: worker.workerId,
      },
      {
        onSuccess: data => {
          setBookingResponse(data)
          setShowPaymentForm(true)
        },
      },
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (bookSlotMutation.isPending) {
    return (
      <div className='flex items-center justify-center h-64'>
        <Spinner className='animate-spin h-10 w-10 text-gray-500' />
      </div>
    )
  }

  if (paymentMutation.isPending) {
    return (
      <div className='flex items-center justify-center h-64'>
        <Spinner className='animate-spin h-10 w-10 text-gray-500' />
      </div>
    )
  }

  if (paymentPayload) {
    return (
      <div>
        <h1 className='text-2xl font-semibold mb-6'>Proceed to Payment</h1>
        <Button
          onClick={() => {
            const payhere = (window as any).payhere
            if (payhere) {
              const payHerePayload = {
                ...paymentPayload,
                return_url: window.location.origin + '/payment/success',
                cancel_url: window.location.origin + '/payment/cancel',
              }
              payhere.startPayment(payHerePayload)
            } else {
              console.error('PayHere SDK not loaded')
            }
          }}
          color='secondary'
          radius='lg'
          variant='shadow'
          className='mt-4 w-full'
        >
          Pay Now
        </Button>
      </div>
    )
  }

  return (
    <div>
      <h1 className='text-2xl font-semibold mb-6'>Payment</h1>
      {showPaymentForm && bookingResponse && (
        <form
          className='space-y-4 max-w-md'
          onSubmit={e => {
            e.preventDefault()
            paymentMutation.mutate({
              bookingId: bookingResponse.id,
              address1: billingInfo.address1,
              address2: billingInfo.address2,
              city: billingInfo.city,
            })
          }}
        >
          <div>
            <label className='block mb-1 font-medium'>Address Line 1</label>
            <Input
              type='text'
              label='Address Line 1'
              required
              value={billingInfo.address1}
              onChange={e => setBillingInfo(info => ({ ...info, address1: e.target.value }))}
            />
          </div>
          <div>
            <label className='block mb-1 font-medium'>Address Line 2</label>
            <Input
              type='text'
              label='Address Line 2'
              value={billingInfo.address2}
              onChange={e => setBillingInfo(info => ({ ...info, address2: e.target.value }))}
            />
          </div>
          <div>
            <label className='block mb-1 font-medium'>City</label>
            <Input
              type='text'
              label='City'
              required
              value={billingInfo.city}
              onChange={e => setBillingInfo(info => ({ ...info, city: e.target.value }))}
            />
          </div>
          <Button
            type='submit'
            color='secondary'
            radius='lg'
            variant='shadow'
            className='mt-4 w-full'
            disabled={paymentMutation.isPending}
          >
            Initiate Payment
          </Button>
        </form>
      )}
    </div>
  )
}
