import {useTaskStore} from "~/store/task";

export const useTaskUpdate=(props:{completed:boolean,id:number})=>{
    const store=useTaskStore()
    const updateTask = () => {
        store['setUpdatedTask'](props.id,props.completed)
    }

    return{
        updateTask
    }
}