
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
    const [processing, setProcessing] = useState<boolean>(false)

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
        setProcessing(true); 
        
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
        setProcessing(false); 
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
        <form onSubmit={handleSave} action="" className='w-11/12 sm:w-6/12 m-auto p-6 shadow-lg mt-10'>
            <div className={`${processing && 'opacity-20  pointer-events-none'}  `}>
                <h2 className='text-center font-bold '>{title}</h2>
                <Input type="text" name="title" label="title" placeholder="title" value={task?.title}></Input>
                <Input type="text" name="description" label="description" placeholder="description" value={task?.description}></Input>
                <SelectForm name="category_id"  label="Select a category" listData={categories} required={true} />
                <SelectForm name="tags" listData={dataResponse as tagType} handleChange={addSelectTag}  label="Select tags"/>
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
            </div>

            {processing && <div role="status" className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2 z-10 opacity-100">
                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
            </div>}

        </form>
    );
}

export default FormTask;