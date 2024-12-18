import { useContext, useEffect, useState } from "react";
import { categories as categoriesApi } from "../api/categoryApi";
import { handleGetCookie } from "../utils/cookies";
import { categoryContext } from "../context/CategoryContext";
import { categoryType } from "../interface/categoryInterface";

export function fetchCategory() {
    const [categories, setCategories] = useState<categoryType[]>([]);
    const [links, setLinks] = useState([]); 
    const token = handleGetCookie('token');

    const changeCatagories=(category:categoryType[])=>{
        setCategories(category)
    }
    useEffect(() => {
        token && categoriesApi(token).then((datos) =>{
            const {data, ...links} = datos  ; 
            setLinks(links)
            setCategories(data)
        });
    }, [])

    return {categories,changeCatagories, links };
}

export function useCategory() {
    const context = useContext(categoryContext); 
    if(!context) throw new Error("No hay contexto de categoryContext");
    return context; 
    
}