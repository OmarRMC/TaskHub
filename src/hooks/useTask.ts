import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

export function  useTask(){
    const context = useContext(TaskContext)
    if(!context){
        throw new Error("No hay contexto");        
    }
    return  context; 
}