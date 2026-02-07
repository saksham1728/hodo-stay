import { useTheme } from '../context/ThemeContext'
import HomeHeader from '../components/HomeHeader'
import FooterSimple from '../components/FooterSimple'

const TermsOfService = () => {
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
            Terms of Service
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
                1. Acceptance of Terms
              </h2>
              <p 
                className={`leading-relaxed transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                style={{ fontFamily: 'Work Sans' }}
              >
                By accessing or using Hodo's services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 
                className={`text-xl font-medium mb-4 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                style={{ fontFamily: 'Petrona' }}
              >
                2. Booking &amp; Reservations
              </h2>
              <p 
                className={`leading-relaxed mb-4 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                style={{ fontFamily: 'Work Sans' }}
              >
                When you make a booking through Hodo, you enter into a direct agreement with the property. You agree to:
              </p>
              <ul 
                className={`list-disc list-inside leading-relaxed space-y-2 ml-4 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                style={{ fontFamily: 'Work Sans' }}
              >
                <li>Provide accurate and complete information</li>
                <li>Pay all applicable charges and fees</li>
                <li>Comply with property rules and policies</li>
                <li>Use the property only for lawful purposes</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section>
              <h2 
                className={`text-xl font-medium mb-4 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                style={{ fontFamily: 'Petrona' }}
              >
                3. Payments
              </h2>
              <p 
                className={`leading-relaxed transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                style={{ fontFamily: 'Work Sans' }}
              >
                Payment is required at the time of booking unless otherwise specified. We accept major credit cards and other payment methods as displayed. All prices are inclusive of applicable taxes unless stated otherwise.
              </p>
            </section>

            {/* Section 4 */}
            <section>
              <h2 
                className={`text-xl font-medium mb-4 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                style={{ fontFamily: 'Petrona' }}
              >
                4. Cancellation Policy
              </h2>
              <p 
                className={`leading-relaxed transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                style={{ fontFamily: 'Work Sans' }}
              >
                Cancellation terms vary by property and rate type. The specific cancellation policy for your booking will be clearly displayed before you confirm. Please review these terms carefully.
              </p>
            </section>

            {/* Section 5 */}
            <section>
              <h2 
                className={`text-xl font-medium mb-4 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                style={{ fontFamily: 'Petrona' }}
              >
                5. Guest Responsibilities
              </h2>
              <p 
                className={`leading-relaxed transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                style={{ fontFamily: 'Work Sans' }}
              >
                You are responsible for maintaining the property in good condition during your stay. Any damage beyond normal wear and tear may result in additional charges. Guests must respect neighbors and adhere to quiet hours.
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <h2 
                className={`text-xl font-medium mb-4 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                style={{ fontFamily: 'Petrona' }}
              >
                6. Limitation of Liability
              </h2>
              <p 
                className={`leading-relaxed transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                style={{ fontFamily: 'Work Sans' }}
              >
                Hodo acts as an intermediary between guests and properties. While we strive to ensure quality and accuracy, we are not liable for issues arising from the property itself. Our liability is limited to the amount paid for the booking.
              </p>
            </section>

            {/* Section 7 */}
            <section>
              <h2 
                className={`text-xl font-medium mb-4 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                style={{ fontFamily: 'Petrona' }}
              >
                7. Intellectual Property
              </h2>
              <p 
                className={`leading-relaxed transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                style={{ fontFamily: 'Work Sans' }}
              >
                All content on Hodo's platform, including text, graphics, logos, and images, is the property of Hodo or its licensors. You may not reproduce, distribute, or create derivative works without our written permission.
              </p>
            </section>

            {/* Section 8 */}
            <section>
              <h2 
                className={`text-xl font-medium mb-4 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                style={{ fontFamily: 'Petrona' }}
              >
                8. Changes to Terms
              </h2>
              <p 
                className={`leading-relaxed transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                style={{ fontFamily: 'Work Sans' }}
              >
                We may update these terms from time to time. Continued use of our services after changes constitutes acceptance of the new terms. We encourage you to review this page periodically.
              </p>
            </section>

            {/* Section 9 */}
            <section>
              <h2 
                className={`text-xl font-medium mb-4 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                style={{ fontFamily: 'Petrona' }}
              >
                9. Contact
              </h2>
              <p 
                className={`leading-relaxed transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                style={{ fontFamily: 'Work Sans' }}
              >
                For questions about these Terms of Service, please contact us at{' '}
                <a 
                  href="mailto:legal@hodostays.com" 
                  className="hover:underline transition-colors duration-300"
                  style={{ color: isDarkMode ? '#DE754B' : '#0B8043' }}
                >
                  legal@hodostays.com
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

export default TermsOfService
