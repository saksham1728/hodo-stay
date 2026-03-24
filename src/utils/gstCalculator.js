/**
 * Frontend GST Calculator Utility
 * Mirrors backend GST calculation logic
 * 
 * GST Rules:
 * - Per night price <= 7500: 5% GST
 * - Per night price > 7500: 18% GST
 * 
 * GST is calculated on the final price (after coupon discount if applied)
 */

const GST_THRESHOLD = 7500;
const GST_RATE_LOW = 0.05;  // 5%
const GST_RATE_HIGH = 0.18; // 18%

/**
 * Calculate GST for a booking
 * @param {number} totalPrice - Total price before GST (after coupon if applied)
 * @param {number} nights - Number of nights
 * @returns {Object} GST calculation details
 */
export function calculateGST(totalPrice, nights) {
  // Validate inputs
  if (!totalPrice || totalPrice <= 0) {
    throw new Error('Total price must be greater than zero');
  }
  
  if (!nights || nights <= 0) {
    throw new Error('Number of nights must be greater than zero');
  }

  // Calculate per night price
  const pricePerNight = totalPrice / nights;

  // Determine GST rate based on per night price
  const gstRate = pricePerNight <= GST_THRESHOLD ? GST_RATE_LOW : GST_RATE_HIGH;
  const gstPercentage = gstRate * 100;

  // Calculate GST amount
  const gstAmount = Math.round(totalPrice * gstRate * 100) / 100;

  // Calculate final price with GST
  const finalPriceWithGST = Math.round((totalPrice + gstAmount) * 100) / 100;

  return {
    priceBeforeGST: Math.round(totalPrice * 100) / 100,
    pricePerNight: Math.round(pricePerNight * 100) / 100,
    gstRate: gstPercentage,
    gstAmount: gstAmount,
    finalPrice: finalPriceWithGST,
    breakdown: {
      basePrice: Math.round(totalPrice * 100) / 100,
      gst: gstAmount,
      total: finalPriceWithGST
    }
  };
}

/**
 * Get GST details for display purposes
 * @param {number} totalPrice - Total price before GST
 * @param {number} nights - Number of nights
 * @returns {Object} GST details for display
 */
export function getGSTDetails(totalPrice, nights) {
  try {
    const calculation = calculateGST(totalPrice, nights);
    return {
      success: true,
      data: calculation
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Format currency for display
 * @param {number} amount - Amount to format
 * @returns {string} Formatted currency string
 */
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(amount);
}

export const GST_CONFIG = {
  THRESHOLD: GST_THRESHOLD,
  RATE_LOW: GST_RATE_LOW,
  RATE_HIGH: GST_RATE_HIGH
};
