import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { createTag, deleteTag, tags, updateTag } from "../../api/tagApi";
import useFetch from "../../hooks/useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faXmark } from "@fortawesome/free-solid-svg-icons";
import { tagType } from "../../interface/tagInterface";
import Alert from "../UI/AlertOk";

function Tags() {
    const { data } = useAuth();
    const { dataResponse, loading, error, changeDataResponse } = useFetch(tags, data);
    const [notification, setNotification] = useState<{ title: string, description: string, color: string } | null>(null);

    const [editableTagId, setEditableTagId] = useState<number | null>(null);
    const [updatedTags, setUpdatedTags] = useState<Record<number, string>>({});

    const [newTag, setNewTag] = useState<string>("");

    if (loading) return <p>Loading...</p>;

    const handleEdit = (id: number) => {
        setEditableTagId(id);
    };

    const appendTag = async () => {
        const tag = await createTag(data?.token, { name: newTag })

        if (tag.status !== 201) {
            setNotification({ title: "Error!", description: "Tag could not be created", color: "red" })
            return;
        }

        setNotification({ title: "Create!", description: "A new tag was created", color: "green" })
        changeDataResponse([...dataResponse, { ...tag.data }])
        setNewTag("")
    }

    const handleBlur = async (id: number) => {
        setNotification(null);
        if (!updatedTags[id]) {
            return;
        }
        setEditableTagId(null);

        const dataModify = dataResponse?.map((tag: tagType) =>
            (tag.id === id) ? { ...tag, name: updatedTags[id] || tag.name } : tag
        );
        changeDataResponse(dataModify);
        const { status } = await updateTag(data?.token, { name: updatedTags[id], id });
        if (status === 200) {
            setNotification({ title: "Update! ", description: "The tag has been updated ", color: "green" })
        } else {
            setNotification({ title: "Error! ", description: "Could not update tag ", color: "red" })
        }
    };

    const handleChange = (id: number, value: string) => {
        setUpdatedTags((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const removeTag = async (id: number) => {
        const dataModify = dataResponse?.filter((tag: tagType) =>
            id != tag.id
        );
        changeDataResponse(dataModify)

        const { status } = await deleteTag(data?.token, id);
        if (status === 200) {
            setNotification({ title: "Delete! ", description: "tag was removed", color: "green" })
        } else {
            setNotification({ title: "Error! ", description: "could not remove tag", color: "red" })
        }

    }

    return (
        <div className="w-full justify-center h-screen my-5 mx-auto">
            {notification && <Alert title={notification?.title} description={notification?.description} color={notification?.color}></Alert>}
            {error && <p>{JSON.stringify(error)}</p>}
            <div className="border-b-indigo-100 shadow-md sm:w-1/2 m-auto p-4 w-11/12 rounded-sm relative">
                <p>List Tag</p>
                <div className="relative md:absolute md:right-2 md:top-2">
                    <input type="text" value={newTag} onChange={(e) => setNewTag(e.target.value)} className="mr-2 bg-slate-100 rounded-lg outline-none px-2" placeholder="Enter a new tag" required />
                    <button onClick={appendTag} className=" bg-amber-600 rounded-md text-white px-2 py-0">
                        Add Tag
                    </button>
                </div>

                <hr className="my-2" />
                <div className="flex flex-wrap gap-x-1 gap-y-2 justify-between">
                    {dataResponse?.map((tag: tagType) => (
                        <div key={tag.id} className="inline-block">
                            <span
                                id="badge-dismiss-default"
                                className="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-blue-800 bg-blue-100 rounded dark:bg-blue-900 dark:text-blue-300"
                            >
                                <input
                                    type="text"
                                    disabled={editableTagId !== tag.id}
                                    value={editableTagId === tag.id ? updatedTags[tag.id] || tag.name : tag.name}
                                    onChange={(e) => handleChange(tag.id, e.target.value)}
                                    onBlur={() => handleBlur(tag.id)}
                                    className="w-fit outline-none rounded-sm"
                                    style={{ maxWidth: `${(updatedTags[tag.id]) ? updatedTags[tag.id].length : tag.name.length + 1}ch` }}
                                />
                                <button
                                    type="button"
                                    className="inline-flex items-center p-1 ms-2 text-sm text-blue-400 bg-transparent rounded-sm hover:bg-blue-200 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-blue-300"
                                    onClick={() => handleEdit(tag.id)}
                                    aria-label="Edit"
                                >
                                    <FontAwesomeIcon icon={faPen} />
                                </button>
                                <button
                                    type="button"
                                    className="inline-flex items-center p-1 ms-2 text-sm text-blue-400 bg-transparent rounded-sm hover:bg-blue-200 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-blue-300"
                                    aria-label="Remove"
                                    onClick={() => removeTag(tag.id)}
                                >
                                    <FontAwesomeIcon icon={faXmark} />
                                </button>
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Tags;
