import config from "../config";
import { userRegisterInterface } from "../interface/authInterface";
import { handleSetCookie } from "../utils/cookies";

export const login = async (credentials: { email: string; password: string }) => {
    const response = await fetch(config.apiUrl + "/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    
    const data = await response.json();
   if(response.status==200){
        handleSetCookie("token", data.token); 
        handleSetCookie("user", JSON.stringify(data.user)); 
   }

    return {status:response.status , data};
};


export const register = async (credentials: userRegisterInterface) => {
    const response = await fetch(config.apiUrl + "/register", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    
    const data = await response.json();
   if(response.status==200){
        handleSetCookie("token", data.token); 
        handleSetCookie("user", JSON.stringify(data.user)); 
   }
    return {status:response.status , data};
};

