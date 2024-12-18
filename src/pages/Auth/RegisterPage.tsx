import { useNavigate } from "react-router";
import { register as registerApi } from "../../api/authApi";
import Register from "../../components/auth/Register";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import Alert from "../../components/UI/AlertOk";

function RegisterPage() {


    const [error, setError] = useState<boolean>(false)
    const { login } = useAuth();
    const navigate = useNavigate();
    const handleSubmit = async (event: any) => {
        setError(false)
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const data = Object.fromEntries(form.entries())
        const response = await registerApi(data);
        if (response.status === 200) {
            login(response.data);
            navigate('/')
        } else {
            setError(true);
        }
    }
    return (
        <>
            <Register handleSubmit={handleSubmit}></Register>
            {error && <Alert title="check" description="Error entering your data" />}
        </>
    );
}

export default RegisterPage;