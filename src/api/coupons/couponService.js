import api from '../index';

export const couponService = {
  /**
   * Validate a coupon code
   */
  async validateCoupon(couponData) {
    try {
      const response = await api.post('/coupons/validate', couponData);
      return response.data;
    } catch (error) {
      // For 400 errors, return the error response data instead of throwing
      if (error.response && error.response.status === 400) {
        return error.response.data;
      }
      throw error;
    }
  },

  /**
   * Get available coupons for a user
   */
  async getAvailableCoupons(email, phone) {
    try {
      const response = await api.get('/coupons/available', {
        params: { email, phone }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
