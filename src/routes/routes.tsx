import { Routes,Route, BrowserRouter} from "react-router-dom";
import SignUp from "../pages/signUp";
import Login from "../pages/login";
import HomePage from "../pages/homePage";
import SalonPage from "../pages/salon/salonPage"


export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/signup" element={<SignUp/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="" element={<HomePage/>} />
                <Route path="/salon/:salonId" element={<SalonPage/>} />

            </Routes>
        </BrowserRouter>
    );
}