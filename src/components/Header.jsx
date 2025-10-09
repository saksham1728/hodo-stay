import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-900">
              Hodo Stay
            </Link>
          </div>
          <nav className="flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-gray-900">
              Home
            </Link>
            <Link to="/properties" className="text-gray-700 hover:text-gray-900">
              Properties
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header