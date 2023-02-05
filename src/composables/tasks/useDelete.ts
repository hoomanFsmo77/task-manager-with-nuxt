import {useTaskStore} from "~/store/task";

export const useTaskDelete=(props:{id:number})=>{
    const store=useTaskStore()
    const deleteTask = () => {
        store['deleteTask'](props.id)
    }

    return{deleteTask}

}