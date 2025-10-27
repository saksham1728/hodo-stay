import { api } from '../index.js'

/**
 * Unit API Service
 * Handles all unit-related API calls (individual apartments/rooms)
 */
export const unitService = {
  /**
   * Get unit details by ID
   * @param {string} unitId - The unit ID
   * @returns {Promise<Object>} Unit details
   */
  getUnitById: async (unitId) => {
    return await api.get(`/units/${unitId}`)
  },

  /**
   * Get unit availability and pricing for specific dates
   * @param {string} unitId - The unit ID
   * @param {Object} params - Date range and guest parameters
   * @returns {Promise<Object>} Availability and pricing data
   */
  getUnitAvailability: async (unitId, params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    const endpoint = queryString 
      ? `/units/${unitId}/availability?${queryString}` 
      : `/units/${unitId}/availability`
    return await api.get(endpoint)
  },

  /**
   * Check availability for multiple units
   * @param {Array} unitIds - Array of unit IDs
   * @param {Object} params - Date range and guest parameters
   * @returns {Promise<Object>} Availability data for multiple units
   */
  checkMultipleUnitsAvailability: async (unitIds, params = {}) => {
    const promises = unitIds.map(unitId => 
      unitService.getUnitAvailability(unitId, params)
    )
    
    try {
      const results = await Promise.allSettled(promises)
      return results.map((result, index) => ({
        unitId: unitIds[index],
        success: result.status === 'fulfilled',
        data: result.status === 'fulfilled' ? result.value : null,
        error: result.status === 'rejected' ? result.reason : null
      }))
    } catch (error) {
      throw new Error(`Failed to check availability for multiple units: ${error.message}`)
    }
  }
}

export default unitService