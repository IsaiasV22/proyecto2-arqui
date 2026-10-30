// https://nuxt.com/docs/api/configuration/nuxt-config
import { readdirSync } from 'node:fs'

// Cada bicicleta se pre-renderiza aunque sólo se enlace desde la página 2 de su
// categoría (?pagina=2): Snipcart visita esta dirección para validar el precio
const productRoutes = readdirSync('content/products')
  .filter((file) => file.endsWith('.json'))
  .map((file) => `/bicicletas/${file.replace(/\.json$/, '')}`)

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/content'],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      // Se sobrescriben con NUXT_PUBLIC_SNIPCART_API_KEY y NUXT_PUBLIC_SITE_URL
      snipcartApiKey: '',
      siteUrl: 'http://localhost:3000'
    }
  },
  nitro: {
    prerender: {
      routes: productRoutes
    }
  },
  app: {
    head: {
      htmlAttrs: { lang: 'es' },
      title: 'Tienda de bicicletas',
      meta: [
        {
          name: 'description',
          content: 'Tienda de bicicletas de montaña, ruta, gravel, urbanas, eléctricas e infantiles.'
        }
      ]
    }
  }
})
