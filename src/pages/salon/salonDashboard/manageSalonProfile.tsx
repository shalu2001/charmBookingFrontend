import { useState } from 'react'
import {
  faUser,
  faLock,
  faCreditCard,
  faImage,
  faTrash,
  faUpload,
  faGear,
  faCamera,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Input, Tabs, Tab, Avatar, Badge, Spinner, Textarea } from '@heroui/react'
import { CustomCard } from '../../../components/Cards/CustomCard'
import { BaseSalon, SalonAdmin } from '../../../types/salon'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  getSalonPaymentMethod,
  getSalonProfile,
  updateSalonProfile,
} from '../../../actions/salonActions'
import CustomUpload from '../../../components/ImageUpload'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'

export function AccountPage() {
  const [selected, setSelected] = useState('profile')
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const admin = useAuthUser<SalonAdmin>()

  //useQuery for get
  const { data: profile, isPending } = useQuery({
    queryKey: ['salonProfile'],
    enabled: !!admin?.salonId,
    queryFn: () => getSalonProfile(admin!.salonId),
  })
  const { data: paymentMethodsData } = useQuery({
    queryKey: ['salonPaymentMethods'],
    queryFn: () => getSalonPaymentMethod('1'),
  })

  //mutation for create/update/delete
  const { mutate, isPending: isUpdating } = useMutation({
    mutationFn: (profileData: Partial<BaseSalon>) =>
      updateSalonProfile(admin!.salonId, profileData),
    onSuccess: data => {
      // Handle success, e.g., show a toast or update state
      console.log('Profile updated successfully:', data)
    },
    onError: error => {
      // Handle error, e.g., show an error message
      console.error('Error updating profile:', error)
    },
  })

  if (!profile || isPending || isUpdating) {
    return (
      <Spinner label='Loading profile...' className='flex items-center justify-center h-screen' />
    )
  }
  const commonInput = (
    label: string,
    value: string,
    onChange: (val: string) => void,
    type: string = 'text',
  ) => (
    <Input
      label={label}
      type={type}
      value={value}
      onChange={e => onChange(e.currentTarget.value)}
    />
  )

  return (
    <div className='space-y-6'>
      <Tabs selectedKey={selected} onSelectionChange={k => setSelected(String(k))}>
        <Tab
          key='profile'
          title={
            <span className='flex items-center gap-2'>
              <FontAwesomeIcon icon={faUser} /> Profile
            </span>
          }
        >
          <div className='grid lg:grid-cols-2 gap-6'>
            <CustomCard title='Salon Profile' icon={<FontAwesomeIcon icon={faCamera} />}>
              {commonInput('Salon Name', profile.name, () => {})}
              {commonInput('Owner Name', profile.ownerName, () => {})}
              {commonInput('Email', profile.email, () => {}, 'email')}
              {commonInput('Phone', profile.phone, () => {})}
              <Textarea
                label='Description'
                rows={3}
                value={profile.description}
                onChange={() => {}}
              />
              <Button
                onPress={() => {
                  /* update logic */
                }}
                className='mt-4'
              >
                Update Profile
              </Button>
            </CustomCard>

            <CustomCard title='Change Password' icon={<FontAwesomeIcon icon={faLock} />}>
              {commonInput(
                'Current Password',
                passwordData.currentPassword,
                val => setPasswordData(pd => ({ ...pd, currentPassword: val })),
                'password',
              )}
              {commonInput(
                'New Password',
                passwordData.newPassword,
                val => setPasswordData(pd => ({ ...pd, newPassword: val })),
                'password',
              )}
              {commonInput(
                'Confirm Password',
                passwordData.confirmPassword,
                val => setPasswordData(pd => ({ ...pd, confirmPassword: val })),
                'password',
              )}
              <Button
                onPress={() => {
                  /* change pass logic */
                }}
                className='mt-4'
              >
                Change Password
              </Button>
            </CustomCard>
          </div>
        </Tab>

        <Tab
          key='payments'
          title={
            <span className='flex items-center gap-2'>
              <FontAwesomeIcon icon={faCreditCard} /> Payments
            </span>
          }
        >
          <div className='space-y-6'>
            <CustomCard
              title='Payment Methods'
              icon={<FontAwesomeIcon icon={faCreditCard} />}
              footer={
                <Button variant='solid'>
                  <FontAwesomeIcon icon={faGear} /> Settings
                </Button>
              }
            >
              {paymentMethodsData?.map((m, idx) => (
                <div
                  key={m.id ?? idx}
                  className='flex items-center justify-between px-4 py-2 border rounded-lg'
                >
                  <div>
                    <p className='font-medium'>{m.name}</p>
                    <p className='text-sm'>{m.identifier}</p>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Badge
                    // variant={
                    //   m.status === 'connected'
                    //     ? 'solid'
                    //     : m.status === 'pending'
                    //     ? 'flat'
                    //     : undefined
                    // }
                    >
                      {m.status ? m.status.charAt(0).toUpperCase() + m.status.slice(1) : ''}
                    </Badge>
                    {m.isDefault && <Badge variant='flat'>Default</Badge>}
                  </div>
                </div>
              ))}
            </CustomCard>

            <CustomCard title='Payout Settings' icon={<FontAwesomeIcon icon={faGear} />}>
              {/* Add payout details */}
            </CustomCard>

            <CustomCard title='Recent Payments' icon={<FontAwesomeIcon icon={faCreditCard} />}>
              {/* Payment history UI */}
            </CustomCard>
          </div>
        </Tab>

        <Tab
          key='gallery'
          title={
            <span className='flex items-center gap-2'>
              <FontAwesomeIcon icon={faImage} /> Gallery
            </span>
          }
        >
          <CustomCard title='Salon Gallery' icon={<FontAwesomeIcon icon={faImage} />}>
            <CustomUpload />
          </CustomCard>
        </Tab>
      </Tabs>
    </div>
  )
}
