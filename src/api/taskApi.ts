import config from "../config";
import {  taskPostInterface, taskWithoutIdInterface } from "../interface/taskInterface";

export const tasks = async (token: string = "12") => {
    const response = await fetch(`${config.apiUrl}/task`, {
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

export const updateTask = async (token: string = "12", task: taskPostInterface) => {
    if (!task.id) {
        return { status: 404 };
    }
    const response = await fetch(`${config.apiUrl}/task/${task.id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(task)
    })
    const data = await response.json();
    return { status: response.status, ...data };
}

export const deleteTask = async (token: string = "12", id: number) => {
    if (!id) {
        return { status: 404 };
    }
    const response = await fetch(`${config.apiUrl}/task/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    const data = await response.json();
    return { status: response.status, ...data };
}

export const createTask = async (token: string = "1", task: taskWithoutIdInterface) => {
    const response = await fetch(`${config.apiUrl}/task`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(task)
    })
    const data = await response.json();
    return { status: response.status, ...data };
}