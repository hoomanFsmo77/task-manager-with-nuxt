import {useTaskStore} from "~/store/task";
import {New_Task} from "~/composables/useTypes";



export const useTaskCreate=()=>{
    const store=useTaskStore()
    const newTaskInfo=reactive<New_Task>({
        completed:false,
        content:''
    })


    const create = () => {
        store['createTask'](newTaskInfo)
    }

    store.$subscribe((mutation, state)=>{
        newTaskInfo.content=''
        newTaskInfo.completed=false
    })

    return{
        create,newTaskInfo
    }
}