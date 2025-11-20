import { useState, useEffect } from 'react'
import { buildingService } from '../api/buildings/buildingService'

/**
 * Custom hook for managing single building detail data with units
 * @param {string} buildingId - The building ID to fetch
 * @returns {Object} Building detail data, loading state, and error handling
 */
export const useBuildingDetail = (buildingId) => {
  const [building, setBuilding] = useState(null)
  const [units, setUnits] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchBuildingDetail = async (id) => {
    if (!id) {
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)
      
      const response = await buildingService.getBuildingById(id)
      
      if (response.success && response.data) {
        // API returns { success: true, data: { building: {...}, units: [...] } }
        setBuilding(response.data.building)
        setUnits(response.data.units || [])
      } else {
        setBuilding(null)
        setUnits([])
        setError('Building not found')
      }
    } catch (err) {
      console.error('Error fetching building details:', err)
      setError(err.message || 'Failed to fetch building details')
      setBuilding(null)
      setUnits([])
    } finally {
      setLoading(false)
    }
  }

  const refetch = () => {
    fetchBuildingDetail(buildingId)
  }

  useEffect(() => {
    fetchBuildingDetail(buildingId)
  }, [buildingId])

  return {
    building,
    units,
    loading,
    error,
    refetch
  }
}

export default useBuildingDetail