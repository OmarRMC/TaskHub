import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { ChildrenInterface } from "../../interface/reactInterface";
import { useEffect } from "react";
import { handleGetCookie } from "../../utils/cookies";
import { userInterface } from "../../interface/authInterface";

function ProtectedRoute({ children }: { children: ChildrenInterface }) {
    const { data, login } = useAuth();
    const navigate = useNavigate()
    useEffect(() => {
        if (!data) {
            const token = handleGetCookie("token");
            let userCookie = handleGetCookie("user");
            if (token && userCookie) {
                const user = JSON.parse(userCookie) as userInterface
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