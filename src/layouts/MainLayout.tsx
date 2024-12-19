import { Outlet } from "react-router";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import { TaskProvider } from '../context/TaskContext';
function MainLayout() {
    return (
        <>
            <Header />
            <TaskProvider>
                <Outlet />
            </TaskProvider>
            <Footer />
        </>
    );
}

export default MainLayout;