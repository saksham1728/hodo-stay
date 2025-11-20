import { api } from '../index';

export const paymentService = {
  /**
   * Create Razorpay order
   * @param {Object} orderData - Order details
   * @returns {Promise<Object>} Order response
   */
  async createOrder(orderData) {
    try {
      const response = await api.post('/payments/create-order', orderData);
      return response;
    } catch (error) {
      console.error('Error creating payment order:', error);
      throw error;
    }
  },

  /**
   * Verify payment and create booking
   * @param {Object} paymentData - Payment verification data
   * @returns {Promise<Object>} Booking response
   */
  async verifyPayment(paymentData) {
    try {
      const response = await api.post('/payments/verify', paymentData);
      return response;
    } catch (error) {
      console.error('Error verifying payment:', error);
      throw error;
    }
  },

  /**
   * Load Razorpay script dynamically
   * @returns {Promise<Boolean>} Whether script loaded successfully
   */
  loadRazorpayScript() {
    return new Promise((resolve) => {
      // Check if script already loaded
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      
      script.onload = () => {
        console.log('✅ Razorpay script loaded');
        resolve(true);
      };
      
      script.onerror = () => {
        console.error('❌ Failed to load Razorpay script');
        resolve(false);
      };

      document.body.appendChild(script);
    });
  },

  /**
   * Open Razorpay payment modal
   * @param {Object} options - Razorpay options
   * @returns {Promise<Object>} Payment response
   */
  async openPaymentModal(options) {
    try {
      // Ensure Razorpay script is loaded
      const scriptLoaded = await this.loadRazorpayScript();
      
      if (!scriptLoaded) {
        throw new Error('Failed to load Razorpay payment gateway');
      }

      return new Promise((resolve, reject) => {
        const razorpayOptions = {
          key: options.key,
          amount: options.amount,
          currency: options.currency,
          name: options.name || 'Hodo Stay',
          description: options.description || 'Booking Payment',
          image: options.image || '/hodo-white-logo.png',
          order_id: options.orderId,
          prefill: {
            name: options.prefill?.name || '',
            email: options.prefill?.email || '',
            contact: options.prefill?.contact || ''
          },
          notes: options.notes || {},
          theme: {
            color: options.themeColor || '#DE754B'
          },
          handler: function (response) {
            console.log('✅ Payment successful:', response);
            resolve(response);
          },
          modal: {
            ondismiss: function() {
              console.log('⚠️ Payment modal closed by user');
              reject(new Error('Payment cancelled by user'));
            }
          }
        };

        const razorpay = new window.Razorpay(razorpayOptions);
        
        razorpay.on('payment.failed', function (response) {
          console.error('❌ Payment failed:', response.error);
          reject(new Error(response.error.description || 'Payment failed'));
        });

        razorpay.open();
      });
    } catch (error) {
      console.error('Error opening payment modal:', error);
      throw error;
    }
  }
};
