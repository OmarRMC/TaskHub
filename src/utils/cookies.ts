import Cookies from "js-cookie";

export const handleSetCookie = (key: string, value: string) => {
    Cookies.set(key, value, { expires: 1 });// 1 dia 
};


export const handleGetCookie = (key: string) => {
    return Cookies.get(key);
};


export const handleRemoveCookie = (key: string) => {
    Cookies.remove(key);
};
