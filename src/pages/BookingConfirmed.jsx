import Footer2 from '../components/Footer2'
import Header2 from '../components/Header2'

const BookingConfirmed = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFF7F0' }}>
      {/* Header */}
      <Header2 />
      
      {/* Top line with dark background */}
      <div style={{ backgroundColor: '#2D3A36', height: '80px' }} className="w-full flex items-center justify-center">
        <h1 
          className="text-white text-center"
          style={{
            fontFamily: 'Petrona',
            fontWeight: 500,
            fontSize: '50px',
            lineHeight: '100%',
            letterSpacing: '-2.2%'
          }}
        >
          We are excited to have you stay with us!
        </h1>
      </div>

      <div className="flex items-center justify-center p-4">
        <div className="flex gap-8 max-w-6xl w-full max-lg:flex-col">
          
          {/* Booking Confirmed Card */}
          <div className="bg-white rounded-3xl p-8 flex-1 max-w-lg">
            {/* Header with checkmark */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 
                className="text-green-600"
                style={{
                  fontFamily: 'Petrona',
                  fontWeight: 500,
                  fontSize: '40px',
                  lineHeight: '100%',
                  letterSpacing: '-2.2%'
                }}
              >
                Booking Confirmed
              </h1>
            </div>

            {/* Property Image */}
            <div className="mb-6">
              <img 
                src="/property_1.png" 
                alt="Property" 
                className="w-full h-32 object-cover rounded-2xl"
              />
            </div>

            {/* Property Title */}
            <h2 
              className="text-gray-900 mb-2"
              style={{
                fontFamily: 'Petrona',
                fontWeight: 400,
                fontSize: '48px',
                lineHeight: '150%',
                letterSpacing: '-2.2%'
              }}
            >
              Hodo Heiwa, 2BHK Penthouse
            </h2>
            
            {/* Room Details */}
            <p className="text-gray-500 text-sm mb-6">Room details</p>

            {/* Check-in and Check-out */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">check-in</p>
                <p 
                  className="text-gray-900"
                  style={{
                    fontFamily: 'Work Sans',
                    fontWeight: 600,
                    fontSize: '38.68px',
                    lineHeight: '100%',
                    letterSpacing: '-2.2%'
                  }}
                >
                  21st July
                </p>
                <p className="text-sm text-gray-600">Monday, 2pm</p>
              </div>
              
              <div className="flex items-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
              
              <div className="text-right">
                <p className="text-sm text-gray-500 mb-1">check-out</p>
                <p 
                  className="text-gray-900"
                  style={{
                    fontFamily: 'Work Sans',
                    fontWeight: 600,
                    fontSize: '38.68px',
                    lineHeight: '100%',
                    letterSpacing: '-2.2%'
                  }}
                >
                  27th July
                </p>
                <p className="text-sm text-gray-600">Sunday, 11am</p>
              </div>
            </div>

            {/* Guests */}
            <p className="text-lg font-semibold text-gray-900">2 Adults, 1 Child</p>
          </div>

          {/* Payment Summary Card */}
          <div className="bg-white rounded-3xl p-8 flex-1 max-w-lg">
            <h2 
              className="text-gray-900 mb-8"
              style={{
                fontFamily: 'Petrona',
                fontWeight: 400,
                fontSize: '48px',
                lineHeight: '150%',
                letterSpacing: '-2.2%'
              }}
            >
              Payment Summary
            </h2>
            
            {/* Payment Details */}
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">1 2BHK Penthouse x 7 Nights</span>
                <span className="font-semibold text-gray-900">₹ 49,000</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Taxes and other charges</span>
                <span className="font-semibold text-gray-900">₹ 594</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Pay Now Discount</span>
                <span className="font-semibold text-green-600">-₹ 550</span>
              </div>
              
              <hr className="border-gray-200" />
              
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">Amount Paid</span>
                <span className="text-lg font-bold text-gray-900">₹ 49,044</span>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-gray-50 rounded-2xl p-4 mb-6">
              <div className="flex items-center gap-3">
                <span className="text-gray-700">Amount paid via</span>
                <img src="/upi.png" alt="UPI" className="h-8 w-auto" />
                <span className="text-gray-600">ju*****n@oksbi</span>
              </div>
            </div>

            {/* Download Receipt */}
            <div className="text-center">
              <button className="text-gray-500 text-sm underline hover:text-gray-700">
                Click here to download an e-receipt
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer2 />
    </div>
  )
}

export default BookingConfirmed