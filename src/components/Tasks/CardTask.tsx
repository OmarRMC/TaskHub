import { faCircleCheck, faHourglassHalf, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo } from "react";
import { NavLink } from "react-router";
import { taskInterface } from "../../interface/taskInterface";

function CardTask({ task, handleDeleteClick }: { task: taskInterface, handleDeleteClick: (e: any) => void }) {
    console.log("CardTask");

    return (

        <div className="shadow-md p-2  relative hover:bg-gray-200 cursor-pointer duration-500 transition-all">
            {
                task.tags?.map((tag) => <span key={task.id + '-' + tag.id} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{tag.name}</span>)
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
                    <button onClick={() => handleDeleteClick(task.id)} className="text-red-900">
                        <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                    </button>
                    <NavLink to={`${task.id}/edit`} className="text-blue-900">
                        <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>
                    </NavLink>
                </div>

            </span>
        </div>
    );
}


export default memo(CardTask);