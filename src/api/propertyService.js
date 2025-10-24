import { api } from './index.js'

/**
 * Property API Service
 * Handles all property-related API calls
 */
export const propertyService = {
    /**
     * Get all properties with optional filters
     * @param {Object} params - Query parameters for filtering
     * @returns {Promise<Object>} Properties data with pagination info
     */
    getProperties: async (params = {}) => {
        const queryString = new URLSearchParams(params).toString()
        const endpoint = queryString ? `/properties?${queryString}` : '/properties'
        return await api.get(endpoint)
    },

    /**
     * Get a single property by ID
     * @param {string} propertyId - The property ID
     * @returns {Promise<Object>} Property details
     */
    getPropertyById: async (propertyId) => {
        return await api.get(`/properties/${propertyId}`)
    },

    /**
     * Get property availability
     * @param {string} propertyId - The property ID
     * @param {Object} params - Date range and other parameters
     * @returns {Promise<Object>} Availability data
     */
    getPropertyAvailability: async (propertyId, params = {}) => {
        const queryString = new URLSearchParams(params).toString()
        const endpoint = queryString
            ? `/properties/${propertyId}/availability?${queryString}`
            : `/properties/${propertyId}/availability`
        return await api.get(endpoint)
    },

    /**
     * Get property quote
     * @param {string} propertyId - The property ID
     * @param {Object} quoteData - Quote request data (dates, guests, etc.)
     * @returns {Promise<Object>} Quote information
     */
    getPropertyQuote: async (propertyId, quoteData) => {
        return await api.post(`/properties/${propertyId}/quote`, quoteData)
    },

    /**
     * Search properties
     * @param {Object} searchParams - Search criteria
     * @returns {Promise<Object>} Search results
     */
    searchProperties: async (searchParams) => {
        return await api.post('/properties/search', searchParams)
    }
}

export default propertyService