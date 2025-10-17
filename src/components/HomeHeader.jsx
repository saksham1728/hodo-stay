const HomeHeader = () => {
  return (
    <div style={{ backgroundColor: "#FFF7F0" }}>
      {/* Header */}
      <header className="md:mt-0 px-4 md:px-8 md:py-2 md:sticky md:top-0 md:z-50">
        <div className="max-w-7xl mx-auto flex items-center py-4 md:py-0">
          {/* Logo */}
          <div className="flex items-center md:-my-4 md:-ml-6 -ml-3">
            <img
              src="/hodo-header-logo.png"
              alt="Hodo Stays"
              className="h-16 md:h-24 w-auto"
            />
          </div>

          {/* Desktop Center Navigation */}
          <div className="hidden md:flex items-center justify-center flex-1 gap-8">
            <a href="#" className="text-gray-800 font-medium hover:text-gray-600 transition-colors">
              About
            </a>
            <a href="#" className="text-gray-800 font-medium hover:text-gray-600 transition-colors">
              Book Now
            </a>
          </div>

          {/* Desktop Search Icon */}
          <div className="hidden md:block">
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Booking Form */}
      <div className="md:hidden px-4 pb-8">
        <div
          className="max-w-md mx-auto rounded-2xl p-6 shadow-lg"
          style={{ backgroundColor: "#FAF2E8" }}
        >
          <h2
            className="text-gray-900 mb-4 text-center"
            style={{
              fontFamily: "Petrona",
              fontWeight: 400,
              fontSize: "24px",
              lineHeight: "130%",
              letterSpacing: "-1%",
            }}
          >
            Book your room here
          </h2>

          <p
            className="text-gray-600 text-center mb-6 text-sm"
            style={{
              fontFamily: "Work Sans",
              fontWeight: 400,
              fontSize: "14px",
              lineHeight: "140%",
            }}
          >
            Experience isn't a luxury, it's a baseline. Welcome to eco-friendly
            stays with global hotel standards
          </p>

          <div className="space-y-4">
            {/* Check-In */}
            <div className="flex items-center px-4 py-3 rounded-lg border border-gray-200 bg-white">
              <svg
                className="w-5 h-5 text-gray-500 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-gray-700 font-medium">Check-In</span>
            </div>

            {/* Check-Out */}
            <div className="flex items-center px-4 py-3 rounded-lg border border-gray-200 bg-white">
              <svg
                className="w-5 h-5 text-gray-500 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-gray-700 font-medium">Check-Out</span>
            </div>

            {/* Add Guests */}
            <div className="flex items-center px-4 py-3 rounded-lg border border-gray-200 bg-white">
              <svg
                className="w-5 h-5 text-gray-500 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
              </svg>
              <span className="text-gray-700 font-medium">Add Guests</span>
            </div>

            {/* Search Button */}
            <button
              className="w-full py-4 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity"
              style={{
                backgroundColor: "#DE754B",
                fontFamily: "Work Sans",
                fontWeight: 500,
                fontSize: "16px",
              }}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
