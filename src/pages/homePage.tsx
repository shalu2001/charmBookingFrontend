import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';
import SalonCard from '../components/SalonCard';
import EmblaCarousel from '../components/Carousel';
import { EmblaOptionsType } from 'embla-carousel';
import { getSalons } from '../actions/salonActions';
import { useQuery } from '@tanstack/react-query';
// import { useState } from 'react';

const products = [
  { name: 'Revitalizing Shampoo', description: 'Nourishes and strengthens hair', price: 15.99, rating: 4.5, image: '/bellose.jpeg' },
  { name: 'Hydrating Conditioner', description: 'Moisturizes and detangles hair', price: 12.99, rating: 4.7, image: '/bellose.jpeg' },
  { name: 'Facial Cleanser', description: 'Gently cleanses and refreshes skin', price: 9.99, rating: 4.3, image: '/bellose.jpeg' },
  { name: 'Anti-Aging Serum', description: 'Reduces wrinkles and fine lines', price: 29.99, rating: 4.8, image: '/sillicone hair treatment.jpeg' },
  // { name: 'Moisturizing Lotion', description: 'Hydrates and softens skin', price: 19.99, rating: 4.6, image: 'lotion.jpg' },
  // { name: 'Exfoliating Scrub', description: 'Removes dead skin cells', price: 14.99, rating: 4.4, image: 'scrub.jpg' },
  // { name: 'Sunscreen SPF 50', description: 'Protects skin from UV rays', price: 17.99, rating: 4.7, image: 'sunscreen.jpg' },
  // { name: 'Hair Mask', description: 'Deeply conditions and repairs hair', price: 22.99, rating: 4.5, image: 'hairmask.jpg' },
  // Add more products here
];

const OPTIONS: EmblaOptionsType = { loop: true, duration: 60 }; 
const SLIDES = [
  '/image1.avif',
  '/image2.jpeg',
  '/image3.avif',
  // Add more image paths here
];

const HomePage = () => {
  const { data: salons } = useQuery({queryKey: ['salons'], queryFn: getSalons});
  return (
    <div>
      <Header />
        <div className="relative w-screen h-screen">
          <EmblaCarousel slides={SLIDES} options={OPTIONS} />
            <div className="w-fit h-fit absolute inset-0 bg-clip-text text-transparent bg-gradient-to-br from-black to-quaternary drop-shadow-lg">
              <p className="text-8xl font-instrumentSerif text-left pr-20 pl-20 pt-20 pb-0">Salon and Beauty</p>
              <p className="text-8xl font-instrumentSerif text-left pr-20 pl-20 pt-5 pb-20">Services</p>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <SearchBar />
            </div>
        </div>
        <div className="p-20">
          <h2 className="font-instrumentSerif text-5xl mb-4">Salons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {salons?.map((salon, index) => (
              <SalonCard key={index} salon={salon}/>
            ))}
          </div>
        </div>
        <div className="p-20">
          <h2 className="font-instrumentSerif text-5xl mb-4">Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </div>

        <div className="p-20">
            <h2 className="font-instrumentSerif text-5xl mb-4">Why you should use Charmbooking?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              <div className="relative bg-white shadow-md rounded-lg overflow-hidden">
          <img src="/image1.avif" alt="Convenience" className="w-full h-full object-cover" />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4">
            <h3 className="text-xl font-semibold mb-2 text-white">Personalized Recommendations</h3>
            <p className="text-white">Tailored beauty product suggestions based on user preferences, medical conditions, and past bookings.</p>
          </div>
              </div>
              <div className="relative bg-white shadow-md rounded-lg overflow-hidden">
          <img src="/image2.jpeg" alt="Variety" className="w-full h-full object-cover" />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4">
            <h3 className="text-xl font-semibold mb-2 text-white">Easy Salon Discovery</h3>
            <p className="text-white">Locate nearby salons quickly with advanced search filters for services and location.</p>
          </div>
              </div>
              <div className="relative bg-white shadow-md rounded-lg overflow-hidden">
          <img src="/image3.avif" alt="Quality" className="w-full h-full object-cover" />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4">
            <h3 className="text-xl font-semibold mb-2 text-white">Product Comparison</h3>
            <p className="text-white">Compare salon products by price, ingredients, reviews, and suitability for personalized beauty needs.</p>
          </div>
              </div>
              <div className="relative bg-white shadow-md rounded-lg overflow-hidden">
          <img src="/image2.jpeg" alt="Affordability" className="w-full h-full object-cover" />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4">
            <h3 className="text-xl font-semibold mb-2 text-white">Seamless Appointment Booking</h3>
            <p className="text-white">Effortlessly schedule salon services with a user-friendly, streamlined booking system.</p>
          </div>
              </div>
            </div>
        </div>
      <Footer />
    </div>
  );
};

export default HomePage;