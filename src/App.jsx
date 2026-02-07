import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Properties from './pages/Properties'
import PropertyDetail from './pages/PropertyDetail'
import BookingDetails from './pages/BookingDetails'
import BookingConfirmed from './pages/BookingConfirmed'
import MyBookings from './pages/MyBookings'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import RefundPolicy from './pages/RefundPolicy'
import ContactUs from './pages/ContactUs'
import AboutUs from './pages/AboutUs'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/properties" element={<Layout><Properties /></Layout>} />
        <Route path="/property/:id" element={<PropertyDetail />} />
        <Route path="/booking/:buildingId/:unitType" element={<BookingDetails />} />
        <Route path="/booking-details/:unitId" element={<BookingDetails />} />
        <Route path="/booking-confirmed/:bookingReference" element={<BookingConfirmed />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </Router>
  )
}

export default App