import { useState, useEffect } from 'react'
import { propertyService } from '../api/propertyService'

/**
 * Custom hook for managing property data
 * @param {Object} filters - Optional filters for property search
 * @returns {Object} Properties data, loading state, and error handling
 */
export const useProperties = (filters = {}) => {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [pagination, setPagination] = useState(null)

  const fetchProperties = async (params = {}) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await propertyService.getProperties({ ...filters, ...params })
      
      // Handle the API response structure
      if (response.success && response.data) {
        const { properties, pagination } = response.data
        setProperties(properties || [])
        
        if (pagination) {
          setPagination({
            total: pagination.totalProperties,
            page: pagination.currentPage,
            totalPages: pagination.totalPages,
            hasNext: pagination.hasNext,
            hasPrev: pagination.hasPrev
          })
        } else {
          setPagination(null)
        }
      } else if (Array.isArray(response)) {
        // Fallback for direct array response
        setProperties(response)
        setPagination(null)
      } else {
        setProperties([])
        setPagination(null)
      }
    } catch (err) {
      console.error('Error fetching properties:', err)
      setError(err.message || 'Failed to fetch properties')
      setProperties([])
    } finally {
      setLoading(false)
    }
  }

  const refetch = (params = {}) => {
    fetchProperties(params)
  }

  useEffect(() => {
    fetchProperties()
  }, []) // Only run on mount, filters changes handled by refetch

  return {
    properties,
    loading,
    error,
    pagination,
    refetch
  }
}

export default useProperties