import { useState, useEffect, useRef } from "react";

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

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
    <div
      className="py-16 px-8 text-white max-md:py-8 max-md:px-4"
      style={{
        background:
          "linear-gradient(180deg, #506C60 0%, #2D3A36 50.54%, #000000 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <h2
          className="text-white m-0 mb-12 max-md:text-3xl max-md:mb-8"
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
        <div className="mt-16 pt-8">
          <div className="flex justify-between items-start max-md:flex-col max-md:gap-8">
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

          <div className="flex justify-between items-center mt-12 max-md:flex-col max-md:items-center max-md:gap-6">
            <div className="flex items-center -ml-18">
              <img
                src="/hodo-white-logo.png"
                alt="Hodo Logo"
                className="h-52 w-auto"
              />
            </div>
            <div className="text-right max-md:text-center">
              <div className="text-white text-4xl font-medium mb-1">
                Redefining Stays,
              </div>
              <div className="text-white text-4xl font-medium">
                beyond hotels
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

  const reviews = [
    {
      id: 1,
      name: "Sehda",
      rating: 5,
      text: "Had a great 2-day stay with my family at Hodo Stays. The rooms were clean, spacious, and modern. Friendly staff and great service made the experience even better. Perfect location with easy access to local attractions. Highly recommend!",
      avatar: "/api/placeholder/50/50",
    },
    {
      id: 2,
      name: "Rahul",
      rating: 5,
      text: "One of the best stays I've had in Bangalore. The amenities were top-notch and the location was perfect for exploring the city.",
      avatar: "/api/placeholder/50/50",
    },
    {
      id: 3,
      name: "Priya",
      rating: 5,
      text: "Amazing experience! The property was exactly as described and the host was very responsive. Will definitely book again.",
      avatar: "/api/placeholder/50/50",
    },
  ];

  const handleScroll = () => {
    if (reviewsRef.current) {
      const container = reviewsRef.current;
      const isMobile = window.innerWidth < 768;
      const cardWidth = isMobile ? window.innerWidth - 32 : 370; // Full width minus padding on mobile
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
    <div>
      {/* Reviews Section */}
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

          {/* Desktop Layout - 3 cards side by side (NO ROTATION) */}
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
                  className="w-80 rounded-2xl p-6 opacity-75"
                  style={{ 
                    backgroundColor: '#F6F0E7',
                    boxShadow: '0px 4px 4px 0px #00000040'
                  }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src={
                          reviews[
                            activeReview > 0
                              ? activeReview - 1
                              : reviews.length - 1
                          ].avatar
                        }
                        alt="Reviewer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-yellow-400 text-lg">
                      {"★".repeat(
                        reviews[
                          activeReview > 0
                            ? activeReview - 1
                            : reviews.length - 1
                        ].rating
                      )}
                    </div>
                  </div>
                  <p className="text-gray-800 text-sm leading-relaxed mb-4 text-center">
                    {
                      reviews[
                        activeReview > 0
                          ? activeReview - 1
                          : reviews.length - 1
                      ].text
                    }
                  </p>
                  <div className="font-medium text-gray-800 text-sm text-right">
                    {
                      reviews[
                        activeReview > 0
                          ? activeReview - 1
                          : reviews.length - 1
                      ].name
                    }
                  </div>
                </div>

                {/* Center card - Active review (highlighted) */}
                <div 
                  className="w-96 rounded-2xl p-8 transform scale-105 z-10"
                  style={{ 
                    backgroundColor: '#F6F0E7',
                    boxShadow: '0px 4px 4px 0px #00000040'
                  }}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src={reviews[activeReview].avatar}
                        alt="Reviewer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-yellow-400 text-xl">
                      {"★".repeat(reviews[activeReview].rating)}
                    </div>
                  </div>
                  <p className="text-gray-800 text-base leading-relaxed mb-6 text-center">
                    {reviews[activeReview].text}
                  </p>
                  <div className="font-medium text-gray-800 text-lg text-right">
                    {reviews[activeReview].name}
                  </div>
                </div>

                {/* Right card - Next review */}
                <div 
                  className="w-80 rounded-2xl p-6 opacity-75"
                  style={{ 
                    backgroundColor: '#F6F0E7',
                    boxShadow: '0px 4px 4px 0px #00000040'
                  }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src={
                          reviews[
                            activeReview < reviews.length - 1
                              ? activeReview + 1
                              : 0
                          ].avatar
                        }
                        alt="Reviewer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-yellow-400 text-lg">
                      {"★".repeat(
                        reviews[
                          activeReview < reviews.length - 1
                            ? activeReview + 1
                            : 0
                        ].rating
                      )}
                    </div>
                  </div>
                  <p className="text-gray-800 text-sm leading-relaxed mb-4 text-center">
                    {
                      reviews[
                        activeReview < reviews.length - 1
                          ? activeReview + 1
                          : 0
                      ].text
                    }
                  </p>
                  <div className="font-medium text-gray-800 text-sm text-right">
                    {
                      reviews[
                        activeReview < reviews.length - 1
                          ? activeReview + 1
                          : 0
                      ].name
                    }
                  </div>
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
                  className="rounded-2xl p-6 flex-shrink-0 w-full snap-start"
                  style={{ 
                    minWidth: 'calc(100vw - 32px)',
                    backgroundColor: '#F6F0E7',
                    boxShadow: '0px 4px 4px 0px #00000040'
                  }}
                >
                  {/* Photo and Rating on top */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src={review.avatar}
                        alt="Reviewer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-yellow-400 text-xl">
                      {"★".repeat(review.rating)}
                    </div>
                  </div>
                  
                  {/* Review text full width */}
                  <div className="w-full mb-6">
                    <p className="text-gray-800 text-base leading-relaxed text-center">
                      {review.text}
                    </p>
                  </div>
                  
                  {/* Name at bottom right */}
                  <div className="font-medium text-gray-800 text-lg text-right">
                    {review.name}
                  </div>
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

      {/* FAQ and Footer Section */}
      <FAQSection />
    </div>
  );
};

export default Footer;
