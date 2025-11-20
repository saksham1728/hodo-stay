import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Properties from './pages/Properties'
import PropertyDetail from './pages/PropertyDetail'
import BookingDetails from './pages/BookingDetails'
import BookingConfirmed from './pages/BookingConfirmed'
import MyBookings from './pages/MyBookings'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/properties" element={<Layout><Properties /></Layout>} />
        <Route path="/property/:id" element={<PropertyDetail />} />
        <Route path="/booking/:buildingId/:unitType" element={<BookingDetails />} />
        <Route path="/booking-details/:unitId" element={<BookingDetails />} />
        <Route path="/booking-confirmed/:bookingReference" element={<BookingConfirmed />} />
        <Route path="/my-bookings" element={<MyBookings />} />
      </Routes>
    </Router>
  )
}

export default App