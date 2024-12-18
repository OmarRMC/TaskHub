import config from "../config";
import { categoryType } from "../interface/categoryInterface";

export const categories = async (token: string = "12") => {
    const response = await fetch(`${config.apiUrl}/category`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    const data = await response.json();
    return data;
}

export const updateCategory = async (token: string = "12", category: categoryType) => {
    if(!category.id){
        return { status: 404};
    }
    const response = await fetch(`${config.apiUrl}/category/${category.id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
    const data = await response.json();
    return { status: response.status, ...data };
}


export const deleteCategory = async (token: string = "12", id: number) => {
    if(!id){
        return { status: 404};
    }
    const response = await fetch(`${config.apiUrl}/category/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },        
    })
    const data = await response.json();
    return {status:response.status , ...data};
}

export const createCategory = async  (token:string="1", category:categoryType)=>{
    const response = await fetch(`${config.apiUrl}/category`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },        
        body:JSON.stringify(category)
    })
    const data = await response.json();
    return {status:response.status , ...data};
}