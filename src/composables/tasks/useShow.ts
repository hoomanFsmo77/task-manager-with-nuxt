import {useTaskStore} from "~/store/task";


export const useTaskShow=()=>{
    const store=useTaskStore()
    const route=useRoute()
    const tasks=computed(()=>store['getTask'])
    const fetchFlag=computed(()=>store['getFetchFlag'])
    watch(
        ()=>route.params,
        ()=>{
            store['setTasks'](route.params.tasks ?? 199)
        },
        {
            immediate:true
        }
    )

    return {tasks,fetchFlag}
}