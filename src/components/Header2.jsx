const Header2 = () => {
  return (
    <header 
      className="w-full py-4 px-8"
      style={{ backgroundColor: '#FFF7F0' }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <img 
            src="/hodo-header-logo.png" 
            alt="Hodo Stays" 
            className="h-32 w-auto -mt-16 -mb-16"
          />
        </div>

        {/* Right side with Sign Up button and menu */}
        <div className="flex items-center gap-4">
          {/* Sign Up Button */}
          <button className="bg-white border border-gray-300 rounded-full px-6 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
            Sign Up
          </button>

          {/* Menu Button */}
          <button className="p-2">
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header2