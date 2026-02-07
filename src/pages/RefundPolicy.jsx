import { useTheme } from '../context/ThemeContext'
import HomeHeader from '../components/HomeHeader'
import FooterSimple from '../components/FooterSimple'

const RefundPolicy = () => {
  const { isDarkMode } = useTheme()

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: isDarkMode ? '#0f0f0f' : '#FFF7F0' }}>
      <HomeHeader />
      
      <div className="py-16 px-8 max-md:py-8 max-md:px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header Section - Left Aligned */}
          <p 
            className="text-xs tracking-[0.22em] uppercase mb-4"
            style={{ 
              color: isDarkMode ? '#DE754B' : '#0B8043',
              fontFamily: 'Work Sans'
            }}
          >
            Legal
          </p>
          
          <h1 
            className={`text-3xl md:text-5xl font-semibold tracking-tight mb-8 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
            style={{ fontFamily: 'Petrona' }}
          >
            Refund Policy
          </h1>
          
          <p 
            className={`mb-12 transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
            style={{ fontFamily: 'Work Sans' }}
          >
            Last updated: February 2025
          </p>

          {/* Content Sections - Left Aligned */}
          <div className="space-y-12 max-w-4xl">
            {/* Section 1 */}
            <section>
              <h2 
                className={`text-xl font-medium mb-4 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                style={{ fontFamily: 'Petrona' }}
              >
                1. Overview
              </h2>
              <p 
                className={`leading-relaxed transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                style={{ fontFamily: 'Work Sans' }}
              >
                At Hodo, we understand that plans can change. This refund policy outlines the conditions under which refunds may be issued for bookings made through our platform.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 
                className={`text-xl font-medium mb-4 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                style={{ fontFamily: 'Petrona' }}
              >
                2. Cancellation Windows
              </h2>
              <p 
                className={`leading-relaxed mb-4 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                style={{ fontFamily: 'Work Sans' }}
              >
                Refund eligibility depends on when you cancel relative to your check-in date:
              </p>
              <ul 
                className={`list-disc list-inside leading-relaxed space-y-2 ml-4 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                style={{ fontFamily: 'Work Sans' }}
              >
                <li><strong>More than 7 days before check-in:</strong> Full refund minus processing fees</li>
                <li><strong>3–7 days before check-in:</strong> 50% refund of the total booking amount</li>
                <li><strong>Less than 3 days before check-in:</strong> No refund available</li>
                <li><strong>No-show:</strong> No refund available</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section>
              <h2 
                className={`text-xl font-medium mb-4 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                style={{ fontFamily: 'Petrona' }}
              >
                3. Long-Term Stays
              </h2>
              <p 
                className={`leading-relaxed transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                style={{ fontFamily: 'Work Sans' }}
              >
                For bookings of 30 days or more, special cancellation terms apply. Please contact our support team before booking to understand the specific refund policy for extended stays. Early departure from long-term bookings may result in rate adjustments.
              </p>
            </section>

            {/* Section 4 */}
            <section>
              <h2 
                className={`text-xl font-medium mb-4 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                style={{ fontFamily: 'Petrona' }}
              >
                4. Non-Refundable Rates
              </h2>
              <p 
                className={`leading-relaxed transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                style={{ fontFamily: 'Work Sans' }}
              >
                Some properties offer discounted non-refundable rates. These bookings are clearly marked at the time of reservation and are not eligible for refunds under any circumstances, except where required by law.
              </p>
            </section>

            {/* Section 5 */}
            <section>
              <h2 
                className={`text-xl font-medium mb-4 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                style={{ fontFamily: 'Petrona' }}
              >
                5. Processing Time
              </h2>
              <p 
                className={`leading-relaxed transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                style={{ fontFamily: 'Work Sans' }}
              >
                Approved refunds are processed within 5–10 business days. The time for the refund to appear in your account depends on your payment provider and may take an additional 5–10 business days.
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <h2 
                className={`text-xl font-medium mb-4 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                style={{ fontFamily: 'Petrona' }}
              >
                6. Extenuating Circumstances
              </h2>
              <p 
                className={`leading-relaxed transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                style={{ fontFamily: 'Work Sans' }}
              >
                In cases of documented emergencies, natural disasters, or government-imposed travel restrictions, we may offer full or partial refunds at our discretion. Supporting documentation will be required.
              </p>
            </section>

            {/* Section 7 */}
            <section>
              <h2 
                className={`text-xl font-medium mb-4 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                style={{ fontFamily: 'Petrona' }}
              >
                7. How to Request a Refund
              </h2>
              <p 
                className={`leading-relaxed mb-4 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                style={{ fontFamily: 'Work Sans' }}
              >
                To request a refund, please contact us with:
              </p>
              <ul 
                className={`list-disc list-inside leading-relaxed space-y-2 ml-4 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                style={{ fontFamily: 'Work Sans' }}
              >
                <li>Your booking confirmation number</li>
                <li>The email address used for the booking</li>
                <li>Reason for cancellation</li>
              </ul>
            </section>

            {/* Section 8 */}
            <section>
              <h2 
                className={`text-xl font-medium mb-4 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                style={{ fontFamily: 'Petrona' }}
              >
                8. Contact
              </h2>
              <p 
                className={`leading-relaxed transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                style={{ fontFamily: 'Work Sans' }}
              >
                For refund requests or questions about this policy, please contact us at{' '}
                <a 
                  href="mailto:refunds@hodostays.com" 
                  className="hover:underline transition-colors duration-300"
                  style={{ color: isDarkMode ? '#DE754B' : '#0B8043' }}
                >
                  refunds@hodostays.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>

      <FooterSimple />
    </div>
  )
}

export default RefundPolicy
