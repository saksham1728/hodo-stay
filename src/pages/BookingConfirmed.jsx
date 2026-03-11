import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import HomeHeader from '../components/HomeHeader'
import FooterSimple from '../components/FooterSimple'
import { bookingService } from '../api/bookings/bookingService'
import { useTheme } from '../context/ThemeContext'

// Helper function to format currency
const formatCurrency = (amount, currency = 'USD') => {
  const localeMap = {
    'USD': 'en-US',
    'INR': 'en-IN',
    'EUR': 'en-EU'
  }
  
  return new Intl.NumberFormat(localeMap[currency] || 'en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

const BookingConfirmed = () => {
  const { bookingReference } = useParams()
  const { isDarkMode } = useTheme()
  const [booking, setBooking] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch booking details
  useEffect(() => {
    const fetchBooking = async () => {
      if (!bookingReference) {
        setError('No booking reference provided')
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const response = await bookingService.getBookingByReference(bookingReference)
        
        if (response.success) {
          setBooking(response.data.booking)
        } else {
          setError('Booking not found')
        }
      } catch (err) {
        setError(err.message || 'Failed to load booking details')
        console.error('Error fetching booking:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchBooking()
  }, [bookingReference])

  // Format date for display
  const formatDateForDisplay = (dateStr) => {
    if (!dateStr) return { day: '', month: '', weekday: '' }
    const date = new Date(dateStr)
    const day = date.getDate()
    const month = date.toLocaleDateString('en-US', { month: 'long' })
    const weekday = date.toLocaleDateString('en-US', { weekday: 'long' })
    const ordinal = getOrdinalSuffix(day)
    return { day: `${day}${ordinal}`, month, weekday }
  }

  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return 'th'
    switch (day % 10) {
      case 1: return 'st'
      case 2: return 'nd'
      case 3: return 'rd'
      default: return 'th'
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: isDarkMode ? '#0f0f0f' : '#FFF7F0' }}>
        <HomeHeader />
        <div className="flex justify-center items-center py-20">
          <div className="text-center">
            <div className={`animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4 ${isDarkMode ? 'border-orange-400' : 'border-gray-900'}`}></div>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Loading booking details...</p>
          </div>
        </div>
        <FooterSimple />
      </div>
    )
  }

  // Error state
  if (error || !booking) {
    return (
      <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: isDarkMode ? '#0f0f0f' : '#FFF7F0' }}>
        <HomeHeader />
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <div className={`rounded-lg shadow-sm p-8 transition-colors duration-300 ${isDarkMode ? 'bg-[#1a1a1a]' : 'bg-white'}`}>
            <h1 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Booking Not Found</h1>
            <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{error || 'The booking you are looking for does not exist.'}</p>
            <Link to="/properties" className={`hover:underline ${isDarkMode ? 'text-orange-400' : 'text-blue-600'}`}>
              Back to Properties
            </Link>
          </div>
        </div>
        <FooterSimple />
      </div>
    )
  }

  // Format dates
  const checkInFormatted = formatDateForDisplay(booking.checkIn)
  const checkOutFormatted = formatDateForDisplay(booking.checkOut)
  
  // Typography styles
  const excitedStyle = {
    fontFamily: 'Petrona, serif',
    fontWeight: 500,
    fontSize: '50px',
    lineHeight: '100%',
    letterSpacing: '-2.2%',
    margin: 0,
  }

  const bookingHeadingStyle = {
    fontFamily: 'Petrona, serif',
    fontWeight: 500,
    fontSize: '35px',
    lineHeight: '100%',
    letterSpacing: '-2.2%',
    margin: 0,
  }

  const propertyTitleStyle = {
    fontFamily: 'Petrona, serif',
    fontWeight: 400,
    fontSize: '28px',
    lineHeight: '150%',
    letterSpacing: '-2.2%',
    margin: 0,
  }

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: isDarkMode ? '#0f0f0f' : '#FFF7F0' }}>
      <HomeHeader />

      {/* Top banner */}
      <div className="w-full transition-colors duration-300" style={{ backgroundColor: isDarkMode ? '#1a1a1a' : '#2D3A36', minHeight: 80 }}>
        <div className="max-w-7xl mx-auto flex items-center px-4 sm:px-6 py-4" style={{ minHeight: 80 }}>
          <div className="w-full">
            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl" style={{ ...excitedStyle, fontSize: 'inherit' }}>
              We are excited to have you stay with us!
            </h1>
            <p className={`mt-2 text-xs sm:text-sm break-all ${isDarkMode ? 'text-gray-300' : 'text-white/70'}`} style={{ fontFamily: 'Work Sans' }}>
              Booking Reference: <span className="font-mono font-bold">{booking.bookingReference}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="flex justify-center px-4 sm:px-6 py-6 sm:py-10">
        <div className="w-full max-w-7xl">
          <div className="flex gap-4 sm:gap-6 lg:gap-8 items-start flex-col lg:flex-row">
            {/* LEFT: Booking Confirmed card */}
            <div
              className={`rounded-2xl sm:rounded-[28px] p-4 sm:p-6 lg:p-8 shadow-lg w-full lg:flex-1 transition-colors duration-300 ${isDarkMode ? 'bg-[#1a1a1a] border border-gray-800' : 'bg-white'}`}
            >
              {/* Header */}
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 ${isDarkMode ? 'bg-green-500' : 'bg-green-600'}`}>
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                <h2 className={`text-xl sm:text-2xl lg:text-3xl ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} style={{ ...bookingHeadingStyle, fontSize: 'inherit' }}>
                  Booking Confirmed
                </h2>
              </div>

              {/* Two-column content: image left, details right */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
                {/* Square image on left */}
                <div className="flex-shrink-0 w-full sm:w-auto">
                  <img
                    src={booking.unitId?.images?.[0]?.url || "/property_1.png"}
                    alt={booking.unitId?.name || "Property"}
                    className="block w-full sm:w-32 md:w-40 lg:w-44 h-48 sm:h-32 md:h-40 lg:h-44 rounded-2xl object-cover"
                  />
                </div>

                {/* Right side details */}
                <div className="flex-1 min-w-0">
                  {/* Title */}
                  <h3 className={`mb-2 sm:mb-3 text-lg sm:text-xl lg:text-2xl break-words ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ ...propertyTitleStyle, fontSize: 'inherit' }}>
                    {booking.unitId?.name || 'Property'}
                  </h3>

                  {/* Building name */}
                  <p className={`mb-2 text-xs sm:text-sm break-words ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} style={{ fontFamily: "'Work Sans', sans-serif" }}>
                    {booking.buildingId?.name || 'Building'}
                  </p>

                  {/* Room details link */}
                  <p className="mb-4 sm:mb-6">
                    <Link to={`/property/${booking.unitId?._id}`} className={`underline text-sm sm:text-base ${isDarkMode ? 'text-orange-400 hover:text-orange-300' : 'text-gray-600 hover:text-gray-800'}`} style={{ fontFamily: "'Work Sans', sans-serif" }}>
                      Room details
                    </Link>
                  </p>

                  {/* Check-in / arrow / Check-out row */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-4">
                    {/* Check-in block */}
                    <div className="flex-1">
                      <p className={`mb-1 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>check-in</p>
                      <div className="flex items-baseline gap-2 sm:gap-3">
                        <p className={`text-2xl sm:text-3xl lg:text-4xl ${isDarkMode ? 'text-orange-400' : 'text-[#355047]'}`} style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 600 }}>
                          {checkInFormatted.day.replace(/\d+(st|nd|rd|th)/, (match) => {
                            const num = match.slice(0, -2)
                            const suffix = match.slice(-2)
                            return `${num}`
                          })}<sup className="text-sm sm:text-base">{checkInFormatted.day.slice(-2)}</sup>
                        </p>
                        <p className={`text-2xl sm:text-3xl lg:text-4xl ${isDarkMode ? 'text-orange-400' : 'text-[#355047]'}`} style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 600 }}>{checkInFormatted.month}</p>
                      </div>
                      <p className={`mt-1 text-xs break-words ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{checkInFormatted.weekday}, {booking.unitId?.checkInOut?.checkInFrom || '2pm'}</p>
                    </div>

                    {/* Arrow */}
                    <div className="px-2 sm:px-4 flex items-center">
                      <svg className={`w-6 h-6 sm:w-8 sm:h-8 rotate-90 sm:rotate-0 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>

                    {/* Check-out block */}
                    <div className="flex-1 sm:text-right">
                      <p className={`mb-1 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>check-out</p>
                      <div className="flex items-baseline sm:justify-end gap-2 sm:gap-3">
                        <p className={`text-2xl sm:text-3xl lg:text-4xl ${isDarkMode ? 'text-orange-400' : 'text-[#355047]'}`} style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 600 }}>
                          {checkOutFormatted.day.replace(/\d+(st|nd|rd|th)/, (match) => {
                            const num = match.slice(0, -2)
                            return `${num}`
                          })}<sup className="text-sm sm:text-base">{checkOutFormatted.day.slice(-2)}</sup>
                        </p>
                        <p className={`text-2xl sm:text-3xl lg:text-4xl ${isDarkMode ? 'text-orange-400' : 'text-[#355047]'}`} style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 600 }}>{checkOutFormatted.month}</p>
                      </div>
                      <p className={`mt-1 text-xs break-words ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{checkOutFormatted.weekday}, {booking.unitId?.checkInOut?.checkOutUntil || '11am'}</p>
                    </div>
                  </div>

                  {/* Guests */}
                  <p className={`text-base sm:text-lg lg:text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: "'Work Sans', sans-serif" }}>
                    {booking.numberOfAdults} Adult{booking.numberOfAdults !== 1 ? 's' : ''}
                    {booking.numberOfChildren > 0 && `, ${booking.numberOfChildren} Child${booking.numberOfChildren !== 1 ? 'ren' : ''}`}
                  </p>
                  
                  {/* Guest Info */}
                  <div className={`mt-3 sm:mt-4 pt-3 sm:pt-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <p className={`mb-1 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Guest Name</p>
                    <p className={`text-sm sm:text-base font-medium break-words ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: "'Work Sans', sans-serif" }}>
                      {booking.guestInfo.name} {booking.guestInfo.surname}
                    </p>
                    <p className={`mt-2 text-xs break-all ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{booking.guestInfo.email}</p>
                    <p className={`text-xs break-words ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{booking.guestInfo.phone}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: Payment Summary card */}
            <div
              className={`rounded-2xl sm:rounded-[28px] p-4 sm:p-6 lg:p-8 shadow-lg w-full lg:w-auto lg:flex-shrink-0 transition-colors duration-300 ${isDarkMode ? 'bg-[#1a1a1a] border border-gray-800' : 'bg-white'}`}
            >
              <h3
                className={`mb-4 sm:mb-6 text-2xl sm:text-3xl lg:text-4xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                style={{
                  fontFamily: 'sans',
                  fontWeight: 400,
                  lineHeight: '150%',
                  letterSpacing: '-2.2%',
                }}
              >
                Payment Summary
              </h3>

              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                <div className="flex justify-between items-start gap-2">
                  <span className={`text-xs sm:text-sm break-words flex-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {booking.unitId?.name || 'Room'} x {booking.nights} Night{booking.nights !== 1 ? 's' : ''}
                  </span>
                  <span className={`font-semibold text-sm sm:text-base whitespace-nowrap ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {formatCurrency(booking.pricing.clientPrice, booking.pricing.currency)}
                  </span>
                </div>

                {booking.pricing.taxes > 0 && (
                  <div className="flex justify-between items-start gap-2">
                    <span className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Taxes and other charges</span>
                    <span className={`font-semibold text-sm sm:text-base whitespace-nowrap ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{formatCurrency(booking.pricing.taxes, booking.pricing.currency)}</span>
                  </div>
                )}

                {booking.appliedCoupon && (
                  <div className="flex justify-between items-start gap-2">
                    <span className={`text-xs sm:text-sm break-words ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Coupon ({booking.appliedCoupon})</span>
                    <span className={`font-semibold text-sm sm:text-base whitespace-nowrap ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>Applied</span>
                  </div>
                )}

                <hr className={`${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`} />

                <div className="flex justify-between items-start gap-2">
                  <span className={`text-base sm:text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Amount Paid</span>
                  <span className={`text-base sm:text-lg font-bold whitespace-nowrap ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {formatCurrency(booking.pricing.alreadyPaid, booking.pricing.currency)}
                  </span>
                </div>
              </div>

              <div className={`rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-4 sm:mb-6 ${isDarkMode ? 'bg-[#0f0f0f]' : 'bg-gray-50'}`}>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                  <span className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Payment Method:</span>
                  <span className={`font-medium text-xs sm:text-sm capitalize ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {booking.paymentMethod || 'Card'}
                  </span>
                </div>
                <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Status: </span>
                  <span className={`font-medium text-xs sm:text-sm ${
                    booking.status === 'confirmed' ? (isDarkMode ? 'text-green-400' : 'text-green-600') : 
                    booking.status === 'cancelled' ? (isDarkMode ? 'text-red-400' : 'text-red-600') : 
                    (isDarkMode ? 'text-yellow-400' : 'text-yellow-600')
                  }`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="text-center space-y-3">
                <button className={`text-xs sm:text-sm underline ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}>
                  Click here to download an e-receipt
                </button>
                
                <div className={`pt-3 sm:pt-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <Link 
                    to={`/my-bookings?token=${booking.accessToken}`}
                    className={`text-xs sm:text-sm hover:underline block break-words ${isDarkMode ? 'text-orange-400 hover:text-orange-300' : 'text-blue-600'}`}
                  >
                    View all my bookings
                  </Link>
                  <p className={`text-xs mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Check your email for the secure access link
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterSimple />
    </div>
  )
}

export default BookingConfirmed
