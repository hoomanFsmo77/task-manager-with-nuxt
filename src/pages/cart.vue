<template>
  <div class="container mt-5">
    <div v-if="cartLength>0" class="row">
      <div class="col-12">
        <table class="table table-responsive align-middle">
          <thead>
          <tr>
            <th scope="col">Product</th>
            <th scope="col">Price</th>
            <th scope="col" class="text-center">Quantity</th>
            <th scope="col">Subtotal</th>
            <th scope="col" class="text-center">Action</th>
          </tr>
          </thead>
          <tbody>
          <CartItem v-for="item in cartList"
          :img="item.img"
          :title="item.title"
          :description="item.description"
          :price="item.price"
          :count="item.count"
                    :id="item.id"
          />
          </tbody>
        </table>
        <div class="p-2 d-flex flex-row justify-content-between">
          <button @click="clearCart" class="btn btn-dark">
            CLEAR CART
          </button>
          <div class="d-flex flex-row align-items-center">
            <p class="fs-3 m-0">
              Total: {{'$'+totalPrice}}
            </p>
            <button class="btn btn-warning ms-3">
              Checkout
            </button>
          </div>
        </div>

      </div>
    </div>
    <div v-else class="row">
      <div class="col-12 d-flex flex-row justify-content-center">
        <div class="d-flex justify-content-center flex-column align-items-center">
          <i style="font-size: 5rem" class="bi bi-basket-fill "></i>
          <p class="text-center fs-3 m-0">Cart is empty!</p>
          <NuxtLink class="btn btn-outline-secondary mt-2" :to="{name:'products'}">
            Products
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const {cartList,totalPrice,clearCart,cartLength}=useCartShow()
const {$dollar}=useNuxtApp()
</script>

<style scoped>

</style>