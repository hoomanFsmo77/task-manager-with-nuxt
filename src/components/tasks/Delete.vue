<template>
  <i @click="deleteTask" class="bi bi-trash2-fill point"></i>
</template>

<script setup lang="ts">
const props=defineProps<{id:number}>()
const {deleteTask}=useDelete(props)

</script>

<style scoped>

</style>