import { useNavigate, useParams } from "react-router";
import { updateCategory } from "../../api/categoryApi";
import { useAuth } from "../../hooks/useAuth";
import FormCategory from "./FormCategory";
import { categoryType } from "../../interface/categoryInterface";
function EditCategory() {
    const { id } = useParams();
    const { data } = useAuth()

    const navigate = useNavigate();
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        let form = new FormData(event.currentTarget)
        let Category = { ...Object.fromEntries(form.entries()), id: (id) ?? null } as categoryType
        const token = data?.token;
        const response = await updateCategory(token, Category);
        if (response.status === 200) {
            console.log(response);
            navigate('/category');
        }
    }
    return (
        <>
            <FormCategory handleSubmit={handleSubmit} texBtn="Edit" title="Edit Category" />
        </>
    );
}

export default EditCategory;