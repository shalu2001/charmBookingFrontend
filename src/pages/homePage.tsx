//import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import SearchBar from '../components/searchBar';
import ProductCard from '../components/productCard';
import SalonCard from '../components/salonCard';
import EmblaCarousel from '../components/carousel';
import { EmblaOptionsType } from 'embla-carousel';


const salons = [
    { name: 'Salon 1', description: 'Description 1', location: 'Location 1', image: 'salon1.jpg' },
    { name: 'Salon 2', description: 'Description 2', location: 'Location 2', image: 'salon2.jpg' },
    { name: 'Salon 3', description: 'Description 3', location: 'Location 3', image: 'salon3.jpg' },
    { name: 'Salon 4', description: 'Description 4', location: 'Location 4', image: 'salon4.jpg' },
    // Add more salons here
];
const products = [
  { name: 'Product 1', description: 'Description 1', price: 100, image: 'product1.jpg' },
  { name: 'Product 2', description: 'Description 2', price: 200, image: 'product2.jpg' },
  { name: 'Product 3', description: 'Description 3', price: 300, image: 'product3.jpg' },
  { name: 'Product 4', description: 'Description 4', price: 400, image: 'product4.jpg' },
  // Add more products here
];

const OPTIONS: EmblaOptionsType = { loop: true, duration: 600000 }; // 10 minutes in milliseconds
const SLIDES = [
  '/image1.avif',
  '/image2.jpeg',
  '/image3.avif',
  // Add more image paths here
];

const HomePage = () => {
  return (
    <div>
      <Header />
        <div className="relative w-screen h-screen">
          <EmblaCarousel slides={SLIDES} options={OPTIONS} />
            <div className="absolute inset-0 bg-black opacity-50">
              <p className="text-9xl text-quaternary text-left p-20">Salon and Beauty Services</p>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <SearchBar />
            </div>
        </div>
        <div className="p-20">
          <h2 className="text-2xl mb-4">Salons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {salons.map((salon, index) => (
              <SalonCard key={index} />
            ))}
          </div>
        </div>
        <div className="p-20">
          <h2 className="text-2xl mb-4">Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {products.map((product, index) => (
              <ProductCard key={index} />
            ))}
          </div>
        </div>
      <Footer />
    </div>
  );
};

export default HomePage;