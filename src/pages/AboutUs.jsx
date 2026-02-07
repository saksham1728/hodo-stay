import { useTheme } from '../context/ThemeContext'
import HomeHeader from '../components/HomeHeader'
import FooterSimple from '../components/FooterSimple'

const AboutUs = () => {
  const { isDarkMode } = useTheme()

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: isDarkMode ? '#0f0f0f' : '#FFF7F0' }}>
      <HomeHeader />
      
      <main className="pt-32 pb-20 max-md:pt-24 max-md:pb-12">
        {/* Hero Section */}
        <section className="px-8 mb-24 max-md:px-4 max-md:mb-16">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-4xl">
              <p 
                className="text-xs tracking-[0.22em] uppercase mb-4"
                style={{ 
                  color: isDarkMode ? '#DE754B' : '#0B8043',
                  fontFamily: 'Work Sans'
                }}
              >
                Our Story
              </p>
              <h1 
                className={`text-4xl md:text-6xl font-semibold tracking-tight mb-8 leading-[1.1] transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                style={{ fontFamily: 'Petrona' }}
              >
                Homes that feel like homes,<br />
                <span className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  function like hotels.
                </span>
              </h1>
              <p 
                className={`text-lg md:text-xl leading-relaxed max-w-2xl transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                style={{ fontFamily: 'Work Sans' }}
              >
                Hodo was born from a simple frustration: hotels feel temporary, and rentals feel inconsistent. We believed there had to be a better way for modern travelers to stay.
              </p>
            </div>
          </div>
        </section>

        {/* The In-Between Stay Section */}
        <section className="px-8 mb-24 max-md:px-4 max-md:mb-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-start max-md:gap-10">
              <div>
                <h2 
                  className={`text-2xl md:text-3xl font-semibold tracking-tight mb-6 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                  style={{ fontFamily: 'Petrona' }}
                >
                  The in-between stay, solved.
                </h2>
                <div className={`space-y-4 leading-relaxed transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} style={{ fontFamily: 'Work Sans' }}>
                  <p>Business trips that stretch into weeks. Relocations that need a landing pad. Projects in new cities. Life doesn't fit into neat 2-night hotel stays anymore.</p>
                  <p>Traditional hotels charge premium rates for cramped rooms. Vacation rentals offer space but inconsistent quality. Neither understands what modern professionals actually need.</p>
                  <p>We built Hodo to fill that gap—aparthotels designed specifically for stays longer than a weekend, with the service standards of a hotel and the comfort of a real home.</p>
                </div>
              </div>
              <div 
                className="rounded-lg p-8 md:p-10 border transition-colors duration-300"
                style={{ 
                  backgroundColor: isDarkMode ? 'rgba(26, 26, 26, 0.4)' : 'rgba(250, 242, 232, 0.4)',
                  borderColor: isDarkMode ? 'rgba(51, 51, 51, 0.3)' : 'rgba(229, 231, 235, 0.3)'
                }}
              >
                <p 
                  className="text-xs tracking-[0.22em] uppercase mb-6"
                  style={{ 
                    color: isDarkMode ? '#DE754B' : '#0B8043',
                    fontFamily: 'Work Sans'
                  }}
                >
                  Our Promise
                </p>
                <blockquote 
                  className={`text-xl md:text-2xl font-medium leading-relaxed transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                  style={{ fontFamily: 'Petrona' }}
                >
                  "Every Hodo stay should feel like coming home to a place you've never been—familiar, comfortable, and effortlessly functional."
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* Who We Serve Section */}
        <section className="px-8 mb-24 max-md:px-4 max-md:mb-16">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl">
              <p 
                className="text-xs tracking-[0.22em] uppercase mb-4"
                style={{ 
                  color: isDarkMode ? '#DE754B' : '#0B8043',
                  fontFamily: 'Work Sans'
                }}
              >
                Who We Serve
              </p>
              <h2 
                className={`text-2xl md:text-3xl font-semibold tracking-tight mb-8 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                style={{ fontFamily: 'Petrona' }}
              >
                Built for the modern professional.
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { title: 'Business Travelers', desc: 'Extended projects and client visits that need more than a hotel room.' },
                  { title: 'Digital Nomads', desc: 'Work-ready spaces with reliable Wi-Fi and comfortable setups.' },
                  { title: 'Relocators', desc: 'A comfortable base while finding your permanent home.' },
                  { title: 'Corporate Teams', desc: 'Consistent quality for teams traveling together.' }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="border-l-2 pl-4 transition-colors duration-300"
                    style={{ borderColor: isDarkMode ? 'rgba(222, 117, 75, 0.5)' : 'rgba(11, 128, 67, 0.5)' }}
                  >
                    <h3 
                      className={`font-medium mb-1 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                      style={{ fontFamily: 'Petrona' }}
                    >
                      {item.title}
                    </h3>
                    <p 
                      className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                      style={{ fontFamily: 'Work Sans' }}
                    >
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Principles Section */}
        <section 
          className="border-y py-20 mb-24 max-md:py-12 max-md:mb-16 transition-colors duration-300"
          style={{ 
            backgroundColor: isDarkMode ? 'rgba(26, 26, 26, 0.3)' : 'rgba(250, 242, 232, 0.3)',
            borderColor: isDarkMode ? 'rgba(51, 51, 51, 0.3)' : 'rgba(229, 231, 235, 0.3)'
          }}
        >
          <div className="px-8 max-md:px-4">
            <div className="max-w-7xl mx-auto">
              <div className="max-w-3xl mb-12">
                <p 
                  className="text-xs tracking-[0.22em] uppercase mb-4"
                  style={{ 
                    color: isDarkMode ? '#DE754B' : '#0B8043',
                    fontFamily: 'Work Sans'
                  }}
                >
                  What Drives Us
                </p>
                <h2 
                  className={`text-2xl md:text-3xl font-semibold tracking-tight transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                  style={{ fontFamily: 'Petrona' }}
                >
                  The principles behind every stay.
                </h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { num: '01', title: 'Flexibility First', desc: 'We design for real life. Plans change, trips extend, projects evolve. Our spaces adapt with you.' },
                  { num: '02', title: 'Space to Live', desc: 'More than a room—full apartments with kitchens, workspaces, and room to breathe.' },
                  { num: '03', title: 'Consistent Quality', desc: 'Every Hodo property meets our standards. No surprises, just reliable comfort.' },
                  { num: '04', title: 'Service, Not Servitude', desc: 'Professional support when you need it, privacy when you don\'t.' },
                  { num: '05', title: 'Urban Convenience', desc: 'Located in the heart of cities, close to work, life, and everything in between.' },
                  { num: '06', title: 'Fair Value', desc: 'Transparent pricing that rewards longer stays. No hidden fees, no gimmicks.' }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="p-8 relative group transition-all duration-300 rounded-lg"
                    style={{ 
                      backgroundColor: isDarkMode ? '#0f0f0f' : '#ffffff',
                      cursor: 'default'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(26, 26, 26, 0.5)' : 'rgba(250, 242, 232, 0.5)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = isDarkMode ? '#0f0f0f' : '#ffffff'
                    }}
                  >
                    <span 
                      className="absolute top-6 right-6 text-5xl font-bold transition-colors duration-300"
                      style={{ 
                        color: isDarkMode ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)',
                        fontFamily: 'Petrona'
                      }}
                    >
                      {item.num}
                    </span>
                    <h3 
                      className={`font-medium mb-3 relative transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                      style={{ fontFamily: 'Petrona' }}
                    >
                      {item.title}
                    </h3>
                    <p 
                      className={`text-sm leading-relaxed relative transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                      style={{ fontFamily: 'Work Sans' }}
                    >
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Looking Ahead Section */}
        <section className="px-8 mb-24 max-md:px-4 max-md:mb-16">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl">
              <p 
                className="text-xs tracking-[0.22em] uppercase mb-4"
                style={{ 
                  color: isDarkMode ? '#DE754B' : '#0B8043',
                  fontFamily: 'Work Sans'
                }}
              >
                Looking Ahead
              </p>
              <h2 
                className={`text-2xl md:text-3xl font-semibold tracking-tight mb-6 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                style={{ fontFamily: 'Petrona' }}
              >
                Growing with purpose.
              </h2>
              <p 
                className={`leading-relaxed mb-6 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                style={{ fontFamily: 'Work Sans' }}
              >
                We're expanding thoughtfully across India's major urban centers, bringing the Hodo experience to more cities and more travelers. Each new property meets the same exacting standards—because consistency is the foundation of trust.
              </p>
              <p 
                className={`leading-relaxed transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                style={{ fontFamily: 'Work Sans' }}
              >
                Our goal isn't to be everywhere. It's to be excellent wherever we are.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-8 max-md:px-4">
          <div className="max-w-7xl mx-auto">
            <div 
              className="border rounded-lg p-10 md:p-16 text-center max-w-3xl mx-auto transition-colors duration-300"
              style={{ 
                backgroundColor: isDarkMode ? 'rgba(26, 26, 26, 0.4)' : 'rgba(250, 242, 232, 0.4)',
                borderColor: isDarkMode ? 'rgba(51, 51, 51, 0.3)' : 'rgba(229, 231, 235, 0.3)'
              }}
            >
              <h2 
                className={`text-2xl md:text-3xl font-semibold tracking-tight mb-4 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                style={{ fontFamily: 'Petrona' }}
              >
                Experience the difference.
              </h2>
              <p 
                className={`mb-8 max-w-lg mx-auto transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                style={{ fontFamily: 'Work Sans' }}
              >
                Whether it's a week or a season, discover what thoughtfully designed extended stays feel like.
              </p>
              <a 
                href="/properties" 
                className="inline-flex items-center gap-2 font-medium transition-colors duration-300 hover:opacity-80"
                style={{ 
                  color: isDarkMode ? '#DE754B' : '#0B8043',
                  fontFamily: 'Work Sans'
                }}
              >
                Explore our properties
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </div>
        </section>
      </main>

      <FooterSimple />
    </div>
  )
}

export default AboutUs
