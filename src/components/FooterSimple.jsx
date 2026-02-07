import { useTheme } from "../context/ThemeContext";

const FooterSimple = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <div
      className="py-16 px-8 text-white max-md:py-8 max-md:px-4"
      style={{
        background: isDarkMode
          ? "linear-gradient(180deg, #2d4a3e 0%, #1a2421 50%, #0f0f0f 100%)"
          : "linear-gradient(180deg, #506C60 0%, #2D3A36 50.54%, #000000 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Desktop Layout - Same as Mobile */}
        <div className="hidden md:block">
          {/* Row 1: Logo and Social Icons */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center md:-ml-10">
              <img
                src="/hodo-white-logo.png"
                alt="Hodo Logo"
                className="h-32 w-auto object-contain"
              />
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

          {/* Row 2: Links and Contact */}
          <div className="flex justify-between mb-16">
            <div className="text-left">
              <div className="text-white text-sm mb-1">Business and Groups</div>
              <div className="text-white/80 text-sm mb-1">Blogs</div>
              <div className="text-white/80 text-sm">Careers</div>
            </div>
            <div className="text-right">
              <div className="text-white/80 text-sm mb-1">
                hello@hodostays.com
              </div>
              <div className="text-white/80 text-sm mb-3">+91 7483413235</div>
              
              {/* Payment Methods - Right Side Below Contact */}
              <div className="flex flex-col items-end">
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
          </div>

          {/* Row 3: Tagline SVG - Full Width */}
          <div className="md:-mb-8 md:-mx-8">
            <img 
              src="/footer-content.svg" 
              alt="Redefining Stays, beyond hotels" 
              className="w-full h-auto"
              style={{ maxWidth: 'none' }}
            />
          </div>

          {/* Horizontal Line */}
          <div className="border-t border-white/20 mb-6"></div>

          {/* Copyright and Policy Links - Desktop: Left/Right */}
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
              <div className="text-white/80 text-sm mb-3">+91 7483413235</div>
              
              {/* Payment Methods - Mobile Right Side Below Contact */}
              <div className="flex flex-col items-end">
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
