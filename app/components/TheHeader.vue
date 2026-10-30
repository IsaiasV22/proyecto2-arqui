<script setup lang="ts">
const route = useRoute()
const cartCount = useState('cart-count', () => 0)

const query = ref(typeof route.query.q === 'string' ? route.query.q : '')

// Mantener el campo sincronizado al llegar a /buscar desde un enlace o con Atrás
watch(
  () => route.query.q,
  (q) => {
    query.value = typeof q === 'string' ? q : ''
  }
)

function search() {
  const q = query.value.trim()
  if (!q) return
  navigateTo({ path: '/buscar', query: { q } })
}
</script>

<template>
  <header class="site-header">
    <div class="site-header-inner">
      <NuxtLink to="/" class="site-title">
        <span class="logo" aria-hidden="true">🚲</span>
        Tienda de bicicletas
      </NuxtLink>
      <nav class="site-nav">
        <NuxtLink to="/">Inicio</NuxtLink>
        <form class="site-search" role="search" @submit.prevent="search">
          <input
            v-model="query"
            type="search"
            placeholder="Buscar bicicletas"
            aria-label="Buscar bicicletas"
            autocomplete="off"
          />
          <button type="submit">Buscar</button>
        </form>
        <button type="button" class="snipcart-checkout cart-button">
          🛒 Carrito (<ClientOnly fallback="0"><span>{{ cartCount }}</span></ClientOnly>)
        </button>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
}

.site-header-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.site-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--color-text);
  text-decoration: none;
}

.site-nav {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.25rem;
}

.site-nav a {
  color: var(--color-text-muted);
  text-decoration: none;
  font-weight: 500;
}

.site-nav a:hover,
.site-nav a.router-link-exact-active {
  color: var(--color-accent);
}

.site-search {
  display: flex;
  gap: 0.4rem;
}

.site-search input {
  padding: 0.4rem 0.6rem;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  font-size: 0.95rem;
  min-width: 12rem;
}

.site-search button,
.cart-button {
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text);
  padding: 0.4rem 0.9rem;
  border-radius: 6px;
  font-size: 0.95rem;
  cursor: pointer;
}

.site-search button:hover,
.cart-button:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.cart-button {
  background: var(--color-accent);
  border-color: var(--color-accent);
  color: #fff;
  font-weight: 600;
}

.cart-button:hover {
  background: var(--color-accent-dark);
  color: #fff;
}
</style>
