const Footer2 = () => {
  return (
    <footer 
      className="py-16 px-8 text-white max-md:py-8 max-md:px-4"
      style={{ background: 'linear-gradient(180deg, #FFF7F0 0%, #A8C4B8 30%, #506C60 60%, #2D3A36 80%, #000000 100%)' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Top section with contact info */}
        <div className="text-center mb-12">
          <div className="text-white text-lg mb-2">Facing an issue?</div>
          <div className="text-white/80 text-base">Contact us at +91 9384498457</div>
        </div>

        {/* Middle section with links and contact */}
        <div className="flex justify-between items-start mb-16 max-md:flex-col max-md:gap-8">
          <div className="text-left">
            <div className="text-white text-base mb-2">Blogs</div>
            <div className="text-white text-base">Corporate bookings</div>
          </div>
          
          <div className="text-left max-md:text-center">
            <div className="text-white text-base mb-2">Facing an issue?</div>
            <div className="text-white/80 text-base">Contact us at +91 9384498457</div>
          </div>
          
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
              <span className="text-white text-lg font-bold">in</span>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
              <span className="text-white text-lg">@</span>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
              <span className="text-white text-lg">📞</span>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
              <span className="text-white text-lg font-bold">f</span>
            </div>
          </div>
        </div>

        {/* Bottom section with logo and tagline */}
        <div className="flex justify-between items-center mb-8 max-md:flex-col max-md:items-center max-md:gap-6">
          <div className="flex items-center -ml-2">
            <img src="/hodo-white-logo.png" alt="Hodo Logo" className="h-32 w-auto" />
          </div>
          <div className="text-right max-md:text-center">
            <div className="text-white text-3xl font-medium mb-1">Redefining Stays,</div>
            <div className="text-white text-3xl font-medium">beyond hotels</div>
          </div>
        </div>

        {/* Legal links */}
        <div className="flex justify-center gap-8 pt-8 border-t border-white/20 max-md:flex-col max-md:gap-4 max-md:text-center">
          <a href="#" className="text-white/60 text-sm hover:text-white transition-colors underline">
            Terms of usage
          </a>
          <a href="#" className="text-white/60 text-sm hover:text-white transition-colors underline">
            Privacy Policy
          </a>
          <a href="#" className="text-white/60 text-sm hover:text-white transition-colors underline">
            Company details
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer2