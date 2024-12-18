import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { handleRemoveCookie } from "../../utils/cookies";

function LogoutPage() {
    const navigate = useNavigate()
    const { data, logout } = useAuth();
    useEffect(() => {
        if (data?.token) {
            logout(data.token);
            handleRemoveCookie('token')
            handleRemoveCookie('user')
        }
        navigate('/login');
    }, [])
    return (
        <p>logout...</p>
    );
}

export default LogoutPage;