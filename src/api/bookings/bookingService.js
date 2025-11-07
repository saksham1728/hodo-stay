import { api } from '../index.js'

/**
 * Booking API Service
 * Handles all booking-related API calls
 */
export const bookingService = {
  /**
   * Create payment order (mock for now)
   * @param {Object} orderData - Order details
   * @returns {Promise<Object>} Order data
   */
  createOrder: async (orderData) => {
    return await api.post('/payments/create-order', orderData)
  },

  /**
   * Verify payment and create booking (mock for now)
   * @param {Object} paymentData - Payment verification data
   * @returns {Promise<Object>} Booking confirmation
   */
  verifyPayment: async (paymentData) => {
    return await api.post('/payments/verify', paymentData)
  },

  /**
   * Create booking directly (for testing without payment)
   * @param {Object} bookingData - Booking details
   * @returns {Promise<Object>} Booking confirmation
   */
  createBooking: async (bookingData) => {
    // For now, we'll mock the payment and create booking directly
    const mockPaymentData = {
      razorpay_order_id: `order_mock_${Date.now()}`,
      razorpay_payment_id: `pay_mock_${Date.now()}`,
      razorpay_signature: 'mock_signature',
      bookingData: bookingData
    }
    return await api.post('/payments/verify', mockPaymentData)
  },

  /**
   * Get booking by reference
   * @param {string} bookingReference - Booking reference number
   * @returns {Promise<Object>} Booking details
   */
  getBookingByReference: async (bookingReference) => {
    return await api.get(`/bookings/reference/${bookingReference}`)
  },

  /**
   * Get bookings by email
   * @param {string} email - Guest email
   * @returns {Promise<Object>} List of bookings
   */
  getBookingsByEmail: async (email) => {
    return await api.get(`/bookings/email?email=${encodeURIComponent(email)}`)
  },

  /**
   * Cancel booking
   * @param {string} bookingReference - Booking reference number
   * @param {Object} cancellationData - Cancellation details
   * @returns {Promise<Object>} Cancellation confirmation
   */
  cancelBooking: async (bookingReference, cancellationData) => {
    return await api.post(`/bookings/${bookingReference}/cancel`, cancellationData)
  }
}

export default bookingService
