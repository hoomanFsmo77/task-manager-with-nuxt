<template>
    <div class="container mt-5 pt-4">
      <div class="row">
        <div class="col-3">
          <TasksFilter/>
        </div>
      </div>
      <div class="row" v-if="!fetchFlag">
        <div class="col-12 d-flex justify-content-center flex-row">
          <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
      <div v-else class="row g-2">
        <div class="col-4" v-for="item in tasks">
          <TasksShow :content="item.title" :completed="item.completed"/>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
const {tasks,fetchFlag}=useMain()
</script>

<style scoped>

</style>