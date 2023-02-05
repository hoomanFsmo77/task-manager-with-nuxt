<template>
  <i @click="deleteTask" class="bi bi-trash2-fill point"></i>
</template>

<script setup lang="ts">
const props=defineProps<{id:number}>()
const {deleteTask}=useTaskDelete(props)

</script>

<style scoped>

</style>