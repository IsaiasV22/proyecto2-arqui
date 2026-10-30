<script setup lang="ts">
const route = useRoute()
const slug = String(route.params.categoria)

const { data: category } = await useAsyncData(`category-${slug}`, () => {
  return queryCollection('categories').where('slug', '=', slug).first()
})

if (!category.value) {
  throw createError({ statusCode: 404, statusMessage: 'Categoría no encontrada', fatal: true })
}

const { data: products } = await useAsyncData(`category-${slug}-products`, () => {
  return queryCollection('products')
    .where('category', '=', slug)
    .order('name', 'ASC')
    .select('slug', 'name', 'brand', 'image', 'price')
    .all()
})

const { page, totalPages, paged, setPage } = useProductPagination(products, 3)

useSeoMeta({ title: `${category.value.name} - Tienda de bicicletas` })
</script>

<template>
  <div v-if="category">
    <p class="breadcrumb"><NuxtLink to="/">Inicio</NuxtLink> / {{ category.name }}</p>
    <h1 class="page-title">{{ category.name }}</h1>
    <p class="page-subtitle">{{ category.description }}</p>
    <p class="page-subtitle">{{ products?.length ?? 0 }} bicicletas en esta categoría.</p>

    <div v-if="paged.length" class="card-grid">
      <ProductCard v-for="product in paged" :key="product.slug" :product="product" />
    </div>
    <p v-else class="empty-state">Todavía no hay bicicletas en esta categoría.</p>

    <PaginationControls :page="page" :total-pages="totalPages" @update:page="setPage" />
  </div>
</template>
