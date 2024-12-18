import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { ChildrenInterface } from "../../interface/reactInterface";
import { useEffect } from "react";
import { handleGetCookie } from "../../utils/cookies";

function ProtectedRoute({ children }: { children: ChildrenInterface }) {
    const { data, login } = useAuth();
    const navigate = useNavigate()
    useEffect(() => {
        if (!data) {
            const token = handleGetCookie("token");
            let user = handleGetCookie("user");
            if (token && user) {
                user = JSON.parse(user)
                login({ token, user })
            } else {
                navigate('/login')
            }
        }
    }, [])
    return (
        <>
            {
                children
            }
        </>
    );
}

export default ProtectedRoute;