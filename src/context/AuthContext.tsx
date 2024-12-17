import { createContext, useState, ReactNode } from "react";
import { userAuthInterface } from "../interface/authInterface";

interface AuthContextType {
    data: userAuthInterface|null;
    login: (userData: userAuthInterface) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [data, setData] = useState<userAuthInterface|null>(null);
    const login = (userData: userAuthInterface) => setData(userData);
    const logout = () => setData(null);
    return (
        <AuthContext.Provider value={{ data, login, logout }}>
          {children}  
        </AuthContext.Provider>
    )
}
