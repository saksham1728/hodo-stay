const HomeHeader = () => {
  return (
    <div style={{ backgroundColor: "#FFF7F0" }}>
      {/* Header */}
      <header className="md:mt-0 px-4 md:px-8 md:py-2 sticky top-0 z-50">
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
    </div>
  );
};

export default HomeHeader;
