import { defineCollection, defineCollectionSource, defineContentConfig, z } from '@nuxt/content'
import categories from './content/categories.json'

// categories.json es un arreglo: cada elemento se indexa como un documento
const categoriesSource = defineCollectionSource({
  getKeys: () => categories.map((category) => `${category.slug}.json`),
  getItem: (key) => {
    const slug = key.replace(/\.json$/, '')
    return JSON.stringify(categories.find((category) => category.slug === slug))
  }
})

export default defineContentConfig({
  collections: {
    products: defineCollection({
      type: 'data',
      source: 'products/*.json',
      schema: z.object({
        slug: z.string(),
        name: z.string(),
        description: z.string(),
        category: z.string(),
        image: z.string(),
        price: z.number(),
        brand: z.string(),
        model: z.string(),
        year: z.number().optional(),
        weightKg: z.number().optional(),
        colors: z.array(z.string()).optional(),
        sourceUrl: z.string()
      })
    }),
    categories: defineCollection({
      type: 'data',
      source: categoriesSource,
      schema: z.object({
        slug: z.string(),
        name: z.string(),
        description: z.string(),
        image: z.string()
      })
    })
  }
})
