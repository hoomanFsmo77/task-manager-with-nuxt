<template>
  <i @click="updateTask" v-if="!props.completed" class="bi bi-check2 mx-1 point"></i>
  <i @click="updateTask" v-else class="bi bi-check2-all mx-1 point"></i>
</template>

<script setup lang="ts">
interface Prop{completed:boolean,id:number}
const props=defineProps<Prop>()
const {updateTask}=useUpdate(props)
</script>

<style scoped>

</style>