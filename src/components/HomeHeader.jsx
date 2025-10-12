const HomeHeader = () => {
  return (
    <div style={{ backgroundColor: '#FFF7F0' }}>
      {/* Header */}
      <header className="-mt-9 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="/hodo-header-logo.png" 
              alt="Hodo Stays" 
              className="h-16 md:h-20 w-auto"
            />
          </div>

          {/* Desktop Search Section */}
          <div className="hidden md:flex items-center gap-4">
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

            {/* Sign Up Button */}
            <button className="px-6 py-2 border-2 border-gray-800 text-gray-800 rounded-full font-medium hover:bg-gray-800 hover:text-white transition-colors">
              Sign Up
            </button>
          </div>

          {/* Hamburger Menu */}
          <button className="p-2 hover:bg-black/10 rounded-lg transition-colors">
            <svg className="w-6 h-6 md:w-8 md:h-8 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Booking Form */}
      <div className="md:hidden px-4 pb-8">
        <div 
          className="max-w-md mx-auto rounded-2xl p-6 shadow-lg"
          style={{ backgroundColor: '#FAF2E8' }}
        >
          <h2 
            className="text-gray-900 mb-4 text-center"
            style={{
              fontFamily: 'Petrona',
              fontWeight: 400,
              fontSize: '24px',
              lineHeight: '130%',
              letterSpacing: '-1%'
            }}
          >
            Book your room here
          </h2>
          
          <p 
            className="text-gray-600 text-center mb-6 text-sm"
            style={{
              fontFamily: 'Work Sans',
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '140%'
            }}
          >
            Experience isn't a luxury, it's a baseline. Welcome to eco-friendly stays with global hotel standards
          </p>

          <div className="space-y-4">
            {/* Check-In */}
            <div 
              className="flex items-center px-4 py-3 rounded-lg border border-gray-200 bg-white"
            >
              <svg className="w-5 h-5 text-gray-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-700 font-medium">Check-In</span>
            </div>

            {/* Check-Out */}
            <div 
              className="flex items-center px-4 py-3 rounded-lg border border-gray-200 bg-white"
            >
              <svg className="w-5 h-5 text-gray-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-700 font-medium">Check-Out</span>
            </div>

            {/* Add Guests */}
            <div 
              className="flex items-center px-4 py-3 rounded-lg border border-gray-200 bg-white"
            >
              <svg className="w-5 h-5 text-gray-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
              </svg>
              <span className="text-gray-700 font-medium">Add Guests</span>
            </div>

            {/* Search Button */}
            <button 
              className="w-full py-4 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity"
              style={{ 
                backgroundColor: '#DE754B',
                fontFamily: 'Work Sans',
                fontWeight: 500,
                fontSize: '16px'
              }}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeHeader