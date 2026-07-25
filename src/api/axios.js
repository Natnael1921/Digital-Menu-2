import axios from 'axios'

const getBaseURL = () => {
  if (import.meta.env.DEV) {
    const host = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
    return `http://${host}:5000`;
  }
  return import.meta.env.VITE_API_URL || 'https://digital-menu-9zl4.onrender.com';
};

const instance = axios.create({
  baseURL: getBaseURL(),
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Response interceptor – normalise errors
instance.interceptors.response.use(
  (res) => res,
  (err) => {
    const message =
      err?.response?.data?.message || err?.message || 'Something went wrong'
    return Promise.reject(new Error(message))
  }
)

export default instance
