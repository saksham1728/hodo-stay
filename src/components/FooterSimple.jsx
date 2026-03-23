import { useTheme } from "../context/ThemeContext";

const FooterSimple = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <div
      className="py-8 px-8 text-white max-md:py-8 max-md:px-4 border-t border-white/20"
      style={{
        background: "#000000",
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
                <a 
                  href="https://www.linkedin.com/company/hodo-stays/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer"
                >
                  <span className="text-white text-sm font-bold">in</span>
                </a>
                <a 
                  href="https://www.instagram.com/hodo.stays/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer"
                >
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer opacity-50">
                  <span className="text-white text-sm font-bold">f</span>
                </div>
              </div>
              
              {/* Payment Methods - Moved from right column */}
              <div className="mt-4">
                <div className="text-white/70 text-xs mb-2">We accept</div>
                <div className="flex gap-2 items-center">
                  <div className="group/card relative">
                    <div className="bg-white rounded flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/card:-translate-y-1" style={{ width: '28px', height: '18px', padding: '2px' }}>
                      <img 
                        src="/pay1.svg" 
                        alt="American Express"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                      <span className="text-white/80 text-[10px] font-medium">Amex</span>
                    </div>
                  </div>
                  <div className="group/card relative">
                    <div className="bg-white rounded flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/card:-translate-y-1" style={{ width: '28px', height: '18px', padding: '2px' }}>
                      <img 
                        src="/pay2.svg" 
                        alt="Google Pay"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                      <span className="text-white/80 text-[10px] font-medium">Google Pay</span>
                    </div>
                  </div>
                  <div className="group/card relative">
                    <div className="bg-white rounded flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/card:-translate-y-1" style={{ width: '28px', height: '18px', padding: '2px' }}>
                      <img 
                        src="/pay3.svg" 
                        alt="Mastercard"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                      <span className="text-white/80 text-[10px] font-medium">Mastercard</span>
                    </div>
                  </div>
                  <div className="group/card relative">
                    <div className="bg-white rounded flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/card:-translate-y-1" style={{ width: '28px', height: '18px', padding: '2px' }}>
                      <img 
                        src="/pay4.svg" 
                        alt="Visa"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                      <span className="text-white/80 text-[10px] font-medium">Visa</span>
                    </div>
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

          {/* Horizontal Line */}
          <div className="border-t border-white/20 mb-4 mt-8"></div>

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
                  <div className="group/card relative">
                    <div className="bg-white rounded flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/card:-translate-y-1" style={{ width: '24px', height: '16px', padding: '2px' }}>
                      <img 
                        src="/pay1.svg" 
                        alt="American Express"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                      <span className="text-white/80 text-[9px] font-medium">Amex</span>
                    </div>
                  </div>
                  <div className="group/card relative">
                    <div className="bg-white rounded flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/card:-translate-y-1" style={{ width: '24px', height: '16px', padding: '2px' }}>
                      <img 
                        src="/pay2.svg" 
                        alt="Google Pay"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                      <span className="text-white/80 text-[9px] font-medium">Google Pay</span>
                    </div>
                  </div>
                  <div className="group/card relative">
                    <div className="bg-white rounded flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/card:-translate-y-1" style={{ width: '24px', height: '16px', padding: '2px' }}>
                      <img 
                        src="/pay3.svg" 
                        alt="Mastercard"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                      <span className="text-white/80 text-[9px] font-medium">Mastercard</span>
                    </div>
                  </div>
                  <div className="group/card relative">
                    <div className="bg-white rounded flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/card:-translate-y-1" style={{ width: '24px', height: '16px', padding: '2px' }}>
                      <img 
                        src="/pay4.svg" 
                        alt="Visa"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                      <span className="text-white/80 text-[9px] font-medium">Visa</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Social Icons → Contact Us */}
            <div className="flex-shrink-0 text-left">
              {/* Social Icons */}
              <div className="flex gap-2 mb-6">
                <a 
                  href="https://www.linkedin.com/company/hodo-stays/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer"
                >
                  <span className="text-white text-xs font-bold">in</span>
                </a>
                <a 
                  href="https://www.instagram.com/hodo.stays/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer"
                >
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer opacity-50">
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
