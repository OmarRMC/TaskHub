import { useParams } from "react-router";
import FormTask from "./FormTask";
import { useTask } from "../../hooks/useTask";

function EditTask() {
    const {id} = useParams(); 
    const {dataResponse , updateDataResponse} = useTask()
    const task=dataResponse.filter((task)=>task.id===Number(id))[0]
    return ( 
        <div>
            {(task) && <FormTask txtBtn="Edit" title="Edit Task" task={task} updateDataResponse={updateDataResponse}/>}           
        </div>
     );
}

export default EditTask;