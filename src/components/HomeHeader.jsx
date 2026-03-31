import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'

const HomeHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { isDarkMode } = useTheme()

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }
  return (
    <div 
      style={{ 
        backgroundColor: isDarkMode ? "rgba(26, 26, 26, 0.75)" : "#FFF7F0",
        borderBottom: isDarkMode ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.1)"
      }} 
      className={`relative transition-colors duration-300 ${
        isDarkMode ? 'backdrop-blur-md' : 'shadow-sm'
      }`}
    >
      {/* Header */}
      <header className="px-8 max-md:px-4 py-3 md:py-3 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center md:-my-9 -my-10">
          {/* Logo - Clickable */}
          <Link to="/" className="flex items-center md:-ml-15 -ml-9">
            <img
              src={isDarkMode ? "/hodo-white-logo.png" : "/hodo-header-logo.png"}
              alt="Hodo Stays"
              className="h-24 md:h-32 w-auto mt-4 md:mt-0 mb-4 md:mb-0 transition-opacity duration-300 lg:ml-[10px]"
              style={{ objectFit: 'contain' }}
            />
          </Link>

          {/* Spacer to push content right */}
          <div className="hidden md:flex flex-1"></div>

          {/* Desktop Right Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/about" className={`font-medium transition-colors ${isDarkMode ? 'text-gray-200 hover:text-gray-400' : 'text-gray-800 hover:text-gray-600'}`}>
              About
            </Link>
            <Link to="/properties" className={`font-medium transition-colors ${isDarkMode ? 'text-gray-200 hover:text-gray-400' : 'text-gray-800 hover:text-gray-600'}`}>
              Properties
            </Link>
            
            <button className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'}`}>
              <svg
                className={`w-6 h-6 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>

          {/* Mobile Hamburger Menu */}
          <div className="md:hidden ml-auto flex items-center gap-2">
            <button 
              onClick={toggleMobileMenu}
              className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'}`}
            >
              {isMobileMenuOpen ? (
                <svg
                  className={`w-6 h-6 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className={`w-6 h-6 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div 
          className={`md:hidden transition-colors duration-300 ${
            isDarkMode ? 'backdrop-blur-md' : 'shadow-xl'
          }`}
          style={{ 
            backgroundColor: isDarkMode ? "rgba(0, 0, 0, 0.95)" : "#FFF7F0"
          }}
        >
          <div className="px-6 py-4 space-y-1">
            <Link 
              to="/" 
              className={`block font-medium text-base py-4 px-4 rounded-lg transition-all duration-200 border-b ${
                isDarkMode 
                  ? 'text-gray-200 hover:bg-gray-800 hover:text-orange-400 border-gray-700' 
                  : 'text-gray-800 hover:bg-orange-50 hover:text-orange-600 border-gray-200'
              }`}
              style={{ fontFamily: 'Work Sans' }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`block font-medium text-base py-4 px-4 rounded-lg transition-all duration-200 border-b ${
                isDarkMode 
                  ? 'text-gray-200 hover:bg-gray-800 hover:text-orange-400 border-gray-700' 
                  : 'text-gray-800 hover:bg-gray-100 hover:text-orange-600 border-gray-200'
              }`}
              style={{ fontFamily: 'Work Sans' }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/properties" 
              className={`block font-medium text-base py-4 px-4 rounded-lg transition-all duration-200 border-b ${
                isDarkMode 
                  ? 'text-gray-200 hover:bg-gray-800 hover:text-orange-400 border-gray-700' 
                  : 'text-gray-800 hover:bg-orange-50 hover:text-orange-600 border-gray-200'
              }`}
              style={{ fontFamily: 'Work Sans' }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Properties
            </Link>
            
            {/* Search in Mobile Menu */}
            <button 
              className={`flex items-center gap-3 font-medium text-base py-4 px-4 rounded-lg transition-all duration-200 w-full text-left ${
                isDarkMode 
                  ? 'text-gray-200 hover:bg-gray-800 hover:text-orange-400' 
                  : 'text-gray-800 hover:bg-orange-50 hover:text-orange-600'
              }`}
              style={{ fontFamily: 'Work Sans' }}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              Search
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeHeader;
