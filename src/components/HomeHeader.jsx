const HomeHeader = () => {
  return (
    <header 
      className="-mt-9 px-8 max-md:px-4"
      style={{ backgroundColor: '#FFF7F0' }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <img 
            src="/hodo-header-logo.png" 
            alt="Hodo Logo" 
            className="h-56 w-auto"
          />
        </div>

        {/* Search Section */}
        <div className="flex items-center gap-4 max-md:hidden">
          {/* Combined Select Dates and Add Guests Container */}
          <div 
            className="flex items-center px-6 py-3 rounded-full"
            style={{ backgroundColor: '#FAF2E8' }}
          >
            {/* Select Dates */}
            <div className="flex items-center gap-3 pr-8">
              <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              <span className="font-medium text-gray-700">
                Select Dates
              </span>
            </div>

            {/* Divider */}
            <div className="w-px h-6 bg-gray-300 mx-4"></div>

            {/* Add Guests */}
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
              </svg>
              <span className="font-medium text-gray-700">
                Add Guests
              </span>
            </div>
          </div>

          {/* Search Button */}
          <button 
            className="px-8 py-3 rounded-full text-white font-semibold hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#DE754B' }}
          >
            Search
          </button>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Sign Up Button */}
          <button className="px-6 py-2 border-2 border-gray-800 text-gray-800 rounded-full font-medium hover:bg-gray-800 hover:text-white transition-colors max-md:hidden">
            Sign Up
          </button>

          {/* Hamburger Menu */}
          <button className="p-2 hover:bg-black/10 rounded-lg transition-colors">
            <svg className="w-8 h-8 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Search Button */}
        <div className="md:hidden">
          <button 
            className="px-6 py-2 rounded-full text-white font-medium"
            style={{ backgroundColor: '#DE754B' }}
          >
            Search
          </button>
        </div>
      </div>
    </header>
  )
}

export default HomeHeader