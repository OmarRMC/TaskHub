import { BrowserRouter, Route, Routes } from "react-router";
import LoginPage from "../pages/Auth/LoginPage";
import { AuthProvider } from "../context/AuthContext";
import Home from "../pages/Auth/Home";
import ProtectedRoute from "../components/route/ProtectedRoute";
export default function AppRoutes() {

    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="login" element={<LoginPage />} />
                    <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )

}