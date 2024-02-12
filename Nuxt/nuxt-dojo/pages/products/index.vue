<template>
  <div class="m-2">
    <div class="grid grid-cols-4 gap-5">
      <div v-for="p in products">
        <ProductCard :product="p" />
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'products',
})
const { data: products, pending, error, refresh } = await useFetch('https://fakestoreapi.com/products',{
    
})
useHead({
  title: 'Nuxt Dojo | Merch',
  meta: [
    {name: 'description', content: 'Nuxt 3 merch'}
  ]
})
</script>

<style lang="scss" scoped></style>