<template>
    <div class="mb-5">
      <h4 class="mb-3">Filter Tasks</h4>
      <select @change="filterTasks" v-model="toBeNarrow" class="form-select" aria-label="Default select example">
        <option selected value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="199">199</option>
      </select>
    </div>
</template>

<script setup lang="ts">
const {toBeNarrow,filterTasks}=UseTaskFilter()
</script>

<style scoped>

</style>