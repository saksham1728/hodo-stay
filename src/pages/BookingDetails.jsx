import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import HomeHeader from '../components/HomeHeader'
import { unitService } from '../api'
import { paymentService } from '../api/payments/paymentService'

// Helper function to format currency - always displays in USD ($)
const formatCurrency = (amount, currency = 'USD') => {
  // Always use USD for display, regardless of backend currency
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

const BookingDetails = () => {
  const { unitId } = useParams()
  const navigate = useNavigate()
  
  // Add CSS for animations
  const animationStyles = `
    @keyframes slideUp {
      from {
        transform: translateY(100%);
      }
      to {
        transform: translateY(0);
      }
    }
    .animate-slide-up {
      animation: slideUp 0.3s ease-out;
    }
  `
  
  // Get URL parameters for check-in, check-out, and guests
  const searchParams = new URLSearchParams(window.location.search)
  const checkInParam = searchParams.get('checkIn')
  const checkOutParam = searchParams.get('checkOut')
  const guestsParam = searchParams.get('guests')
  
  // Unit data state
  const [unit, setUnit] = useState(null)
  const [unitLoading, setUnitLoading] = useState(true)
  const [unitError, setUnitError] = useState(null)
  const [pricing, setPricing] = useState(null)
  
  // Booking submission state
  const [submitting, setSubmitting] = useState(false)
  const [bookingError, setBookingError] = useState(null)
  
  // Booking state - pre-filled from URL parameters (READ-ONLY)
  const [selectedDates, setSelectedDates] = useState({
    checkIn: checkInParam || '',
    checkOut: checkOutParam || ''
  })
  const [guests, setGuests] = useState({
    adults: parseInt(guestsParam) || 1,
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
  
  // Fetch unit details and live pricing
  useEffect(() => {
    const fetchUnitAndPricing = async () => {
      if (!unitId || !selectedDates.checkIn || !selectedDates.checkOut) {
        console.log('Missing required params:', { unitId, checkIn: selectedDates.checkIn, checkOut: selectedDates.checkOut })
        return
      }
      
      try {
        setUnitLoading(true)
        setUnitError(null)
        
        console.log('📊 Fetching unit and pricing for:', { unitId, checkIn: selectedDates.checkIn, checkOut: selectedDates.checkOut, guests: totalGuests })
        
        // Step 1: Fetch unit details to get RU Property ID
        const unitResponse = await unitService.getUnitById(unitId)
        if (!unitResponse.success) {
          throw new Error('Failed to fetch unit details')
        }
        
        const unitData = unitResponse.data.unit
        setUnit(unitData)
        console.log('✅ Unit loaded:', unitData.name, 'RU ID:', unitData.ruPropertyId)
        
        // Step 2: Get live pricing from Rentals United via our API
        const { pricingService } = await import('../api/pricing/pricingService')
        const pricingResponse = await pricingService.getPriceQuote(
          unitId,
          selectedDates.checkIn,
          selectedDates.checkOut,
          totalGuests
        )
        
        console.log('💰 Pricing response:', pricingResponse)
        
        if (pricingResponse.success && pricingResponse.data.quote) {
          const quote = pricingResponse.data.quote
          setPricing({
            price: quote.pricing.totalPrice,
            pricePerNight: quote.pricing.pricePerNight,
            nights: quote.nights,
            currency: quote.pricing.currency,
            available: quote.available
          })
          console.log('✅ Pricing loaded:', quote.pricing.totalPrice, quote.pricing.currency)
        } else {
          throw new Error(pricingResponse.message || 'Failed to get pricing')
        }
        
      } catch (error) {
        console.error('❌ Error fetching unit and pricing:', error)
        setUnitError(error.message || 'Failed to load unit details and pricing')
      } finally {
        setUnitLoading(false)
      }
    }
    
    fetchUnitAndPricing()
  }, [unitId, selectedDates.checkIn, selectedDates.checkOut, totalGuests])
  
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
  
  // Mobile pricing dropdown state
  const [showPricingDetails, setShowPricingDetails] = useState(false)

  // Dates and guests are READ-ONLY - user must go back to property page to change them

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
        'FLAT500': { discount: 500, type: 'fixed', description: '$500 off' },
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

  // Calculate pricing from live API data
  const calculatePricing = () => {
    if (!pricing || !pricing.price) {
      return {
        basePrice: 0,
        nights: 0,
        subtotal: 0,
        taxes: 0,
        couponDiscount: 0,
        total: 0,
        currency: 'USD'
      }
    }

    const basePrice = pricing.pricePerNight || 0
    const nights = pricing.nights || 0
    const subtotal = pricing.price || 0
    const currency = pricing.currency || 'USD'
    const taxes = 0
    
    let couponDiscount = 0
    if (appliedCoupon) {
      if (appliedCoupon.type === 'percentage') {
        couponDiscount = subtotal * appliedCoupon.discount
      } else {
        couponDiscount = appliedCoupon.discount
      }
    }
    
    return {
      basePrice,
      nights,
      subtotal,
      taxes,
      couponDiscount,
      total: Math.max(0, subtotal - couponDiscount),
      currency
    }
  }

  const calculatedPricing = calculatePricing()
  
  // Determine if we're currently loading pricing
  const isPricingLoading = unitLoading

  // Handle booking submission with Razorpay payment
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

    if (calculatedPricing.total === 0) {
      setBookingError('Unable to calculate pricing. Please try again.')
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
        unitId: unit?._id || unitId, // Use unit._id from API (new flow) or unitId from params (old flow)
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
          ruPrice: calculatedPricing.total,
          clientPrice: calculatedPricing.total,
          currency: calculatedPricing.currency || 'USD'
        },
        paymentMethod: paymentMethod,
        additionalAmenities: additionalAmenities,
        appliedCoupon: appliedCoupon ? appliedCoupon.code : null
      }

      console.log('📝 Creating Razorpay order...')

      // Step 1: Create Razorpay order
      const orderResponse = await paymentService.createOrder({
        amount: calculatedPricing.total,
        currency: calculatedPricing.currency || 'USD',
        bookingData: bookingData
      })

      if (!orderResponse.success) {
        throw new Error('Failed to create payment order')
      }

      console.log('✅ Razorpay order created:', orderResponse.data.orderId)

      // Step 2: Open Razorpay payment modal
      const paymentResponse = await paymentService.openPaymentModal({
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderResponse.data.amount,
        currency: orderResponse.data.currency,
        orderId: orderResponse.data.orderId,
        name: 'Hodo Stay',
        description: `Booking for ${unit?.name || 'Property'}`,
        image: '/hodo-white-logo.png',
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.mobile
        },
        notes: {
          unitId: bookingData.unitId,
          checkIn: bookingData.checkIn,
          checkOut: bookingData.checkOut
        },
        themeColor: '#DE754B'
      })

      console.log('✅ Payment successful:', paymentResponse.razorpay_payment_id)

      // Step 3: Verify payment and create booking
      const verifyResponse = await paymentService.verifyPayment({
        razorpay_order_id: paymentResponse.razorpay_order_id,
        razorpay_payment_id: paymentResponse.razorpay_payment_id,
        razorpay_signature: paymentResponse.razorpay_signature,
        bookingData: bookingData
      })

      if (verifyResponse.success) {
        console.log('✅ Booking confirmed:', verifyResponse.data.booking.bookingReference)
        
        // Navigate to confirmation page
        navigate(`/booking-confirmed/${verifyResponse.data.booking.bookingReference}`)
      } else {
        throw new Error(verifyResponse.message || 'Booking verification failed')
      }

    } catch (err) {
      console.error('❌ Booking/Payment error:', err)
      
      if (err.message === 'Payment cancelled by user') {
        setBookingError('Payment was cancelled. Please try again when ready.')
      } else {
        setBookingError(err.message || 'Failed to process payment. Please try again.')
      }
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
      {/* Animation Styles */}
      <style>{animationStyles}</style>
      
      {/* Header */}
      <HomeHeader />

      {/* Mobile Sticky Top Card - Only visible on mobile */}
      <div className="lg:hidden sticky top-0 z-40 bg-white shadow-md">
        {/* Room Image - Full Width with Centered White Box */}
        <div className="relative">
          <img 
            src={unit?.images?.[0]?.url || "/property_1.png"} 
            alt={unit?.unitType || "Property"}
            className="w-full h-48 object-cover"
          />
          
          {/* Centered Compact White Box */}
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-lg p-3 w-full max-w-sm">
              {/* Property Name and Type */}
              <div className="mb-2">
                <h3 className="font-semibold text-sm text-gray-900">
                  {unit?.buildingId?.name || 'Loading...'} - {unit?.unitType || ''}
                </h3>
              </div>
              
              {/* Underline */}
              <hr className="border-gray-300 mb-2" />
              
              {/* Check-in and Check-out */}
              <div className="flex justify-between items-center mb-2">
                <div className="flex-1">
                  <p className="text-xs text-gray-600 mb-0.5">Check-in</p>
                  <p className="font-semibold text-sm text-gray-900">{checkInFormatted.day}</p>
                  <p className="text-xs text-gray-500">{checkInFormatted.weekday}</p>
                </div>
                
                <div className="px-2">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
                
                <div className="flex-1 text-right">
                  <p className="text-xs text-gray-600 mb-0.5">Check-out</p>
                  <p className="font-semibold text-sm text-gray-900">{checkOutFormatted.day}</p>
                  <p className="text-xs text-gray-500">{checkOutFormatted.weekday}</p>
                </div>
              </div>
              
              {/* Underline */}
              <hr className="border-gray-300 mb-2" />
              
              {/* Pricing Row - Left: Label & Info, Right: Price & Arrow */}
              <div 
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setShowPricingDetails(!showPricingDetails)}
              >
                {/* Left Side - Total Amount Label and Info */}
                <div>
                  <p className="text-xs text-gray-600 mb-0.5">Total Amount</p>
                  {!isPricingLoading && calculatedPricing.nights > 0 && (
                    <p className="text-xs text-gray-500">
                      {calculatedPricing.nights} night{calculatedPricing.nights !== 1 ? 's' : ''} • {guests.adults} guest{guests.adults !== 1 ? 's' : ''}
                    </p>
                  )}
                </div>
                
                {/* Right Side - Price and Dropdown Arrow */}
                <div className="flex items-center gap-2">
                  <p className="text-lg font-bold text-gray-900">
                    {isPricingLoading ? (
                      <span className="text-sm">Loading...</span>
                    ) : (
                      formatCurrency(calculatedPricing.total, calculatedPricing.currency)
                    )}
                  </p>
                  
                  <svg 
                    className={`w-5 h-5 text-gray-600 transition-transform ${showPricingDetails ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Sheet - Pricing Details */}
      {showPricingDetails && (
        <div className="lg:hidden fixed inset-0 z-50 flex items-end">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowPricingDetails(false)}
          />
          
          {/* Bottom Sheet - Reduced Height */}
          <div className="relative w-full bg-white rounded-t-3xl shadow-2xl max-h-[70vh] overflow-y-auto animate-slide-up">
            {/* Handle */}
            <div className="flex justify-center pt-2 pb-1">
              <div className="w-12 h-1 bg-gray-300 rounded-full" />
            </div>
            
            {/* Content - Compact Spacing */}
            <div className="p-4 space-y-4">
              {/* Unit Info - Compact */}
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-1">
                  {unit?.unitType || 'Loading...'}
                </h3>
                <p className="text-xs text-gray-600">
                  {unit?.name || ''}
                </p>
              </div>

              {/* Date Summary - Compact */}
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <p className="text-xs text-gray-600">Check-in</p>
                    <p className="text-sm font-semibold text-gray-900">{checkInFormatted.day}</p>
                    <p className="text-xs text-gray-600">{checkInFormatted.weekday}, {unit?.checkInOut?.checkInFrom || '2pm'}</p>
                  </div>
                  
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                  
                  <div className="text-right">
                    <p className="text-xs text-gray-600">Check-out</p>
                    <p className="text-sm font-semibold text-gray-900">{checkOutFormatted.day}</p>
                    <p className="text-xs text-gray-600">{checkOutFormatted.weekday}, {unit?.checkInOut?.checkOutUntil || '11am'}</p>
                  </div>
                </div>
                
                <div className="pt-2 border-t border-gray-200">
                  <p className="text-xs text-gray-600 mb-0.5">Guests</p>
                  <p className="text-sm font-medium text-gray-900">
                    {guests.adults} Adult{guests.adults !== 1 ? 's' : ''}
                    {guests.children > 0 && `, ${guests.children} Child${guests.children !== 1 ? 'ren' : ''}`}
                  </p>
                </div>
              </div>

              {/* Pricing Breakdown - Compact */}
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900 text-sm">Price Breakdown</h4>
                
                {isPricingLoading ? (
                  <div className="text-center py-3">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-orange-500 mx-auto"></div>
                    <p className="text-xs text-gray-500 mt-2">Getting live prices...</p>
                  </div>
                ) : calculatedPricing.total === 0 ? (
                  <p className="text-sm text-gray-500">Select dates to see pricing</p>
                ) : (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        {formatCurrency(calculatedPricing.basePrice, calculatedPricing.currency)} x {calculatedPricing.nights} Night{calculatedPricing.nights !== 1 ? 's' : ''}
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        {formatCurrency(calculatedPricing.subtotal, calculatedPricing.currency)}
                      </span>
                    </div>
                    
                    {calculatedPricing.taxes > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Taxes and charges</span>
                        <span className="text-sm font-medium text-gray-900">
                          {formatCurrency(calculatedPricing.taxes, calculatedPricing.currency)}
                        </span>
                      </div>
                    )}
                    
                    {appliedCoupon && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">
                          Coupon ({appliedCoupon.code})
                          <button 
                            onClick={removeCoupon}
                            className="ml-2 text-red-500 hover:text-red-700"
                          >
                            ×
                          </button>
                        </span>
                        <span className="text-sm font-medium text-green-600">
                          -{formatCurrency(calculatedPricing.couponDiscount, calculatedPricing.currency)}
                        </span>
                      </div>
                    )}
                    
                    <hr className="my-2" />
                    
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-900">Total Payable</span>
                      <span className="text-lg font-bold text-gray-900">
                        {formatCurrency(calculatedPricing.total, calculatedPricing.currency)}
                      </span>
                    </div>

                    <div className="flex items-center justify-center mt-1">
                      <div className="flex items-center gap-2 text-xs text-green-600">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        Live Pricing from Rentals United
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Close Button - Compact */}
              <button
                onClick={() => setShowPricingDetails(false)}
                className="w-full py-2.5 bg-gray-200 text-gray-900 rounded-lg font-medium text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="py-6 lg:py-12 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column - Forms */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Guest Information - FIRST */}
              <div className="lg:rounded-2xl lg:p-6 p-0 lg:shadow-sm" style={{ backgroundColor: '#FAF2E8', boxShadow: '0px 4px 4px 0px rgba(0,0,0,0.25)' }} 
                   data-mobile-transparent="true">
                <style>{`
                  @media (max-width: 1023px) {
                    [data-mobile-transparent="true"] {
                      background-color: transparent !important;
                      box-shadow: none !important;
                      padding: 0 !important;
                    }
                  }
                `}</style>
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

              {/* Coupon Code Section - Mobile Only */}
              <div className="lg:hidden lg:rounded-2xl lg:p-6 p-0 lg:shadow-sm" style={{ backgroundColor: '#FAF2E8', boxShadow: '0px 4px 4px 0px rgba(0,0,0,0.25)' }} 
                   data-mobile-transparent="true">
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
                  Promo Code
                </h3>
                
                <div className="flex gap-2">
                  <input 
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    style={{
                      fontFamily: 'Work Sans',
                      fontWeight: 400,
                      fontSize: '16px',
                      background: 'white'
                    }}
                  />
                  <button 
                    onClick={handleApplyCoupon}
                    disabled={couponLoading || !couponCode.trim()}
                    className="px-6 py-3 text-white rounded-lg hover:opacity-95 disabled:opacity-50"
                    style={{
                      background: '#DE754B',
                      fontFamily: 'Work Sans',
                      fontWeight: 500,
                      fontSize: '16px'
                    }}
                  >
                    {couponLoading ? '...' : 'Apply'}
                  </button>
                </div>
                {appliedCoupon && (
                  <p className="text-green-600 text-sm mt-3" style={{ fontFamily: 'Work Sans' }}>
                    ✓ {appliedCoupon.description} applied!
                  </p>
                )}
              </div>

              {/* Additional Amenities */}
              <div className="lg:rounded-2xl lg:p-6 p-0 lg:shadow-sm" style={{ backgroundColor: '#FAF2E8', boxShadow: '0px 4px 4px 0px rgba(0,0,0,0.25)' }} 
                   data-mobile-transparent="true">
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

              {/* Payment Information */}
              <div className="lg:rounded-2xl lg:p-6 p-0 lg:shadow-sm" style={{ backgroundColor: '#FAF2E8', boxShadow: '0px 4px 4px 0px rgba(0,0,0,0.25)' }} 
                   data-mobile-transparent="true">
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
              <div className="lg:rounded-2xl lg:p-6 p-0 lg:shadow-sm" style={{ backgroundColor: '#FAF2E8', boxShadow: '0px 4px 4px 0px rgba(0,0,0,0.25)' }} 
                   data-mobile-transparent="true">
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

              {/* Error Messages */}
              {bookingError && (
                <div className="rounded-2xl p-4 bg-red-50 border border-red-200">
                  <p className="text-red-700 text-sm font-medium" style={{ fontFamily: 'Work Sans' }}>
                    ⚠️ Booking Error
                  </p>
                  <p className="text-red-600 text-sm mt-1" style={{ fontFamily: 'Work Sans' }}>
                    {bookingError}
                  </p>
                </div>
              )}
              
              {unitError && (
                <div className="rounded-2xl p-4 bg-yellow-50 border border-yellow-200">
                  <p className="text-yellow-700 text-sm font-medium" style={{ fontFamily: 'Work Sans' }}>
                    ⚠️ Availability Issue
                  </p>
                  <p className="text-yellow-600 text-sm mt-1" style={{ fontFamily: 'Work Sans' }}>
                    {unitError}
                  </p>
                  <p className="text-yellow-600 text-xs mt-2" style={{ fontFamily: 'Work Sans' }}>
                    Try selecting different dates or contact support.
                  </p>
                </div>
              )}

              {/* Proceed Button */}
              <button 
                onClick={handleProceedToCheckout}
                disabled={submitting || !acceptTerms || isPricingLoading || !formData.firstName || !formData.lastName || !formData.email || !formData.mobile || calculatedPricing.total === 0}
                className="w-full text-white py-4 rounded-lg hover:opacity-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: '#DE754B',
                  ...proceedBtnTextStyle
                }}
              >
                {submitting ? 'Processing...' : isPricingLoading ? 'Loading Pricing...' : 'Proceed to Check Out'}
              </button>
            </div>

            {/* Right Column - Live Pricing Card - Hidden on Mobile */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="bg-white rounded-2xl p-5 shadow-sm sticky top-8">
                {/* Unit Image and Info */}
                <div className="mb-3">
                  <img 
                    src={unit?.images?.[0]?.url || "/property_1.png"} 
                    alt={unit?.unitType || "Property"}
                    className="w-full h-32 object-cover rounded-xl"
                  />
                </div>
                
                <h3 
                  className="text-gray-900 mb-3"
                  style={{
                    fontFamily: 'Petrona',
                    fontWeight: 500,
                    fontSize: '18px',
                    lineHeight: '130%',
                    letterSpacing: '-1%'
                  }}
                >
                  {unit?.unitType || 'Loading...'}
                </h3>

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
                      {isPricingLoading ? (
                        <div className="text-center py-4">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500 mx-auto"></div>
                          <p className="text-sm text-gray-500 mt-2">Getting live prices...</p>
                          <p className="text-xs text-gray-400 mt-1">Checking all available units</p>
                        </div>
                      ) : unitError ? (
                        <div className="text-center py-4">
                          <p className="text-sm text-red-500">Unable to get live pricing</p>
                          <p className="text-xs text-gray-500">Please try different dates</p>
                        </div>
                      ) : calculatedPricing.total === 0 ? (
                        <div className="text-center py-4">
                          <p className="text-sm text-gray-500">Select dates to see pricing</p>
                        </div>
                      ) : (
                        <>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-sm">
                              {formatCurrency(calculatedPricing.basePrice, calculatedPricing.currency)} x {calculatedPricing.nights} Night{calculatedPricing.nights !== 1 ? 's' : ''}
                            </span>
                            <span className="text-gray-900 font-medium text-sm">
                              {formatCurrency(calculatedPricing.subtotal, calculatedPricing.currency)}
                            </span>
                          </div>
                          
                          {/* Tax line hidden for now */}
                          {calculatedPricing.taxes > 0 && (
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600 text-sm">
                                Taxes and charges
                              </span>
                              <span className="text-gray-900 font-medium text-sm">
                                {formatCurrency(calculatedPricing.taxes, calculatedPricing.currency)}
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
                                -{formatCurrency(calculatedPricing.couponDiscount, calculatedPricing.currency)}
                              </span>
                            </div>
                          )}
                          
                          <hr className="my-3" />
                          
                          <div className="flex justify-between items-center">
                            <span className="text-gray-900 font-semibold">
                              Total Payable Amount
                            </span>
                            <span className="text-gray-900 font-bold text-lg">
                              {formatCurrency(calculatedPricing.total, calculatedPricing.currency)}
                            </span>
                          </div>

                          {/* Live Data Indicator */}
                          <div className="flex items-center justify-center mt-2">
                            <div className="flex items-center gap-2 text-xs text-green-600">
                              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                              Live Pricing from Rentals United
                            </div>
                          </div>
                          
                          {/* Show which unit was selected (new flow only) */}
                          {pricing && pricing.propertyId && (
                            <div className="mt-2 p-2 bg-blue-50 rounded text-xs text-blue-700">
                              <p className="font-medium">✓ Best available unit selected</p>
                              <p className="text-blue-600 mt-1">Property ID: {pricing.propertyId}</p>
                            </div>
                          )}
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
    </div>
  )
}

export default BookingDetails
