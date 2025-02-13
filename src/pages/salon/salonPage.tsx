import React, { useState } from "react";
import Layout from "../../layout/layout";
import ModalComponent from "../../components/modal";

const SalonPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const images = [
        '/image1.avif',
        '/image2.jpeg',
        '/image3.avif',
        '/image3.avif',
        // Add more image paths here
      ];

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const salonName = "RF Salons";
    const salonRating = 4.5;
    const salonLocation = "New York, NY";
    const salonCurrentStatus= "Open";
    const salonOpeningHours = "9:00 AM - 5:00 PM";


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

            <div className="font-instrumentSerif text-5xl m-4">{salonName}</div>
                
        </div>

        </Layout>
    );
}

export default SalonPage;