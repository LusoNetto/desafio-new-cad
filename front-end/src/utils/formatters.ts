export const formatters = {
  formatDateToBrazilian: (date: string) => {
    const [year, month, day] = date.split('-').map(Number)
    const dateObj = new Date(year, month - 1, day)

    return dateObj.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  },
  formatPriceToBrazilianCurrency: (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(Number(price))
  },
}
