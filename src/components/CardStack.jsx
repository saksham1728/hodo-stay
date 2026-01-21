import { useState, useEffect, useRef } from 'react'
import { useTheme } from '../context/ThemeContext'

const CardStack = () => {
  const [isMobile, setIsMobile] = useState(false)
  const { isDarkMode } = useTheme()

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <section
      className="pt-8 pb-20 px-8 min-h-screen flex items-center max-md:py-12 max-md:px-4 transition-colors duration-300"
      style={{ backgroundColor: isDarkMode ? '#0f0f0f' : '#FFF7F0' }}
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Centered Header - Desktop center, Mobile left */}
        <div className="mb-12 md:mb-16 text-left md:text-center">
          <p 
            className="mb-2 text-sm md:text-base font-medium tracking-wider uppercase"
            style={{ 
              color: '#DE754B',
              fontFamily: 'Work Sans'
            }}
          >
            Flexible Stays
          </p>
          <h2
            className={`mb-4 text-3xl md:text-5xl transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-black'}`}
            style={{
              fontFamily: 'Petrona',
              fontWeight: 400,
              fontSize: isMobile ? '36px' : '48px',
              lineHeight: '150%',
              letterSpacing: '-2.2%'
            }}
          >
            Built for Longer, Smarter Stays
          </h2>
          <p
            className={`md:mx-auto max-w-3xl text-base md:text-lg transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
            style={{
              fontFamily: 'Work Sans',
              fontWeight: 400,
              lineHeight: '150%',
              letterSpacing: '-0.5%'
            }}
          >
            Hotels are built for nights. We're built for weeks and months.
          </p>
        </div>

        {/* Grid Layout for USPs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* USP Card 1 */}
          <div className={`p-6 rounded-lg transition-colors duration-300 ${isDarkMode ? 'bg-[#1a1a1a]' : 'bg-white'}`}>
            <h3 
              className={`text-xl md:text-2xl font-medium mb-2 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
              style={{ fontFamily: 'Petrona', lineHeight: '130%' }}
            >
              Flexible & Smart Check-ins
            </h3>
          </div>

          {/* USP Card 2 */}
          <div className={`p-6 rounded-lg transition-colors duration-300 ${isDarkMode ? 'bg-[#1a1a1a]' : 'bg-white'}`}>
            <h3 
              className={`text-xl md:text-2xl font-medium mb-2 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
              style={{ fontFamily: 'Petrona', lineHeight: '130%' }}
            >
              More Space Than Hotels
            </h3>
          </div>

          {/* USP Card 3 */}
          <div className={`p-6 rounded-lg transition-colors duration-300 ${isDarkMode ? 'bg-[#1a1a1a]' : 'bg-white'}`}>
            <h3 
              className={`text-xl md:text-2xl font-medium mb-2 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
              style={{ fontFamily: 'Petrona', lineHeight: '130%' }}
            >
              Designed for Extended Stays
            </h3>
          </div>

          {/* USP Card 4 */}
          <div className={`p-6 rounded-lg transition-colors duration-300 ${isDarkMode ? 'bg-[#1a1a1a]' : 'bg-white'}`}>
            <h3 
              className={`text-xl md:text-2xl font-medium mb-2 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
              style={{ fontFamily: 'Petrona', lineHeight: '130%' }}
            >
              Hotel-Grade Housekeeping & Concierge
            </h3>
          </div>

          {/* USP Card 5 */}
          <div className={`p-6 rounded-lg transition-colors duration-300 ${isDarkMode ? 'bg-[#1a1a1a]' : 'bg-white'}`}>
            <h3 
              className={`text-xl md:text-2xl font-medium mb-2 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
              style={{ fontFamily: 'Petrona', lineHeight: '130%' }}
            >
              Consistent Experience Across Properties
            </h3>
          </div>

          {/* USP Card 6 */}
          <div className={`p-6 rounded-lg transition-colors duration-300 ${isDarkMode ? 'bg-[#1a1a1a]' : 'bg-white'}`}>
            <h3 
              className={`text-xl md:text-2xl font-medium mb-2 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
              style={{ fontFamily: 'Petrona', lineHeight: '130%' }}
            >
              Corporate & Relocation Friendly
            </h3>
          </div>

          {/* USP Card 7 */}
          <div className={`p-6 rounded-lg transition-colors duration-300 ${isDarkMode ? 'bg-[#1a1a1a]' : 'bg-white'}`}>
            <h3 
              className={`text-xl md:text-2xl font-medium mb-2 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
              style={{ fontFamily: 'Petrona', lineHeight: '130%' }}
            >
              Weekly & Monthly Savings
            </h3>
          </div>

          {/* USP Card 8 */}
          <div className={`p-6 rounded-lg transition-colors duration-300 ${isDarkMode ? 'bg-[#1a1a1a]' : 'bg-white'}`}>
            <h3 
              className={`text-xl md:text-2xl font-medium mb-2 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
              style={{ fontFamily: 'Petrona', lineHeight: '130%' }}
            >
              24-7 Guest Support
            </h3>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CardStack
