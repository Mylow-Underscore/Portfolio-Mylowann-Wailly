export const formatDate = (date: Date | string): string => {
  const d = new Date(date)
  return d.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export const formatDateTime = (date: Date | string): string => {
  const d = new Date(date)
  return d.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export const formatCurrency = (amount: number, currency: string = 'EUR'): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency,
  }).format(amount)
}

export const formatNumber = (num: number, decimals: number = 0): string => {
  return num.toLocaleString('fr-FR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

export const truncate = (str: string, length: number): string => {
  return str.length > length ? str.substring(0, length) + '...' : str
}

export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const slugify = (str: string): string => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export const unslugify = (slug: string): string => {
  return slug
    .replace(/-/g, ' ')
    .split(' ')
    .map(word => capitalize(word))
    .join(' ')
}