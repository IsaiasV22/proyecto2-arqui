<script setup lang="ts">
const route = useRoute()
const q = computed(() => (typeof route.query.q === 'string' ? route.query.q.trim() : ''))

const { data: products } = await useAsyncData('search-products', () => {
  return queryCollection('products').order('name', 'ASC').all()
})

const { data: categories } = await useAsyncData('search-categories', () => {
  return queryCollection('categories').all()
})

const categoryNames = computed(() => {
  return new Map((categories.value ?? []).map((category) => [category.slug, category.name]))
})

const results = computed(() => {
  const term = normalizeText(q.value)
  if (!term) return []
  return (products.value ?? []).filter((product) => {
    const text = [
      product.name,
      product.brand,
      product.model,
      product.description,
      categoryNames.value.get(product.category) ?? ''
    ].join(' ')
    return normalizeText(text).includes(term)
  })
})

useSeoMeta({ title: 'Búsqueda - Tienda de bicicletas' })
</script>

<template>
  <div>
    <p class="breadcrumb"><NuxtLink to="/">Inicio</NuxtLink> / Búsqueda</p>
    <h1 class="page-title">Búsqueda</h1>

    <p v-if="!q" class="page-subtitle">
      Escriba una palabra clave en el campo de búsqueda del encabezado (por ejemplo, una marca,
      un modelo o un tipo de bicicleta).
    </p>
    <template v-else>
      <p class="page-subtitle">
        {{ results.length }} {{ results.length === 1 ? 'resultado' : 'resultados' }} para
        «{{ q }}».
      </p>

      <div v-if="results.length" class="card-grid">
        <ProductCard v-for="product in results" :key="product.slug" :product="product" />
      </div>
      <p v-else class="empty-state">
        Ninguna bicicleta coincide con «{{ q }}». Pruebe con otra palabra o
        <NuxtLink to="/">explore las categorías</NuxtLink>.
      </p>
    </template>
  </div>
</template>
