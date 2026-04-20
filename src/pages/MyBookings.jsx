import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import Header2 from '../components/Header2'
import Footer2 from '../components/Footer2'
import { bookingService } from '../api/bookings/bookingService'
import { useTheme } from '../context/ThemeContext'

const MyBookings = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const tokenParam = searchParams.get('token')
  const { isDarkMode } = useTheme()
  
  const [email, setEmail] = useState('')
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [cancellingBooking, setCancellingBooking] = useState(null)
  const [cancelReason, setCancelReason] = useState('')
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [requestingAccess, setRequestingAccess] = useState(false)
  const [accessRequested, setAccessRequested] = useState(false)
  const [userEmail, setUserEmail] = useState('')

  // Typography styles
  const headingStyle = {
    fontFamily: 'Petrona, serif',
    fontWeight: 500,
    fontSize: '48px',
    lineHeight: '100%',
    letterSpacing: '-2.2%',
  }

  const cardTitleStyle = {
    fontFamily: 'Petrona, serif',
    fontWeight: 400,
    fontSize: '24px',
    lineHeight: '130%',
    letterSpacing: '-1%',
  }

  // Fetch bookings when token is provided in URL
  useEffect(() => {
    if (tokenParam) {
      fetchBookingsByToken(tokenParam)
    }
  }, [tokenParam])

  const fetchBookingsByToken = async (token) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await bookingService.getBookingsByToken(token)
      
      if (response.success) {
        setBookings(response.data.bookings)
        setUserEmail(response.data.email)
      } else {
        setError(response.message || 'Invalid or expired access token')
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch bookings')
      console.error('Error fetching bookings:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleRequestAccess = async (e) => {
    e.preventDefault()
    if (!email.trim()) return

    try {
      setRequestingAccess(true)
      setError(null)
      
      const response = await bookingService.requestAccessLink(email.trim())
      
      if (response.success) {
        setAccessRequested(true)
        setEmail('')
      } else {
        setError(response.message || 'Failed to send access link')
      }
    } catch (err) {
      setError(err.message || 'Failed to send access link')
      console.error('Error requesting access:', err)
    } finally {
      setRequestingAccess(false)
    }
  }

  const handleCancelBooking = async () => {
    if (!cancellingBooking || !cancelReason.trim()) {
      alert('Please provide a cancellation reason')
      return
    }

    try {
      const response = await bookingService.cancelBooking(
        cancellingBooking.bookingReference,
        {
          reason: cancelReason,
          cancelledBy: 'guest'
        }
      )

      if (response.success) {
        // Update bookings list
        setBookings(bookings.map(b => 
          b._id === cancellingBooking._id 
            ? { ...b, status: 'cancelled' }
            : b
        ))
        setShowCancelModal(false)
        setCancellingBooking(null)
        setCancelReason('')
        alert('Booking cancelled successfully')
      } else {
        alert(response.message || 'Failed to cancel booking')
      }
    } catch (err) {
      alert(err.message || 'Failed to cancel booking')
      console.error('Error cancelling booking:', err)
    }
  }

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-600 bg-green-50'
      case 'cancelled':
        return 'text-red-600 bg-red-50'
      case 'pending':
        return 'text-yellow-600 bg-yellow-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: isDarkMode ? '#0f0f0f' : '#FFF7F0' }}>
      <Header2 />

      {/* Header Section - Dark Theme */}
      <div 
        className="py-16 px-8 transition-colors duration-300"
        style={{ backgroundColor: isDarkMode ? '#1a1a1a' : '#2D3A36' }}
      >
        <div className="max-w-7xl mx-auto">
          <h1 className="mb-4 transition-colors duration-300" style={{...headingStyle, color: isDarkMode ? '#ffffff' : '#ffffff'}}>
            My Bookings
          </h1>
          <p 
            className="transition-colors duration-300"
            style={{
              fontFamily: 'Work Sans',
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '140%',
              color: isDarkMode ? '#d1d5db' : 'rgba(255,255,255,0.8)'
            }}
          >
            View and manage all your bookings
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-12 px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Access Request Form - Only show if no token */}
          {!tokenParam && (
            <div className="rounded-2xl p-6 shadow-sm mb-8 transition-colors duration-300" style={{ backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff' }}>
              <h3 
                className="mb-4 transition-colors duration-300"
                style={{
                  fontFamily: 'Petrona',
                  fontWeight: 400,
                  fontSize: '24px',
                  color: isDarkMode ? '#ffffff' : '#1f2937'
                }}
              >
                Access Your Bookings
              </h3>
              
              {accessRequested ? (
                <div className="rounded-lg p-4 transition-colors duration-300" style={{ backgroundColor: isDarkMode ? '#1f2937' : '#f0fdf4', border: `1px solid ${isDarkMode ? '#374151' : '#86efac'}` }}>
                  <p className="transition-colors duration-300" style={{ color: isDarkMode ? '#86efac' : '#15803d' }}>
                    ✅ Access link sent! Please check your email inbox for the link to view your bookings.
                  </p>
                </div>
              ) : (
                <>
                  <p 
                    className="mb-4 transition-colors duration-300"
                    style={{
                      fontFamily: 'Work Sans',
                      fontSize: '14px',
                      color: isDarkMode ? '#d1d5db' : '#4b5563'
                    }}
                  >
                    Enter your email address and we'll send you a secure link to access all your bookings.
                  </p>
                  
                  <form onSubmit={handleRequestAccess} className="flex gap-4">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="flex-1 px-4 py-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none transition-colors duration-300"
                      style={{
                        fontFamily: 'Work Sans',
                        fontWeight: 400,
                        fontSize: '16px',
                        backgroundColor: isDarkMode ? '#0f0f0f' : '#ffffff',
                        color: isDarkMode ? '#ffffff' : '#1f2937',
                        border: `1px solid ${isDarkMode ? '#374151' : '#d1d5db'}`
                      }}
                    />
                    <button
                      type="submit"
                      disabled={requestingAccess}
                      className="px-8 py-3 text-white rounded-lg hover:opacity-90 transition-all disabled:opacity-50"
                      style={{
                        background: '#DE754B',
                        fontFamily: 'Inter, Work Sans, sans-serif',
                        fontWeight: 500,
                        fontSize: '16px'
                      }}
                    >
                      {requestingAccess ? 'Sending...' : 'Send Access Link'}
                    </button>
                  </form>
                  
                  <p 
                    className="text-xs mt-3 transition-colors duration-300"
                    style={{ 
                      fontFamily: 'Work Sans',
                      color: isDarkMode ? '#9ca3af' : '#6b7280'
                    }}
                  >
                    🔒 For security, we'll send a secure link to your email instead of showing bookings directly.
                  </p>
                </>
              )}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="rounded-lg p-4 mb-8 transition-colors duration-300" style={{ backgroundColor: isDarkMode ? '#1f2937' : '#fef2f2', border: `1px solid ${isDarkMode ? '#991b1b' : '#fecaca'}` }}>
              <p className="transition-colors duration-300" style={{ color: isDarkMode ? '#fca5a5' : '#b91c1c' }}>{error}</p>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: isDarkMode ? '#DE754B' : '#1f2937' }}></div>
              <p className="transition-colors duration-300" style={{ color: isDarkMode ? '#d1d5db' : '#4b5563' }}>Loading bookings...</p>
            </div>
          )}

          {/* Bookings List */}
          {!loading && bookings.length > 0 && (
            <div className="space-y-6">
              <h2 
                className="mb-4 transition-colors duration-300"
                style={{
                  fontFamily: 'Petrona',
                  fontWeight: 400,
                  fontSize: '32px',
                  lineHeight: '120%',
                  color: isDarkMode ? '#ffffff' : '#1f2937'
                }}
              >
                Found {bookings.length} booking{bookings.length !== 1 ? 's' : ''}
              </h2>

              {bookings.map((booking) => (
                <div
                  key={booking._id}
                  className="rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
                  style={{ backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff' }}
                >
                  <div className="flex gap-6 items-start">
                    {/* Property Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={booking.unitId?.images?.[0]?.url || '/property_1.png'}
                        alt={booking.unitId?.name || 'Property'}
                        className="w-32 h-32 rounded-xl object-cover"
                      />
                    </div>

                    {/* Booking Details */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="mb-1 transition-colors duration-300" style={{...cardTitleStyle, color: isDarkMode ? '#ffffff' : '#1f2937'}}>
                            {booking.unitId?.name || 'Property'}
                          </h3>
                          <p 
                            className="text-sm transition-colors duration-300"
                            style={{ 
                              fontFamily: 'Work Sans',
                              color: isDarkMode ? '#d1d5db' : '#4b5563'
                            }}
                          >
                            {booking.buildingId?.name || 'Building'}
                          </p>
                        </div>
                        <span 
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}
                        >
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-xs mb-1 transition-colors duration-300" style={{ color: isDarkMode ? '#9ca3af' : '#6b7280' }}>Check-in</p>
                          <p className="font-medium text-sm transition-colors duration-300" style={{ color: isDarkMode ? '#ffffff' : '#1f2937' }}>
                            {formatDate(booking.checkIn)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs mb-1 transition-colors duration-300" style={{ color: isDarkMode ? '#9ca3af' : '#6b7280' }}>Check-out</p>
                          <p className="font-medium text-sm transition-colors duration-300" style={{ color: isDarkMode ? '#ffffff' : '#1f2937' }}>
                            {formatDate(booking.checkOut)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs mb-1 transition-colors duration-300" style={{ color: isDarkMode ? '#9ca3af' : '#6b7280' }}>Guests</p>
                          <p className="font-medium text-sm transition-colors duration-300" style={{ color: isDarkMode ? '#ffffff' : '#1f2937' }}>
                            {booking.numberOfGuests} guest{booking.numberOfGuests !== 1 ? 's' : ''}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs mb-1 transition-colors duration-300" style={{ color: isDarkMode ? '#9ca3af' : '#6b7280' }}>Total Paid</p>
                          <p className="font-medium text-sm transition-colors duration-300" style={{ color: isDarkMode ? '#ffffff' : '#1f2937' }}>
                            {new Intl.NumberFormat('en-IN', {
                              style: 'currency',
                              currency: booking.pricing.currency || 'INR',
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            }).format(booking.pricing.alreadyPaid)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <p className="text-sm transition-colors duration-300" style={{ color: isDarkMode ? '#d1d5db' : '#4b5563' }}>
                          Booking Ref: <span className="font-mono font-medium">{booking.bookingReference}</span>
                        </p>
                        {booking.ruReservationId && (
                          <p className="text-xs transition-colors duration-300" style={{ color: isDarkMode ? '#9ca3af' : '#6b7280' }}>
                            RU ID: {booking.ruReservationId}
                          </p>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 mt-4">
                        <Link
                          to={`/booking-confirmed/${booking.bookingReference}`}
                          className="px-4 py-2 rounded-lg text-sm hover:opacity-90 transition-all"
                          style={{
                            backgroundColor: '#DE754B',
                            color: '#ffffff'
                          }}
                        >
                          View Details
                        </Link>
                        
                        {booking.status === 'confirmed' && (
                          <button
                            onClick={() => {
                              setCancellingBooking(booking)
                              setShowCancelModal(true)
                            }}
                            className="px-4 py-2 rounded-lg text-sm hover:opacity-90 transition-all"
                            style={{
                              backgroundColor: isDarkMode ? '#1f2937' : '#fef2f2',
                              color: isDarkMode ? '#fca5a5' : '#dc2626',
                              border: `1px solid ${isDarkMode ? '#991b1b' : '#fecaca'}`
                            }}
                          >
                            Cancel Booking
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* User Email Display */}
          {tokenParam && userEmail && bookings.length > 0 && (
            <div className="rounded-lg p-4 mb-6 transition-colors duration-300" style={{ backgroundColor: isDarkMode ? '#1f2937' : '#eff6ff', border: `1px solid ${isDarkMode ? '#1e40af' : '#bfdbfe'}` }}>
              <p className="text-sm transition-colors duration-300" style={{ color: isDarkMode ? '#93c5fd' : '#1e40af' }}>
                📧 Showing bookings for: <strong>{userEmail}</strong>
              </p>
            </div>
          )}

          {/* No Bookings Found */}
          {!loading && bookings.length === 0 && tokenParam && (
            <div className="text-center py-12">
              <div className="rounded-2xl p-8 shadow-sm max-w-md mx-auto transition-colors duration-300" style={{ backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff' }}>
                <svg 
                  className="w-16 h-16 mx-auto mb-4 transition-colors duration-300" 
                  fill="none" 
                  stroke={isDarkMode ? '#9ca3af' : '#9ca3af'}
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                  />
                </svg>
                <h3 className="text-xl font-semibold mb-2 transition-colors duration-300" style={{ color: isDarkMode ? '#ffffff' : '#1f2937' }}>
                  No bookings found
                </h3>
                <p className="mb-6 transition-colors duration-300" style={{ color: isDarkMode ? '#d1d5db' : '#4b5563' }}>
                  We couldn't find any bookings for this email address.
                </p>
                <Link
                  to="/properties"
                  className="inline-block px-6 py-3 text-white rounded-lg hover:opacity-90 transition-all"
                  style={{ background: '#DE754B' }}
                >
                  Browse Properties
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Cancel Booking Modal */}
      {showCancelModal && cancellingBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="rounded-2xl p-6 max-w-md w-full transition-colors duration-300" style={{ backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff' }}>
            <h3 className="text-xl font-semibold mb-4 transition-colors duration-300" style={{ color: isDarkMode ? '#ffffff' : '#1f2937' }}>
              Cancel Booking
            </h3>
            <p className="mb-4 transition-colors duration-300" style={{ color: isDarkMode ? '#d1d5db' : '#4b5563' }}>
              Are you sure you want to cancel your booking for{' '}
              <strong>{cancellingBooking.unitId?.name}</strong>?
            </p>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 transition-colors duration-300" style={{ color: isDarkMode ? '#d1d5db' : '#374151' }}>
                Reason for cancellation
              </label>
              <textarea
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="Please provide a reason..."
                rows={4}
                className="w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none transition-colors duration-300"
                style={{ 
                  fontFamily: 'Work Sans',
                  backgroundColor: isDarkMode ? '#0f0f0f' : '#ffffff',
                  color: isDarkMode ? '#ffffff' : '#1f2937',
                  border: `1px solid ${isDarkMode ? '#374151' : '#d1d5db'}`
                }}
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowCancelModal(false)
                  setCancellingBooking(null)
                  setCancelReason('')
                }}
                className="flex-1 px-4 py-3 rounded-lg hover:opacity-90 transition-all"
                style={{
                  backgroundColor: isDarkMode ? '#374151' : '#f3f4f6',
                  color: isDarkMode ? '#ffffff' : '#374151'
                }}
              >
                Keep Booking
              </button>
              <button
                onClick={handleCancelBooking}
                disabled={!cancelReason.trim()}
                className="flex-1 px-4 py-3 text-white rounded-lg hover:opacity-90 transition-all disabled:opacity-50"
                style={{ backgroundColor: '#dc2626' }}
              >
                Cancel Booking
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer2 />
    </div>
  )
}

export default MyBookings
