<script setup lang="ts">
import type { ProductsCollectionItem } from '@nuxt/content'

defineProps<{
  product: Pick<ProductsCollectionItem, 'slug' | 'name' | 'brand' | 'image' | 'price'>
}>()
</script>

<template>
  <NuxtLink :to="`/bicicletas/${product.slug}`" class="product-card">
    <img :src="product.image" :alt="product.name" loading="lazy" />
    <span class="product-card-brand">{{ product.brand }}</span>
    <span class="product-card-name">{{ product.name }}</span>
    <span class="product-card-price">{{ formatPrice(product.price) }}</span>
  </NuxtLink>
</template>
