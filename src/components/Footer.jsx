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
            {/* Three Column Layout */}
            <div className="flex justify-between items-start mb-16">
              {/* Column 1: Logo, Social Icons, and Payment Methods - Left Aligned */}
              <div className="flex-shrink-0 md:-mt-11">
                <div className="md:-ml-10 mb-6">
                  <img
                    src="/hodo-white-logo.png"
                    alt="Hodo Logo"
                    className="h-32 w-auto object-contain"
                  />
                </div>
                <div className="flex gap-3 mb-6 -mt-5">
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
                
                {/* Payment Methods with Hover Effect */}
                <div>
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
                  <div className="text-white text-sm">Business and Groups</div>
                  <div className="text-white/80 text-sm">Blogs</div>
                  <div className="text-white/80 text-sm">Careers</div>
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
                <div className="text-white/80 text-sm mb-3">+91-8046395093</div>
                
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
  const { isDarkMode } = useTheme();
  const [pausedRow, setPausedRow] = useState(null); // Track which row is paused

  const reviewsRow1 = [
    {
      id: 1,
      name: "David Chen",
      rating: 5,
      country: "China",
      countryCode: "CN",
      text: "Exceptional stay! The property exceeded all expectations with its modern amenities and prime location.",
    },
    {
      id: 2,
      name: "Sarah Williams",
      rating: 5,
      country: "Japan",
      countryCode: "JP",
      text: "One of the best stays I've had in Bangalore. Perfect for exploring the city!",
    },
    {
      id: 3,
      name: "Priya Sharma",
      rating: 5,
      country: "India",
      countryCode: "IN",
      text: "Amazing experience! The host was very responsive. Will definitely book again.",
    },
    {
      id: 4,
      name: "Michael Brown",
      rating: 5,
      country: "United States",
      countryCode: "US",
      text: "Fantastic property with great attention to detail. Highly recommend for business travelers!",
    },
    {
      id: 5,
      name: "Emma Wilson",
      rating: 5,
      country: "United Kingdom",
      countryCode: "GB",
      text: "Beautiful space, spotlessly clean, and the location couldn't be better. Five stars!",
    },
    {
      id: 6,
      name: "Raj Patel",
      rating: 5,
      country: "India",
      countryCode: "IN",
      text: "Outstanding service and comfortable rooms. Made our family vacation memorable!",
    },
  ];

  const reviewsRow2 = [
    {
      id: 7,
      name: "Sophie Martin",
      rating: 5,
      country: "France",
      countryCode: "FR",
      text: "Wonderful hospitality and excellent facilities. Felt like home away from home!",
    },
    {
      id: 8,
      name: "Akira Tanaka",
      rating: 5,
      country: "Japan",
      countryCode: "JP",
      text: "Impeccable cleanliness and modern design. The staff went above and beyond!",
    },
    {
      id: 9,
      name: "Carlos Rodriguez",
      rating: 5,
      country: "Spain",
      countryCode: "ES",
      text: "Perfect location with amazing views. The amenities were top-notch!",
    },
    {
      id: 10,
      name: "Lisa Anderson",
      rating: 5,
      country: "Australia",
      countryCode: "AU",
      text: "Exceeded expectations in every way. Great value and wonderful experience!",
    },
    {
      id: 11,
      name: "Ahmed Hassan",
      rating: 5,
      country: "United Arab Emirates",
      countryCode: "AE",
      text: "Luxurious stay with excellent service. The attention to detail was impressive!",
    },
    {
      id: 12,
      name: "Nina Petrov",
      rating: 5,
      country: "Russia",
      countryCode: "RU",
      text: "Comfortable, clean, and conveniently located. Would definitely stay here again!",
    },
  ];

  return (
    <div>
      {/* Combined Reviews + FAQ Section with Single Gradient */}
      <div
        className="transition-all duration-300"
        style={{
          background: isDarkMode
            ? "linear-gradient(180deg, #000000 0%, #1a1a1a 25%, #2a2a2a 50%, #1a1a1a 75%, #000000 100%)"
            : "linear-gradient(180deg, #FFF7F0 0%, #506C60 50%, #2D3A36 75%, #000000 100%)",
        }}
      >
        {/* Reviews Section - Two Row Infinite Carousel */}
        <div className="py-16 px-8 text-gray-800 relative max-md:py-8 max-md:px-4 overflow-hidden">
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

            {/* CSS for infinite scroll animation */}
            <style>{`
              @keyframes scroll-left {
                0% {
                  transform: translateX(0);
                }
                100% {
                  transform: translateX(-50%);
                }
              }
              
              @keyframes scroll-right {
                0% {
                  transform: translateX(-50%);
                }
                100% {
                  transform: translateX(0);
                }
              }
              
              .animate-scroll-left {
                animation: scroll-left 40s linear infinite;
              }
              
              .animate-scroll-right {
                animation: scroll-right 40s linear infinite;
              }
              
              .pause-animation {
                animation-play-state: paused;
              }
            `}</style>

            {/* First Row - Scrolling Left to Right */}
            <div className="mb-6 overflow-hidden">
              <div 
                className={`flex gap-6 md:gap-6 gap-4 animate-scroll-left ${pausedRow === 1 ? 'pause-animation' : ''}`}
                style={{ width: 'max-content' }}
                onMouseEnter={() => setPausedRow(1)}
                onMouseLeave={() => setPausedRow(null)}
              >
                {/* Duplicate reviews for seamless loop */}
                {[...reviewsRow1, ...reviewsRow1].map((review, index) => (
                  <div 
                    key={`row1-${review.id}-${index}`}
                    className="group rounded-2xl p-5 md:p-5 p-4 flex-shrink-0 transition-all duration-300 hover:cursor-pointer"
                    style={{ 
                      width: window.innerWidth < 768 ? '280px' : '450px',
                      height: window.innerWidth < 768 ? 'auto' : '180px',
                      minHeight: window.innerWidth < 768 ? '220px' : '180px',
                      background: isDarkMode 
                        ? 'radial-gradient(circle at top left, #2a2a2a 0%, #1a1a1a 50%, #0a0a0a 100%)' 
                        : '#F6F0E7',
                      boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
                      border: '1px solid transparent'
                    }}
                    onClick={() => setPausedRow(pausedRow === 1 ? null : 1)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#DE754B'
                      e.currentTarget.style.boxShadow = '0 12px 44px -22px rgba(222, 117, 75, 0.3)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'transparent'
                      e.currentTarget.style.boxShadow = '0px 4px 12px rgba(0,0,0,0.1)'
                    }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <div 
                          className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xl font-bold" 
                          style={{ 
                            backgroundColor: '#4A5568',
                            fontFamily: 'Petrona'
                          }}
                        >
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <div 
                            className={`font-semibold text-base mb-1 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                            style={{ fontFamily: 'Petrona' }}
                          >
                            {review.name}
                          </div>
                          <div 
                            className={`flex items-center gap-2 text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                            style={{ fontFamily: 'Work Sans' }}
                          >
                            <img 
                              src={`https://flagcdn.com/w20/${review.countryCode.toLowerCase()}.png`}
                              alt={review.country}
                              className="w-4 h-3"
                            />
                            <span>{review.country}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <div className="text-orange-500 text-sm flex">
                          {"★".repeat(review.rating)}
                        </div>
                        <span 
                          className={`mt-[3px] font-semibold text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                          style={{ fontFamily: 'Work Sans' }}
                        >
                          {review.rating}/5
                        </span>
                      </div>
                    </div>
                    <p 
                      className={`text-sm leading-relaxed transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                      style={{ 
                        fontFamily: 'Work Sans',
                        lineHeight: '1.5'
                      }}
                    >
                      {review.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Second Row - Scrolling Right to Left */}
            <div className="overflow-hidden">
              <div 
                className={`flex gap-6 md:gap-6 gap-4 animate-scroll-right ${pausedRow === 2 ? 'pause-animation' : ''}`}
                style={{ width: 'max-content' }}
                onMouseEnter={() => setPausedRow(2)}
                onMouseLeave={() => setPausedRow(null)}
              >
                {/* Duplicate reviews for seamless loop */}
                {[...reviewsRow2, ...reviewsRow2].map((review, index) => (
                  <div 
                    key={`row2-${review.id}-${index}`}
                    className="group rounded-2xl p-5 md:p-5 p-4 flex-shrink-0 transition-all duration-300 hover:cursor-pointer"
                    style={{ 
                      width: window.innerWidth < 768 ? '280px' : '450px',
                      height: window.innerWidth < 768 ? 'auto' : '180px',
                      minHeight: window.innerWidth < 768 ? '220px' : '180px',
                      background: isDarkMode 
                        ? 'radial-gradient(circle at top left, #2a2a2a 0%, #1a1a1a 50%, #0a0a0a 100%)' 
                        : '#F6F0E7',
                      boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
                      border: '1px solid transparent'
                    }}
                    onClick={() => setPausedRow(pausedRow === 2 ? null : 2)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#DE754B'
                      e.currentTarget.style.boxShadow = '0 12px 44px -22px rgba(222, 117, 75, 0.3)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'transparent'
                      e.currentTarget.style.boxShadow = '0px 4px 12px rgba(0,0,0,0.1)'
                    }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <div 
                          className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xl font-bold" 
                          style={{ 
                            backgroundColor: '#4A5568',
                            fontFamily: 'Petrona'
                          }}
                        >
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <div 
                            className={`font-semibold text-base mb-1 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                            style={{ fontFamily: 'Petrona' }}
                          >
                            {review.name}
                          </div>
                          <div 
                            className={`flex items-center gap-2 text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                            style={{ fontFamily: 'Work Sans' }}
                          >
                            <img 
                              src={`https://flagcdn.com/w20/${review.countryCode.toLowerCase()}.png`}
                              alt={review.country}
                              className="w-4 h-3"
                            />
                            <span>{review.country}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <div className="text-orange-500 text-sm flex">
                          {"★".repeat(review.rating)}
                        </div>
                        <span 
                          className={`mt-[3px] font-semibold text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                          style={{ fontFamily: 'Work Sans' }}
                        >
                          {review.rating}/5
                        </span>
                      </div>
                    </div>
                    <p 
                      className={`text-sm leading-relaxed transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                      style={{ 
                        fontFamily: 'Work Sans',
                        lineHeight: '1.5'
                      }}
                    >
                      {review.text}
                    </p>
                  </div>
                ))}
              </div>
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
