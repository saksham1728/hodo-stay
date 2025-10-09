import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Properties from './pages/Properties'
import PropertyDetail from './pages/PropertyDetail'
import BookingConfirmed from './pages/BookingConfirmed'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/properties" element={<Layout><Properties /></Layout>} />
        <Route path="/property/:id" element={<PropertyDetail />} />
        <Route path="/booking-confirmed" element={<BookingConfirmed />} />
      </Routes>
    </Router>
  )
}

export default App