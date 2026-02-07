import { useState, useEffect, useRef } from "react";
import { useTheme } from '../context/ThemeContext'

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState(null);
  const { isDarkMode } = useTheme()

  const faqs = [
    {
      question: "How can I book a room?",
      answer: "Simply browse our properties, select your dates and room type, then proceed to checkout. You can book online through our website with instant confirmation."
    },
    {
      question: "Do the rooms have AC?",
      answer: "Yes, all our rooms are equipped with air conditioning to ensure your comfort throughout your stay."
    },
    {
      question: "Is there sufficient parking available?",
      answer: "Yes, we provide free parking on premises for all our guests. Parking is available on a first-come, first-served basis."
    },
    {
      question: "What is the check-in and check-out time?",
      answer: "Standard check-in is at 2:00 PM and check-out is at 11:00 AM. Early check-in or late check-out may be available upon request."
    },
    {
      question: "Can I cancel or modify my booking?",
      answer: "Yes, you can cancel or modify your booking through the link sent to your email. Cancellation policies vary by property and booking type."
    },
    {
      question: "Are pets allowed?",
      answer: "Pet policies vary by property. Please check the specific property details or contact us directly for pet-friendly accommodations."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="py-16 px-8 text-white max-md:py-8 max-md:px-4">
      <div className="max-w-7xl mx-auto">
        <h2
          className="text-white m-0 mb-12 max-md:mb-8 text-left"
          style={{
            fontFamily: "Petrona",
            fontWeight: 400,
            fontSize: window.innerWidth < 768 ? '36px' : '48px',
            lineHeight: "150%",
            letterSpacing: "-2.2%",
          }}
        >
          Frequently Asked Questions
        </h2>
        <div className="grid grid-cols-2 gap-12 max-md:grid-cols-1 max-md:gap-6">
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            {faqs.slice(0, 3).map((faq, index) => (
              <div key={index} className="border-b border-white/20 pb-4">
                <div 
                  className="flex justify-between items-center cursor-pointer py-2"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="text-base font-normal pr-4">
                    {faq.question}
                  </span>
                  <span 
                    className={`text-2xl font-light transition-transform duration-300 flex-shrink-0 ${
                      openFAQ === index ? 'rotate-45' : ''
                    }`}
                  >
                    +
                  </span>
                </div>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openFAQ === index ? 'max-h-96 opacity-100 mt-3' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-white/80 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Right Column */}
          <div className="flex flex-col gap-6">
            {faqs.slice(3, 6).map((faq, index) => (
              <div key={index + 3} className="border-b border-white/20 pb-4">
                <div 
                  className="flex justify-between items-center cursor-pointer py-2"
                  onClick={() => toggleFAQ(index + 3)}
                >
                  <span className="text-base font-normal pr-4">
                    {faq.question}
                  </span>
                  <span 
                    className={`text-2xl font-light transition-transform duration-300 flex-shrink-0 ${
                      openFAQ === index + 3 ? 'rotate-45' : ''
                    }`}
                  >
                    +
                  </span>
                </div>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openFAQ === index + 3 ? 'max-h-96 opacity-100 mt-3' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-white/80 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View more FAQs link */}
        <div className="text-right mt-8">
          <a
            href="#"
            className="text-white/80 text-sm hover:text-white transition-colors underline"
          >
            View more FAQs
          </a>
        </div>

        {/* Footer section */}
        <div className="mt-16 pt-8 md:mt-10">
          {/* Desktop Layout */}
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
                
                {/* Get in Touch Link */}
                <a 
                  href="/contact" 
                  className="text-sm font-semibold hover:underline transition-colors duration-300 inline-block mb-4"
                  style={{ color: '#DE754B' }}
                >
                  Get in Touch
                </a>
                
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
            <div className="-mx-8 md:-mb-8">
              <img 
                src="/footer-content.svg" 
                alt="Redefining Stays, beyond hotels"
                className="w-full h-auto"
                style={{ display: 'block' }}
              />
            </div>

            {/* Horizontal Line */}
            <div className="border-t border-white/20 mb-4"></div>

            {/* Copyright and Policy Links - Desktop: Left/Right, Mobile keeps existing */}
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
                
                {/* Get in Touch Link - Mobile */}
                <a 
                  href="/contact" 
                  className="text-sm font-semibold hover:underline transition-colors duration-300 inline-block mb-4"
                  style={{ color: '#DE754B' }}
                >
                  Get in Touch
                </a>
                
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

            {/* Row 3: Tagline SVG - Full Width */}
            <div className="-mx-4 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
              <img 
                src="/footer-content.svg" 
                alt="Redefining Stays, beyond hotels"
                className="w-full h-auto"
                style={{ display: 'block' }}
              />
              <div className="border-t border-white/30 pt-3 mt-3 px-4">
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
      </div>
    </div>
  );
};

const Footer = () => {
  const [activeReview, setActiveReview] = useState(0);
  const reviewsRef = useRef(null);
  const { isDarkMode } = useTheme();

  const reviews = [
    {
      id: 1,
      name: "David",
      rating: 5,
      country: "China",
      countryCode: "CN",
      text: "Back to the Future was excellent. Effects were amazing, quirky and great acting. Highly recommended!!!",
    },
    {
      id: 2,
      name: "Sarah",
      rating: 5,
      country: "Japan",
      countryCode: "JP",
      text: "One of the best stays I've had in Bangalore. The amenities were top-notch and the location was perfect for exploring the city.",
    },
    {
      id: 3,
      name: "Priya",
      rating: 5,
      country: "India",
      countryCode: "IN",
      text: "Amazing experience! The property was exactly as described and the host was very responsive. Will definitely book again.",
    },
  ];

  const handleScroll = () => {
    if (reviewsRef.current) {
      const container = reviewsRef.current;
      const isMobile = window.innerWidth < 768;
      const cardWidth = isMobile ? window.innerWidth - 64 : 420;
      const gap = 24;
      const scrollLeft = container.scrollLeft;
      const newActiveIndex = Math.round(scrollLeft / (cardWidth + gap));
      if (newActiveIndex >= 0 && newActiveIndex < reviews.length) {
        setActiveReview(newActiveIndex);
      }
    }
  };

  useEffect(() => {
    const container = reviewsRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll, { passive: true });
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div>
      {/* Combined Reviews + FAQ Section with Single Gradient */}
      <div
        className="transition-all duration-300"
        style={{
          background: isDarkMode
            ? "linear-gradient(180deg, #000000 0%, #1a2421 25%, #2D3A36 50%, #1a2421 75%, #000000 100%)"
            : "linear-gradient(180deg, #FFF7F0 0%, #506C60 50%, #2D3A36 75%, #000000 100%)",
        }}
      >
        {/* Reviews Section - Horizontal Scrollable Left-Aligned */}
        <div className="py-16 px-8 text-gray-800 relative max-md:py-8 max-md:px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-left mb-8">
              <p 
                className="mb-2 text-sm md:text-base font-medium tracking-wider uppercase"
                style={{ 
                  color: isDarkMode ? '#DE754B' : '#0B8043',
                  fontFamily: 'Work Sans'
                }}
              >
                Guest Experiences
              </p>
              <h2
                className={`m-0 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
                style={{
                  fontFamily: "Petrona",
                  fontWeight: 400,
                  fontSize: window.innerWidth < 768 ? '36px' : '48px',
                  lineHeight: "150%",
                  letterSpacing: "-2.2%",
                }}
              >
                What our Guests say
              </h2>
            </div>

            {/* Horizontal Scrollable Review Cards */}
            <div className="relative">
              <div 
                ref={reviewsRef}
                className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory scroll-smooth"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch'
                }}
              >
                <style>{`
                  .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>
                
                {reviews.map((review, index) => (
                  <div 
                    key={review.id}
                    className="group rounded-2xl p-6 flex-shrink-0 snap-start transition-all duration-300  hover:cursor-pointer"
                    style={{ 
                      width: window.innerWidth < 768 ? 'calc(100vw - 64px)' : '400px',
                      minHeight: '260px',
                      backgroundColor: isDarkMode ? '#1a2a27' : '#F6F0E7',
                      boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
                      border: '1px solid transparent'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#DE754B'
                      e.currentTarget.style.boxShadow = '0 12px 44px -22px rgba(222, 117, 75, 0.3)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'transparent'
                      e.currentTarget.style.boxShadow = '0px 4px 12px rgba(0,0,0,0.1)'
                    }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div 
                          className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 text-white text-2xl font-bold" 
                          style={{ 
                            backgroundColor: '#4A5568',
                            fontFamily: 'Petrona'
                          }}
                        >
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <div 
                            className={`font-semibold text-lg mb-1 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                            style={{ fontFamily: 'Petrona' }}
                          >
                            {review.name}
                          </div>
                          <div 
                            className={`flex items-center gap-2 text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                            style={{ fontFamily: 'Work Sans' }}
                          >
                            <img 
                              src={`https://flagcdn.com/w20/${review.countryCode.toLowerCase()}.png`}
                              alt={review.country}
                              className="w-5 h-4"
                            />
                            <span>{review.country}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <div className="text-orange-500 text-base flex">
                          {"★".repeat(review.rating)}
                        </div>
                        <span 
                          className={`font-semibold text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                          style={{ fontFamily: 'Work Sans' }}
                        >
                          {review.rating}/5
                        </span>
                      </div>
                    </div>
                    <p 
                      className={`text-base leading-relaxed transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                      style={{ 
                        fontFamily: 'Work Sans',
                        lineHeight: '1.6'
                      }}
                    >
                      {review.text}
                    </p>
                  </div>
                ))}
              </div>
              
              {/* Scroll Indicator Dots */}
              {/* <div className="flex justify-start gap-2 mt-6">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      const container = reviewsRef.current
                      if (container) {
                        const cardWidth = window.innerWidth < 768 ? window.innerWidth - 64 : 420
                        container.scrollTo({
                          left: index * (cardWidth + 24), // card width + gap
                          behavior: 'smooth'
                        })
                      }
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === activeReview 
                        ? 'w-8 bg-orange-500' 
                        : 'w-2 bg-gray-400 hover:bg-gray-500'
                    }`}
                    aria-label={`Go to review ${index + 1}`}
                  />
                ))}
              </div> */}
            </div>
          </div>
        </div>
        {/* FAQ and Footer Section - No separate background, continues the gradient */}
        <FAQSection />
      </div>
    </div>
  );
};

export default Footer;
