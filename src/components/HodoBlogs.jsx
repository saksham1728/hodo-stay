import { useState, useRef, useEffect } from 'react'

const HodoBlogs = () => {
  const scrollContainerRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const blogs = [
    {
      id: 1,
      title: "Hodo stays - Aparhotel",
      description: "Hodo Stays: Your ideal Short and Long-Term Rental in HSR Layout, Bangalore",
      image: "/blog-1.jpg"
    },
    {
      id: 2,
      title: "Top things to do in Bengaluru",
      description: "Discover the best attractions Bangalore has to offer from your stay at Hodo Stays in HSR Layout.",
      image: "/blog-2.jpg"
    },
    {
      id: 3,
      title: "Wonders in Tech Park",
      description: "Discover the best attractions Bangalore has to offer from your stay at Hodo Stays in HSR Layout.",
      image: "/blog-3.jpg"
    },
    {
      id: 4,
      title: "Best Cafes in HSR Layout",
      description: "Explore the vibrant cafe culture around Hodo Stays and discover your next favorite spot.",
      image: "/blog-1.jpg"
    },
    {
      id: 5,
      title: "Weekend Getaways from Bangalore",
      description: "Perfect destinations for a quick escape while staying at Hodo Stays in Bangalore.",
      image: "/blog-2.jpg"
    }
  ]

  const scrollRight = () => {
    if (!scrollContainerRef.current) return
    const container = scrollContainerRef.current
    const cardWidth = window.innerWidth < 768 ? 280 : 320
    container.scrollBy({ left: cardWidth, behavior: 'smooth' })
  }

  const scrollLeft = () => {
    if (!scrollContainerRef.current) return
    const container = scrollContainerRef.current
    const cardWidth = window.innerWidth < 768 ? 280 : 320
    container.scrollBy({ left: -cardWidth, behavior: 'smooth' })
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const onScroll = () => {
      const cardWidth = window.innerWidth < 768 ? 280 : 320
      const left = container.scrollLeft
      const idx = Math.round(left / cardWidth)
      setActiveIndex(Math.min(Math.max(idx, 0), blogs.length - 1))
    }

    container.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => container.removeEventListener('scroll', onScroll)
  }, [blogs.length])

  const goToIndex = (i) => {
    if (!scrollContainerRef.current) return
    const container = scrollContainerRef.current
    const cardWidth = window.innerWidth < 768 ? 280 : 320
    const left = i * cardWidth
    container.scrollTo({ left, behavior: 'smooth' })
  }

  return (
    <section className="py-12 px-4 md:px-8" style={{ backgroundColor: '#2D3A36' }}>
      <div className="max-w-7xl mx-auto">
        {/* Mobile: Stack vertically, Desktop: Side by side */}
        <div className="flex flex-col md:grid md:grid-cols-12 gap-8 md:items-start">
          
          {/* Left: Hero Text */}
          <div className="md:col-span-4 lg:col-span-5 text-left">
            <h2
              className="text-white mb-4 md:mb-6"
              style={{
                fontFamily: 'Petrona, serif',
                fontWeight: 400,
                fontSize: window.innerWidth < 768 ? '36px' : '48px',
                lineHeight: '90%',
                letterSpacing: '-2.2%'
              }}
            >
              Hodo Chronicles
            </h2>

            <p
              className="text-white/80 mb-6 max-w-lg"
              style={{
                fontFamily: 'Work Sans, sans-serif',
                fontWeight: 400,
                fontSize: window.innerWidth < 768 ? '16px' : '20px',
                lineHeight: '150%',
                letterSpacing: '-0.8%'
              }}
            >
              Dive into our world! Explore travel tips, local insights, and the latest updates from Hodo Stays.
            </p>

            <button
              className="text-white underline hover:text-white/80 transition-colors inline-block"
              style={{
                fontFamily: 'Work Sans, sans-serif',
                fontWeight: 400,
                fontSize: '18px'
              }}
            >
              View more
            </button>
          </div>

          {/* Right: Carousel */}
          <div className="md:col-span-8 lg:col-span-7 relative">
            {/* Left Arrow - Hidden on mobile, more visible on desktop */}
            <button
              onClick={scrollLeft}
              className="hidden md:flex absolute top-1/2 -translate-y-1/2 w-12 h-12 rounded-full items-center justify-center hover:bg-white/90 transition-all duration-300 z-20 shadow-lg hover:shadow-xl hover:scale-105"
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                border: '1px solid rgba(0,0,0,0.1)'
              }}
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Right Arrow - Hidden on mobile, more visible on desktop */}
            <button
              onClick={scrollRight}
              className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full items-center justify-center hover:bg-white/90 transition-all duration-300 z-20 shadow-lg hover:shadow-xl hover:scale-105"
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                border: '1px solid rgba(0,0,0,0.1)'
              }}
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Cards Container */}
            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto pb-6 px-4 md:px-6"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                scrollSnapType: 'x mandatory',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              {blogs.map((blog) => (
                <div
                  key={blog.id}
                  className="flex-shrink-0 bg-white rounded-3xl overflow-hidden shadow-lg"
                  style={{
                    width: window.innerWidth < 768 ? '280px' : '304px',
                    height: window.innerWidth < 768 ? '360px' : '385px',
                    scrollSnapAlign: 'center'
                  }}
                >
                  {/* Image */}
                  <div 
                    className="overflow-hidden rounded-t-3xl"
                    style={{ height: window.innerWidth < 768 ? '180px' : '200px' }}
                  >
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8 bg-white h-full flex flex-col justify-between">
                    <div>
                      <h3
                        className="mb-3 text-center"
                        style={{
                          fontFamily: 'Petrona, serif',
                          fontWeight: 400,
                          fontSize: window.innerWidth < 768 ? '18px' : '24px',
                          lineHeight: '120%',
                          letterSpacing: '-0.8%'
                        }}
                      >
                        {blog.title}
                      </h3>

                      <p
                        className="text-gray-600 text-center"
                        style={{
                          fontFamily: 'Work Sans, sans-serif',
                          fontWeight: 400,
                          fontSize: window.innerWidth < 768 ? '13px' : '15px',
                          lineHeight: '150%',
                          letterSpacing: '-0.3%'
                        }}
                      >
                        {blog.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Dots */}
            <div className="flex items-center justify-center gap-3 mt-4">
              {blogs.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToIndex(i)}
                  className={`w-3 h-3 rounded-full transition-all ${i === activeIndex ? 'scale-110' : 'opacity-60'}`}
                  style={{
                    backgroundColor: i === activeIndex ? '#ffffff' : 'rgba(255,255,255,0.5)',
                    boxShadow: i === activeIndex ? '0 2px 6px rgba(0,0,0,0.3)' : 'none'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hide scrollbar */}
      <style jsx>{`
        .overflow-x-auto::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}

export default HodoBlogs