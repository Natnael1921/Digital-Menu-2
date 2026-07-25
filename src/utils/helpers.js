/**
 * Format a number as a currency string.
 * @param {number} amount
 * @param {string} currency - ISO 4217 code, default 'ETB'
 */
export const formatPrice = (amount, currency = 'ETB') => {
  try {
    return new Intl.NumberFormat('en-ET', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
    }).format(amount)
  } catch {
    return `ETB ${Number(amount).toFixed(2)}`
  }
}

/**
 * Map spicy level (number OR string) to label + color.
 * Backend returns strings: "none" | "mild" | "medium" | "hot" | "very_hot"
 */
export const spicyInfo = (level) => {
  const strMap = {
    none: null,
    mild: { label: 'Mild', color: 'text-green-600 bg-green-50' },
    medium: { label: 'Medium', color: 'text-yellow-600 bg-yellow-50' },
    hot: { label: 'Hot', color: 'text-orange-600 bg-orange-50' },
    very_hot: { label: 'Very Hot', color: 'text-red-600 bg-red-50' },
  }
  const numMap = {
    0: null,
    1: { label: 'Mild', color: 'text-green-600 bg-green-50' },
    2: { label: 'Medium', color: 'text-yellow-600 bg-yellow-50' },
    3: { label: 'Hot', color: 'text-orange-600 bg-orange-50' },
    4: { label: 'Very Hot', color: 'text-red-600 bg-red-50' },
  }
  if (typeof level === 'string') return strMap[level] ?? null
  return numMap[level] ?? null
}

/**
 * Generate Cloudinary optimised URL – replace upload/ with upload/q_auto,f_auto,w_{width}/
 */
export const optimiseCloudinaryUrl = (url, width = 600) => {
  if (!url || !url.includes('cloudinary.com')) return url
  return url.replace('/upload/', `/upload/q_auto,f_auto,w_${width}/`)
}

/**
 * Clamp text to a given character count.
 */
export const truncate = (text = '', max = 100) =>
  text.length > max ? text.slice(0, max) + '…' : text
