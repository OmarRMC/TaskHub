import { useTask } from "../../hooks/useTask";
import FormTask from "./FormTask";

function CreateTask() {
    const {addDataResponse} =useTask(); 
    return ( 
        <FormTask title="Crate Task" txtBtn="Create" addDataResponse={addDataResponse}/>
     );
}

export default CreateTask;