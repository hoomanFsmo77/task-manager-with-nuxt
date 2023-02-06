<template>
  <div class="card" style="width: auto;">
    <img :src="img" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">{{title}}</h5>
      <p class="card-text">{{description}}</p>
      <div class="d-flex flex-row justify-content-between align-items-center">
        <button @click="addToCart" class="btn btn-primary">Add To Cart</button>
        <p class="m-0 fs-4">
          ${{price}}
        </p>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">

interface IProduct {
  id:number
  title:string
  img:string
  description:string
  price:number
  count:number
}
const {img,title,description,price,count,id}=defineProps<IProduct>()
const {addToCart}=useProductAdd(id)
</script>

<style scoped>

</style>