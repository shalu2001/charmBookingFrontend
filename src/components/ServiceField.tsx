import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { createSearchParams, useNavigate } from 'react-router-dom'

interface ServiceFieldProps {
  salonId?: string
  serviceId?: string
  serviceName: string
  price: number
  time: string
}

const ServiceField: React.FC<ServiceFieldProps> = ({
  serviceName,
  price,
  time,
  serviceId,
  salonId,
}) => {
  const navigate = useNavigate()

  const handleServiceClick = () => {
    if (salonId && serviceId) {
      navigate({
        pathname: '/book/timeslot',
        search: `?${new URLSearchParams(
          createSearchParams({
            salonId: salonId,
            serviceId: serviceId,
          }),
        ).toString()}`,
      })
    }
  }

  return (
    <div
      onClick={handleServiceClick}
      className='flex flex-col pt-2 pr-4 pl-4 pb-2 border-collapse rounded-2xl bg-tertiary text-black m-4 shadow-md'
    >
      <div className='flex justify-between items-center'>
        <div className='flex flex-col'>
          <div className='text-medium'>{serviceName}</div>
          <div className='text-xs mb-3'>{time} minutes</div>
          <div className='text-xs'>LKR {price}</div>
        </div>
        <button className='ml-auto'>
          <FontAwesomeIcon icon={faCirclePlus} />
        </button>
      </div>
    </div>
  )
}

export default ServiceField
