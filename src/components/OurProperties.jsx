import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useBuildings } from '../hooks/useBuildings'
import { useTheme } from '../context/ThemeContext'

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

      {/* Dots - Desktop only */}
      <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 bottom-3 z-20 gap-2">
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
  const { isDarkMode } = useTheme()
  
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
  
  // Helper function to get amenity icon
  const getAmenityIconSVG = (amenityName) => {
    if (!amenityName) return null;
    const name = amenityName.toLowerCase();
    const iconColor = isDarkMode ? '#9CA3AF' : '#6B7280';
    
    if (name.includes('wifi') || name.includes('internet')) {
      return (
        <svg className="w-4 h-4 flex-shrink-0" style={{ color: iconColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
        </svg>
      );
    }
    
    if (name.includes('furnish')) {
      return (
        <svg className="w-4 h-4 flex-shrink-0" style={{ color: iconColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      );
    }
    
    if (name.includes('housekeeping') || name.includes('cleaning')) {
      return (
        <svg className="w-4 h-4 flex-shrink-0" style={{ color: iconColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      );
    }
    
    // Default icon
    return (
      <svg className="w-4 h-4 flex-shrink-0" style={{ color: iconColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    );
  };

  // Helper function to get starting price based on property name
  const getPropertyStartingPrice = (propertyName) => {
    const name = propertyName.toLowerCase();
    if (name.includes('hsr')) {
      return 6000;
    } else if (name.includes('jp nagar') || name.includes('jpnagar')) {
      return 3500;
    }
    return 5000; // Default fallback
  };

  // Format buildings for display
  const properties = buildings.map(building => {
    // Format location - use new structure, fallback to legacy
    const location = building.location?.city 
      ? `${building.location.addressLine1 || ''}, ${building.location.city}`.trim().replace(/^,\s*/, '')
      : (building.legacyLocation?.city 
        ? `${building.legacyLocation.address || ''}, ${building.legacyLocation.city}`.trim().replace(/^,\s*/, '')
        : "Bangalore, India");
    
    // Get images - prefer gallery, fallback to images, then default
    let images = [];
    if (building.gallery?.length > 0) {
      images = building.gallery.map(img => img.url).filter(url => url);
    } else if (building.images?.length > 0) {
      images = building.images.map(img => img.url).filter(url => url);
    }
    
    // If no images, use defaults
    if (images.length === 0) {
      images = ['/card-1.png', '/card-2.png', '/card-3.png'];
    }
    
    // Get amenities - use new structured format if available
    let amenities = [];
    if (building.amenities?.length > 0) {
      amenities = building.amenities.slice(0, 3).map(a => ({
        name: typeof a === 'string' ? a : a.name,
        icon: typeof a === 'object' && a.icon ? a.icon : null
      }));
    } else {
      amenities = [
        { name: "WiFi", icon: null },
        { name: "Fully Furnished", icon: null },
        { name: "Housekeeping", icon: null }
      ];
    }
    
    return {
      id: building._id,
      title: building.title || building.name,
      subTitle: building.subTitle || '',
      address: location,
      rating: building.reviewSummary?.[0]?.averageRating || 4.5,
      totalReviews: building.reviewSummary?.[0]?.totalReviews || 120,
      price: getPropertyStartingPrice(building.title || building.name),
      images: images,
      amenities: amenities,
      description: building.description || "Comfortable, thoughtfully designed spaces for short & long stays.",
      highlights: building.highlights || []
    };
  });

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <section 
      className="py-20 px-8 max-md:py-12 max-md:px-4 transition-colors duration-300" 
      style={{ backgroundColor: isDarkMode ? '#0f0f0f' : '#FFF7F0' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header - Left aligned */}
        <div className="text-left mb-12 md:mb-16">
          <p 
            className="mb-2 text-sm md:text-base font-medium tracking-wider uppercase"
            style={{ 
              color: isDarkMode ? '#DE754B' : '#0B8043',
              fontFamily: 'Work Sans'
            }}
          >
            Explore Properties
          </p>
          <h2
            className={`mb-4 text-3xl md:text-5xl transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-black'}`}
            style={{
              fontFamily: 'Petrona',
              fontWeight: 400,
              fontSize: isMobile ? '36px' : '48px',
              lineHeight: '150%',
              letterSpacing: '-2.2%'
            }}
          >
            Urban stays designed for flexible living
          </h2>
          <p
            className={`max-w-3xl text-base md:text-lg transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
            style={{
              fontFamily: 'Work Sans',
              fontWeight: 400,
              lineHeight: '150%',
              letterSpacing: '-0.5%'
            }}
          >
            Handpicked apartments in prime locations, ready for your next extended stay.
          </p>
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
              className="rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
              style={{ backgroundColor: isDarkMode ? '#1a1a1a' : '#FAF2E8' }}
            >
              {/* Desktop: 60:40 layout, Mobile: New card design */}
              <div className="flex flex-col md:flex-row">
                {/* Desktop Left: Image carousel (60%) - Hidden on mobile */}
                <div className="hidden md:block w-full md:w-3/5 h-[400px] md:h-[450px] flex-shrink-0" style={{ minHeight: '350px' }}>
                  <ImageCarousel images={property.images} />
                </div>

                {/* Mobile: New card design with image overlay - Hidden on desktop */}
                <div className="md:hidden relative h-[280px] overflow-hidden">
                  <ImageCarousel images={property.images} />
                  
                  {/* Extended Stay Badge - Top Right */}
                  <div className="absolute top-4 right-4 z-10">
                    <div 
                      className="px-3 py-1.5 rounded-full text-white text-xs font-medium"
                      style={{ 
                        backgroundColor: 'rgba(222, 117, 75, 0.9)',
                        fontFamily: 'Petrona'
                      }}
                    >
                      Extended Stay Friendly
                    </div>
                  </div>
                  
                  {/* Black gradient overlay at bottom */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 h-32 z-10"
                    style={{
                      background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)'
                    }}
                  />
                  
                  {/* Property name and address on image */}
                  <div className="absolute bottom-4 left-4 right-4 z-20">
                    <h3
                      className="text-white mb-1"
                      style={{
                        fontFamily: 'Petrona',
                        fontWeight: 600,
                        fontSize: '24px',
                        lineHeight: '110%',
                        textShadow: '0 2px 8px rgba(0,0,0,0.3)'
                      }}
                    >
                      {property.title}
                    </h3>
                    <p
                      className="text-white/90"
                      style={{
                        fontFamily: 'Petrona',
                        fontWeight: 400,
                        fontSize: '13px',
                        lineHeight: '140%',
                        textShadow: '0 1px 4px rgba(0,0,0,0.3)'
                      }}
                    >
                      {property.address}
                    </p>
                  </div>
                </div>

                {/* Right: Content (40% on desktop, full width on mobile) - Clickable */}
                <div 
                  className="w-full md:w-2/5 p-4 md:p-6 md:px-8 md:py-6 flex flex-col justify-between cursor-pointer"
                  onClick={() => navigate(`/property/${property.id}`)}
                >
                  <div>
                    {/* Desktop Layout - Vertical stack */}
                    <div className="hidden md:block">
                      <h3
                        className={`mb-2 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-black'}`}
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
                        className={`mb-3 transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                        style={{
                          fontFamily: 'Petrona',
                          fontWeight: 400,
                          fontSize: '13px',
                          lineHeight: '140%'
                        }}
                      >
                        {property.address}
                      </p>

                      {/* Rating with star - Below location */}
                      <div className="flex items-center gap-2 mb-4">
                        <svg className="w-5 h-5 text-orange-500 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span
                          className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                          style={{
                            fontFamily: 'Petrona',
                            fontWeight: 400,
                            fontSize: '14px'
                          }}
                        >
                          <span className={`font-bold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{property.rating.toFixed(1)}</span> from {property.totalReviews}+ verified guest reviews
                        </span>
                      </div>

                      {/* Dynamic amenities from API */}
                      <div className="flex gap-3 mb-4 overflow-x-auto pb-2 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        <style>{`
                          .scrollbar-hide::-webkit-scrollbar {
                            display: none;
                          }
                        `}</style>
                        
                        {property.amenities.map((amenity, idx) => (
                          <div key={idx} className="flex items-center gap-2 px-3 py-2 rounded-full whitespace-nowrap" style={{ backgroundColor: isDarkMode ? '#2a2a2a' : '#F3F4F6' }}>
                            {getAmenityIconSVG(amenity.name)}
                            <span
                              className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                              style={{ fontFamily: 'Petrona' }}
                            >
                              {amenity.name}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Description */}
                      <p
                        className="mb-6 transition-colors duration-300"
                        style={{
                          color: isDarkMode ? '#9CA3AF' : '#8B8B8B',
                          fontFamily: 'Petrona',
                          fontWeight: 400,
                          fontSize: '18px',
                          lineHeight: '150%',
                          letterSpacing: '-2.2%'
                        }}
                      >
                        {property.description}
                      </p>
                    </div>

                    {/* Mobile: Rating with star - Below image */}
                    <div className="md:hidden flex items-center gap-2 mb-3">
                      <svg className="w-5 h-5 text-orange-500 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span
                        className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                        style={{
                          fontFamily: 'Petrona',
                          fontWeight: 400,
                          fontSize: '14px'
                        }}
                      >
                        Rated <span className={`font-bold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{property.rating.toFixed(1)}★</span> from {property.totalReviews}+ verified guest reviews
                      </span>
                    </div>

                    {/* Mobile: Dynamic amenities from API */}
                    <div className="md:hidden flex gap-3 mb-4 overflow-x-auto pb-2 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                      <style>{`
                        .scrollbar-hide::-webkit-scrollbar {
                          display: none;
                        }
                      `}</style>
                      
                      {property.amenities.map((amenity, idx) => (
                        <div key={idx} className="flex items-center gap-2 px-3 py-2 rounded-full whitespace-nowrap" style={{ backgroundColor: isDarkMode ? '#2a2a2a' : '#F3F4F6' }}>
                          {getAmenityIconSVG(amenity.name)}
                          <span
                            className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                            style={{ fontFamily: 'Petrona' }}
                          >
                            {amenity.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price & action */}
                  <div className="flex items-center justify-between mt-4">
                    <div>
                      <div
                        className={`mb-1 transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
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
                          className="transition-colors duration-300"
                          style={{
                            color: isDarkMode ? '#E5E7EB' : '#4A4A4A',
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
                          className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
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
                        className={`transition-colors underline underline-offset-2 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}
                        style={{
                          fontFamily: 'Petrona',
                          fontWeight: 500,
                          fontSize: '14px'
                        }}
                      >
                        View spaces
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
