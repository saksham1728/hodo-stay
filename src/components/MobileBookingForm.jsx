const MobileBookingForm = () => {
  return (
    <div className="md:hidden px-4 pb-8">
      <div
        className="max-w-md mx-auto rounded-2xl p-6 shadow-lg"
        style={{ backgroundColor: "#FAF2E8" }}
      >
        <h2
          className="text-gray-900 mb-4 text-center"
          style={{
            fontFamily: "Petrona",
            fontWeight: 400,
            fontSize: "24px",
            lineHeight: "130%",
            letterSpacing: "-1%",
          }}
        >
          Book your room here
        </h2>

        <p
          className="text-gray-600 text-center mb-6 text-sm"
          style={{
            fontFamily: "Work Sans",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "140%",
          }}
        >
          Experience isn't a luxury, it's a baseline. Welcome to eco-friendly
          stays with global hotel standards
        </p>

        <div className="space-y-4">
          {/* Check-In */}
          <div className="flex items-center px-4 py-3 rounded-lg border border-gray-200 bg-white">
            <svg
              className="w-5 h-5 text-gray-500 mr-3"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-gray-700 font-medium">Check-In</span>
          </div>

          {/* Check-Out */}
          <div className="flex items-center px-4 py-3 rounded-lg border border-gray-200 bg-white">
            <svg
              className="w-5 h-5 text-gray-500 mr-3"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-gray-700 font-medium">Check-Out</span>
          </div>

          {/* Add Guests */}
          <div className="flex items-center px-4 py-3 rounded-lg border border-gray-200 bg-white">
            <svg
              className="w-5 h-5 text-gray-500 mr-3"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
            </svg>
            <span className="text-gray-700 font-medium">Add Guests</span>
          </div>

          {/* Search Button */}
          <button
            className="w-full py-4 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity"
            style={{
              backgroundColor: "#DE754B",
              fontFamily: "Work Sans",
              fontWeight: 500,
              fontSize: "16px",
            }}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  )
}

export default MobileBookingForm