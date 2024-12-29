import { tagType } from "../../interface/tagInterface";

function SelectForm({ name, listData, select, handleChange, required=false , label }: { name: string, listData?: any, select?: any, handleChange?: (tag: tagType) => void , required?:boolean, label?:string}) {

    const changeSelect = (e: any) => {

        const tag = listData.find(({ id }:{id:number}) => id == e.target.value) as tagType;
        if (!tag) return;
        handleChange&&handleChange(tag)
    }

    return (
        <div className="my-1">
            <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >{label??name}</label>
            <select onChange={changeSelect} name={name} id={name} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required={required}>
                {
                    name==="tags"&&<option>Select</option>
                }
                {
                    listData?.map((item: tagType) =>
                        <option key={item.id} value={item.id}>{item.name}</option>
                    )
                }

            </select>
        </div>
    );
}

export default SelectForm;