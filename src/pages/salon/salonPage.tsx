import { useState, useRef, useEffect } from 'react'
import ModalComponent from '../../components/Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import StarRating from '../../components/StarRating'
import { useParams } from 'react-router-dom'
import ServiceField from '../../components/ServiceField'
import { Category, Salon } from '../../types/salon'
import { calculateRatingAverage } from '../../helpers'
import ReviewCard from '../../components/Cards/ReviewCard'
import { formatTime } from '../../utils/helper'
import { useQuery } from '@tanstack/react-query'
import { getSalonById } from '../../actions/customerActions'
import { CircularProgress } from '@heroui/react'

const SalonPage = () => {
  const { salonId } = useParams()
  console.log('Salon ID:', salonId)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

  const { data: salonData, isPending: LoadingSalonData } = useQuery({
    queryKey: ['salon', salonId],
    queryFn: () => getSalonById(salonId!),
    enabled: !!salonId,
  })

  const imageUrls = salonData?.images?.map(img => img.url) || []
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const scrollLeft = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: -100, behavior: 'smooth' })
  }

  const scrollRight = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: 100, behavior: 'smooth' })
  }

  if (LoadingSalonData) return <CircularProgress />

  return (
    <div className='p-20'>
      <div className='grid grid-cols-2 grid-rows-2 gap-2 w-full h-96'>
        {salonData?.images && salonData.images.length > 0 ? (
          <>
            {/* First image spans both columns in the first row */}
            <div className='col-span-1 row-span-2'>
              <img
                src={salonData.images[0].url}
                alt={`${salonData.name} - Image 1`}
                className='w-full h-full object-cover rounded-xl'
              />
            </div>
            {/* Second image in the first column of the second row */}
            {salonData.images[1] && (
              <div
                className={`col-span-1 ${
                  salonData.images.length > 2 ? 'row-span-1' : 'row-span-2'
                } relative`}
              >
                <img
                  src={salonData.images[1].url}
                  alt={`${salonData.name} - Image 2`}
                  className='w-full h-full object-cover rounded-xl'
                />
              </div>
            )}
            {/* Third image in the second column of the second row */}
            <div className='col-span-1 row-span-1 relative'>
              {salonData.images[2] && (
                <>
                  <img
                    src={salonData.images[2].url}
                    alt={`${salonData.name} - Image 3`}
                    className='w-full h-full object-cover rounded-xl'
                  />
                  {salonData.images.length > 3 && (
                    <div
                      className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white cursor-pointer rounded-xl'
                      onClick={handleOpen}
                    >
                      +{salonData.images.length - 3} More
                    </div>
                  )}
                </>
              )}
            </div>
          </>
        ) : (
          <div className='col-span-2 row-span-2 flex items-center justify-center bg-gray-100 rounded-xl'>
            <p className='text-gray-500'>No images available</p>
          </div>
        )}
      </div>
      <ModalComponent images={imageUrls} isOpen={isOpen} onClose={handleClose} />

      <div className='font-instrumentSerif text-5xl font-bold m-4'>{salonData?.name}</div>
      <div className='font-instrumentSerif text-xl m-4 flex space-x-4'>
        {salonData?.reviews && salonData.reviews.length > 0 ? (
          <>
            {/* <span>{calculateRatingAverage(salonData.reviews)}</span> */}
            <div className='flex items-center'>
              <StarRating
                name='read-only'
                value={calculateRatingAverage(salonData.reviews)}
                readOnly={true}
                size='medium'
              />
            </div>
            <span>
              ({salonData.reviews.length} {salonData.reviews.length === 1 ? 'review' : 'reviews'})
            </span>
          </>
        ) : (
          <span>No reviews yet</span>
        )}
        {/* <span>{salonCurrentStatus}</span> */}
        {/* <span>{salonData?.workingHours.monday}</span> */}
      </div>
      <div className='font-instrumentSerif text-xl m-4 flex items-center'>
        <FontAwesomeIcon icon={faMapMarkerAlt} className='mr-2' />
        <span>{salonData?.location}</span>
      </div>

      {/* Scrollable Category Bar */}

      <div className='font-instrumentSerif text-4xl m-4 mt-20'>Services</div>
      <div className='flex flex-row'>
        <div className='flex flex-col w-1/2 justify-center'>
          <div className='relative flex items-center my-4'>
            <button
              onClick={scrollLeft}
              className='absolute left-0 z-10 p-2 bg-white shadow-lg rounded-full'
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <div
              ref={scrollRef}
              className='flex overflow-x-auto no-scrollbar w-full whitespace-nowrap mx-10 scrollbar-hide'
            >
              {/* Add "All" button */}
              <button
                key='all-categories'
                className={`px-4 py-2 mx-2 text-sm font-semibold rounded-lg ${
                  !selectedCategory ? 'bg-tertiary text-white' : 'bg-gray-200'
                }`}
                onClick={() => setSelectedCategory(null)}
              >
                All
              </button>
              {[
                ...new Map(
                  (salonData?.services || []).flatMap(service =>
                    service.categories.map(category => [category.categoryId, category]),
                  ),
                ).values(),
              ].map((category, index) => (
                <button
                  key={category.categoryId || `category-${index}`}
                  className={`px-4 py-2 mx-2 text-sm font-semibold rounded-lg ${
                    selectedCategory?.categoryId === category?.categoryId
                      ? 'bg-tertiary text-white'
                      : 'bg-gray-200'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category.name}
                </button>
              ))}
            </div>
            <button
              onClick={scrollRight}
              className='absolute right-0 z-10 p-2 bg-white shadow-lg rounded-full'
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
          {(salonData?.services || [])
            .filter(
              service =>
                !selectedCategory || // Show all services if no category selected
                service.categories.some(
                  category => category.categoryId === selectedCategory.categoryId,
                ),
            )
            .map(service => (
              <ServiceField
                salonId={salonData?.id}
                serviceId={service.serviceId}
                serviceName={service.name}
                price={service.price}
                time={service.duration?.toString() || '30'}
              />
            ))}
        </div>
      </div>

      {/*About us section */}
      <div className='m-4 mt-20'>
        <div className='flex flex-row items-center gap-4 font-instrumentSerif text-4xl'>
          About Us
        </div>
        <div className='flex flex-row items-center gap-4  text-xl mt-4'>
          <div className='flex flex-col w-1/2 space-y-8'>
            <div className='items-start mr-5'>
              {salonData?.description || 'No description available'}
            </div>
            <div
              className='flex flex-col w-1/2 items-center p-3 rounded-3xl shadow-lg'
              style={{ backgroundColor: 'var(--tertiary)' }}
            >
              <h3 className='font-semibold text-2xl mb-4'>Working Hours</h3>
              <div className='space-y-1 text-lg'>
                {salonData?.weeklyHours
                  .sort((a, b) => {
                    const days = [
                      'Monday',
                      'Tuesday',
                      'Wednesday',
                      'Thursday',
                      'Friday',
                      'Saturday',
                      'Sunday',
                    ]
                    return days.indexOf(a.day_of_week) - days.indexOf(b.day_of_week)
                  })
                  .map(hours => (
                    <div key={hours.id} className='flex justify-start'>
                      <span className='font-medium w-32'>{hours.day_of_week}</span>
                      <span>
                        {formatTime(hours.open_time)} - {formatTime(hours.close_time)}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className='flex flex-col w-1/2'>
            {salonData?.location && (
              <iframe
                width='100%'
                height='450'
                style={{ border: 0, borderRadius: '20px' }}
                loading='lazy'
                src={`https://maps.google.com/maps?&height=400&hl=en&q=${salonData.latitude},${salonData.longitude}&t=&z=14&ie=UTF8&iwloc=B&output=embed`}
              ></iframe>
            )}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      {salonData?.reviews && salonData.reviews.length > 0 ? (
        <div className='m-4 mt-20'>
          <div className='flex flex-row items-center gap-4 font-instrumentSerif'>
            <div className='text-4xl'>Reviews</div>
            {/* <div className='mt-2 text-xl'>{calculateRatingAverage(salonData.reviews)}</div> */}
            <div className='mt-3'>
              <StarRating
                name='read-only'
                value={calculateRatingAverage(salonData.reviews)}
                readOnly={true}
              />
            </div>
          </div>
          <div className='flex flex-wrap gap-6 mt-4'>
            {salonData.reviews.map((review, index) => (
              <ReviewCard key={index} review={review} />
            ))}
          </div>
        </div>
      ) : (
        <div className='m-4 mt-20'>
          <div className='flex flex-row items-center gap-4 font-instrumentSerif text-4xl'>
            Reviews
          </div>
          <div className='text-xl'>No reviews yet</div>
        </div>
      )}
    </div>
  )
}

export default SalonPage
