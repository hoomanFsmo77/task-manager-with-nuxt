<template>
  <tr >
    <th scope="row">
      <div class="d-flex flex-row align-items-center">
        <img :src="img" width="100" alt="">
        <div class="ms-4">
          <h3>{{title}}</h3>
          <p>{{description}}</p>
        </div>
      </div>
    </th>
    <td>
      {{$dollar(price)}}
    </td>
    <td >
      <div class="d-flex justify-content-center flex-row gap-1 align-items-center">
        <button @click="decrement" class="btn btn-success rounded-circle">
          <i class="bi bi-dash"></i>
        </button>
        <span class="mx-2">
          {{count}}
        </span>
        <button @click="increment" class="btn btn-success rounded-circle">
          <i class="bi bi-plus"></i>
        </button>
      </div>
    </td>
    <td class="text-center">{{$dollar(price*count)}}</td>
    <td class="text-center">
      <button @click="deleteProduct" class="btn btn-danger">
        Delete
      </button>
    </td>
  </tr>
</template>

<script setup lang="ts">
const {img,description,price,title,count,id}=defineProps<{
  img:string
  title:string
  description:string
  price:number
  count:number
  id:number
}>()
const {$dollar}=useNuxtApp()
const {increment,decrement,deleteProduct}=useCartUpdate(id)
</script>

<style scoped>

</style>