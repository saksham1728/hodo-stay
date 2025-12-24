import { useState, useEffect, useRef } from "react";

const ReviewsSection = () => {
  const [activeReview, setActiveReview] = useState(0);
  const reviewsRef = useRef(null);

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
      const cardWidth = isMobile ? window.innerWidth - 32 : 370;
      const scrollLeft = container.scrollLeft;
      const newActiveIndex = Math.round(scrollLeft / cardWidth);
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
        background: "linear-gradient(180deg, #FFF7F0 0%, #506C60 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <h2
          className="text-gray-800 m-0 mb-12 max-md:text-3xl max-md:mb-8"
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

        {/* Desktop Layout - 3 cards side by side */}
        <div className="hidden md:flex justify-center mb-12 relative">
          <div className="relative w-full max-w-6xl px-4">
            {/* Navigation arrows */}
            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-20 hover:bg-white/90 transition-colors"
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                border: '1px solid rgba(0,0,0,0.1)'
              }}
              onClick={() => {
                const newIndex =
                  activeReview > 0 ? activeReview - 1 : reviews.length - 1;
                setActiveReview(newIndex);
              }}
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-20 hover:bg-white/90 transition-colors"
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                border: '1px solid rgba(0,0,0,0.1)'
              }}
              onClick={() => {
                const newIndex =
                  activeReview < reviews.length - 1 ? activeReview + 1 : 0;
                setActiveReview(newIndex);
              }}
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Review cards container - 3 straight cards */}
            <div className="flex items-center justify-center gap-6 px-16">
              {/* Left card - Previous review */}
              <div 
                className="w-96 rounded-2xl p-5 opacity-75 flex flex-col"
                style={{ 
                  backgroundColor: '#F6F0E7',
                  boxShadow: '0px 4px 4px 0px #00000040',
                  minHeight: '280px',
                  maxHeight: '280px'
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xl font-bold" style={{ backgroundColor: '#4A5568' }}>
                      {reviews[activeReview > 0 ? activeReview - 1 : reviews.length - 1].name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-base mb-1">{reviews[activeReview > 0 ? activeReview - 1 : reviews.length - 1].name}</div>
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <img 
                          src={`https://flagcdn.com/w20/${reviews[activeReview > 0 ? activeReview - 1 : reviews.length - 1].countryCode.toLowerCase()}.png`}
                          alt={reviews[activeReview > 0 ? activeReview - 1 : reviews.length - 1].country}
                          className="w-5 h-4"
                        />
                        <span>{reviews[activeReview > 0 ? activeReview - 1 : reviews.length - 1].country}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <div className="text-pink-500 text-sm flex">
                      {"★".repeat(reviews[activeReview > 0 ? activeReview - 1 : reviews.length - 1].rating)}
                    </div>
                    <span className="text-gray-700 font-medium text-sm">{reviews[activeReview > 0 ? activeReview - 1 : reviews.length - 1].rating}/5</span>
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {reviews[activeReview > 0 ? activeReview - 1 : reviews.length - 1].text}
                </p>
              </div>

              {/* Center card - Active review (highlighted) */}
              <div 
                className="w-[420px] rounded-2xl p-6 transform scale-105 z-10 flex flex-col"
                style={{ 
                  backgroundColor: '#F6F0E7',
                  boxShadow: '0px 4px 4px 0px #00000040',
                  minHeight: '280px',
                  maxHeight: '280px'
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 text-white text-2xl font-bold" style={{ backgroundColor: '#4A5568' }}>
                      {reviews[activeReview].name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-lg mb-1">{reviews[activeReview].name}</div>
                      <div className="flex items-center gap-2 text-gray-700 text-base">
                        <img 
                          src={`https://flagcdn.com/w20/${reviews[activeReview].countryCode.toLowerCase()}.png`}
                          alt={reviews[activeReview].country}
                          className="w-5 h-4"
                        />
                        <span>{reviews[activeReview].country}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <div className="text-pink-500 text-base flex">
                      {"★".repeat(reviews[activeReview].rating)}
                    </div>
                    <span className="text-gray-800 font-semibold text-base">{reviews[activeReview].rating}/5</span>
                  </div>
                </div>
                <p className="text-gray-800 text-base leading-relaxed">
                  {reviews[activeReview].text}
                </p>
              </div>

              {/* Right card - Next review */}
              <div 
                className="w-96 rounded-2xl p-5 opacity-75 flex flex-col"
                style={{ 
                  backgroundColor: '#F6F0E7',
                  boxShadow: '0px 4px 4px 0px #00000040',
                  minHeight: '280px',
                  maxHeight: '280px'
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xl font-bold" style={{ backgroundColor: '#4A5568' }}>
                      {reviews[activeReview < reviews.length - 1 ? activeReview + 1 : 0].name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-base mb-1">{reviews[activeReview < reviews.length - 1 ? activeReview + 1 : 0].name}</div>
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <img 
                          src={`https://flagcdn.com/w20/${reviews[activeReview < reviews.length - 1 ? activeReview + 1 : 0].countryCode.toLowerCase()}.png`}
                          alt={reviews[activeReview < reviews.length - 1 ? activeReview + 1 : 0].country}
                          className="w-5 h-4"
                        />
                        <span>{reviews[activeReview < reviews.length - 1 ? activeReview + 1 : 0].country}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <div className="text-pink-500 text-sm flex">
                      {"★".repeat(reviews[activeReview < reviews.length - 1 ? activeReview + 1 : 0].rating)}
                    </div>
                    <span className="text-gray-700 font-medium text-sm">{reviews[activeReview < reviews.length - 1 ? activeReview + 1 : 0].rating}/5</span>
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {reviews[activeReview < reviews.length - 1 ? activeReview + 1 : 0].text}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout - Touch scrollable full width cards */}
        <div className="md:hidden mb-8">
          <div 
            ref={reviewsRef}
            className="flex gap-4 overflow-x-auto pb-4 px-4 scrollbar-hide snap-x snap-mandatory"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {reviews.map((review) => (
              <div 
                key={review.id}
                className="rounded-2xl p-8 flex-shrink-0 w-full snap-start"
                style={{ 
                  minWidth: 'calc(100vw - 32px)',
                  minHeight: '280px',
                  backgroundColor: '#F6F0E7',
                  boxShadow: '0px 4px 4px 0px #00000040'
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 text-white text-2xl font-bold" style={{ backgroundColor: '#4A5568' }}>
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-lg mb-1">{review.name}</div>
                      <div className="flex items-center gap-2 text-gray-700 text-base">
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
                    <div className="text-pink-500 text-base flex">
                      {"★".repeat(review.rating)}
                    </div>
                    <span className="text-gray-800 font-semibold text-base">{review.rating}/5</span>
                  </div>
                </div>
                
                <p className="text-gray-800 text-base leading-relaxed">
                  {review.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-2">
          {reviews.map((_, index) => (
            <span
              key={index}
              className={`w-3 h-3 rounded-full cursor-pointer transition-colors duration-300 ${
                index === activeReview ? "bg-emerald-800" : "bg-gray-400"
              }`}
              onClick={() => setActiveReview(index)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewsSection;
