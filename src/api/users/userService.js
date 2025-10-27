import { api } from '../index.js'

/**
 * User API Service
 * Handles all user-related API calls
 */
export const userService = {
  /**
   * Create or get existing user
   * @param {Object} userData - User information
   * @returns {Promise<Object>} User data
   */
  createOrGetUser: async (userData) => {
    return await api.post('/users', userData)
  },

  /**
   * Get user by ID
   * @param {string} userId - The user ID
   * @returns {Promise<Object>} User details
   */
  getUserById: async (userId) => {
    return await api.get(`/users/${userId}`)
  },

  /**
   * Update user information
   * @param {string} userId - The user ID
   * @param {Object} updateData - Data to update
   * @returns {Promise<Object>} Updated user data
   */
  updateUser: async (userId, updateData) => {
    return await api.put(`/users/${userId}`, updateData)
  }
}

export default userService