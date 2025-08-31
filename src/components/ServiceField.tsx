import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faCirclePlus } from '@fortawesome/free-solid-svg-icons'
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
      className='mb-4 h-20 rounded-lg flex items-center justify-between bg-white py-2 px-4 border border-gray-300 shadow-sm transition-all duration-200 group relative cursor-pointer hover:shadow-lg hover:bg-tertiary hover:text-primary'
    >
      <div className='flex-col w-full'>
        <div className='flex items-center'>
          <div className='flex-1'>
            <div>{serviceName}</div>
            <div className='text-default-500 group-hover:text-default-600 text-sm'>{time} mins</div>
          </div>
        </div>
      </div>
      {price.toLocaleString('en-LK', {
        style: 'currency',
        currency: 'LKR',
        minimumFractionDigits: 0,
      })}
      <button
        className='overflow-hidden w-0 transition-all opacity-0 group-hover:opacity-100 group-hover:w-10'
        tabIndex={-1}
        type='button'
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  )
}

export default ServiceField
