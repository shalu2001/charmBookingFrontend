import { useState, useRef, useEffect } from 'react'
import Layout from '../../layout/layout'
import ModalComponent from '../../components/Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import StarRating from '../../components/StarRating'
import { Button } from '@heroui/react'
import { useParams } from 'react-router-dom'
import ServiceField from '../../components/ServiceField'
import { Category, Salon } from '../../types/salon'
import { calculateRatingAverage } from '../../helpers'
import ReviewCard from '../../components/ReviewCard'

const SalonPage = () => {
  const { salonId } = useParams()
  console.log('Salon ID:', salonId)
  const [salonData, setSalonData] = useState<Salon | null>(null)
  const [loading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

  const getSalonData = async (salonId: string) => {
    try {
      setLoading(true)
      if (salonId) {
        const response = await fetch(`http://localhost:3000/booking/getSalonById/${salonId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if (!response.ok) {
          throw new Error('Error: ' + response.statusText)
        }
        const salonDataResponse = await response.json() // Parse JSON response
        setLoading(false)
        setSalonData(salonDataResponse)
      }
    } catch (error) {
      setLoading(false)
      console.error('Error fetching salon data:', error)
    }
  }

  useEffect(() => {
    if (salonId) {
      getSalonData(salonId)
    }
  }, [salonId])

  const scrollRef = useRef<HTMLDivElement>(null)
  const images = [
    '/image1.avif',
    '/image2.jpeg',
    '/image3.avif',
    '/image3.avif',
    // Add more image paths here
  ]

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const scrollLeft = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: -100, behavior: 'smooth' })
  }

  const scrollRight = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: 100, behavior: 'smooth' })
  }

  if (loading) return <div>Loading...</div>
  // if (isError) return <div>Error fetching salon</div>;

  return (
    <Layout>
      <div className='p-20'>
        <div className='grid grid-cols-2 grid-rows-2 gap-2 w-full h-96 '>
          <div className='col-span-1 row-span-2'>
            <img src={images[0]} alt='Salon' className='w-full h-full object-cover rounded-xl' />
          </div>
          <div className='row-span-1'>
            <img src={images[1]} alt='Salon' className='w-full h-full object-cover rounded-xl' />
          </div>
          <div className='row-span-1 relative'>
            <img src={images[2]} alt='Salon' className='w-full h-full object-cover rounded-xl' />
            {images.length > 3 && (
              <div
                className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white cursor-pointer'
                onClick={handleOpen}
              >
                See More
              </div>
            )}
          </div>
        </div>
        <ModalComponent images={images} isOpen={isOpen} onClose={handleClose} />

        <div className='font-instrumentSerif text-5xl font-bold m-4'>{salonData?.name}</div>
        <div className='font-instrumentSerif text-xl m-4 flex space-x-4'>
          {salonData?.reviews && salonData.reviews.length > 0 ? (
            <>
              <span>{calculateRatingAverage(salonData.reviews)}</span>
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

        {/* services and payment section  */}

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
              .map((service, index) => (
                <ServiceField
                  key={service.serviceId || index}
                  serviceName={service.name}
                  price={service.price}
                  time={service.duration?.toString() || '30'}
                  onChange={() => {}}
                />
              ))}
          </div>
          <div className='flex flex-row w-1/2 justify-center'>
            <div className='bg-tertiary p-5 rounded-2xl flex items-center'>
              <img
                src='/image1.avif'
                alt='Salon'
                className='w-36 h-16 object-cover rounded-lg mr-5'
              />
              <div className='flex flex-col'>
                <h2 className='font-instrumentSerif text-3xl'>{salonData?.name}</h2>
                <p className='font-instrumentSerif text-xl flex items-center'>
                  <FontAwesomeIcon icon={faMapMarkerAlt} className='mr-2' />
                  {salonData?.location}
                </p>
              </div>
              <Button
                color='secondary'
                radius='lg'
                variant='shadow'
                className='text-center text-black flex flex-row'
                onClick={() => {}}
              >
                <div className='font-instrumentSerif'>Continue</div>
              </Button>
            </div>
          </div>
        </div>

        {/*About us section */}
        <div className='m-4 mt-20'>
          <div className='flex flex-row items-center gap-4 font-instrumentSerif text-4xl'>
            About Us
          </div>
          <div className='flex flex-row items-center gap-4 font-instrumentSerif text-xl mt-4'>
            <div className='flex flex-col w-1/2 space-y-8'>
              <div className='items-start'>
                {salonData?.description || 'No description available'}
              </div>
              <div>
                <h3 className='font-semibold text-2xl mb-4'>Working Hours</h3>
                <div className='space-y-1 text-lg'>
                  <div>Monday : 8.00 AM - 5.00 PM</div>
                  <div>Tuesday : 8.00 AM - 5.00 PM</div>
                  <div>Wednesday : 8.00 AM - 5.00 PM</div>
                  <div>Thursday : 8.00 AM - 5.00 PM</div>
                  <div>Friday : 8.00 AM - 5.00 PM</div>
                  <div>Saturday : 8.00 AM - 5.00 PM</div>
                  <div>Sunday : 8.00 AM - 5.00 PM</div>
                </div>
              </div>
            </div>
            <div className='flex flex-col w-1/2'>
              {salonData?.location && (
                <iframe
                  width='100%'
                  height='450'
                  style={{ border: 0 }}
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
              <div className='mt-2 text-xl'>{calculateRatingAverage(salonData.reviews)}</div>
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
    </Layout>
  )
}

export default SalonPage
