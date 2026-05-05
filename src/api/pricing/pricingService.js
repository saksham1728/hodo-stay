import { api } from '../index';

export const pricingService = {
  // Get cached price quote for specific dates (NEW - uses cache)
  async getPriceQuote(unitId, checkIn, checkOut, guests = 2) {
    try {
      const params = new URLSearchParams({
        checkIn: this.formatDate(checkIn),
        checkOut: this.formatDate(checkOut)
      });

      const response = await api.get(`/pricing/unit/${unitId}?${params}`);
      
      // api.get() returns response.data directly
      // API response: { success: true, data: { unitId, pricing: {...}, ... } }
      if (response && response.success && response.data) {
        const cacheData = response.data;
        
        return {
          success: true,
          data: {
            quote: {
              unitId: cacheData.unitId,
              available: cacheData.available,
              checkIn: cacheData.checkIn,
              checkOut: cacheData.checkOut,
              nights: cacheData.pricing.nights,
              guests: guests,
              pricing: {
                totalPrice: cacheData.pricing.totalPrice,
                pricePerNight: cacheData.pricing.pricePerNight,
                currency: cacheData.pricing.currency,
                breakdown: {
                  basePrice: cacheData.pricing.pricePerNight,
                  taxes: 0,
                  fees: 0
                },
                dailyBreakdown: cacheData.pricing.dailyBreakdown
              },
              propertyDetails: {
                name: cacheData.name,
                maxGuests: guests,
                standardGuests: guests
              }
            }
          }
        };
      }
      
      return response;
    } catch (error) {
      console.error('Error getting price quote:', error);
      throw error;
    }
  },

  // Check availability before payment (final check)
  async checkAvailability(unitId, checkIn, checkOut) {
    try {
      const response = await api.post('/pricing/check-availability', {
        unitId,
        checkIn: this.formatDate(checkIn),
        checkOut: this.formatDate(checkOut)
      });
      return response;
    } catch (error) {
      console.error('Error checking availability:', error);
      throw error;
    }
  },

  // Check real-time availability from Rentals United (before checkout)
  async checkRealtimeAvailability(unitId, checkIn, checkOut) {
    try {
      const response = await api.post('/pricing/realtime-availability', {
        unitId,
        checkIn: this.formatDate(checkIn),
        checkOut: this.formatDate(checkOut)
      });
      return response;
    } catch (error) {
      console.error('Error checking real-time availability:', error);
      throw error;
    }
  },

  // Search available units with cached pricing (NEW)
  async searchAvailableUnits(checkIn, checkOut, filters = {}) {
    try {
      const params = new URLSearchParams({
        checkIn: this.formatDate(checkIn),
        checkOut: this.formatDate(checkOut)
      });

      if (filters.buildingId) params.append('buildingId', filters.buildingId);
      if (filters.roomType) params.append('roomType', filters.roomType);

      const response = await api.get(`/pricing/search?${params}`);
      return response.data;
    } catch (error) {
      console.error('Error searching available units:', error);
      throw error;
    }
  },

  // Get availability calendar for a unit (uses cache)
  async getAvailability(unitId, month, year) {
    try {
      // Calculate date range for the month
      const targetDate = new Date();
      if (month && year) {
        targetDate.setMonth(parseInt(month) - 1);
        targetDate.setFullYear(parseInt(year));
      } else {
        targetDate.setMonth(targetDate.getMonth() + 1);
      }

      const firstDay = new Date(targetDate.getFullYear(), targetDate.getMonth(), 1);
      const lastDay = new Date(targetDate.getFullYear(), targetDate.getMonth() + 1, 0);

      // Use cache-based endpoint
      const params = new URLSearchParams({
        checkIn: this.formatDate(firstDay),
        checkOut: this.formatDate(lastDay)
      });

      const response = await api.get(`/pricing/unit/${unitId}?${params}`);
      
      if (response.data && response.data.success) {
        const cacheData = response.data.data;
        
        return {
          success: true,
          data: {
            availability: {
              unitId: cacheData.unitId,
              month: targetDate.getMonth() + 1,
              year: targetDate.getFullYear(),
              available: cacheData.available,
              dailyAvailability: cacheData.pricing.dailyBreakdown
            }
          }
        };
      }
      
      return response.data;
    } catch (error) {
      console.error('Error getting availability:', error);
      throw error;
    }
  },

  // Get sync status (NEW)
  async getSyncStatus() {
    try {
      const response = await api.get('/pricing/sync-status');
      return response.data;
    } catch (error) {
      console.error('Error getting sync status:', error);
      throw error;
    }
  },

  // Trigger manual sync (admin only)
  async triggerSync() {
    try {
      const response = await api.post('/pricing/sync');
      return response.data;
    } catch (error) {
      console.error('Error triggering sync:', error);
      throw error;
    }
  },

  // Helper function to format dates for API
  formatDate(date) {
    if (typeof date === 'string') {
      // If already in YYYY-MM-DD format, return as is
      if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return date;
      }
      date = new Date(date);
    }
    
    if (date instanceof Date && !isNaN(date)) {
      return date.toISOString().split('T')[0];
    }
    
    return date;
  },

  // Calculate number of nights between dates
  calculateNights(checkIn, checkOut) {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
};