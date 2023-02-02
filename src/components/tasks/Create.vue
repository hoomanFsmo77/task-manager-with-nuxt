<template>
  <form @submit.prevent="create">
    <div class="mb-5 ">
      <h4>Create Tasks</h4>
      <div class="my-2 d-flex flex-row gap-1">
        <input v-model="newTaskInfo.content" type="text" class="form-control" placeholder="Task">
        <button type="submit" class="btn btn-primary">create</button>
      </div>
      <div class="form-check">
        <input v-model="newTaskInfo.completed" class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
        <label class="form-check-label" for="flexCheckDefault">
          completed
        </label>
      </div>

    </div>
  </form>
</template>

<script setup lang="ts">
const {create,newTaskInfo}=useCreate()
</script>

<style scoped>

</style>