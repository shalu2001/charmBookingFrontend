import { useState } from 'react'
import {
  faUser,
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faCamera,
  faShieldAlt,
  faEdit,
  faSave,
  faTimes,
  faCalendarAlt,
  faStar,
  faLock,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Card, CardHeader, CardBody, Input, Textarea, Avatar, Badge } from '@heroui/react'
import { useQuery, useMutation } from '@tanstack/react-query'

export default function DashboardProfile() {
  const [isEditing, setIsEditing] = useState(false)

  interface Profile {
    firstName: string
    lastName: string
    email: string
    phone: string
    address: string
    bio: string
    dateJoined: string
    totalBookings: number
    favoriteSalons: number
    avatar: string
  }

  const [formData, setFormData] = useState<Profile>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    bio: '',
    dateJoined: '',
    totalBookings: 0,
    favoriteSalons: 0,
    avatar: '',
  })

  // Dummy query for fetching profile
  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      // fake API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      return {
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: 'sarah.johnson@example.com',
        phone: '+1 (555) 123-4567',
        address: '123 Main Street, New York, NY 10001',
        bio: 'Beauty enthusiast who loves trying new treatments and discovering amazing salons.',
        dateJoined: 'January 2023',
        totalBookings: 24,
        favoriteSalons: 8,
        avatar: 'https://i.pravatar.cc/150?img=5',
      }
    },
  })

  // Dummy mutation for updating profile
  //   const updateProfile = useMutation(async (updated: any) => {
  //     await new Promise((resolve) => setTimeout(resolve, 500));
  //     return updated;
  //   });

  const handleSave = () => {
    // updateProfile.mutate(formData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    if (profile) setFormData(profile)
    setIsEditing(false)
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <div className='space-y-8'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-primary'>Profile Settings</h1>
          <p className='text-default-500 mt-2'>Manage your account information and preferences.</p>
        </div>
        {!isEditing ? (
          <Button
            color='primary'
            onPress={() => {
              if (profile) setFormData(profile)
              setIsEditing(true)
            }}
          >
            <FontAwesomeIcon icon={faEdit} className='mr-2' />
            Edit Profile
          </Button>
        ) : (
          <div className='flex gap-2'>
            {/* <Button color="primary" onPress={handleSave} isLoading={updateProfile.isLoading}>
              <FontAwesomeIcon icon={faSave} className="mr-2" />
              Save
            </Button>
            <Button variant="bordered" onPress={handleCancel}>
              <FontAwesomeIcon icon={faTimes} className="mr-2" />
              Cancel
            </Button> */}
          </div>
        )}
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Profile Picture & Stats */}
        <Card shadow='sm'>
          <CardHeader className='font-semibold'>Profile Picture</CardHeader>
          <CardBody className='space-y-6'>
            <div className='flex flex-col items-center gap-4'>
              <div className='relative'>
                <Avatar
                  src={profile?.avatar}
                  name={`${profile?.firstName} ${profile?.lastName}`}
                  className='w-24 h-24'
                />
                {isEditing && (
                  <Button
                    isIconOnly
                    size='sm'
                    color='primary'
                    className='absolute -bottom-2 -right-2 rounded-full'
                  >
                    <FontAwesomeIcon icon={faCamera} />
                  </Button>
                )}
              </div>
              <div className='text-center'>
                <h3 className='text-lg font-semibold'>
                  {profile?.firstName} {profile?.lastName}
                </h3>
                <p className='text-sm text-default-500'>{profile?.email}</p>
                <Badge variant='flat' color='primary' className='mt-2'>
                  Member since {profile?.dateJoined}
                </Badge>
              </div>
            </div>

            {/* Quick Stats */}
            <div className='grid grid-cols-2 gap-4 border-t pt-4'>
              <div className='text-center'>
                <div className='text-2xl font-bold text-primary'>{profile?.totalBookings}</div>
                <div className='text-xs text-default-500'>Total Bookings</div>
              </div>
              <div className='text-center'>
                <div className='text-2xl font-bold text-primary'>{profile?.favoriteSalons}</div>
                <div className='text-xs text-default-500'>Favorite Salons</div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Contact Information */}
        <div className='lg:col-span-2 space-y-6'>
          <Card shadow='sm'>
            <CardHeader className='font-semibold flex items-center gap-2'>
              <FontAwesomeIcon icon={faUser} className='text-primary' />
              Personal Information
            </CardHeader>
            <CardBody className='space-y-4'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <Input
                  label='First Name'
                  value={isEditing ? formData.firstName : profile?.firstName}
                  onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                  isDisabled={!isEditing}
                />
                <Input
                  label='Last Name'
                  value={isEditing ? formData.lastName : profile?.lastName}
                  onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                  isDisabled={!isEditing}
                />
              </div>
              <Input
                label='Email'
                value={isEditing ? formData.email : profile?.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                isDisabled={!isEditing}
                startContent={<FontAwesomeIcon icon={faEnvelope} />}
              />
              <Input
                label='Phone'
                value={isEditing ? formData.phone : profile?.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                isDisabled={!isEditing}
                startContent={<FontAwesomeIcon icon={faPhone} />}
              />
              <Textarea
                label='Address'
                value={isEditing ? formData.address : profile?.address}
                onChange={e => setFormData({ ...formData, address: e.target.value })}
                isDisabled={!isEditing}
              />
              <Textarea
                label='Bio'
                value={isEditing ? formData.bio : profile?.bio}
                onChange={e => setFormData({ ...formData, bio: e.target.value })}
                isDisabled={!isEditing}
              />
            </CardBody>
          </Card>

          {/* Security */}
          <Card shadow='sm'>
            <CardHeader className='font-semibold flex items-center gap-2'>
              <FontAwesomeIcon icon={faShieldAlt} className='text-primary' />
              Security
            </CardHeader>
            <CardBody className='space-y-4'>
              <div className='flex items-center justify-between p-4 bg-default-100 rounded-lg'>
                <div>
                  <h4 className='font-medium'>Password</h4>
                  <p className='text-sm text-default-500'>Last changed 3 months ago</p>
                </div>
                <Button variant='bordered' size='sm'>
                  <FontAwesomeIcon icon={faLock} className='mr-2' />
                  Change Password
                </Button>
              </div>

              <div className='flex items-center justify-between p-4 bg-default-100 rounded-lg'>
                <div>
                  <h4 className='font-medium'>Two-Factor Authentication</h4>
                  <p className='text-sm text-default-500'>Add an extra layer of security</p>
                </div>
                <Button variant='bordered' size='sm'>
                  Enable 2FA
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}
