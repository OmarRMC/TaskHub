import { useNavigate } from "react-router";
import FormCategory from "./FormCategory";
import { useAuth } from "../../hooks/useAuth";
import { createCategory } from "../../api/categoryApi";
import { categoryType } from "../../interface/categoryInterface";

function CreateCategory() {
    const navigate = useNavigate();
    const { data } = useAuth();
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        let form = new FormData(event.currentTarget)
        let dataCategory = { ...Object.fromEntries(form.entries()), id: null } as categoryType
        const token = data?.token;
        const response = await createCategory(token, dataCategory);
        if (response.status === 201) {
            navigate('/category');
        }
    }

    return (
        <FormCategory handleSubmit={handleSubmit} texBtn="Add" title="Create Category" />
    );
}

export default CreateCategory;