import { useState, useEffect, useRef } from 'react'

const Footer = () => {
  const [activeReview, setActiveReview] = useState(0)
  const reviewsRef = useRef(null)

  const reviews = [
    {
      id: 1,
      name: "Sehda",
      rating: 5,
      text: "Had a great 2-day stay with my family at Hodo Stays. The rooms were clean, spacious, and modern. Friendly staff and great service made the experience even better. Perfect location with easy access to local attractions. Highly recommend!",
      avatar: "/api/placeholder/50/50"
    },
    {
      id: 2,
      name: "Rahul",
      rating: 5,
      text: "One of the best stays I've had in Bangalore. The amenities were top-notch and the location was perfect for exploring the city.",
      avatar: "/api/placeholder/50/50"
    },
    {
      id: 3,
      name: "Priya",
      rating: 5,
      text: "Amazing experience! The property was exactly as described and the host was very responsive. Will definitely book again.",
      avatar: "/api/placeholder/50/50"
    }
  ]

  const handleScroll = () => {
    if (reviewsRef.current) {
      const container = reviewsRef.current
      const cardWidth = 370
      const scrollLeft = container.scrollLeft
      const newActiveIndex = Math.round(scrollLeft / cardWidth)
      if (newActiveIndex >= 0 && newActiveIndex < reviews.length) {
        setActiveReview(newActiveIndex)
      }
    }
  }

  useEffect(() => {
    const container = reviewsRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // circular indices
  const n = reviews.length
  const leftIndex = (activeReview - 1 + n) % n
  const rightIndex = (activeReview + 1) % n

  // fixed sizes (adjust if you want slightly different)
  const SIDE_WIDTH = 320
  const CENTER_WIDTH = 520
  const CARD_HEIGHT = 320
  const GAP = 36

  // common transition style
  const transitionStyle = {
    transition: 'transform 360ms cubic-bezier(0.2,0.8,0.2,1), opacity 360ms ease'
  }

  // text clamp style (keeps content from growing card)
  const clampStyle = {
    display: '-webkit-box',
    WebkitLineClamp: 6,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  }

  return (
    <div>
      {/* Reviews Section */}
      <div 
        className="py-16 px-8 text-gray-800 relative max-md:py-8 max-md:px-4"
        style={{ background: 'linear-gradient(180deg, #FFF7F0 0%, #506C60 100%)' }}
      >
        <h2 
          className="text-gray-800 m-0 mb-12 text-center max-md:text-2xl"
          style={{
            fontFamily: 'Petrona',
            fontWeight: 400,
            fontSize: '48px',
            lineHeight: '150%',
            letterSpacing: '-2.2%'
          }}
        >
          What our Guests say
        </h2>

        {/* Centered cards layout (fixed sizes + smooth transitions) */}
        <div className="flex justify-center mb-10 relative">
          <div className="relative w-full max-w-6xl px-4">
            {/* Left Arrow */}
            <button 
              className="absolute left-0 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg z-20 hover:bg-white transition-colors"
              onClick={() => {
                const newIndex = activeReview > 0 ? activeReview - 1 : reviews.length - 1
                setActiveReview(newIndex)
              }}
            >
              ←
            </button>

            {/* Right Arrow */}
            <button 
              className="absolute right-0 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg z-20 hover:bg-white transition-colors"
              onClick={() => {
                const newIndex = activeReview < reviews.length - 1 ? activeReview + 1 : 0
                setActiveReview(newIndex)
              }}
            >
              →
            </button>

            {/* Cards row (three cards: prev / active / next). Fixed widths & heights. */}
            <div 
              ref={reviewsRef}
              className="flex items-center justify-center gap-8 overflow-visible px-6 py-6"
              style={{ minHeight: CARD_HEIGHT }}
            >
              {/* LEFT (previous) */}
              <div
                key={reviews[leftIndex].id}
                className="flex-shrink-0"
                style={{
                  width: SIDE_WIDTH,
                  height: CARD_HEIGHT,
                  ...transitionStyle,
                  transform: `translateY(0) scale(${activeReview === leftIndex ? 1.02 : 0.98})`,
                  opacity: activeReview === leftIndex ? 1 : 0.95
                }}
              >
                <div className="bg-white/75 rounded-2xl p-5 shadow-md h-full flex flex-col justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-200 flex-shrink-0">
                      <img src={reviews[leftIndex].avatar} alt="Reviewer" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="text-yellow-400 text-sm mb-2">
                        {'★'.repeat(reviews[leftIndex].rating)}
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed mb-2" style={clampStyle}>
                        {reviews[leftIndex].text}
                      </p>
                    </div>
                  </div>
                  <div className="text-right text-sm font-medium text-gray-700 pt-2">
                    {reviews[leftIndex].name}
                  </div>
                </div>
              </div>

              {/* CENTER (active) */}
              <div
                key={reviews[activeReview].id}
                className="flex-shrink-0"
                style={{
                  width: CENTER_WIDTH,
                  height: CARD_HEIGHT,
                  ...transitionStyle,
                  transform: `translateY(-6px) scale(1.02)`,
                  opacity: 1
                }}
              >
                <div className="bg-[#FBF6F0] rounded-3xl p-8 shadow-2xl h-full flex flex-col justify-between">
                  <div className="flex items-start gap-6">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-200 flex-shrink-0">
                      <img src={reviews[activeReview].avatar} alt="Reviewer" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="text-yellow-400 text-lg mb-3">
                        {'★'.repeat(reviews[activeReview].rating)}
                      </div>
                      <p className="text-gray-800 text-base leading-relaxed mb-4 text-center" style={clampStyle}>
                        {reviews[activeReview].text}
                      </p>
                    </div>
                  </div>
                  <div className="text-right text-lg font-medium text-gray-800 pt-2">
                    {reviews[activeReview].name}
                  </div>
                </div>
              </div>

              {/* RIGHT (next) */}
              <div
                key={reviews[rightIndex].id}
                className="flex-shrink-0"
                style={{
                  width: SIDE_WIDTH,
                  height: CARD_HEIGHT,
                  ...transitionStyle,
                  transform: `translateY(0) scale(${activeReview === rightIndex ? 1.02 : 0.98})`,
                  opacity: activeReview === rightIndex ? 1 : 0.95
                }}
              >
                <div className="bg-white/75 rounded-2xl p-5 shadow-md h-full flex flex-col justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-200 flex-shrink-0">
                      <img src={reviews[rightIndex].avatar} alt="Reviewer" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="text-yellow-400 text-sm mb-2">
                        {'★'.repeat(reviews[rightIndex].rating)}
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed mb-2" style={clampStyle}>
                        {reviews[rightIndex].text}
                      </p>
                    </div>
                  </div>
                  <div className="text-right text-sm font-medium text-gray-700 pt-2">
                    {reviews[rightIndex].name}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2">
          {reviews.map((_, index) => (
            <button
              key={index}
              aria-label={`Go to review ${index + 1}`}
              className={`w-3 h-3 rounded-full cursor-pointer transition-colors duration-300 focus:outline-none ${
                index === activeReview ? 'bg-emerald-800' : 'bg-gray-400'
              }`}
              onClick={() => setActiveReview(index)}
            ></button>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div 
        className="py-16 px-8 text-white max-md:py-8 max-md:px-4"
        style={{ background: 'linear-gradient(180deg, #506C60 0%, #2D3A36 50.54%, #000000 100%)' }}
      >
        <div className="max-w-6xl mx-auto">
          <h2 
            className="text-white m-0 mb-12 text-left ml-8 max-md:ml-0"
            style={{
              fontFamily: 'Petrona',
              fontWeight: 400,
              fontSize: '48px',
              lineHeight: '150%',
              letterSpacing: '-2.2%'
            }}
          >
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-2 gap-12 ml-8 max-md:grid-cols-1 max-md:gap-6 max-md:ml-0">
            <div className="flex flex-col gap-6">
              <div className="border-b border-white/20 pb-4">
                <div className="flex justify-between items-center cursor-pointer py-2">
                  <span className="text-base font-normal">How can I book a room?</span>
                  <span className="text-lg font-light transition-transform duration-300 hover:rotate-45">+</span>
                </div>
              </div>
              <div className="border-b border-white/20 pb-4">
                <div className="flex justify-between items-center cursor-pointer py-2">
                  <span className="text-base font-normal">Do the rooms have AC?</span>
                  <span className="text-lg font-light transition-transform duration-300 hover:rotate-45">+</span>
                </div>
              </div>
              <div className="border-b border-white/20 pb-4">
                <div className="flex justify-between items-center cursor-pointer py-2">
                  <span className="text-base font-normal">Is there sufficient parking available?</span>
                  <span className="text-lg font-light transition-transform duration-300 hover:rotate-45">+</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="border-b border-white/20 pb-4">
                <div className="flex justify-between items-center cursor-pointer py-2">
                  <span className="text-base font-normal">How can I book a room?</span>
                  <span className="text-lg font-light transition-transform duration-300 hover:rotate-45">+</span>
                </div>
              </div>
              <div className="border-b border-white/20 pb-4">
                <div className="flex justify-between items-center cursor-pointer py-2">
                  <span className="text-base font-normal">Do the rooms have AC?</span>
                  <span className="text-lg font-light transition-transform duration-300 hover:rotate-45">+</span>
                </div>
              </div>
              <div className="border-b border-white/20 pb-4">
                <div className="flex justify-between items-center cursor-pointer py-2">
                  <span className="text-base font-normal">Is there sufficient parking available?</span>
                  <span className="text-lg font-light transition-transform duration-300 hover:rotate-45">+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* View more FAQs link */}
        <div className="text-center mt-8">
          <a href="#" className="text-white/80 text-sm hover:text-white transition-colors">
            View more FAQs →
          </a>
        </div>
        
        {/* Footer section */}
        <div className="mt-16 pt-8 border-t border-white/20 max-w-6xl mx-auto">
          <div className="flex justify-between items-start max-md:flex-col max-md:gap-8">
            <div className="text-left">
              <div className="text-white text-sm mb-1">Business and Groups</div>
              <div className="text-white/80 text-sm mb-1">Blogs</div>
              <div className="text-white/80 text-sm">Careers</div>
            </div>
            <div className="text-left">
              <div className="text-white/80 text-sm mb-1">hello@hodostays.com</div>
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
              <img src="/hodo-white-logo.png" alt="Hodo Logo" className="h-52 w-auto" />
            </div>
            <div className="text-right max-md:text-center">
              <div className="text-white text-2xl font-medium mb-1">Redefining Stays,</div>
              <div className="text-white text-2xl font-medium">beyond hotels</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
