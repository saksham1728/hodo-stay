import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useBuildings } from '../hooks/useBuildings'

/**
 * Simple ImageCarousel: arrows on desktop, swipe on mobile, dots indicator.
 */
const ImageCarousel = ({ images }) => {
  const [index, setIndex] = useState(0)
  const dragging = useRef(false)
  const startX = useRef(0)
  const currentX = useRef(0)

  useEffect(() => {
    setIndex(0)
  }, [images])

  const next = () => setIndex((i) => (i + 1) % images.length)
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length)
  const goTo = (i) => setIndex(i)

  const onTouchStart = (e) => {
    dragging.current = true
    startX.current = e.touches[0].clientX
    currentX.current = startX.current
  }
  const onTouchMove = (e) => {
    if (!dragging.current) return
    currentX.current = e.touches[0].clientX
  }
  const onTouchEnd = () => {
    if (!dragging.current) return
    const dx = currentX.current - startX.current
    const threshold = 40
    if (dx > threshold) prev()
    else if (dx < -threshold) next()
    dragging.current = false
  }

  return (
    <div className="relative w-full h-full">
      <div
        className="relative w-full h-full overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)`, height: '100%' }}
        >
          {images.map((src, i) => (
            <div key={i} className="flex-shrink-0 w-full h-full">
              <img
                src={src}
                alt={`slide-${i}`}
                className="w-full h-full object-cover object-center"
                style={{ minHeight: '300px' }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Arrows (desktop only) */}
      <button
        aria-label="Previous image"
        onClick={prev}
        className="hidden md:flex items-center justify-center absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md hover:opacity-90 z-20"
      >
        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        aria-label="Next image"
        onClick={next}
        className="hidden md:flex items-center justify-center absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md hover:opacity-90 z-20"
      >
        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-3 z-20 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${i === index ? 'bg-yellow-400' : 'bg-white/80'}`}
            style={{ boxShadow: '0 0 0 2px rgba(0,0,0,0.06) inset' }}
          />
        ))}
      </div>
    </div>
  )
}

const OurProperties = () => {
  const navigate = useNavigate()
  const [isMobile, setIsMobile] = useState(false)
  
  // Fetch real buildings from API
  const { buildings, loading, error } = useBuildings()
  
  // Helper function to get rating label
  const getRatingLabel = (rating) => {
    if (rating >= 9.0) return 'Exceptional'
    if (rating >= 8.0) return 'Excellent'
    if (rating >= 7.0) return 'Very Good'
    if (rating >= 6.0) return 'Good'
    return 'Pleasant'
  }
  
  // Format buildings for display
  const properties = buildings.map(building => {
    const location = building.location?.city 
      ? `${building.location.address || ''}, ${building.location.city}`.trim().replace(/^,\s*/, '')
      : "Bangalore, India"
    
    const images = building.images?.length > 0 
      ? building.images.map(img => img.url).filter(url => url)
      : ['/card-1.png', '/card-2.png', '/card-3.png']
    
    return {
      id: building._id,
      title: building.name,
      address: location,
      rating: 4.5,
      price: 7000,
      images: images,
      amenities: building.amenities?.slice(0, 3) || ['WiFi', 'Air-conditioning', 'Free Parking on Premises']
    }
  })

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <section className="py-20 px-8 max-md:py-12 max-md:px-4" style={{ backgroundColor: '#FFF7F0' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2
            className="text-black"
            style={{
              fontFamily: 'Petrona',
              fontWeight: 400,
              fontSize: isMobile ? '36px' : '48px',
              lineHeight: '150%',
              letterSpacing: '-2.2%'
            }}
          >
            Our Properties
          </h2>
          <Link
            to="/properties"
            className="text-gray-600 hover:text-gray-800 transition-colors underline mr-2"
            style={{
              fontFamily: 'Petrona',
              fontWeight: 400,
              fontSize: '14px'
            }}
          >
            View all
          </Link>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-500"></div>
              <p className="text-gray-600" style={{ fontFamily: 'Petrona', fontSize: '16px' }}>
                Loading properties...
              </p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-800" style={{ fontFamily: 'Petrona', fontSize: '16px' }}>
              Unable to load properties. Please try again later.
            </p>
          </div>
        )}

        {/* Properties List */}
        {!loading && !error && (
          <div className="space-y-8">
            {properties.map((property) => (
            <div
              key={property.id}
              className="rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
              style={{ backgroundColor: '#FAF2E8' }}
            >
              <div className="flex flex-col md:flex-row">
                {/* Left: Image carousel (60%) */}
                <div className="w-full md:w-3/5 h-[400px] md:h-[450px] flex-shrink-0" style={{ minHeight: '350px' }}>
                  <ImageCarousel images={property.images} />
                </div>

                {/* Right: Content (40%) - Clickable */}
                <div 
                  className="w-full md:w-2/5 p-4 md:p-6 md:px-8 md:py-6 flex flex-col justify-between cursor-pointer"
                  onClick={() => navigate(`/property/${property.id}`)}
                >
                  <div>
                    {/* Desktop Layout - side by side */}
                    <div className="hidden md:flex items-start justify-between">
                      <div className="pr-2">
                        <h3
                          className="text-black mb-2"
                          style={{
                            fontFamily: 'Petrona',
                            fontWeight: 600,
                            fontSize: '26px',
                            lineHeight: '100%',
                            letterSpacing: '-2.2%'
                          }}
                        >
                          {property.title}
                        </h3>
                        <p
                          className="text-gray-600 mb-4"
                          style={{
                            fontFamily: 'Petrona',
                            fontWeight: 400,
                            fontSize: '13px',
                            lineHeight: '140%'
                          }}
                        >
                          {property.address}
                        </p>
                      </div>

                      {/* Rating - Green box with "9.8" and "Exceptional" */}
                      <div className="flex items-center gap-2">
                        <div 
                          className="px-2 py-1 rounded"
                          style={{ backgroundColor: '#0B8043' }}
                        >
                          <span
                            className="text-white"
                            style={{
                              fontFamily: 'Petrona',
                              fontWeight: 600,
                              fontSize: '16px'
                            }}
                          >
                            9.8
                          </span>
                        </div>
                        <span
                          className="text-gray-700"
                          style={{
                            fontFamily: 'Petrona',
                            fontWeight: 500,
                            fontSize: '14px'
                          }}
                        >
                          Exceptional
                        </span>
                      </div>
                    </div>

                    {/* Mobile Layout - stacked: title, rating, location */}
                    <div className="md:hidden">
                      {/* Title - Full width */}
                      <h3
                        className="text-black mb-3"
                        style={{
                          fontFamily: 'Petrona',
                          fontWeight: 600,
                          fontSize: '26px',
                          lineHeight: '100%',
                          letterSpacing: '-2.2%'
                        }}
                      >
                        {property.title}
                      </h3>

                      {/* Rating - Below title */}
                      <div className="flex items-center gap-2 mb-3">
                        <div 
                          className="px-2 py-1 rounded"
                          style={{ backgroundColor: '#0B8043' }}
                        >
                          <span
                            className="text-white"
                            style={{
                              fontFamily: 'Petrona',
                              fontWeight: 600,
                              fontSize: '16px'
                            }}
                          >
                            9.8
                          </span>
                        </div>
                        <span
                          className="text-gray-700"
                          style={{
                            fontFamily: 'Petrona',
                            fontWeight: 500,
                            fontSize: '14px'
                          }}
                        >
                          Exceptional
                        </span>
                      </div>

                      {/* Location - Below rating */}
                      <p
                        className="text-gray-600 mb-4"
                        style={{
                          fontFamily: 'Petrona',
                          fontWeight: 400,
                          fontSize: '13px',
                          lineHeight: '140%'
                        }}
                      >
                        {property.address}
                      </p>
                    </div>

                    {/* Amenities badges - hidden on mobile */}
                    <div className="hidden md:flex flex-wrap gap-2 mb-4">
                      {property.amenities.map((amenity, idx) => (
                        <span
                          key={idx}
                          className="flex items-center gap-1 text-gray-600 px-2 py-1 bg-gray-50 rounded-md"
                          style={{
                            fontFamily: 'Petrona',
                            fontWeight: 400,
                            fontSize: '12px'
                          }}
                        >
                          {amenity === 'WiFi' && '📶'}
                          {amenity === 'Air-conditioning' && '❄️'}
                          {amenity === 'Free Parking on Premises' && '🅿️'}
                          {amenity}
                        </span>
                      ))}
                    </div>

                    {/* Highlights with small yellow dot bullets */}
                    {/* <ul className="mt-2 mb-4 space-y-2">
                      {property.highlights.map((h, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full mt-2" style={{ background: '#F6C84C' }} />
                          <div
                            className="text-gray-700"
                            style={{
                              fontFamily: 'Petrona',
                              fontWeight: 400,
                              fontSize: '14px',
                              lineHeight: '150%'
                            }}
                          >
                            {h}
                          </div>
                        </li>
                      ))}
                    </ul> */}

                    {/* Description - hidden on mobile */}
                    <p
                      className="hidden md:block mb-6"
                      style={{
                        color: '#8B8B8B',
                        fontFamily: 'Petrona',
                        fontWeight: 400,
                        fontSize: '18px',
                        lineHeight: '150%',
                        letterSpacing: '-2.2%'
                      }}
                    >
                      Comfortable, thoughtfully designed spaces for short & long stays.
                    </p>
                  </div>

                  {/* Price & action */}
                  <div className="flex items-center justify-between mt-4">
                    <div>
                      <div
                        className="text-gray-500 mb-1"
                        style={{
                          fontFamily: 'Petrona',
                          fontWeight: 400,
                          fontSize: '12px'
                        }}
                      >
                        from
                      </div>
                      <div className="flex items-baseline">
                        <span
                          style={{
                            color: '#4A4A4A',
                            fontFamily: 'Petrona',
                            fontWeight: 600,
                            fontSize: '30px',
                            lineHeight: '100%',
                            letterSpacing: '-2.2%'
                          }}
                        >
                          ₹ {property.price.toLocaleString()}
                        </span>
                        <span
                          className="text-gray-500"
                          style={{
                            fontFamily: 'Petrona',
                            fontWeight: 400,
                            fontSize: '12px',
                            marginLeft: '2px'
                          }}
                        >
                          / night
                        </span>
                      </div>
                      <div className="text-green-600 text-xs mt-1" style={{ fontFamily: 'Petrona' }}>
                        Incl. taxes
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <Link
                        to={`/property/${property.id}`}
                        className="text-gray-700 hover:text-gray-900 transition-colors underline underline-offset-2"
                        style={{
                          fontFamily: 'Petrona',
                          fontWeight: 500,
                          fontSize: '14px'
                        }}
                      >
                        View rooms
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default OurProperties
