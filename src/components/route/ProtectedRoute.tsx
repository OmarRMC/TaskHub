import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { ChildrenInterface } from "../../interface/reactInterface";
import { useEffect } from "react";
import { handleGetCookie } from "../../utils/cookies";

function ProtectedRoute({ children }: { children: ChildrenInterface }) {
    const { data, login  } = useAuth();
    const navigate = useNavigate()
    useEffect(() => {
        if (!data) {
            const token= handleGetCookie("token"); 
            const user=JSON.parse(handleGetCookie("user"))
            if(token && user){
                login({token, user})            
            }else {
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