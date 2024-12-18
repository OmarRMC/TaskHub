import { createContext, useState, ReactNode } from "react";
import { userAuthInterface } from "../interface/authInterface";
import { logout as logoutApi } from "../api/authApi";


interface AuthContextType {
    data: userAuthInterface | null;
    login: (userData: userAuthInterface) => void;
    logout: (token: string) => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [data, setData] = useState<userAuthInterface | null>(null);
    const login = (userData: userAuthInterface) => setData(userData);
    const logout = async (token: string) => {
        setData(null)
        return await logoutApi(token)
    };
    return (
        <AuthContext.Provider value={{ data, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
