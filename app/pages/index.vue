<script setup lang="ts">
const { data: categories } = await useAsyncData('home-categories', () => {
  return queryCollection('categories').all()
})

const { data: productCount } = await useAsyncData('home-product-count', () => {
  return queryCollection('products').count()
})
</script>

<template>
  <div>
    <h1 class="page-title">Tienda de bicicletas</h1>
    <p class="page-subtitle">
      {{ productCount }} bicicletas organizadas en {{ categories?.length }} categorías. Elija una
      categoría para ver sus modelos.
    </p>

    <div class="card-grid">
      <NuxtLink
        v-for="category in categories"
        :key="category.slug"
        :to="`/categorias/${category.slug}`"
        class="card-link"
      >
        <img :src="category.image" :alt="category.name" />
        {{ category.name }}
        <span class="card-link-sub">{{ category.description }}</span>
      </NuxtLink>
    </div>
  </div>
</template>
