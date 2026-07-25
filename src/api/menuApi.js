import api from './axios'

/**
 * Fetch full menu: restaurant info + categories + foods grouped by category.
 * Backend returns a single, pre-sorted payload.
 */
export const fetchMenu = async () => {
  const { data } = await api.get('/api/menu/')
  return data
}

/**
 * Fetch a single food item by ID for the detail modal.
 */
export const fetchFoodById = async (id) => {
  const { data } = await api.get(`/api/menu/foods/${id}`)
  return data
}

/**
 * Submit contact form message to the backend (connected to Brevo).
 */
export const sendContactMessage = async (formData) => {
  const { data } = await api.post('/api/menu/contact', formData)
  return data
}

/**
 * Submit feedback form rating and comments to the backend (connected to Brevo).
 */
export const sendFeedback = async (formData) => {
  const { data } = await api.post('/api/menu/feedback', formData)
  return data
}
