import { useState } from 'react'
import Header2 from '../components/Header2'
import Footer2 from '../components/Footer2'

const BookingDetails = () => {
  const [guests, setGuests] = useState({
    adults: 2,
    children: 0
  })
  
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

  const handleGuestChange = (type, operation) => {
    setGuests(prev => ({
      ...prev,
      [type]: operation === 'increment' 
        ? prev[type] + 1 
        : Math.max(0, prev[type] - 1)
    }))
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

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
            Hodo Heiwa - Hsr Layout
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
            97/B | 17th Main Road, Sector 3, HSR Layout, Bangalore South, Bengaluru Urban, Karnataka, 560102, India
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
            Our apartment offers the comfort of home with the luxury of a hotel. Strategically located in the heart of HSR Layout, Bengaluru. Our thoughtfully designed spaces provide perfect blend for leisure and business travellers.
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

              {/* Proceed Button */}
              <button 
                className="w-full text-white py-4 rounded-lg hover:opacity-95 transition-all"
                style={{
                  background: '#DE754B',
                  ...proceedBtnTextStyle
                }}
              >
                Proceed to Check Out
              </button>
            </div>

            {/* Right Column - Property Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-8">
                <div className="mb-4">
                  <img 
                    src="/property_1.png" 
                    alt="Hodo Heiwa, 2BHK Penthouse"
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
                  Hodo Heiwa, 2BHK Penthouse
                </h3>
                
                <p 
                  className="text-gray-600 text-sm mb-4"
                  style={{
                    fontFamily: 'Work Sans',
                    fontWeight: 400,
                    fontSize: '14px'
                  }}
                >
                  Room details
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p 
                      className="text-gray-600 text-sm"
                      style={{
                        fontFamily: 'Work Sans',
                        fontWeight: 400,
                        fontSize: '12px'
                      }}
                    >
                      Check-in
                    </p>
                    <p 
                      className="text-gray-900 font-semibold"
                      style={{
                        fontFamily: 'Work Sans',
                        fontWeight: 600,
                        fontSize: '18px'
                      }}
                    >
                      21st July
                    </p>
                    <p 
                      className="text-gray-600 text-sm"
                      style={{
                        fontFamily: 'Work Sans',
                        fontWeight: 400,
                        fontSize: '12px'
                      }}
                    >
                      Monday, 2pm
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <svg className="w-6 h-6 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                  
                  <div className="text-right">
                    <p 
                      className="text-gray-600 text-sm"
                      style={{
                        fontFamily: 'Work Sans',
                        fontWeight: 400,
                        fontSize: '12px'
                      }}
                    >
                      Check-out
                    </p>
                    <p 
                      className="text-gray-900 font-semibold"
                      style={{
                        fontFamily: 'Work Sans',
                        fontWeight: 600,
                        fontSize: '18px'
                      }}
                    >
                      27th July
                    </p>
                    <p 
                      className="text-gray-600 text-sm"
                      style={{
                        fontFamily: 'Work Sans',
                        fontWeight: 400,
                        fontSize: '12px'
                      }}
                    >
                      Sunday, 11am
                    </p>
                  </div>
                </div>

                <p 
                  className="text-gray-900 font-medium mb-6"
                  style={{
                    fontFamily: 'Work Sans',
                    fontWeight: 500,
                    fontSize: '16px'
                  }}
                >
                  2 Adults, 1 Child
                </p>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span 
                      className="text-gray-600"
                      style={{
                        fontFamily: 'Work Sans',
                        fontWeight: 400,
                        fontSize: '14px'
                      }}
                    >
                      1 2BHK Penthouse x 7 Nights
                    </span>
                    <span 
                      className="text-gray-900 font-medium"
                      style={{
                        fontFamily: 'Work Sans',
                        fontWeight: 500,
                        fontSize: '14px'
                      }}
                    >
                      ₹ 49,000
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span 
                      className="text-gray-600"
                      style={{
                        fontFamily: 'Work Sans',
                        fontWeight: 400,
                        fontSize: '14px'
                      }}
                    >
                      Taxes and other charges
                    </span>
                    <span 
                      className="text-gray-900 font-medium"
                      style={{
                        fontFamily: 'Work Sans',
                        fontWeight: 500,
                        fontSize: '14px'
                      }}
                    >
                      ₹ 594
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span 
                      className="text-gray-600"
                      style={{
                        fontFamily: 'Work Sans',
                        fontWeight: 400,
                        fontSize: '14px'
                      }}
                    >
                      Pay Now Discount
                    </span>
                    <span 
                      className="text-green-600 font-medium"
                      style={{
                        fontFamily: 'Work Sans',
                        fontWeight: 500,
                        fontSize: '14px'
                      }}
                    >
                      -₹ 550
                    </span>
                  </div>
                  
                  <hr className="my-3" />
                  
                  <div className="flex justify-between items-center">
                    <span 
                      className="text-gray-900 font-semibold"
                      style={{
                        fontFamily: 'Work Sans',
                        fontWeight: 600,
                        fontSize: '16px'
                      }}
                    >
                      Total Payable amount
                    </span>
                    <span 
                      className="text-gray-900 font-bold text-lg"
                      style={{
                        fontFamily: 'Work Sans',
                        fontWeight: 700,
                        fontSize: '18px'
                      }}
                    >
                      ₹ 49,044
                    </span>
                  </div>
                </div>

                <div className="mt-6 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span 
                      className="text-gray-600"
                      style={{
                        fontFamily: 'Work Sans',
                        fontWeight: 400,
                        fontSize: '12px'
                      }}
                    >
                      Got a coupon?
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <input 
                      type="text"
                      placeholder="Enter coupon code here"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                      style={{
                        fontFamily: 'Work Sans',
                        fontWeight: 400,
                        fontSize: '12px'
                      }}
                    />
                    <button 
                      className="px-4 py-2 text-white rounded text-sm hover:opacity-95"
                      style={{
                        background: '#DE754B',
                        fontFamily: 'Inter, Work Sans, sans-serif',
                        fontWeight: 500,
                        fontSize: '12px'
                      }}
                    >
                      Apply
                    </button>
                  </div>
                </div>
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
