export function useProductPagination<T>(
  items: Ref<T[] | null | undefined>,
  pageSize = 3
) {
  const route = useRoute()
  const router = useRouter()

  const totalPages = computed(() =>
    Math.max(1, Math.ceil((items.value?.length ?? 0) / pageSize))
  )

  // La página vive en la URL (?pagina=N) para que Atrás regrese a la misma página
  const page = computed(() => {
    const requested = Number(route.query.pagina)
    if (!Number.isInteger(requested) || requested < 1) return 1
    return Math.min(requested, totalPages.value)
  })

  const paged = computed(() => {
    const start = (page.value - 1) * pageSize
    return (items.value ?? []).slice(start, start + pageSize)
  })

  function setPage(value: number) {
    router.push({ query: { ...route.query, pagina: value === 1 ? undefined : value } })
  }

  return { page, totalPages, paged, setPage }
}
