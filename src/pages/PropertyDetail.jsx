import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import dayjs from "dayjs";
import FooterSimple from "../components/FooterSimple";
import ReviewsSection from "../components/ReviewsSection";
import HomeHeader from "../components/HomeHeader";
import DateRangePicker from "../components/DateRangePicker";
import { useTheme } from "../context/ThemeContext";

/**
 * ImageCarousel: arrows on desktop, swipe on mobile, dots indicator.
 */
const ImageCarousel = ({ images, onViewPhotos }) => {
  const [index, setIndex] = useState(0)
  const dragging = useRef(false)
  const startX = useRef(0)
  const currentX = useRef(0)

  useEffect(() => {
    setIndex(0)
  }, [images])

  const next = () => setIndex((i) => (i + 1) % images.length)
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length)

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
              />
            </div>
          ))}
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index 
                ? 'w-8 bg-white' 
                : 'w-2 bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to image ${i + 1}`}
          />
        ))}
      </div>

      {/* View Photos Button */}
      <button
        onClick={onViewPhotos}
        className="absolute bottom-4 right-4 text-white px-4 py-2 rounded-lg border border-transparent hover:border-white/50 transition-all duration-300 cursor-pointer z-20 flex items-center gap-2"
        style={{ 
          fontFamily: 'Petrona', 
          fontSize: '14px', 
          fontWeight: 500,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(4px)'
        }}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        View all photos
      </button>

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
    </div>
  )
}

/**
 * PhotoGallery Modal Component
 */
