import React from 'react';
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";

const ProductCard = () => {
  return (
    <Card className="py-4">
    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
      <Image
        alt="Card background"
        className="object-cover rounded-xl"
        src="https://nextui.org/images/hero-card-complete.jpeg"
      />
    </CardHeader>
    <CardBody className="overflow-visible py-2 px-5">
      <h4 className="font-bold text-large">Hair Spray 350ml</h4>
      <p className=" text-tiny">RS. 1500.00</p>
      <small className="text-default-500">4.0</small>
    </CardBody>
  </Card>
  );
};

export default ProductCard;