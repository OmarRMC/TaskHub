import { NavLink } from "react-router";
import Input from "../UI/Input";
import { useCategory } from "../../hooks/useCategory";

function FormCategory({handleSubmit, texBtn="Edit", title="Edit Category"}:any) {
    const { category } = useCategory();

    return (
        <div className="flex h-screen items-center">
            <form onSubmit={handleSubmit} className="flex  flex-col gap-1 min-w-80 mx-auto p-10  shadow-2xl rounded-lg">
                <h3 className="text-center font-bold ">{title}</h3>
                <Input name="name" type="text" placeholder="name" label="name"  value={category?.name}/>
                <Input name="description" type="text" placeholder="description" label="description" value={category?.description} />
                <div className="flex gap-2 justify-center mt-4">
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{texBtn}</button>
                    <NavLink to="/category" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Cancel</NavLink>
                </div>
            </form>
        </div>
    );
}

export default FormCategory;