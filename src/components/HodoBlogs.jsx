import { useState, useRef, useEffect } from 'react'

const HodoBlogs = () => {
  const scrollContainerRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const cardWidth = 320 // width of one card
  const gap = 32 // gap between cards (px)

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

  // scroll right by one card (or less if near end)
  const scrollRight = () => {
    if (!scrollContainerRef.current) return
    const container = scrollContainerRef.current
    const scrollAmount = cardWidth + gap
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }

  const scrollLeft = () => {
    if (!scrollContainerRef.current) return
    const container = scrollContainerRef.current
    const scrollAmount = cardWidth + gap
    container.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
  }

  // update active dot when user scrolls
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const onScroll = () => {
      const left = container.scrollLeft
      const idx = Math.round(left / (cardWidth + gap))
      setActiveIndex(Math.min(Math.max(idx, 0), Math.max(0, blogs.length - 1)))
    }

    container.addEventListener('scroll', onScroll, { passive: true })
    // initial
    onScroll()

    return () => container.removeEventListener('scroll', onScroll)
  }, [blogs.length])

  // jump to index (when dot clicked)
  const goToIndex = (i) => {
    if (!scrollContainerRef.current) return
    const container = scrollContainerRef.current
    const left = i * (cardWidth + gap)
    container.scrollTo({ left, behavior: 'smooth' })
  }

  return (
    <section className="pt-12 px-8 max-md:py-8 max-md:px-4" style={{ backgroundColor: '#2D3A36' }}>
      <div className="max-w-7xl mx-auto">
        {/* Layout: left hero + right carousel */}
        <div className="grid md:grid-cols-12 gap-8 items-start">
          {/* Left: hero */}
          <div className="md:col-span-4 lg:col-span-5 flex flex-col justify-start" style={{ minHeight: '520px' }}>
            <h2
              className="text-white mb-6"
              style={{
                fontFamily: 'Petrona, serif',
                fontWeight: 400,
                fontSize: '62px',
                lineHeight: '90%',
                letterSpacing: '-2.2%'
              }}
            >
              Hodo <br /> Chronicles
            </h2>

            <p
              className="text-white/80 mb-8 pr-6 max-w-lg"
              style={{
                fontFamily: 'Work Sans, sans-serif',
                fontWeight: 400,
                fontSize: '20px',
                lineHeight: '150%',
                letterSpacing: '-0.8%'
              }}
            >
              Dive into our world! Explore travel tips, local insights, and the latest updates from Hodo Stays.
            </p>

            <button
              className="text-white underline hover:text-white/80 transition-colors max-w-fit"
              style={{
                fontFamily: 'Work Sans, sans-serif',
                fontWeight: 400,
                fontSize: '18px'
              }}
            >
              View more →
            </button>
          </div>

          {/* Right: carousel */}
          <div className="md:col-span-8 lg:col-span-7 relative">
            {/* overlay left arrow (for aesthetics on large screens) */}
            <button
              onClick={scrollLeft}
              className="hidden md:flex items-center justify-center w-12 h-12 bg-white/20 rounded-full hover:bg-white/30 transition-colors absolute left-0 top-1/2 -translate-y-1/2 z-20"
              aria-label="Previous"
              style={{ backdropFilter: 'blur(4px)' }}
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* overlay right arrow */}
            <button
              onClick={scrollRight}
              className="hidden md:flex items-center justify-center w-12 h-12 bg-white/20 rounded-full hover:bg-white/30 transition-colors absolute right-0 top-1/2 -translate-y-1/2 z-20"
              aria-label="Next"
              style={{ backdropFilter: 'blur(4px)' }}
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Scrollable Cards Container */}
            <div
              ref={scrollContainerRef}
              className="flex gap-8 overflow-x-auto pb-6 pl-2 pr-6"
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
                    width: `${cardWidth}px`,
                    scrollSnapAlign: 'center'
                  }}
                >
                  {/* Image - rounded top corners only */}
                  <div className="h-46 overflow-hidden rounded-t-3xl">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* White content block */}
                  <div className="p-8 bg-white">
                    <h3
                      className="mb-4 text-center"
                      style={{
                        fontFamily: 'Petrona, serif',
                        fontWeight: 400,
                        fontSize: '24px',
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
                        fontSize: '15px',
                        lineHeight: '150%',
                        letterSpacing: '-0.3%'
                      }}
                    >
                      {blog.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination dots */}
            <div className="flex items-center justify-center gap-3 mt-2">
              {blogs.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
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

      {/* Custom CSS to hide scrollbar */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        /* ensure our scroll container hides native scrollbar on modern browsers */
        .overflow-x-auto::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}

export default HodoBlogs
