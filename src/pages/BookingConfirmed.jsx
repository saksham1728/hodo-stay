import Header2 from '../components/Header2'
import Footer2 from '../components/Footer2'

const BookingConfirmed = () => {
  // Typography styles you requested
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

  const dateBigStyle = {
    fontFamily: "'Work Sans', sans-serif",
    fontWeight: 600,
    fontSize: '38px',
    lineHeight: '100%',
    letterSpacing: '-2.2%',
    margin: 0,
    color: '#355047' // muted green like screenshot
  }

  const smallMetaStyle = {
    fontFamily: "'Work Sans', sans-serif",
    fontWeight: 400,
    fontSize: '14px',
    color: '#6B6B6B',
    margin: 0
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFF7F0' }}>
      <Header2 />

      {/* Top banner */}
      <div className="w-full" style={{ backgroundColor: '#2D3A36', minHeight: 80 }}>
        <div className="max-w-7xl mx-auto flex items-center" style={{ minHeight: 80 }}>
          <h1 className="text-white" style={excitedStyle}>
            We are excited to have you stay with us!
          </h1>
        </div>
      </div>

      {/* Content area */}
      <div className="flex justify-center px-6 py-10">
        <div className="w-full max-w-7xl">
          <div className="flex gap-8 items-start flex-col lg:flex-row">
            {/* LEFT: Booking Confirmed card */}
            <div
              className="bg-white rounded-[28px] p-8 shadow-md"
              style={{ flex: '0 0 60%', maxWidth: '60%' }}
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                <h2 className="text-green-600" style={bookingHeadingStyle}>
                  Booking Confirmed
                </h2>
              </div>

              {/* Two-column content: image left, details right */}
              <div className="flex gap-6 items-start">
                {/* Square image on left */}
                <div className="flex-shrink-0">
                  <img
                    src="/property_1.png"
                    alt="Property"
                    className="block w-44 h-44 rounded-2xl object-cover"
                    // w-44/h-44 gives a clean square 176px x 176px
                  />
                </div>

                {/* Right side details */}
                <div className="flex-1">
                  {/* Title */}
                  <h3 style={propertyTitleStyle} className="text-gray-900 mb-3">
                    Hodo Heiwa, 2BHK Penthouse
                  </h3>

                  {/* Room details link */}
                  <p className="mb-6">
                    <a className="text-gray-600 underline" href="#" style={{ fontFamily: "'Work Sans', sans-serif", fontSize: '16px' }}>
                      Room details
                    </a>
                  </p>

                  {/* Check-in / arrow / Check-out row */}
                  <div className="flex items-center justify-between mb-6">
                    {/* Check-in block */}
                    <div className="flex-1">
                      <p style={smallMetaStyle} className="mb-1">check-in</p>
                      <div className="flex items-baseline gap-3">
                        <p style={dateBigStyle}>21<sup style={{ fontSize: '18px', marginLeft: 2 }}>st</sup></p>
                        <p style={{ ...dateBigStyle, fontSize: '40px' }}>July</p>
                      </div>
                      <p style={smallMetaStyle} className="mt-1">Monday, 2pm</p>
                    </div>

                    {/* Arrow */}
                    <div className="px-4">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>

                    {/* Check-out block */}
                    <div className="flex-1 text-right">
                      <p style={smallMetaStyle} className="mb-1">check-out</p>
                      <div className="flex items-baseline justify-end gap-3">
                        <p style={dateBigStyle}>27<sup style={{ fontSize: '18px', marginLeft: 2 }}>th</sup></p>
                        <p style={{ ...dateBigStyle, fontSize: '40px' }}>July</p>
                      </div>
                      <p style={smallMetaStyle} className="mt-1">Sunday, 11am</p>
                    </div>
                  </div>

                  {/* Guests */}
                  <p style={{ fontFamily: "'Work Sans', sans-serif", fontSize: '20px', fontWeight: 600 }} className="text-gray-900">
                    2 Adults, 1 Child
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT: Payment Summary card (kept compact) */}
            <div
              className="bg-white rounded-[28px] p-8 shadow-md"
              style={{ flex: '0 0 36%', maxWidth: '36%' }}
            >
              <h3
                style={{
                  fontFamily: 'sans',
                  fontWeight: 400,
                  fontSize: '38px',
                  lineHeight: '150%',
                  letterSpacing: '-2.2%',
                  marginBottom: 8,
                }}
                className="text-gray-900 mb-6"
              >
                Payment Summary
              </h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 text-sm">1 2BHK Penthouse x 7 Nights</span>
                  <span className="font-semibold text-gray-900">₹ 49,000</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-700 text-sm">Taxes and other charges</span>
                  <span className="font-semibold text-gray-900">₹ 594</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-700 text-sm">Pay Now Discount</span>
                  <span className="font-semibold text-green-600">-₹ 550</span>
                </div>

                <hr className="border-gray-200" />

                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Amount Paid</span>
                  <span className="text-lg font-bold text-gray-900">₹ 49,044</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-4 mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-gray-700 text-sm">Amount paid via</span>
                  <img src="/upi.png" alt="UPI" className="h-8 w-auto" />
                  <span className="text-gray-600 text-sm">ju*****n@oksbi</span>
                </div>
              </div>

              <div className="text-center">
                <button className="text-gray-500 text-sm underline hover:text-gray-700">
                  Click here to download an e-receipt
                </button>
              </div>
            </div>
          </div> {/* end cards container */}
        </div>
      </div>

      <Footer2 />
    </div>
  )
}

export default BookingConfirmed
