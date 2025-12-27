const FooterSimple = () => {
  return (
    <div
      className="py-16 px-8 text-white max-md:py-8 max-md:px-4"
      style={{
        background:
          "linear-gradient(180deg, #506C60 0%, #2D3A36 50.54%, #000000 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Desktop Layout */}
        <div className="hidden md:block">
          {/* Links, Contact, and Social Icons */}
          <div className="flex justify-between items-start">
            <div className="text-left">
              <div className="text-white text-sm mb-1">Business and Groups</div>
              <div className="text-white/80 text-sm mb-1">Blogs</div>
              <div className="text-white/80 text-sm">Careers</div>
            </div>
            <div className="text-left">
              <div className="text-white/80 text-sm mb-1">
                hello@hodostays.com
              </div>
              <div className="text-white/80 text-sm">+91 7483413235</div>
            </div>
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                <span className="text-white text-sm font-bold">in</span>
              </div>
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                <span className="text-white text-sm">@</span>
              </div>
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                <span className="text-white text-sm font-bold">f</span>
              </div>
            </div>
          </div>

          {/* Logo and Tagline Section */}
          <div className="flex justify-between items-center mt-12">
            <div className="flex items-center -ml-18">
              <img
                src="/hodo-white-logo.png"
                alt="Hodo Logo"
                className="h-52 w-auto"
              />
            </div>
            <div className="text-right">
              <div className="text-white text-4xl font-medium mb-1">
                Redefining Stays,
              </div>
              <div className="text-white text-4xl font-medium">
                beyond hotels
              </div>
            </div>
          </div>

          {/* Policy Links - Centered Below Everything */}
          <div className="flex gap-6 justify-center mt-8">
            <a href="#" className="text-white/70 text-sm hover:text-white transition-colors">
              Terms & Conditions
            </a>
            <a href="#" className="text-white/70 text-sm hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-white/70 text-sm hover:text-white transition-colors">
              Refund Policy
            </a>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          {/* Row 1: Logo and Social Icons */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center">
              <img
                src="/hodo-white-logo.png"
                alt="Hodo Logo"
                className="h-28 w-auto object-contain -ml-10"
              />
            </div>
            <div className="flex gap-3 justify-end items-center">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                <span className="text-white text-sm font-bold">in</span>
              </div>
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                <span className="text-white text-sm">@</span>
              </div>
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                <span className="text-white text-sm font-bold">f</span>
              </div>
            </div>
          </div>

          {/* Row 2: Links and Contact */}
          <div className="grid grid-cols-2 gap-4 mb-20">
            <div className="text-left">
              <div className="text-white text-sm mb-1">Business and Groups</div>
              <div className="text-white/80 text-sm mb-1">Blogs</div>
              <div className="text-white/80 text-sm">Careers</div>
            </div>
            <div className="text-right">
              <div className="text-white/80 text-sm mb-1">
                hello@hodostays.com
              </div>
              <div className="text-white/80 text-sm">+91 7483413235</div>
            </div>
          </div>

          {/* Row 3: Tagline - Full Width aligned with content */}
          <div className="w-full">
            <div className="text-white font-medium text-left" style={{ 
              fontSize: '6.4vw',
              lineHeight: '1.4',
              whiteSpace: 'nowrap',
              width: '100%'
            }}>
              Redefining Stays, beyond hotels
            </div>
            <div className="border-t border-white/30 pt-3 mt-3">
              <div className="flex justify-between items-center w-full">
                <a href="#" className="text-white/70 text-xs hover:text-white transition-colors">
                  Terms & Conditions
                </a>
                <a href="#" className="text-white/70 text-xs hover:text-white transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-white/70 text-xs hover:text-white transition-colors">
                  Refund Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterSimple;
