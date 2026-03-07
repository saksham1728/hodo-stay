import { useTheme } from "../context/ThemeContext";

const FooterSimple = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <div
      className="py-8 px-8 text-white max-md:py-8 max-md:px-4"
      style={{
        background: isDarkMode
          ? "linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 50%, #0f0f0f 100%)"
          : "linear-gradient(180deg, #506C60 0%, #2D3A36 50.54%, #000000 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Desktop Layout - 3 Columns */}
        <div className="hidden md:block">
          {/* Three Column Layout */}
          <div className="flex justify-between items-start">
            {/* Column 1: Logo, Social Icons, and Payment Methods - Left Aligned */}
            <div className="flex-shrink-0">
              <div className="md:-mt-13 mb-6">
                <img
                  src="/hodo-white-logo.png"
                  alt="Hodo Logo"
                  className="h-38 md:-ml-10 w-auto object-contain"
                />
              </div>
              <div className="flex gap-3 md:-mt-10">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                  <span className="text-white text-sm font-bold">in</span>
                </div>
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                  <span className="text-white text-sm">@</span>
                </div>
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                  <span className="text-white text-sm font-bold">f</span>
                </div>
              </div>
              
              {/* Payment Methods - Moved from right column */}
              <div className="mt-4">
                <div className="text-white/70 text-xs mb-2">We accept</div>
                <div className="flex gap-2 items-center">
                  <div className="bg-white rounded flex items-center justify-center" style={{ width: '28px', height: '18px', padding: '2px' }}>
                    <img 
                      src="/pay1.svg" 
                      alt="American Express"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="bg-white rounded flex items-center justify-center" style={{ width: '28px', height: '18px', padding: '2px' }}>
                    <img 
                      src="/pay2.svg" 
                      alt="Google Pay"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="bg-white rounded flex items-center justify-center" style={{ width: '28px', height: '18px', padding: '2px' }}>
                    <img 
                      src="/pay3.svg" 
                      alt="Mastercard"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="bg-white rounded flex items-center justify-center" style={{ width: '28px', height: '18px', padding: '2px' }}>
                    <img 
                      src="/pay4.svg" 
                      alt="Visa"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2: Quick Links - Left Aligned */}
            <div className="flex-shrink-0 text-left">
              <h3 className="text-white font-semibold text-base mb-3">Quick Links</h3>
              <div className="space-y-2">
                <a href="/" className="text-white/80 text-sm hover:text-white transition-colors block">Home</a>
                <a href="/about" className="text-white/80 text-sm hover:text-white transition-colors block">About</a>
                <a href="/properties" className="text-white/80 text-sm hover:text-white transition-colors block">Properties</a>
              </div>
            </div>

            {/* Column 3: Contact Details - Left Aligned */}
            <div className="flex-shrink-0 text-left">
              <h3 className="text-white font-semibold text-base mb-3">Contact</h3>
              <div className="space-y-2 mb-4">
                <div className="text-white/80 text-sm">hello@hodostays.com</div>
                <div className="text-white/80 text-sm">+91-8046395093</div>
              </div>
              
              <a 
                href="/contact" 
                className="text-sm font-semibold hover:underline transition-colors duration-300 inline-block"
                style={{ color: '#DE754B' }}
              >
                Get in Touch
              </a>
            </div>
          </div>

          {/* Tagline SVG - Full Width */}
          <div className="mb-3 -mx-8">
            <img 
              src="/footer-content.svg" 
              alt="Redefining Stays, beyond hotels" 
              className="w-full h-auto"
              style={{ maxWidth: 'none' }}
            />
          </div>

          {/* Horizontal Line */}
          <div className="border-t border-white/20 mb-4"></div>

          {/* Copyright and Policy Links */}
          <div className="flex justify-between items-center">
            <div className="text-white/70 text-sm">
              © 2026 Hodo Stays. All rights reserved.
            </div>
            <div className="flex gap-6">
              <a href="/privacy-policy" className="text-white/70 text-sm hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="/terms-of-service" className="text-white/70 text-sm hover:text-white transition-colors">
                Terms & Conditions
              </a>
              <a href="/refund-policy" className="text-white/70 text-sm hover:text-white transition-colors">
                Refund Policy
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Layout - Two Column Layout */}
        <div className="md:hidden">
          <div className="flex justify-between items-start gap-6 mb-6">
            {/* Left Column: Logo → Quick Links → We Accept */}
            <div className="flex-shrink-0">
              {/* Logo */}
              <div className="mb-4">    
                <img
                  src="/hodo-white-logo.png"
                  alt="Hodo Logo"
                  className="h-32 w-auto object-contain -ml-9 -mt-13"
                />
              </div>

              {/* Quick Links */}
              <div className="mb-4 -mt-8">
                <h3 className="text-white font-semibold text-sm mb-2">Quick Links</h3>
                <div className="space-y-1.5">
                  <a href="/" className="text-white/80 text-xs hover:text-white transition-colors block">Home</a>
                  <a href="/about" className="text-white/80 text-xs hover:text-white transition-colors block">About</a>
                  <a href="/properties" className="text-white/80 text-xs hover:text-white transition-colors block">Properties</a>
                </div>
              </div>
              
              {/* Payment Methods */}
              <div>
                <div className="text-white/70 text-xs mb-2">We accept</div>
                <div className="flex gap-1.5 items-center">
                  <div className="bg-white rounded flex items-center justify-center" style={{ width: '24px', height: '16px', padding: '2px' }}>
                    <img 
                      src="/pay1.svg" 
                      alt="American Express"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="bg-white rounded flex items-center justify-center" style={{ width: '24px', height: '16px', padding: '2px' }}>
                    <img 
                      src="/pay2.svg" 
                      alt="Google Pay"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="bg-white rounded flex items-center justify-center" style={{ width: '24px', height: '16px', padding: '2px' }}>
                    <img 
                      src="/pay3.svg" 
                      alt="Mastercard"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="bg-white rounded flex items-center justify-center" style={{ width: '24px', height: '16px', padding: '2px' }}>
                    <img 
                      src="/pay4.svg" 
                      alt="Visa"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Social Icons → Contact Us */}
            <div className="flex-shrink-0 text-left">
              {/* Social Icons */}
              <div className="flex gap-2 mb-6">
                <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                  <span className="text-white text-xs font-bold">in</span>
                </div>
                <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                  <span className="text-white text-xs">@</span>
                </div>
                <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                  <span className="text-white text-xs font-bold">f</span>
                </div>
              </div>

              {/* Contact Details */}
              <div className="mt-8">
                <h3 className="text-white font-semibold text-sm mb-2">Contact</h3>
                <div className="space-y-1.5 mb-3">
                  <div className="text-white/80 text-xs">hello@hodostays.com</div>
                  <div className="text-white/80 text-xs">+91-8046395093</div>
                </div>
                
                <a 
                  href="/contact" 
                  className="text-xs font-semibold hover:underline transition-colors duration-300 inline-block"
                  style={{ color: '#DE754B' }}
                >
                  Get in Touch
                </a>
              </div>
            </div>
          </div>

          {/* Row 3: Tagline SVG - Full Width Breakout */}
          <div className="relative left-1/2 right-1/2 w-screen -ml-[50vw] -mr-[50vw] mb-6">
            <div className="px-4">
              <img 
                src="/footer-content.svg" 
                alt="Redefining Stays, beyond hotels" 
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Policy Links */}
          <div className="border-t border-white/30 pt-3">
            <div className="flex justify-between items-center w-full">
              <a href="/terms-of-service" className="text-white/70 text-xs hover:text-white transition-colors">
                Terms & Conditions
              </a>
              <a href="/privacy-policy" className="text-white/70 text-xs hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="/refund-policy" className="text-white/70 text-xs hover:text-white transition-colors">
                Refund Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterSimple;
