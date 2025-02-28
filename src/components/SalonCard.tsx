import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";
import { Salon } from "../types/salon";
import { useNavigate } from "react-router-dom";

interface SalonCardProps {
  salon: Salon;
}

const SalonCard: React.FC<SalonCardProps> = ({ salon }) => {
  const navigate = useNavigate();
  return (
    <Card className="py-4" isPressable shadow="sm" onPress={() => navigate(`/salon/${salon._id}`)}>
    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
      <Image
        alt="Card background"
        className=""
        src="/image1.avif"
        isZoomed
      />
    </CardHeader>
    <CardBody className="overflow-visible py-2 px-5">
      <h4 className="font-bold text-large">{salon.salonName}</h4>
      <small className="text-default-500">{salon.rating}</small>
      <p className=" text-tiny">{salon.location.address}</p>
    </CardBody>
  </Card>
  );
};

export default SalonCard;