const PhotoGallery = ({ images, isOpen, onClose, initialIndex = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const gridRef = useRef(null)

  useEffect(() => {
    setCurrentIndex(initialIndex)
  }, [initialIndex, isOpen])

  // Lock body scroll when gallery is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') setCurrentIndex((i) => (i - 1 + images.length) % images.length)
      if (e.key === 'ArrowRight') setCurrentIndex((i) => (i + 1) % images.length)
      if (e.key === 'ArrowUp' && gridRef.current) {
        e.preventDefault()
        gridRef.current.scrollBy({ top: -200, behavior: 'smooth' })
      }
      if (e.key === 'ArrowDown' && gridRef.current) {
        e.preventDefault()
        gridRef.current.scrollBy({ top: 200, behavior: 'smooth' })
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose, images.length])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-black/90">
        <div className="text-white" style={{ fontFamily: 'Petrona', fontSize: '16px' }}>
          {currentIndex + 1} / {images.length}
        </div>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-300 transition-colors"
          aria-label="Close gallery"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Desktop Layout: Large image + Grid */}
      <div className="hidden md:flex flex-1 overflow-hidden">
        {/* Large Image */}
        <div className="flex-1 flex items-center justify-center p-8 relative">
          <img
            src={images[currentIndex]}
            alt={`Photo ${currentIndex + 1}`}
            className="max-w-full max-h-full object-contain"
          />
          
          {/* Navigation Arrows */}
          <button
            onClick={() => setCurrentIndex((i) => (i - 1 + images.length) % images.length)}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
            aria-label="Previous"
          >
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setCurrentIndex((i) => (i + 1) % images.length)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
            aria-label="Next"
          >
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="w-80 bg-black/50 p-4 overflow-y-auto scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <style>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          <div className="grid grid-cols-2 gap-3">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`relative aspect-square rounded-lg overflow-hidden ${
                  idx === currentIndex ? 'ring-4 ring-white' : 'opacity-70 hover:opacity-100'
                } transition-all`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Layout: Full screen swipeable */}
      <div className="md:hidden flex-1 flex items-center justify-center relative">
        <img
          src={images[currentIndex]}
          alt={`Photo ${currentIndex + 1}`}
          className="max-w-full max-h-full object-contain"
        />
        
        {/* Navigation Arrows */}
        <button
          onClick={() => setCurrentIndex((i) => (i - 1 + images.length) % images.length)}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center"
          aria-label="Previous"
        >
          <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => setCurrentIndex((i) => (i + 1) % images.length)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center"
          aria-label="Next"
        >
          <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}

/**
 * Amenities Modal Component
 */
const AmenitiesModal = ({ amenities, isOpen, onClose, isDarkMode }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  // Fallback amenities list
  const fallbackAmenities = [
    'Internet', 'Parking', 'Shuttle', 'Breakfast', 'Food and drink', 'Pool', 
    'Pets', 'Things to do', 'Family friendly', 'Accessibility', 'Spa', 
    'Fitness center', 'Business center', 'Reception services', 'Cleaning services'
  ];
  
  const displayAmenities = amenities.length > 0 ? amenities : fallbackAmenities;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal - Compact size matching screenshot */}
      <div className={`relative w-full max-w-md rounded-2xl shadow-2xl overflow-hidden transition-colors duration-300 ${isDarkMode ? 'bg-[#1a1a1a]' : 'bg-white'}`}
        style={{ maxHeight: '600px' }}
      >
        {/* Header */}
        <div className={`px-6 py-4 border-b transition-colors duration-300 ${isDarkMode ? 'bg-[#1a1a1a] border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <h2 className={`text-xl font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Petrona' }}>
              All property amenities
            </h2>
            <button
              onClick={onClose}
              className={`p-1.5 rounded-full transition-colors duration-300 ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
              aria-label="Close"
            >
              <svg className={`w-5 h-5 transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Content - Scrollable */}
        <div className="px-6 py-4 overflow-y-auto" style={{ maxHeight: '500px' }}>
          <div className="space-y-6">
            {/* Group amenities by category */}
            <div className="space-y-3">
              {displayAmenities.map((amenity, index) => {
                // Handle both old (string) and new (object) format
                const amenityName = typeof amenity === 'string' ? amenity : (amenity.name || amenity.amenityID || '');
                const amenityIcon = typeof amenity === 'object' && amenity.icon ? amenity.icon : null;
                
                return (
                  <div key={index}>
                    <div className="flex items-start gap-3 py-2">
                      {amenityIcon ? (
                        <span className="text-2xl flex-shrink-0" style={{ filter: 'grayscale(100%)' }}>{amenityIcon}</span>
                      ) : (
                        getAmenityIcon(amenityName, isDarkMode)
                      )}
                      <div className="flex-1">
                        <h3 className={`font-medium transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Petrona', fontSize: '15px' }}>
                          {amenityName}
                        </h3>
                        {/* Add description for some amenities */}
                        {amenityName.toLowerCase().includes('internet') && (
                          <div className={`mt-1 space-y-0.5 text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            <p>Available in all rooms: Free WiFi</p>
                            <p>In-room WiFi speed: 25+ Mbps</p>
                            <p>Available in some public areas: Free WiFi</p>
                          </div>
                        )}
                        {amenityName.toLowerCase().includes('parking') && (
                          <p className={`mt-1 text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Free self parking on site
                          </p>
                        )}
                        {amenityName.toLowerCase().includes('shuttle') && (
                          <div className={`mt-1 space-y-0.5 text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            <p>24-hour roundtrip airport shuttle (surcharge)</p>
                            <p>Guests must contact the property 24 hours prior to arrival for details</p>
                          </div>
                        )}
                        {amenityName.toLowerCase().includes('breakfast') && (
                          <div className={`mt-1 space-y-0.5 text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            <p>Continental breakfast included</p>
                            <p>Served daily from 7:00 AM - 11:00 AM</p>
                            <p>Not available to kids staying free</p>
                          </div>
                        )}
                        {amenityName.toLowerCase().includes('pool') && (
                          <p className={`mt-1 text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            1 outdoor pool on site
                          </p>
                        )}
                        {amenityName.toLowerCase().includes('pets') && (
                          <p className={`mt-1 text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            No pets or service animals
                          </p>
                        )}
                      </div>
                    </div>
                    {index < displayAmenities.length - 1 && (
                      <hr className={`transition-colors duration-300 ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper function to get appropriate icon for each amenity
const getAmenityIcon = (amenityName, isDarkMode) => {
  const name = amenityName.toLowerCase();
  const iconColor = isDarkMode ? 'text-gray-400' : 'text-gray-700';
  
  // WiFi / Internet
  if (name.includes('wifi') || name.includes('internet')) {
    return (
      <svg className={`w-6 h-6 flex-shrink-0 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
      </svg>
    );
  }
  
  // Air Conditioning / AC
  if (name.includes('air') || name.includes('ac') || name.includes('conditioning')) {
    return (
      <svg className={`w-6 h-6 flex-shrink-0 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    );
  }
  
  // Kitchen
  if (name.includes('kitchen')) {
    return (
      <svg className={`w-6 h-6 flex-shrink-0 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    );
  }
  
  // Parking
  if (name.includes('parking')) {
    return (
      <svg className={`w-6 h-6 flex-shrink-0 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
      </svg>
    );
  }
  
  // Washing Machine / Laundry / Cleaning
  if (name.includes('wash') || name.includes('laundry') || name.includes('cleaning')) {
    return (
      <svg className={`w-6 h-6 flex-shrink-0 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    );
  }
  
  // TV / Television
  if (name.includes('tv') || name.includes('television')) {
    return (
      <svg className={`w-6 h-6 flex-shrink-0 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    );
  }
  
  // Pool / Swimming
  if (name.includes('pool') || name.includes('swim')) {
    return (
      <svg className={`w-6 h-6 flex-shrink-0 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
      </svg>
    );
  }
  
  // Gym / Fitness
  if (name.includes('gym') || name.includes('fitness')) {
    return (
      <svg className={`w-6 h-6 flex-shrink-0 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    );
  }
  
  // Restaurant / Dining / Food
  if (name.includes('restaurant') || name.includes('dining') || name.includes('food') || name.includes('drink')) {
    return (
      <svg className={`w-6 h-6 flex-shrink-0 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    );
  }
  
  // Shuttle / Transportation
  if (name.includes('shuttle') || name.includes('transport')) {
    return (
      <svg className={`w-6 h-6 flex-shrink-0 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    );
  }
  
  // Breakfast
  if (name.includes('breakfast')) {
    return (
      <svg className={`w-6 h-6 flex-shrink-0 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
      </svg>
    );
  }
  
  // Pets
  if (name.includes('pet')) {
    return (
      <svg className={`w-6 h-6 flex-shrink-0 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    );
  }
  
  // Spa / Wellness
  if (name.includes('spa') || name.includes('wellness')) {
    return (
      <svg className={`w-6 h-6 flex-shrink-0 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    );
  }
  
  // Business Center / Reception / Services
  if (name.includes('business') || name.includes('reception') || name.includes('service')) {
    return (
      <svg className={`w-6 h-6 flex-shrink-0 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    );
  }
  
  // Family Friendly / Things to do / Activities
  if (name.includes('family') || name.includes('things') || name.includes('activities')) {
    return (
      <svg className={`w-6 h-6 flex-shrink-0 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    );
  }
  
  // Accessibility
  if (name.includes('accessibility') || name.includes('accessible')) {
    return (
      <svg className={`w-6 h-6 flex-shrink-0 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  }
  
  // Default checkmark icon
  return (
    <svg className={`w-6 h-6 flex-shrink-0 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function PropertyDetail() {
  const { id } = useParams();
  const { isDarkMode } = useTheme();
  const [building, setBuilding] = useState(null);
  const [unitTypes, setUnitTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState('overview');
  
  // Search state
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [pricingData, setPricingData] = useState({});
  const [searchError, setSearchError] = useState('');
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  
  // Photo gallery state
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryInitialIndex, setGalleryInitialIndex] = useState(0);
  
  // Amenities modal state
  const [showAmenitiesModal, setShowAmenitiesModal] = useState(false);
  
  // Accordion state for policies
  const [openAccordion, setOpenAccordion] = useState(null);
  
  const overviewRef = useRef(null);
  const roomsRef = useRef(null);
  const accessibilityRef = useRef(null);
  const policiesRef = useRef(null);

  useEffect(() => {
    const fetchBuildingWithTypes = async () => {
      try {
        setLoading(true);
        const { buildingService } = await import('../api/buildings/buildingService');
        const response = await buildingService.getBuildingWithUnitTypes(id);
        
        if (response.success) {
          setBuilding(response.data.building);
          setUnitTypes(response.data.unitTypes);
        } else {
          setError('Building not found');
        }
      } catch (err) {
        console.error('Error fetching building:', err);
        setError('Failed to load property details');
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchBuildingWithTypes();
    }
  }, [id]);

  // Auto-update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { ref: overviewRef, name: 'overview' },
        { ref: roomsRef, name: 'rooms' },
        { ref: accessibilityRef, name: 'accessibility' },
        { ref: policiesRef, name: 'policies' }
      ];

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.ref.current) {
          const rect = section.ref.current.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section.name);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Call once on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (ref) => {
    if (ref.current) {
      const yOffset = -80;
      const y = ref.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Handle search for available rooms with pricing
  const handleSearch = async () => {
    if (!checkIn || !checkOut || !guests) {
      setSearchError('Please fill in all fields');
      return;
    }

    if (new Date(checkIn) >= new Date(checkOut)) {
      setSearchError('Check-out date must be after check-in date');
      return;
    }

    setSearchLoading(true);
    setSearchError('');
    const newPricingData = {};

    try {
      const { buildingService } = await import('../api/buildings/buildingService');

      // Get pricing for each unit type
      for (const unitTypeData of unitTypes) {
        try {
          const response = await buildingService.getBestAvailableUnit({
            unitType: unitTypeData.unitType,
            buildingId: id,
            checkIn,
            checkOut,
            guests: parseInt(guests)
          });

          if (response.success) {
            newPricingData[unitTypeData.unitType] = {
              unit: response.data.unit,
              pricing: response.data.pricing,
              available: true
            };
          }
        } catch (err) {
          console.error(`Error getting pricing for ${unitTypeData.unitType}:`, err);
          newPricingData[unitTypeData.unitType] = {
            available: false,
            error: err.response?.data?.message || 'Not available'
          };
        }
      }

      setPricingData(newPricingData);
      setSearchPerformed(true);
      
      // Scroll to rooms section
      if (roomsRef.current) {
        setTimeout(() => scrollToSection(roomsRef), 300);
      }
    } catch (err) {
      console.error('Error searching:', err);
      setSearchError('Failed to search. Please try again.');
    } finally {
      setSearchLoading(false);
    }
  };

  // Handle date change from DateRangePicker
  const handleDateChange = (startDate, endDate) => {
    setCheckIn(startDate);
    setCheckOut(endDate);
  };

  // Format date for display
  const formatDateDisplay = (dateString) => {
    if (!dateString) return '';
    return dayjs(dateString).format('MMM DD, YYYY');
  };

  // Get images for hero grid - prefer gallery, fallback to images
  const getHeroImages = () => {
    if (!building) {
      return [
        '/property_1.png',
        '/property_2.jpg',
        '/property_3.png',
        '/property_4.jpg',
        '/property_5.jpg',
        '/card-1.png',
        '/card-2.png',
        '/card-3.png'
      ];
    }
    
    // Try gallery first (new structure)
    let images = [];
    if (building.gallery?.length > 0) {
      images = building.gallery.map(img => img.url).filter(url => url);
    } else if (building.images?.length > 0) {
      // Fallback to legacy images
      images = building.images.map(img => img.url).filter(url => url);
    }
    
    // If still no images, use defaults with more variety
    if (images.length === 0) {
      return [
        '/property_1.png',
        '/property_2.jpg',
        '/property_3.png',
        '/property_4.jpg',
        '/property_5.jpg',
        '/card-1.png',
        '/card-2.png',
        '/card-3.png'
      ];
    }
    
    // Ensure we have at least 8 images by repeating
    while (images.length < 8) {
      images.push(...images.slice(0, Math.min(images.length, 8 - images.length)));
    }
    return images;
  };

  if (loading) {
    return (
      <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: isDarkMode ? '#0f0f0f' : '#FFF7F0' }}>
        <HomeHeader />
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-500"></div>
        </div>
        <ReviewsSection />
        <FooterSimple />
      </div>
    );
  }

  if (error || !building) {
    return (
      <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: isDarkMode ? '#0f0f0f' : '#FFF7F0' }}>
        <HomeHeader />
        <div className="text-center py-20 px-4">
          <h1 className={`text-3xl font-bold mb-4 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Property Not Found</h1>
          <p className={`mb-8 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{error || "Unable to load property details"}</p>
          <Link 
            to="/properties" 
            className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors inline-block no-underline"
          >
            Back to Properties
          </Link>
        </div>
        <ReviewsSection />
        <FooterSimple />
      </div>
    );
  }

  const heroImages = getHeroImages();
  const location = building.location?.city 
    ? `${building.location.address || ''}, ${building.location.city}, ${building.location.state || ''}, ${building.location.country || 'India'}`.replace(/,\s*,/g, ',').trim()
    : "Bangalore, Karnataka, India";

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: isDarkMode ? '#0f0f0f' : '#FFF7F0' }}>
      <HomeHeader />
      
      {/* Hero Image Grid - Desktop: 5 images, Mobile: Scrollable Carousel */}
      <div className="px-8 max-md:px-0 py-4 max-md:py-0">
        <div className="max-w-7xl mx-auto">
          {/* Desktop View - 5 Image Grid */}
          <div className="hidden md:flex gap-2 h-[400px]">
            {/* Left: 1 Large image (50% width) */}
            <div 
              className="w-1/2 cursor-pointer"
              onClick={() => {
                setGalleryImages(heroImages);
                setGalleryInitialIndex(0);
                setGalleryOpen(true);
              }}
            >
              <img 
                src={heroImages[0]} 
                alt={building.name}
                className="w-full h-full object-cover rounded-lg hover:opacity-90 transition-opacity"
              />
            </div>
            
            {/* Right: 4 small images in 2x2 grid (50% width) */}
            <div className="w-1/2 flex flex-col gap-2">
              <div className="flex gap-2 h-1/2">
                <div 
                  className="w-1/2 cursor-pointer"
                  onClick={() => {
                    setGalleryImages(heroImages);
                    setGalleryInitialIndex(1);
                    setGalleryOpen(true);
                  }}
                >
                  <img 
                    src={heroImages[1]} 
                    alt={building.name}
                    className="w-full h-full object-cover rounded-lg hover:opacity-90 transition-opacity"
                  />
                </div>
                <div 
                  className="w-1/2 cursor-pointer"
                  onClick={() => {
                    setGalleryImages(heroImages);
                    setGalleryInitialIndex(2);
                    setGalleryOpen(true);
                  }}
                >
                  <img 
                    src={heroImages[2]} 
                    alt={building.name}
                    className="w-full h-full object-cover rounded-lg hover:opacity-90 transition-opacity"
                  />
                </div>
              </div>
              <div className="flex gap-2 h-1/2">
                <div 
                  className="w-1/2 cursor-pointer"
                  onClick={() => {
                    setGalleryImages(heroImages);
                    setGalleryInitialIndex(3);
                    setGalleryOpen(true);
                  }}
                >
                  <img 
                    src={heroImages[3]} 
                    alt={building.name}
                    className="w-full h-full object-cover rounded-lg hover:opacity-90 transition-opacity"
                  />
                </div>
                <div 
                  className="w-1/2 cursor-pointer relative"
                  onClick={() => {
                    setGalleryImages(heroImages);
                    setGalleryInitialIndex(4);
                    setGalleryOpen(true);
                  }}
                >
                  <img 
                    src={heroImages[4]} 
                    alt={building.name}
                    className="w-full h-full object-cover rounded-lg hover:opacity-90 transition-opacity"
                  />
                  {/* View all photos overlay */}
                  <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center hover:bg-black/50 transition-colors">
                    <span className="text-white font-semibold" style={{ fontFamily: 'Petrona', fontSize: '16px' }}>
                      View all photos
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile View - Scrollable Carousel */}
          <div className="md:hidden h-[300px]">
            <ImageCarousel 
              images={heroImages} 
              onViewPhotos={() => {
                setGalleryImages(heroImages);
                setGalleryInitialIndex(0);
                setGalleryOpen(true);
              }}
            />
          </div>
        </div>
      </div>

      {/* Navigation - Simple sticky */}
      <div className={`border-b sticky top-0 z-30 px-8 max-md:px-4 transition-colors duration-300 ${isDarkMode ? 'border-gray-700' : 'bg-white border-gray-200'}`} style={{ backgroundColor: isDarkMode ? '#1a2421' : 'white' }}>
        <div className="max-w-7xl mx-auto">
          <nav className="flex gap-8 max-md:gap-4 overflow-x-auto">
            {[
              { name: 'Overview', ref: overviewRef, id: 'overview' },
              { name: 'Rooms', ref: roomsRef, id: 'rooms' },
              { name: 'Accessibility', ref: accessibilityRef, id: 'accessibility' },
              { name: 'Policies', ref: policiesRef, id: 'policies' }
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.ref)}
                className={`py-4 px-2 border-b-2 transition-colors whitespace-nowrap ${
                  activeSection === item.id
                    ? 'border-orange-600 text-orange-600 font-semibold'
                    : `border-transparent transition-colors duration-300 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`
                }`}
                style={{ fontFamily: 'Petrona', fontSize: '16px' }}
              >
                {item.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content - Clean sections with NO overlapping */}
      <div className="px-8 max-md:px-4 py-8 max-md:py-6">
        <div className="max-w-7xl mx-auto">
        
        {/* Overview Section */}
        <section ref={overviewRef} className="mb-16">
          <h1 
            className={` max-md:text-3xl transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
            style={{ fontFamily: 'Petrona', fontSize: '48px', fontWeight: 600 }}
          >
            {building.name}
          </h1>
          
          {/* Address - Moved above rating */}
          <p 
            className={`mb-5 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
            style={{ fontFamily: 'Petrona', fontSize: '16px' }}
          >
            {location}
          </p>
          
          {/* Rating with star - Moved below address */}
          <div className="flex items-center gap-2 mb-8">
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
              <span className={`font-bold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>4.8</span> from 120+ verified guest reviews
            </span>
          </div>

          {/* About this property */}
          <div className="mb-12 mt-12">
            {/* Desktop: Two-column layout, Mobile: Stacked */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-8">
              {/* Left Column: Headings */}
              <div className="md:pr-7">
                <p 
                  className="mb-3 text-sm md:text-base font-medium tracking-wider uppercase"
                  style={{ 
                    color: isDarkMode ? '#DE754B' : '#0B8043',
                    fontFamily: 'Work Sans',
                    letterSpacing: '0.2em'
                  }}
                >
                  ABOUT THIS SPACE
                </p>
                <h2 
                  className={`transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                  style={{ 
                    fontFamily: 'Petrona', 
                    fontSize: window.innerWidth < 768 ? '36px' : '48px',
                    fontWeight: 400,
                    lineHeight: '120%',
                    letterSpacing: '-0.02em'
                  }}
                >
                  A home that holds your whole day.
                </h2>
              </div>

              {/* Right Column: Description Content */}
              <div className="space-y-6">
                <p 
                  className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                  style={{ 
                    fontFamily: 'Work Sans', 
                    fontSize: '16px', 
                    lineHeight: '160%',
                    fontWeight: 400
                  }}
                >
                  Designed for longer stays, Hodo apartments give you room to work, reset, and live like a local. Expect a full kitchen, work-ready Wi-Fi, and quiet comfort — with hotel-grade housekeeping that keeps everything effortless.
                </p>
                
                <p 
                  className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                  style={{ 
                    fontFamily: 'Work Sans', 
                    fontSize: '16px', 
                    lineHeight: '160%',
                    fontWeight: 400
                  }}
                >
                  Step outside and you're close to cafés, daily essentials, and the city's business hubs — the kind of urban convenience that makes weeks feel easy.
                </p>
              </div>
            </div>
            
            {/* Amenities Section with proper spacing */}
            <div className="mt-12 pt-8 border-t" style={{ borderColor: isDarkMode ? '#333333' : '#E5E7EB' }}>
              <h3 
                className={`mb-6 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                style={{ 
                  fontFamily: 'Petrona', 
                  fontSize: '24px',
                  fontWeight: 600,
                  letterSpacing: '-0.01em'
                }}
              >
                Amenities
              </h3>
              
              {/* Amenities Grid - Simple 2-column layout with icons */}
              <div className="grid grid-cols-2 gap-x-8 gap-y-4 max-md:grid-cols-1 mb-6">
                {(building.amenities && building.amenities.length > 0 ? building.amenities : ['WiFi', 'Air Conditioning', 'Kitchen', 'Parking', 'Washing Machine', 'TV']).slice(0, 6).map((amenity, index) => {
                  // Handle both old (string) and new (object) format
                  const amenityName = typeof amenity === 'string' ? amenity : (amenity.name || amenity.amenityID || '');
                  
                  return (
                    <div key={index} className="flex items-center gap-3">
                      {getAmenityIcon(amenityName, isDarkMode)}
                      <span className={`transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Petrona', fontSize: '16px' }}>
                        {amenityName}
                      </span>
                    </div>
                  );
                })}
              </div>
              
              {/* See all amenities link - Always show with arrow */}
              <button
                onClick={() => setShowAmenitiesModal(true)}
                className={`flex items-center gap-2 text-base font-medium transition-colors duration-300 ${
                  isDarkMode ? 'text-[#DE754B] hover:text-[#ff9d6b]' : 'text-[#0B8043] hover:text-[#0a6d38]'
                }`}
                style={{ fontFamily: 'Petrona' }}
              >
                See all amenities
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* Rooms Section */}
        <section ref={roomsRef} className="mb-16">
          <div className="mb-8">
            <p 
              className="mb-2 text-sm md:text-base font-medium tracking-wider uppercase"
              style={{ 
                color: isDarkMode ? '#DE754B' : '#0B8043',
                fontFamily: 'Work Sans'
              }}
            >
              ROOMS
            </p>
            <h2 
              className={`mb-4 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
              style={{ fontFamily: 'Petrona', fontSize: '48px', fontWeight: 400, lineHeight: '150%', letterSpacing: '-2.2%' }}
            >
              Choose your rhythm
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
              Flexible configurations for solo stays, couples, teams, and longer relocations.
            </p>
          </div>

          {/* Search Section - Check Availability & Pricing */}
          <div className="mb-8 relative">
            <div className={`rounded-2xl shadow-md p-6 border transition-colors duration-300 ${isDarkMode ? 'bg-[#1a1a1a] border-[#333333]' : 'bg-white border-gray-200'}`} style={{ backgroundColor: isDarkMode ? '#1a1a1a' : '#FAF2E8' }}>
              <h3 className={`mb-6 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Petrona', fontSize: '24px', fontWeight: 600 }}>
                Check Availability & Pricing
              </h3>
              
              <div className="flex flex-col md:flex-row gap-4">
                {/* Check-in Date */}
                <div className="flex-1">
                  <label className={`block mb-2 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-700'}`} style={{ fontFamily: 'Petrona', fontSize: '14px', fontWeight: 500 }}>
                    Check-in
                  </label>
                  <div
                    onClick={() => setIsDatePickerOpen(true)}
                    className={`w-full px-4 py-4 border-2 rounded-lg cursor-pointer hover:border-orange-500 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500 flex items-center justify-between transition-colors ${
                      isDarkMode 
                        ? 'bg-black border-[#333333]' 
                        : 'bg-white border-gray-300'
                    }`}
                    style={{ fontFamily: 'Petrona' }}
                  >
                    <span className={checkIn ? (isDarkMode ? 'text-gray-200' : 'text-gray-900') : 'text-gray-400'}>
                      {checkIn ? formatDateDisplay(checkIn) : 'Select date'}
                    </span>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>

                {/* Check-out Date */}
                <div className="flex-1">
                  <label className={`block mb-2 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-700'}`} style={{ fontFamily: 'Petrona', fontSize: '14px', fontWeight: 500 }}>
                    Check-out
                  </label>
                  <div
                    onClick={() => setIsDatePickerOpen(true)}
                    className={`w-full px-4 py-4 border-2 rounded-lg cursor-pointer hover:border-orange-500 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500 flex items-center justify-between transition-colors ${
                      isDarkMode 
                        ? 'bg-black border-[#333333]' 
                        : 'bg-white border-gray-300'
                    }`}
                    style={{ fontFamily: 'Petrona' }}
                  >
                    <span className={checkOut ? (isDarkMode ? 'text-gray-200' : 'text-gray-900') : 'text-gray-400'}>
                      {checkOut ? formatDateDisplay(checkOut) : 'Select date'}
                    </span>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>

                {/* Guests with +/- buttons */}
                <div className="w-full md:w-48">
                  <label className={`block mb-2 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-700'}`} style={{ fontFamily: 'Petrona', fontSize: '14px', fontWeight: 500 }}>
                    Guests
                  </label>
                  <div className={`flex items-center border-2 rounded-lg overflow-hidden transition-colors ${
                    isDarkMode 
                      ? 'bg-black border-[#333333]' 
                      : 'bg-white border-gray-300'
                  }`}>
                    <button
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      className={`px-4 py-4 font-bold text-white transition-colors ${
                        isDarkMode 
                          ? 'bg-black hover:bg-orange-500' 
                          : 'bg-orange-500 hover:bg-orange-600'
                      }`}
                      style={{ fontFamily: 'Petrona' }}
                    >
                      −
                    </button>
                    <div className={`flex-1 text-center py-4 font-medium transition-colors ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`} style={{ fontFamily: 'Petrona' }}>
                      {guests}
                    </div>
                    <button
                      onClick={() => setGuests(Math.min(10, guests + 1))}
                      className={`px-4 py-4 font-bold text-white transition-colors ${
                        isDarkMode 
                          ? 'bg-black hover:bg-orange-500' 
                          : 'bg-orange-500 hover:bg-orange-600'
                      }`}
                      style={{ fontFamily: 'Petrona' }}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Search Button */}
                <div className="flex items-end">
                  <button
                    onClick={handleSearch}
                    disabled={searchLoading || !checkIn || !checkOut || !guests}
                    className="w-full md:w-auto bg-orange-600 text-white px-8 py-4 rounded-lg hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
                    style={{ fontFamily: 'Petrona', fontSize: '16px', fontWeight: 500 }}
                  >
                    {searchLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Searching...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        Search
                      </>
                    )}
                  </button>
                </div>
              </div>

              {searchError && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800" style={{ fontFamily: 'Petrona', fontSize: '14px' }}>
                    {searchError}
                  </p>
                </div>
              )}

              {/* Date Range Picker Dropdown */}
              <DateRangePicker
                isOpen={isDatePickerOpen}
                onClose={() => setIsDatePickerOpen(false)}
                checkIn={checkIn}
                checkOut={checkOut}
                onDateChange={handleDateChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-md:gap-4">
            {unitTypes.map((unitTypeData) => {
              const rep = unitTypeData.representativeUnit;
              const images = rep?.images?.length > 0 
                ? rep.images.map(img => img.url).filter(url => url)
                : ["/card-1.png"];

              // Get pricing data for this unit type
              const unitPricing = pricingData[unitTypeData.unitType];
              const hasPrice = unitPricing && unitPricing.available;
              const priceError = unitPricing && !unitPricing.available ? unitPricing.error : null;

              return (
                <div
                  key={unitTypeData.unitType}
                  className={`rounded-2xl max-md:rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden ${isDarkMode ? '' : 'bg-white'}`}
                  style={{ backgroundColor: isDarkMode ? '#1a1a1a' : '#FAF2E8' }}
                >
                  {/* Mobile-style card layout */}
                  <div className="relative h-[280px] overflow-hidden">
                    <ImageCarousel 
                      images={images} 
                      onViewPhotos={() => {
                        setGalleryImages(images);
                        setGalleryInitialIndex(0);
                        setGalleryOpen(true);
                      }}
                    />
                    
                    {/* Black gradient overlay at bottom */}
                    <div 
                      className="absolute bottom-0 left-0 right-0 h-32 z-10 pointer-events-none"
                      style={{
                        background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)'
                      }}
                    />
                    
                    {/* Unit type name and guest info on image */}
                    <div className="absolute bottom-4 left-4 right-4 z-20 pointer-events-none">
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
                        {unitTypeData.unitType}
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
                        {rep?.standardGuests || 2} guests • {rep?.compositionRooms?.length || 1} bedroom
                      </p>
                    </div>
                  </div>

                  {/* Content below image */}
                  <div className="p-4">
                    {/* Rating with star */}
                    <div className="flex items-center gap-2 mb-3">
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
                        Rated <span className={`font-bold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>4.8 </span> from 120+ reviews
                      </span>
                    </div>

                    {/* Circular scrollable amenities */}
                    <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                      <style>{`
                        .scrollbar-hide::-webkit-scrollbar {
                          display: none;
                        }
                      `}</style>
                      
                      <div className="flex items-center gap-2 px-3 py-2 rounded-full whitespace-nowrap" style={{ backgroundColor: isDarkMode ? '#2a2a2a' : '#F3F4F6' }}>
                        <svg className="w-4 h-4 flex-shrink-0" style={{ color: isDarkMode ? '#9CA3AF' : '#6B7280' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <span
                          className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                          style={{ fontFamily: 'Petrona' }}
                        >
                          Fully Furnished
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2 px-3 py-2 rounded-full whitespace-nowrap" style={{ backgroundColor: isDarkMode ? '#2a2a2a' : '#F3F4F6' }}>
                        <svg className="w-4 h-4 flex-shrink-0" style={{ color: isDarkMode ? '#9CA3AF' : '#6B7280' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                        <span
                          className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                          style={{ fontFamily: 'Petrona' }}
                        >
                          Housekeeping
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2 px-3 py-2 rounded-full whitespace-nowrap" style={{ backgroundColor: isDarkMode ? '#2a2a2a' : '#F3F4F6' }}>
                        <svg className="w-4 h-4 flex-shrink-0" style={{ color: isDarkMode ? '#9CA3AF' : '#6B7280' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                        </svg>
                        <span
                          className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                          style={{ fontFamily: 'Petrona' }}
                        >
                          WiFi
                        </span>
                      </div>
                    </div>

                    {/* Price & action */}
                    <div className="flex items-center justify-between gap-4 mt-4">
                      <div>
                        {hasPrice ? (
                          <>
                            <div
                              className={`mb-1 transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                              style={{
                                fontFamily: 'Petrona',
                                fontWeight: 400,
                                fontSize: '12px'
                              }}
                            >
                              Total for {unitPricing.pricing.nights} nights
                            </div>
                            <div className="flex items-baseline gap-1">
                              <span
                                className="transition-colors duration-300"
                                style={{
                                  color: isDarkMode ? '#E5E7EB' : '#4A4A4A',
                                  fontFamily: 'Petrona',
                                  fontWeight: 600,
                                  fontSize: '28px',
                                  lineHeight: '100%',
                                  letterSpacing: '-2.2%'
                                }}
                              >
                                ₹ {Math.round(unitPricing.pricing.price).toLocaleString()}
                              </span>
                              <span
                                className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                                style={{
                                  fontFamily: 'Work Sans',
                                  fontWeight: 400,
                                  fontSize: '14px',
                                  marginTop: '8px'
                                }}
                              >
                                onwards
                              </span>
                            </div>
                            <div
                              className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                              style={{
                                fontFamily: 'Petrona',
                                fontWeight: 400,
                                fontSize: '11px'
                              }}
                            >
                              ₹ {Math.round(unitPricing.pricing.pricePerNight).toLocaleString()}/night
                            </div>
                          </>
                        ) : priceError ? (
                          <div className="p-2 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-800 text-xs" style={{ fontFamily: 'Petrona' }}>
                              {priceError}
                            </p>
                          </div>
                        ) : (
                          <>
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
                                  fontSize: '28px',
                                  lineHeight: '100%',
                                  letterSpacing: '-2.2%'
                                }}
                              >
                                ₹ 5000
                              </span>
                              <span
                                className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                                style={{
                                  fontFamily: 'Petrona',
                                  fontWeight: 400,
                                  fontSize: '12px',
                                  marginLeft: '4px'
                                }}
                              >
                                / night
                              </span>
                            </div>
                          </>
                        )}
                      </div>

                      <div className="flex-shrink-0">
                        {hasPrice ? (
                          <Link
                            to={`/booking-details/${unitPricing.unit._id}?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`}
                            className="block bg-orange-500 text-white px-6 py-2.5 rounded-full hover:bg-orange-600 no-underline font-medium text-center whitespace-nowrap"
                            style={{ fontFamily: 'Petrona', fontSize: '14px' }}
                          >
                            Book now
                          </Link>
                        ) : (
                          <button
                            disabled
                            className="bg-gray-400 text-white px-6 py-2.5 rounded-full cursor-not-allowed font-medium whitespace-nowrap"
                            style={{ fontFamily: 'Petrona', fontSize: '14px' }}
                          >
                            {searchPerformed ? 'Not Available' : 'Search to Book'}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Accessibility Section */}
        <section ref={accessibilityRef} className="mb-16">
          <h2 
            className={`mb-6 max-md:text-2xl transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
            style={{ fontFamily: 'Petrona', fontSize: '36px', fontWeight: 600 }}
          >
            Accessibility
          </h2>
          <p 
            className={`mb-8 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
            style={{ fontFamily: 'Petrona', fontSize: '16px' }}
          >
            If you have requests for specific accessibility needs, please contact the property using the information on the reservation confirmation received after booking.
          </p>
          
          {/* Common areas - No card background */}
          <div className={`border-b pb-6 transition-colors duration-300 ${isDarkMode ? 'border-[#333333]' : 'border-gray-200'}`}>
            <h3 
              className={`mb-4 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
              style={{ fontFamily: 'Petrona', fontSize: '20px', fontWeight: 400 }}
            >
              Common areas
            </h3>
            <ul className={`space-y-2 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`} style={{ fontFamily: 'Work Sans', fontSize: '15px', lineHeight: '1.6' }}>
              <li>• No elevator</li>
              <li>• Well-lit path to entrance</li>
            </ul>
          </div>
        </section>

        {/* Policies Section */}
        <section ref={policiesRef} className="mb-16">
          <div className="mb-8">
            <p 
              className="mb-2 text-sm md:text-base font-medium tracking-wider uppercase"
              style={{ 
                color: isDarkMode ? '#DE754B' : '#0B8043',
                fontFamily: 'Work Sans',
                letterSpacing: '0.2em'
              }}
            >
              POLICIES & FAQS
            </p>
            <h2 
              className={`transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
              style={{ 
                fontFamily: 'Petrona', 
                fontSize: window.innerWidth < 768 ? '36px' : '48px',
                fontWeight: 400,
                lineHeight: '120%',
                letterSpacing: '-0.02em'
              }}
            >
              Everything, clearly
            </h2>
          </div>
          
          {/* Accordion-style policies - 2 columns on desktop, 1 on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
            {/* Check-in & check-out */}
            <div className={`border-b transition-colors duration-300 ${isDarkMode ? 'border-[#333333]' : 'border-gray-200'}`}>
              <button
                className="w-full py-6 pr-4 flex justify-between items-center text-left hover:opacity-80 transition-opacity cursor-pointer"
                onClick={() => setOpenAccordion(openAccordion === 'checkin' ? null : 'checkin')}
              >
                <span 
                  className={`transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                  style={{ fontFamily: 'Petrona', fontSize: '20px', fontWeight: 400 }}
                >
                  Check-in & check-out
                </span>
                <svg 
                  className={`w-5 h-5 transition-all duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} ${openAccordion === 'checkin' ? 'rotate-180' : 'rotate-0'}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div 
                className={`overflow-hidden transition-all duration-500 ease-in-out ${openAccordion === 'checkin' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className={`pb-6 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`} style={{ fontFamily: 'Work Sans', fontSize: '15px', lineHeight: '1.6' }}>
                  <p className="mb-2">Check-in: 2:00 PM - midnight</p>
                  <p className="mb-2">Check-out: Before noon</p>
                  <p>Minimum check-in age: 18</p>
                </div>
              </div>
            </div>

            {/* Housekeeping */}
            <div className={`border-b transition-colors duration-300 ${isDarkMode ? 'border-[#333333]' : 'border-gray-200'}`}>
              <button
                className="w-full py-6 pr-4 flex justify-between items-center text-left hover:opacity-80 transition-opacity cursor-pointer"
                onClick={() => setOpenAccordion(openAccordion === 'housekeeping' ? null : 'housekeeping')}
              >
                <span 
                  className={`transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                  style={{ fontFamily: 'Petrona', fontSize: '20px', fontWeight: 400 }}
                >
                  Housekeeping
                </span>
                <svg 
                  className={`w-5 h-5 transition-all duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} ${openAccordion === 'housekeeping' ? 'rotate-180' : 'rotate-0'}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div 
                className={`overflow-hidden transition-all duration-500 ease-in-out ${openAccordion === 'housekeeping' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className={`pb-6 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`} style={{ fontFamily: 'Work Sans', fontSize: '15px', lineHeight: '1.6' }}>
                  <p className="mb-2">Weekly housekeeping included for stays over 7 days</p>
                  <p>Additional cleaning available on request</p>
                </div>
              </div>
            </div>

            {/* Long stays */}
            <div className={`border-b transition-colors duration-300 ${isDarkMode ? 'border-[#333333]' : 'border-gray-200'}`}>
              <button
                className="w-full py-6 pr-4 flex justify-between items-center text-left hover:opacity-80 transition-opacity cursor-pointer"
                onClick={() => setOpenAccordion(openAccordion === 'longstays' ? null : 'longstays')}
              >
                <span 
                  className={`transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                  style={{ fontFamily: 'Petrona', fontSize: '20px', fontWeight: 400 }}
                >
                  Long stays
                </span>
                <svg 
                  className={`w-5 h-5 transition-all duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} ${openAccordion === 'longstays' ? 'rotate-180' : 'rotate-0'}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div 
                className={`overflow-hidden transition-all duration-500 ease-in-out ${openAccordion === 'longstays' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className={`pb-6 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`} style={{ fontFamily: 'Work Sans', fontSize: '15px', lineHeight: '1.6' }}>
                  <p className="mb-2">Discounted rates for stays over 28 days</p>
                  <p>Flexible lease terms available</p>
                </div>
              </div>
            </div>

            {/* Cancellation */}
            <div className={`border-b transition-colors duration-300 ${isDarkMode ? 'border-[#333333]' : 'border-gray-200'}`}>
              <button
                className="w-full py-6 pr-4 flex justify-between items-center text-left hover:opacity-80 transition-opacity cursor-pointer"
                onClick={() => setOpenAccordion(openAccordion === 'cancellation' ? null : 'cancellation')}
              >
                <span 
                  className={`transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                  style={{ fontFamily: 'Petrona', fontSize: '20px', fontWeight: 400 }}
                >
                  Cancellation
                </span>
                <svg 
                  className={`w-5 h-5 transition-all duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} ${openAccordion === 'cancellation' ? 'rotate-180' : 'rotate-0'}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div 
                className={`overflow-hidden transition-all duration-500 ease-in-out ${openAccordion === 'cancellation' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className={`pb-6 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`} style={{ fontFamily: 'Work Sans', fontSize: '15px', lineHeight: '1.6' }}>
                  <p className="mb-2">Free cancellation up to 48 hours before check-in</p>
                  <p>50% refund for cancellations within 48 hours</p>
                </div>
              </div>
            </div>

            {/* Payments */}
            <div className={`border-b transition-colors duration-300 ${isDarkMode ? 'border-[#333333]' : 'border-gray-200'}`}>
              <button
                className="w-full py-6 pr-4 flex justify-between items-center text-left hover:opacity-80 transition-opacity cursor-pointer"
                onClick={() => setOpenAccordion(openAccordion === 'payments' ? null : 'payments')}
              >
                <span 
                  className={`transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                  style={{ fontFamily: 'Petrona', fontSize: '20px', fontWeight: 400 }}
                >
                  Payments
                </span>
                <svg 
                  className={`w-5 h-5 transition-all duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} ${openAccordion === 'payments' ? 'rotate-180' : 'rotate-0'}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div 
                className={`overflow-hidden transition-all duration-500 ease-in-out ${openAccordion === 'payments' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className={`pb-6 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`} style={{ fontFamily: 'Work Sans', fontSize: '15px', lineHeight: '1.6' }}>
                  <p className="mb-2">We accept all major credit cards and UPI</p>
                  <p>Security deposit may be required</p>
                </div>
              </div>
            </div>

            {/* Additional policies */}
            <div className={`border-b transition-colors duration-300 ${isDarkMode ? 'border-[#333333]' : 'border-gray-200'}`}>
              <button
                className="w-full py-6 pr-4 flex justify-between items-center text-left hover:opacity-80 transition-opacity cursor-pointer"
                onClick={() => setOpenAccordion(openAccordion === 'additional' ? null : 'additional')}
              >
                <span 
                  className={`transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                  style={{ fontFamily: 'Petrona', fontSize: '20px', fontWeight: 400 }}
                >
                  Additional policies
                </span>
                <svg 
                  className={`w-5 h-5 transition-all duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} ${openAccordion === 'additional' ? 'rotate-180' : 'rotate-0'}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div 
                className={`overflow-hidden transition-all duration-500 ease-in-out ${openAccordion === 'additional' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className={`pb-6 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`} style={{ fontFamily: 'Work Sans', fontSize: '15px', lineHeight: '1.6' }}>
                  <p className="mb-2">No smoking inside the property</p>
                  <p className="mb-2">Pets allowed with prior approval</p>
                  <p>Quiet hours: 10 PM - 8 AM</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      </div>

      <ReviewsSection />
      <FooterSimple />

      {/* Photo Gallery Modal */}
      <PhotoGallery
        images={galleryImages}
        isOpen={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        initialIndex={galleryInitialIndex}
      />
      
      {/* Amenities Modal */}
      <AmenitiesModal
        amenities={building?.amenities || []}
        isOpen={showAmenitiesModal}
        onClose={() => setShowAmenitiesModal(false)}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}

export default PropertyDetail;
