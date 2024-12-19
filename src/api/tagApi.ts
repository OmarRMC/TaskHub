import config from "../config";
import { tagType, tagWithoutId } from '../interface/tagInterface'

export const tags = async (token: string = "12") => {
    const response = await fetch(`${config.apiUrl}/tag`, {
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

export const updateTag = async (token: string = "12", tag: tagType) => {
    if (!tag.id) {
        return { status: 404 };
    }
    const response = await fetch(`${config.apiUrl}/tag/${tag.id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(tag)
    })
    const data = await response.json();
    return { status: response.status, ...data };
}

export const deleteTag = async (token: string = "12", id: number) => {
    if (!id) {
        return { status: 404 };
    }
    const response = await fetch(`${config.apiUrl}/tag/${id}`, {
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

export const createTag = async (token: string = "1", tag: tagWithoutId) => {
    const response = await fetch(`${config.apiUrl}/tag`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(tag)
    })
    const data = await response.json();
    return { status: response.status, ...data };
}