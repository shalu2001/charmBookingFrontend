import { Image } from '@heroui/react'
import { SalonRanked } from '../types/salon'
import StarRating from './StarRating'
import { calculateRatingAverage } from '../helpers'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

const SalonGrid = ({
  salons,
  categoryId,
  setHoveredSalon,
}: {
  salons: SalonRanked[]
  categoryId: string
  setHoveredSalon: React.Dispatch<React.SetStateAction<string | undefined>>
}) => {
  return (
    <div className='flex-col p-2'>
      {salons
        .sort((a, b) => a.rank - b.rank)
        .map(salon => (
          <div
            key={salon.id}
            className='mb-4 rounded-xl bg-white p-4 w-full shadow-sm hover:shadow-lg transition-shadow duration-200'
            onMouseEnter={() => {
              setHoveredSalon(salon.id)
            }}
            onMouseLeave={() => {
              setHoveredSalon(undefined)
            }}
          >
            <div className='flex-col items-start'>
              <h4 className='font-bold text-large'>{salon.name}</h4>
              <small className='text-default-500'>
                {salon.location || 'Location not specified'}
              </small>
            </div>
            <div className='flex-col gap-2 py-2'>
              <Image
                alt={`${salon.name} image`}
                className='rounded-xl'
                src={salon.images.length > 0 ? salon.images[0].url : ''}
                fallbackSrc='/image1.avif'
                isZoomed
                width={'100%'}
                height={200}
              />
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
                <div className='text-default-500 text-sm ml-auto'>
                  {salon.distanceKm.toFixed(2)} km away
                </div>
              </div>
              <div className='text-default-500 text-xs'>
                {salon.description || 'Description not available'}
              </div>
              <div className='mt-2 border-t border-default-200'>
                {salon.services.length > 0 && (
                  <>
                    {salon.services
                      .filter(service =>
                        service.categories.some(
                          category => category.categoryId === Number(categoryId),
                        ),
                      )
                      .map(service => (
                        <div
                          key={service.serviceId}
                          className='flex justify-between items-center border-b border-default-200 py-2'
                        >
                          <div>
                            <div>{service.name}</div>
                            <div className='text-default-500 text-sm'>
                              {service.duration + service.bufferTime} mins
                            </div>
                          </div>
                          {service.price.toLocaleString('en-LK', {
                            style: 'currency',
                            currency: 'LKR',
                            minimumFractionDigits: 0,
                          })}
                        </div>
                      ))}
                  </>
                )}
              </div>
              <div className='flex justify-end mt-4 hover:*:text-primary-600'>
                <Link
                  to={`/salon/${salon.id}`}
                  className='text-primary-500 hover:border-b-1 border-blue-500'
                >
                  See More <FontAwesomeIcon icon={faChevronRight} />
                </Link>
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}

export default SalonGrid
