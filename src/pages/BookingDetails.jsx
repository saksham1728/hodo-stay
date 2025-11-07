import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Header2 from '../components/Header2'
import Footer2 from '../components/Footer2'
import BookingDateSelector from '../components/BookingDateSelector'
import { usePricing } from '../hooks/usePricing'
import { unitService } from '../api'
import { bookingService } from '../api/bookings/bookingService'

// Helper function to format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

const BookingDetails = () => {
  const { unitId } = useParams()
  const navigate = useNavigate()
  
  // Unit data state
  const [unit, setUnit] = useState(null)
  const [unitLoading, setUnitLoading] = useState(true)
  const [unitError, setUnitError] = useState(null)
  
  // Booking submission state
  const [submitting, setSubmitting] = useState(false)
  const [bookingError, setBookingError] = useState(null)
  
  // Booking state with default dates
  const getDefaultDates = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfter = new Date(tomorrow);
    dayAfter.setDate(dayAfter.getDate() + 1);
    
    return {
      checkIn: tomorrow.toISOString().split('T')[0],
      checkOut: dayAfter.toISOString().split('T')[0]
    };
  };
  
  const [selectedDates, setSelectedDates] = useState(getDefaultDates())
  const [guests, setGuests] = useState({
    adults: 1, // Start with 1 adult (will be updated when unit loads)
    children: 0
  })
  
  // Coupon state
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState(null)
  const [couponLoading, setCouponLoading] = useState(false)
  
  // Guest warning state
  const [guestWarning, setGuestWarning] = useState('')
  
  // Get live pricing based on selected dates and guests
  const totalGuests = guests.adults + guests.children
  const { quote, loading: priceLoading, error: priceError } = usePricing(
    unitId, 
    selectedDates.checkIn, 
    selectedDates.checkOut, 
    totalGuests
  )
  
  // Pricing and booking state management complete
  
  // Fetch unit details
  useEffect(() => {
    const fetchUnit = async () => {
      if (!unitId) return
      
      try {
        setUnitLoading(true)
        const response = await unitService.getUnitById(unitId)
        const unitData = response.data.unit
        setUnit(unitData)
        
        // Update guest count to respect unit capacity
        if (unitData.standardGuests) {
          setGuests(prev => ({
            adults: Math.min(prev.adults, unitData.standardGuests),
            children: Math.max(0, Math.min(prev.children, unitData.standardGuests - prev.adults))
          }))
        }
      } catch (error) {
        console.error('Error fetching unit:', error)
        setUnitError('Failed to load unit details')
      } finally {
        setUnitLoading(false)
      }
    }
    
    fetchUnit()
  }, [unitId])
  
  const [additionalAmenities, setAdditionalAmenities] = useState({
    roomOnly: false,
    breakfastIncluded: false
  })

  const [paymentMethod, setPaymentMethod] = useState('debit')

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: ''
  })

  const [acceptTerms, setAcceptTerms] = useState(false)

  // Handle date changes
  const handleDatesChange = (checkIn, checkOut) => {
    setSelectedDates({ checkIn, checkOut })
  }

  const handleGuestChange = (type, operation) => {
    setGuests(prev => {
      const newValue = operation === 'increment' 
        ? prev[type] + 1 
        : Math.max(0, prev[type] - 1);
      
      const newGuests = { ...prev, [type]: newValue };
      const totalGuests = newGuests.adults + newGuests.children;
      const maxGuests = unit?.standardGuests || 1;
      
      // Check if total exceeds unit capacity
      if (totalGuests > maxGuests) {
        // Show warning message
        setGuestWarning(`This unit can accommodate maximum ${maxGuests} guest${maxGuests !== 1 ? 's' : ''}. Please select a different unit for more guests.`);
        setTimeout(() => setGuestWarning(''), 5000); // Clear warning after 5 seconds
        return prev; // Don't update state
      }
      
      // Clear warning if valid
      setGuestWarning('');
      
      return newGuests;
    });
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Handle coupon application
  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return
    
    setCouponLoading(true)
    try {
      // Simulate coupon validation (you can implement real coupon API later)
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock coupon logic
      const mockCoupons = {
        'SAVE10': { discount: 0.1, type: 'percentage', description: '10% off' },
        'FLAT500': { discount: 500, type: 'fixed', description: '₹500 off' },
        'WELCOME': { discount: 0.15, type: 'percentage', description: '15% off for new users' }
      }
      
      const coupon = mockCoupons[couponCode.toUpperCase()]
      if (coupon) {
        setAppliedCoupon({ code: couponCode.toUpperCase(), ...coupon })
      } else {
        alert('Invalid coupon code')
      }
    } catch (error) {
      console.error('Error applying coupon:', error)
      alert('Failed to apply coupon')
    } finally {
      setCouponLoading(false)
    }
  }

  const removeCoupon = () => {
    setAppliedCoupon(null)
    setCouponCode('')
  }

  // Calculate pricing
  const calculatePricing = () => {
    if (!quote || !quote.pricing) {
      return {
        basePrice: 0,
        nights: 0,
        subtotal: 0,
        taxes: 0,
        couponDiscount: 0,
        total: 0
      }
    }

    const basePrice = quote.pricing.pricePerNight || 0
    const nights = quote.nights || 0
    const subtotal = basePrice * nights
    const taxes = 0 // No tax calculation for now
    
    let couponDiscount = 0
    if (appliedCoupon) {
      if (appliedCoupon.type === 'percentage') {
        couponDiscount = subtotal * appliedCoupon.discount
      } else {
        couponDiscount = appliedCoupon.discount
      }
    }
    
    const total = Math.max(0, subtotal - couponDiscount) // Removed tax from total calculation
    
    return {
      basePrice,
      nights,
      subtotal,
      taxes,
      couponDiscount,
      total
    }
  }

  const pricing = calculatePricing()

  // Handle booking submission
  const handleProceedToCheckout = async () => {
    // Validate form
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.mobile) {
      setBookingError('Please fill in all guest information fields')
      return
    }

    if (!acceptTerms) {
      setBookingError('Please accept the terms and conditions')
      return
    }

    if (!selectedDates.checkIn || !selectedDates.checkOut) {
      setBookingError('Please select check-in and check-out dates')
      return
    }

    if (totalGuests === 0) {
      setBookingError('Please select at least one guest')
      return
    }

    setSubmitting(true)
    setBookingError(null)

    try {
      // Calculate nights
      const checkIn = new Date(selectedDates.checkIn)
      const checkOut = new Date(selectedDates.checkOut)
      const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24))

      // Prepare booking data
      const bookingData = {
        unitId: unitId,
        checkIn: selectedDates.checkIn,
        checkOut: selectedDates.checkOut,
        nights: nights,
        numberOfGuests: totalGuests,
        numberOfAdults: guests.adults,
        numberOfChildren: guests.children,
        guestInfo: {
          name: formData.firstName,
          surname: formData.lastName,
          email: formData.email,
          phone: formData.mobile
        },
        pricing: {
          ruPrice: pricing.total,
          clientPrice: pricing.total,
          currency: 'INR'
        },
        paymentMethod: paymentMethod,
        additionalAmenities: additionalAmenities,
        appliedCoupon: appliedCoupon ? appliedCoupon.code : null
      }

      // Create booking
      const response = await bookingService.createBooking(bookingData)

      if (response.success) {
        // Navigate to confirmation page with booking reference
        navigate(`/booking-confirmed/${response.data.booking.bookingReference}`)
      } else {
        throw new Error(response.message || 'Booking failed')
      }
    } catch (err) {
      setBookingError(err.message || 'Failed to create booking. Please try again.')
      console.error('Booking error:', err)
    } finally {
      setSubmitting(false)
    }
  }

  // Format date for display
  const formatDateForDisplay = (dateStr) => {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    const day = date.getDate()
    const month = date.toLocaleDateString('en-US', { month: 'long' })
    const weekday = date.toLocaleDateString('en-US', { weekday: 'long' })
    return { day: `${day}${getOrdinalSuffix(day)} ${month}`, weekday }
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

  const checkInFormatted = formatDateForDisplay(selectedDates.checkIn)
  const checkOutFormatted = formatDateForDisplay(selectedDates.checkOut)

  // common card style for the small form cards to match the screenshot
  const smallCardStyle = {
    backgroundColor: '#FAF2E8',
    boxShadow: '0px 4px 4px 0px rgba(0,0,0,0.25)', // #00000040
    borderRadius: '1rem'
  }

  // Proceed button text styles (Inter font family; if you use a font loader ensure Inter is available)
  const proceedBtnTextStyle = {
    fontFamily: 'Inter, Work Sans, sans-serif',
    fontWeight: 500,
    fontStyle: 'normal',
    fontSize: '19.8px',
    lineHeight: '150%',
    letterSpacing: '-2.2%',
    textAlign: 'center'
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFF7F0' }}>
      {/* Header */}
      <Header2 />
      
      {/* Dark Green Booking Details Section */}
      <div 
        className="py-16 px-8 text-white"
        style={{ backgroundColor: '#2D3A36' }}
      >
        <div className="max-w-7xl mx-auto">
          <h1 
            className="text-white mb-4"
            style={{
              fontFamily: 'Petrona',
              fontWeight: 500,
              fontSize: '48px',
              lineHeight: '100%',
              letterSpacing: '-2.2%'
            }}
          >
            Booking Details
          </h1>
          <h2 
            className="text-white mb-4"
            style={{
              fontFamily: 'Petrona',
              fontWeight: 400,
              fontSize: '32px',
              lineHeight: '120%',
              letterSpacing: '-1.5%'
            }}
          >
            {unitLoading ? 'Loading...' : unit?.name || 'Hodo Heiwa - HSR Layout'}
          </h2>
          <p 
            className="text-white/80 mb-2"
            style={{
              fontFamily: 'Work Sans',
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '140%'
            }}
          >
            HSR Layout, Bangalore South, Bengaluru Urban, Karnataka, India
          </p>
          <p 
            className="text-white/70"
            style={{
              fontFamily: 'Work Sans',
              fontWeight: 400,
              fontSize: '12px',
              lineHeight: '140%'
            }}
          >
            {unit?.description || 'Our apartment offers the comfort of home with the luxury of a hotel. Strategically located in the heart of HSR Layout, Bengaluru.'}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-12 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column - Forms */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Guests Section */}
              <div className="rounded-2xl p-6" style={smallCardStyle}>
                <h3 
                  className="text-gray-900 mb-4"
                  style={{
                    fontFamily: 'Petrona',
                    fontWeight: 400,
                    fontSize: '24px',
                    lineHeight: '130%',
                    letterSpacing: '-1%'
                  }}
                >
                  Guests
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span 
                      className="text-gray-700"
                      style={{
                        fontFamily: 'Work Sans',
                        fontWeight: 400,
                        fontSize: '16px'
                      }}
                    >
                      Adult
                    </span>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => handleGuestChange('adults', 'decrement')}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                        style={{ background: 'transparent' }}
                        aria-label="decrement-adult"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-medium">{guests.adults}</span>
                      <button 
                        onClick={() => handleGuestChange('adults', 'increment')}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                        style={{ background: 'transparent' }}
                        aria-label="increment-adult"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span 
                      className="text-gray-700"
                      style={{
                        fontFamily: 'Work Sans',
                        fontWeight: 400,
                        fontSize: '16px'
                      }}
                    >
                      Child
                    </span>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => handleGuestChange('children', 'decrement')}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                        aria-label="decrement-child"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-medium">{guests.children}</span>
                      <button 
                        onClick={() => handleGuestChange('children', 'increment')}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                        aria-label="increment-child"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  <p 
                    className="text-gray-500 text-sm"
                    style={{
                      fontFamily: 'Work Sans',
                      fontWeight: 400,
                      fontSize: '12px'
                    }}
                  >
                    Above 18 years are considered as adults
                  </p>
                  
                  {/* Unit capacity info */}
                  {unit && (
                    <p 
                      className="text-blue-600 text-sm mt-2"
                      style={{
                        fontFamily: 'Work Sans',
                        fontWeight: 400,
                        fontSize: '12px'
                      }}
                    >
                      This unit can accommodate maximum {unit.standardGuests} guest{unit.standardGuests !== 1 ? 's' : ''}
                    </p>
                  )}
                  
                  {/* Warning message */}
                  {guestWarning && (
                    <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p 
                        className="text-red-700 text-sm"
                        style={{
                          fontFamily: 'Work Sans',
                          fontWeight: 500,
                          fontSize: '12px'
                        }}
                      >
                        ⚠️ {guestWarning}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Additional Amenities */}
              <div className="rounded-2xl p-6" style={smallCardStyle}>
                <h3 
                  className="text-gray-900 mb-4"
                  style={{
                    fontFamily: 'Petrona',
                    fontWeight: 400,
                    fontSize: '24px',
                    lineHeight: '130%',
                    letterSpacing: '-1%'
                  }}
                >
                  Additional Amenities
                </h3>
                
                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <input 
                      type="checkbox"
                      checked={additionalAmenities.roomOnly}
                      onChange={(e) => setAdditionalAmenities(prev => ({
                        ...prev,
                        roomOnly: e.target.checked
                      }))}
                      className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <span 
                      className="text-gray-700"
                      style={{
                        fontFamily: 'Work Sans',
                        fontWeight: 400,
                        fontSize: '16px'
                      }}
                    >
                      Room Only
                    </span>
                  </label>
                  
                  <label className="flex items-center gap-3">
                    <input 
                      type="checkbox"
                      checked={additionalAmenities.breakfastIncluded}
                      onChange={(e) => setAdditionalAmenities(prev => ({
                        ...prev,
                        breakfastIncluded: e.target.checked
                      }))}
                      className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <span 
                      className="text-gray-700"
                      style={{
                        fontFamily: 'Work Sans',
                        fontWeight: 400,
                        fontSize: '16px'
                      }}
                    >
                      Breakfast Included
                    </span>
                  </label>
                </div>
              </div>

              {/* Guest Information */}
              <div className="rounded-2xl p-6" style={smallCardStyle}>
                <h3 
                  className="text-gray-900 mb-4"
                  style={{
                    fontFamily: 'Petrona',
                    fontWeight: 400,
                    fontSize: '24px',
                    lineHeight: '130%',
                    letterSpacing: '-1%'
                  }}
                >
                  Guest Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input 
                      type="text"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      style={{
                        fontFamily: 'Work Sans',
                        fontWeight: 400,
                        fontSize: '16px',
                        background: 'white'
                      }}
                    />
                  </div>
                  <div>
                    <input 
                      type="text"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      style={{
                        fontFamily: 'Work Sans',
                        fontWeight: 400,
                        fontSize: '16px',
                        background: 'white'
                      }}
                    />
                  </div>
                  <div>
                    <input 
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      style={{
                        fontFamily: 'Work Sans',
                        fontWeight: 400,
                        fontSize: '16px',
                        background: 'white'
                      }}
                    />
                  </div>
                  <div>
                    <input 
                      type="tel"
                      placeholder="Mobile Number"
                      value={formData.mobile}
                      onChange={(e) => handleInputChange('mobile', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      style={{
                        fontFamily: 'Work Sans',
                        fontWeight: 400,
                        fontSize: '16px',
                        background: 'white'
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="rounded-2xl p-6" style={smallCardStyle}>
                <h3 
                  className="text-gray-900 mb-4"
                  style={{
                    fontFamily: 'Petrona',
                    fontWeight: 400,
                    fontSize: '24px',
                    lineHeight: '130%',
                    letterSpacing: '-1%'
                  }}
                >
                  Payment Information
                </h3>
                
                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <input 
                      type="radio"
                      name="payment"
                      value="debit"
                      checked={paymentMethod === 'debit'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500"
                    />
                    <span 
                      className="text-gray-700"
                      style={{
                        fontFamily: 'Work Sans',
                        fontWeight: 400,
                        fontSize: '16px'
                      }}
                    >
                      Pay Using Debit/Credit Card
                    </span>
                  </label>
                  
                  <label className="flex items-center gap-3">
                    <input 
                      type="radio"
                      name="payment"
                      value="upi"
                      checked={paymentMethod === 'upi'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500"
                    />
                    <span 
                      className="text-gray-700"
                      style={{
                        fontFamily: 'Work Sans',
                        fontWeight: 400,
                        fontSize: '16px'
                      }}
                    >
                      Pay Using UPI
                    </span>
                  </label>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="rounded-2xl p-6" style={smallCardStyle}>
                <label className="flex items-start gap-3">
                  <input 
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500 mt-1"
                  />
                  <span 
                    className="text-gray-700"
                    style={{
                      fontFamily: 'Work Sans',
                      fontWeight: 400,
                      fontSize: '14px',
                      lineHeight: '140%'
                    }}
                  >
                    I have read and accept the <a href="#" className="text-orange-500 underline">cancellation and booking policies</a>
                  </span>
                </label>
              </div>

              {/* Error Message */}
              {bookingError && (
                <div className="rounded-2xl p-4 bg-red-50 border border-red-200">
                  <p className="text-red-700 text-sm" style={{ fontFamily: 'Work Sans' }}>
                    {bookingError}
                  </p>
                </div>
              )}

              {/* Proceed Button */}
              <button 
                onClick={handleProceedToCheckout}
                disabled={submitting || !acceptTerms || priceLoading || !formData.firstName || !formData.lastName || !formData.email || !formData.mobile}
                className="w-full text-white py-4 rounded-lg hover:opacity-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: '#DE754B',
                  ...proceedBtnTextStyle
                }}
              >
                {submitting ? 'Processing...' : 'Proceed to Check Out'}
              </button>
            </div>

            {/* Right Column - Live Pricing Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-8">
                {/* Unit Image and Info */}
                <div className="mb-4">
                  <img 
                    src={unit?.images?.[0]?.url || "/property_1.png"} 
                    alt={unit?.name || "Property"}
                    className="w-full h-48 object-cover rounded-xl"
                  />
                </div>
                
                <h3 
                  className="text-gray-900 mb-2"
                  style={{
                    fontFamily: 'Petrona',
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: '130%',
                    letterSpacing: '-1%'
                  }}
                >
                  {unit?.name || 'Loading...'}
                </h3>
                
                <p 
                  className="text-gray-600 text-sm mb-4"
                  style={{
                    fontFamily: 'Work Sans',
                    fontWeight: 400,
                    fontSize: '14px'
                  }}
                >
                  {unit ? `Max ${unit.standardGuests} guest${unit.standardGuests !== 1 ? 's' : ''}` : 'Room details'}
                </p>

                {/* Date Selector */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Select Dates</h4>
                  <BookingDateSelector
                    onDatesChange={handleDatesChange}
                    initialCheckIn={selectedDates.checkIn}
                    initialCheckOut={selectedDates.checkOut}
                  />
                </div>

                {/* Live Pricing Display */}
                {selectedDates.checkIn && selectedDates.checkOut && (
                  <>
                    {/* Date Summary */}
                    <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-gray-600 text-sm">Check-in</p>
                        <p className="text-gray-900 font-semibold">
                          {checkInFormatted.day}
                        </p>
                        <p className="text-gray-600 text-sm">
                          {checkInFormatted.weekday}, {unit?.checkInOut?.checkInFrom || '2pm'}
                        </p>
                      </div>
                      
                      <div className="text-center">
                        <svg className="w-6 h-6 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-gray-600 text-sm">Check-out</p>
                        <p className="text-gray-900 font-semibold">
                          {checkOutFormatted.day}
                        </p>
                        <p className="text-gray-600 text-sm">
                          {checkOutFormatted.weekday}, {unit?.checkInOut?.checkOutUntil || '11am'}
                        </p>
                      </div>
                    </div>

                    <div className="mb-6 p-3 bg-gray-50 rounded-lg">
                      <p className="text-gray-600 text-xs mb-1">Selected Guests:</p>
                      <p className="text-gray-900 font-medium">
                        {guests.adults} Adult{guests.adults !== 1 ? 's' : ''}
                        {guests.children > 0 && `, ${guests.children} Child${guests.children !== 1 ? 'ren' : ''}`}
                      </p>
                      <p className="text-gray-500 text-xs mt-1">
                        Manage guests in the form on the left
                      </p>
                    </div>

                    {/* Pricing Breakdown */}
                    <div className="border-t pt-4 space-y-2">
                      {priceLoading ? (
                        <div className="text-center py-4">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500 mx-auto"></div>
                          <p className="text-sm text-gray-500 mt-2">Getting live prices...</p>
                        </div>
                      ) : priceError ? (
                        <div className="text-center py-4">
                          <p className="text-sm text-red-500">Unable to get live pricing</p>
                          <p className="text-xs text-gray-500">Please try different dates</p>
                        </div>
                      ) : (
                        <>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-sm">
                              {formatCurrency(pricing.basePrice)} x {pricing.nights} Night{pricing.nights !== 1 ? 's' : ''}
                            </span>
                            <span className="text-gray-900 font-medium text-sm">
                              {formatCurrency(pricing.subtotal)}
                            </span>
                          </div>
                          
                          {/* Tax line hidden for now */}
                          {pricing.taxes > 0 && (
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600 text-sm">
                                Taxes and charges
                              </span>
                              <span className="text-gray-900 font-medium text-sm">
                                {formatCurrency(pricing.taxes)}
                              </span>
                            </div>
                          )}
                          
                          {appliedCoupon && (
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600 text-sm">
                                Coupon ({appliedCoupon.code})
                                <button 
                                  onClick={removeCoupon}
                                  className="ml-2 text-red-500 hover:text-red-700"
                                >
                                  ×
                                </button>
                              </span>
                              <span className="text-green-600 font-medium text-sm">
                                -{formatCurrency(pricing.couponDiscount)}
                              </span>
                            </div>
                          )}
                          
                          <hr className="my-3" />
                          
                          <div className="flex justify-between items-center">
                            <span className="text-gray-900 font-semibold">
                              Total Payable Amount
                            </span>
                            <span className="text-gray-900 font-bold text-lg">
                              {formatCurrency(pricing.total)}
                            </span>
                          </div>

                          {/* Live Data Indicator */}
                          <div className="flex items-center justify-center mt-2">
                            <div className="flex items-center gap-2 text-xs text-green-600">
                              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                              Live Pricing
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Coupon Section */}
                    <div className="mt-6 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-gray-600 text-sm">
                          Got a coupon?
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <input 
                          type="text"
                          placeholder="Enter coupon code (try SAVE10)"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                          style={{
                            fontFamily: 'Work Sans',
                            fontWeight: 400,
                            fontSize: '12px'
                          }}
                        />
                        <button 
                          onClick={handleApplyCoupon}
                          disabled={couponLoading || !couponCode.trim()}
                          className="px-4 py-2 text-white rounded text-sm hover:opacity-95 disabled:opacity-50"
                          style={{
                            background: '#DE754B',
                            fontFamily: 'Inter, Work Sans, sans-serif',
                            fontWeight: 500,
                            fontSize: '12px'
                          }}
                        >
                          {couponLoading ? '...' : 'Apply'}
                        </button>
                      </div>
                      {appliedCoupon && (
                        <p className="text-green-600 text-xs mt-2">
                          ✓ {appliedCoupon.description} applied!
                        </p>
                      )}
                    </div>
                  </>
                )}

                {/* No Dates Selected */}
                {(!selectedDates.checkIn || !selectedDates.checkOut) && (
                  <div className="text-center py-8 text-gray-500">
                    <p className="text-sm">Select dates to see live pricing</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer2 />
    </div>
  )
}

export default BookingDetails
