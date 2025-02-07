import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faMapMarkerAlt, faCalendarAlt, faClock } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@nextui-org/react';

const SearchBar = () => {
  return (
    <div className="p-4 bg-quaternary border-0 shadow-md flex space-x-4 rounded-xl">
      <div className="flex items-center space-x-2 w-1/4">
        <FontAwesomeIcon icon={faSearch} />
        <input
          type="text"
          placeholder="Service or Venue"
          className="w-full p-2 rounded-xl focus:outline-none text-center"
        />
      </div>
      <div className="flex items-center space-x-2 w-1/4">
        <FontAwesomeIcon icon={faMapMarkerAlt} />
        <input
          type="text"
          placeholder="Location"
          className="w-full p-2 rounded-xl focus:outline-none text-center"
        />
      </div>
      <div className="flex items-center space-x-2 w-1/4">
        <FontAwesomeIcon icon={faCalendarAlt} />
        <input
          type="date"
          className="w-full p-2 rounded-xl focus:outline-none text-center"
        />
      </div>
      <div className="flex items-center space-x-2 w-1/4">
        <FontAwesomeIcon icon={faClock} />
        <input
          type="time"
          className="w-full p-2 rounded-xl focus:outline-none"
        />
      </div>
      <Button color="secondary" radius="lg" variant="shadow" className="text-center text-black">
        <FontAwesomeIcon icon={faSearch} />
        <div >Search</div>
      </Button>
    </div>
  );
};

export default SearchBar;