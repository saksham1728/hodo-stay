import { Link } from 'react-router-dom'
import { useState } from 'react'

const HomeHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }
  return (
    <div style={{ backgroundColor: "#FFF7F0" }} className="shadow-md">
      {/* Header */}
      <header className="px-8 max-md:px-4 py-2 md:py-3 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center md:-my-9 -my-12">
          {/* Logo */}
          <div className="flex items-center md:-ml-15 -ml-13">
            <img
              src="/hodo-header-logo.png"
              alt="Hodo Stays"
              className="h-30 md:h-30 md:w-52 w-auto mt-4 md:mt-0 mb-4 md:mb-0"
            />
          </div>

          {/* Spacer to push content right */}
          <div className="hidden md:flex flex-1"></div>

          {/* Desktop Right Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-gray-800 font-medium hover:text-gray-600 transition-colors">
              About
            </a>
            <Link to="/properties" className="text-gray-800 font-medium hover:text-gray-600 transition-colors">
              Properties
            </Link>
            <button className="p-2 hover:bg-black/10 rounded-lg transition-colors">
              <svg
                className="w-6 h-6 text-gray-800"
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
          <div className="md:hidden ml-auto">
            <button 
              onClick={toggleMobileMenu}
              className="p-2 hover:bg-black/10 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? (
                <svg
                  className="w-6 h-6 text-gray-800"
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
                  className="w-6 h-6 text-gray-800"
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
        <div className="md:hidden absolute top-full left-0 right-0 z-40 bg-white shadow-lg border-t border-gray-200">
          <div className="px-4 py-6 space-y-4">
            <a 
              href="#" 
              className="block text-gray-800 font-medium text-lg py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </a>
            <Link 
              to="/properties" 
              className="block text-gray-800 font-medium text-lg py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Properties
            </Link>
            
            {/* Search in Mobile Menu */}
            <div className="pt-4 border-t border-gray-200">
              <button className="flex items-center gap-3 text-gray-800 font-medium text-lg py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors w-full">
                <svg
                  className="w-5 h-5 text-gray-600"
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
        </div>
      )}
    </div>
  );
};

export default HomeHeader;
