import { Link } from 'react-router-dom'
import CardStack from '../components/CardStack'
import HomeHeader from '../components/HomeHeader'
import OurProperties from '../components/OurProperties'
import HodoBlogs from '../components/HodoBlogs'

const Home = () => {
  return (
    <div className="relative">
      {/* Hero Section with Video Background */}
      <div className="relative h-screen overflow-hidden">
        {/* Background Video */}
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
        
        {/* Video Overlay - Covers Complete Video */}
        <div 
          className="absolute inset-0"
          style={{ 
            background: 'linear-gradient(0deg, rgba(217, 217, 217, 0.148) 0%, rgba(0, 0, 0, 0.592) 87.5%)',
            boxShadow: '0px 4px 4px 0px #00000040'
          }}
        ></div>
        
        {/* Content on Top of Overlay */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center px-4 max-w-4xl mx-auto">
            <h1 className="text-6xl font-bold text-white mb-4 max-md:text-4xl">
              Redefining stays,
            </h1>
            <h2 className="text-6xl font-bold text-white mb-6 max-md:text-4xl">
              Beyond hotels
            </h2>
            <p className="text-white/90 text-xl mb-8 leading-relaxed max-md:text-base max-w-2xl mx-auto">
              Experience isn't a luxury, it's a baseline.
              <br />
              Welcome to eco-friendly stays with global hotel standards
            </p>
            
            {/* Action Buttons */}
            <div className="flex gap-4 justify-center max-md:flex-col">
              <Link 
                to="/properties" 
                className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                Explore Properties
              </Link>
              <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-colors duration-200">
                Book Now
              </button>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <div className="flex flex-col items-center">
            <span className="text-sm mb-2">Scroll to explore</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Home Header */}
      <HomeHeader />
      
      {/* Card Stack Section */}
      <CardStack />
      
      {/* Our Properties Section */}
      <OurProperties />
      
      {/* Hodo Blogs Section */}
      <HodoBlogs />
    </div>
  )
}

export default Home