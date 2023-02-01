import {defineStore} from "pinia";
import axios from "axios";
import {ITask,Route_Params} from "~/composables/useTypes";
import {ETask} from "~/composables/useEnum";

export const useTaskStore=defineStore('task',{
    state:()=>{
        return{
            tasks:[] as ITask[],
            fetchFlag:false as boolean
        }
    },
    getters:{
        [ETask.GET_TASK](state){
            return state.tasks
        },
        [ETask.GET_FECTH_FLAG](state){
            return state.fetchFlag
        }
    },
    actions:{
        [ETask.SET_TASK](itemToShow:Route_Params){
            this.fetchFlag=false
            axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${itemToShow}`).then(res=>{
                this.tasks=res.data
                this.fetchFlag=true
            })
        }
    }
})
