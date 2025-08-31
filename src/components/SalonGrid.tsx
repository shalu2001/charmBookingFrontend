import { Review, SalonRanked, ServiceWithAvailability } from '../types/salon'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { Image } from '@heroui/react'
import StarRating from './StarRating'
import { calculateRatingAverage } from '../helpers'
import { formatTime } from '../utils/helper'

const SalonGrid = ({
  salons,
  categoryId,
  setHoveredSalon,
  date,
  time,
}: {
  salons: SalonRanked[]
  categoryId: string
  date: string
  time: string
  setHoveredSalon: React.Dispatch<React.SetStateAction<string | undefined>>
}) => (
  <div className='flex-col p-2'>
    {salons
      .sort((a, b) => a.rank - b.rank)
      .map(salon => (
        <SalonCard
          key={salon.id}
          salon={salon}
          categoryId={categoryId}
          date={date}
          time={time}
          onHover={() => setHoveredSalon(salon.id)}
        />
      ))}
  </div>
)

const SalonCard = ({
  salon,
  categoryId,
  onHover,
  date,
  time,
}: {
  salon: SalonRanked
  categoryId: string
  onHover: () => void
  date: string
  time: string
}) => (
  <div className='mb-4 rounded-xl bg-white p-4 w-full shadow-md' onMouseEnter={onHover}>
    <SalonHeader name={salon.name} location={salon.location} />
    <div className='flex-col gap-2 py-2'>
      <SalonImage images={salon.images} name={salon.name} />
      <SalonReviewInfo reviews={salon.reviews} distanceKm={salon.distanceKm} />
      <SalonDescription description={salon.description} />
      <SalonServices services={salon.services} categoryId={categoryId} date={date} time={time} />
      <SalonSeeMoreLink salonId={salon.id} />
    </div>
  </div>
)

const SalonHeader = ({ name, location }: { name: string; location: string }) => (
  <div className='flex-col items-start'>
    <h4 className='font-bold text-large'>{name}</h4>
    <small className='text-default-500'>{location || 'Location not specified'}</small>
  </div>
)

const SalonImage = ({ images, name }: { images: Array<{ url: string }>; name: string }) => (
  <Image
    alt={`${name} image`}
    className='rounded-xl'
    src={images.length > 0 ? images[0].url : ''}
    fallbackSrc='/image1.avif'
    isZoomed
    width={'100%'}
    height={200}
  />
)

const SalonReviewInfo = ({ reviews, distanceKm }: { reviews: Review[]; distanceKm: number }) => (
  <div className='flex items-center gap-2 mt-3 w-full'>
    {reviews.length === 0 ? (
      <div className='text-default-500 text-sm'>No Reviews</div>
    ) : (
      <>
        <div className='flex items-center'>
          {calculateRatingAverage(reviews).toFixed(1)}
          <StarRating name='read-only' value={calculateRatingAverage(reviews)} readOnly={true} />
        </div>
        <div className='text-default-500 text-sm'>({reviews.length} reviews)</div>
      </>
    )}
    <div className='text-default-500 text-sm ml-auto'>{distanceKm.toFixed(2)} km away</div>
  </div>
)

const SalonDescription = ({ description }: { description: string }) => (
  <div className='text-default-500 text-xs'>{description || 'Description not available'}</div>
)

const SalonServices = ({
  services,
  categoryId,
  date,
  time,
}: {
  services: ServiceWithAvailability[]
  categoryId: string
  date: string
  time: string
}) => {
  const navigate = useNavigate()
  return (
    <div className='mt-2 border-t border-default-200'>
      {services.length > 0 && (
        <>
          {services
            .filter(service =>
              service.categories.some(category => category.categoryId === Number(categoryId)),
            )
            .map(service => (
              <div
                className={`rounded-lg flex items-center justify-between border-b border-default-200 p-2 transition-all duration-200 group relative cursor-pointer ${
                  service.slots.length === 0 && !service.nextAvailableSlot
                    ? 'bg-gray-100 cursor-not-allowed pointer-events-none opacity-60 hover:bg-gray-100'
                    : 'hover:bg-quaternary'
                }`}
                key={service.serviceId}
                onClick={
                  service.slots.length === 0 && !service.nextAvailableSlot
                    ? undefined
                    : () =>
                        navigate({
                          pathname: '/book/timeslot',
                          search: `?salonId=${service.salonId}&serviceId=${service.serviceId}&date=${date}&time=${time}`,
                        })
                }
              >
                <div className='flex-col w-full' key={service.serviceId}>
                  <div className='flex items-center'>
                    <div className='flex-1'>
                      <div>{service.name}</div>
                      <div className='text-default-500 text-sm'>
                        {service.duration + service.bufferTime} mins
                      </div>
                    </div>
                  </div>
                  <div>
                    {service.slots.length > 0 ? (
                      <div className='text-success-600 text-sm'>
                        Available at {formatTime(service.slots[0].startTime)}
                      </div>
                    ) : service.nextAvailableSlot ? (
                      <div className='text-warning-600 text-sm'>
                        Next available slot: {formatTime(service.nextAvailableSlot.startTime)}
                      </div>
                    ) : (
                      <div className='text-warning-600 text-sm'>No available slots</div>
                    )}
                  </div>
                </div>
                {service.price.toLocaleString('en-LK', {
                  style: 'currency',
                  currency: 'LKR',
                  minimumFractionDigits: 0,
                })}
                <button
                  className={`overflow-hidden w-0 transition-all ${
                    service.slots.length === 0 && !service.nextAvailableSlot
                      ? 'opacity-0'
                      : 'opacity-0 group-hover:opacity-100 group-hover:w-10'
                  }`}
                  tabIndex={-1}
                  type='button'
                  disabled={service.slots.length === 0 && !service.nextAvailableSlot}
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>
            ))}
        </>
      )}
    </div>
  )
}

const SalonSeeMoreLink = ({ salonId }: { salonId: string }) => (
  <div className='flex justify-end mt-4 hover:*:text-primary-600'>
    <Link to={`/salon/${salonId}`} className='text-primary-500 hover:border-b-1 border-blue-500'>
      See More <FontAwesomeIcon icon={faChevronRight} />
    </Link>
  </div>
)

export default SalonGrid
