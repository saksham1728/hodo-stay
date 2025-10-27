import { useState, useEffect } from 'react'
import { buildingService } from '../api/buildings/buildingService'

/**
 * Custom hook for managing buildings data (property groups)
 * @param {Object} filters - Optional filters for building search
 * @returns {Object} Buildings data, loading state, and error handling
 */
export const useBuildings = (filters = {}) => {
  const [buildings, setBuildings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [pagination, setPagination] = useState(null)

  const fetchBuildings = async (params = {}) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await buildingService.getBuildings({ ...filters, ...params })
      
      if (response.success && response.data) {
        const { buildings, pagination } = response.data
        setBuildings(buildings || [])
        
        if (pagination) {
          setPagination({
            currentPage: pagination.currentPage,
            totalPages: pagination.totalPages,
            totalBuildings: pagination.totalBuildings,
            hasNext: pagination.hasNext,
            hasPrev: pagination.hasPrev
          })
        } else {
          setPagination(null)
        }
      } else {
        setBuildings([])
        setPagination(null)
      }
    } catch (err) {
      console.error('Error fetching buildings:', err)
      setError(err.message || 'Failed to fetch buildings')
      setBuildings([])
    } finally {
      setLoading(false)
    }
  }

  const refetch = (params = {}) => {
    fetchBuildings(params)
  }

  useEffect(() => {
    fetchBuildings()
  }, []) // Only run on mount, filters changes handled by refetch

  return {
    buildings,
    loading,
    error,
    pagination,
    refetch
  }
}

export default useBuildings