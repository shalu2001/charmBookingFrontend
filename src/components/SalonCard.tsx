import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

interface SalonCardProps {
    salon: {
        id: number;
        name: string;
        location: string;
        // rating: number;
    };
}

const SalonCard: React.FC<SalonCardProps> = ({ salon }) => {
    const navigate = useNavigate();
    return (
        <Card
            className="py-4"
            isPressable
            shadow="sm"
            onPress={() => navigate(`/salon/${salon.id}`)}
        >
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <Image alt="Card background" className="" src="/image1.avif" isZoomed />
            </CardHeader>
            <CardBody className="overflow-visible py-2 px-5">
                <h4 className="font-bold text-large">{salon.name}</h4>
                <small className="text-default-500">4.0</small>
                <p className=" text-tiny">{salon.location}</p>
            </CardBody>
        </Card>
    );
};

export default SalonCard;
