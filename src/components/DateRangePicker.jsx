import { useState, useEffect } from 'react';
import { DatePicker } from '@mantine/dates';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import './DateRangePicker.css';

const DateRangePicker = ({ isOpen, onClose, checkIn, checkOut, onDateChange }) => {
  const [value, setValue] = useState([null, null]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isOpen) {
      // Mantine expects strings in YYYY-MM-DD format
      setValue([
        checkIn || null,
        checkOut || null
      ]);
    }
  }, [checkIn, checkOut, isOpen]);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const handleApply = () => {
    if (value[0] && value[1]) {
      // Mantine returns dates as strings in YYYY-MM-DD format
      const startDate = value[0];
      const endDate = value[1];
      
      console.log('Applying dates:', startDate, endDate); // Debug log
      onDateChange(startDate, endDate);
      onClose();
    } else {
      console.log('Dates not selected:', value); // Debug log
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40"
        onClick={onClose}
      />
      
      {/* Dropdown positioned over inputs */}
      <div className="absolute top-0 left-0 z-50 w-full md:w-auto">
        <div className="bg-white rounded-xl shadow-2xl border border-gray-200 p-4 relative w-full md:w-auto">
          {/* Mantine DatePicker */}
          <MantineProvider>
            <div className="calendar-wrapper">
              <DatePicker 
                type="range" 
                numberOfColumns={isMobile ? 1 : 2}
                value={value} 
                onChange={handleChange}
                minDate={new Date()}
                classNames={{
                  calendar: 'mantine-calendar-custom'
                }}
              />
            </div>
          </MantineProvider>

          {/* Apply Button */}
          <div className="flex justify-end mt-3">
            <button
              onClick={handleApply}
              disabled={!value[0] || !value[1]}
              className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-sm font-medium"
              style={{ fontFamily: 'Petrona' }}
            >
              Apply Dates
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DateRangePicker;
