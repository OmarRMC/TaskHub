import {  createContext, ReactNode, useState } from "react";

interface CategoryContextType {
    category: any; 
    setSelected:(category:any)=>void; 
}

export const categoryContext= createContext<CategoryContextType|undefined>(undefined); 

export const CategoryProvider=({children}:{children:ReactNode})=>{
    const [category, setCategory] = useState(null); 
    const setSelected=(category:any)=>{
        setCategory(category); 
    }

    return(
        <categoryContext.Provider value={{category, setSelected}}>
            {children}
        </categoryContext.Provider>
    )
}