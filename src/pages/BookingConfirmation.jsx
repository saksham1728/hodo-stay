import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import HomeHeader from '../components/HomeHeader';
import Footer2 from '../components/Footer2';
import { bookingService } from '../api/bookings/bookingService';

const BookingConfirmation = () => {
  const { bookingReference } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        setLoading(true);
        const response = await bookingService.getBookingByReference(bookingReference);
        
        if (response.success) {
          setBooking(response.data.booking);
        } else {
          setError('Booking not found');
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching booking:', err);
      } finally {
        setLoading(false);
      }
    };

    if (bookingReference) {
      fetchBooking();
    }
  }, [bookingReference]);

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

  if (error || !booking) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#FFF7F0' }}>
        <HomeHeader />
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h1 className="text-2xl font-bold mb-4">Booking Not Found</h1>
            <p className="text-gray-600 mb-6">{error || 'The booking you are looking for does not exist.'}</p>
            <Link to="/properties" className="text-blue-600 hover:underline">
              Back to Properties
            </Link>
          </div>
        </div>
        <Footer2 />
      </div>
    );
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFF7F0' }}>
      <HomeHeader />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Success Message */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8 text-center">
          <div className="text-green-600 text-5xl mb-4">✓</div>
          <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Petrona' }}>
            Booking Confirmed!
          </h1>
          <p className="text-gray-600">
            Your booking has been confirmed. A confirmation email has been sent to {booking.guestInfo.email}
          </p>
        </div>

        {/* Booking Details */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <div className="border-b pb-4 mb-6">
            <h2 className="text-2xl font-semibold mb-2" style={{ fontFamily: 'Petrona' }}>
              Booking Details
            </h2>
            <p className="text-gray-600">
              Booking Reference: <span className="font-mono font-bold text-black">{booking.bookingReference}</span>
            </p>
            {booking.ruReservationId && (
              <p className="text-gray-600 text-sm">
                RU Reservation ID: {booking.ruReservationId}
              </p>
            )}
          </div>

          {/* Property Info */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Property</h3>
            <div className="flex gap-4">
              {booking.unitId?.images?.[0]?.url && (
                <img
                  src={booking.unitId.images[0].url}
                  alt={booking.unitId.name}
                  className="w-32 h-32 object-cover rounded-lg"
                />
              )}
              <div>
                <p className="font-medium text-lg">{booking.unitId?.name || 'Property'}</p>
                <p className="text-gray-600 text-sm">
                  {booking.buildingId?.name || 'Building'}
                </p>
              </div>
            </div>
          </div>

          {/* Stay Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold mb-3">Check-in</h3>
              <p className="text-gray-800">{formatDate(booking.checkIn)}</p>
              <p className="text-sm text-gray-600">After 2:00 PM</p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Check-out</h3>
              <p className="text-gray-800">{formatDate(booking.checkOut)}</p>
              <p className="text-sm text-gray-600">Before 11:00 AM</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold mb-2">Duration</h3>
              <p className="text-gray-800">{booking.nights} night{booking.nights > 1 ? 's' : ''}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Guests</h3>
              <p className="text-gray-800">
                {booking.numberOfGuests} guest{booking.numberOfGuests > 1 ? 's' : ''}
                {booking.numberOfAdults > 0 && ` (${booking.numberOfAdults} adult${booking.numberOfAdults > 1 ? 's' : ''}${booking.numberOfChildren > 0 ? `, ${booking.numberOfChildren} child${booking.numberOfChildren > 1 ? 'ren' : ''}` : ''})`}
              </p>
            </div>
          </div>

          {/* Guest Information */}
          <div className="border-t pt-6 mb-6">
            <h3 className="font-semibold mb-3">Guest Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-medium">{booking.guestInfo.name} {booking.guestInfo.surname}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{booking.guestInfo.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium">{booking.guestInfo.phone}</p>
              </div>
              {booking.guestInfo.address && (
                <div>
                  <p className="text-sm text-gray-600">Address</p>
                  <p className="font-medium">{booking.guestInfo.address}</p>
                </div>
              )}
            </div>
          </div>

          {/* Special Requests */}
          {booking.specialRequests && (
            <div className="border-t pt-6 mb-6">
              <h3 className="font-semibold mb-2">Special Requests</h3>
              <p className="text-gray-700">{booking.specialRequests}</p>
            </div>
          )}

          {/* Pricing */}
          <div className="border-t pt-6">
            <h3 className="font-semibold mb-3">Payment Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">
                  ₹{(booking.pricing.clientPrice / booking.nights).toLocaleString()} x {booking.nights} night{booking.nights > 1 ? 's' : ''}
                </span>
                <span>₹{booking.pricing.clientPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold pt-2 border-t">
                <span>Total Paid</span>
                <span>₹{booking.pricing.alreadyPaid.toLocaleString()}</span>
              </div>
              <p className="text-sm text-gray-600">
                Payment Status: <span className="text-green-600 font-medium">Completed</span>
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/properties"
            className="px-6 py-3 bg-black text-white rounded-lg text-center hover:bg-gray-800"
          >
            Browse More Properties
          </Link>
          <Link
            to={`/my-bookings?email=${encodeURIComponent(booking.guestInfo.email)}`}
            className="px-6 py-3 border border-black text-black rounded-lg text-center hover:bg-gray-50"
          >
            View My Bookings
          </Link>
        </div>

        {/* Important Information */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold mb-3">Important Information</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• Please carry a valid ID proof at the time of check-in</li>
            <li>• Check-in time is after 2:00 PM and check-out is before 11:00 AM</li>
            <li>• For any changes or cancellations, please contact us at least 24 hours in advance</li>
            <li>• Save your booking reference number for future correspondence</li>
          </ul>
        </div>
      </div>

      <Footer2 />
    </div>
  );
};

export default BookingConfirmation;
