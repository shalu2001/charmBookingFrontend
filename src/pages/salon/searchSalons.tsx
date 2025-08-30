import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getSalonsRanked } from '../../actions/salonActions'
import CustomMapContainer from '../../components/Leaflet/CustomMapContainer'
import SalonGrid from '../../components/SalonGrid'
import { ScrollShadow, Spinner } from '@heroui/react'

const SearchSalons = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const category = searchParams.get('category')
  const latitude = searchParams.get('latitude')
  const longitude = searchParams.get('longitude')
  const date = searchParams.get('date')
  const time = searchParams.get('time')

  const [hoveredSalon, setHoveredSalon] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (!category || !latitude || !longitude || !date || !time) {
      navigate('/')
    }
  }, [category, latitude, longitude, date, time, navigate])

  const { data: salons, isLoading } = useQuery({
    queryKey: ['salons', { category, latitude, longitude, date, time }],
    queryFn: () =>
      getSalonsRanked({
        categoryId: Number(category),
        latitude: Number(latitude),
        longitude: Number(longitude),
        date: date!,
        time: time!,
      }),
  })
  console.log(salons)
  return (
    <div className='flex h-[calc(100vh-64px-8px)]'>
      {isLoading && !salons ? (
        <Spinner />
      ) : (
        <>
          <ScrollShadow className='flex-1 p-2 w-full h-full' hideScrollBar>
            <SalonGrid salons={salons!} categoryId={category!} setHoveredSalon={setHoveredSalon} />
          </ScrollShadow>
          <div className='w-[70vw]'>
            {salons && (
              <CustomMapContainer
                salons={salons}
                hoverId={hoveredSalon}
                userLocation={[Number(latitude), Number(longitude)]}
                scrollWheelZoom={true}
              />
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default SearchSalons
