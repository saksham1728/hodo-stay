// API base configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

// Generic API request function
export const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  }

  try {
    const response = await fetch(url, config)
    const data = await response.json()
    
    if (!response.ok) {
      // Create an error that includes the response data
      const error = new Error(`HTTP error! status: ${response.status}`)
      error.response = {
        status: response.status,
        data: data
      }
      throw error
    }
    
    return data
  } catch (error) {
    console.error('API request failed:', error)
    throw error
  }
}

// API methods
export const api = {
  get: (endpoint, options = {}) => 
    apiRequest(endpoint, { method: 'GET', ...options }),
  
  post: (endpoint, data, options = {}) =>
    apiRequest(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      ...options,
    }),
  
  put: (endpoint, data, options = {}) =>
    apiRequest(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...options,
    }),
  
  delete: (endpoint, options = {}) =>
    apiRequest(endpoint, { method: 'DELETE', ...options }),
}

// Export api as default for backward compatibility
export default api

// Export services - Clean Building-Units Architecture
export { unitService } from './units/unitService'
export { userService } from './users/userService'
export { bookingService } from './bookings/bookingService'
export { pricingService } from './pricing/pricingService'
export { paymentService } from './payments/paymentService'