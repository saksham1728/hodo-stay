import { api } from '../index.js'

/**
 * Building API Service
 * Handles all building-related API calls (property groups)
 */
export const buildingService = {
  /**
   * Get all buildings (property groups) with optional filters
   * @param {Object} params - Query parameters for filtering
   * @returns {Promise<Object>} Buildings data with pagination info
   */
  getBuildings: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    const endpoint = queryString ? `/buildings?${queryString}` : '/buildings'
    return await api.get(endpoint)
  },

  /**
   * Get a single building by ID with all its units
   * @param {string} buildingId - The building ID
   * @returns {Promise<Object>} Building details with units
   */
  getBuildingById: async (buildingId) => {
    return await api.get(`/buildings/${buildingId}`)
  },

  /**
   * Search buildings by location
   * @param {Object} searchParams - Search criteria
   * @returns {Promise<Object>} Search results
   */
  searchBuildings: async (searchParams) => {
    const queryString = new URLSearchParams(searchParams).toString()
    return await api.get(`/buildings?${queryString}`)
  }
}

export default buildingService