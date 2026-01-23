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

  const capabilities = [
    {
      number: '01',
      title: 'Flexible, Smart Check-ins',
      description: 'Arrive when it works for you — not when hotels decide.'
    },
    {
      number: '02',
      title: 'More Space Than Hotels',
      description: 'Full apartments built for living, working, and settling in.'
    },
    {
      number: '03',
      title: 'Designed for Extended Stays',
      description: 'Layouts, services, and comfort optimised for weeks or months.'
    },
    {
      number: '04',
      title: 'Hotel-Grade Service, Always',
      description: 'Professional housekeeping and concierge, consistently delivered.'
    },
    {
      number: '05',
      title: 'Corporate & Relocation Ready',
      description: 'Built for business travellers, teams, and long-term moves.'
    },
    {
      number: '06',
      title: 'Better Value for Longer Stays',
      description: 'Weekly and monthly savings hotels can\'t match.'
    }
  ]

  return (
    <section
      className="pt-8 pb-20 px-8 min-h-screen flex items-center max-md:py-12 max-md:px-4 transition-colors duration-300"
      style={{ backgroundColor: isDarkMode ? '#0f0f0f' : '#FFF7F0' }}
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Left-aligned Header */}
        <div className="mb-12 md:mb-16 text-left">
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
            className={`max-w-3xl text-base md:text-lg transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
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

        {/* Grid Layout for 6 Capability Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((capability, index) => (
            <div
              key={index}
              className="group relative rounded-2xl border-2 p-8 transition-all duration-300 ease-out cursor-pointer overflow-hidden hover:-translate-y-1"
              style={{
                minHeight: '240px',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: isDarkMode ? '#1a1a1a' : '#f5f5f5',
                borderColor: 'transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#C17A4F'
                e.currentTarget.style.boxShadow = '0 12px 44px -22px rgba(193, 122, 79, 0.22)'
                const line = e.currentTarget.querySelector('.bottom-line')
                if (line) line.style.backgroundColor = '#C17A4F'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'transparent'
                e.currentTarget.style.boxShadow = 'none'
                const line = e.currentTarget.querySelector('.bottom-line')
                if (line) line.style.backgroundColor = isDarkMode ? '#333333' : '#d1d1d1'
              }}
            >
              {/* Large background number */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-6 top-6 font-display text-6xl tracking-tight"
                style={{
                  fontFamily: 'Petrona',
                  fontSize: '96px',
                  color: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                  fontWeight: 600,
                  lineHeight: 1
                }}
              >
                {capability.number}
              </span>

              <p
                className="text-xs uppercase tracking-widest"
                style={{
                  color: '#989081',
                  fontFamily: 'Work Sans',
                  letterSpacing: '0.32em'
                }}
              >
                CAPABILITY {capability.number}
              </p>
              
              <h3
                className={`mt-3 font-semibold transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`}
                style={{
                  fontFamily: 'Petrona',
                  lineHeight: '1.3',
                  fontSize: '24px',
                  fontWeight: 600
                }}
              >
                {capability.title}
              </h3>
              
              <p
                className="mt-4 text-sm lg:text-[15px] leading-relaxed"
                style={{
                  color: '#989081',
                  fontFamily: 'Work Sans',
                  lineHeight: '1.6'
                }}
              >
                {capability.description}
              </p>
              
              {/* Horizontal line at bottom */}
              <div 
                aria-hidden="true"
                className="bottom-line absolute left-8 right-8 bottom-8 h-px transition-colors duration-300"
                style={{
                  backgroundColor: isDarkMode ? '#333333' : '#d1d1d1'
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CardStack
