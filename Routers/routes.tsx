import { Routes,Route, BrowserRouter} from "react-router-dom";
import SignUp from "../src/pages/signUp";
import Login from "../src/pages/login";
import HomePage from "../src/pages/homePage";
import SalonPage from "../src/pages/salon/salonPage"


export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/signup" element={<SignUp/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="" element={<HomePage/>} />
                <Route path="/salon" element={<SalonPage/>} />

            </Routes>
        </BrowserRouter>
    );
}