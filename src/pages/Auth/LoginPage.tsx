import { useNavigate } from "react-router";
import { login as loginApi } from "../../api/authApi";
import { useAuth } from "../../hooks/useAuth";
import LoginComponent from '../../components/auth/Login'

export default function Login() {

    const {login } = useAuth(); 
    const navigate = useNavigate(); 
    const handleSubmit = async (event:any)=>{
        event.preventDefault(); 
        const form= new FormData(event.currentTarget); 
        const data= Object.fromEntries(form.entries()) as {email:string , password:string} 
        const response =  await loginApi(data); 
        if(response.status === 200){
            login(response.data);
            navigate('/')
        }       
    }    
    return (
        <LoginComponent handleSubmit={handleSubmit}></LoginComponent>
    )
}