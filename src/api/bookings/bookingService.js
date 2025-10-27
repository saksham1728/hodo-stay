import { api } from '../index.js'

/**
 * Booking API Service
 * Handles all booking-related API calls
 */
export const bookingService = {
  /**
   * Create a new booking
   * @param {Object} bookingData - Booking information
   * @returns {Promise<Object>} Created booking data
   */
  createBooking: async (bookingData) => {
    return await api.post('/bookings', bookingData)
  },

  /**
   * Get booking by ID
   * @param {string} bookingId - The booking ID
   * @returns {Promise<Object>} Booking details
   */
  getBookingById: async (bookingId) => {
    return await api.get(`/bookings/${bookingId}`)
  },

  /**
   * Get booking by reference number
   * @param {string} reference - The booking reference
   * @returns {Promise<Object>} Booking details
   */
  getBookingByReference: async (reference) => {
    return await api.get(`/bookings/reference/${reference}`)
  },

  /**
   * Get user's booking history
   * @param {string} userId - The user ID
   * @param {Object} params - Query parameters (page, limit, status)
   * @returns {Promise<Object>} User's bookings with pagination
   */
  getUserBookings: async (userId, params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    const endpoint = queryString 
      ? `/bookings/user/${userId}?${queryString}` 
      : `/bookings/user/${userId}`
    return await api.get(endpoint)
  },

  /**
   * Update booking status
   * @param {string} bookingId - The booking ID
   * @param {Object} statusData - Status update data
   * @returns {Promise<Object>} Updated booking data
   */
  updateBookingStatus: async (bookingId, statusData) => {
    return await api.put(`/bookings/${bookingId}/status`, statusData)
  },

  /**
   * Confirm booking (push to Rentals United)
   * @param {string} bookingId - The booking ID
   * @returns {Promise<Object>} Confirmed booking data
   */
  confirmBooking: async (bookingId) => {
    return await api.put(`/bookings/${bookingId}/confirm`)
  },

  /**
   * Cancel booking
   * @param {string} bookingId - The booking ID
   * @param {Object} cancellationData - Cancellation details
   * @returns {Promise<Object>} Cancelled booking data
   */
  cancelBooking: async (bookingId, cancellationData) => {
    return await api.put(`/bookings/${bookingId}/cancel`, cancellationData)
  },

  /**
   * Get reservations from Rentals United
   * @param {Object} params - Date range and location parameters
   * @returns {Promise<Object>} RU reservations data
   */
  getRUReservations: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    const endpoint = queryString 
      ? `/bookings/ru/reservations?${queryString}` 
      : `/bookings/ru/reservations`
    return await api.get(endpoint)
  }
}

export default bookingService