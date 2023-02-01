<template>
  <div :class="{'bg-secondary bg-opacity-25':completed}" class="card  d-flex flex-row p-1 justify-content-between align-items-center">
    <div class="card-body " :class="{'text-decoration-line-through':completed}">
     {{content}}
    </div>
    <div class="d-flex flex-row">
      <i v-if="!completed" class="bi bi-check2 mx-1 point"></i>
      <i v-else class="bi bi-check2-all mx-1 point"></i>
      <i class="bi bi-trash2-fill point"></i>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Prop {
  content:string
  completed:boolean
}

const {content,completed}=defineProps<Prop>()



</script>

<style >
.point{cursor: pointer}
</style>