import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const RegisterSalonServices = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div
                className="flex flex-row items-center ml-10 mt-10 gap-3 cursor-pointer"
                onClick={() => navigate(-1)}
            >
                <FontAwesomeIcon icon={faChevronLeft} size="2x" className="self-center" />
                <div className="text-2xl font-medium">For Booking</div>
            </div>
        </div>
    );
};

export default RegisterSalonServices;
