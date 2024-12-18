import { Outlet } from "react-router";
import Category from "../components/category/Category";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import { useState } from "react";
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