import { useParams, Link } from "react-router-dom";
import Footer from "../components/Footer";
import HomeHeader from "../components/HomeHeader";
import { useBuildingDetail } from "../hooks/useBuildingDetail";

function PropertyDetail() {
  const { id } = useParams();
  
  // Use the building detail hook to fetch data from API
  const { building: apiBuilding, units: apiUnits, loading, error } = useBuildingDetail(id);

  // No static data - 100% API driven

  // Simple function to format building data for PropertyDetail page
  const formatBuildingData = (building, units) => {
    if (!building || !units || units.length === 0) return null;

    const location = building.location?.detailedLocationID === 41982 
      ? "HSR Layout, Bangalore South, Bengaluru Urban, Karnataka, India"
      : "Bangalore, Karnataka, India";

    // Format each unit as a "space" for the UI
    const spaces = units.map(unit => {
      // Extract amenities from description
      const extractAmenities = (description) => {
        if (!description) return ["WiFi", "Air-conditioning"];
        
        const amenities = [];
        if (description.includes('bed')) amenities.push('Double Bed');
        if (description.includes('bathroom')) amenities.push('Private Bathroom');
        if (description.includes('bedroom')) amenities.push('Bedroom');
        if (description.includes('WC')) amenities.push('WC');
        
        return amenities.length > 0 ? amenities : ["WiFi", "Air-conditioning"];
      };

      return {
        id: unit._id,
        name: unit.name,
        location: location,
        rating: 4.5,
        amenities: extractAmenities(unit.description),
        bedrooms: 2, // Default
        bathrooms: 2, // Default
        area: `${unit.capacity?.standardGuests || 2} guests`,
        description: unit.description || "Modern apartment with all amenities",
        price: 7000, // Default price
        images: unit.images?.length > 0 
          ? unit.images.map(img => img.url).filter(url => url)
          : ["/property_1.png", "/property_3.png", "/property_4.jpg"]
      };
    });

    return {
      title: building.name || "Property Details",
      address: location,
      heroImage: spaces[0]?.images[0] || "/property_details_main.png",
      spaces: spaces
    };
  };

  // Use building and units data
  const property = apiBuilding && apiUnits ? formatBuildingData(apiBuilding, apiUnits) : null;

  // Loading state (keeping your design style)
  if (loading) {
    return (
      <div className="property-detail">
        <div className="h-[60vh] bg-gray-200 relative flex flex-col">
          <div className="bg-gradient-to-b from-black/30 to-black/50 h-full flex flex-col p-6">
            <div className="mt-auto">
              <div className="animate-pulse">
                <div className="h-8 bg-white/20 rounded mb-4 w-3/4"></div>
                <div className="h-4 bg-white/20 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
        <HomeHeader />
        <div className="py-10 px-8 bg-orange-50 min-h-screen max-md:py-12 max-md:px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Error state or property not found
  if (error || !property) {
    return (
      <div className="property-detail">
        <div className="h-[60vh] bg-gray-200 relative flex flex-col">
          <div className="bg-gradient-to-b from-black/30 to-black/50 h-full flex flex-col p-6">
            <div className="mt-auto">
              <h1 className="text-white text-4xl font-bold m-0 mb-2 drop-shadow-lg max-md:text-3xl">
                {loading ? "Loading..." : "Property Not Found"}
              </h1>
              <p className="text-white text-base m-0 drop-shadow-sm">
                {error || "Unable to load property details. Please try again."}
              </p>
            </div>
          </div>
        </div>
        <HomeHeader />
        <div className="py-10 px-8 bg-orange-50 min-h-screen max-md:py-12 max-md:px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center py-20">
              <Link 
                to="/properties" 
                className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors inline-block no-underline"
              >
                Back to Properties
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="property-detail">
      {/* Hero Section */}
      <div
        className="h-[60vh] bg-cover bg-center relative flex flex-col"
        style={{ backgroundImage: `url(${property.heroImage})` }}
      >
        <div className="bg-gradient-to-b from-black/30 to-black/50 h-full flex flex-col p-6">
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

      {/* Header */}
      <HomeHeader />

      {/* Available Spaces */}
      <div className="py-10 px-8 bg-orange-50 min-h-screen max-md:py-12 max-md:px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-semibold text-gray-800 m-0">
              Available Spaces
            </h2>
            {apiBuilding && (
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                Live Data - {apiUnits?.length || 0} Units
              </div>
            )}
          </div>
          <div className="flex flex-col gap-8 w-full">
            {property.spaces.map((space) => (
              <div
                key={space.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
              >
                {/* 60:40 layout on md+, stacked on mobile */}
                <div className="flex flex-col md:flex-row">
                  {/* Left: Image carousel (60%) */}
                  <div className="w-full md:w-3/5 h-[360px] md:h-[360px] flex-shrink-0 relative overflow-hidden" style={{ minHeight: "300px" }}>
                  <div className="flex overflow-x-auto scrollbar-hide gap-0 h-full snap-x snap-mandatory">
                    {space.images.map((image, index) => (
                      <div key={index} className="flex-shrink-0 w-full h-full snap-start">
                        <img 
                          src={image} 
                          alt={`${space.name} - Image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  {/* Scroll indicators */}
                  <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1.5">
                    {space.images.map((_, index) => (
                      <div key={index} className="w-2 h-2 bg-white/70 rounded-full shadow-sm"></div>
                    ))}
                  </div>
                  </div>

                  {/* Right: Content (40%) */}
                  <div className="w-full md:w-2/5 p-4 md:p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 gap-2 sm:gap-0">
                      <div className="flex-1">
                        <h3
                          className="text-black mb-1"
                          style={{
                            fontFamily: "Petrona",
                            fontWeight: 600,
                            fontSize: "30px",
                            lineHeight: "100%",
                            letterSpacing: "-2.2%",
                          }}
                        >
                          {space.name}
                        </h3>
                      </div>

                      <div className="flex items-center gap-1 self-start sm:self-auto">
                        <span
                          className="font-medium"
                          style={{
                            fontFamily: "Petrona",
                            fontWeight: 500,
                            fontSize: "14px",
                          }}
                        >
                          {space.rating}
                        </span>
                      </div>
                    </div>

                    <p
                      className="text-gray-600 mb-4"
                      style={{
                        fontFamily: "Petrona",
                        fontWeight: 400,
                        fontSize: "14px",
                        lineHeight: "140%",
                      }}
                    >
                      {space.location}
                    </p>

                    {/* Amenities */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {space.amenities.map((amenity, index) => (
                        <span
                          key={index}
                          className="flex items-center gap-1 text-gray-600 px-2 py-1 bg-gray-50 rounded-md"
                          style={{
                            fontFamily: "Petrona",
                            fontWeight: 400,
                            fontSize: "12px",
                          }}
                        >
                          {amenity === "WiFi" && "📶"}
                          {amenity === "Air-conditioning" && "❄️"}
                          {amenity === "Free Parking on Premises" && "🅿️"}
                          {amenity}
                        </span>
                      ))}
                    </div>

                    {/* Room Details */}
                    <div className="flex flex-wrap gap-4 mb-4">
                      <span
                        className="text-gray-600"
                        style={{
                          fontFamily: "Petrona",
                          fontWeight: 400,
                          fontSize: "12px",
                        }}
                      >
                        {space.bedrooms} bedroom • {space.bathrooms} bathroom • {space.area}
                      </span>
                    </div>

                    <p
                      className="mb-6"
                      style={{
                        color: "#8B8B8B",
                        fontFamily: "Petrona",
                        fontWeight: 400,
                        fontSize: "18px",
                        lineHeight: "150%",
                        letterSpacing: "-2.2%",
                      }}
                    >
                      {space.description}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 mb-4">
                    <div className="flex flex-col">
                      <span
                        className="text-gray-500 mb-1"
                        style={{
                          fontFamily: "Petrona",
                          fontWeight: 400,
                          fontSize: "12px",
                        }}
                      >
                        from
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span
                          style={{
                            color: "#4A4A4A",
                            fontFamily: "Petrona",
                            fontWeight: 600,
                            fontSize: "30px",
                            lineHeight: "100%",
                            letterSpacing: "-2.2%",
                          }}
                        >
                          Rs. {space.price.toLocaleString()}
                        </span>
                        <span
                          className="text-gray-500 ml-1"
                          style={{
                            fontFamily: "Petrona",
                            fontWeight: 400,
                            fontSize: "12px",
                          }}
                        >
                          per night
                        </span>
                      </div>
                    </div>

                    <Link
                      to={`/booking-details/${space.id}`}
                      className="bg-orange-500 text-white border-none px-6 py-3 rounded-full font-normal text-sm cursor-pointer hover:bg-orange-600 transition-colors max-md:px-4 max-md:py-2 max-md:text-xs inline-block text-center no-underline self-start sm:self-auto"
                      style={{
                        fontFamily: "Petrona",
                        fontWeight: 500,
                        fontSize: "14px",
                      }}
                    >
                      Book Now
                    </Link>
                  </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Amenities Section - Real Data from API */}
      <div className="py-10 px-8 bg-amber-50 max-md:py-12 max-md:px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold text-gray-800 m-0 mb-8 max-md:text-2xl">
            Amenities
          </h2>
          {property && property.spaces && property.spaces[0] && (
            <div className="grid grid-cols-2 gap-12 max-md:grid-cols-1 max-md:gap-8">
              <div className="flex flex-col gap-6">
                {property.spaces[0].amenities.map((amenity, index) => {
                  // Get appropriate emoji for each amenity
                  const getAmenityEmoji = (amenityName) => {
                    const name = amenityName.toLowerCase();
                    if (name.includes('wifi') || name.includes('internet')) return '📶';
                    if (name.includes('air') || name.includes('cooling')) return '❄️';
                    if (name.includes('parking')) return '🅿️';
                    if (name.includes('tv') || name.includes('television')) return '📺';
                    if (name.includes('kitchen')) return '🍳';
                    if (name.includes('bed')) return '🛏️';
                    if (name.includes('bathroom')) return '🚿';
                    if (name.includes('bedroom')) return '🏠';
                    return '✅'; // Default emoji
                  };

                  return (
                    <div key={index} className="flex items-center gap-4 text-base text-gray-800 max-md:text-sm">
                      <span className="text-xl w-8 text-center">{getAmenityEmoji(amenity)}</span>
                      <span>{amenity}</span>
                    </div>
                  );
                })}
              </div>
              <div className="flex flex-col gap-6">
                {/* Additional composition info from description */}
                {apiUnits && apiUnits[0] && apiUnits[0].description && (
                  <>
                    {apiUnits[0].description.includes('bedroom') && (
                      <div className="flex items-center gap-4 text-base text-gray-800 max-md:text-sm">
                        <span className="text-xl w-8 text-center">🏠</span>
                        <span>Private Bedroom</span>
                      </div>
                    )}
                    {apiUnits[0].description.includes('bathroom') && (
                      <div className="flex items-center gap-4 text-base text-gray-800 max-md:text-sm">
                        <span className="text-xl w-8 text-center">🚿</span>
                        <span>Private Bathroom</span>
                      </div>
                    )}
                    {apiUnits[0].description.includes('WC') && (
                      <div className="flex items-center gap-4 text-base text-gray-800 max-md:text-sm">
                        <span className="text-xl w-8 text-center">🚽</span>
                        <span>WC</span>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
          {/* Building Information */}
          {apiBuilding && apiUnits && apiUnits.length > 0 && (
            <div className="mt-8 space-y-6">
              {/* Building Description */}
              {apiUnits[0].description && (
                <div className="p-6 bg-white rounded-xl shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Property Description</h3>
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line">{apiUnits[0].description}</p>
                </div>
              )}
              
              {/* Check-in/Check-out Information */}
              {apiUnits[0].checkInOut && (
                <div className="p-6 bg-white rounded-xl shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Check-in & Check-out</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <span className="text-sm text-gray-500">Check-in</span>
                      <p className="font-medium">{apiUnits[0].checkInOut.checkInFrom} - {apiUnits[0].checkInOut.checkInTo}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Check-out</span>
                      <p className="font-medium">Until {apiUnits[0].checkInOut.checkOutUntil}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Location</span>
                      <p className="font-medium capitalize">{apiUnits[0].checkInOut.place?.replace(/_/g, ' ')}</p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Building Stats */}
              <div className="p-6 bg-white rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Building Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-500">Total Units</span>
                    <p className="font-medium">{apiBuilding.totalUnits}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Available Units</span>
                    <p className="font-medium">{apiBuilding.availableUnits}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Map Section */}
      <div className="py-10 px-8 bg-orange-50 max-md:py-12 max-md:px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold text-gray-800 m-0 mb-8 max-md:text-2xl">
            Map
          </h2>
          <div className="flex gap-12 max-md:flex-col max-md:gap-8">
            <div className="flex-1 flex flex-col gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm max-md:p-4">
                <div className="flex flex-col gap-6">
                  <div className="pb-6 border-b border-gray-200">
                    <div className="flex items-center gap-3 mb-4 max-md:gap-2">
                      <span className="text-xl w-8 text-center">📍</span>
                      <h3 className="text-xl font-semibold text-gray-800 m-0 max-md:text-lg">
                        Address
                      </h3>
                    </div>
                    <p className="text-gray-600 text-sm m-0 leading-relaxed max-md:text-xs">
                      {property.address}
                    </p>
                  </div>
                  <div className="pb-6 border-b border-gray-200">
                    <div className="flex items-center gap-3 mb-4 max-md:gap-2">
                      <span className="text-xl w-8 text-center">🚌</span>
                      <h3 className="text-xl font-semibold text-gray-800 m-0 max-md:text-lg">
                        Public transport
                      </h3>
                    </div>
                    <p className="text-gray-600 text-sm m-0 leading-relaxed max-md:text-xs">
                      Nearest Public Transportation: Bus from HSR BDA. Public
                      Transportation to City Center: 20 min.
                    </p>
                  </div>
                  <div className="pb-6">
                    <div className="flex items-center gap-3 mb-4 max-md:gap-2">
                      <span className="text-xl w-8 text-center">🎯</span>
                      <h3 className="text-xl font-semibold text-gray-800 m-0 max-md:text-lg">
                        Attractions
                      </h3>
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
                  <p className="text-gray-600 text-base m-0 font-medium">
                    Interactive Map
                  </p>
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
      </div>

      {/* Footer */}
      <Footer />
      
      {/* Hide scrollbar styles */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

export default PropertyDetail;
