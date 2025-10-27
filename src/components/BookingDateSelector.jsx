import { useState, useEffect } from 'react';

const BookingDateSelector = ({ 
  onDatesChange, 
  initialCheckIn, 
  initialCheckOut
}) => {
  const [checkIn, setCheckIn] = useState(initialCheckIn || '');
  const [checkOut, setCheckOut] = useState(initialCheckOut || '');

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  
  // Get tomorrow's date as default checkout
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  // Set default dates if not provided
  useEffect(() => {
    if (!checkIn) {
      setCheckIn(today);
    }
    if (!checkOut) {
      setCheckOut(tomorrowStr);
    }
  }, []);

  // Notify parent of changes
  useEffect(() => {
    if (checkIn && checkOut) {
      onDatesChange?.(checkIn, checkOut);
    }
  }, [checkIn, checkOut]);

  const handleCheckInChange = (e) => {
    const newCheckIn = e.target.value;
    setCheckIn(newCheckIn);
    
    // Auto-adjust checkout if it's before or same as checkin
    if (checkOut && newCheckIn >= checkOut) {
      const nextDay = new Date(newCheckIn);
      nextDay.setDate(nextDay.getDate() + 1);
      const newCheckOut = nextDay.toISOString().split('T')[0];
      setCheckOut(newCheckOut);
    }
  };

  const handleCheckOutChange = (e) => {
    const newCheckOut = e.target.value;
    setCheckOut(newCheckOut);
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

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const options = { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long'
    };
    return date.toLocaleDateString('en-US', options);
  };



  return (
    <div className="space-y-4">
      {/* Date Selection */}
      <div className="grid grid-cols-2 gap-4">
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
            style={{
              fontFamily: 'Work Sans',
              fontSize: '14px'
            }}
          />
          {checkIn && (
            <p className="text-xs text-gray-500 mt-1">
              {formatDate(checkIn)}
            </p>
          )}
        </div>

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
            style={{
              fontFamily: 'Work Sans',
              fontSize: '14px'
            }}
          />
          {checkOut && (
            <p className="text-xs text-gray-500 mt-1">
              {formatDate(checkOut)}
            </p>
          )}
        </div>
      </div>

      {/* Nights Display */}
      {calculateNights() > 0 && (
        <div className="text-center py-2 bg-gray-50 rounded-lg">
          <span className="text-sm font-medium text-gray-700">
            {calculateNights()} {calculateNights() === 1 ? 'Night' : 'Nights'}
          </span>
        </div>
      )}


    </div>
  );
};

export default BookingDateSelector;