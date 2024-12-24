import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faMapMarkerAlt, faCalendarAlt, faClock } from '@fortawesome/free-solid-svg-icons';

const SearchBar = () => {
  return (
    <div className="p-4 bg-quaternary border-0 shadow-md flex space-x-4 rounded-full">
      <div className="flex items-center space-x-2">
        <FontAwesomeIcon icon={faSearch} />
        <input
          type="text"
          placeholder="Service or Venue"
          className="w-full p-2 rounded-full focus:outline-none"
        />
      </div>
      <div className="flex items-center space-x-2">
        <FontAwesomeIcon icon={faMapMarkerAlt} />
        <input
          type="text"
          placeholder="Location"
          className="w-full p-2 rounded-full focus:outline-none"
        />
      </div>
      <div className="flex items-center space-x-2">
        <FontAwesomeIcon icon={faCalendarAlt} />
        <input
          type="date"
          className="w-full p-2 rounded-full focus:outline-none"
        />
      </div>
      <div className="flex items-center space-x-2">
        <FontAwesomeIcon icon={faClock} />
        <input
          type="time"
          className="w-full p-2 rounded-full focus:outline-none"
        />
      </div>
      <button className="bg-primary text-white p-2 rounded-full flex items-center space-x-2">
        <FontAwesomeIcon icon={faSearch} />
        <span>Search</span>
      </button>
    </div>
  );
};

export default SearchBar;