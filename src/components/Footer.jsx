import { useState, useEffect, useRef } from "react";

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
              fontSize: "48px",
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
                className="absolute left-0 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg z-20 hover:bg-white transition-colors"
                onClick={() => {
                  const newIndex =
                    activeReview > 0 ? activeReview - 1 : reviews.length - 1;
                  setActiveReview(newIndex);
                }}
              >
                ←
              </button>
              <button
                className="absolute right-0 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg z-20 hover:bg-white transition-colors"
                onClick={() => {
                  const newIndex =
                    activeReview < reviews.length - 1 ? activeReview + 1 : 0;
                  setActiveReview(newIndex);
                }}
              >
                →
              </button>

              {/* Review cards container - 3 straight cards */}
              <div className="flex items-center justify-center gap-6 px-16">
                {/* Left card - Previous review */}
                <div className="w-80 bg-white/80 rounded-2xl shadow-md p-6 opacity-75">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-200 flex-shrink-0">
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
                    <div className="flex-1">
                      <div className="text-yellow-400 text-sm mb-2">
                        {"★".repeat(
                          reviews[
                            activeReview > 0
                              ? activeReview - 1
                              : reviews.length - 1
                          ].rating
                        )}
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-4">
                        {
                          reviews[
                            activeReview > 0
                              ? activeReview - 1
                              : reviews.length - 1
                          ].text
                        }
                      </p>
                      <div className="font-medium text-gray-700 text-sm text-right">
                        {
                          reviews[
                            activeReview > 0
                              ? activeReview - 1
                              : reviews.length - 1
                          ].name
                        }
                      </div>
                    </div>
                  </div>
                </div>

                {/* Center card - Active review (highlighted) */}
                <div className="w-96 bg-white rounded-2xl shadow-2xl p-8 transform scale-105 z-10">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-200 flex-shrink-0">
                      <img
                        src={reviews[activeReview].avatar}
                        alt="Reviewer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="text-yellow-400 text-lg mb-3">
                        {"★".repeat(reviews[activeReview].rating)}
                      </div>
                      <p className="text-gray-800 text-base leading-relaxed mb-4">
                        {reviews[activeReview].text}
                      </p>
                      <div className="font-medium text-gray-800 text-base text-right">
                        {reviews[activeReview].name}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right card - Next review */}
                <div className="w-80 bg-white/80 rounded-2xl shadow-md p-6 opacity-75">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-200 flex-shrink-0">
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
                    <div className="flex-1">
                      <div className="text-yellow-400 text-sm mb-2">
                        {"★".repeat(
                          reviews[
                            activeReview < reviews.length - 1
                              ? activeReview + 1
                              : 0
                          ].rating
                        )}
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-4">
                        {
                          reviews[
                            activeReview < reviews.length - 1
                              ? activeReview + 1
                              : 0
                          ].text
                        }
                      </p>
                      <div className="font-medium text-gray-700 text-sm text-right">
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
              {reviews.map((review, index) => (
                <div 
                  key={review.id}
                  className="bg-white rounded-2xl p-6 shadow-xl flex-shrink-0 w-full snap-start"
                  style={{ minWidth: 'calc(100vw - 32px)' }}
                >
                  {/* Photo and Rating on top */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200 flex-shrink-0">
                      <img
                        src={review.avatar}
                        alt="Reviewer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium text-gray-800 text-lg mb-1">
                        {review.name}
                      </div>
                      <div className="text-yellow-400 text-lg">
                        {"★".repeat(review.rating)}
                      </div>
                    </div>
                  </div>
                  
                  {/* Review text full width */}
                  <div className="w-full">
                    <p className="text-gray-700 text-base leading-relaxed">
                      {review.text}
                    </p>
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

      {/* FAQ Section */}
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
              fontSize: "48px",
              lineHeight: "150%",
              letterSpacing: "-2.2%",
            }}
          >
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-2 gap-12 max-md:grid-cols-1 max-md:gap-6">
            <div className="flex flex-col gap-6">
              <div className="border-b border-white/20 pb-4">
                <div className="flex justify-between items-center cursor-pointer py-2">
                  <span className="text-base font-normal">
                    How can I book a room?
                  </span>
                  <span className="text-lg font-light transition-transform duration-300 hover:rotate-45">
                    +
                  </span>
                </div>
              </div>
              <div className="border-b border-white/20 pb-4">
                <div className="flex justify-between items-center cursor-pointer py-2">
                  <span className="text-base font-normal">
                    Do the rooms have AC?
                  </span>
                  <span className="text-lg font-light transition-transform duration-300 hover:rotate-45">
                    +
                  </span>
                </div>
              </div>
              <div className="border-b border-white/20 pb-4">
                <div className="flex justify-between items-center cursor-pointer py-2">
                  <span className="text-base font-normal">
                    Is there sufficient parking available?
                  </span>
                  <span className="text-lg font-light transition-transform duration-300 hover:rotate-45">
                    +
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="border-b border-white/20 pb-4">
                <div className="flex justify-between items-center cursor-pointer py-2">
                  <span className="text-base font-normal">
                    How can I book a room?
                  </span>
                  <span className="text-lg font-light transition-transform duration-300 hover:rotate-45">
                    +
                  </span>
                </div>
              </div>
              <div className="border-b border-white/20 pb-4">
                <div className="flex justify-between items-center cursor-pointer py-2">
                  <span className="text-base font-normal">
                    Do the rooms have AC?
                  </span>
                  <span className="text-lg font-light transition-transform duration-300 hover:rotate-45">
                    +
                  </span>
                </div>
              </div>
              <div className="border-b border-white/20 pb-4">
                <div className="flex justify-between items-center cursor-pointer py-2">
                  <span className="text-base font-normal">
                    Is there sufficient parking available?
                  </span>
                  <span className="text-lg font-light transition-transform duration-300 hover:rotate-45">
                    +
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* View more FAQs link */}
          <div className="text-right mt-8">
            <a
              href="#"
              className="text-white/80 text-sm hover:text-white transition-colors"
            >
              View more FAQs →
            </a>
          </div>
        </div>

        {/* Footer section */}
        <div className="mt-16 pt-8 max-w-7xl mx-auto">
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

export default Footer;
