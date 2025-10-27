import { useState, useCallback } from 'react'
import { unitService } from '../api/units/unitService'

/**
 * Custom hook for checking unit availability and pricing
 * @param {string} unitId - The unit ID to check
 * @returns {Object} Availability data, loading state, and check function
 */
export const useUnitAvailability = (unitId) => {
  const [availability, setAvailability] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const checkAvailability = useCallback(async (params = {}) => {
    if (!unitId) {
      setError('Unit ID is required')
      return
    }

    try {
      setLoading(true)
      setError(null)
      
      const response = await unitService.getUnitAvailability(unitId, params)
      
      if (response.success && response.data) {
        setAvailability(response.data)
      } else {
        setAvailability(null)
        setError('No availability data found')
      }
    } catch (err) {
      console.error('Error checking availability:', err)
      setError(err.message || 'Failed to check availability')
      setAvailability(null)
    } finally {
      setLoading(false)
    }
  }, [unitId])

  const clearAvailability = () => {
    setAvailability(null)
    setError(null)
  }

  return {
    availability,
    loading,
    error,
    checkAvailability,
    clearAvailability
  }
}

export default useUnitAvailability