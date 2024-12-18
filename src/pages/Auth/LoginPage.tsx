import { useNavigate } from "react-router";
import { login as loginApi } from "../../api/authApi";
import { useAuth } from "../../hooks/useAuth";
import LoginComponent from '../../components/auth/Login'
import { useState } from "react";
import Alert from "../../components/UI/AlertOk";

export default function Login() {

    const { login } = useAuth();
    const [error, setError] = useState<boolean>(false);
    const navigate = useNavigate();
    const handleSubmit = async (event: any) => {
        setError(false);
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const data = Object.fromEntries(form.entries()) as { email: string, password: string }
        let response = await loginApi(data);
        if (response.status === 200) {
            login(response.data);
            navigate('/')
        } else {
            setError(true);
        }
    }
    return (
        <>
            <LoginComponent handleSubmit={handleSubmit}></LoginComponent>
            {error && <Alert title="Error! " description="Invalid credentials"></Alert>}
        </>
    )
}