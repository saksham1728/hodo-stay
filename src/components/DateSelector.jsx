import { useState } from 'react';

const DateSelector = ({ onDatesChange, onGuestsChange, initialCheckIn, initialCheckOut, initialGuests = 2 }) => {
  const [checkIn, setCheckIn] = useState(initialCheckIn || '');
  const [checkOut, setCheckOut] = useState(initialCheckOut || '');
  const [guests, setGuests] = useState(initialGuests);
  const [showGuestSelector, setShowGuestSelector] = useState(false);

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  
  // Get tomorrow's date as default checkout
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  const handleCheckInChange = (e) => {
    const newCheckIn = e.target.value;
    setCheckIn(newCheckIn);
    
    // Auto-adjust checkout if it's before or same as checkin
    if (checkOut && newCheckIn >= checkOut) {
      const nextDay = new Date(newCheckIn);
      nextDay.setDate(nextDay.getDate() + 1);
      const newCheckOut = nextDay.toISOString().split('T')[0];
      setCheckOut(newCheckOut);
      onDatesChange?.(newCheckIn, newCheckOut);
    } else {
      onDatesChange?.(newCheckIn, checkOut);
    }
  };

  const handleCheckOutChange = (e) => {
    const newCheckOut = e.target.value;
    setCheckOut(newCheckOut);
    onDatesChange?.(checkIn, newCheckOut);
  };

  const handleGuestsChange = (newGuests) => {
    setGuests(newGuests);
    onGuestsChange?.(newGuests);
    setShowGuestSelector(false);
  };

  const calculateNights = () => {
    if (checkIn && checkOut) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const diffTime = Math.abs(end - start);
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    return 0;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Your Dates</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Check-in Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Check-in
          </label>
          <input
            type="date"
            value={checkIn}
            min={today}
            onChange={handleCheckInChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        {/* Check-out Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Check-out
          </label>
          <input
            type="date"
            value={checkOut}
            min={checkIn || tomorrow}
            onChange={handleCheckOutChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        {/* Guests Selector */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Guests
          </label>
          <button
            type="button"
            onClick={() => setShowGuestSelector(!showGuestSelector)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-left bg-white"
          >
            {guests} {guests === 1 ? 'Guest' : 'Guests'}
          </button>
          
          {showGuestSelector && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => handleGuestsChange(num)}
                  className={`w-full px-3 py-2 text-left hover:bg-gray-50 ${
                    guests === num ? 'bg-orange-50 text-orange-600' : ''
                  }`}
                >
                  {num} {num === 1 ? 'Guest' : 'Guests'}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Nights Display */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Duration
          </label>
          <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-600">
            {calculateNights()} {calculateNights() === 1 ? 'Night' : 'Nights'}
          </div>
        </div>
      </div>

      {/* Quick Date Presets */}
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => {
            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            
            const todayStr = today.toISOString().split('T')[0];
            const tomorrowStr = tomorrow.toISOString().split('T')[0];
            
            setCheckIn(todayStr);
            setCheckOut(tomorrowStr);
            onDatesChange?.(todayStr, tomorrowStr);
          }}
          className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
        >
          Tonight
        </button>
        
        <button
          type="button"
          onClick={() => {
            const start = new Date();
            start.setDate(start.getDate() + 1);
            const end = new Date(start);
            end.setDate(end.getDate() + 2);
            
            const startStr = start.toISOString().split('T')[0];
            const endStr = end.toISOString().split('T')[0];
            
            setCheckIn(startStr);
            setCheckOut(endStr);
            onDatesChange?.(startStr, endStr);
          }}
          className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
        >
          2 Nights
        </button>
        
        <button
          type="button"
          onClick={() => {
            const start = new Date();
            start.setDate(start.getDate() + 1);
            const end = new Date(start);
            end.setDate(end.getDate() + 7);
            
            const startStr = start.toISOString().split('T')[0];
            const endStr = end.toISOString().split('T')[0];
            
            setCheckIn(startStr);
            setCheckOut(endStr);
            onDatesChange?.(startStr, endStr);
          }}
          className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
        >
          1 Week
        </button>
      </div>
    </div>
  );
};

export default DateSelector;