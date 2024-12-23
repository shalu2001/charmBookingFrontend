import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
//import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-8 mt-10">
    <div className="container mx-auto flex justify-between items-start">
      <div className="w-1/2">
        <h1 className="text-3xl font-bold">Charmbooking</h1>
        <p className="mt-2">
          Discover nearby salons and book appointments. Find the best service and products based on your preference.
        </p>
      </div>
      <div className="w-1/2 text-right">
        <ul className="space-y-2">
          <li>
            <a href="/about" className="hover:underline">About Us</a>
          </li>
          <li>
            <a href="/contact" className="hover:underline">Contact Us</a>
          </li>
          <li className="flex justify-end space-x-4 mt-4">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebook} size="2x" />
            </a>
          </li>
          <li className="flex justify-end space-x-4 mt-4">
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
  );
};

export default Footer;