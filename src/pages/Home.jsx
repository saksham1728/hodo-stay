import { Link } from 'react-router-dom'
import CardStack from '../components/CardStack'
import HomeHeader from '../components/HomeHeader'
import OurProperties from '../components/OurProperties'
import HodoBlogs from '../components/HodoBlogs'
import Footer from '../components/Footer'
import { useTheme } from '../context/ThemeContext'

const Home = () => {
  const { isDarkMode } = useTheme()
  
  return (
    <div className="relative" style={{ backgroundColor: isDarkMode ? '#000000' : 'transparent' }}>
      {/* Hero Section with Fullscreen Video */}
      <div className="relative h-screen overflow-hidden">
        {/* Fullscreen Background Video */}
        <video 
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay 
          muted 
          loop 
          playsInline
        >
          <source src="/hodo-home.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Dark overlay on video */}
        <div 
          className="absolute inset-0"
          style={{ 
            background: isDarkMode 
              ? 'linear-gradient(90deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 100%)'
              : 'linear-gradient(90deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.5) 100%)'
          }}
        ></div>
        
        {/* Content Overlay - Left Side */}
        <div className="relative z-10 h-full flex items-center">
          <div className="w-1/2 max-md:w-full px-12 max-md:px-6">
            <div className="max-w-xl">
              {/* Main Heading with Gradient */}
              <h1 
                className="animate-fade-in delay-200 text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-medium tracking-tighter leading-[0.9] mb-6"
                style={{ 
                  fontFamily: 'Petrona',
                  maskImage: 'linear-gradient(black 0%, black 80%, transparent 100%)'
                }}
              >
                <span className={isDarkMode ? 'text-white' : 'text-black'}>Redefining stays,</span>
                <br />
                <span 
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: isDarkMode 
                      ? 'linear-gradient(to bottom right, white, white, #ffcd75)'
                      : 'linear-gradient(to bottom right, black, black, #ff9500)'
                  }}
                >
                  Beyond hotels
                </span>
              </h1>
              
              {/* Description */}
              <p 
                className={`animate-fade-in delay-300 max-w-xl text-lg leading-relaxed mb-8 ${
                  isDarkMode ? 'text-zinc-400' : 'text-zinc-600'
                }`}
              >
                Experience isn't a luxury, it's a baseline.
                <br />
                Welcome to eco-friendly stays with global hotel standards
              </p>
              
              {/* Watch Showreel Button */}
              <Link to="/properties">
                <button 
                  className={`group inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-semibold backdrop-blur-sm transition-colors ${
                    isDarkMode 
                      ? 'border border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20'
                      : 'border border-black/10 bg-black/5 text-black hover:bg-black/10 hover:border-black/20'
                  }`}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="lucide lucide-play w-4 h-4 fill-current" 
                    aria-hidden="true"
                  >
                    <polygon points="6 3 20 12 6 21 6 3"></polygon>
                  </svg>
                  Watch Showreel
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add CSS Animations */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .delay-200 {
          animation-delay: 0.2s;
        }
        
        .delay-300 {
          animation-delay: 0.3s;
        }
      `}</style>
      
      {/* Home Header - Sticky */}
      <div className="sticky top-0 z-50">
        <HomeHeader />
      </div>

      {/* Card Stack Section */}
      <CardStack />
      
      {/* Our Properties Section */}
      <OurProperties />
      
      {/* Hodo Blogs Section */}
      <HodoBlogs />
      
      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Home