<script setup lang="ts">
const route = useRoute()
const slug = String(route.params.slug)
const { siteUrl } = useRuntimeConfig().public

const { data: product } = await useAsyncData(`product-${slug}`, () => {
  return queryCollection('products').where('slug', '=', slug).first()
})

if (!product.value) {
  throw createError({ statusCode: 404, statusMessage: 'Bicicleta no encontrada', fatal: true })
}

const { data: category } = await useAsyncData(`product-${slug}-category`, () => {
  return queryCollection('categories').where('slug', '=', product.value!.category).first()
})

useSeoMeta({
  title: `${product.value.name} - Tienda de bicicletas`,
  description: product.value.description
})
</script>

<template>
  <div v-if="product">
    <p class="breadcrumb">
      <NuxtLink to="/">Inicio</NuxtLink> /
      <NuxtLink :to="`/categorias/${product.category}`">{{ category?.name }}</NuxtLink> /
      {{ product.name }}
    </p>

    <div class="product-detail">
      <img class="product-detail-image" :src="product.image" :alt="product.name" />
      <div>
        <h1 class="page-title">{{ product.name }}</h1>
        <p class="page-subtitle">{{ product.brand }} &middot; {{ category?.name }}</p>
        <p class="product-price">{{ formatPrice(product.price) }}</p>
        <button
          class="snipcart-add-item buy-button"
          :data-item-id="product.slug"
          :data-item-name="product.name"
          :data-item-price="product.price"
          :data-item-url="`${siteUrl}/bicicletas/${product.slug}`"
          :data-item-description="product.description"
          :data-item-image="product.image"
        >
          Comprar
        </button>

        <h2>Descripción</h2>
        <p>{{ product.description }}</p>

        <dl class="specs">
          <dt>Marca</dt>
          <dd>{{ product.brand }}</dd>
          <dt>Modelo</dt>
          <dd>{{ product.model }}</dd>
          <template v-if="product.year">
            <dt>Año</dt>
            <dd>{{ product.year }}</dd>
          </template>
          <template v-if="product.weightKg">
            <dt>Peso</dt>
            <dd>{{ product.weightKg }} kg</dd>
          </template>
          <template v-if="product.colors?.length">
            <dt>Colores</dt>
            <dd>{{ product.colors.join(', ') }}</dd>
          </template>
          <dt>Categoría</dt>
          <dd>
            <NuxtLink :to="`/categorias/${product.category}`">{{ category?.name }}</NuxtLink>
          </dd>
        </dl>

        <p>
          <a :href="product.sourceUrl" target="_blank" rel="noopener">Ficha del fabricante</a>
        </p>
      </div>
    </div>

    <section class="comments-section">
      <h2>Comentarios</h2>
      <CommentsUtterances repo="IsaiasV22/proyecto2-arqui-comentarios" />
    </section>
  </div>
</template>
