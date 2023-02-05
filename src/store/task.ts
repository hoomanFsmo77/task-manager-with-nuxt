import {defineStore} from "pinia";
import {ITask,Route_Params,New_Task} from "~/composables/useTypes";
import {ETask} from "~/composables/useEnum";
import Swal from "sweetalert2";
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
            this.fetchFlag=false
            try{
                const data=await apiFetch<ITask[]>('', {retry:3,query:{_limit:itemToShow}});
                this.tasks=data
                this.fetchFlag=true
            }catch (e) {
                console.log(e)
            }
        },
        async [ETask.SET_UPDATED_TASK](id:number,completed:boolean){
            const index=this["getUpdatedTaskIndex"](id)
            this.updateFlag=false
            this.taskIdUpdating=this.tasks[index].id
            try {
                const request=await apiFetch(`/${id}`,{
                    method:'PUT',
                    headers:{'Content-Type': 'application/json'},
                    body:JSON.stringify({completed:!completed})
                })
                this.updateFlag=true
                this.tasks[index].completed=!this.tasks[index].completed
                this.taskIdUpdating=null
                await Swal.fire({
                        toast:true,
                        position: 'top',
                        icon: 'success',
                        title: 'Task Updated!',
                        showConfirmButton: false,
                        timer: 1500
                })

            }catch (e) {
                this.updateFlag=true
                this.taskIdUpdating=null
                await Swal.fire({
                        toast:true,
                        position: 'top',
                        icon: 'error',
                        title: 'Something went wrong!',
                        showConfirmButton: false,
                        timer: 1500
                })
            }
        },
        async [ETask.DELETE_TASK](id:number){
            const index=this["getUpdatedTaskIndex"](id)
            this.updateFlag=false
            this.taskIdUpdating=this.tasks[index].id
            try {
                const request=await apiFetch(`/${id}`,{method:'DELETE'})
                this.tasks.splice(index,1)
                this.updateFlag=true
                this.taskIdUpdating=null
                await Swal.fire({
                    toast:true,
                    position: 'top',
                    icon: 'warning',
                    title: 'Task Deleted!',
                    showConfirmButton: false,
                    timer: 1500
                })

            }catch (e) {
                this.updateFlag=true
                this.taskIdUpdating=null
               await Swal.fire({
                    position: 'top',
                    icon: 'error',
                    title: 'Something went wrong!',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        },
        async [ETask.CREATE_TASK](newTask:New_Task){
            const id=this['getLastId']
            try {
                const request=await apiFetch('',{
                    method:'POST',
                    headers:{'content-type':'application/json'},
                    body:JSON.stringify({
                        id:id,
                        title:newTask.content,
                        completed:newTask.completed
                    })
                })
                this.tasks.unshift({
                    id:id,
                    title:newTask.content,
                    completed:newTask.completed
                })
                await Swal.fire({
                    toast:true,
                    position: 'top',
                    icon: 'success',
                    title: 'Task Added!',
                    showConfirmButton: false,
                    timer: 1500
                })

            }catch (e) {
                await Swal.fire({
                    toast:true,
                    position: 'top',
                    icon: 'error',
                    title: 'Something went wrong!',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        }
    }
})
