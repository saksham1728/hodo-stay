import { useParams, Link } from 'react-router-dom'
import Footer from '../components/Footer'

function PropertyDetail() {
  const { id } = useParams()

  const propertyData = {
    1: {
      title: "Hodo Heiwa, HSR Layout",
      address: "97/B | 17th Main Road, Sector 3, HSR Layout, Bangalore South, Bengaluru Urban, Karnataka, 560102, India",
      heroImage: "/property_details_main.png",
      spaces: [
        {
          id: "x01",
          name: "2 BHK - X01",
          location: "Sector 3, HSR Layout, Bengaluru",
          rating: 4.5,
          amenities: ["WiFi", "Air-conditioning", "Free Parking on Premises"],
          bedrooms: 2,
          bathrooms: 2,
          area: "1150 sqft",
          description: "All basic amenities included",
          price: 7000,
          image: "/property_1.png",
        },
        {
          id: "x02",
          name: "2 BHK - X02",
          location: "Sector 3, HSR Layout, Bengaluru",
          rating: 4.5,
          amenities: ["WiFi", "Air-conditioning", "Free Parking on Premises"],
          bedrooms: 2,
          bathrooms: 2,
          area: "1150 sqft",
          description: "All basic amenities included",
          price: 7000,
          image: "/property_2.jpg",
        },
        {
          id: "x03",
          name: "2 BHK - X03",
          location: "Sector 3, HSR Layout, Bengaluru",
          rating: 4.5,
          amenities: ["WiFi", "Air-conditioning", "Free Parking on Premises"],
          bedrooms: 2,
          bathrooms: 2,
          area: "1150 sqft",
          description: "All basic amenities included",
          price: 7000,
          image: "/property_3.png",
        },
      ],
    },
    2: {
      title: "Hodo Hummus, Manyata",
      address: "Sector 370, Manyata, Bangalore",
      heroImage: "/property_details_main.png",
      spaces: [
        {
          id: "m01",
          name: "2 BHK - M01",
          location: "Sector 370, Manyata, Bengaluru",
          rating: 4.5,
          amenities: ["WiFi", "Air-conditioning", "Free Parking on Premises"],
          bedrooms: 2,
          bathrooms: 2,
          area: "1150 sqft",
          description: "All basic amenities included",
          price: 7000,
          image: "/property_1.png",
        },
        {
          id: "m02",
          name: "2 BHK - M02",
          location: "Sector 370, Manyata, Bengaluru",
          rating: 4.5,
          amenities: ["WiFi", "Air-conditioning", "Free Parking on Premises"],
          bedrooms: 2,
          bathrooms: 2,
          area: "1150 sqft",
          description: "All basic amenities included",
          price: 7000,
          image: "/property_2.png",
        },
        {
          id: "m03",
          name: "2 BHK - M03",
          location: "Sector 370, Manyata, Bengaluru",
          rating: 4.5,
          amenities: ["WiFi", "Air-conditioning", "Free Parking on Premises"],
          bedrooms: 2,
          bathrooms: 2,
          area: "1150 sqft",
          description: "All basic amenities included",
          price: 7000,
          image: "/property_3.png",
        },
      ],
    },
  }

  const property = propertyData[id]

  if (!property) {
    return <div>Property not found</div>
  }



  return (
    <div className="property-detail">
      {/* Hero Section */}
      <div 
        className="h-[60vh] bg-cover bg-center relative flex flex-col"
        style={{ backgroundImage: `url(${property.heroImage})` }}
      >
        <div className="bg-gradient-to-b from-black/30 to-black/50 h-full flex flex-col p-6">
          <div className="flex justify-between items-center mb-auto">
            <div className="logo">
              <Link to="/" className="text-white text-2xl font-semibold no-underline">
                🏠 Hodo
              </Link>
            </div>
            <button className="bg-white/20 text-white border border-white/30 px-4 py-2 rounded-full cursor-pointer backdrop-blur-sm">
              Sign Up
            </button>
          </div>
          <div className="mt-auto">
            <div className="flex gap-4 mb-8 max-md:flex-col max-md:gap-2">
              <button className="bg-white/90 border-none px-6 py-3 rounded-lg cursor-pointer font-medium backdrop-blur-sm">
                📅 Select Dates
              </button>
              <button className="bg-white/90 border-none px-6 py-3 rounded-lg cursor-pointer font-medium backdrop-blur-sm">
                👤 Add Guests
              </button>
            </div>
            <div className="hero-info">
              <h1 className="text-white text-4xl font-bold m-0 mb-2 drop-shadow-lg max-md:text-3xl">
                {property.title}
              </h1>
              <p className="text-white text-base m-0 drop-shadow-sm">
                {property.address}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Property Navigation */}
      <div className="bg-amber-50 px-8 py-4 flex justify-between items-center border-b border-black/10">
        <div className="nav-logo">
          <Link to="/" className="text-gray-800 text-2xl font-semibold no-underline">
            🏠 Hodo
          </Link>
        </div>
        <button className="bg-none border-none text-2xl cursor-pointer text-gray-800">
          ☰
        </button>
      </div>     
 {/* Available Spaces */}
      <div className="p-8 bg-orange-50 min-h-screen max-md:p-4">
        <h2 className="text-3xl font-semibold text-gray-800 m-0 mb-8">Available Spaces</h2>
        <div className="flex flex-col gap-8 w-full">
          {property.spaces.map((space) => (
            <div key={space.id} className="flex bg-amber-50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 w-full h-80 max-md:flex-col max-md:h-auto">
              <div className="w-96 h-80 flex-shrink-0 max-md:w-full max-md:h-48">
                <img src={space.image} alt={space.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-12 flex-1 flex flex-col justify-center max-md:p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-4xl font-semibold text-gray-800 m-0 mb-2 max-md:text-2xl">
                      {space.name}
                    </h3>
                    <p className="text-gray-600 text-xl m-0 max-md:text-base">
                      {space.location}
                    </p>
                  </div>
                  <div className="text-orange-400 font-semibold text-2xl max-md:text-lg">
                    ★ {space.rating}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {space.amenities.map((amenity, index) => (
                    <span 
                      key={index} 
                      className="flex items-center gap-2 text-gray-600 text-base px-4 py-2 bg-gray-100 rounded-lg max-md:text-sm max-md:px-2 max-md:py-1"
                    >
                      {amenity === "WiFi" && "📶"}
                      {amenity === "Air-conditioning" && "❄️"}
                      {amenity === "Free Parking on Premises" && "🅿️"}
                      {amenity}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-8 mb-4 max-md:flex-col max-md:gap-2">
                  <div className="text-gray-800 text-lg">
                    <strong>{space.bedrooms} bedroom</strong>
                  </div>
                  <div className="text-gray-800 text-lg">
                    <strong>{space.bathrooms} bathroom</strong>
                  </div>
                  <div className="text-gray-800 text-lg">
                    <strong>{space.area}</strong>
                  </div>
                </div>
                
                <p className="text-gray-600 text-lg m-0 mb-8 flex-1 leading-relaxed max-md:text-base max-md:mb-4">
                  {space.description}
                </p>
                
                <div className="flex justify-between items-center mt-auto">
                  <div className="flex items-baseline gap-1">
                    <span className="text-gray-600 text-sm">From</span>
                    <span className="text-3xl font-bold text-gray-800 max-md:text-2xl">
                      Rs. {space.price.toLocaleString()}
                    </span>
                    <span className="text-gray-600 text-sm">per night</span>
                  </div>
                  <Link 
                    to="/booking-details"
                    className="bg-orange-500 text-white border-none px-6 py-3 rounded-full font-normal text-sm cursor-pointer hover:bg-orange-600 transition-colors max-md:px-4 max-md:py-2 max-md:text-xs inline-block text-center no-underline"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Amenities Section */}
      <div className="py-12 px-8 bg-amber-50 max-md:py-8 max-md:px-4">
        <h2 className="text-3xl font-semibold text-gray-800 m-0 mb-8 max-md:text-2xl">Amenities</h2>
        <div className="grid grid-cols-2 gap-12 max-w-6xl max-md:grid-cols-1 max-md:gap-8">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4 text-base text-gray-800 max-md:text-sm">
              <span className="text-xl w-8 text-center">🅿️</span>
              <span>Free parking on premises</span>
            </div>
            <div className="flex items-center gap-4 text-base text-gray-800 max-md:text-sm">
              <span className="text-xl w-8 text-center">📶</span>
              <span>Wi-Fi</span>
            </div>
            <div className="flex items-center gap-4 text-base text-gray-800 max-md:text-sm">
              <span className="text-xl w-8 text-center">❄️</span>
              <span>Air conditioning</span>
            </div>
            <div className="flex items-center gap-4 text-base text-gray-800 max-md:text-sm">
              <span className="text-xl w-8 text-center">📺</span>
              <span>TV</span>
            </div>
            <div className="flex items-center gap-4 text-base text-gray-800 max-md:text-sm">
              <span className="text-xl w-8 text-center">🚪</span>
              <span>Private entrance</span>
            </div>
            <div className="flex items-center gap-4 text-base text-gray-800 max-md:text-sm">
              <span className="text-xl w-8 text-center">💼</span>
              <span>Dedicated workspace</span>
            </div>
            <div className="flex items-center gap-4 text-base text-gray-800 max-md:text-sm">
              <span className="text-xl w-8 text-center">🍳</span>
              <span>Kitchen</span>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4 text-base text-gray-800 max-md:text-sm">
              <span className="text-xl w-8 text-center">✅</span>
              <span>Essentials</span>
            </div>
            <div className="flex items-center gap-4 text-base text-gray-800 max-md:text-sm">
              <span className="text-xl w-8 text-center">🩹</span>
              <span>First aid kit</span>
            </div>
            <div className="flex items-center gap-4 text-base text-gray-800 max-md:text-sm">
              <span className="text-xl w-8 text-center">🚿</span>
              <span>Hot water</span>
            </div>
            <div className="flex items-center gap-4 text-base text-gray-800 max-md:text-sm">
              <span className="text-xl w-8 text-center">🛏️</span>
              <span>Bed linens</span>
            </div>
            <div className="flex items-center gap-4 text-base text-gray-800 max-md:text-sm">
              <span className="text-xl w-8 text-center">🛋️</span>
              <span>Extra pillows and blankets</span>
            </div>
            <div className="flex items-center gap-4 text-base text-gray-800 max-md:text-sm">
              <span className="text-xl w-8 text-center">📹</span>
              <span>Cameras on property</span>
            </div>
            <div className="flex items-center gap-4 text-base text-gray-800 max-md:text-sm">
              <span className="text-xl w-8 text-center">🧳</span>
              <span>Luggage drop-off allowed</span>
            </div>
          </div>
        </div>
      </div>      {/* 
Map Section */}
      <div className="py-12 px-8 bg-orange-50 max-md:py-8 max-md:px-4">
        <h2 className="text-3xl font-semibold text-gray-800 m-0 mb-8 max-md:text-2xl">Map</h2>
        <div className="flex gap-12 max-w-6xl max-md:flex-col max-md:gap-8">
          <div className="flex-1 flex flex-col gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm max-md:p-4">
              <div className="flex flex-col gap-6">
                <div className="pb-6 border-b border-gray-200">
                  <div className="flex items-center gap-3 mb-4 max-md:gap-2">
                    <span className="text-xl w-8 text-center">📍</span>
                    <h3 className="text-xl font-semibold text-gray-800 m-0 max-md:text-lg">Address</h3>
                  </div>
                  <p className="text-gray-600 text-sm m-0 leading-relaxed max-md:text-xs">
                    {property.address}
                  </p>
                </div>
                <div className="pb-6 border-b border-gray-200">
                  <div className="flex items-center gap-3 mb-4 max-md:gap-2">
                    <span className="text-xl w-8 text-center">🚌</span>
                    <h3 className="text-xl font-semibold text-gray-800 m-0 max-md:text-lg">Public transport</h3>
                  </div>
                  <p className="text-gray-600 text-sm m-0 leading-relaxed max-md:text-xs">
                    Nearest Public Transportation: Bus from HSR BDA. Public Transportation to City Center: 20 min.
                  </p>
                </div>
                <div className="pb-6">
                  <div className="flex items-center gap-3 mb-4 max-md:gap-2">
                    <span className="text-xl w-8 text-center">🎯</span>
                    <h3 className="text-xl font-semibold text-gray-800 m-0 max-md:text-lg">Attractions</h3>
                  </div>
                  <p className="text-gray-600 text-sm m-0 leading-relaxed max-md:text-xs">
                    Wonderla, Bannerghatta Zoo, Lal Bagh, Cubbon Park
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 min-h-96 max-md:min-h-72">
            <div className="bg-gray-100 rounded-xl h-full flex items-center justify-center border border-gray-300 relative overflow-hidden">
              <div className="text-center relative z-10">
                <div className="text-3xl text-red-600 mb-2">📍</div>
                <p className="text-gray-600 text-base m-0 font-medium">Interactive Map</p>
                <div className="absolute inset-0 z-0">
                  <div className="absolute h-0.5 w-3/5 top-2/5 left-1/5 bg-gray-400"></div>
                  <div className="absolute w-0.5 h-1/2 left-3/5 top-1/4 bg-gray-400"></div>
                  <div className="absolute h-0.5 w-2/5 top-3/4 left-1/10 bg-gray-400 transform -rotate-12"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default PropertyDetail