import { api } from '../index';

export const buildingService = {
  /**
   * Get all buildings (with pagination)
   */
  async getBuildings(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/buildings?${queryString}` : '/buildings';
    const response = await api.get(endpoint);
    return response;
  },

  /**
   * Get all buildings (alias)
   */
  async getAllBuildings() {
    const response = await api.get('/buildings');
    return response.data;
  },

  /**
   * Get building by ID with all units
   */
  async getBuildingById(buildingId) {
    const response = await api.get(`/buildings/${buildingId}`);
    return response; // Return full response with success flag
  },

  /**
   * Get building with unit types grouped
   */
  async getBuildingWithUnitTypes(buildingId) {
    const response = await api.get(`/buildings/${buildingId}/unit-types`);
    return response; // Return full response with success flag
  },

  /**
   * Get cheapest available unit for a unit type
   */
  async getBestAvailableUnit({ unitType, buildingId, checkIn, checkOut, guests }) {
    const response = await api.post('/buildings/best-available', {
      unitType,
      buildingId,
      checkIn,
      checkOut,
      guests
    });
    return response; // Return full response with success flag
  }
};
