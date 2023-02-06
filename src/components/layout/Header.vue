<template>

  <nav class="navbar navbar-expand-lg bg-body-tertiary border-bottom border-1">
    <div class="container-fluid">

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item me-2">
            <NuxtLink active-class="active" :to="{name:'index'}" class="nav-link " >Home</NuxtLink>
          </li>
          <li class="nav-item me-2">
            <NuxtLink active-class="active" :to="{name:'tasks-tasks'}" class="nav-link " >Tasks</NuxtLink>
          </li>
          <li class="nav-item me-2">
            <NuxtLink active-class="active" :to="{name:'products'}" class="nav-link " >Product</NuxtLink>
          </li>
        </ul>
        <button @click="goToCart" type="button" class="btn ms-auto me-3 my-1 btn-primary position-relative">
          <i class="bi bi-bag-fill"></i>
          <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                   {{cartLength}}
            </span>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import {useCartStore} from "~/store/cart";
const store=useCartStore()
const cartLength=computed(()=>store['getCartLength'])
const goToCart = () => {
  navigateTo({
    name:'cart'
  })
}
</script>

<style scoped>

</style>