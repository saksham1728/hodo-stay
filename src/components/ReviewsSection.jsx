import { useState } from "react";
import { useTheme } from '../context/ThemeContext';

const ReviewsSection = () => {
  const { isDarkMode } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sample reviews data for static display
  const reviews = [
    {
      id: 1,
      name: "David Chen",
      initial: "DC",
      rating: 5,
      date: "Mar 2026",
      verified: true,
      text: "Exceptional stay! The property exceeded all expectations with its modern amenities and prime location.",
    },
    {
      id: 2,
      name: "Sarah Williams",
      initial: "SW",
      rating: 5,
      date: "Feb 2026",
      verified: true,
      text: "One of the best stays I've had in Bangalore. Perfect for exploring the city!",
    },
    {
      id: 3,
      name: "Priya Sharma",
      initial: "PS",
      rating: 5,
      date: "Feb 2026",
      verified: true,
      text: "Amazing experience! The host was very responsive. Will definitely book again.",
    },
    {
      id: 4,
      name: "Michael Brown",
      initial: "MB",
      rating: 5,
      date: "Jan 2026",
      verified: true,
      text: "Fantastic property with great attention to detail. Highly recommend for business travelers!",
    },
    {
      id: 5,
      name: "Emma Wilson",
      initial: "EW",
      rating: 4,
      date: "Jan 2026",
      verified: true,
      text: "Beautiful space, spotlessly clean, and the location couldn't be better. Five stars!",
    },
    {
      id: 6,
      name: "Raj Patel",
      initial: "RP",
      rating: 5,
      date: "Dec 2025",
      verified: true,
      text: "Outstanding service and comfortable rooms. Made our family vacation memorable!",
    },
  ];

  // All reviews for modal
  const allReviews = [
    {
      id: 1,
      name: "Natalie",
      initials: "NF",
      rating: 5,
      date: "Mar 2026",
      text: "Where Old and New Dubai Meet. A clever and well-executed attraction. The glass sky bridge is thrilling, and the galleries offer a fascinating look at Dubai's history. Worth every visit.",
      verified: true
    },
    {
      id: 2,
      name: "Sophie",
      initials: "S",
      rating: 5,
      date: "Mar 2026",
      text: "La vue au coucher du soleil est magnifique. Un endroit parfait pour des photos mémorables.",
      verified: true
    },
    {
      id: 3,
      name: "Mike",
      initials: "M",
      rating: 5,
      date: "Mar 2026",
      text: "An excellent value for money activity that offers amazing views of Dubai from the old town to the Burj Khalifa etc… well worth a visit.",
      verified: true
    },
    {
      id: 4,
      name: "Joji",
      initials: "J",
      rating: 5,
      date: "Feb 2026",
      text: "We loved here Long lines, no seating, no stroller inside, no priority entry for family with infants though",
      verified: true
    },
    {
      id: 5,
      name: "Harshavardhan",
      initials: "HM",
      rating: 5,
      date: "Feb 2026",
      text: "I booked my service through Tripowa, and it was a very good experience overall while visiting Dubai Frame.",
      verified: true
    }
  ];

  return (
    <>
      {/* Static Reviews Section */}
      <div className="py-16 px-8 text-gray-800 relative max-md:py-8 max-md:px-4">
        <div className="max-w-7xl mx-auto">
          {/* Narrower content container with max-w-4xl */}
          <div className="max-w-4xl">
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
                Reviews & Ratings
              </h2>
            </div>

            {/* Rating Summary Box */}
            <div className={`p-6 rounded-xl border transition-colors duration-300 mb-8 ${isDarkMode ? 'bg-[#1a1a1a] border-[#333333]' : 'bg-white border-gray-200'}`}>
              <div className="flex items-start gap-6 max-md:flex-col">
                {/* Left: Overall Rating */}
                <div className="text-center flex-shrink-0">
                  <div className={`text-4xl font-bold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Petrona' }}>
                    4.78
                  </div>
                  <div className="flex justify-center mt-1.5 gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-orange-500 fill-orange-500" viewBox="0 0 24 24">
                        <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                      </svg>
                    ))}
                  </div>
                  <div className={`text-xs mt-1.5 transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} style={{ fontFamily: 'Work Sans' }}>
                    Based on 162 reviews
                  </div>
                </div>

                {/* Right: Rating Breakdown */}
                <div className="flex-1 space-y-1.5">
                  {[
                    { stars: 5, percentage: 86 },
                    { stars: 4, percentage: 8 },
                    { stars: 3, percentage: 4 },
                    { stars: 2, percentage: 1 },
                    { stars: 1, percentage: 1 },
                  ].map((item) => (
                    <div key={item.stars} className="flex items-center gap-2">
                      <span className={`text-xs w-6 text-right transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} style={{ fontFamily: 'Work Sans' }}>
                        {item.stars}★
                      </span>
                      <div className={`flex-1 h-2 rounded-full overflow-hidden transition-colors duration-300 ${isDarkMode ? 'bg-[#2a2a2a]' : 'bg-gray-200'}`}>
                        <div 
                          className="h-full bg-orange-500 rounded-full transition-all duration-300" 
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                      <span className={`text-xs w-8 transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} style={{ fontFamily: 'Work Sans' }}>
                        {item.percentage}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Individual Reviews */}
            <div className="space-y-0">
              {reviews.map((review, index) => (
                <div 
                  key={review.id} 
                  className={`py-4 ${index !== reviews.length - 1 ? 'border-b' : ''} transition-colors duration-300 ${isDarkMode ? 'border-[#333333]/50' : 'border-gray-200/50'}`}
                >
                  {/* Review Header */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0 transition-colors duration-300 ${isDarkMode ? 'bg-[#2a2a2a]' : 'bg-gray-200'}`}>
                      <span className={`text-sm font-semibold transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} style={{ fontFamily: 'Petrona' }}>
                        {review.initial}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`font-medium transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Petrona' }}>
                          {review.name}
                        </span>
                        {review.verified && (
                          <svg className="w-3.5 h-3.5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                      </div>
                      <div className={`text-xs mt-0.5 transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} style={{ fontFamily: 'Work Sans' }}>
                        {review.date}
                      </div>
                    </div>
                  </div>

                  {/* Star Rating */}
                  <div className="flex gap-0.5 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i} 
                        className={`w-3.5 h-3.5 ${i < review.rating ? 'text-orange-500 fill-orange-500' : 'text-gray-300 fill-gray-300'}`}
                        viewBox="0 0 24 24"
                      >
                        <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                      </svg>
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className={`text-sm leading-relaxed transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`} style={{ fontFamily: 'Work Sans' }}>
                    "{review.text}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* View All Reviews Button */}
      <div className="pb-8 max-md:pb-6 px-8 max-md:px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <button
              onClick={() => setIsModalOpen(true)}
              className={`w-full inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-10 px-4 py-2 border transition-colors duration-300 ${
                isDarkMode 
                  ? 'border-[#333333] bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white' 
                  : 'border-gray-300 bg-gray-100 hover:bg-gray-200 text-gray-900'
              }`}
            >
              View All 162 Reviews
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />
          
          {/* Modal */}
          <div 
            className={`relative w-full max-w-2xl h-[85vh] flex flex-col rounded-lg shadow-lg transition-colors duration-300 ${
              isDarkMode ? 'bg-[#1a1a1a] border border-[#333333]' : 'bg-white border border-gray-200'
            }`}
            style={{ pointerEvents: 'auto' }}
          >
            {/* Header */}
            <div className={`flex flex-col space-y-1.5 px-6 py-4 border-b flex-shrink-0 transition-colors duration-300 ${
              isDarkMode ? 'border-[#333333]' : 'border-gray-200'
            }`}>
              <h2 className={`text-lg font-semibold flex items-center gap-3 transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                <span>Reviews & Ratings</span>
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-orange-500 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-sm font-medium">4.78</span>
                  <span className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>(162)</span>
                </div>
              </h2>
            </div>

            {/* Content */}
            <div 
              className="flex-1 overflow-y-auto px-6 py-4"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              {/* Rating Summary */}
              <div className={`p-4 rounded-xl mb-5 border transition-colors duration-300 ${
                isDarkMode ? 'bg-[#0a0a0a] border-[#333333]' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-start gap-6">
                  <div className="text-center flex-shrink-0">
                    <div className={`text-4xl font-bold transition-colors duration-300 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>4.78</div>
                    <div className="flex justify-center mt-1.5">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-orange-500 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <div className={`text-xs mt-1.5 transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>Based on 162 reviews</div>
                  </div>
                  <div className="flex-1 space-y-1.5">
                    {[
                      { stars: 5, percentage: 86 },
                      { stars: 4, percentage: 8 },
                      { stars: 3, percentage: 4 },
                      { stars: 2, percentage: 1 },
                      { stars: 1, percentage: 1 }
                    ].map((item) => (
                      <div key={item.stars} className="flex items-center gap-2">
                        <span className={`text-xs w-6 text-right transition-colors duration-300 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>{item.stars}★</span>
                        <div className={`flex-1 h-2 rounded-full overflow-hidden transition-colors duration-300 ${
                          isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                        }`}>
                          <div 
                            className="h-full bg-orange-500 rounded-full transition-all duration-300"
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                        <span className={`text-xs w-8 transition-colors duration-300 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>{item.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-0">
                {allReviews.map((review, index) => (
                  <div 
                    key={review.id}
                    className={`py-4 ${index !== allReviews.length - 1 ? 'border-b' : ''} transition-colors duration-300 ${
                      isDarkMode ? 'border-[#333333]' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0 transition-colors duration-300 ${
                        isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                      }`}>
                        <span className={`text-sm font-semibold transition-colors duration-300 ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>{review.initials}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`font-medium transition-colors duration-300 ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>{review.name}</span>
                          {review.verified && (
                            <svg className="w-3.5 h-3.5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <div className={`text-xs mt-0.5 transition-colors duration-300 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>{review.date}</div>
                      </div>
                    </div>
                    <div className="flex gap-0.5 mb-2">
                      {[...Array(review.rating)].map((_, i) => (
                        <svg key={i} className="w-3.5 h-3.5 text-orange-500 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>{review.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className={`absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span className="sr-only">Close</span>
            </button>
          </div>
        </div>
      )}

      {/* Hide scrollbar for webkit browsers */}
      <style jsx>{`
        .overflow-y-auto::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
};

export default ReviewsSection;
