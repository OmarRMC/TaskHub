import { useCallback, useEffect, useState } from "react";
import { taskInterface } from "../../interface/taskInterface";
import { useTask } from "../../hooks/useTask";
import { NavLink } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { deleteTask } from "../../api/taskApi";
import CardTask from "./CardTask";

function Task() {

    const { dataResponse, removeDataResponse } = useTask();
    const { data: dataAuth } = useAuth();
    useEffect(() => {
        console.log(dataResponse);
    }, [dataResponse])
    const handleDeleteClick = useCallback(async (id: number) => {
        const { status } = await deleteTask(dataAuth?.token, id);
        if (status !== 200) return;
        removeDataResponse(id);
    }, [dataAuth?.token, removeDataResponse])
    return (
        <div className="min-h-screen py-3 ">
            <div className="w-11/12 sm:w-3/6 m-auto">
                <div className="flex flex-col gap-2">
                    <NavLink to="/create" className="relative mx-auto my-2 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2 text-center">Add Task</NavLink>
                    {
                        dataResponse?.map((task: taskInterface, index: number) =>
                            <CardTask key={task.id} task={task} handleDeleteClick={handleDeleteClick} />
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default Task;