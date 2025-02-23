import { useState,useRef } from "react";
import Layout from "../../layout/layout";
import ModalComponent from "../../components/modal";
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMapMarkerAlt,faChevronRight,faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import StarRating from "../../components/starRating";
import ServiceField from "../../components/serviceField";
import { Button } from '@nextui-org/react';

const SalonPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("Featured");
    const scrollRef = useRef<HTMLDivElement>(null);
    const images = [
        '/image1.avif',
        '/image2.jpeg',
        '/image3.avif',
        '/image3.avif',
        // Add more image paths here
      ];

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const categories = ["Featured","Haircut", "Makeup", "Facial", "Manicure", "Pedicure", "Massage", "Spa", "Manicure", "Pedicure", "Massage", "Spa"];

    const scrollLeft = () => {
        if (scrollRef.current) scrollRef.current.scrollBy({ left: -100, behavior: "smooth" });
      };
    
    const scrollRight = () => {
        if (scrollRef.current) scrollRef.current.scrollBy({ left: 100, behavior: "smooth" });
      };

    const salonName = "RF Salons";
    const salonRating = 4.5;
    const salonLocation = "New York, NY";
    const salonCurrentStatus= "Open";
    const salonOpeningHours = "9:00 AM - 5:00 PM";
    
    const services = [
        { name: 'Haircut', price: 30, time: '30 mins' },
        { name: 'Manicure', price: 20, time: '45 mins' },
        { name: 'Pedicure', price: 25, time: '50 mins' },
      ];

    return (
        <Layout>
        <div className="p-20">
            <div className="grid grid-cols-2 grid-rows-2 gap-2 w-full h-96 ">
                <div className="col-span-1 row-span-2">
                    <img src={images[0]} alt="Salon" className="w-full h-full object-cover rounded-xl" />
                </div>
                <div className="row-span-1">
                    <img src={images[1]} alt="Salon" className="w-full h-full object-cover rounded-xl" />
                </div>
                <div className="row-span-1 relative">
                    <img src={images[2]} alt="Salon" className="w-full h-full object-cover rounded-xl" />
                    {images.length > 3 && (
                    <div
                        className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white cursor-pointer"
                        onClick={handleOpen}
                    >
                        See More
                    </div>
                    )}
                </div>   
            </div>
            <ModalComponent images={images} isOpen={isOpen} onClose={handleClose} />

            <div className="font-instrumentSerif text-5xl font-bold m-4">{salonName}</div>
            <div className="font-instrumentSerif text-xl m-4 flex space-x-4">
                <span>{salonRating}</span>
                <StarRating 
                    name="read-only" 
                    value={salonRating} 
                    readOnly={true} 
                    size="small" 
                />
                <span>{salonCurrentStatus}</span>
                <span>{salonOpeningHours}</span>
            </div>
            <div className="font-instrumentSerif text-xl m-4 flex items-center">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                <span>{salonLocation}</span>
            </div>


            {/* services and payment section  */}

            {/* Scrollable Category Bar */}
            

            <div className="font-instrumentSerif text-4xl m-4 mt-20">Services</div>
            <div className="flex flex-row">
                <div className="flex flex-col w-1/2 justify-center">
                    <div className="relative flex items-center my-4">
                        <button onClick={scrollLeft} className="absolute left-0 z-10 p-2 bg-white shadow-lg rounded-full">
                            <FontAwesomeIcon icon={faChevronLeft}/>
                        </button>
                        <div ref={scrollRef} className="flex overflow-x-auto no-scrollbar w-full whitespace-nowrap mx-10 scrollbar-hide">
                            {categories.map((category) => (
                            <button
                                key={category}
                                className={`px-4 py-2 mx-2 text-sm font-semibold rounded-lg ${
                                selectedCategory === category ? "bg-tertiary text-white" : "bg-gray-200"
                                }`}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </button>
                            ))}
                        </div>
                        <button onClick={scrollRight} className="absolute right-0 z-10 p-2 bg-white shadow-lg rounded-full">
                        <FontAwesomeIcon icon={faChevronRight}/>
                        </button>
                    </div>
                    {services.map((service, index) => (
                        <ServiceField
                            key={index}
                            serviceName={service.name}
                            price={service.price}
                            time={service.time}
                            onChange={() => {}}
                        />
                    ))}
                </div>
                <div className="flex flex-row w-1/2 justify-center">
                    <div className="bg-tertiary p-5 rounded-2xl flex items-center">
                        <img src="/image1.avif" alt="Salon" className="w-36 h-16 object-cover rounded-lg mr-5" />
                        <div className="flex flex-col">
                            <h2 className="font-instrumentSerif text-3xl">{salonName}</h2>
                            <p className="font-instrumentSerif text-xl flex items-center">
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                                {salonLocation}
                            </p>
                        </div>
                    <Button color="secondary" radius="lg" variant="shadow" className="text-center text-black flex flex-row" onClick={()=>{}}>
                        <div className="font-instrumentSerif">Continue</div>
                    </Button>
                    </div>
                </div>
            </div>
                
        </div>

        </Layout>
    );
}

export default SalonPage;