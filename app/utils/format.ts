const priceFormatter = new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'USD' })

export function formatPrice(price: number) {
  return priceFormatter.format(price)
}

// Minúsculas y sin tildes, para que "montana" encuentre "Montaña"
export function normalizeText(text: string) {
  return text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
}
