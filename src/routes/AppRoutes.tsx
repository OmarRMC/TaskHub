import { BrowserRouter, Route, Routes } from "react-router";
import LoginPage from "../pages/Auth/LoginPage";
import { AuthProvider } from "../context/AuthContext";
import ProtectedRoute from "../components/route/ProtectedRoute";
import RegisterPage from "../pages/Auth/RegisterPage";
import LogoutPage from "../pages/Auth/LogoutPage";
import CategoryLayout from "../layouts/CategoryLayout";
import TagLayout from "../layouts/TagLayout";
import EditCategory from "../components/category/EditCategory";
import Category from "../components/category/Category";
import CreateCategory from "../components/category/createCategory";
import Tags from "../components/tag/Tags";
import MainLayout from "../layouts/MainLayout";
import Task from "../components/Tasks/Task";
import EditTask from "../components/Tasks/EditTask";
import CreateTask from "../components/Tasks/CreateTask";
export default function AppRoutes() {

    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="login" element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />} />
                    <Route path="logout" element={<LogoutPage />} />
                    <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>} >
                        <Route index element={<Task />} />
                        <Route path=":id/edit" element={<EditTask />} />
                        <Route path="create" element={<CreateTask />} />
                    </Route>
                    <Route path="/category" element={<ProtectedRoute><CategoryLayout /></ProtectedRoute>} >
                        <Route index element={<Category />} />
                        <Route path=":id/edit" element={<EditCategory />} />
                        <Route path="create" element={<CreateCategory />} />
                    </Route>
                    <Route path="/tag" element={<ProtectedRoute><TagLayout /></ProtectedRoute>} >
                        <Route index element={<Tags />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )

}