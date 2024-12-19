
import { Link, useNavigate, useParams } from 'react-router';
import { taskInterface, taskPostInterface, taskWithoutIdInterface } from '../../interface/taskInterface';
import Input from '../UI/Input';
import SelectForm from '../UI/SelectForm';
import { fetchCategory } from '../../hooks/useCategory';
import useFetch from '../../hooks/useFetch';
import { tags } from '../../api/tagApi';
import { useAuth } from '../../hooks/useAuth';
import { useEffect, useState } from 'react';
import { tagType } from '../../interface/tagInterface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { createTask, updateTask } from '../../api/taskApi';

function FormTask({ task, txtBtn = "...", title = "...", updateDataResponse, addDataResponse }: { task?: taskInterface, title: string, txtBtn: string, updateDataResponse?: any, addDataResponse?: any }) {
    const { categories } = fetchCategory();
    const { data: dataAuth } = useAuth();
    const { dataResponse } = useFetch(tags, dataAuth)
    const [selectTags, setSelectTag] = useState<Record<number, string>>({});

    const { id } = useParams();

    const navigate = useNavigate()
    const addSelectTag = (tag: tagType) => {
        setSelectTag((prev) => {
            return { ...prev, [tag.id]: tag.name }
        }
        );
    }
    const removeSelectTag = (id: number) => {
        setSelectTag((prev) => {
            const { [id]: _, ...rest } = prev;
            return rest;
        });
    };

    const handleSave = async (e: any) => {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(e.currentTarget))
        let { completed, category_id } = formData;

        let respose;
        let body;
        if (task) {
            body = { ...formData, category_id: Number(category_id), tags: Object.keys(selectTags).map(Number), completed: completed ? 1 : 0, id: Number(id) } as unknown as taskPostInterface;
            console.log(body);
            respose = await updateTask(dataAuth?.token, body)
            updateDataResponse(respose.data)
        } else {
            body = { ...formData, category_id: Number(category_id), tags: Object.keys(selectTags).map(Number), completed: completed ? 1 : 0, id: Number(id) } as unknown as taskWithoutIdInterface;
            console.log(body);

            respose = await createTask(dataAuth?.token, body)
            addDataResponse(respose.data);
        }
        if (respose.status === 200 || respose.status === 201) {
            navigate("/")
        }
        console.log(respose);

    }

    useEffect(() => {
        if (!task) return;
        const { tags } = task;
        if (!tags) return;
        let tagsTask = {};
        tags.forEach(({ id, name }) => {
            tagsTask = { ...tagsTask, [id]: name };
        })
        setSelectTag(tagsTask);
    }, [task])

    return (
        <form onSubmit={handleSave} action="" className='w-11/12 sm:w-6/12 m-auto p-3 shadow-lg'>
            <h2 className='text-center font-bold '>{title}</h2>
            <Input type="text" name="title" label="title" placeholder="title" value={task?.title}></Input>
            <Input type="text" name="description" label="description" placeholder="description" value={task?.description}></Input>
            <SelectForm name="category_id" listData={categories} required={true} />
            <SelectForm name="tags" listData={dataResponse as tagType} handleChange={addSelectTag} />
            <div >
                {Object.entries(selectTags).map(([id, name]) => (
                    <span key={id} id="badge-dismiss-default" className="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-blue-800 bg-blue-100 rounded dark:bg-blue-900 dark:text-blue-300">
                        {name}
                        <button onClick={() => { removeSelectTag(Number(id)) }} type="button" className="inline-flex items-center p-1 ms-2 text-sm text-blue-400 bg-transparent rounded-sm hover:bg-blue-200 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-blue-300" data-dismiss-target="#badge-dismiss-default" aria-label="Remove">
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </span>
                ))}
            </div>
            {
                task && <div className="flex items-center m-2">
                    <input name="completed" defaultChecked={task?.completed || false} id="checked-checkbox" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="checked-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Completed</label>
                </div>
            }
            <div className='flex gap-2 text-white justify-center my-2'>
                <button type='submit' className='bg-blue-900 rounded-lg px-3 py-1 hover:bg-blue-500 duration-75 ' >{txtBtn}</button>
                <Link to="/" className='bg-red-600 rounded-lg px-3 py-1 hover:bg-red-900 duration-75'>Cancel</Link>
            </div>

        </form>
    );
}

export default FormTask;