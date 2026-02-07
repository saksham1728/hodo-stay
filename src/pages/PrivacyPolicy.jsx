import { useTheme } from '../context/ThemeContext'
import HomeHeader from '../components/HomeHeader'
import FooterSimple from '../components/FooterSimple'

const PrivacyPolicy = () => {
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
            Privacy Policy
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
                1. Information We Collect
              </h2>
              <p 
                className={`leading-relaxed mb-4 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                style={{ fontFamily: 'Work Sans' }}
              >
                We collect information you provide directly to us, such as when you create an account, make a booking, or contact us for support. This may include:
              </p>
              <ul 
                className={`list-disc list-inside leading-relaxed space-y-2 ml-4 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                style={{ fontFamily: 'Work Sans' }}
              >
                <li>Name and contact information</li>
                <li>Payment and billing details</li>
                <li>Booking preferences and history</li>
                <li>Communications with our team</li>
              </ul>
            </section>

            {/* Section 2 */}
            <section>
              <h2 
                className={`text-xl font-medium mb-4 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                style={{ fontFamily: 'Petrona' }}
              >
                2. How We Use Your Information
              </h2>
              <p 
                className={`leading-relaxed transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                style={{ fontFamily: 'Work Sans' }}
              >
                We use the information we collect to provide, maintain, and improve our services, process bookings and payments, communicate with you about your stays, and personalize your experience with Hodo.
              </p>
            </section>

            {/* Section 3 */}
            <section>
              <h2 
                className={`text-xl font-medium mb-4 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                style={{ fontFamily: 'Petrona' }}
              >
                3. Information Sharing
              </h2>
              <p 
                className={`leading-relaxed transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                style={{ fontFamily: 'Work Sans' }}
              >
                We do not sell your personal information. We may share your information with property partners to fulfill your bookings, service providers who assist our operations, and when required by law or to protect our rights.
              </p>
            </section>

            {/* Section 4 */}
            <section>
              <h2 
                className={`text-xl font-medium mb-4 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                style={{ fontFamily: 'Petrona' }}
              >
                4. Data Security
              </h2>
              <p 
                className={`leading-relaxed transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                style={{ fontFamily: 'Work Sans' }}
              >
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            {/* Section 5 */}
            <section>
              <h2 
                className={`text-xl font-medium mb-4 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                style={{ fontFamily: 'Petrona' }}
              >
                5. Your Rights
              </h2>
              <p 
                className={`leading-relaxed transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                style={{ fontFamily: 'Work Sans' }}
              >
                You have the right to access, correct, or delete your personal information. You may also object to or restrict certain processing of your data. Contact us to exercise these rights.
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <h2 
                className={`text-xl font-medium mb-4 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                style={{ fontFamily: 'Petrona' }}
              >
                6. Cookies
              </h2>
              <p 
                className={`leading-relaxed transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                style={{ fontFamily: 'Work Sans' }}
              >
                We use cookies and similar technologies to enhance your experience, analyze usage patterns, and deliver personalized content. You can manage cookie preferences through your browser settings.
              </p>
            </section>

            {/* Section 7 */}
            <section>
              <h2 
                className={`text-xl font-medium mb-4 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                style={{ fontFamily: 'Petrona' }}
              >
                7. Contact Us
              </h2>
              <p 
                className={`leading-relaxed transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                style={{ fontFamily: 'Work Sans' }}
              >
                If you have questions about this Privacy Policy or our data practices, please contact us at{' '}
                <a 
                  href="mailto:privacy@hodostays.com" 
                  className="hover:underline transition-colors duration-300"
                  style={{ color: isDarkMode ? '#DE754B' : '#0B8043' }}
                >
                  privacy@hodostays.com
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

export default PrivacyPolicy
