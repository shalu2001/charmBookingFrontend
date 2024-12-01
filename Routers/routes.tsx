import { Routes,Route, BrowserRouter} from "react-router-dom";
import SignUp from "../src/pages/signUp";
import Login from "../src/pages/login";


export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/signup" element={<SignUp/>} />
                <Route path="/login" element={<Login/>} />
            </Routes>
        </BrowserRouter>
    );
}