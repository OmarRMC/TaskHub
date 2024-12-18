import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { handleGetCookie } from "../utils/cookies";
import MainLayout from "../layouts/MainLayout";

function Home() {
    const { data , login } = useAuth();
    let user = null;
    if (data) {
        user = data.user;
    }
    useEffect(() => {

    }, [])

    return (
        <>
            <MainLayout/>
        </>
    );
}

export default Home;