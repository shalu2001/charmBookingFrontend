import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";

interface SalonCardProps {
  salon: {
    name: string;
    rating: number;
    address: string;
    image: string;
  };
}

const SalonCard: React.FC<SalonCardProps> = ({ salon }) => {
  return (
    <Card className="py-4">
    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
      <Image
        alt="Card background"
        className="object-cover rounded-2xl"
        src={salon.image}
      />
    </CardHeader>
    <CardBody className="overflow-visible py-2 px-5">
      <h4 className="font-bold text-large">{salon.name}</h4>
      <small className="text-default-500">{salon.rating}</small>
      <p className=" text-tiny">{salon.address}</p>
    </CardBody>
  </Card>
  );
};

export default SalonCard;