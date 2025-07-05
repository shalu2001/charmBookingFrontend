import { Form, Input, Button, Textarea } from '@heroui/react'
import ImageUpload from '../../components/ImageUpload'
import CustomLocationPicker from '../../components/CustomLocationPicker'
import React, { useCallback, useState } from 'react'
import { RegisterSalonDTO } from '../../types/salon'
import { registerSalon } from '../../actions/salonActions'

const RegisterSalon = () => {
  const [salonImages, setSalonImages] = useState<string[]>([])
  const [location, setLocation] = useState<[number, number]>()
  const [locationError, setLocationError] = useState<string>('')

  const handleImageChange = useCallback((base64Images: string[]) => {
    setSalonImages(base64Images)
  }, [])

  const handleLocationChange = useCallback((newLocation: [number, number] | null) => {
    if (newLocation) {
      setLocation(newLocation)
      setLocationError('') // Clear error when location is valid
    } else {
      setLocation(undefined)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!location) {
      setLocationError('Location is required.')
      return
    }

    const data = Object.fromEntries(new FormData(e.currentTarget)) as unknown as RegisterSalonDTO
    const formData: RegisterSalonDTO = {
      ...data,
      salonImages,
      latitude: location[0],
      longitude: location[1],
    }
    const res = await registerSalon(formData)
    if (res) {
      console.log('Salon registered successfully:', res)
      // Optionally redirect or show success message
    } else {
      console.error('Failed to register salon')
      // Optionally show error message
    }
  }

  return (
    <div className='min-h-screen flex flex-col items-center justify-center px-6 py-10 font-instrumentSerif'>
      <h1 className='text-4xl font-semibold mb-8 text-center'>REGISTER FORM</h1>
      <Form
        onSubmit={handleSubmit}
        className='w-2/3 bg-white p-10 rounded-xl shadow-md items-center'
      >
        <div className='flex flex-row gap-6 w-full'>
          <div className='w-1/2 flex flex-col gap-6'>
            <Input
              isRequired
              label='Business Email'
              labelPlacement='outside'
              name='email'
              placeholder='Enter your email'
              type='email'
            />
            <Input
              isRequired
              label='Owner Name'
              labelPlacement='outside'
              name='ownerName'
              placeholder="Enter the owner's name"
              type='text'
            />
            <Input
              isRequired
              label='Location'
              labelPlacement='outside'
              name='location'
              placeholder='Select your business location'
              type='text'
            />
            <CustomLocationPicker initialLocation={null} onChange={handleLocationChange} />
            {locationError && <p className='text-red-500 text-sm mt-2'>{locationError}</p>}
          </div>

          <div className='w-1/2 flex flex-col gap-6'>
            <Input
              isRequired
              label='Business Name'
              labelPlacement='outside'
              name='name'
              placeholder='Enter your business name'
              type='text'
            />
            <Input
              isRequired
              label='Business Phone No.'
              labelPlacement='outside'
              name='phone'
              placeholder='Enter your business phone number'
              type='tel'
            />
            <Textarea
              isRequired
              label='Business Description'
              labelPlacement='outside'
              name='description'
              placeholder='Enter a brief description of your business'
              rows={4}
            />
            <ImageUpload
              label='Add photos of your Business'
              name='salonImages'
              multiple={true}
              onChange={handleImageChange}
            />
          </div>
        </div>

        <div className='flex justify-end gap-4 mt-8'>
          <Button color='primary' type='submit'>
            Submit
          </Button>
          <Button type='reset' variant='flat'>
            Reset
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default RegisterSalon
