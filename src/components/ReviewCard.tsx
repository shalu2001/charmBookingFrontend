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
                <Avatar showFallback size="lg" radius="sm" />
                <div>
                    <StarRating
                        name="read-only"
                        value={review.rating}
                        readOnly={true}
                        size="small"
                    />
                    <p className="text-gray-500" style={{ fontSize: "0.6rem" }}>
                        {new Date(review.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                        })}
                    </p>
                    <p className="text-xs text-gray-600 font-bold mt-2">
                        by {review.user.firstName} {review.user.lastName}
                    </p>
                </div>
            </CardHeader>
            <CardBody className="px-3 py-1">
                <p className="text-sm text-gray-700">{review.comment}</p>
            </CardBody>
        </Card>
    );
};

export default ReviewCard;
