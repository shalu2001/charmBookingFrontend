import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faMapMarkerAlt, faCalendarAlt, faClock } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@heroui/react'

const SearchBar = () => {
  const [location, setLocation] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [service, setService] = useState('')

  const handleSearch = (): void => {
    console.log('searching...')
    console.log('service:', service)
    console.log('location:', location)
    console.log('date:', date)
    console.log('time:', time)
  }

  return (
    <div className='p-4 bg-quaternary border-0 shadow-md flex space-x-4 rounded-xl'>
      <div className='flex items-center space-x-2 w-1/4'>
        <FontAwesomeIcon icon={faSearch} />
        <input
          type='text'
          placeholder='Service or Venue'
          className='w-full p-2 rounded-xl focus:outline-none text-center'
          onChange={e => setService(e.target.value)}
        />
      </div>
      <div className='flex items-center space-x-2 w-1/4'>
        <FontAwesomeIcon icon={faMapMarkerAlt} />
        <input
          type='text'
          placeholder='Location'
          className='w-full p-2 rounded-xl focus:outline-none text-center'
          onChange={e => setLocation(e.target.value)}
        />
      </div>
      <div className='flex items-center space-x-2 w-1/4'>
        <FontAwesomeIcon icon={faCalendarAlt} />
        <input
          type='date'
          className='w-full p-2 rounded-xl focus:outline-none text-center'
          onChange={e => setDate(e.target.value)}
        />
      </div>
      <div className='flex items-center space-x-2 w-1/4'>
        <FontAwesomeIcon icon={faClock} />
        <input
          type='time'
          className='w-full p-2 rounded-xl focus:outline-none'
          onChange={e => setTime(e.target.value)}
        />
      </div>
      <Button
        color='secondary'
        radius='lg'
        variant='shadow'
        className='text-center text-black'
        onClick={() => handleSearch()}
      >
        <FontAwesomeIcon icon={faSearch} />
        <div>Search</div>
      </Button>
    </div>
  )
}

export default SearchBar
