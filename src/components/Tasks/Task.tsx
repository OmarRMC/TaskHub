import { useEffect } from "react";
import { taskInterface } from "../../interface/taskInterface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faHourglassHalf, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useTask } from "../../hooks/useTask";
import { NavLink } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { deleteTask } from "../../api/taskApi";

function Task() {

    const { dataResponse,removeDataResponse } =  useTask() ; 
    const {data:dataAuth} = useAuth(); 
    useEffect(() => {
        console.log(dataResponse);
    }, [dataResponse])
    const handleDeleteClick =async (id:number)=>{
        const {status}=await  deleteTask(dataAuth?.token, id); 
        if(status !== 200)return ; 
        removeDataResponse(id); 
    }
    return (
        <div className="min-h-screen py-3">
            <div className="w-11/12 sm:w-3/6 m-auto">
                <NavLink to="/create" className="relative mx-auto my-2 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2 text-center">Add Task</NavLink>
                {
                    dataResponse?.map((task: taskInterface, index:number) =>
                        <div key={task.id} className="shadow-md p-2  relative">
                            {
                                task.tags?.map((tag) => <span key={task.id+'-'+tag.id} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{tag.name}</span>)
                            }
                            <h3 className="font-semibold">{task.title}</h3>
                            <span>
                                <div className=" flex-wrap flex items-center gap-2  h-10 text-sm">
                                    {task.completed ?
                                        <>
                                            <FontAwesomeIcon icon={faCircleCheck} className="h-1/2 text-green-800" />
                                            <span>Completed</span>
                                        </>
                                        :
                                        <>
                                            <FontAwesomeIcon icon={faHourglassHalf} className="h-1/2 text-blue-700" />
                                            <span>Pending</span>
                                        </>
                                    }
                                </div>
                                <div className="flex gap-2 justify-center right-0 text-lg sm:absolute sm:bottom-1 sm:right-2">
                                    <button onClick={()=>handleDeleteClick(task.id)} className="text-red-900">
                                        <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                                    </button>
                                    <NavLink to={`${task.id}/edit`} className="text-blue-900">
                                        <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>
                                    </NavLink>
                                </div>

                            </span>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default Task;