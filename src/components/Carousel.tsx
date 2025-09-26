import React, { useEffect } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

type PropType = {
  slides: string[]
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = props => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ playOnInit: true, delay: 10000 }),
  ])

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on('select', () => {
        // Handle slide change if needed
      })
    }
  }, [emblaApi])

  return (
    <>
      <style>
        {`
          :root {
            --slide-height: 19rem;
            --slide-spacing: 1rem;
            --slide-size: 100%;
          }
          .embla__slide__img {
            user-select: none;
          }
        `}
      </style>
      <div className='w-100 mx-auto blur-sm'>
        <div className='overflow-hidden' ref={emblaRef}>
          <div className='flex -ml-4'>
            {slides.map((src, index) => (
              <div className='flex-none w-full pl-4 h-[calc(100vh-138px)]' key={index}>
                <img
                  className='rounded-lg h-76 w-full object-cover embla__slide__img'
                  src={src}
                  alt={`Slide ${index + 1}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default EmblaCarousel
