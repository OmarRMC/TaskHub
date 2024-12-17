import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { handleGetCookie } from "../../utils/cookies";

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
            <p>Pagina principal</p>
            <h1>{user?.name}</h1>
        </>
    );
}

export default Home;