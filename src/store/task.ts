import {defineStore} from "pinia";
import {ITask,Route_Params,New_Task} from "~/composables/useTypes";
import {ETask} from "~/composables/useEnum";
import {showMessage} from "~/composables/useHelper";
const apiFetch = $fetch.create({ baseURL: 'https://jsonplaceholder.typicode.com/todos' })

export const useTaskStore=defineStore('task',{
    state:()=>{
        return{
            tasks:[] as ITask[],
            fetchFlag:false as boolean,
            updateFlag:false as boolean,
            taskIdUpdating:null as null|number
        }
    },
    getters:{
        [ETask.GET_TASK](state){
            return state.tasks
        },[ETask.GET_TASK_ID](state){
            return state.taskIdUpdating
        },
        [ETask.GET_FECTH_FLAG](state){
            return state.fetchFlag
        },
        [ETask.GET_UPDATE_FLAG](state){
            return state.updateFlag
        },
        [ETask.GET_UPDATED_TASK_INDEX]:(state)=>(id:number)=>{
            return state.tasks.findIndex(item=>item.id===id)
        },
        [ETask.GET_LAST_ID](state):number{
            return state.tasks.length+1
        }
    },
    actions:{
        async [ETask.SET_TASK](itemToShow:Route_Params){
            const {data,error,pending}=await useAsyncData('setTask',()=>apiFetch('',{retry:3,query:{_limit:itemToShow}}))
            if(data.value){
                this.tasks=data.value as ITask[]
                this.fetchFlag=!pending.value
            }
            if(error.value){
                console.log(error)
            }
        },
        async [ETask.SET_UPDATED_TASK](id:number,completed:boolean){
            const index=this["getUpdatedTaskIndex"](id)
            this.taskIdUpdating=this.tasks[index].id
            this.updateFlag=false
            const {data,error,pending}=await useAsyncData('updateTask',()=>apiFetch(`/${id}`,{
                method:'PUT',
                headers:{'Content-Type': 'application/json'},
                body:JSON.stringify({completed:!completed})
            }))
            if(data.value){
                this.updateFlag=!pending.value
                this.tasks[index].completed=!this.tasks[index].completed
                this.taskIdUpdating=null
                showMessage('Task Updated!','success')
            }
            if(error.value){
                this.taskIdUpdating=null
                showMessage('Something went wrong!','error')
            }
        },
        async [ETask.DELETE_TASK](id:number){
            const index=this["getUpdatedTaskIndex"](id)
            this.updateFlag=false
            this.taskIdUpdating=this.tasks[index].id
            const {error,pending,data}=await useAsyncData('deleteTask',()=>apiFetch(`/${id}`,{method:'DELETE'}))
            if(data.value){
                this.tasks.splice(index,1)
                this.updateFlag=!pending.value
                this.taskIdUpdating=null
                showMessage('Task Updated!','warning')
            }
            if(error.value){
                this.updateFlag=true
                this.taskIdUpdating=null
                showMessage('Something went wrong!','error')
            }
        },
        async [ETask.CREATE_TASK](newTask:New_Task){
            const id=this['getLastId']
            const {error,data}=await useFetch('https://jsonplaceholder.typicode.com/todos',{
                method:'POST',
                headers:{'content-type':'application/json'},
                body:JSON.stringify({
                    id:id,
                    title:newTask.content,
                    completed:newTask.completed
                })
            })
            if(data.value){
                this.tasks.unshift({
                    id:id,
                    title:newTask.content,
                    completed:newTask.completed
                })
                showMessage('Task Added!','success')
            }
            if(error.value){
                showMessage('Something went wrong!','error')
            }
        }
    }
})
