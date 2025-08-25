import { Children, useRef } from 'react'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function HorizontalScroll({
  children,
  size = 4,
}: {
  children: React.ReactNode
  size?: number
}) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -clientWidth : clientWidth,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className='relative w-full'>
      {/* Left Arrow */}
      <button
        onClick={() => scroll('left')}
        className='absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100'
      >
        <FontAwesomeIcon icon={faChevronLeft} size='lg' />
      </button>

      {/* Scrollable Content */}
      <div
        ref={scrollRef}
        className='flex overflow-x-auto scroll-smooth no-scrollbar space-x-4 p-12 z-0'
      >
        {Children.map(children, child => (
          <div style={{ flex: `0 0 calc(${100 / size}% - 1rem)` }}>{child}</div>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={() => scroll('right')}
        className='absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100'
      >
        <FontAwesomeIcon icon={faChevronRight} size='lg' />
      </button>
    </div>
  )
}
