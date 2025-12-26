import axios, { AxiosError, AxiosInstance } from 'axios'

interface ApiErrorResponse {
  success: boolean
  error?: string
  message?: string
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor - add auth token
apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => Promise.reject(error)
)

// Response interceptor - handle errors
apiClient.interceptors.response.use(
  response => response,
  (error: AxiosError<ApiErrorResponse>) => {
    if (error.response?.status === 401) {
      // Clear auth and redirect
      localStorage.removeItem('auth_token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default apiClient

// Utility functions
export const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || error.response?.data?.error || 'Une erreur est survenue'
  }
  return 'Une erreur inattendue est survenue'
}

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}