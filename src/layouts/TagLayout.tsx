import { Outlet } from "react-router";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import { CategoryProvider } from "../context/CategoryContext";

function CategoryLayout() {

    return (
        <>
            <CategoryProvider>
                <div className="min-h-screen">
                    <Header />
                    <Outlet />
                </div>
                <Footer />
            </CategoryProvider>
        </>
    );
}

export default CategoryLayout;