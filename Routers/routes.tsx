import { Routes,Route, BrowserRouter} from "react-router-dom";
import SignUp from "../src/pages/signUp";


export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/signup" element={<SignUp/>} />
            </Routes>
        </BrowserRouter>
    );
}