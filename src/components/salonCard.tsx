import React from 'react';
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";


const SalonCard = () => {
  return (
    <Card className="py-4">
    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
      <Image
        alt="Card background"
        className="object-cover rounded-2xl"
        src="https://nextui.org/images/hero-card-complete.jpeg"
      />
    </CardHeader>
    <CardBody className="overflow-visible py-2 px-5">
      <h4 className="font-bold text-large">Base hair and Nail studio</h4>
      <small className="text-default-500">3.8</small>
      <p className=" text-tiny">Colombo, Sri Lanka</p>
    </CardBody>
  </Card>
  );
};

export default SalonCard;