import { api } from '../index';

export const pricingService = {
  // Get live price quote for specific dates
  async getPriceQuote(unitId, checkIn, checkOut, guests = 2) {
    try {
      const params = new URLSearchParams({
        checkIn: checkIn,
        checkOut: checkOut,
        guests: guests.toString()
      });

      const response = await api.get(`/pricing/units/${unitId}/quote?${params}`);
      
      return response; // Return the full response, not response.data
    } catch (error) {
      console.error('Error getting price quote:', error);
      throw error;
    }
  },

  // Get availability calendar for a unit
  async getAvailability(unitId, month, year) {
    try {
      const params = new URLSearchParams();
      if (month) params.append('month', month.toString());
      if (year) params.append('year', year.toString());

      const response = await api.get(`/pricing/units/${unitId}/availability?${params}`);
      return response.data;
    } catch (error) {
      console.error('Error getting availability:', error);
      throw error;
    }
  },

  // Helper function to format dates for API
  formatDate(date) {
    if (typeof date === 'string') {
      return date;
    }
    return date.toISOString().split('T')[0];
  },

  // Calculate number of nights between dates
  calculateNights(checkIn, checkOut) {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
};