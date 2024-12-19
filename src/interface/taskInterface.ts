import { categoryType } from "./categoryInterface";
import { tagIdInterface, tagType } from "./tagInterface";

export interface  taskInterface{
    id:number , 
    title:string , 
    description:string , 
    completed:boolean,
    category:categoryType
    tags:tagType[]
}
export interface  taskPostInterface{
    id:number , 
    title:string , 
    category_id:string , 
    completed:boolean,
    tags:tagIdInterface[]
}


export type taskWithoutIdInterface = Omit<taskInterface, "id">