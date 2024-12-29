import { NavLink } from "react-router";
import { fetchCategory, useCategory } from "../../hooks/useCategory";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { deleteCategory as deleteCategoryApi } from '../../api/categoryApi'
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
function Category() {
    const { categories, changeCatagories, loading } = fetchCategory();
    const { setSelected } = useCategory();
    const { data } = useAuth();

    const [selectDelete, setSelectDelete] = useState<number | null>(null)
    
    if (loading) return <p>Loading..</p>
    const editCategory = (Category: any) => {
        setSelected(Category)
    }
    const deleteCategory = async (id: number) => {
        setSelectDelete(id);
        const response = await deleteCategoryApi(data?.token, id);
        setSelectDelete(null);
        if (response.status === 200) {
            let auxiCategory = categories;
            auxiCategory = auxiCategory.filter(category => category.id != id);
            changeCatagories(auxiCategory);
        }
    }
    return (
        <>

            <div className="max-w-screen-md mt-6 m-auto relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <caption className=" relative p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                        <div>
                            Our categories
                            <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">List of categories</p>
                        </div>
                        <NavLink to={'create'} className="absolute bottom-3 right-5 bg-emerald-800 p-1 rounded text-white text-sm ">Add Category</NavLink>
                    </caption>
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                category
                            </th>
                            <th scope="col" className="px-6 py-3">
                                description
                            </th>

                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            categories?.map((category: any) =>
                                <tr key={category.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900  dark:text-white">
                                        {category.name}
                                    </th>
                                    <td className="px-6 py-4">
                                        {category.description}
                                    </td>
                                    <td className="px-6 py-4 text-center  text-base flex gap-5 justify-center h-full">
                                        <NavLink to={`/category/${category.id}/edit`} onClick={() => editCategory(category)} state={category} className="font-medium text-blue-600 dark:text-blue-500 hover:underline bg-blue-300 px-2 py-1  rounded">
                                            <FontAwesomeIcon icon={faPenToSquare} />
                                        </NavLink >
                                        <button disabled={selectDelete ? true : false} onClick={() => deleteCategory(category.id)} className=" font-medium text-red-600 dark:text-red-500 hover:underline bg-red-300 px-2 py-1 rounded">

                                            {
                                                selectDelete == category.id ? <FontAwesomeIcon icon={faSpinner} className="animate-spin" /> :
                                                    <FontAwesomeIcon icon={faTrash} />}
                                        </button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>

        </>
    );
}

export default Category;