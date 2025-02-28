import { Avatar, Card, CardBody, CardHeader } from "@heroui/react";
import { Review } from "../types/salon";
import StarRating from "./StarRating";

interface ReviewCardProps {
    review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <Card className="w-72 p-2 bg-tertiary">
        <CardHeader className="flex items-center gap-3">
            <Avatar showFallback src={review.customerName} size="lg" radius="sm"/>
            <div>
                <StarRating name="read-only" value={review.rating} readOnly={true} size="small"/>
                <p className="text-gray-500" style={{ fontSize: "0.6rem" }}>Feb 28, 2025</p>
                <p className="text-xs text-gray-600 font-bold mt-2">by {review.customerName}</p>
            </div>
        </CardHeader>
        <CardBody className="px-3 py-1">
            <p className="text-sm text-gray-700">{review.reviewText}</p>
        </CardBody>
    </Card>
  );
};

export default ReviewCard;