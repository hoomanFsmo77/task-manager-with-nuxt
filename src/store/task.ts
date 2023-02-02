import {defineStore} from "pinia";
import axios from "axios";
import {ITask,Route_Params,New_Task} from "~/composables/useTypes";
import {ETask} from "~/composables/useEnum";
import Swal from "sweetalert2";

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
        [ETask.SET_TASK](itemToShow:Route_Params){
            this.fetchFlag=false
            axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${itemToShow}`).then(res=>{
                this.tasks=res.data
                this.fetchFlag=true
            })
        },
        [ETask.SET_UPDATED_TASK](id:number,completed:boolean){
            const index=this["getUpdatedTaskIndex"](id)
            this.updateFlag=false
            this.taskIdUpdating=this.tasks[index].id
            axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`,{
                completed:!completed
            }).
            then(response=>{
                this.updateFlag=true
                this.tasks[index].completed=!this.tasks[index].completed
                this.taskIdUpdating=null
                Swal.fire({
                    toast:true,
                    position: 'top',
                    icon: 'success',
                    title: 'Task Updated!',
                    showConfirmButton: false,
                    timer: 1500
                })
            }).catch(err=>{
                this.updateFlag=true
                this.taskIdUpdating=null
                Swal.fire({
                    toast:true,
                    position: 'top',
                    icon: 'error',
                    title: 'Something went wrong!',
                    showConfirmButton: false,
                    timer: 1500
                })
            })

        },
        [ETask.DELETE_TASK](id:number){
            const index=this["getUpdatedTaskIndex"](id)
            this.updateFlag=false
            this.taskIdUpdating=this.tasks[index].id
            axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`).
            then(res=>{
                this.tasks.splice(index,1)
                this.updateFlag=true
                this.taskIdUpdating=null
                Swal.fire({
                    toast:true,
                    position: 'top',
                    icon: 'warning',
                    title: 'Task Deleted!',
                    showConfirmButton: false,
                    timer: 1500
                })
            }).
            catch(err=>{
                this.updateFlag=true
                this.taskIdUpdating=null
                Swal.fire({
                    position: 'top',
                    icon: 'error',
                    title: 'Something went wrong!',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
        },
        [ETask.CREATE_TASK](newTask:New_Task){
            const id=this['getLastId']
            axios.post('https://jsonplaceholder.typicode.com/todos',{
                id:id,
                title:newTask.content,
                completed:newTask.completed
            }).then(res=>{
                this.tasks.unshift({
                    id:id,
                    title:newTask.content,
                    completed:newTask.completed
                })
                Swal.fire({
                    toast:true,
                    position: 'top',
                    icon: 'success',
                    title: 'Task Added!',
                    showConfirmButton: false,
                    timer: 1500
                })
            }).catch(err=>{
                Swal.fire({
                    toast:true,
                    position: 'top',
                    icon: 'error',
                    title: 'Something went wrong!',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
        }
    }
})
