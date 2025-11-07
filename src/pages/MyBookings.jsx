import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import Header2 from '../components/Header2'
import Footer2 from '../components/Footer2'
import { bookingService } from '../api/bookings/bookingService'

const MyBookings = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const emailParam = searchParams.get('email')
  
  const [email, setEmail] = useState(emailParam || '')
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [cancellingBooking, setCancellingBooking] = useState(null)
  const [cancelReason, setCancelReason] = useState('')
  const [showCancelModal, setShowCancelModal] = useState(false)

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

  // Fetch bookings when email is provided in URL
  useEffect(() => {
    if (emailParam) {
      fetchBookings(emailParam)
    }
  }, [emailParam])

  const fetchBookings = async (emailAddress) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await bookingService.getBookingsByEmail(emailAddress)
      
      if (response.success) {
        setBookings(response.data.bookings)
        // Update URL with email
        setSearchParams({ email: emailAddress })
      } else {
        setError(response.message || 'No bookings found')
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch bookings')
      console.error('Error fetching bookings:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (email.trim()) {
      fetchBookings(email.trim())
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
    <div className="min-h-screen" style={{ backgroundColor: '#FFF7F0' }}>
      <Header2 />

      {/* Header Section */}
      <div 
        className="py-16 px-8 text-white"
        style={{ backgroundColor: '#2D3A36' }}
      >
        <div className="max-w-7xl mx-auto">
          <h1 className="text-white mb-4" style={headingStyle}>
            My Bookings
          </h1>
          <p 
            className="text-white/80"
            style={{
              fontFamily: 'Work Sans',
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '140%'
            }}
          >
            View and manage all your bookings
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-12 px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Email Search Form */}
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
            <form onSubmit={handleSearch} className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                style={{
                  fontFamily: 'Work Sans',
                  fontWeight: 400,
                  fontSize: '16px'
                }}
              />
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 text-white rounded-lg hover:opacity-95 transition-all disabled:opacity-50"
                style={{
                  background: '#DE754B',
                  fontFamily: 'Inter, Work Sans, sans-serif',
                  fontWeight: 500,
                  fontSize: '16px'
                }}
              >
                {loading ? 'Searching...' : 'Search Bookings'}
              </button>
            </form>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading bookings...</p>
            </div>
          )}

          {/* Bookings List */}
          {!loading && bookings.length > 0 && (
            <div className="space-y-6">
              <h2 
                className="text-gray-900 mb-4"
                style={{
                  fontFamily: 'Petrona',
                  fontWeight: 400,
                  fontSize: '32px',
                  lineHeight: '120%'
                }}
              >
                Found {bookings.length} booking{bookings.length !== 1 ? 's' : ''}
              </h2>

              {bookings.map((booking) => (
                <div
                  key={booking._id}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
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
                          <h3 className="text-gray-900 mb-1" style={cardTitleStyle}>
                            {booking.unitId?.name || 'Property'}
                          </h3>
                          <p 
                            className="text-gray-600 text-sm"
                            style={{ fontFamily: 'Work Sans' }}
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
                          <p className="text-gray-500 text-xs mb-1">Check-in</p>
                          <p className="text-gray-900 font-medium text-sm">
                            {formatDate(booking.checkIn)}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-xs mb-1">Check-out</p>
                          <p className="text-gray-900 font-medium text-sm">
                            {formatDate(booking.checkOut)}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-xs mb-1">Guests</p>
                          <p className="text-gray-900 font-medium text-sm">
                            {booking.numberOfGuests} guest{booking.numberOfGuests !== 1 ? 's' : ''}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-xs mb-1">Total Paid</p>
                          <p className="text-gray-900 font-medium text-sm">
                            ₹{booking.pricing.alreadyPaid.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <p className="text-gray-600 text-sm">
                          Booking Ref: <span className="font-mono font-medium">{booking.bookingReference}</span>
                        </p>
                        {booking.ruReservationId && (
                          <p className="text-gray-500 text-xs">
                            RU ID: {booking.ruReservationId}
                          </p>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 mt-4">
                        <Link
                          to={`/booking-confirmed/${booking.bookingReference}`}
                          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors"
                        >
                          View Details
                        </Link>
                        
                        {booking.status === 'confirmed' && (
                          <button
                            onClick={() => {
                              setCancellingBooking(booking)
                              setShowCancelModal(true)
                            }}
                            className="px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm hover:bg-red-100 transition-colors"
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

          {/* No Bookings Found */}
          {!loading && bookings.length === 0 && emailParam && (
            <div className="text-center py-12">
              <div className="bg-white rounded-2xl p-8 shadow-sm max-w-md mx-auto">
                <svg 
                  className="w-16 h-16 text-gray-400 mx-auto mb-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                  />
                </svg>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No bookings found
                </h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find any bookings for this email address.
                </p>
                <Link
                  to="/properties"
                  className="inline-block px-6 py-3 text-white rounded-lg hover:opacity-95 transition-all"
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
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Cancel Booking
            </h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to cancel your booking for{' '}
              <strong>{cancellingBooking.unitId?.name}</strong>?
            </p>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason for cancellation
              </label>
              <textarea
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="Please provide a reason..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                style={{ fontFamily: 'Work Sans' }}
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowCancelModal(false)
                  setCancellingBooking(null)
                  setCancelReason('')
                }}
                className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Keep Booking
              </button>
              <button
                onClick={handleCancelBooking}
                disabled={!cancelReason.trim()}
                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
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
