import { createContext, ReactNode } from "react";
import { tasks } from "../api/taskApi";
import { useAuth } from "../hooks/useAuth";
import useFetch from "../hooks/useFetch";
import { taskInterface } from "../interface/taskInterface";


interface taskContextType {
    dataResponse: taskInterface[],
    changeDataResponse: (newData: taskInterface[]) => void;
    loading: boolean,
    removeDataResponse: (id:number) => void,
    updateDataResponse: (newData:taskInterface) => void, 
    addDataResponse:(newData:taskInterface)=>void; 
}

export const TaskContext = createContext<taskContextType | null>(null);
export function TaskProvider({ children }: { children: ReactNode }) {
    const { data: dataAuth } = useAuth();
    const { dataResponse, loading, changeDataResponse, removeDataResponse, updateDataResponse , addDataResponse } = useFetch<taskInterface[]>(tasks, dataAuth);

    return <TaskContext.Provider value={{ dataResponse, loading, changeDataResponse, removeDataResponse, updateDataResponse  ,addDataResponse}}>
        {children}
    </TaskContext.Provider>
}

