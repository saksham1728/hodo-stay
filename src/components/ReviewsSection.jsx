import { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

const ReviewsSection = () => {
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
      const cardWidth = isMobile ? window.innerWidth - 64 : 400;
      const scrollLeft = container.scrollLeft;
      const newActiveIndex = Math.round(scrollLeft / (cardWidth + 24)); // card width + gap
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
    <div
      className="py-16 px-8 text-gray-800 relative max-md:py-8 max-md:px-4"
      style={{
        background: isDarkMode 
          ? "linear-gradient(180deg, #0f0f0f 0%, #1a2421 50%, #2d4a3e 100%)"
          : "linear-gradient(180deg, #FFF7F0 0%, #506C60 100%)",
      }}
    >
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
            
            {reviews.map((review) => (
              <div 
                key={review.id}
                className="group rounded-2xl p-6 flex-shrink-0 snap-start transition-all duration-300 hover:cursor-pointer"
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
        </div>
      </div>
    </div>
  );
};

export default ReviewsSection;
