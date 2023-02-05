<template>
  <div class="container mt-5">
    <div class="row g-2">
      <div v-for="item in products" class="col-3">
        <ProductsProductItem
        :img="item.img"
        :title="item.title"
        :description="item.description"
        :price="item.price"
        :count="item.count"
        :id="item.id"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const {products}=useProductShow()

</script>

<style scoped>

</style>