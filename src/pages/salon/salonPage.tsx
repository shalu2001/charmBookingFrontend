import { useState,useRef, useEffect } from "react";
import Layout from "../../layout/layout";
import ModalComponent from "../../components/Modal";
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMapMarkerAlt,faChevronRight,faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import StarRating from "../../components/StarRating";
import ServiceField from "../../components/ServiceField";
import { Button } from '@nextui-org/react';
import { useParams } from "react-router-dom";
import { getSalon } from "../../actions/salonActions";
import { useQuery } from "@tanstack/react-query";
import { Category } from "../../types/salon";

const SalonPage = () => {
    const { salonId } = useParams();
    const { data: salon, isLoading, isError } = useQuery({ 
        queryKey: ["salon", salonId], 
        queryFn: () => getSalon(salonId as string),
        enabled: !!salonId
    });
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category|undefined>(undefined);

    useEffect(() => {
        if (salon?.category) setSelectedCategory(salon.category[0]);
    }, [salon]);
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

    const scrollLeft = () => {
        if (scrollRef.current) scrollRef.current.scrollBy({ left: -100, behavior: "smooth" });
      };
    
    const scrollRight = () => {
        if (scrollRef.current) scrollRef.current.scrollBy({ left: 100, behavior: "smooth" });
      };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching salon</div>;

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

            <div className="font-instrumentSerif text-5xl font-bold m-4">{salon?.salonName}</div>
            <div className="font-instrumentSerif text-xl m-4 flex space-x-4">
                <span>{salon?.rating}</span>
                <StarRating 
                    name="read-only" 
                    value={salon?.rating} 
                    readOnly={true} 
                    size="small" 
                />
                {/* <span>{salonCurrentStatus}</span> */}
                <span>{salon?.workingHours.monday}</span>
            </div>
            <div className="font-instrumentSerif text-xl m-4 flex items-center">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                <span>{salon?.location.address}</span>
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
                            {salon?.category.map((category) => (
                            <button
                                key={category.name}
                                className={`px-4 py-2 mx-2 text-sm font-semibold rounded-lg ${
                                selectedCategory?.name === category.name ? "bg-tertiary text-white" : "bg-gray-200"
                                }`}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category.name}
                            </button>
                            ))}
                        </div>
                        <button onClick={scrollRight} className="absolute right-0 z-10 p-2 bg-white shadow-lg rounded-full">
                        <FontAwesomeIcon icon={faChevronRight}/>
                        </button>
                    </div>
                    {selectedCategory?.services.map((service, index) => (
                        <ServiceField
                            key={index}
                            serviceName={service.serviceName}
                            price={service.price}
                            time={service.durationMinutes.toString()}
                            onChange={() => {}}
                        />
                    ))}
                </div>
                <div className="flex flex-row w-1/2 justify-center">
                    <div className="bg-tertiary p-5 rounded-2xl flex items-center">
                        <img src="/image1.avif" alt="Salon" className="w-36 h-16 object-cover rounded-lg mr-5" />
                        <div className="flex flex-col">
                            <h2 className="font-instrumentSerif text-3xl">{salon?.salonName}</h2>
                            <p className="font-instrumentSerif text-xl flex items-center">
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                                {salon?.location.address}
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