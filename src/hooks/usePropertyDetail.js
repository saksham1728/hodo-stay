import { useState, useEffect } from 'react'
import { propertyService } from '../api/propertyService'

/**
 * Custom hook for managing single property detail data
 * @param {string} propertyId - The property ID to fetch
 * @returns {Object} Property detail data, loading state, and error handling
 */
export const usePropertyDetail = (propertyId) => {
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchPropertyDetail = async (id) => {
    if (!id) {
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)
      
      const response = await propertyService.getPropertyById(id)
      
      // Handle the API response structure
      if (response.success && response.data && response.data.property) {
        setProperty(response.data.property)
      } else if (response.success && response.data) {
        setProperty(response.data)
      } else if (response._id || response.id) {
        // Direct property object response
        setProperty(response)
      } else {
        setProperty(null)
        setError('Property not found')
      }
    } catch (err) {
      console.error('Error fetching property details:', err)
      setError(err.message || 'Failed to fetch property details')
      setProperty(null)
    } finally {
      setLoading(false)
    }
  }

  const refetch = () => {
    fetchPropertyDetail(propertyId)
  }

  useEffect(() => {
    fetchPropertyDetail(propertyId)
  }, [propertyId])

  return {
    property,
    loading,
    error,
    refetch
  }
}

export default usePropertyDetail