<template>
  <div :class="{'bg-secondary bg-opacity-25':completed}" class="card  d-flex flex-row p-1 justify-content-between align-items-center">
    <div v-if="!updateFlag && taskId===id" class="p-3 flex-row d-flex w-100 justify-content-center">
      <div  class="spinner-border m-auto" role="status"></div>
    </div>
    <template v-else>
      <div class="card-body " :class="{'text-decoration-line-through':completed}">
        {{content}}
      </div>
      <div class="d-flex flex-row">
        <TasksUpdate :id="id" :completed="completed"/>
        <TasksDelete :id="id"/>
      </div>
    </template>

  </div>
</template>

<script setup lang="ts">
import {useTaskStore} from "~/store/task";
interface Prop {content:string,completed:boolean,id:number}
const store=useTaskStore()
const {content,completed,id}=defineProps<Prop>()
const updateFlag=computed(()=>store['getUpdateFlag'])
const taskId=computed(()=>store['getTaskId'])
</script>

<style >
.point{cursor: pointer}
</style>