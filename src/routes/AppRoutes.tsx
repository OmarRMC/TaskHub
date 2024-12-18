import { BrowserRouter, Route, Routes } from "react-router";
import LoginPage from "../pages/Auth/LoginPage";
import { AuthProvider } from "../context/AuthContext";
import Home from "../pages/Home";
import ProtectedRoute from "../components/route/ProtectedRoute";
import RegisterPage from "../pages/Auth/RegisterPage";
import LogoutPage from "../pages/Auth/LogoutPage";
export default function AppRoutes() {

    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="login" element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />} />
                    <Route path="logout" element={<LogoutPage />} />
                    <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )

}