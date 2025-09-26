import { Card, CardHeader, CardBody, Image } from '@heroui/react'
import { useNavigate } from 'react-router-dom'
import { Salon } from '../../types/salon'
import { calculateRatingAverage } from '../../helpers'
import StarRating from '../StarRating'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

interface SalonCardProps {
  salon: Salon
}

const SalonCard: React.FC<SalonCardProps> = ({ salon }) => {
  const navigate = useNavigate()
  return (
    <div
      className='mb-4 rounded-xl bg-white p-4 w-96 shadow-md hover:shadow-xl transition-shadow duration-200 cursor-pointer group'
      onClick={() => navigate(`/salon/${salon.id}`)}
    >
      <div className='flex-col items-start'>
        <h4 className='font-semibold text-xl'>{salon.name}</h4>
        <small className='text-default-500'>{salon.location || 'Location not specified'}</small>
      </div>
      <div className='flex flex-col gap-4 py-2'>
        <img
          className='object-cover rounded-lg h-52 w-full'
          alt='Card background'
          src={salon.images && salon.images.length > 0 ? salon.images[0].url : ''}
          onError={e => {
            e.currentTarget.src = '/signup-drawing.avif'
          }}
        />
        <div className='flex w-full'>
          <div className='flex flex-col w-full'>
            <div className='flex items-center gap-2 mt-3 w-full'>
              {salon.reviews.length === 0 ? (
                <div className='text-default-500 text-sm'>No Reviews</div>
              ) : (
                <>
                  <div className='flex items-center'>
                    {calculateRatingAverage(salon.reviews).toFixed(1)}
                    <StarRating
                      name='read-only'
                      value={calculateRatingAverage(salon.reviews)}
                      readOnly={true}
                    />
                  </div>
                  <div className='text-default-500 text-sm'>({salon.reviews.length} reviews)</div>
                </>
              )}
            </div>
            <div className='text-default-500 text-xs truncate w-72'>
              {salon.description || 'Description not available'}
            </div>
          </div>
          <button
            className='overflow-hidden w-0 transition-all opacity-0 group-hover:opacity-100 group-hover:w-10'
            tabIndex={-1}
            type='button'
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default SalonCard
