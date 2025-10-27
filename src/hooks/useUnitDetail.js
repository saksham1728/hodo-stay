import { useState, useEffect } from 'react'
import { unitService } from '../api/units/unitService'

/**
 * Custom hook for managing single unit detail data
 * @param {string} unitId - The unit ID to fetch
 * @returns {Object} Unit detail data, loading state, and error handling
 */
export const useUnitDetail = (unitId) => {
  const [unit, setUnit] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchUnitDetail = async (id) => {
    if (!id) {
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)
      
      const response = await unitService.getUnitById(id)
      
      if (response.success && response.data && response.data.unit) {
        setUnit(response.data.unit)
      } else {
        setUnit(null)
        setError('Unit not found')
      }
    } catch (err) {
      console.error('Error fetching unit details:', err)
      setError(err.message || 'Failed to fetch unit details')
      setUnit(null)
    } finally {
      setLoading(false)
    }
  }

  const refetch = () => {
    fetchUnitDetail(unitId)
  }

  useEffect(() => {
    fetchUnitDetail(unitId)
  }, [unitId])

  return {
    unit,
    loading,
    error,
    refetch
  }
}

export default useUnitDetail