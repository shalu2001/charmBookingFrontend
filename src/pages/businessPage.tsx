import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

const BusinessLanding = () => {
    const navigate = useNavigate();

    return (
        <>
            <div
                className="flex flex-row items-center ml-10 mt-10 gap-3 cursor-pointer"
                onClick={() => navigate(-1)}
            >
                <FontAwesomeIcon icon={faChevronLeft} size="2x" className="self-center" />
                <div className="text-2xl font-medium">For Booking</div>
            </div>
            <div className="flex flex-col items-center justify-center h-screen gap-6 font-instrumentSerif">
                <Button
                    color="secondary"
                    radius="lg"
                    className="mt-5 text-center w-80 text-3xl p-8"
                    variant="shadow"
                    onClick={() => navigate("register-salon")}
                >
                    Register Your Salon
                    <FontAwesomeIcon icon={faCircleArrowRight} />
                </Button>
                <Button
                    color="secondary"
                    radius="lg"
                    className="mt-5 text-center w-80 text-3xl p-8"
                    variant="shadow"
                    onClick={() => navigate("/register-product")}
                >
                    Register Your Product
                    <FontAwesomeIcon icon={faCircleArrowRight} />
                </Button>
                <p className="text-2xl text-center">
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-500">
                        Log in
                    </a>
                </p>
            </div>
        </>
    );
};

export default BusinessLanding;
