import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import HomeHeader from '../components/HomeHeader';
import Footer2 from '../components/Footer2';
import { buildingService } from '../api/buildings/buildingService';
import { pricingService } from '../api/pricing/pricingService';
import { bookingService } from '../api/bookings/bookingService';

const Booking = () => {
  const { unitId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get dates from URL params or location state
  const searchParams = new URLSearchParams(location.search);
  const checkInParam = searchParams.get('checkIn');
  const checkOutParam = searchParams.get('checkOut');
  const guestsParam = searchParams.get('guests');

  const [unit, setUnit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [pricing, setPricing] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    checkIn: checkInParam || '',
    checkOut: checkOutParam || '',
    numberOfGuests: parseInt(guestsParam) || 1,
    numberOfAdults: parseInt(guestsParam) || 1,
    numberOfChildren: 0,
    guestInfo: {
      name: '',
      surname: '',
      email: '',
      phone: '',
      address: '',
      zipCode: ''
    },
    specialRequests: ''
  });

  // Fetch unit details
  useEffect(() => {
    const fetchUnit = async () => {
      try {
        setLoading(true);
        // We need to get building details to find the unit
        // For now, we'll need to pass buildingId or fetch differently
        // This is a simplified version
        setError('Please implement unit fetching');
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (unitId) {
      fetchUnit();
    }
  }, [unitId]);

  // Fetch pricing when dates change
  useEffect(() => {
    const fetchPricing = async () => {
      if (!formData.checkIn || !formData.checkOut || !unit) return;

      try {
        const response = await pricingService.getAvailabilityAndPrice({
          propertyId: unit.ruPropertyId,
          dateFrom: formData.checkIn,
          dateTo: formData.checkOut,
          guests: formData.numberOfGuests
        });

        if (response.success) {
          setPricing(response.data);
        }
      } catch (err) {
        console.error('Error fetching pricing:', err);
      }
    };

    fetchPricing();
  }, [formData.checkIn, formData.checkOut, formData.numberOfGuests, unit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('guestInfo.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        guestInfo: {
          ...prev.guestInfo,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const calculateNights = () => {
    if (!formData.checkIn || !formData.checkOut) return 0;
    const checkIn = new Date(formData.checkIn);
    const checkOut = new Date(formData.checkOut);
    return Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      // Validate form
      if (!formData.guestInfo.name || !formData.guestInfo.surname || 
          !formData.guestInfo.email || !formData.guestInfo.phone) {
        throw new Error('Please fill all required fields');
      }

      // Prepare booking data
      const bookingData = {
        unitId: unitId,
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        numberOfGuests: formData.numberOfGuests,
        numberOfAdults: formData.numberOfAdults,
        numberOfChildren: formData.numberOfChildren,
        guestInfo: formData.guestInfo,
        pricing: {
          ruPrice: pricing?.price || 7000 * calculateNights(),
          clientPrice: pricing?.price || 7000 * calculateNights(),
          currency: 'INR'
        },
        specialRequests: formData.specialRequests
      };

      // Create booking (mock payment for now)
      const response = await bookingService.createBooking(bookingData);

      if (response.success) {
        // Navigate to confirmation page
        navigate(`/booking-confirmation/${response.data.booking.bookingReference}`);
      } else {
        throw new Error(response.message || 'Booking failed');
      }
    } catch (err) {
      setError(err.message);
      console.error('Booking error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#FFF7F0' }}>
        <HomeHeader />
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
        <Footer2 />
      </div>
    );
  }

  const nights = calculateNights();
  const totalPrice = pricing?.price || 7000 * nights;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFF7F0' }}>
      <HomeHeader />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8" style={{ fontFamily: 'Petrona' }}>
          Complete Your Booking
        </h1>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 space-y-6">
              {/* Dates */}
              <div>
                <h2 className="text-xl font-semibold mb-4" style={{ fontFamily: 'Petrona' }}>
                  Booking Details
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Check-in</label>
                    <input
                      type="date"
                      name="checkIn"
                      value={formData.checkIn}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Check-out</label>
                    <input
                      type="date"
                      name="checkOut"
                      value={formData.checkOut}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Guests */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Guests</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Adults</label>
                    <input
                      type="number"
                      name="numberOfAdults"
                      value={formData.numberOfAdults}
                      onChange={handleInputChange}
                      min="1"
                      required
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Children</label>
                    <input
                      type="number"
                      name="numberOfChildren"
                      value={formData.numberOfChildren}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Total</label>
                    <input
                      type="number"
                      name="numberOfGuests"
                      value={formData.numberOfGuests}
                      onChange={handleInputChange}
                      min="1"
                      required
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Guest Information */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Guest Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name *</label>
                    <input
                      type="text"
                      name="guestInfo.name"
                      value={formData.guestInfo.name}
                      onChange={handleInputChange}
                      required
                      maxLength="20"
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name *</label>
                    <input
                      type="text"
                      name="guestInfo.surname"
                      value={formData.guestInfo.surname}
                      onChange={handleInputChange}
                      required
                      maxLength="30"
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <input
                      type="email"
                      name="guestInfo.email"
                      value={formData.guestInfo.email}
                      onChange={handleInputChange}
                      required
                      maxLength="100"
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone *</label>
                    <input
                      type="tel"
                      name="guestInfo.phone"
                      value={formData.guestInfo.phone}
                      onChange={handleInputChange}
                      required
                      maxLength="30"
                      placeholder="+91 9876543210"
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-2">Address</label>
                    <input
                      type="text"
                      name="guestInfo.address"
                      value={formData.guestInfo.address}
                      onChange={handleInputChange}
                      maxLength="50"
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Zip Code</label>
                    <input
                      type="text"
                      name="guestInfo.zipCode"
                      value={formData.guestInfo.zipCode}
                      onChange={handleInputChange}
                      maxLength="15"
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-sm font-medium mb-2">Special Requests</label>
                <textarea
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleInputChange}
                  maxLength="500"
                  rows="3"
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Any special requests or requirements..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 disabled:bg-gray-400"
              >
                {submitting ? 'Processing...' : `Confirm Booking - ₹${totalPrice.toLocaleString()}`}
              </button>
            </form>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h3 className="text-lg font-semibold mb-4" style={{ fontFamily: 'Petrona' }}>
                Booking Summary
              </h3>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Check-in</span>
                  <span className="font-medium">{formData.checkIn || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Check-out</span>
                  <span className="font-medium">{formData.checkOut || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Nights</span>
                  <span className="font-medium">{nights}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Guests</span>
                  <span className="font-medium">{formData.numberOfGuests}</span>
                </div>
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">₹7,000 x {nights} nights</span>
                  <span>₹{(7000 * nights).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold pt-2 border-t">
                  <span>Total</span>
                  <span>₹{totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer2 />
    </div>
  );
};

export default Booking;
